/* ═══════════════════════════════════════════════════════════════
   Requirements Traceability Matrix Data
   SF25D-T1201: Adaptive and Intelligent Space (AIS)
   ═══════════════════════════════════════════════════════════════ */

export const rtmData = [
  // Focus Area 1: Edge Computing & Algorithms
  { id: 1, ref: '§3.2', area: 'FA-1', req: 'Edge architectures for autonomous low-latency decision-making', vito: 'OTTO agent: local LLM (Ollama) OODA loop, <3 s inference, zero ground dependency', status: 'deployed', section: '2.1' },
  { id: 2, ref: '§3.2', area: 'FA-1', req: 'Fuse, process, filter data from multiple sources and sensors', vito: 'VERA agent: aggregates telemetry from all 8 agents; cross-domain correlation engine', status: 'deployed', section: '2.1' },
  { id: 3, ref: '§3.2', area: 'FA-1', req: 'Reduce kill-chain latency ≥50%', vito: 'Onboard inference 2–3 s vs. ground round-trip 0.5–10 s+; measured >80% reduction', status: 'deployed', section: '2.2' },
  { id: 4, ref: '§3.2', area: 'FA-1', req: 'Reduce operator workload ≥25%', vito: '8-agent crew handles power/health/data/comms/recovery autonomously; operators direct, not operate', status: 'deployed', section: '2.1' },
  { id: 5, ref: '§3.2', area: 'FA-1', req: 'Resilience to data poisoning, sensor degradation, high noise', vito: 'VIGIL: threshold-based anomaly detection; OTTO degrades gracefully to deterministic logic', status: 'deployed', section: '2.3' },
  { id: 6, ref: '§3.2', area: 'FA-1', req: 'Anomaly/maneuver detection AI/ML algorithms', vito: 'OTTO: telemetry pattern analysis via local LLM; compound failure detection across agents', status: 'deployed', section: '2.2' },
  { id: 7, ref: '§3.2', area: 'FA-1', req: 'Zero-trust for on-board computation', vito: 'GHOST: WireGuard (ChaCha20-Poly1305), JWT/TOTP auth, air-gap mode, per-peer cryptographic identity', status: 'deployed', section: '2.3' },
  { id: 8, ref: '§3.2', area: 'FA-1', req: 'Data compression and efficient data handling', vito: 'STOW: burst sync with buffered prioritization; delta-only uploads on reconnect', status: 'deployed', section: '2.3' },
  { id: 9, ref: '§3.2', area: 'FA-1', req: 'Data security and sovereign data persistence', vito: 'Local-first architecture (no cloud dependency), encrypted mesh, JSONL audit trail, NVMe atomic writes', status: 'deployed', section: '2.3' },
  { id: 10, ref: '§3.2', area: 'FA-1', req: 'Predictive threat analytics and orchestrated response', vito: 'VERA + OTTO: cross-domain correlation engine with LLM-driven threat assessment and autonomous response', status: 'proposed', section: '3.1' },
  { id: 11, ref: '§3.2', area: 'FA-1', req: 'Memory-safe language applications for autonomy', vito: 'Phase II: Rust-based agent core for safety-critical paths; current Python/Node.js with container isolation', status: 'phase2', section: '6.2' },
  { id: 12, ref: '§3.2', area: 'FA-1', req: 'Federated AI agents across systems/payloads', vito: 'CrewAI multi-agent orchestration; 8 agents with defined hierarchy and inter-agent communication', status: 'deployed', section: '2.1' },

  // Focus Area 2: Sensor Payloads
  { id: 13, ref: '§3.2', area: 'FA-2', req: 'Integrated sensor-computing packages for persistent tracking', vito: 'Coin nodes ($25 ea.): LoRa 915 MHz + GPS + environmental sensors with onboard processing', status: 'deployed', section: '4.1' },
  { id: 14, ref: '§3.2', area: 'FA-2', req: 'Software-defined or reconfigurable payloads', vito: 'Containerized services ≡ software-defined payloads; swap without bus firmware change', status: 'deployed', section: '2.1' },
  { id: 15, ref: '§3.2', area: 'FA-2', req: 'Techniques for novel SDA collection and data fusion', vito: 'Multi-modal telemetry fusion: LoRa mesh + OBD-II + Signal K + host sensors → unified VERA analysis', status: 'deployed', section: '2.2' },
  { id: 16, ref: '§3.2', area: 'FA-2', req: 'Solutions for improving satellite change detection', vito: 'Phase I: Adapt VIGIL anomaly detection for orbital object characterization via GMAT/STK integration', status: 'proposed', section: '3.2' },

  // Focus Area 3: Bus Design
  { id: 17, ref: '§3.2', area: 'FA-3', req: 'Autonomous load-shedding under duress', vito: 'KINETIC: 4-tier cascade via Linux cgroup freezer; freeze/thaw <100 ms; 12-month field validation', status: 'deployed', section: '2.3' },
  { id: 18, ref: '§3.2', area: 'FA-3', req: 'Hardware-agnostic flight software', vito: 'Docker containerization — runs on ARM, RISC-V, x86; any Linux-capable SoC', status: 'deployed', section: '2.1' },
  { id: 19, ref: '§3.2', area: 'FA-3', req: 'Software modularity for autonomous integration', vito: '17 mission profiles share 8 core agents; satellite bus = profile 18, same codebase', status: 'deployed', section: '2.1' },
  { id: 20, ref: '§3.2', area: 'FA-3', req: 'All-of-vehicle autonomous optimization', vito: 'VIGIL + KINETIC + FORGE coordinate: health/power/recovery optimization loop', status: 'deployed', section: '2.2' },
  { id: 21, ref: '§3.2', area: 'FA-3', req: 'Hardware modularity for rapid technology integration', vito: 'Docker Compose: add/remove services in seconds; hot-swap profiles at runtime', status: 'deployed', section: '2.1' },
  { id: 22, ref: '§3.2', area: 'FA-3', req: 'Reconfigurability across mission profiles and orbit transfers', vito: 'Profile selector: defense → mining → agriculture → orbital with one config delta', status: 'deployed', section: '6.1' },
  { id: 23, ref: '§3.2', area: 'FA-3', req: 'Autonomous maneuver for collision avoidance', vito: 'Phase II: Integrate KINETIC priority logic with orbital mechanics (GMAT conjunction assessment)', status: 'phase2', section: '6.2' },
  { id: 24, ref: '§3.2', area: 'FA-3', req: 'Bus platforms adaptable to technological change without re-architecture', vito: 'Container-native architecture: new capabilities deploy as containers, zero bus firmware changes', status: 'deployed', section: '2.1' },

  // Cross-cutting
  { id: 25, ref: '§4.1.3.1', area: 'Cross', req: 'Cyber Operations and Cybersecurity', vito: 'Container isolation, zero-trust mesh, encrypted comms, JSONL audit, air-gap capable', status: 'deployed', section: '2.3' },
  { id: 26, ref: '§4.1.3.2', area: 'Cross', req: 'Communications and Networks', vito: 'GHOST: Tailscale P2P mesh + LoRa 915 MHz + air-gap failover; no central infrastructure required', status: 'deployed', section: '2.3' },
  { id: 27, ref: '§4.1.4.2', area: 'Cross', req: 'Human-Machine Teaming and Interfaces', vito: 'Crew hierarchy: operators → OTTO (natural language) → specialist agents; configurable autonomy (LOW/MED/HIGH)', status: 'deployed', section: '2.2' },
  { id: 28, ref: '§4.1.4.5', area: 'Cross', req: 'Advanced Systems Engineering', vito: 'TRL 6; continuous field ops; documented architecture diagrams + decision trees + CONOPS', status: 'deployed', section: '4.1' },
  { id: 29, ref: '§4.1.4.6', area: 'Cross', req: 'Integrated Vehicle Health Management', vito: 'VIGIL: CPU/thermal/mem/disk/battery monitoring, threshold alerts, trending, historical analysis', status: 'deployed', section: '2.3' },
  { id: 30, ref: '§4.1.4.7', area: 'Cross', req: 'Power and Thermal Management', vito: 'KINETIC (power cascade) + VIGIL (thermal) = closed-loop power and thermal optimization', status: 'deployed', section: '2.3' },
  { id: 31, ref: '§4.1.4.16', area: 'Cross', req: 'Data Analytics and Artificial Intelligence', vito: 'GPU-accelerated Ollama + CrewAI orchestration + ChromaDB vector memory; fully local inference', status: 'deployed', section: '2.1' },
  { id: 32, ref: '§4.1.4.17', area: 'Cross', req: 'Low C-SWaP', vito: 'Commodity HW (NUC/$450); coin nodes $25 ea.; full 50-node mesh <$5K', status: 'deployed', section: '4.1' },
  { id: 33, ref: '§4.1.2', area: 'Cross', req: 'Rapid Multi-Domain Integration', vito: '17 profiles across 4 tiers (defense/industrial/logistics/civil); same agent core, single codebase', status: 'deployed', section: '6.1' },
];

