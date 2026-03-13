/* ═══════════════════════════════════════════════════════════════
   Mermaid Diagram Definitions — B&W Print-Optimized
   RULE: NO nested subgraphs — they render illegibly at print scale.
         Max 1 subgraph level, prefer flat layouts.
   ═══════════════════════════════════════════════════════════════ */

const BW_INIT = `%%{init: {'theme': 'base', 'flowchart': {'useMaxWidth': true, 'nodeSpacing': 40, 'rankSpacing': 55, 'padding': 20}, 'themeVariables': {'primaryColor': '#f0f0f0', 'primaryTextColor': '#000000', 'primaryBorderColor': '#000000', 'lineColor': '#333333', 'fontSize': '13px', 'edgeLabelBackground': '#ffffff', 'clusterBkg': '#f5f5f5', 'clusterBorder': '#333333'}}}%%`;

/* ─────────────────────────────────────────────────────────────
   Figure 2 — System Topology
   Flat LR layout. Physical left → Docker host center → Interface right.
   ───────────────────────────────────────────────────────────── */
export const topologyDiagram = `${BW_INIT}
graph LR
    classDef hw fill:#ffffff,stroke:#000,stroke-width:2px,color:#000
    classDef infra fill:#f5f5f5,stroke:#777,stroke-width:1px,color:#000
    classDef ai fill:#e8e8e8,stroke:#000,stroke-width:1.5px,color:#000
    classDef agent fill:#d0d0d0,stroke:#000,stroke-width:2px,color:#000
    classDef gate fill:#ffffff,stroke:#000,stroke-width:2px,stroke-dasharray:6 3,color:#000
    classDef iface fill:#f0f0f0,stroke:#555,stroke-width:1px,color:#000
    classDef store fill:#e0e0e0,stroke:#000,stroke-width:1.5px,color:#000

    POWER["POWER SUBSYSTEM\nSolar Array - BMS - LiFePO4 - PSU"]:::hw
    SENSE["SENSOR INPUTS\nSignal K :3000 · OBD-II :5050 · LoRa Mesh"]:::hw

    POWER -->|"DC power"| HOST
    SENSE -->|"telemetry"| HOST

    HOST["LINUX HOST\nUbuntu 22.04 · Docker Engine\nvito_network"]:::hw

    HOST --> INFRA
    HOST --> OLLAMA
    HOST --> CREW

    INFRA["INFRASTRUCTURE\nTraefik · Autoheal · Watchtower · Uptime Kuma"]:::infra

    OLLAMA["Ollama LLM :11434\nqwen2.5 · granite4"]:::ai
    CHROMA[("ChromaDB :8000\nVector Memory")]:::ai
    NVME[("NVMe RAID 1\nAtomic Storage")]:::store

    CREW["CrewAI Orchestrator :8085\nTask Router + MASON"]:::ai

    CREW --> VERA & OTTO & MASON
    CREW --> VIGIL & KINETIC & STOW & GHOST & FORGE

    VERA["VERA\nIntelligence"]:::agent
    OTTO["OTTO\nDecision"]:::agent
    MASON["MASON\nResources"]:::agent
    VIGIL["VIGIL\nHealth"]:::agent
    KINETIC["KINETIC\nPower"]:::agent
    STOW["STOW\nData"]:::agent
    GHOST["GHOST\nMesh"]:::agent
    FORGE["FORGE\nRecovery"]:::agent

    OTTO -->|"local inference"| OLLAMA
    VERA <-->|"query / write"| CHROMA
    STOW -->|"atomic write"| NVME
    NVME -->|"embed"| CHROMA

    KINETIC -->|"shed request"| GATE
    FORGE -->|"restart request"| GATE
    GATE{"ClawBands\nSafety Gate"}:::gate
    GATE -->|"approved cmd"| HOST

    CREW --> API
    API["vito-server :3001"]:::iface
    API --> DASH["Dashboard :5173"]:::iface
    DASH <-->|"commands"| OP["Operator"]:::iface`;

/* ─────────────────────────────────────────────────────────────
   Figure 3 — Six-Phase OODA Decision Cycle
   Simple linear LR with one approval branch to operator
   ───────────────────────────────────────────────────────────── */
