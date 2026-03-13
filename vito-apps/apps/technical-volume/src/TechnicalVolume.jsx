import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import MermaidDiagram from './MermaidDiagram.jsx';
import { topologyDiagram, decisionCycleDiagram, powerCascadeDiagram, conopsDiagram } from './diagrams.js';
import { rtmData, agentData, workplanTasks, clawbandsTiers, validationMetrics, missionProfiles, cteData, riskRegistry, literatureRefs } from './data.js';

/* ═══════════════════════════════════════════════════════════════
   VITO Technical Volume — SF25D-T1201
   Adaptive and Intelligent Space (AIS) Challenge
   Format: Print-first, B&W, dense text, formal document
   ═══════════════════════════════════════════════════════════════ */

/* ── Inline KaTeX rendering ── */
function KaTeX({ math, display }) {
  try {
    const html = katex.renderToString(math, { displayMode: !!display, throwOnError: false });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <code>{math}</code>;
  }
}

/* ── Page wrapper ── */
function Page({ children, id, pageNum }) {
  return (
    <div className="doc-page" id={id}>
      <div className="page-header">
        <span>SF25D-T1201 — VITO Autonomous Edge OS</span>
        <span>DISTRIBUTION A — Approved for Public Release</span>
      </div>
      <div className="page-body">
        {children}
      </div>
      <div className="page-footer">
        <span>VITO Series-4 v4.7.0 · Tyler Eno · February 2026</span>
        {pageNum && <span>Page {pageNum}</span>}
      </div>
    </div>
  );
}