export const agentData = [
  { name: 'VERA', role: 'Intelligence Officer', tier: 'Leadership', key: 'System-wide telemetry aggregation, pattern analysis, knowledge vault access, RAG-based historical query' },
  { name: 'OTTO', role: 'Decision Maker', tier: 'Leadership', key: 'Local LLM inference (Ollama), anomaly analysis, autonomous OODA loop, natural language operator interface' },
  { name: 'MASON', role: 'Resource Allocator', tier: 'Leadership', key: 'Agent capability management, crew scaling, resource allocation, task routing via CrewAI' },
  { name: 'VIGIL', role: 'Health Monitor', tier: 'Operations', key: 'CPU/thermal/memory/disk/battery monitoring with threshold alerting and historical trending' },
  { name: 'KINETIC', role: 'Power Engineer', tier: 'Operations', key: '4-tier autonomous load-shedding cascade via Linux cgroup freezer (freeze/thaw <100 ms)' },
  { name: 'STOW', role: 'Data Steward', tier: 'Operations', key: 'Atomic NVMe writes every 2 s (temp→rename); burst sync on connectivity restoration; zero data loss' },
  { name: 'GHOST', role: 'Network Security', tier: 'Operations', key: 'WireGuard zero-trust mesh (ChaCha20-Poly1305), Tailscale P2P, air-gap mode, LoRa fallback' },
  { name: 'FORGE', role: 'Recovery Engine', tier: 'Operations', key: 'Container auto-healing, service restart logic, crash loop prevention, post-failure state validation' },
];

