#!/usr/bin/env node

// Base main.js template for VITO programs
// Each program inherits from this and extends with app-specific logic

const vitoCore = require('../../../packages/vito-core');
const manifest = require('./manifest.json');

class VITOProgram {
  constructor() {
    this.manifest = manifest;
    this.config = this.loadConfig();
    this.agents = this.initializeAgents();
  }

  loadConfig() {
    // Load environment variables from manifest.environment_variables
    // and .env file overrides
    const config = {
      ...manifest.environment_variables,
      ...process.env
    };
    return config;
  }

  initializeAgents() {
    const agents = {};

    if (manifest.agents_enabled.includes('VIGIL')) {
      agents.vigil = vitoCore.vigil;
      vitoCore.vigil.initialize();
    }

    if (manifest.agents_enabled.includes('STOW')) {
      agents.stow = vitoCore.stow;
      vitoCore.stow.initialize();
    }

    if (manifest.agents_enabled.includes('KINETIC')) {
      agents.kinetic = vitoCore.kinetic;
      vitoCore.kinetic.initialize();
    }

    if (manifest.agents_enabled.includes('GHOST')) {
      agents.ghost = vitoCore.ghost;
      vitoCore.ghost.initialize();
    }

    if (manifest.agents_enabled.includes('OTTO')) {
      agents.otto = vitoCore.otto;
      vitoCore.otto.initialize();
    }

    if (manifest.agents_enabled.includes('FORGE')) {
      agents.forge = vitoCore.forge;
      vitoCore.forge.initialize();
    }

    return agents;
  }

  start() {
    console.log(`🚀 Starting ${manifest.program} (${manifest.codename})`);
    console.log(`   Tier: ${manifest.tier}`);
    console.log(`   Challenge: ${manifest.challenge}`);

    // Start all initialized agents
    Object.keys(this.agents).forEach(agentName => {
      console.log(`   ✓ ${agentName.toUpperCase()} enabled`);
    });

    // App-specific initialization happens here
    this.run();
  }

  run() {
    // Override in subclasses with app-specific logic
    console.log('Base program running. Override run() in subclass.');
  }

  async handlePowerShedding(batteryPercent) {
    if (!this.agents.kinetic) return;

    const powerBehavior = manifest.power_behavior;
    let action = null;

    if (batteryPercent >= 80) {
      action = powerBehavior['100_percent'];
    } else if (batteryPercent >= 60) {
      action = powerBehavior['60_percent'] || powerBehavior['80_percent'];
    } else if (batteryPercent >= 40) {
      action = powerBehavior['40_percent'];
    } else if (batteryPercent >= 15) {
      action = powerBehavior['20_percent'];
    } else {
      action = powerBehavior['10_percent'];
    }

    console.log(`⚡ Battery ${batteryPercent}%: ${action}`);
    await this.agents.kinetic.shedServices(batteryPercent);
  }

  async shutdown(reason) {
    console.log(`🛑 Shutting down: ${reason}`);

    if (this.agents.stow) {
      // Flush any pending logs to NVMe
      await this.agents.stow.syncWhenOnline();
    }

    process.exit(0);
  }
}

// Export for subclass extension
module.exports = VITOProgram;

// Auto-start if run directly
if (require.main === module) {
  const program = new VITOProgram();
  program.start();
}