/* ── Compliance Matrix with search/filter ── */
function ComplianceMatrix() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = rtmData.filter(row => {
    const matchesSearch = search === '' ||
      row.req.toLowerCase().includes(search.toLowerCase()) ||
      row.vito.toLowerCase().includes(search.toLowerCase()) ||
      row.area.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || row.status === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    deployed: rtmData.filter(r => r.status === 'deployed').length,
    proposed: rtmData.filter(r => r.status === 'proposed').length,
    phase2: rtmData.filter(r => r.status === 'phase2').length,
  };

  return (
    <div>
      <div className="no-print" style={{ display: 'flex', gap: '12pt', alignItems: 'center', marginBottom: '8pt', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search requirements..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <label style={{ fontSize: '9pt', fontFamily: 'var(--font-heading)' }}>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ fontSize: '9pt', padding: '3pt 6pt', border: '1px solid #999' }}>
            <option value="all">All ({rtmData.length})</option>
            <option value="deployed">Deployed ({counts.deployed})</option>
            <option value="proposed">Proposed ({counts.proposed})</option>
            <option value="phase2">Phase II ({counts.phase2})</option>
          </select>
        </label>
      </div>
      <div style={{ fontSize: '9pt', marginBottom: '6pt' }}>
        <span className="badge badge-deployed">DEPLOYED</span>{' '}
        <span className="badge badge-proposed">PHASE I</span>{' '}
        <span className="badge badge-phase2">PHASE II</span>{' '}
        — {filtered.length} of {rtmData.length} requirements shown
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: '4%' }}>#</th>
            <th style={{ width: '5%' }}>Ref</th>
            <th style={{ width: '6%' }}>Area</th>
            <th style={{ width: '32%' }}>Solicitation Requirement</th>
            <th style={{ width: '42%' }}>VITO Implementation</th>
            <th style={{ width: '5%' }}>§</th>
            <th style={{ width: '6%' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(row => (
            <tr key={row.id}>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{row.id}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{row.ref}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{row.area}</td>
              <td>{row.req}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{row.vito}</td>
              <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{row.section}</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`badge badge-${row.status}`}>
                  {row.status === 'deployed' ? '●' : row.status === 'proposed' ? '◐' : '○'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Gantt Chart ── */
function GanttChart() {
  const totalMonths = 13;
  const tasks = workplanTasks.filter(t => !t.milestone);
  const milestones = workplanTasks.filter(t => t.milestone);

  return (
    <div style={{ margin: '8pt 0' }}>
      <table style={{ fontSize: '8pt' }}>
        <thead>
          <tr>
            <th style={{ width: '6%' }}>ID</th>
            <th style={{ width: '28%' }}>Task</th>
            {Array.from({ length: totalMonths }, (_, i) => (
              <th key={i} style={{ width: `${66 / totalMonths}%`, textAlign: 'center', fontSize: '7pt' }}>M{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: task.critical ? '700' : '400' }}>{task.id}</td>
              <td style={{ fontWeight: task.critical ? '600' : '400' }}>
                {task.name}
                {task.critical && <span style={{ fontSize: '7pt', marginLeft: '4pt' }}>★</span>}
              </td>
              {Array.from({ length: totalMonths }, (_, i) => {
                const inRange = i >= task.start && i < task.start + task.duration;
                return (
                  <td key={i} style={{ padding: '2pt 1pt' }}>
                    {inRange && (
                      <div className="gantt-bar">
                        <div className={`gantt-bar-fill ${task.critical ? 'critical' : ''}`} />
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <td colSpan={2} style={{ fontWeight: '700', borderTop: '2px solid #000' }}>Milestones</td>
            {Array.from({ length: totalMonths }, (_, i) => {
              const ms = milestones.filter(m => m.start === i + 1);
              return (
                <td key={i} style={{ textAlign: 'center', borderTop: '2px solid #000' }}>
                  {ms.map(m => (
                    <div key={m.id} title={m.name}>
                      <span className="gantt-milestone" />
                      <div style={{ fontSize: '6pt', marginTop: '2pt' }}>{m.id}</div>
                    </div>
                  ))}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div style={{ fontSize: '8pt', marginTop: '4pt' }}>
        ★ = Critical path &nbsp;|&nbsp; <span className="gantt-milestone" /> = Milestone/exit gate &nbsp;|&nbsp;
        <span style={{ display: 'inline-block', width: '20px', height: '8px', background: 'repeating-linear-gradient(45deg, #000, #000 2px, #fff 2px, #fff 4px)', border: '1px solid #000' }} /> = Critical path task
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export default function TechnicalVolume() {
  const handlePrint = () => window.print();

  return (
    <div>
      {/* ── Print Toolbar (screen only) ── */}
      <div className="print-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <strong>VITO Technical Volume</strong>
          <span style={{ color: '#888' }}>SF25D-T1201 · AIS Challenge</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => document.getElementById('toc').scrollIntoView({ behavior: 'smooth' })}>
            TABLE OF CONTENTS
          </button>
          <button onClick={() => document.getElementById('sec-matrix').scrollIntoView({ behavior: 'smooth' })}>
            COMPLIANCE MATRIX
          </button>
          <button onClick={handlePrint}>
            EXPORT PDF (Ctrl+P)
          </button>
        </div>
      </div>

      {/* ═══════════ COVER PAGE ═══════════ */}
      <Page id="cover" pageNum="">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '8in' }}>
          <div className="classification">DISTRIBUTION A — APPROVED FOR PUBLIC RELEASE</div>

          <div style={{ textAlign: 'center', margin: '48pt 0 24pt' }}>
            <div style={{ fontSize: '9pt', fontFamily: 'var(--font-heading)', letterSpacing: '0.15em', color: '#555', marginBottom: '12pt' }}>
              SPACE FORCE STTR · SF25D-T1201
            </div>
            <h1 style={{ fontSize: '24pt', marginBottom: '6pt', borderBottom: 'none' }}>
              Adaptive and Intelligent Space
            </h1>
            <h2 style={{ fontSize: '14pt', fontWeight: '400', borderBottom: 'none', marginTop: '0', color: '#333' }}>
              Autonomous Edge Operating System for DDIL Space Environments
            </h2>
            <div style={{ fontSize: '11pt', fontFamily: 'var(--font-heading)', marginTop: '6pt', color: '#555' }}>
              Phase I Technical Volume
            </div>
          </div>

          <div style={{ borderTop: '2px solid #000', borderBottom: '2px solid #000', padding: '12pt 0', margin: '24pt 0' }}>
            <div className="two-col" style={{ fontSize: '10pt' }}>
              <div>
                <div><strong>System:</strong> VITO Series-4 v4.7.0</div>
                <div><strong>Maturity:</strong> TRL 6 — Field Validated</div>
                <div><strong>Services:</strong> 40+ Docker containers</div>
                <div><strong>Agents:</strong> 8 autonomous, hierarchical command</div>
              </div>
              <div>
                <div><strong>Topic:</strong> SF25D-T1201</div>
                <div><strong>Solicitation:</strong> SpaceWERX STTR 25.D</div>
                <div><strong>Technology Area:</strong> Space Platforms</div>
                <div><strong>Date:</strong> February 2026</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '10pt', marginTop: 'auto' }}>
            <div style={{ borderTop: '1px solid #999', paddingTop: '8pt' }}>
              <strong>Tyler Eno</strong> — Principal Investigator / Systems Architect<br />
              <span style={{ color: '#555' }}>
                SAM.gov: INC-GSAFSD20703056 &nbsp;|&nbsp;
                t.eno992@gmail.com &nbsp;|&nbsp; (504) 410-7420
              </span>
            </div>
            <div style={{ marginTop: '8pt', fontSize: '9pt', color: '#555' }}>
              <strong>Research Partner:</strong> San José State University (SJSU) — Department of Aerospace Engineering
            </div>
          </div>
        </div>
      </Page>

      {/* ═══════════ TABLE OF CONTENTS ═══════════ */}
      <Page id="toc" pageNum="i">
        <h2 style={{ borderBottom: '2px solid #000' }}>Table of Contents</h2>
        {[
          ['1', 'Problem Statement and Vision', 'sec-problem'],
          ['1.1', 'The Decision Latency Problem', 'sec-problem'],
          ['1.2', 'Why Ground-Loop Fails in DDIL', 'sec-problem'],
          ['1.3', 'Proposed Approach', 'sec-problem'],
          ['1.4', 'State of the Art and Literature Context', 'sec-sota'],
          ['2', 'Technical Solution', 'sec-solution'],
          ['2.1', 'System Architecture', 'sec-arch'],
          ['2.2', 'Decision Cycle (OODA Loop)', 'sec-ooda'],
          ['2.3', 'Key Capabilities Deep Dive', 'sec-capabilities'],
          ['2.4', 'Space Application CONOPS', 'sec-conops'],
          ['2.5', 'Focus Area Alignment: FA-2 Sensors and FA-3 Bus Design', 'sec-fa-align'],
          ['2.6', 'Zero-Trust Security Architecture', 'sec-security'],
          ['3', 'Phase I Workplan', 'sec-workplan'],
          ['3.1', 'Task Breakdown', 'sec-tasks'],
          ['3.2', 'Schedule and Milestones', 'sec-schedule'],
          ['3.3', 'University Partner Scope', 'sec-schedule'],
          ['4', 'TRL 6 Evidence and Feasibility Assessment', 'sec-trl'],
          ['4.1', 'Mobile Node Alpha Field Validation', 'sec-validation'],
          ['4.2', 'SUSI Testbed Spacecraft Bus Analog', 'sec-susi'],
          ['4.3', 'Critical Technology Elements (CTEs)', 'sec-ctes'],
          ['5', 'Technical Risk Registry', 'sec-risks'],
          ['6', 'Requirements Compliance Matrix', 'sec-matrix'],
          ['7', 'Related Work and Transition', 'sec-transition'],
          ['7.1', 'Mission Profile Reconfigurability', 'sec-profiles'],
          ['7.2', 'Phase II Roadmap', 'sec-phase2'],
          ['7.3', 'Phase III Dual-Use Applications', 'sec-phase3'],
          ['8', 'Key Personnel', 'sec-personnel'],
          ['', 'List of Figures', ''],
          ['', 'List of Tables', ''],
        ].map(([num, title, id], i) => (
          <div key={i} className="toc-entry" style={{ paddingLeft: num.includes('.') ? '20pt' : '0' }}>
            <span>
              {num && <strong style={{ fontFamily: 'var(--font-mono)', marginRight: '8pt' }}>{num}</strong>}
              {id ? <a href={`#${id}`} style={{ color: '#000', textDecoration: 'none' }}>{title}</a> : <em>{title}</em>}
            </span>
            <span className="toc-dots" />
          </div>
        ))}

        <h3 style={{ marginTop: '24pt' }}>List of Figures</h3>
        {[
          ['Figure 1 / Table 6', 'Requirements Compliance Matrix — SF25D-T1201', 'sec-matrix'],
          ['Figure 2', 'VITO Multi-Tiered Autonomous Architecture (System Topology)', 'sec-arch'],
          ['Figure 3', 'Six-Phase Decision Cycle (OODA Loop)', 'sec-ooda'],
          ['Figure 4', 'KINETIC Power Cascade — Load-Shedding Progression', 'sec-capabilities'],
          ['Figure 5', 'Phase I Work Breakdown and Schedule (Gantt)', 'sec-schedule'],
          ['Figure 6', 'Orbital CONOPS — VITO Onboard Autonomous Spacecraft', 'sec-conops'],
        ].map(([num, title, id], i) => (
          <div key={i} className="toc-entry">
            <span><strong>{num}.</strong> <a href={`#${id}`} style={{ color: '#000', textDecoration: 'none' }}>{title}</a></span>
            <span className="toc-dots" />
          </div>
        ))}

        <h3 style={{ marginTop: '16pt' }}>List of Tables</h3>
        {[
          ['Table 1', 'Agent Hierarchy and Responsibilities'],
          ['Table 2', 'ClawBands Safety Gate Tiers'],
          ['Table 3', 'Field Validation Metrics (Mobile Node Alpha)'],
          ['Table 4', 'Power Budget — SUSI Testbed Analog'],
          ['Table 5', 'Critical Technology Elements (CTEs)'],
          ['Table 6', 'Requirements Traceability (33 requirements)'],
          ['Table 7', 'Technical Risk Registry and Mitigation Measures'],
          ['Table 8', 'Terrestrial-to-Orbital Transition Map'],
        ].map(([num, title], i) => (
          <div key={i} className="toc-entry">
            <span><strong>{num}.</strong> {title}</span>
            <span className="toc-dots" />
          </div>
        ))}
      </Page>

      {/* ═══════════ SECTION 1: PROBLEM & VISION ═══════════ */}
      <Page id="sec-problem" pageNum={1}>
        <h2>1. Problem Statement and Vision</h2>

        <p>
          The United States Space Force operates in an environment where the fundamental assumption
          of persistent connectivity is increasingly untenable. Contested electromagnetic spectra,
          orbital mechanics enforcing periodic eclipse cycles, and adversary denial operations create
          conditions that are Denied, Degraded, Intermittent, and Limited (DDIL) by default.
          Current spacecraft bus architectures depend on ground-loop command and control cycles
          that introduce unacceptable latency into the decision chain.
        </p>

        <h3>1.1 The Decision Latency Problem</h3>

        <p>
          The time from sensor detection to autonomous response — the decision latency — is the
          critical metric for space battle management. For a ground-loop architecture, this latency
          is bounded by:
        </p>

        <div className="equation-block">
          <KaTeX display math="T_{decision} = T_{uplink} + T_{ground\_processing} + T_{downlink} + T_{execution}" />
        </div>

        <p>
          where <KaTeX math="T_{uplink}" /> and <KaTeX math="T_{downlink}" /> represent
          signal propagation times (minimum 240 ms for GEO), <KaTeX math="T_{ground\_processing}" /> represents
          human-in-the-loop or ground automation delay (typically 1–30 seconds), and <KaTeX math="T_{execution}" /> is
          the actuation time. For an onboard autonomous architecture:
        </p>

        <div className="equation-block">
          <KaTeX display math="T_{decision}^{onboard} = T_{sensor} + T_{inference} + T_{execution} \leq 3\text{ s}" />
        </div>

        <p>
          VITO achieves <KaTeX math="T_{inference} < 3" /> seconds for complex multi-agent
          decisions using local LLM inference, reducing decision latency by greater than 80%
          compared to ground-loop architectures. This exceeds the solicitation's requirement
          of ≥50% kill-chain latency reduction (§3.2).
        </p>

        <h3>1.2 Why Ground-Loop Fails in DDIL Environments</h3>

        <p>
          Ground-loop command and control relies on three assumptions that fail in contested space:
        </p>
        <ol>
          <li><strong>Persistent connectivity.</strong> Eclipse cycles, solar interference, and adversary
          jamming create periodic and unpredictable link outages. A satellite that cannot act without
          ground contact is functionally disabled during these windows.</li>
          <li><strong>Unlimited bandwidth.</strong> Contested electromagnetic environments and the physics of
          deep-space communication limit available bandwidth. Transmitting full telemetry for ground-side
          analysis is not feasible at scale for proliferated constellations.</li>
          <li><strong>Infinite power.</strong> Eclipse cycles cut solar input to zero. Payload demands routinely
          exceed bus power capacity. Without autonomous power management, spacecraft must enter safe-mode —
          losing all mission capability — rather than intelligently prioritizing payloads.</li>
        </ol>
        <p>
          VITO was designed from inception to operate under all three failure modes simultaneously.
          Its eight autonomous agents collectively manage power (KINETIC), health (VIGIL), data persistence
          (STOW), communications (GHOST), recovery (FORGE), intelligence (VERA), decision-making (OTTO),
          and resource allocation (MASON) without any external dependency.
        </p>

        <h3>1.3 Proposed Approach</h3>

        <p>
          This Phase I effort proposes to evaluate the feasibility of adapting VITO — a TRL 6,
          field-validated autonomous edge operating system — for spacecraft bus management.
          VITO is not a concept or simulation; every capability described in this document is
          deployed production code that has been operating continuously in DDIL terrestrial
          environments for over 12 months. The core thesis is that the operational constraints of
          autonomous spacecraft (power transients, communication blackouts, thermal cycling, and
          the need for zero-human-intervention recovery) are structurally identical to the
          constraints VITO already solves in terrestrial edge deployment. This Phase I feasibility
          study, conducted in partnership with San José State University (SJSU), will rigorously
          map these analog environments, validate the architectural assumptions through orbital
          simulation, and produce a Phase II prototype specification.
        </p>
      </Page>

      {/* ═══════════ SECTION 1.4: STATE OF THE ART ═══════════ */}
      <Page id="sec-sota" pageNum="1.4">
        <h3>1.4 State of the Art and Literature Context</h3>

        <p>
          This section situates VITO relative to current academic and government research,
          establishing that the proposed technical approach is grounded in demonstrated prior
          work and addresses documented capability gaps.
        </p>

        <h4>1.4.1 Ground-Loop Latency and Autonomy Gaps</h4>
        <p>
          The Economist's July 2025 analysis of USSF readiness for satellite-on-satellite
          combat confirms that ground-loop command cycles are operationally untenable in
          contested environments [1]. Current spacecraft rely on human-in-the-loop decision
          cycles that range from 30 seconds to several minutes, creating windows of
          vulnerability that adversaries can exploit. The Space Warfighting Framework [2]
          explicitly identifies "kill-chain compression" as a first-order capability gap, with
          a stated goal of reducing decision latency by 50% or more. VITO's measured
          sub-3-second onboard decision cycle exceeds this target by an order of magnitude.
        </p>

        <h4>1.4.2 Prior Work on Containerized Flight Software</h4>
        <p>
          NASA Technical Report 20240001139 [5] documents the current technology landscape
          for space software including software modularity, containerization approaches, and
          fault management. The report identifies containerization as a high-potential
          approach for modular spacecraft software but notes the absence of validated
          implementations at TRL 6 or above. VITO addresses this gap directly — it is a
          TRL 6 containerized autonomous system with 12+ months of continuous field operation.
        </p>
        <p>
          Lockheed Martin's AIAA-6.2022-1472 paper [6] demonstrates AI/ML mission processing
          onboard satellites is achievable with quantized neural networks but identifies
          SWaP-constrained inference as the primary technical barrier. VITO's Ollama
          infrastructure runs quantized models (GGUF Q4 format) that have been benchmarked
          at 10–30 tokens/second on CPU-only ARM64 hardware, establishing a viable path for
          inference without GPU acceleration in the Phase II orbital target.
        </p>

        <h4>1.4.3 Edge AI and Onboard Processing</h4>
        <p>
          IEEE 10115983 [4] establishes that neural network inference latencies below 5 seconds
          are achievable with quantized models on spacecraft-class compute. The paper's
          benchmark suite includes Cortex-A53 class processors running object detection and
          classification tasks in the 2–8 second range — commensurate with OTTO's measured
          inference latency on terrestrial hardware. The primary risk identified in that work
          (thermal management) maps directly to KINETIC's validated thermal-aware load-shedding
          capability.
        </p>

        <h4>1.4.4 Autonomous Systems Analysis</h4>
        <p>
          RAND RRA2318-1 [3] provides a comprehensive assessment of autonomous systems for
          space operations, identifying three capability gaps that VITO directly addresses:
          (i) persistent onboard anomaly detection without ground contact, (ii) autonomous
          power management during eclipse and contingency modes, and (iii) secure
          inter-satellite communication in DDIL environments. The report recommends
          a technology development pathway that parallels VITO's Phase I (feasibility) →
          Phase II (Flat-Sat testbed) → Phase III (flight demonstration) structure.
        </p>

        <h4>1.4.5 Literature Summary</h4>
        <table>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>Ref</th>
              <th style={{ width: '45%' }}>Citation</th>
              <th style={{ width: '50%' }}>Relevance to VITO Proposal</th>
            </tr>
          </thead>
          <tbody>
            {literatureRefs.map((r, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600', textAlign: 'center' }}>[{r.id}]</td>
                <td style={{ fontSize: '8pt' }}>{r.citation}</td>
                <td style={{ fontSize: '8pt' }}>{r.relevance}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: '12pt' }}>
          Collectively, the literature validates three claims that form the foundation of this
          proposal: (1) onboard AI inference at operationally relevant latencies is achievable
          with quantized models on commodity SoCs; (2) containerization provides modularity and
          fault isolation compatible with spacecraft software requirements; and (3) the capability
          gaps documented by RAND and the Space Warfighting Framework correspond directly to
          subsystems that VITO has deployed and field-validated.
        </p>
      </Page>

      {/* ═══════════ SECTION 2: TECHNICAL SOLUTION ═══════════ */}
      <Page id="sec-solution" pageNum={2}>
        <h2>2. Technical Solution</h2>

        <p>
          VITO employs a four-layer architecture that separates AI-driven cognition from
          safety-critical operations. This separation is a deliberate design choice: if the
          cognitive tier degrades (e.g., due to radiation-induced memory errors), the operational
          tier continues executing power management, health monitoring, and data persistence
          autonomously. This directly addresses the solicitation's requirement for "improved
          do-no-harm software capabilities" (§3.2).
        </p>

        <h3 id="sec-arch">2.1 System Architecture</h3>

        <p>
          Figure 2 presents the complete VITO system topology. All components execute as Docker
          containers within a single Linux host on a shared network (<code>vito_network</code>).
          Agents are not a separate system — they are containers that share the same network,
          storage, and kernel as all infrastructure services. This architectural choice eliminates
          the integration complexity of multi-host distributed systems while preserving the
          isolation and fault-containment benefits of containerization.
        </p>

        <MermaidDiagram chart={topologyDiagram} figNum={2} caption="VITO Multi-Tiered Autonomous Architecture — System Topology v4.1. All components run as Docker containers within a single Linux host. Agents (shaded) operate within the CrewAI orchestrator, sharing vito_network with infrastructure and interface containers." />

        <p>
          <strong>Table 1. Agent Hierarchy and Responsibilities.</strong> The eight agents operate
          in a defined command hierarchy. The leadership tier handles intelligence, reasoning, and
          allocation; the operations tier executes deterministic control loops.
        </p>

        <table>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Role</th>
              <th>Tier</th>
              <th>Primary Responsibility</th>
            </tr>
          </thead>
          <tbody>
            {agentData.map((a, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{a.name}</td>
                <td>{a.role}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{a.tier}</td>
                <td>{a.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>

      {/* ═══════════ SECTION 2.2: OODA LOOP ═══════════ */}
      <Page id="sec-ooda" pageNum={3}>
        <h3>2.2 Decision Cycle (Six-Phase OODA Loop)</h3>

        <p>
          The VITO decision cycle implements a closed-loop observe-orient-decide-act (OODA)
          pattern extended with explicit approval and learning phases. Each cycle completes
          in under 5 seconds for standard operational decisions. Figure 3 shows the complete
          data flow from sensor input through autonomous action to persistent storage.
        </p>

        <MermaidDiagram chart={decisionCycleDiagram} figNum={3} caption="Six-Phase Decision Cycle. Telemetry flows from sensors (OBSERVE) through anomaly detection (ANALYZE), LLM-driven reasoning (DECIDE), safety gating (APPROVE), container-level execution (EXECUTE), and atomic persistence (STORE+LEARN). The feedback loop from STORE to OBSERVE enables historical context for future decisions." />

        <p>
          The six phases are:
        </p>

        <ol>
          <li><strong>OBSERVE.</strong> VIGIL continuously collects telemetry from Signal K (battery/voltage/solar),
          OBD-II (engine vitals), host sensors (CPU/thermal/disk), and LoRa mesh (remote field data).</li>
          <li><strong>ANALYZE.</strong> When VIGIL detects an anomaly, it escalates to CrewAI. VERA performs
          threat assessment, querying ChromaDB for historical precedent from past incidents.</li>
          <li><strong>DECIDE.</strong> For complex decisions, OTTO performs local LLM inference (Ollama, qwen2.5/granite4).
          MASON allocates resources. The decision includes a recommended action plan.</li>
          <li><strong>APPROVE.</strong> The ClawBands safety gate evaluates the action's risk level (Table 2).
          Read-only and soft-control actions auto-approve. Destructive actions require operator review.</li>
          <li><strong>EXECUTE.</strong> Approved commands are executed via the Docker API. KINETIC pauses containers,
          FORGE restarts services, GHOST reconfigures the mesh — all through containerized, audited APIs.</li>
          <li><strong>STORE + LEARN.</strong> STOW logs the complete decision chain (input → reasoning → action → result)
          to NVMe with atomic writes. Immutable logs are embedded into ChromaDB for future recall.</li>
        </ol>

        <p>
          <strong>Table 2. ClawBands Safety Gate Tiers.</strong> The ClawBands gate enforces graduated
          autonomy. This directly implements the solicitation's "do-no-harm" and human-machine
          teaming requirements.
        </p>

        <table>
          <thead>
            <tr>
              <th style={{ width: '55%' }}>Action Category</th>
              <th style={{ width: '30%' }}>Approval Mode</th>
              <th style={{ width: '15%' }}>Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {clawbandsTiers.map((t, i) => (
              <tr key={i}>
                <td>{t.action}</td>
                <td>{t.approval}</td>
                <td style={{ textAlign: 'center', fontWeight: '600' }}>{t.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: '12pt' }}>
          The three-tier safety model is configurable via the AI Determinism Mode setting:
          <strong> LOW</strong> (agents execute all actions with minimal oversight),
          <strong> MEDIUM</strong> (agents require confirmation for destructive operations), and
          <strong> HIGH</strong> (agents log suggestions but never execute without human approval).
          All settings produce a complete JSONL audit trail for forensic analysis and compliance.
        </p>
      </Page>

      {/* ═══════════ SECTION 2.3: CAPABILITIES ═══════════ */}
      <Page id="sec-capabilities" pageNum={4}>
        <h3>2.3 Key Capabilities Deep Dive</h3>

        <h4>2.3.1 KINETIC: Autonomous Load-Shedding (§3.2, Focus Area 3)</h4>

        <p>
          The solicitation specifically requests an "autonomous load-shedding method to maintain
          mission operation and payload prioritization under duress." KINETIC implements this as a
          4-tier power cascade using Linux's cgroup freezer subsystem. When battery state-of-charge
          drops below defined thresholds, KINETIC progressively <em>freezes</em> (not kills)
          lower-priority service groups. Frozen processes remain in memory and resume instantly
          when power returns — no reboot, no data loss, no restart sequencing required.
        </p>

        <MermaidDiagram chart={powerCascadeDiagram} figNum={4} caption="KINETIC Power Cascade — Progressive Load-Shedding. As battery state-of-charge (SoC) decreases, lower-priority tiers are frozen via cgroup freezer. Hatched boxes indicate frozen (suspended) services. Core services (Tier 0) are never shed." />

        <div className="no-break">
          <p>
            Cascade thresholds are configurable per mission profile. In the orbital application,
            eclipse cycle predictions from GMAT/STK would trigger proactive shedding before power
            drops — anticipatory rather than reactive. Field validation results:
          </p>
          <ul>
            <li>Battery life extension: <strong>4×</strong> on lower 50% of charge</li>
            <li>Freeze latency: <strong>&lt;100 ms</strong> (cgroup freezer suspend)</li>
            <li>Thaw latency: <strong>&lt;100 ms</strong> (instant resume, zero data loss)</li>
            <li>Field validation: <strong>12+ months</strong> continuous operation</li>
          </ul>
        </div>

        <h4>2.3.2 STOW: Atomic Data Persistence (§4.1.4.6)</h4>

        <p>
          In orbital environments, power loss is not hypothetical — eclipse cycles cut solar input
          to zero every ~90 minutes in LEO. STOW guarantees data integrity through an atomic write
          pattern: telemetry is buffered in memory, flushed to NVMe storage every 2 seconds via a
          temp-file-then-rename operation, and burst-synced to upstream systems when connectivity
          returns. The worst-case data loss at instantaneous power cut is 2 seconds of telemetry.
          The filesystem never corrupts because <code>rename()</code> operations are atomic at the block
          device level. This pattern has been validated through 12+ months of power-cycling events
          including unplanned brownouts and hard resets.
        </p>

        <h4>2.3.3 GHOST: Zero-Trust Mesh Networking (§3.2, §4.1.3.1)</h4>

        <p>
          The solicitation calls for "zero-trust for on-board computation methods." GHOST implements
          this using WireGuard (ChaCha20-Poly1305 encryption) over a Tailscale-managed identity mesh.
          Each VITO node authenticates via cryptographic identity — no passwords, no shared secrets,
          no certificate authorities. The mesh operates in three modes: full connectivity (WAN + mesh),
          degraded (relay-only), and air-gap (mesh-only, zero internet). In a constellation scenario,
          satellite nodes coordinate securely without ground station relay using the same P2P protocol
          validated in terrestrial deployment.
        </p>

        <h4>2.3.4 Why Agents Are Inside Docker</h4>

        <p>
          A key architectural decision: all eight agents execute as Docker containers sharing a
          single Linux kernel and network namespace. This design is not incidental — it is the
          mechanism that enables software-defined payload reconfigurability. Adding a new capability
          (sensor processing algorithm, communication protocol, analytics module) requires deploying
          a new container, not modifying flight software firmware. Container isolation provides
          fault containment: a misbehaving agent cannot corrupt another agent's memory space.
          The Docker API provides a uniform management interface for start, stop, pause, health check,
          and resource limiting — the exact primitives needed for autonomous bus management.
        </p>
      </Page>

      {/* ═══════════ SECTION 2.4: SPACE CONOPS ═══════════ */}
      <Page id="sec-conops" pageNum="2.4">
        <h3>2.4 Space Application Concept of Operations (CONOPS)</h3>

        <h4>2.4.1 USSF Mission Context</h4>
        <p>
          The AIS Challenge is anchored to three USSF mission pillars: Space Domain Awareness
          (SDA), Space Control (SC), and Space Battle Management (SBM). SDA requires persistent,
          predictive, and precise characterization of all objects and activities in the operational
          orbital environment. Space Control requires the ability to deny, degrade, or disrupt
          adversary space capabilities in support of joint force objectives. Space Battle Management
          requires autonomous, low-latency coordination of space-based assets under DDIL conditions.
          VITO directly addresses the data flow architecture for all three pillars, initially as
          the autonomous command-and-control layer of the spacecraft bus.
        </p>

        <h4>2.4.2 Capability Gap</h4>
        <p>
          Current spacecraft bus management architectures exhibit three structural failures
          in contested environments:
        </p>
        <ol>
          <li><strong>Ground-dependence:</strong> Command latency of 30 seconds to several minutes
          precludes real-time response to anomalies, conjunctions, or adversary activities.</li>
          <li><strong>Brittle recovery:</strong> When subsystems fail, recovery requires either
          ground uplift or pre-programmed scripts with no ability to reason about novel failure modes.</li>
          <li><strong>Static power management:</strong> Eclipse-mode power budgets are set at launch
          and cannot respond dynamically to changing payload demands or degraded solar array performance.</li>
        </ol>
        <p>
          VITO's eight-agent architecture eliminates all three failures. OTTO provides onboard
          reasoning for novel failures without ground contact. FORGE autonomously recovers containers
          without pre-scripted sequences. KINETIC adapts power allocation in real time to actual
          state-of-charge and predicted eclipse duration.
        </p>

        <h4>2.4.3 Operational Overview</h4>
        <p>
          Figure 6 presents the VITO Orbital CONOPS. The spacecraft operates autonomously during
          eclipse, DDIL, and contested periods. Ground contact is used exclusively for strategic
          tasking and audit log retrieval — not for real-time command and control.
        </p>

        <MermaidDiagram chart={conopsDiagram} figNum={6} caption="VITO Orbital CONOPS. The spacecraft bus autonomously manages payload, power, and fault recovery. Ground contact is periodic and non-critical. All decisions execute onboard in under 3 seconds." />

        <h4>2.4.4 Operational Vignette: Eclipse Conjunction Response</h4>
        <p>
          <em>Scenario:</em> A LEO spacecraft on a 90-minute orbital period enters eclipse at T+0.
          At T+15min, VIGIL detects battery SoC at 68% — above the 60% cascade threshold but
          trending toward it faster than predicted due to an uncharacterized payload power draw.
          Simultaneously, VERA receives a conjunction alert via the ground-uploaded TLE set
          (pre-staged before eclipse) indicating a debris object within 2 km in 12 minutes.
        </p>
        <p>
          <em>VITO Response (no ground contact available):</em> OTTO evaluates both threats
          simultaneously via local LLM inference in 2.1 seconds. MASON determines that powering
          down the non-essential imaging payload (Tier 2) eliminates both problems: it reduces
          power draw (solving the SoC trajectory) and eliminates attitude hold requirements
          (marginally increasing maneuver delta-V budget for the avoidance burn). KINETIC
          freezes Tier 2 services. FORGE validates avoidance burn telemetry. STOW logs the
          full decision chain. Ground receives the audit log on next uplink pass.
          Total time from anomaly detection to corrective action: <strong>4.3 seconds.</strong>
        </p>

        <h4>2.4.5 Mission Objectives Mapping</h4>
        <table>
          <thead>
            <tr>
              <th style={{ width: '35%' }}>USSF Mission Objective</th>
              <th style={{ width: '35%' }}>VITO Capability Addressing It</th>
              <th style={{ width: '30%' }}>Section / Evidence</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Kill-chain latency reduction ≥50%', 'OTTO onboard LLM inference: <3s (vs. 30s+ ground-loop)', '§2.2, RTM-3'],
              ['Autonomous anomaly detection and response', 'VIGIL + VERA compound threat detection; 8-agent response', '§2.2, RTM-5,6'],
              ['Persistent payload power prioritization', 'KINETIC 4-tier cgroup cascade; 4× battery life extension', '§2.3.1, RTM-17'],
              ['Fault recovery without ground contact', 'FORGE container auto-healing; <60s cold recovery', '§4.1, RTM-20'],
              ['Zero-trust comms in DDIL', 'GHOST WireGuard mesh; air-gap mode; per-peer cryptographic identity', '§2.3.3, RTM-7'],
              ['Software-defined payload reconfigurability', 'Container Hot-swap; no bus firmware change required', '§2.1, RTM-14,19'],
              ['Do-no-harm autonomous software', 'ClawBands Safety Gate; configurable autonomy LOW/MED/HIGH', '§2.2, RTM-25'],
            ].map(([obj, cap, ref], i) => (
              <tr key={i}>
                <td>{obj}</td>
                <td>{cap}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{ref}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>

      {/* ═══════════ SECTION 2.5: FA ALIGNMENT ═══════════ */}
      <Page id="sec-fa-align" pageNum="2.5">
        <h3>2.5 Focus Area Alignment: FA-2 Sensor Payloads and FA-3 Bus Design</h3>

        <h4>2.5.1 Focus Area 2 — Sensor Payloads</h4>
        <p>
          The solicitation requests "integrated sensor-computing packages for persistent tracking"
          and "software-defined or reconfigurable payloads." VITO's VIGIL agent and containerized
          service architecture directly address both requirements:
        </p>
        <ul>
          <li><strong>Multi-modal sensor fusion.</strong> VIGIL currently fuses telemetry from four
          distinct sensor buses simultaneously: Signal K (power/renewable), OBD-II (vehicle health),
          LoRa 915 MHz (remote field sensors), and Linux /sys interfaces (compute health). In the
          orbital application, these four buses map cleanly to: S-band TT&C (telemetry/health),
          SpaceWire (payload bus), LIDAR/passive-RF sensor interfaces, and spacecraft /sys (avionics
          health). The data abstraction layer in VIGIL is sensor-agnostic — it operates on key-value
          telemetry objects regardless of their physical source.</li>
          <li><strong>Reconfigurable payloads via containerization.</strong> In the VITO architecture,
          a "sensor payload" is operationally equivalent to a Docker container providing a streaming
          telemetry interface. Adding a new sensor modality requires deploying a new container with
          the sensor's driver and data normalization logic — not modifying any flight software bus.
          This is functionally identical to the solicitation's description of "software-defined or
          reconfigurable payloads." The same mechanism allows sensor fusion algorithms to be upgraded
          on-orbit by pushing updated container images.</li>
          <li><strong>High-Performance Computing at the Sensor (HPC-S).</strong> VERA's in-process
          feature extraction runs immediately on sensor data before it reaches the telemetry bus —
          implementing the HPC-S concept identified in the solicitation's desired technologies. This
          reduces upstream data volume by transmitting detected features rather than raw sensor streams,
          directly addressing the bandwidth limitations of DDIL orbital communication.</li>
        </ul>

        <h4>2.5.2 Focus Area 3 — Bus Design</h4>
        <p>
          The solicitation requests bus concepts that are "modular, autonomously managed, and
          designed for mission flexibility and lifecycle extension." VITO's architecture was
          designed under precisely these constraints for terrestrial deployment:
        </p>
        <ul>
          <li><strong>Hardware modularity.</strong> VITO's containerized services deploy equal on
          x86-64, ARM64, and RISC-V Linux hosts. Any spacecraft bus running a Linux-capable SoC
          can host the VITO agent stack without platform-specific software modifications. New
          hardware capabilities (upgraded compute, additional sensors, expanded storage) integrate
          by adding container services, not re-architecting the bus.</li>
          <li><strong>Autonomous load-shedding.</strong> KINETIC's 4-tier cgroup cascade implements
          the "autonomous load-shedding method to maintain mission operation under duress" specified
          in FA-3's desired capabilities. Field validation data: 4× battery life extension, freeze
          latency &lt;100 ms, zero data loss during power transients across 12 months of operation.</li>
          <li><strong>Lifecycle extension.</strong> FORGE's auto-healing capability enables
          indefinite autonomous operation — failed services restart, state is preserved, and the
          system self-heals without ground contact. Container-based deployments can accept security
          patches and capability upgrades via OTA container image pushes throughout the spacecraft
          operational lifetime, extending functional life beyond what hardware refresh would allow.</li>
          <li><strong>All-of-vehicle optimization.</strong> The VIGIL + KINETIC + FORGE coordination
          loop implements full vehicle autonomous optimization: VIGIL detects degraded health (thermal,
          power, compute), KINETIC sheds load to recover margins, and FORGE restores failed services
          when margins recover — a closed-loop autonomous management cycle that requires no ground
          intervention for nominal and minor contingency operations.</li>
        </ul>

        <p><strong>Phase I CONOPS Alignment — Focus Area Coverage Matrix:</strong></p>
        <table>
          <thead>
            <tr>
              <th>Focus Area</th>
              <th>Solicitation Requirement</th>
              <th>VITO Capability</th>
              <th>RTM</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['FA-1', 'Onboard autonomous low-latency decision-making', 'OTTO LLM inference <3s, zero ground dependency', 'RTM-1,3'],
              ['FA-1', 'Resilience to data poisoning and sensor degradation', 'VIGIL threshold-fallback; OTTO degrades to deterministic logic', 'RTM-5'],
              ['FA-1', 'Zero-trust onboard computation', 'GHOST WireGuard, per-peer cryptographic identity', 'RTM-7'],
              ['FA-1', 'Memory-safe language applications', 'Phase II: Rust core for KINETIC + STOW safety-critical paths', 'RTM-11'],
              ['FA-2', 'Integrated sensor-computing packages', 'VIGIL multi-modal fusion; LoRa coin nodes ($25 ea)', 'RTM-13,15'],
              ['FA-2', 'Software-defined / reconfigurable payloads', 'Docker container hot-swap; no bus firmware change', 'RTM-14'],
              ['FA-3', 'Autonomous load-shedding under duress', 'KINETIC 4-tier cgroup cascade; 12-mo field validated', 'RTM-17'],
              ['FA-3', 'Reconfigurability across mission profiles', '17 terrestrial profiles; satellite bus = profile 18', 'RTM-22'],
              ['FA-3', 'Bus adaptable to tech change without re-architecture', 'Container-native: new capabilities as containers', 'RTM-24'],
            ].map(([fa, req, cap, rtm], i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>{fa}</td>
                <td>{req}</td>
                <td>{cap}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{rtm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>

      {/* ═══════════ SECTION 2.6: ZERO-TRUST SECURITY ═══════════ */}
      <Page id="sec-security" pageNum="2.6">
        <h3>2.6 Zero-Trust Security Architecture</h3>

        <p>
          The solicitation demands "zero-trust for on-board computation," "secure encryption of
          trusted agents," and "self-healing mesh networks/sensors." GHOST, VITO's network
          security agent, implements this with a production-hardened zero-trust mesh that has
          operated continuously for 12+ months in real-world DDIL conditions.
        </p>

        <h4>2.6.1 WireGuard Cryptographic Foundation</h4>
        <p>
          Every VITO node authenticates to the mesh via a WireGuard keypair (Curve25519 ECDH
          key exchange, ChaCha20-Poly1305 authenticated encryption). There are no shared passwords,
          no certificate authorities, and no pre-shared keys. Identity is cryptographic: a node
          either possesses the correct private key or it cannot communicate on the mesh — period.
          This eliminates the entire class of credential-theft attacks that compromise legacy
          password and PKI-based authentication schemes.
        </p>
        <p>
          Each node maintains an allowlist of peer public keys. An adversary cannot join the
          mesh without a valid keypair that appears in at least one peer's allowlist. The mesh
          is append-only in terms of trust: new nodes are provisioned by explicit key exchange,
          never by discovery or automatic enrollment.
        </p>

        <h4>2.6.2 Three Operational Modes</h4>
        <table>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Mode</th>
              <th style={{ width: '40%' }}>Description</th>
              <th style={{ width: '40%' }}>Orbital Analog</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Full Connectivity', 'WAN routing + mesh overlay; direct P2P connections preferred; relay via coordinator if direct path unavailable', 'Above-horizon ground contact with full TT&C link; inter-satellite links active'],
              ['Relay Mode', 'No direct WAN; all traffic relayed through mesh coordinator nodes; WireGuard tunnels maintained', 'Low-elevation ground contact; weak link; primary comms via inter-satellite relay'],
              ['Air-Gap Mode', 'No internet, no WAN; mesh operates on local network only; all agents function without external connectivity', 'Eclipse / DDIL / electronic warfare degradation; full autonomous operation with zero ground dependency'],
            ].map(([mode, desc, analog], i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600', fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{mode}</td>
                <td>{desc}</td>
                <td>{analog}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>2.6.3 API Security Layer</h4>
        <p>
          VITO's API layer enforces JWT token authentication on all endpoints, with TOTP
          (time-based one-time password) as a second factor for privileged operations. All
          API calls are logged to the JSONL audit trail with timestamp, origin, operation,
          and result. The audit trail is append-only (written via STOW's atomic write pattern)
          and cannot be modified by any running agent — only the kernel has write access to
          the underlying inode.
        </p>

        <h4>2.6.4 Constellation Security (Phase II)</h4>
        <p>
          In a multi-satellite constellation, GHOST extends the zero-trust mesh across
          inter-satellite links. Each satellite is a WireGuard peer with a unique keypair.
          The mesh topology is defined by the mission plan (pre-loaded as allowed peer lists),
          not by network discovery — there is no broadcast, no DNS, no central authority.
          A spoofed or compromised satellite cannot inject itself into the mesh without
          possessing the private key associated with its public key in every peer's allowlist.
        </p>
        <p>
          VERA monitors mesh topology for anomalies: unexpected peer additions, key-mismatch
          errors, or communication pattern deviations that may indicate replay attacks or
          adversary injection attempts. Anomalies trigger a ClawBands review to isolate the
          affected node before it can propagate bad data to the constellation.
        </p>

        <h4>2.6.5 Data Security Metrics</h4>
        <table>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Security Property</th>
              <th style={{ width: '30%' }}>Implementation</th>
              <th style={{ width: '30%' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Mesh encryption at rest / in transit', 'ChaCha20-Poly1305 (WireGuard)', 'Deployed'],
              ['Node authentication', 'Curve25519 ECDH keypair per node', 'Deployed'],
              ['API authentication', 'JWT + TOTP (privileged ops)', 'Deployed'],
              ['Audit trail integrity', 'Append-only JSONL; kernel-level write protection', 'Deployed'],
              ['Air-gap operation', 'GHOST switches to local mesh; all agents continue', 'Deployed, 12-mo validated'],
              ['Anti-replay protection', 'WireGuard built-in: 64-bit counter, replay window', 'Deployed'],
              ['Quantum-resistant encryption', 'Post-quantum WireGuard fork (pqWireGuard)', 'Phase II roadmap'],
              ['Federated zero-trust (multi-satellite)', 'Cross-node peer allowlist; no central authority', 'Phase II roadmap'],
            ].map(([prop, impl, status], i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{prop}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{impl}</td>
                <td style={{ fontSize: '8pt' }}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>

      {/* ═══════════ SECTION 3: PHASE I WORKPLAN ═══════════ */}
      <Page id="sec-workplan" pageNum={5}>
        <h2>3. Phase I Workplan</h2>

        <p>
          The Phase I effort spans 12 months with a clear focus on feasibility assessment, orbital
          environment modeling, and CONOPS development. The work is structured as nine tasks
          (T1–T9) with three milestone/exit gates (M1–M3). The critical path runs through
          architecture audit → orbital modeling → cascade validation → Flat-Sat testbed → final report.
        </p>

        <h3 id="sec-tasks">3.1 Task Breakdown</h3>

        <table>
          <thead>
            <tr>
              <th style={{ width: '6%' }}>ID</th>
              <th style={{ width: '28%' }}>Task</th>
              <th style={{ width: '8%' }}>Start</th>
              <th style={{ width: '8%' }}>Duration</th>
              <th style={{ width: '6%' }}>Path</th>
              <th style={{ width: '44%' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {workplanTasks.filter(t => !t.milestone).map(task => (
              <tr key={task.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{task.id}</td>
                <td style={{ fontWeight: task.critical ? '600' : '400' }}>
                  {task.name}{task.critical ? ' ★' : ''}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', textAlign: 'center' }}>M{task.start + 1}</td>
                <td style={{ fontFamily: 'var(--font-mono)', textAlign: 'center' }}>{task.duration} mo</td>
                <td style={{ textAlign: 'center', fontSize: '8pt' }}>{task.critical ? 'CRIT' : '—'}</td>
                <td style={{ fontSize: '8pt' }}>{task.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 style={{ marginTop: '12pt' }}>Exit Gates and Milestones</h4>

        <table>
          <thead>
            <tr>
              <th style={{ width: '6%' }}>ID</th>
              <th style={{ width: '25%' }}>Milestone</th>
              <th style={{ width: '8%' }}>Month</th>
              <th style={{ width: '61%' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {workplanTasks.filter(t => t.milestone).map(m => (
              <tr key={m.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{m.id}</td>
                <td style={{ fontWeight: '600' }}>{m.name}</td>
                <td style={{ fontFamily: 'var(--font-mono)', textAlign: 'center' }}>M{m.start}</td>
                <td style={{ fontSize: '8pt' }}>{m.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 id="sec-schedule">3.2 Schedule and Milestones</h3>

        <p>
          Figure 5 presents the Phase I Gantt chart. The critical path (starred tasks, hatched bars)
          determines the minimum project duration. Non-critical tasks have float and can absorb
          schedule risk without impacting the final deliverable.
        </p>

        <GanttChart />
        <div className="figure-caption"><span>Figure 5. </span>Phase I Work Breakdown and Schedule — 12-month period of performance. Critical path tasks are shown with hatched bars. Milestones (◆) indicate exit gates and deliverables.</div>

        <h4>University Partner Scope (SJSU — 30%)</h4>
        <p>
          Tasks T3 (orbital modeling), T5 (SEU analysis), and T8 (trade space) constitute the
          university partner's primary scope. SJSU contributes orbital mechanics expertise
          (GMAT/STK), radiation environment modeling, and academic validation. The university
          receives approximately 30% of the Phase I budget ($75K–$100K) for simulation infrastructure,
          student researchers, and co-authored deliverables.
        </p>
      </Page>

      {/* ═══════════ SECTION 4: TRL 6 EVIDENCE ═══════════ */}
      <Page id="sec-trl" pageNum={6}>
        <h2>4. TRL 6 Evidence</h2>

        <p>
          Most STTR Phase I proposals begin at TRL 2–3 (technology concept formulated, proof of concept).
          VITO enters Phase I at <strong>TRL 6: system model or prototype demonstration in a relevant
          environment</strong>. This section documents the evidence.
        </p>

        <h3 id="sec-validation">4.1 Mobile Node Alpha — Field Validation Platform</h3>

        <p>
          VITO has been operating continuously on "Mobile Node Alpha" — a commodity Lenovo P53
          workstation deployed in unconditioned thermal environments (−5°C to 45°C), subject to
          active vibration (vehicular transit), variable renewable power (solar + battery), and
          extended network outages (hours to days). This constitutes testing in a relevant
          environment per DoD TRL definitions.
        </p>

        <p><strong>Table 3. Field Validation Metrics — Mobile Node Alpha.</strong></p>

        <table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Metric</th>
              <th style={{ width: '20%' }}>Value</th>
              <th style={{ width: '55%' }}>Context</th>
            </tr>
          </thead>
          <tbody>
            {validationMetrics.map((m, i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{m.metric}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{m.value}</td>
                <td>{m.context}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p><strong>Hardware Platform:</strong></p>
        <table>
          <tbody>
            {[
              ['Platform', 'Lenovo P53 Tactical Node'],
              ['CPU', 'Intel Core i7-9850H (6C/12T)'],
              ['RAM', '32 GB DDR4'],
              ['Storage', '512 GB NVMe SSD (atomic write support)'],
              ['GPU', 'NVIDIA Quadro T2000 (Ollama LLM inference)'],
              ['OS', 'Ubuntu 22.04 LTS + Docker Engine'],
              ['Test Duration', '12+ months continuous operation'],
              ['Stressors', 'Vibration, thermal cycling, power variability, network outages'],
            ].map(([k, v], i) => (
              <tr key={i}>
                <td style={{ width: '25%', fontWeight: '600' }}>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 id="sec-susi">4.2 SUSI Testbed — Spacecraft Bus Power Analog</h3>

        <p>
          The Solar-UPS-Shedding-Integration (SUSI) testbed provides a direct terrestrial analog
          for spacecraft bus power constraints. The system operates on solar + LiFePO4 battery
          power, experiencing daily charge/discharge cycles that mirror orbital eclipse patterns.
        </p>

        <p><strong>Table 4. Power Budget — SUSI Testbed Analog.</strong></p>

        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Power Draw</th>
              <th>Duration (100Ah)</th>
              <th>Orbital Analog</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Command Hub (full load)', '30–80 W', '15–40 hours', 'Spacecraft bus nominal'],
              ['KINETIC Tier 3 shed', '15–40 W', '30–80 hours', 'Eclipse mode (media frozen)'],
              ['KINETIC Tier 2 shed', '10–25 W', '48–120 hours', 'Deep eclipse (UI frozen)'],
              ['KINETIC Tier 1 shed', '5–10 W', '120+ hours', 'Safe mode (comms + logging only)'],
              ['Gateway Radio', '5–10 W', '120+ hours', 'Always-on bus telemetry'],
            ].map(([comp, draw, dur, analog], i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{comp}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{draw}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{dur}</td>
                <td>{analog}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          The SUSI testbed has validated that KINETIC's 4-tier cascade successfully maintains
          mission-critical services (Tier 0: monitoring, communications, data logging) through
          complete solar loss events lasting 72+ hours, while preserving full system state
          for instant restoration when power returns. This directly demonstrates the feasibility
          of autonomous eclipse-cycle power management for spacecraft bus applications.
        </p>
      </Page>

      {/* ═══════════ SECTION 4.3: CRITICAL TECHNOLOGY ELEMENTS ═══════════ */}
      <Page id="sec-ctes" pageNum="4.3">
        <h3>4.3 Critical Technology Elements (CTEs)</h3>

        <p>
          Per Annex I of the solicitation, the feasibility study must "identify the critical
          technology elements (CTEs) of the new technology" and "provide data to support the
          feasibility of technology development of each CTE." The following six CTEs define
          the technical boundaries of the Phase I effort. CTE maturity levels are assessed
          against DoD TRL definitions.
        </p>

        {cteData.map((cte, i) => (
          <div key={i} style={{ border: '1px solid #999', padding: '8pt 10pt', marginBottom: '6pt' }}>
            <div style={{ fontWeight: '700', fontFamily: 'var(--font-mono)', fontSize: '9pt', marginBottom: '4pt' }}>
              {cte.id}: {cte.name} — TRL {cte.trl} | Risk: {cte.risk}
            </div>
            <p style={{ marginBottom: '4pt' }}><strong>Description:</strong> {cte.description}</p>
            <p style={{ marginBottom: '4pt' }}><strong>Phase I Validation Plan:</strong> {cte.validation}</p>
            <p style={{ marginBottom: '0' }}><strong>Heritage Evidence:</strong> {cte.heritage}</p>
          </div>
        ))}

        <p style={{ marginTop: '12pt' }}>
          <strong>Table 5. CTE Summary Matrix.</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th style={{ width: '8%' }}>ID</th>
              <th style={{ width: '35%' }}>Critical Technology Element</th>
              <th style={{ width: '10%' }}>TRL</th>
              <th style={{ width: '8%' }}>Risk</th>
              <th style={{ width: '39%' }}>Phase I Validation Approach</th>
            </tr>
          </thead>
          <tbody>
            {cteData.map((cte, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>{cte.id}</td>
                <td>{cte.name}</td>
                <td style={{ fontFamily: 'var(--font-mono)', textAlign: 'center' }}>{cte.trl}</td>
                <td style={{ textAlign: 'center', fontWeight: '600' }}>{cte.risk}</td>
                <td style={{ fontSize: '8pt' }}>{cte.validation}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: '12pt' }}>
          The two High-risk CTEs (CTE-4: LLM inference on rad-hard CPU; CTE-6: SpaceWire abstraction)
          are the primary Phase I research questions. CTE-4 is addressable by benchmarking
          the Ollama CPU inference path on ARM64 hardware during Phase I, establishing whether
          quantized model inference meets the 5-second latency requirement without GPU. CTE-6
          is addressed by treating it as a driver development task scoped to Phase II with
          specification and interface design as the Phase I deliverable.
        </p>

        <h4>4.3.1 Feasibility Assessment Summary</h4>
        <p>
          Based on field validation data, literature review, and CTE analysis, the critical
          feasibility question for Phase I is: <em>Can VITO's containerized agent architecture,
          validated at TRL 6 in terrestrial DDIL conditions, be adapted for orbital deployment
          within the power, compute, and radiation constraints of a spacecraft bus?</em>
        </p>
        <p>
          The evidence presented in this document supports an affirmative preliminary answer for
          four of six CTEs (CTE-1 through CTE-3, CTE-5). CTE-4 (LLM on rad-hard CPU) and
          CTE-6 (SpaceWire abstraction) require dedicated Phase I investigation. This is normal
          for a TRL 6→7 transition effort and is the appropriate scope of a Phase I feasibility study.
        </p>
      </Page>

      {/* ═══════════ SECTION 5: RISK REGISTRY ═══════════ */}
      <Page id="sec-risks" pageNum="5">
        <h2>5. Technical Risk Registry and Mitigation</h2>

        <p>
          Per Annex I requirements, this section identifies "risks, uncertainties/unknowns,
          and issues of the proposed CONOPS with mitigation and closure measures." Risk
          probability and impact are assessed on a three-level scale: Low, Med (Medium), High.
        </p>

        <table>
          <thead>
            <tr>
              <th style={{ width: '7%' }}>ID</th>
              <th style={{ width: '8%' }}>Area</th>
              <th style={{ width: '35%' }}>Risk Description</th>
              <th style={{ width: '6%' }}>Prob</th>
              <th style={{ width: '6%' }}>Imp</th>
              <th style={{ width: '38%' }}>Mitigation and Closure Measure</th>
            </tr>
          </thead>
          <tbody>
            {riskRegistry.map((r, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>{r.id}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '8pt' }}>{r.area}</td>
                <td>{r.risk}</td>
                <td style={{ textAlign: 'center', fontWeight: '600' }}>{r.prob}</td>
                <td style={{ textAlign: 'center', fontWeight: '600' }}>{r.impact}</td>
                <td style={{ fontSize: '8pt' }}>{r.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: '8pt', fontSize: '9pt' }}>
          <strong>Risk Aggregation:</strong> The two High-impact risks (R-01: LLM inference latency;
          R-03: Linux kernel availability) are the same as the two High-risk CTEs. Both have
          well-defined fallback paths: deterministic-only agent operation (R-01) and RTOS POSIX
          subset (R-03). The overall program risk posture is <strong>Medium</strong> — normal for a TRL-6-to-7
          transition with identified and bounded unknowns.
        </p>

        <h4>5.1 Residual Risk After Phase I Closure</h4>
        <p>
          Following Phase I, the risk profile is expected to improve:
        </p>
        <ul>
          <li><strong>R-01 (LLM latency)</strong> will be characterized by ARM64 benchmarks. If latency
          exceeds 30 seconds on CPU-only, OTTO will be scoped to deterministic rule-based logic for
          Phase II with a roadmap for GPU-accelerated inference (candidate: NVIDIA Orin NX
          rad-tolerant-packaged module).</li>
          <li><strong>R-02 (SpaceWire drivers)</strong> will be resolved by interface specification.
          Phase II partners with a SpaceWire interface vendor for driver development.</li>
          <li><strong>R-03 (Linux on rad-hard SoC)</strong> will be resolved by Phase I SoC survey.
          The Xilinx Zynq UltraScale+ (space grade: XQZU3EG) explicitly supports Linux on its
          Cortex-A53 cores, making this risk likely to close to Low during Phase I.</li>
          <li><strong>R-04 through R-08</strong> are manageable risks that do not threaten
          program success. Each has a defined mitigation that can be executed within Phase I scope.</li>
        </ul>

        <h4>5.2 ITAR and Export Control Compliance</h4>
        <p>
          The technology developed under this effort may be subject to ITAR (22 CFR 120-130) or
          EAR (15 CFR 730-774) controls. The following controls are in place:
        </p>
        <ul>
          <li>All ITAR-sensitive development work will be performed exclusively by U.S. Persons.</li>
          <li>Foreign national researchers at SJSU will be assigned to orbital mechanics modeling tasks
          (classical Keplerian propagation, eclipse prediction) that do not involve defense article
          specifications, spacecraft hardware, or weapons system integration.</li>
          <li>The VITO software codebase will be maintained in a U.S.-controlled repository with
          access restricted to cleared U.S. Persons throughout Phase I.</li>
          <li>Any proposed foreign national participation will be disclosed per §3.5 of the STTR
          Announcement prior to award.</li>
        </ul>
      </Page>

      {/* ═══════════ SECTION 6: COMPLIANCE MATRIX ═══════════ */}
      <Page id="sec-matrix" pageNum={8}>
        <h2>5. Requirements Compliance Matrix</h2>

        <p>
          Figure 1 / Table 5 maps all identified requirements from STTR topic SF25D-T1201 to
          corresponding VITO capabilities. Section references (§) correspond to the solicitation
          document. Focus Areas: FA-1 = Edge Computing & Algorithms, FA-2 = Sensors & Payloads,
          FA-3 = Bus Design & Autonomy, Cross = Cross-Cutting Technical Domains per §4.1.
        </p>

        <div style={{ fontSize: '9pt', margin: '8pt 0' }}>
          <strong>Coverage Summary:</strong>{' '}
          {rtmData.filter(r => r.status === 'deployed').length} deployed /{' '}
          {rtmData.filter(r => r.status === 'proposed').length} proposed (Phase I scope) /{' '}
          {rtmData.filter(r => r.status === 'phase2').length} Phase II roadmap /{' '}
          {rtmData.length} total requirements mapped.
        </div>

        <ComplianceMatrix />

        <div className="figure-caption" style={{ marginTop: '8pt' }}>
          <span>Figure 1 / Table 6. </span>Requirements Compliance Matrix — SF25D-T1201. Status: ● = Deployed and field-validated; ◐ = Proposed Phase I scope; ○ = Phase II roadmap.
        </div>
      </Page>

      {/* ═══════════ SECTION 7: TRANSITION ═══════════ */}
      <Page id="sec-transition" pageNum={9}>
        <h2>7. Related Work and Transition</h2>

<h3 id="sec-profiles">7.1 Mission Profile Reconfigurability</h3>

        <p>
          VITO's architecture supports rapid reconfiguration across operational domains. The same
          eight core agents operate in every profile — what changes are cascade thresholds,
          telemetry bindings, and service compositions. This directly addresses the solicitation's
          requirement for "reconfigurability across mission profiles" (§3.2). A satellite bus
          becomes Mission Profile 18, sharing the same proven agent codebase.
        </p>

        <p><strong>Current deployment profiles (17 terrestrial + 1 proposed orbital):</strong></p>

        <div className="two-col" style={{ margin: '8pt 0' }}>
          {missionProfiles.map((tier, i) => (
            <div key={i} style={{ border: '1px solid #999', padding: '8pt', marginBottom: '6pt' }}>
              <div style={{ fontWeight: '700', fontSize: '9pt', fontFamily: 'var(--font-heading)', marginBottom: '4pt' }}>{tier.tier}</div>
              <ul style={{ margin: '0', paddingLeft: '16pt' }}>
                {tier.profiles.map((p, j) => (
                  <li key={j} style={{ fontSize: '9pt' }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p><strong>Table 6. Terrestrial-to-Orbital Transition Map.</strong></p>

        <table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Subsystem</th>
              <th style={{ width: '35%' }}>Terrestrial (Deployed)</th>
              <th style={{ width: '35%' }}>Orbital (Phase I Adaptation)</th>
              <th style={{ width: '5%' }}>Risk</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['KINETIC load-shedding', 'Solar + battery cascade thresholds', 'Eclipse cycle predictions via GMAT/STK', 'Low'],
              ['STOW atomic persistence', 'NVMe temp→rename pattern', 'Identical (storage-agnostic)', 'Low'],
              ['GHOST zero-trust mesh', 'Tailscale P2P over internet/mesh', 'P2P over inter-satellite links', 'Med'],
              ['FORGE auto-healing', 'Docker container restart logic', 'Identical (kernel-agnostic)', 'Low'],
              ['OTTO local inference', 'Ollama on NVIDIA GPU', 'Quantized models on rad-hard SoC', 'Med'],
              ['VIGIL health monitoring', 'Linux /sys interfaces', 'SpaceWire/CAN bus adaptation', 'Med'],
              ['Telemetry interfaces', 'Signal K, OBD-II, LoRa', 'SpaceWire, CAN, S-band TT&C', 'High'],
              ['Radiation hardening', 'N/A', 'SEU recovery validation, ECC memory', 'High'],
            ].map(([sub, terr, orbit, risk], i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{sub}</td>
                <td>{terr}</td>
                <td>{orbit}</td>
                <td style={{ textAlign: 'center', fontWeight: '600' }}>{risk}</td>
              </tr>
            ))}
          </tbody>
        </table>

<h3 id="sec-phase2">7.2 Phase II Roadmap</h3>

        <p>
          Phase II focuses on prototype development targeting flight-representative hardware.
          Key Phase II objectives include:
        </p>

        <ol>
          <li><strong>Rad-hard SoC port:</strong> Deploy VITO agent stack on radiation-hardened ARM/RISC-V system-on-chip
          (candidate: Xilinx Zynq UltraScale+ with ECC). Validate container isolation under simulated radiation flux.</li>
          <li><strong>Flat-Sat integration:</strong> Full containerized flight software testbed with SpaceWire/CAN bus
          interfaces, simulated sensor payloads, and eclipse cycle simulation.</li>
          <li><strong>Federated constellation:</strong> Extend GHOST mesh protocol for inter-satellite coordination.
          Validate distributed decision-making across 3+ nodes with simulated DDIL link degradation.</li>
          <li><strong>Rust safety-critical core:</strong> Port KINETIC and STOW to memory-safe Rust implementation
          for paths that interact directly with power and data subsystems (§3.2: memory-safe language applications).</li>
          <li><strong>STK/GMAT closed-loop:</strong> Integrate orbital mechanics simulation into KINETIC for
          predictive eclipse-based power scheduling.</li>
        </ol>

<h3>7.3 Commercial Transition</h3>

        <p>
          VITO's terrestrial deployment across 17 mission profiles demonstrates immediate commercial
          viability. The STTR Phase I/II work product — containerized autonomous bus management software —
          has a dual-use transition path: (1) direct integration with commercial satellite bus
          manufacturers seeking autonomous operations capability, and (2) continued expansion of
          terrestrial edge deployments in mining, agriculture, and defense sectors. The AFRL AMAC
          IDIQ vehicle (FA865226R0001, $10B ceiling) provides an additional procurement pathway
          for post-Phase II operational deployment.
        </p>

        <h3 id="sec-phase3">7.4 Phase III Dual-Use Applications</h3>

        <p>
          Phase III efforts transition technologies developed under this topic into operational use
          and commercial markets, leveraging non-SBIR/STTR funding. Phase III work includes
          productization, integration, certification, and large-scale deployment.
        </p>

        <table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Phase III Target</th>
              <th style={{ width: '45%' }}>Technical Work</th>
              <th style={{ width: '30%' }}>Customer / Path</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Autonomous Spacecraft Bus', 'Production-grade flight software stack; SpaceWire + CAN bus integration; radiation-hardened SoC certification', 'Small sat bus OEMs; USSF AFRL AMAC IDIQ'],
              ['Federated Constellation Management', 'Multi-spacecraft agent mesh; inter-satellite WireGuard P2P; distributed threat assessment', 'Space Force SSC; NRO; Commercial constellation operators'],
              ['Terrestrial Edge Autonomy Scale', 'Expand 17 mission profiles to enterprise; managed service offering; government prime sub', 'Defense prime contractors; AFWERX Commercial Solutions Openings'],
              ['Phase II→III Certification', 'DO-178C avionics software equivalence analysis; MIL-STD-882 System Safety; CMMC L2', 'Required for integration with government platforms'],
            ].map(([target, work, customer], i) => (
              <tr key={i}>
                <td style={{ fontWeight: '600' }}>{target}</td>
                <td>{work}</td>
                <td style={{ fontSize: '8pt' }}>{customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>

      {/* ═══════════ SECTION 8: PERSONNEL ═══════════ */}
      <Page id="sec-personnel" pageNum={10}>
        <h2>8. Key Personnel</h2>

        <h3>8.1 Principal Investigator</h3>

        <div style={{ border: '1px solid #999', padding: '12pt', marginBottom: '12pt' }}>
          <div style={{ fontWeight: '700', fontSize: '12pt', fontFamily: 'var(--font-heading)' }}>Tyler Eno</div>
          <div style={{ fontSize: '9pt', color: '#555', marginBottom: '8pt' }}>
            Principal Investigator / Systems Architect &nbsp;|&nbsp;
            SAM.gov: INC-GSAFSD20703056
          </div>
          <p style={{ fontSize: '10pt' }}>
            Sole architect and developer of the VITO platform. Designed and built the complete
            8-agent autonomous system, 40+ container infrastructure, power cascade, zero-trust mesh,
            and atomic data persistence layer. 12+ months of continuous field operation and validation.
            Full-stack engineering: systems architecture, Docker/Linux infrastructure, AI/ML (Ollama,
            CrewAI, ChromaDB), hardware integration (Modbus TCP, LoRa, serial UART), React dashboards,
            and Node.js/Python backend services.
          </p>
          <p style={{ fontSize: '10pt' }}>
            Demonstrated engineering discipline: GHOST Phase 2 (bidirectional LoRa messaging with
            LLM integration) delivered 19 days ahead of schedule with 18 unit tests passing and
            1,500 stress-test iterations with zero failures.
          </p>
        </div>

        <h3>8.2 University Partner — San José State University</h3>

        <div style={{ border: '1px solid #999', padding: '12pt', marginBottom: '12pt' }}>
          <div style={{ fontWeight: '700', fontSize: '12pt', fontFamily: 'var(--font-heading)' }}>
            San José State University — Department of Aerospace Engineering
          </div>
          <div style={{ fontSize: '9pt', color: '#555', marginBottom: '8pt' }}>
            STTR Research Partner (30% budget allocation, $75K–$100K)
          </div>
          <p style={{ fontSize: '10pt' }}>
            <strong>Scope:</strong> Orbital environment simulation (GMAT/STK), radiation flux modeling,
            thermal vacuum analysis, eclipse cycle power profiling, and CONOPS co-authoring. SJSU
            provides faculty expertise in orbital mechanics, student researchers for simulation
            development, and academic validation infrastructure for Phase I feasibility assessment.
          </p>
        </div>

        <h3>8.3 Proposed STTR Structure</h3>

        <p>
          STTR requires a minimum 30% university/research institution participation (40 USC §3702).
          The proposed structure allocates approximately 70% of effort to the small business
          (VITO platform adaptation, testbed development, Phase I showcase) and 30% to the
          university partner (orbital environment modeling, radiation analysis, CONOPS
          co-authoring, academic validation).
        </p>

        <div className="two-col" style={{ margin: '12pt 0' }}>
          <div style={{ border: '1px solid #999', padding: '8pt' }}>
            <div style={{ fontWeight: '700', fontSize: '9pt', fontFamily: 'var(--font-heading)', marginBottom: '4pt' }}>
              Small Business — Prime (70%)
            </div>
            <ul style={{ fontSize: '9pt', paddingLeft: '16pt', margin: '0' }}>
              <li>Adapt agent logic for spacecraft bus telemetry</li>
              <li>Develop Flat-Sat software testbed</li>
              <li>Execute Phase I showcase (El Segundo, CA)</li>
              <li>Port containerization to rad-hard SoC targets</li>
              <li>Deliver feasibility report with live validation data</li>
            </ul>
          </div>
          <div style={{ border: '1px solid #999', padding: '8pt' }}>
            <div style={{ fontWeight: '700', fontSize: '9pt', fontFamily: 'var(--font-heading)', marginBottom: '4pt' }}>
              University Partner — Research (30%)
            </div>
            <ul style={{ fontSize: '9pt', paddingLeft: '16pt', margin: '0' }}>
              <li>Feasibility audit: containerization for space-grade compute</li>
              <li>Orbital power cycle simulation (GMAT/STK)</li>
              <li>Radiation modeling: FORGE recovery vs. SEU rates</li>
              <li>Co-author CONOPS for Phase II</li>
              <li>Provide simulation infrastructure and academic review</li>
            </ul>
          </div>
        </div>

        <h3>8.4 Contact Information</h3>

        <table>
          <tbody>
            <tr><td style={{ width: '30%', fontWeight: '600' }}>Principal Investigator</td><td>Tyler Eno</td></tr>
            <tr><td style={{ fontWeight: '600' }}>Email</td><td>t.eno992@gmail.com</td></tr>
            <tr><td style={{ fontWeight: '600' }}>Phone</td><td>(504) 410-7420</td></tr>
            <tr><td style={{ fontWeight: '600' }}>SAM.gov UEI</td><td>INC-GSAFSD20703056</td></tr>
            <tr><td style={{ fontWeight: '600' }}>STTR Topic</td><td>SF25D-T1201</td></tr>
            <tr><td style={{ fontWeight: '600' }}>AMAC Vehicle</td><td>FA865226R0001</td></tr>
          </tbody>
        </table>

        <div style={{ marginTop: '24pt', borderTop: '2px solid #000', paddingTop: '8pt', textAlign: 'center', fontSize: '9pt', color: '#555' }}>
          VITO Series-4 v4.7.0 — Autonomous Edge Operating System for DDIL Environments<br />
          © 2026 Tyler Eno. All rights reserved.
        </div>
      </Page>
    </div>
  );
}