export const workplanTasks = [
  { id: 'T1', name: 'Literature Review & State-of-Art Assessment', start: 0, duration: 4, critical: false, milestone: false, desc: 'Survey radiation-hardened edge computing, containerized flight software, and autonomous spacecraft bus architectures. Identify gaps in current COTS approaches.' },
  { id: 'T2', name: 'VITO Architecture Audit for Space Adaptation', start: 1, duration: 6, critical: true, milestone: false, desc: 'Systematic analysis of all 8 agents for orbital applicability. Map Linux /sys interfaces to SpaceWire/CAN bus. Identify radiation-sensitive code paths.' },
  { id: 'T3', name: 'Orbital Environment Modeling (University)', start: 2, duration: 8, critical: true, milestone: false, desc: 'GMAT/STK simulation of LEO eclipse cycles, radiation flux, thermal cycling. Generate orbital power profiles for KINETIC cascade validation.' },
  { id: 'T4', name: 'KINETIC Cascade — Eclipse Cycle Validation', start: 6, duration: 5, critical: true, milestone: false, desc: 'Validate 4-tier load-shedding against simulated eclipse power profiles. Measure cascade timing, data integrity during transitions.' },
  { id: 'T5', name: 'FORGE Recovery — SEU Rate Analysis', start: 6, duration: 5, critical: false, milestone: false, desc: 'Model Single Event Upset rates in LEO. Validate FORGE container recovery time vs. SEU frequency. Establish MTBF bounds.' },
  { id: 'T6', name: 'CONOPS Development (Joint)', start: 4, duration: 6, critical: true, milestone: false, desc: 'Co-author Concept of Operations with university partner. Define operational scenarios for autonomous spacecraft bus management in DDIL.' },
  { id: 'T7', name: 'Flat-Sat Software Testbed', start: 8, duration: 4, critical: true, milestone: false, desc: 'Deploy VITO stack on radiation-hardened SoC analog. Validate all 8 agents on ARM/RISC-V target with simulated telemetry.' },
  { id: 'T8', name: 'Trade Space Analysis', start: 4, duration: 4, critical: false, milestone: false, desc: 'Evaluate COTS vs. custom approaches for each subsystem. Cost-benefit analysis of containerization vs. RTOS for flight software.' },
  { id: 'T9', name: 'Feasibility Report & Phase II Plan', start: 10, duration: 3, critical: true, milestone: false, desc: 'Comprehensive feasibility assessment. Document all findings, risk mitigations. Propose Phase II prototype scope and budget.' },
  { id: 'M1', name: 'Initial Report', start: 3, duration: 0, critical: false, milestone: true, desc: 'Deliverable: Initial technical report with literature review findings and architecture audit preliminary results.' },
  { id: 'M2', name: 'Mid-Phase Review', start: 6, duration: 0, critical: true, milestone: true, desc: 'Exit Gate: CONOPS draft complete, orbital models validated, KINETIC adaptation feasibility confirmed.' },
  { id: 'M3', name: 'AIS Phase I Showcase (El Segundo, CA)', start: 12, duration: 0, critical: true, milestone: true, desc: 'Final deliverable: Live demonstration, Technical Volume (5 pages), Cost Volume, Presentation (10 slides). This constitutes Phase II proposal.' },
];

