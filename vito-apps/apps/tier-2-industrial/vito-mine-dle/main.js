require('dotenv').config();
const {
  VigilAgent,
  KineticAgent,
  StowAgent,
  GhostAgent,
  ForgeAgent
} = require('../../../packages/vito-core');

const manifest = require('./manifest.json');

/**
 * PROGRAM: VITO-MINE-DLE (Codename: EXTRACT)
 * TIER: 2 (Industrial & Infrastructure)
 *
 * MISSION: Direct Lithium Extraction with zero data loss during multi-day
 * satellite outages and dust storms. Autonomous operation in remote salt flats.
 *
 * KEY CAPABILITY: 72-hour NVMe store-and-forward + Modbus sensor integration +
 * autonomous PLC bridge recovery.
 */

// Initialize logger
const logger = {
  info: (msg) => console.log(`[EXTRACT] ⛏️  ${msg}`),
  warn: (msg) => console.warn(`[EXTRACT] ⚠️  ${msg}`),
  error: (msg) => console.error(`[EXTRACT] ❌ ${msg}`)
};

logger.info(`🚀 Booting ${manifest.program} (${manifest.codename})...`);

// Industrial Power Shedding Cascade (Conservative - preserve data collection)
const industrialCascade = {
  40: ['local-dashboard-ui', 'grafana'],        // Shed UI, keep processing
  20: ['backup-service'],                       // Shed non-essential services
  // Below 20%: ONLY Data Logger (STOW) and Modbus PLC Bridge survive
};

// Initialize agents (omit OTTO for pure industrial operation)
const vigil = new VigilAgent({
  logger,
  thermalThreshold: 90,  // Higher threshold for desert heat
  diskThreshold: 95,
  pollIntervalMs: 30000  // Slow polling for stable industrial environments
});

const kinetic = new KineticAgent({
  logger,
  sheddingCascade: industrialCascade,
  pollIntervalMs: 60000, // Very slow polling (solar is stable)
  mockMode: process.env.KINETIC_MOCK === 'true'
});

const stow = new StowAgent({
  logger,
  storagePath: '/data/mine-dle/compliance-logs',
  flushIntervalMs: 5000,  // Moderate flush interval (stable power)
  maxBufferSize: 5000
});

const ghost = new GhostAgent({ logger });

const forge = new ForgeAgent({
  logger,
  healthCheckIntervalMs: 60000, // Check every minute
  maxRestartAttempts: 5          // More aggressive restart in remote area
});

async function main() {
  try {
    // Initialize agents
    await Promise.all([
      vigil.init(),
      kinetic.init(),
      stow.init(),
      ghost.init(),
      forge.init()
    ]);

    logger.info('✅ EXTRACT Mission Stack Ready.');
    logger.info('Operating in Store-and-Forward mode. 72-hour NVMe cache active.\n');

    // Watch the Modbus bridge PLC (critical for sensor data collection)
    forge.startHealthMonitoring(['modbus-bridge', 'sensor-aggregator']);

    // Industrial Control Loop (runs every 30 seconds for stable operation)
    let operationTick = 0;
    setInterval(async () => {
      operationTick++;

      // 1. VIGIL: Check hardware (especially thermal in desert)
      const hardwareStatus = await vigil.getStatus();
      if (hardwareStatus && operationTick % 2 === 0) {
        const thermalAlert = hardwareStatus.cpu.temp > 85 ? '🔥' : '✓';
        logger.info(`${thermalAlert} Thermal: ${hardwareStatus.cpu.temp}°C | Disk: ${hardwareStatus.disk[0]?.used_percent}%`);
      }

      // 2. KINETIC: Monitor solar power
      const powerState = kinetic.getCurrentState();
      logger.info(`Solar: ${powerState.battery}% | Charging: ${powerState.charging}`);

      // 3. STOW: Log high-resolution sensor data (STORE-AND-FORWARD)
      const sensorData = {
        timestamp: new Date().toISOString(),
        extraction_data: {
          flow_rate_lpm: 45.2 + (Math.random() - 0.5) * 10,  // Mock sensor
          pressure_psi: 28.5 + (Math.random() - 0.5) * 5,
          temp_celsius: 62.3 + Math.random() * 3,
          lithium_concentration_ppm: 1280 + Math.random() * 50
        },
        system_health: {
          modbus_connected: true,
          uptime_hours: Math.floor(operationTick / 120)
        }
      };

      await stow.log('sensor_stream', sensorData);

      // 4. GHOST: Check for satellite link (will fail during dust storm, that's OK)
      if (operationTick % 4 === 0) {
        const mesh = await ghost.getMeshStatus();
        logger.info(`Network: ${mesh.status === 'CONNECTED' ? '✓ Connected' : '⚠️ Offline (satellite blackout OK)'}`);
      }

      // 5. FORGE: Ensure Modbus PLC bridge is alive (auto-restart if crashed)
      if (operationTick % 2 === 0) {
        const modbusStatus = await forge.getContainerStatus('modbus-bridge');
        if (modbusStatus && !modbusStatus.running) {
          logger.warn(`Modbus bridge crashed. Attempting auto-restart...`);
          await forge.restartService('modbus-bridge');
        }
      }

      // 6. STOW STATS: Every 5 minutes, log buffer status
      if (operationTick % 10 === 0) {
        const stowStats = await stow.getStats();
        logger.info(`[STOW] Buffered: ${stowStats.buffered_records} in-memory + ${stowStats.persisted_files} files on NVMe`);
      }

    }, 30000);

  } catch (error) {
    logger.error(`Fatal error during initialization: ${error.message}`);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('\n\nShutting down gracefully...');
  // Flush STOW buffer before exiting
  await stow.flushBuffer();
  const buffered = await stow.getBufferedData();
  logger.info(`[STOW] ${buffered.length} total records persisted to NVMe. Safe to power down.`);
  process.exit(0);
});

main();
