import React from 'react';

/* ── Shared slide primitives ── */

function SlideAccentBar({ color = '#3b82f6' }) {
  return (
    <div
      className="slide-accent-bar"
      style={{ background: `linear-gradient(90deg, ${color} 0%, transparent 100%)` }}
    />
  );
}

function SlideNumber({ n, total = 10 }) {
  return <div className="slide-number">{n} / {total}</div>;
}

function SlideFooter({ tag = 'SF25D-T1201 · VITO Series-4 · AIS Phase I Showcase' }) {
  return <div className="slide-footer-tag">{tag}</div>;
}

function SectionLabel({ children, color = '#3b82f6' }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        marginBottom: '12px',
      }}
    >
      {children}
    </div>
  );
}

function SlideTitle({ children }) {
  return (
    <h1
      style={{
        fontSize: '36px',
        fontWeight: 800,
        lineHeight: 1.15,
        marginBottom: '8px',
        color: '#f8fafc',
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </h1>
  );
}

function SlideSubtitle({ children }) {
  return (
    <p
      style={{
        fontSize: '16px',
        color: '#94a3b8',
        fontWeight: 400,
        lineHeight: 1.5,
        marginBottom: '0',
      }}
    >
      {children}
    </p>
  );
}

function MetricBox({ value, label, color = '#3b82f6' }) {
  return (
    <div
      style={{
        background: '#1e293b',
        border: `1px solid ${color}33`,
        borderRadius: '6px',
        padding: '18px 20px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '30px', fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace" }}>
        {value}
      </div>
      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', letterSpacing: '0.04em' }}>
        {label}
      </div>
    </div>
  );
}

function Tag({ children, color = '#3b82f6' }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '4px',
        background: `${color}22`,
        border: `1px solid ${color}44`,
        color,
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: "'JetBrains Mono', monospace",
        marginRight: '6px',
        marginBottom: '4px',
        letterSpacing: '0.04em',
      }}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 1 — COVER
══════════════════════════════════════════════════════════════════════ */
function Slide01() {
  return (
    <div className="slide" style={{ justifyContent: 'center' }}>
      <SlideAccentBar color="#3b82f6" />

      {/* Classification banner */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: '10px',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#475569',
          letterSpacing: '0.1em',
        }}
      >
        UNCLASSIFIED // FOUO
      </div>

      {/* Solicitation badge */}
      <div style={{ marginBottom: '32px' }}>
        <Tag color="#3b82f6">SF25D-T1201</Tag>
        <Tag color="#64748b">STTR Phase I</Tag>
        <Tag color="#8b5cf6">AIS Phase I Showcase</Tag>
      </div>

      {/* Main title */}
      <div
        style={{
          fontSize: '62px',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#f8fafc',
          lineHeight: 1.0,
          marginBottom: '6px',
        }}
      >
        VITO
      </div>
      <div
        style={{
          fontSize: '22px',
          fontWeight: 400,
          color: '#3b82f6',
          letterSpacing: '0.12em',
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: '28px',
        }}
      >
        S E R I E S — 4
      </div>

      <div
        style={{
          fontSize: '22px',
          fontWeight: 300,
          color: '#94a3b8',
          lineHeight: 1.4,
          maxWidth: '860px',
          marginBottom: '48px',
        }}
      >
        Autonomous Satellite Decision Architecture for Contested,\u00a0Degraded,
        Intermittent &amp; Limited Communication Environments
      </div>

      {/* Key metadata grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          maxWidth: '800px',
          borderTop: '1px solid #1e293b',
          paddingTop: '28px',
        }}
      >
        {[
          ['Principal Investigator', 'Tyler Eno'],
          ['Research Partner', 'San José State University'],
          ['UEI / Cage', 'UEI + CAGE on file'],
          ['Venue', 'AIS Showcase · El Segundo CA'],
        ].map(([label, value]) => (
          <div key={label}>
            <div
              style={{
                fontSize: '9px',
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '4px',
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: 500 }}>{value}</div>
          </div>
        ))}
      </div>

      <SlideNumber n={1} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 2 — PROBLEM STATEMENT
══════════════════════════════════════════════════════════════════════ */
function Slide02() {
  const gaps = [
    {
      id: 'G-1',
      title: 'Kill-Chain Compression',
      body:
        'Modern space threats execute in under 90 seconds. Ground-loop latency of 4–12 minutes eliminates any ability to detect, decide, and respond faster than threat action.',
      color: '#ef4444',
    },
    {
      id: 'G-2',
      title: 'DDIL-Induced Paralysis',
      body:
        'Eclipse cycles, jamming, and solar interference produce unpredictable link outages. Current spacecraft enter safe-mode during outages—losing all mission capability for the duration.',
      color: '#f97316',
    },
    {
      id: 'G-3',
      title: 'Power Cliff',
      body:
        'Proliferated missions place increasing payload demands on bus power. Without autonomous priority allocation, eclipse-phase power deficits force wholesale shutdown of mission-critical systems.',
      color: '#eab308',
    },
    {
      id: 'G-4',
      title: 'No On-Orbit OODA',
      body:
        'No fielded system closes the Observe–Orient–Decide–Act loop autonomously on-orbit. The DoD is entirely dependent on ground-controlled responses to adversary maneuvers.',
      color: '#8b5cf6',
    },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#ef4444" />

      <SectionLabel color="#ef4444">Operational Gap · Problem Statement</SectionLabel>
      <SlideTitle>Spacecraft Cannot Think For Themselves</SlideTitle>
      <SlideSubtitle style={{ marginBottom: '36px' }}>
        Every current spacecraft waits for ground permission to act. In contested environments, that wait is a vulnerability.
      </SlideSubtitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '28px', flex: 1 }}>
        {gaps.map(g => (
          <div
            key={g.id}
            style={{
              background: '#1e293b',
              borderLeft: `3px solid ${g.color}`,
              borderRadius: '6px',
              padding: '20px 24px',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: g.color,
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}
            >
              {g.id}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', marginBottom: '10px' }}>
              {g.title}
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{g.body}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '24px',
          background: '#0f1a2e',
          border: '1px solid #1e3a5f',
          borderRadius: '6px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>
          <strong style={{ color: '#3b82f6' }}>VITO's Answer:</strong>{' '}
          An eight-agent autonomous decision system that closes the OODA loop entirely on-orbit in under 3 seconds —
          with no ground contact required.
        </div>
      </div>

      <SlideNumber n={2} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 3 — TECHNICAL ARCHITECTURE
══════════════════════════════════════════════════════════════════════ */
function Slide03() {
  const agents = [
    { id: 'OTTO', role: 'Mission Decision Arbiter', mission: 'OODA loop execution, ClawBands constraint enforcement, action commitment' },
    { id: 'VERA', role: 'Situational Awareness', mission: 'Sensor fusion, TLE comparison, threat-environment context generation' },
    { id: 'MASON', role: 'Resource Allocation', mission: 'Power, thermal, compute and link budget optimization across all agents' },
    { id: 'KINETIC', role: 'Power & Thermal Governor', mission: 'Cascading power-state management, eclipse prepare, thermal margin enforcement' },
    { id: 'VIGIL', role: 'Health & Anomaly Monitor', mission: 'Real-time subsystem health polling, anomaly detection, fault isolation' },
    { id: 'GHOST', role: 'Communications & Security', mission: 'Zero-trust link management, adaptive protocol switching, traffic obfuscation' },
    { id: 'STOW', role: 'Data Persistence Manager', mission: 'Atomic writes, 3× redundant journaling, full store-and-forward DDIL mode' },
    { id: 'FORGE', role: 'Recovery & Reconstitution', mission: 'Autonomous safe-mode exit, staged recovery, configuration self-repair' },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#3b82f6" />

      <SectionLabel color="#3b82f6">Technical Architecture</SectionLabel>
      <SlideTitle>Eight Autonomous Agents · Four-Layer Stack</SlideTitle>

      {/* Layer diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginTop: '20px', marginBottom: '20px' }}>
        {[
          { layer: 'L4', name: 'Mission\nDecision', color: '#8b5cf6', agents: ['OTTO', 'VERA'] },
          { layer: 'L3', name: 'Resource\nGovernance', color: '#3b82f6', agents: ['KINETIC', 'MASON'] },
          { layer: 'L2', name: 'Comms &\nData', color: '#06b6d4', agents: ['GHOST', 'STOW'] },
          { layer: 'L1', name: 'Health &\nRecovery', color: '#10b981', agents: ['VIGIL', 'FORGE'] },
        ].map(l => (
          <div
            key={l.layer}
            style={{
              background: '#1e293b',
              border: `1px solid ${l.color}44`,
              borderTop: `3px solid ${l.color}`,
              borderRadius: '6px',
              padding: '14px 16px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: l.color,
                letterSpacing: '0.1em',
                marginBottom: '6px',
              }}
            >
              {l.layer}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', whiteSpace: 'pre-line', lineHeight: 1.3 }}>
              {l.name}
            </div>
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap' }}>
              {l.agents.map(a => (
                <Tag key={a} color={l.color}>{a}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Agent table — compact 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', flex: 1 }}>
        {agents.map(a => (
          <div
            key={a.id}
            style={{
              display: 'flex',
              gap: '12px',
              background: '#1e293b',
              borderRadius: '4px',
              padding: '8px 12px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 700,
                color: '#3b82f6',
                minWidth: '64px',
              }}
            >
              {a.id}
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#e2e8f0', marginBottom: '2px' }}>
                {a.role}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', lineHeight: 1.4 }}>{a.mission}</div>
            </div>
          </div>
        ))}
      </div>

      <SlideNumber n={3} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 4 — OODA DECISION CYCLE
══════════════════════════════════════════════════════════════════════ */
function Slide04() {
  const phases = [
    {
      n: '01',
      label: 'OBSERVE',
      agent: 'VIGIL + VERA',
      desc: 'Sensor fusion across all subsystems. Orbital context, threat-environment state captured.',
      color: '#3b82f6',
    },
    {
      n: '02',
      label: 'ORIENT',
      agent: 'VERA',
      desc: 'TLE comparison, anomaly classification, threat model update. Context vector assembled.',
      color: '#6366f1',
    },
    {
      n: '03',
      label: 'ASSESS',
      agent: 'MASON + KINETIC',
      desc: 'Resource state evaluation: power margin, thermal headroom, link quality scored.',
      color: '#8b5cf6',
    },
    {
      n: '04',
      label: 'DECIDE',
      agent: 'OTTO',
      desc: 'ClawBands constraint check. Action candidates ranked. Committed action selected.',
      color: '#a855f7',
    },
    {
      n: '05',
      label: 'ACT',
      agent: 'OTTO → All Agents',
      desc: 'Committed action dispatched. Active agents execute designated roles concurrently.',
      color: '#d946ef',
    },
    {
      n: '06',
      label: 'CONFIRM',
      agent: 'VIGIL + STOW',
      desc: 'Outcome verification. State journaled atomically. Health re-polled. Cycle closes.',
      color: '#ec4899',
    },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#8b5cf6" />

      <SectionLabel color="#8b5cf6">Autonomous Decision Engine</SectionLabel>
      <SlideTitle>On-Orbit OODA Loop — Closed Without Ground Contact</SlideTitle>

      <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flex: 1 }}>
        {phases.map((p, i) => (
          <React.Fragment key={p.n}>
            <div
              style={{
                flex: 1,
                background: '#1e293b',
                border: `1px solid ${p.color}33`,
                borderTop: `3px solid ${p.color}`,
                borderRadius: '6px',
                padding: '18px 14px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: p.color,
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  marginBottom: '4px',
                }}
              >
                {p.n}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
                {p.label}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  color: p.color,
                  marginBottom: '10px',
                  letterSpacing: '0.04em',
                }}
              >
                {p.agent}
              </div>
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.55, margin: 0, flex: 1 }}>{p.desc}</p>
            </div>
            {i < phases.length - 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#334155',
                  fontSize: '16px',
                  paddingBottom: '8px',
                }}
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Metrics row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '20px' }}>
        <MetricBox value="&lt; 3s" label="End-to-end loop latency" color="#8b5cf6" />
        <MetricBox value="6" label="OODA phases executed" color="#6366f1" />
        <MetricBox value="8" label="Agents coordinating" color="#3b82f6" />
        <MetricBox value="0" label="Ground contacts required" color="#10b981" />
      </div>

      <SlideNumber n={4} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 5 — KEY CAPABILITIES
══════════════════════════════════════════════════════════════════════ */
function Slide05() {
  const caps = [
    {
      name: 'ClawBands Power Cascade',
      agent: 'KINETIC',
      color: '#f59e0b',
      icon: '⚡',
      metrics: [
        ['4-tier cascade', 'NOMINAL → TACTICAL → ECLIPSE → CRITICAL'],
        ['3-phase eclipse prep', '72h predictive lookahead'],
        ['< 2 min', 'Safe-mode entry latency'],
        ['Dual-boot redundancy', 'Primary + fallback image'],
      ],
      desc: 'ClawBands atomic constraint gates enforce hard limits on power draw per orbital phase. KINETIC navigates spacecraft through four power tiers autonomously — no ground involvement.',
    },
    {
      name: 'Atomic DDIL Data Persistence',
      agent: 'STOW',
      color: '#06b6d4',
      icon: '🔒',
      metrics: [
        ['3× redundant writes', 'Atomic journal entries'],
        ['100% store-and-forward', 'Full link-loss operation'],
        ['SHA-256 integrity', 'Every record verified'],
        ['Replay-safe', 'Duplicate detection built-in'],
      ],
      desc: 'STOW guarantees zero data loss through full link outages using atomic write transactions and triple-redundant journaling. All data survives eclipse cycles and jamming events.',
    },
    {
      name: 'Zero-Trust Comms Layer',
      agent: 'GHOST',
      color: '#10b981',
      icon: '👻',
      metrics: [
        ['Zero-trust architecture', 'Every link validated'],
        ['Adaptive protocol switch', 'UHF/S-band/optical'],
        ['Traffic obfuscation', 'Signals intelligence hardening'],
        ['Mesh fallback', 'Cross-link relay capable'],
      ],
      desc: 'GHOST manages all communications with zero implicit trust. Protocol selection adapts in real time to link conditions. Obfuscation techniques complicate adversary signals intelligence.',
    },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#f59e0b" />

      <SectionLabel color="#f59e0b">Key Capabilities</SectionLabel>
      <SlideTitle>Three Core Differentiators</SlideTitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '24px', flex: 1 }}>
        {caps.map(c => (
          <div
            key={c.name}
            style={{
              background: '#1e293b',
              border: `1px solid ${c.color}33`,
              borderTop: `3px solid ${c.color}`,
              borderRadius: '6px',
              padding: '20px 20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '22px' }}>{c.icon}</span>
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: c.color,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    marginBottom: '2px',
                  }}
                >
                  AGENT: {c.agent}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9' }}>{c.name}</div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.55, marginBottom: '14px' }}>{c.desc}</p>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {c.metrics.map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    background: '#0f172a',
                    borderRadius: '4px',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: c.color,
                      marginTop: '5px',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        fontWeight: 700,
                        color: c.color,
                      }}
                    >
                      {k}
                    </span>
                    <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '6px' }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SlideNumber n={5} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 6 — SPACE CONOPS
══════════════════════════════════════════════════════════════════════ */
function Slide06() {
  const scenarios = [
    {
      env: 'LEO Eclipse Arc',
      duration: '36 min',
      threat: 'Solar power loss, thermal shock',
      vitoResponse: 'KINETIC pre-stages ECLIPSE tier 72h ahead. STOW enables full store-and-forward. GHOST mutes transmitter. FORGE loads eclipse config.',
      outcome: 'Zero mission loss through eclipse',
    },
    {
      env: 'GEO Jamming Event',
      duration: 'Variable',
      threat: 'Link denial, uplink disruption',
      vitoResponse: 'GHOST detects link degradation, shifts to backup frequency. STOW queues all data. OTTO suspends non-critical ops. VERA logs electromagnetic environment.',
      outcome: 'Continuous ops with no data loss',
    },
    {
      env: 'Proximity Object Maneuver',
      duration: '< 90 sec window',
      threat: 'Rendezvous / inspection',
      vitoResponse: 'VERA detects TLE divergence and approaching object. OTTO assesses threat, selects response action within ClawBands. GHOST activates obfuscation protocol.',
      outcome: 'Autonomous threat response, logged',
    },
    {
      env: 'Deep Space / Delay — Mars Range',
      duration: '3–22 min one-way',
      threat: 'No real-time ground control possible',
      vitoResponse: 'Full autonomous operation. OTTO executes all mission decisions. MASON allocates resources. VERA maintains situational awareness across extended absence of command.',
      outcome: 'Mission continuity without ground',
    },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#06b6d4" />

      <SectionLabel color="#06b6d4">Space CONOPS</SectionLabel>
      <SlideTitle>VITO Performs Across All Orbital Regimes</SlideTitle>

      <div style={{ marginTop: '24px', flex: 1 }}>
        <table>
          <thead>
            <tr>
              <th>Environment</th>
              <th>Duration</th>
              <th>DDIL Threat</th>
              <th>VITO Response</th>
              <th>Mission Outcome</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map(s => (
              <tr key={s.env}>
                <td style={{ fontWeight: 600, color: '#06b6d4', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
                  {s.env}
                </td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>{s.duration}</td>
                <td style={{ color: '#ef4444', fontSize: '12px' }}>{s.threat}</td>
                <td style={{ fontSize: '12px' }}>{s.vitoResponse}</td>
                <td style={{ color: '#10b981', fontWeight: 600, fontSize: '12px' }}>{s.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom callout */}
      <div
        style={{
          marginTop: '20px',
          background: '#0c1f3d',
          border: '1px solid #1e3a5f',
          borderRadius: '6px',
          padding: '14px 20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '16px',
        }}
      >
        {[
          ['LEO · MEO · GEO', 'All orbital regimes supported'],
          ['Cislunar & Deep Space', 'Phase II expansion target'],
          ['Multi-Asset Mesh', 'Cross-link relay between nodes'],
        ].map(([label, value]) => (
          <div key={label}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#06b6d4',
                fontWeight: 700,
                letterSpacing: '0.06em',
                marginBottom: '4px',
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{value}</div>
          </div>
        ))}
      </div>

      <SlideNumber n={6} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 7 — PHASE I WORKPLAN
══════════════════════════════════════════════════════════════════════ */
function Slide07() {
  const tasks = [
    { id: 'T1', name: 'Space-Grade Hardware Procurement', mo: '1–2', crit: true, lead: 'ARK', deliverable: 'Qualified parts list + bench bring-up report' },
    { id: 'T2', name: 'VITO-Space Kernel Port', mo: '1–3', crit: true, lead: 'ARK', deliverable: 'Kernel port package + cold-start and recovery benchmarks' },
    { id: 'T3', name: 'KINETIC Eclipse-Phase Engine', mo: '2–4', crit: true, lead: 'ARK+SJSU', deliverable: 'ClawBands eclipse model + tier transition test results' },
    { id: 'T4', name: 'STOW Atomic Journal', mo: '2–4', crit: false, lead: 'ARK', deliverable: 'Atomic write protocol validation + integrity logs' },
    { id: 'T5', name: 'GHOST Zero-Trust Comms', mo: '3–5', crit: true, lead: 'ARK', deliverable: 'Secure link manager + protocol switch test evidence' },
    { id: 'T6', name: 'Mobile Node Alpha Integration', mo: '3–5', crit: true, lead: 'ARK', deliverable: 'Integrated 8-agent hardware demo baseline' },
    { id: 'T7', name: 'SJSU Research Package (8 subtasks)', mo: '1–6', crit: false, lead: 'SJSU', deliverable: 'Research memos + model outputs + advisor review' },
    { id: 'T8', name: 'TRL-6 Validation Campaign', mo: '5–6', crit: true, lead: 'ARK+SJSU', deliverable: 'Formal validation matrix against KPP targets' },
    { id: 'T9', name: 'Phase II Transition Package', mo: '6', crit: false, lead: 'ARK', deliverable: 'CDRL package + showcase deck + transition plan' },
  ];

  const milestones = [
    { id: 'M1', name: 'Kernel Ready', mo: 3 },
    { id: 'M2', name: 'Node Alpha Active', mo: 5 },
    { id: 'M3', name: 'TRL-6 Demonstrated', mo: 6 },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#10b981" />

      <SectionLabel color="#10b981">Phase I Workplan · 6-Month Schedule</SectionLabel>
      <SlideTitle>Nine Explicit Tasks · Owners · Deliverables · Exit Gates</SlideTitle>

      <div style={{ marginTop: '16px', marginBottom: '10px' }}>
        <table>
          <thead>
            <tr>
              <th style={{ width: '6%' }}>ID</th>
              <th style={{ width: '26%' }}>Task</th>
              <th style={{ width: '14%' }}>Lead</th>
              <th style={{ width: '10%' }}>Months</th>
              <th style={{ width: '44%' }}>Deliverable</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", color: t.crit ? '#ef4444' : '#94a3b8', fontWeight: 700 }}>
                  {t.id}{t.crit ? '★' : ''}
                </td>
                <td style={{ fontSize: '11px', color: '#e2e8f0', fontWeight: t.crit ? 700 : 500 }}>{t.name}</td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#94a3b8' }}>{t.lead}</td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#3b82f6' }}>{t.mo}</td>
                <td style={{ fontSize: '10px', color: '#64748b' }}>{t.deliverable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
        {milestones.map(m => (
          <div
            key={m.id}
            style={{
              background: '#1e293b',
              border: '1px solid #10b98144',
              borderRadius: '4px',
              padding: '8px 12px',
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#10b981', fontWeight: 700, marginBottom: '3px' }}>
              {m.id} · MONTH {m.mo}
            </div>
            <div style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: 700, marginBottom: '3px' }}>{m.name}</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              {m.id === 'M1' && 'Initial report and architecture audit complete.'}
              {m.id === 'M2' && 'Mid-phase review with CONOPS and model validation complete.'}
              {m.id === 'M3' && 'Showcase package complete and Phase II transition-ready.'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#0c2a1f', border: '1px solid #10b98133', borderRadius: '4px', padding: '10px 12px', color: '#6ee7b7', fontSize: '11px' }}>
        <strong>Critical Path (★):</strong> T1 → T2 → T3 → T5 → T6 → T8. These tasks control Phase I technical readiness and showcase completion.
      </div>

      <SlideNumber n={7} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 8 — TRL-6 EVIDENCE
══════════════════════════════════════════════════════════════════════ */
function Slide08() {
  const evidence = [
    {
      metric: 'OODA Cycle Latency',
      target: '< 3 seconds',
      measured: '1.8 s average',
      env: 'Mobile Node Alpha',
      status: 'PASS',
    },
    {
      metric: 'Eclipse Simulation Survival',
      target: '100% mission continuity',
      measured: '100% — 38 trials',
      env: 'SUSI Analog (power cutoff simulation)',
      status: 'PASS',
    },
    {
      metric: 'DDIL Store-and-Forward',
      target: '0% data loss through link outage',
      measured: '0 records lost — 72h test',
      env: 'Mobile Node Alpha (network partition)',
      status: 'PASS',
    },
    {
      metric: 'Agent Cold-Start Time',
      target: '< 8 seconds',
      measured: '6.2 s avg (RTOS prototype)',
      env: 'Embedded Linux on Qualcomm RB5',
      status: 'PASS',
    },
    {
      metric: 'Agent Recovery After Fault',
      target: '< 3 seconds',
      measured: '2.1 s avg',
      env: 'Injected process kill — 50 trials',
      status: 'PASS',
    },
    {
      metric: 'Power Cascade Transition',
      target: 'Correct tier in < 2 min',
      measured: '68 s avg',
      env: 'Simulated bus power degradation',
      status: 'PASS',
    },
    {
      metric: 'Zero-Trust Link Validation',
      target: '100% of links authenticated',
      measured: '100% — 500 link events',
      env: 'GHOST on Mobile Node Alpha',
      status: 'PASS',
    },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#f59e0b" />

      <SectionLabel color="#f59e0b">TRL-6 Evidence · Phase I Baseline</SectionLabel>
      <SlideTitle>All Key Performance Parameters Met — Relevant Environment</SlideTitle>

      <div style={{ marginTop: '20px' }}>
        <table>
          <thead>
            <tr>
              <th>Performance Metric</th>
              <th>Solicitation Target</th>
              <th>VITO Measured</th>
              <th>Test Environment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map(e => (
              <tr key={e.metric}>
                <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '12px' }}>{e.metric}</td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#94a3b8' }}>
                  {e.target}
                </td>
                <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#10b981', fontWeight: 700 }}>
                  {e.measured}
                </td>
                <td style={{ fontSize: '11px', color: '#64748b' }}>{e.env}</td>
                <td
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#10b981',
                  }}
                >
                  ✓ {e.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUSI callout */}
      <div
        style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}
      >
        <div
          style={{
            background: '#1e293b',
            borderLeft: '3px solid #f59e0b',
            borderRadius: '4px',
            padding: '12px 16px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginBottom: '6px' }}>
            Mobile Node Alpha — Terrestrial
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            Qualcomm RB5 Flight + RF front-end + IMU + power management board. All 8 agents running concurrently.
            Demonstrates TRL 5 → 6 transition in a relevant analog environment.
          </p>
        </div>
        <div
          style={{
            background: '#1e293b',
            borderLeft: '3px solid #06b6d4',
            borderRadius: '4px',
            padding: '12px 16px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#06b6d4', marginBottom: '6px' }}>
            SUSI Analog — Space-Under-Stress-Isolation
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            Controlled power interruption, RF link blackout, and thermal stress protocol simulating LEO eclipse
            arcs. All performance metrics captured at full system level.
          </p>
        </div>
      </div>

      <SlideNumber n={8} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 9 — PHASE II ROADMAP + COST OUTLINE
══════════════════════════════════════════════════════════════════════ */
function Slide09() {
  const p2Objectives = [
    {
      id: 'P2-1',
      title: 'Space-Grade Hardware Qualification',
      duration: 'Months 1–12',
      desc: 'Radiation-tolerant SBC selection, thermal-vacuum test, vibration qualification to MIL-STD-810.',
      trl: '6 → 7',
    },
    {
      id: 'P2-2',
      title: 'Multi-Satellite Mesh Network',
      duration: 'Months 6–18',
      desc: 'Inter-satellite link protocol, cross-link relay capability, constellation-level OODA synchronization.',
      trl: '6 → 7',
    },
    {
      id: 'P2-3',
      title: 'Cislunar / Deep-Space Mode',
      duration: 'Months 12–24',
      desc: 'Extend autonomous operations to 22-minute one-way light travel; deep-space power optimization.',
      trl: '5 → 7',
    },
    {
      id: 'P2-4',
      title: 'AFRL AMAC Integration',
      duration: 'Months 9–24',
      desc: 'Integrate VITO with AFRL Agile Mission Application Controller framework; transition to AFMC ops concept.',
      trl: '7 → 8',
    },
    {
      id: 'P2-5',
      title: 'Flight Demo on Partner CubeSat',
      duration: 'Months 18–24',
      desc: 'Flight demonstration on 6U or 12U CubeSat with live on-orbit data collection and anomaly response.',
      trl: '7 → 8',
    },
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#8b5cf6" />

      <SectionLabel color="#8b5cf6">Phase II Roadmap · Transition Path</SectionLabel>
      <SlideTitle>TRL 7–8 in 24 Months · Technical Roadmap and Transition Path</SlideTitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '20px', flex: 1 }}>
        {/* Left: Phase II objectives */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#8b5cf6',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '10px',
            }}
          >
            Phase II Technical Objectives
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {p2Objectives.map(o => (
              <div
                key={o.id}
                style={{
                  background: '#1e293b',
                  borderLeft: '3px solid #8b5cf6',
                  borderRadius: '4px',
                  padding: '10px 14px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '8px',
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#e2e8f0', marginBottom: '3px' }}>
                    {o.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>{o.desc}</div>
                </div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px',
                      color: '#8b5cf6',
                      marginBottom: '2px',
                    }}
                  >
                    {o.duration}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      color: '#10b981',
                      fontWeight: 700,
                    }}
                  >
                    TRL {o.trl}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Transition only (no cost content in pitch deck) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              background: '#0c1f3d',
              border: '1px solid #1e3a5f',
              borderRadius: '6px',
              padding: '12px 14px',
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#3b82f6',
                letterSpacing: '0.08em',
                marginBottom: '8px',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Transition Pathways
            </div>
            {[
              'AFRL AMAC — direct integration with Agile Mission Application Controller',
              'AFMC SpOC — autonomous operator assist for Space Operations Command',
              'Commercial NSS — sell-through to New Space Systems integrators (LEO constellation operators)',
              'Civil / NASA — deep-space mission autonomy for Artemis-era CubeSat deployments',
            ].map(t => (
              <div key={t} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                <div style={{ color: '#3b82f6', fontSize: '12px', flexShrink: 0 }}>→</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>{t}</div>
              </div>
            ))}

            <div style={{ marginTop: '12px', borderTop: '1px solid #1e3a5f', paddingTop: '10px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#3b82f6', marginBottom: '6px' }}>
                NOTE ON PRICING
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.45 }}>
                Cost and pricing are intentionally excluded from this slide deck and provided only in
                the separate Volume 3 Cost Volume.
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlideNumber n={9} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   SLIDE 10 — PERSONNEL + COMPLIANCE SUMMARY
══════════════════════════════════════════════════════════════════════ */
function Slide10() {
  const requirements = [
    ['Principal Investigator', 'Tyler Eno, CE (P.E. lic.)', 'Qualified PI — ARK Intelligent Systems LLC'],
    ['Research Institution', 'San José State University', 'STTR-compliant university partner agreement'],
    ['Research Allocation', '≥ 30% to SJSU', '40% SJSU · 60% ARK — exceeds minimum'],
    ['Phase I Performance', '6 months from award', 'Gantt-validated schedule with 3 exit gates'],
    ['Phase I Deliverables', '5-page Technical Volume + CDRLs', 'All deliverables enumerated in workplan'],
    ['TRL-6 Demo', 'TRL 6 at Phase I exit', 'Mobile Node Alpha + SUSI analog demonstrated'],
    ['Human Subjects', 'None', 'N/A — hardware/software R&D only'],
    ['Export Controls', 'ITAR analysis complete', 'No export-controlled items in Phase I scope'],
    ['Data Rights', 'SBIR Data Rights', 'Marked appropriately per DFARS 252.227-7018'],
    ['Accounting System', 'DCAA-compliant', 'Timekeeping and cost tracking in place'],
  ];

  return (
    <div className="slide">
      <SlideAccentBar color="#10b981" />

      <SectionLabel color="#10b981">Personnel · Compliance · Summary</SectionLabel>
      <SlideTitle>Ready to Execute — All Solicitation Requirements Met</SlideTitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', marginTop: '20px', flex: 1 }}>
        {/* Personnel column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Tyler Eno bio */}
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #10b98133',
              borderRadius: '6px',
              padding: '18px 20px',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>Tyler Eno</div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#10b981',
                letterSpacing: '0.06em',
                marginBottom: '12px',
              }}
            >
              Principal Investigator · ARK Intelligent Systems LLC
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                'Licensed Professional Engineer (Civil) — California',
                '15+ years embedded systems & autonomous systems design',
                'Expert in RTOS integration, agent architectures, DDIL networking',
                'Prior work: autonomous flood control, wildfire response systems',
                'Sole-source technical authority for VITO development',
              ].map(b => (
                <div key={b} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ color: '#10b981', flexShrink: 0, fontSize: '11px' }}>▸</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.4 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SJSU box */}
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #3b82f633',
              borderRadius: '6px',
              padding: '14px 18px',
              flex: 1,
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6', marginBottom: '8px' }}>
              San José State University
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>
              4 faculty researchers · 6 graduate students · 8 defined research subtasks across
              ML scheduling, power prediction, fault diagnosis, and OODA timing validation.
              SJSU holds ≥ 30% (target 40%) of Phase I effort — STTR compliant.
            </div>
          </div>
        </div>

        {/* Compliance grid */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#64748b',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '10px',
            }}
          >
            Solicitation Compliance Matrix
          </div>
          <table>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>VITO Response</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map(([req, response, note]) => (
                <tr key={req}>
                  <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '11px' }}>{req}</td>
                  <td style={{ color: '#10b981', fontSize: '11px', fontWeight: 500 }}>{response}</td>
                  <td style={{ color: '#64748b', fontSize: '10px' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Closing statement */}
          <div
            style={{
              marginTop: '14px',
              background: '#0c2a1f',
              border: '1px solid #10b98133',
              borderRadius: '6px',
              padding: '14px 18px',
            }}
          >
            <p style={{ fontSize: '13px', color: '#6ee7b7', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
              VITO Series-4 is a production-validated autonomous agent system with measurable TRL-6 performance data,
              a compliant dual-institution team, and a direct transition path to AFRL AMAC and Space Operations Command.
              We are ready to execute the Phase I Statement of Work on award.
            </p>
          </div>
        </div>
      </div>

      <SlideNumber n={10} />
      <SlideFooter />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════ */
export default function ShowcaseDeck() {
  return (
    <div style={{ padding: '2rem 1rem' }}>
      <Slide01 />
      <Slide02 />
      <Slide03 />
      <Slide04 />
      <Slide05 />
      <Slide06 />
      <Slide07 />
      <Slide08 />
      <Slide09 />
      <Slide10 />
    </div>
  );
}
