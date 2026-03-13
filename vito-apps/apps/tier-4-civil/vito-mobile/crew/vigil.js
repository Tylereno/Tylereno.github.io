/**
 * VIGIL Agent — Engine Diagnostics
 * Monitors 7.3L Diesel via OBD-II interface
 * Reads glow plug status, injector codes, engine temp, RPM
 */

const SerialPort = require('serialport');
const { Readline } = require('@serialport/parser-readline');

class VigilAgent {
  constructor() {
    this.obd2Port = process.env.OBD2_PORT || '/dev/ttyOBD';
    this.obd2Baud = parseInt(process.env.OBD2_BAUD) || 38400;

    this.status = {
      status: 'INITIALIZING',
      thermal: {
        engine_coolant_temp_c: null,
        intake_air_temp_c: null,
      },
      watchdog: {
        uptime_seconds: 0,
        heartbeat_hz: 0,
      },
      engine: {
        rpm: 0,
        load_percent: 0,
        dtcs: [], // Diagnostic Trouble Codes
        glow_plugs_active: false,
      },
    };

    this.logs = [];
    this.startTime = Date.now();
    this.initializeOBD2();
  }

  initializeOBD2() {
    this.log('INFO', 'Initializing OBD-II connection for 7.3L diesel engine...');

    try {
      this.obd2Serial = new SerialPort({
        path: this.obd2Port,
        baudRate: this.obd2Baud,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        autoOpen: false,
      });

      const parser = this.obd2Serial.pipe(new Readline({ delimiter: '\r' }));

      this.obd2Serial.on('open', () => {
        this.log('INFO', `OBD-II adapter connected on ${this.obd2Port}`);
        this.sendOBDCommand('ATZ'); // Reset adapter
      });

      parser.on('data', (data) => {
        this.parseOBDResponse(data);
      });

      this.obd2Serial.on('error', (err) => {
        this.log('WARN', `OBD-II error: ${err.message}`);
      });

      this.obd2Serial.open();

      // Poll OBD-II parameters every 3 seconds
      setInterval(() => this.pollEngineData(), 3000);
    } catch (err) {
      this.log('WARN', `OBD-II not available: ${err.message}`);
    }
  }

  sendOBDCommand(cmd) {
    if (this.obd2Serial && this.obd2Serial.isOpen) {
      this.obd2Serial.write(cmd + '\r');
    }
  }

  pollEngineData() {
    if (!this.obd2Serial?.isOpen) return;

    // PID requests for common engine parameters
    // Format: "01" (show current data) + "XX" (PID)
    this.sendOBDCommand('0105'); // Engine Coolant Temperature
    this.sendOBDCommand('010C'); // Engine RPM
    this.sendOBDCommand('0104'); // Engine Load
    this.sendOBDCommand('011F'); // Runtime Since Engine Start
  }

  parseOBDResponse(data) {
    // Parse ELM327 OBD adapter responses
    // Format: "41 05 7F" = PID 05, value 0x7F = 127°C

    try {
      const tokens = data.trim().split(' ');
      if (tokens.length < 3) return;

      const mode = tokens[0]; // "41" = response
      const pid = tokens[1];  // PID identifier
      const value = tokens.slice(2);

      if (mode === '41') {
        this.parseOBDPID(pid, value);
      }
    } catch (err) {
      this.log('DEBUG', `OBD parse: ${err.message}`);
    }
  }

  parseOBDPID(pid, bytes) {
    try {
      switch (pid) {
        case '05': // Engine Coolant Temperature
          {
            const raw = parseInt(bytes[0], 16);
            this.status.thermal.engine_coolant_temp_c = raw - 40; // Offset formula
          }
          break;

        case '0C': // Engine RPM (2 bytes)
          {
            const a = parseInt(bytes[0], 16);
            const b = parseInt(bytes[1], 16);
            this.status.engine.rpm = (256 * a + b) / 4;
          }
          break;

        case '04': // Engine Load
          {
            const raw = parseInt(bytes[0], 16);
            this.status.engine.load_percent = (raw / 255) * 100;
          }
          break;

        case '1F': // Runtime
          {
            const a = parseInt(bytes[0], 16);
            const b = parseInt(bytes[1], 16);
            this.watchdog.uptime_seconds = 256 * a + b;
          }
          break;
      }

      // Detect glow plug circuit (active during cold start)
      if (this.status.thermal.engine_coolant_temp_c < 10 && this.status.engine.rpm === 0) {
        this.status.engine.glow_plugs_active = true;
      } else {
        this.status.engine.glow_plugs_active = false;
      }
    } catch (err) {
      this.log('WARN', `OBD PID parse error: ${err.message}`);
    }
  }

  async getSystemHealth() {
    this.status.watchdog.uptime_seconds = Math.floor((Date.now() - this.startTime) / 1000);
    this.status.watchdog.heartbeat_hz = 1; // Dummy value
    this.status.status = this.obd2Serial?.isOpen ? 'OPERATIONAL' : 'WARNING';
    this.status.timestamp = new Date().toISOString();
    return this.status;
  }

  log(level, message) {
    const entry = `[VIGIL][${level}] ${message}`;
    console.log(entry);
    this.logs.push(entry);
    if (this.logs.length > 1000) this.logs.shift();
  }

  getLogs(count = 20) {
    return this.logs.slice(-count);
  }
}

module.exports = new VigilAgent();

if (require.main === module) {
  setInterval(async () => {
    const status = await module.exports.getSystemHealth();
    console.log(JSON.stringify(status, null, 2));
  }, 5000);
}
