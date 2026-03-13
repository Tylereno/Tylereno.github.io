require('dotenv').config();
const path = require('path');

// Load agents from VITO Core library
const {
    VigilAgent,
    KineticAgent,
    StowAgent,
    GhostAgent,
    OttoAgent,
    ForgeAgent
} = require('vito-core');

const logger = {
    info: (msg) => console.log(`[${new Date().toISOString()}] ✅ ${msg}`),
    warn: (msg) => console.log(`[${new Date().toISOString()}] ⚠️  ${msg}`),
    error: (msg) => console.error(`[${new Date().toISOString()}] ❌ ${msg}`)
};

/**
 * PROGRAM: ark-farm-precision
 * MISSION: Smart farm - Autonomous irrigation and climate control
 * TIER: tier-2-industrial
 */

logger.info(`🚀 VITO Core v4.6.6: Booting ark-farm-precision...`);

// ============================================================================
// POWER ORCHESTRATION CASCADE
// Defines which containers to freeze/thaw at battery threshold levels
// ============================================================================
const sheddingCascade = { 50: ['cloud-sync', 'dashboard'], 30: ['non-critical-sensors'], 15: ['analytics'] };

// ============================================================================
// AGENT INITIALIZATION
// ============================================================================
const agentInstances = {};

async function initializeAgents() {
    logger.info('Initializing autonomous agents...');

    try {
        agentInstances.vigil = new VigilAgent({
            logger,
            thermalThreshold: 85,
            diskThreshold: 90,
            pollIntervalMs: 5000
        });
        agentInstances.kinetic = new KineticAgent({
            logger,
            sheddingCascade,
            pollIntervalMs: 10000,
            mockMode: process.env.KINETIC_MOCK === 'true'
        });
        agentInstances.stow = new StowAgent({
            logger,
            storagePath: '/data/crop-telemetry',
            flushIntervalMs: 2000,
            maxBufferSize: 5000
        });
        agentInstances.otto = new OttoAgent({
            logger,
            model: process.env.OLLAMA_MODEL || 'qwen2.5-coder:3b',
            ollamaHost: process.env.OLLAMA_HOST || 'http://localhost:11434',
            timeout: 30000
        });
        agentInstances.forge = new ForgeAgent({
            logger,
            maxRestartAttempts: 3,
            healthCheckIntervalMs: 30000
        });

        // Boot all agents in parallel
        const agents = Object.values(agentInstances);
        await Promise.all(agents.map(agent => agent.init?.()));

        logger.info('✅ All agents initialized and ready');
        return agents;
    } catch (error) {
        logger.error(`Agent initialization failed: ${error.message}`);
        process.exit(1);
    }
}

// ============================================================================
// MISSION LOOP
// ============================================================================
async function runMissionLoop(agents) {
    logger.info('🎯 Entering operational mission loop (20000ms interval)');

    setInterval(async () => {
        try {
            // Heartbeat collection
            const telemetry = {};

            if (agentInstances.vigil) {
                const health = await agentInstances.vigil.getStatus();
                telemetry.hardware = {
                    cpu_temp: health.cpu?.temp?.toFixed(1),
                    cpu_load: health.cpu?.load?.toFixed(2),
                    memory_pct: ((health.memory?.used / health.memory?.total) * 100).toFixed(1),
                    disk_pct: health.disk?.usedPercent?.toFixed(1)
                };
            }

            if (agentInstances.kinetic) {
                const power = agentInstances.kinetic.getCurrentState();
                telemetry.power = {
                    battery_pct: power.battery,
                    charging: power.charging,
                    frozen_count: power.frozenCount,
                    frozen_containers: power.frozenContainers
                };
            }

            if (agentInstances.ghost) {
                const mesh = await agentInstances.ghost.getMeshStatus?.();
                telemetry.network = {
                    mesh_status: mesh?.status || 'OFFLINE',
                    direct_peers: mesh?.directPeers || 0,
                    relay_peers: mesh?.relayPeers || 0
                };
            }

            if (agentInstances.forge) {
                const health = await agentInstances.forge.getSystemHealth?.();
                telemetry.containers = {
                    total: health?.containers?.total || 0,
                    running: health?.containers?.running || 0,
                    stopped: health?.containers?.stopped || 0
                };
            }

            // Persist telemetry
            if (agentInstances.stow) {
                await agentInstances.stow.log('mission_heartbeat', telemetry);
            }

        } catch (error) {
            logger.warn(`Mission loop error: ${error.message}`);
        }
    }, 20000);
}

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================
process.on('SIGINT', async () => {
    logger.info('🛑 Shutdown signal received...');

    if (agentInstances.stow) {
        logger.info('Flushing STOW buffer before exit...');
        await agentInstances.stow.flushBuffer?.();
    }

    logger.info('👋 Goodbye');
    process.exit(0);
});

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================
async function main() {
    try {
        const agents = await initializeAgents();
        await runMissionLoop(agents);
        logger.info('✨ ark-farm-precision is AUTONOMOUS and monitoring...');
    } catch (error) {
        logger.error(`Fatal error: ${error.message}`);
        process.exit(1);
    }
}

main();