export const decisionCycleDiagram = `${BW_INIT}
graph LR
    classDef phase fill:#f5f5f5,stroke:#000,stroke-width:2px,color:#000
    classDef gate fill:#ffffff,stroke:#000,stroke-width:2px,stroke-dasharray:6 3,color:#000
    classDef human fill:#e0e0e0,stroke:#000,stroke-width:2px,color:#000

    OBS["1. OBSERVE\nVIGIL\nSignal K · OBD-II\nLoRa · Host /sys"]:::phase
    ANA["2. ANALYZE\nVERA + CrewAI\nAnomaly Detection\nRAG History Query"]:::phase
    DEC["3. DECIDE\nOTTO + MASON\nLLM Reasoning\nResource Allocation"]:::phase
    APP{"4. APPROVE\nClawBands Gate\nRisk Evaluation"}:::gate
    EXE["5. EXECUTE\nKINETIC · FORGE · GHOST\nDocker API Actions"]:::phase
    STR["6. STORE + LEARN\nSTOW + ChromaDB\nAtomic Persistence\nVector Embedding"]:::phase
    HUM["Operator Review\n(destructive only)"]:::human

    OBS -->|"anomaly escalation"| ANA
    ANA -->|"threat assessment"| DEC
    DEC -->|"action plan"| APP
    APP -->|"low risk: auto-approve"| EXE
    APP -->|"destructive: hold"| HUM
    HUM -->|"approve or deny"| APP
    EXE -->|"result + audit log"| STR
    STR -.->|"historical context"| OBS`;

/* ─────────────────────────────────────────────────────────────
   Figure 4 — KINETIC Power Cascade (4-tier cgroup freeze)
   Top-down chain showing SoC thresholds and frozen services
   ───────────────────────────────────────────────────────────── */
export const powerCascadeDiagram = `${BW_INIT}
graph TD
    classDef active fill:#ffffff,stroke:#000,stroke-width:2px,color:#000
    classDef restore fill:#f0f0f0,stroke:#000,stroke-width:1px,stroke-dasharray:4 2,color:#555

    SOC100["SoC above 80 percent — ALL TIERS ACTIVE\nTier 0: Core Infrastructure\nTier 1: Operations + Agents\nTier 2: Dev + Analytics\nTier 3: Media + Stream"]:::active

    SOC80["SoC 60-80 percent — TIER 3 FROZEN\nTier 0: Core — RUNNING\nTier 1: Ops — RUNNING\nTier 2: Dev — RUNNING\nTier 3: Media — SUSPENDED via cgroup freezer"]:::active

    SOC60["SoC 40-60 percent — TIERS 2+3 FROZEN\nTier 0: Core — RUNNING\nTier 1: Ops — RUNNING\nTier 2: Dev — SUSPENDED\nTier 3: Media — SUSPENDED"]:::active

    SOC40["SoC below 40 percent — MINIMUM POWER\nTier 0: Core only — RUNNING\nTier 1+2+3 — ALL SUSPENDED\nComms + logging preserved"]:::active

    THAW["POWER RESTORED\nAll tiers thaw in order\nFreeze and thaw latency less than 100 ms each\nZero data loss — processes resume in-place"]:::restore

    SOC100 -->|"SoC drops below 80 percent"| SOC80
    SOC80 -->|"SoC drops below 60 percent"| SOC60
    SOC60 -->|"SoC drops below 40 percent"| SOC40
    SOC40 -.->|"SoC recovers"| THAW
    THAW -.->|"cascade unwinds"| SOC100`;

/* ─────────────────────────────────────────────────────────────
   Figure 6 — Orbital CONOPS
   VITO onboard spacecraft: autonomous decision, periodic ground sync
   ───────────────────────────────────────────────────────────── */
export const conopsDiagram = `${BW_INIT}
graph TD
    classDef env fill:#ffffff,stroke:#777,stroke-width:1px,stroke-dasharray:5 3,color:#555
    classDef space fill:#f5f5f5,stroke:#000,stroke-width:2px,color:#000
    classDef ground fill:#e8e8e8,stroke:#000,stroke-width:2px,color:#000
    classDef gate fill:#ffffff,stroke:#000,stroke-width:2px,stroke-dasharray:6 3,color:#000

    ENV["SPACE ENVIRONMENT\nEclipse cycles · Radiation flux · DDIL comms · Adversary RF denial"]:::env

    subgraph SAT["SPACECRAFT BUS — VITO ONBOARD — AUTONOMOUS OPERATION"]
        PAYLOAD["Mission Payload\nPassive RF · LiDAR · IR · Hyperspectral"]:::space
        BUS["Bus Subsystems\nPower · Thermal · Attitude · Comms"]:::space
        VITO["VITO Agent Stack\nOTTO: Decision less-than 3s · VERA: Threat Analysis\nKINETIC: Eclipse Power · VIGIL: Health\nFORGE: Fault Recovery · STOW: Data"]:::space
        SAFE{"ClawBands Gate\nSafety Arbitration"}:::gate
    end

    GROUND["Ground Segment\nTT&C Contact: periodic, non-critical\nAction audit logs burst on uplink"]:::ground
    OPS["Mission Operator\nStrategic tasking only\nException review"]:::ground

    ENV -->|"anomaly trigger"| VITO
    PAYLOAD -->|"sensor data"| VITO
    BUS -->|"power and thermal state"| VITO
    VITO -->|"autonomous decision"| SAFE
    SAFE -->|"approved: execute"| BUS
    SAFE -->|"approved: execute"| PAYLOAD
    SAT <-->|"Periodic TT&C\nnon-critical sync"| GROUND
    VITO -->|"full audit log"| GROUND
    GROUND <--> OPS`;