export const clawbandsTiers = [
  { action: 'Read-only monitoring (VIGIL telemetry, VERA analysis)', approval: 'Auto-approve', risk: 'None' },
  { action: 'Soft control (KINETIC container pause, GHOST mesh adjustment)', approval: 'Auto-approve + log', risk: 'Low' },
  { action: 'Destructive (FORGE container recreate, KINETIC full power-down)', approval: 'Operator review required', risk: 'High' },
];

export const validationMetrics = [
  { metric: 'System Uptime', value: '99.9%', context: 'In unconditioned thermal environments (−5°C to 45°C)' },
  { metric: 'Power Extension', value: '4× battery life', context: 'Via autonomous 4-tier load-shedding cascade on lower 50% charge' },
  { metric: 'Data Retention', value: '100%', context: 'During all planned and unplanned network outage events' },
  { metric: 'Cold Recovery', value: '<60 seconds', context: 'From hard power cycle to fully operational state' },
  { metric: 'Services Managed', value: '40+ containers', context: 'Simultaneously orchestrated via Docker Compose' },
  { metric: 'Human Intervention', value: 'Zero', context: 'For standard failure modes including power sag, service crash, network loss' },
  { metric: 'Freeze Latency', value: '<100 ms', context: 'cgroup freezer container suspend (process state preserved)' },
  { metric: 'Thaw Latency', value: '<100 ms', context: 'Instant resume from frozen state, zero data loss' },
  { metric: 'Worst-case Data Loss', value: '2 seconds', context: 'Atomic NVMe write interval; instantaneous power cut scenario' },
];

export const missionProfiles = [
  { tier: 'Tier 1: Defense', profiles: ['TRADEWINDS (UAV C2)', 'RESPONDER (Disaster)', 'MED (Field Hospital)'] },
  { tier: 'Tier 2: Industrial', profiles: ['EXTRACT (Mining)', 'UTILITY (Substation)', 'VESSEL (Offshore)', 'BUILD (Construction)', 'YIELD (Agriculture)', 'GENSET (Generators)', 'TOWER (Cell Sites)'] },
  { tier: 'Tier 3: Logistics', profiles: ['TRANSIT (Fleet)', 'FLOW (Warehouse)', 'CHARGE (EV/V2G)'] },
  { tier: 'Tier 4: Civil', profiles: ['CAMPUS (Education)', 'HABITAT (Smart Home)', 'NOMAD (RV/Mobile)', 'POS (Retail)'] },
  { tier: 'Tier 5: Space (Phase II)', profiles: ['ORBITAL-LEO (Spacecraft Bus Mgmt)', 'CONSTEL (Federated Constellation)'] },
];

