require('dotenv').config();
const {
  VigilAgent,
  KineticAgent,
  StowAgent,
  GhostAgent,
  OttoAgent,
  ForgeAgent
} = require('../../../packages/vito-core');

const manifest = require('./manifest.json');

/**
 * PROGRAM: VITO-FIRE-DISASTER (Codename: BLAZE)
 * TIER: 1 (Critical Response & Defense)
 *
 * MISSION: Maintain autonomous mobile command post during emergency response
 * when grid and conventional comms are down.
 *
 * KEY CAPABILITY: 4x battery extension via aggressive non-essential shedding.
 * On Lenovo P53: Sheds Plex/Jellyfin, then dashboards, then AI, preserving
 * only Radio Bridge, STOW logging, and emergency protocols.
 */

// Initialize logger
const logger = {
  info: (msg) => console.log(`[BLAZE] 📡 ${msg}`),
  warn: (msg) => console.warn(`[BLAZE] ⚠️  ${msg}`),
  error: (msg) => console.error(`[BLAZE] ❌ ${msg}`)
};

logger.info(`🚀 Booting ${manifest.program} (${manifest.codename})...`);

// Emergency Power Shedding Cascade (Aggressive for critical response)
const emergencyCascade = {
  80: ['plex', 'jellyfin', 'media-server'],      // Shed entertainment immediately
  60: ['grafana', 'homeassistant-ui', 'dashboard'],  // Shed non-critical UI
  40: ['otto-llm', 'analytics-engine'],          // Shed AI + heavy computation
  20: ['file-sync', 'backup-service'],           // Stop syncing
  // Below 20%: ONLY TIER 0 survives (VIGIL, STOW, GHOST, Radio Bridge)
};

// Initialize all agents for defense tier
const vigil = new VigilAgent({
  logger,
  thermalThreshold: 85,
  pollIntervalMs: 5000
});

const kinetic = new KineticAgent({
  logger,
  sheddingCascade: emergencyCascade,
  pollIntervalMs: 5000, // Fast polling for unstable grid
  mockMode: process.env.KINETIC_MOCK === 'true'
});

const stow = new StowAgent({
  logger,
  storagePath: '/data/fire-disaster/mission-logs',
  flushIntervalMs: 1000 // Frequent flush for mission-critical logging
});

const ghost = new GhostAgent({ logger });

const otto = new OttoAgent({
  logger,
  model: process.env.OLLAMA_MODEL || 'qwen2.5-coder:3b',
  ollamaHost: process.env.OLLAMA_HOST || 'http://localhost:11434'
});

const forge = new ForgeAgent({
  logger,
  healthCheckIntervalMs: 30000,
  maxRestartAttempts: 2
});

async function main() {
  try {
    // Initialize all agents in parallel
    await Promise.all([
      vigil.init(),
      kinetic.init(),
      stow.init(),
      ghost.init(),
      otto.init(),
      forge.init()
    ]);

    logger.info('✅ BLAZE Mission Stack Ready.');
    logger.info('Monitoring systems for emergency response...\n');

    // Start FORGE health monitoring on critical services
    forge.startHealthMonitoring(['radio-bridge', 'stow-logger', 'ghost-mesh']);

    // Mission Control Loop (runs every 10 seconds)
    let missionTick = 0;
    setInterval(async () => {
      missionTick++;

      // 1. VIGIL: Check hardware health
      const hardwareStatus = await vigil.getStatus();
      if (hardwareStatus && missionTick % 3 === 0) {
        // Log every 30 seconds
        logger.info(`Hardware: CPU ${hardwareStatus.cpu.load}% | Temp ${hardwareStatus.cpu.temp}°C | Mem ${hardwareStatus.memory.percent}%`);
      }

      // 2. KINETIC: Check power state
      const powerState = kinetic.getCurrentState();
      if (powerState.battery <= 20) {
        logger.warn(`🔋 CRITICAL POWER: ${powerState.battery}% | Frozen: ${Array.from(powerState.frozenContainers).join(', ')}`);
      }

      // 3. STOW: Log mission telemetry
      await stow.log('mission_heartbeat', {
        tick: missionTick,
        power: powerState,
        hardware: hardwareStatus ? { cpu_load: hardwareStatus.cpu.load, temp: hardwareStatus.cpu.temp } : null
      });

      // 4. GHOST: Check mesh connectivity
      if (missionTick % 6 === 0) {
        const mesh = await ghost.getMeshStatus();
        if (mesh.status === 'CONNECTED') {
          logger.info(`Mesh: ${mesh.peers.length} peers | ${mesh.direct_connections} direct | ${mesh.relay_connections} relay`);
        } else {
          logger.warn(`Mesh Status: ${mesh.status}`);
        }
      }

      // 5. FORGE: Check critical services
      if (missionTick % 3 === 0) {
        const health = await forge.getSystemHealth();
        if (health.containers.stopped > 0) {
          logger.info(`Services: ${health.containers.running} running, ${health.containers.stopped} stopped`);
        }
      }

    }, 10000);

  } catch (error) {
    logger.error(`Fatal error during initialization: ${error.message}`);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  logger.info('\n\nShutting down gracefully...');
  // Flush STOW logs before exit
  await stow.flushBuffer();
  logger.info('STOW logs flushed. Goodbye.');
  process.exit(0);
});

main();
