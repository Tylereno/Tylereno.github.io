/**
 * KINETIC Agent — VITO Mobile Power Orchestration
 * Monitors 1300W solar array & 280Ah LiFePO4 battery via serial BMS/controller
 * Feeds real telemetry into the VITO dashboard
 */

const SerialPort = require('serialport');
const { Readline } = require('@serialport/parser-readline');

class KineticAgent {
  constructor() {
    this.chargeControllerPort = process.env.CHARGE_CONTROLLER_PORT || '/dev/ttyUSB0';
    this.chargeControllerBaud = parseInt(process.env.CHARGE_CONTROLLER_BAUD) || 9600;
    this.bmsPort = process.env.BMS_PORT || '/dev/ttyUSB1';
    this.bmsBaud = parseInt(process.env.BMS_BAUD) || 9600;

    this.status = {
      status: 'INITIALIZING',
      power: {
        solar_input_watts: 0,
        battery_voltage: 48.0,
        battery_current_amps: 0,
        battery_soc_percent: 100.0,
      },
      tiers: [
        { name: 'TIER_0', status: 'ACTIVE', priority: 'CRITICAL' },
        { name: 'TIER_1', status: 'ACTIVE', priority: 'HIGH' },
      ],
    };

    this.logs = [];
    this.initializeSerialPorts();
  }

  initializeSerialPorts() {
    this.log('INFO', 'Initializing serial ports for solar controller and BMS...');

    // Attempt to open charge controller port
    this.openChargeControllerPort();

    // Attempt to open BMS port (may not exist on older systems)
    setTimeout(() => this.openBMSPort(), 1000);
  }

  openChargeControllerPort() {
    try {
      this.chargeControllerSerial = new SerialPort({
        path: this.chargeControllerPort,
        baudRate: this.chargeControllerBaud,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        autoOpen: true,
      });

      const parser = this.chargeControllerSerial.pipe(new Readline({ delimiter: '\r\n' }));

      this.chargeControllerSerial.on('open', () => {
        this.log('INFO', `Charge controller connected on ${this.chargeControllerPort}`);
      });

      parser.on('data', (data) => {
        this.parseChargeControllerData(data);
      });

      this.chargeControllerSerial.on('error', (err) => {
        this.log('WARN', `Charge controller error: ${err.message}`);
        this.status.power.solar_input_watts = 0; // Fallback
      });
    } catch (err) {
      this.log('WARN', `Could not open charge controller: ${err.message}`);
      this.status.power.solar_input_watts = 0;
    }
  }

  openBMSPort() {
    try {
      this.bmsSerial = new SerialPort({
        path: this.bmsPort,
        baudRate: this.bmsBaud,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        autoOpen: false,
      });

      const parser = this.bmsSerial.pipe(new Readline({ delimiter: '\r\n' }));

      this.bmsSerial.on('open', () => {
        this.log('INFO', `BMS connected on ${this.bmsPort}`);
      });

      parser.on('data', (data) => {
        this.parseBMSData(data);
      });

      this.bmsSerial.on('error', (err) => {
        this.log('WARN', `BMS error: ${err.message}`);
      });

      this.bmsSerial.open();
    } catch (err) {
      this.log('WARN', `BMS not available: ${err.message}`);
    }
  }

  parseChargeControllerData(data) {
    // Parse Renogy/Outback MPPT format
    // Expected: "PV_W=1250,BAT_V=48.2,BAT_A=15.3"

    try {
      const params = {};
      data.split(',').forEach((pair) => {
        const [key, val] = pair.split('=');
        params[key?.trim()] = parseFloat(val);
      });

      if (params.PV_W !== undefined) {
        this.status.power.solar_input_watts = Math.max(0, params.PV_W);
      }
      if (params.BAT_V !== undefined) {
        this.status.power.battery_voltage = params.BAT_V;
      }
      if (params.BAT_A !== undefined) {
        this.status.power.battery_current_amps = params.BAT_A;
      }

      this.log('DEBUG', `Solar: ${this.status.power.solar_input_watts}W | Batt: ${this.status.power.battery_voltage}V @ ${this.status.power.battery_current_amps}A`);
    } catch (err) {
      this.log('WARN', `Parse error: ${err.message}`);
    }
  }

  parseBMSData(data) {
    // Parse JBD-SP BMS format
    // Expected: "SoC=85.5,Temp=28.3,Voltage=48.1,Current=12.5"

    try {
      const params = {};
      data.split(',').forEach((pair) => {
        const [key, val] = pair.split('=');
        params[key?.trim()] = parseFloat(val);
      });

      if (params.SoC !== undefined) {
        this.status.power.battery_soc_percent = Math.clamp(0, params.SoC, 100);
      }
      if (params.Voltage !== undefined) {
        this.status.power.battery_voltage = params.Voltage;
      }
      if (params.Current !== undefined) {
        this.status.power.battery_current_amps = params.Current;
      }

      this.log('DEBUG', `BMS: SoC=${this.status.power.battery_soc_percent}% | Temp=${params.Temp}°C`);
    } catch (err) {
      this.log('WARN', `BMS parse error: ${err.message}`);
    }
  }

  calculateTierStatus() {
    // Smart tier management based on battery SoC
    const soc = this.status.power.battery_soc_percent;

    if (soc > 80) {
      this.status.tiers[0].status = 'ACTIVE';
      this.status.tiers[1].status = 'ACTIVE';
    } else if (soc > 50) {
      this.status.tiers[0].status = 'ACTIVE';
      this.status.tiers[1].status = 'THROTTLED';
    } else if (soc > 20) {
      this.status.tiers[0].status = 'CRITICAL';
      this.status.tiers[1].status = 'OFFLINE';
    } else {
      this.status.tiers[0].status = 'EMERGENCY';
      this.status.tiers[1].status = 'OFFLINE';
    }
  }

  async getPowerStatus() {
    this.calculateTierStatus();
    this.status.status = 'OPERATIONAL';
    this.status.timestamp = new Date().toISOString();
    return this.status;
  }

  log(level, message) {
    const entry = `[KINETIC][${level}] ${message}`;
    console.log(entry);
    this.logs.push(entry);
    if (this.logs.length > 1000) this.logs.shift(); // Keep last 1000 logs
  }

  getLogs(count = 20) {
    return this.logs.slice(-count);
  }
}

// Export as CommonJS for the main VITO server
module.exports = new KineticAgent();

// Auto-initialize telemetry polling if run standalone
if (require.main === module) {
  setInterval(async () => {
    const status = await module.exports.getPowerStatus();
    console.log(JSON.stringify(status, null, 2));
  }, parseInt(process.env.TELEMETRY_INTERVAL || '5000'));
}