/* ── Critical Technology Elements ── */
export const cteData = [
  {
    id: 'CTE-1', name: 'Containerized Agent Runtime on Radiation-Hardened SoC',
    trl: 'TRL 6→7', risk: 'Med',
    description: 'Docker container isolation on ARM/RISC-V Linux. VITO runs on Lenovo P53 (x86). Porting to Xilinx Zynq UltraScale+ or equivalent rad-hard SoC requires kernel and driver validation.',
    validation: 'Phase I: Test on Raspberry Pi 4 (ARM64) as SoC analog. Phase II: Engage radiation-hardened partner (SpaceCube, Maxwell).', heritage: 'Docker multi-arch builds; proven on ARM Linux in terrestrial deployments.',
  },
  {
    id: 'CTE-2', name: 'Autonomous Eclipse-Cycle Power Management',
    trl: 'TRL 6', risk: 'Low',
    description: 'KINETIC 4-tier cgroup cascade deployed and field-validated. Adaptation: replace solar irradiance measurements with GMAT/STK orbital predictions for predictive (not reactive) shedding.',
    validation: 'Phase I: SJSU orbital simulation provides eclipse profiles as KINETIC input. Validate cascade timing vs. eclipse duration.', heritage: '12+ months field operation; 4× battery life extension measured.',
  },
  {
    id: 'CTE-3', name: 'Atomic Data Persistence Under Power Transients',
    trl: 'TRL 6', risk: 'Low',
    description: 'STOW atomic write pattern (temp-file-then-rename) provides crash-safe persistence. Storage medium adaptation from NVMe to space-grade NAND Flash requires write endurance analysis.',
    validation: 'Phase I: Model write cycles/day vs. Flash endurance (typ. 100K cycles). Phase II: Validate on space-grade storage.', heritage: 'Zero data loss across all power cycling events in 12-month validation.',
  },
  {
    id: 'CTE-4', name: 'Onboard LLM Inference at Radiation-Hardened Compute Rates',
    trl: 'TRL 4→5', risk: 'High',
    description: 'OTTO uses NVIDIA Quadro T2000 GPU for Ollama inference (< 3 s). Transition to rad-hard processor requires quantized model evaluation. GPU availability in space-grade hardware is limited.',
    validation: 'Phase I: Benchmark quantized models (GGUF Q4) on ARM64 CPU-only. Measure acceptable latency bounds for DDIL scenarios.', heritage: 'Ollama supports CPU inference; qwen2.5 GGUF Q4 runs on Raspberry Pi at 10-30 tok/s.',
  },
  {
    id: 'CTE-5', name: 'Zero-Trust Mesh for Inter-Satellite Communication',
    trl: 'TRL 5→6', risk: 'Med',
    description: 'GHOST WireGuard mesh validated over terrestrial internet and LAN. Adaptation to inter-satellite links (ISL) requires integration with S-band TT&C protocols and FSO (Free Space Optical) links.',
    validation: 'Phase I: Simulate ISL as high-latency, lossy WireGuard tunnel (1-10 s RTT, 30% packet loss). Measure mesh resilience.', heritage: 'WireGuard operates over any UDP transport; validated over lossy LoRa 915 MHz links.',
  },
  {
    id: 'CTE-6', name: 'SpaceWire / CAN Bus Telemetry Abstraction',
    trl: 'TRL 3→4', risk: 'High',
    description: 'VITO currently binds to Signal K, OBD-II, and Linux /sys interfaces. Replacing these with SpaceWire and CANbus drivers requires new platform abstraction layer. This is the highest-risk interface change.',
    validation: 'Phase I: Define interface specification and data model. Phase II: Implement drivers using COTS SpaceWire interface cards.', heritage: 'VITO sensor abstraction is modular; Signal K → SpaceWire is a driver swap, not an architecture change.',
  },
];

/* ── Technical Risk Registry ── */
export const riskRegistry = [
  { id: 'R-01', area: 'CTE-4', risk: 'Onboard LLM inference too slow on rad-hard CPU without GPU', prob: 'Med', impact: 'High', mitigation: 'Benchmark CPU-only inference in Phase I. If >30s, scope agent to deterministic logic for Phase II with LLM as advisory-only.' },
  { id: 'R-02', area: 'CTE-6', risk: 'SpaceWire telemetry driver development scope underestimated', prob: 'Med', impact: 'Med', mitigation: 'Phase I defines interface spec only. Phase II partners with COTS SpaceWire vendor (e.g., Cobham, Shimafuji). Fallback: use discretized CAN bus interface.' },
  { id: 'R-03', area: 'CTE-1', risk: 'Linux kernel not available on target rad-hard SoC', prob: 'Low', impact: 'High', mitigation: 'Xilinx Zynq UltraScale+ runs Linux on A53 cores. Maxwell SCS750 runs VxWorks — if Linux unavailable, scope to RTOS with POSIX subset and select agents only.' },
  { id: 'R-04', area: 'CTE-5', risk: 'WireGuard session resumption fails after long eclipse blackout', prob: 'Med', impact: 'Med', mitigation: 'GHOST already implements reconnect logic for terrestrial outages. Phase I: test with 90-min simulated blackout periods matching LEO eclipse duration.' },
  { id: 'R-05', area: 'CTE-3', risk: 'Space-grade Flash write endurance exhausted by STOW write rate', prob: 'Low', impact: 'Med', mitigation: 'Current: 2-second write interval = ~43,200 write/day. At 100K cycle endurance, Flash lasts ~2.3 years. Phase I: model write reduction strategies (delta-only, compression).' },
  { id: 'R-06', area: 'CTE-2', risk: 'Eclipse prediction accuracy insufficient for proactive shedding', prob: 'Low', impact: 'Low', mitigation: 'GMAT STK predictions are accurate to sub-second for LEO TLEs. KINETIC also maintains reactive threshold-based fallback independent of predictions.' },
  { id: 'R-07', area: 'ITAR', risk: 'Foreign national participation in SJSU research team', prob: 'Med', impact: 'Med', mitigation: 'SJSU has established ITAR compliance protocols. All ITAR-sensitive work performed by US persons. Non-US researchers assigned to unclassified orbital mechanics tasks only.' },
  { id: 'R-08', area: 'Schedule', risk: 'AIS Phase I Showcase prep competes with T7 (Flat-Sat) testbed', prob: 'Med', impact: 'Med', mitigation: 'T9 (final report) and showcase prep overlap M11-M12. Showcase deck is a subset of the report. Buffer built into M11 schedule.' },
];

/* ── Literature References ── */
export const literatureRefs = [
  { id: '1', citation: 'The Economist, "How US Space Command is preparing for satellite-on-satellite combat," July 2025.', relevance: 'Establishes operational urgency for autonomous space battle management and kill-chain acceleration.' },
  { id: '2', citation: 'US Space Force, "Space Warfighting: A Framework for Planners," April 2025.', relevance: 'Defines SDA, Space Control, and Battle Management mission framework that VITO CONOPS maps to directly.' },
  { id: '3', citation: 'RAND Corporation, RRA2318-1, "Autonomous Systems for Space Operations."', relevance: 'Documents capability gaps in current ground-loop architectures; validates need for onboard autonomy.' },
  { id: '4', citation: 'IEEE Xplore, 10115983, "Edge AI for Satellite Onboard Processing," 2023.', relevance: 'Establishes technical baseline for neural network inference on spacecraft-class compute (inference <5s achievable with quantized models).' },
  { id: '5', citation: 'NASA NTRS, 20240001139, "Current Technology in Space," 2024.', relevance: 'Documents TRL progression for autonomous spacecraft software; validates containerization as viable approach for modularity.' },
  { id: '6', citation: 'Lockheed Martin, AIAA-6.2022-1472, "AI/ML Mission Processing Onboard Satellites," 2022.', relevance: 'Confirms feasibility of onboard AI/ML for SDA applications; identifies SWaP-constrained inference as primary technical challenge.' },
];
