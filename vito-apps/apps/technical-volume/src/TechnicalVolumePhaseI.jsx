import React from 'react';
import MermaidDiagram from './MermaidDiagram.jsx';
import { topologyDiagram, decisionCycleDiagram } from './diagrams.js';
import { workplanTasks, validationMetrics, riskRegistry, cteData } from './data.js';

function Page({ id, pageNum, children }) {
  return (
    <div className="doc-page" id={id}>
      <div className="page-header">
        <span>SF25D-T1201 — Volume 2 Technical Volume (Phase I)</span>
        <span>DISTRIBUTION A — Approved for Public Release</span>
      </div>
      <div className="page-body">{children}</div>
      <div className="page-footer">
        <span>VITO Series-4 · Tyler Eno · February 2026</span>
        <span>Page {pageNum} of 5</span>
      </div>
    </div>
  );
}

function PrintToolbar() {
  return (
    <div className="print-toolbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <strong>Volume 2 — Technical Volume</strong>
        <span style={{ color: '#666' }}>Strict 5-page format</span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => document.getElementById('p1').scrollIntoView({ behavior: 'smooth' })}>PAGE 1</button>
        <button onClick={() => document.getElementById('p4').scrollIntoView({ behavior: 'smooth' })}>WORKPLAN</button>
        <button onClick={() => window.print()}>EXPORT PDF (Ctrl+P)</button>
      </div>
    </div>
  );
}

function WorkplanTable() {
  const tasks = workplanTasks.filter(t => !t.milestone);
  const milestones = workplanTasks.filter(t => t.milestone);

  const ownerMap = {
    T1: 'ARK',
    T2: 'ARK',
    T3: 'SJSU+ARK',
    T4: 'ARK',
    T5: 'ARK',
    T6: 'SJSU+ARK',
    T7: 'ARK',
    T8: 'SJSU+ARK',
    T9: 'ARK',
  };

  return (
    <>
      <h3>4.1 Phase I Task Breakdown (Clear Task-Level Scope)</h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: '6%' }}>ID</th>
            <th style={{ width: '23%' }}>Task</th>
            <th style={{ width: '10%' }}>Owner</th>
            <th style={{ width: '8%' }}>Start</th>
            <th style={{ width: '8%' }}>Dur.</th>
            <th style={{ width: '45%' }}>Deliverable / Acceptance Evidence</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{task.id}</td>
              <td style={{ fontWeight: task.critical ? 700 : 500 }}>{task.name}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{ownerMap[task.id] || 'ARK'}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>M{task.start + 1}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>{task.duration} mo</td>
              <td style={{ fontSize: '8pt' }}>{task.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '12pt' }}>4.2 Exit Gates / Milestones</h3>
      <table>
        <thead>
          <tr>
            <th style={{ width: '8%' }}>ID</th>
            <th style={{ width: '27%' }}>Milestone</th>
            <th style={{ width: '10%' }}>Month</th>
            <th style={{ width: '55%' }}>Exit Criteria</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map(milestone => (
            <tr key={milestone.id}>
              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{milestone.id}</td>
              <td style={{ fontWeight: 700 }}>{milestone.name}</td>
              <td style={{ fontFamily: 'var(--font-mono)' }}>M{milestone.start}</td>
              <td style={{ fontSize: '8pt' }}>{milestone.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function TechnicalVolumePhaseI() {
  const topMetrics = validationMetrics.slice(0, 6);
  const topRisks = riskRegistry.slice(0, 4);

  return (
    <div>
      <PrintToolbar />

      <Page id="p1" pageNum={1}>
        <h2>1.0 Technical Basis and Phase I Scope</h2>
        <p>
          This Volume 2 contains technical material only and is limited to five technical pages,
          with Proposal Cover Sheet handled separately as Volume 1.
        </p>

        <h3>1.1 Technical Summary</h3>
          <p>
            VITO is an eight-agent autonomous architecture designed for contested, degraded, intermittent,
            and limited (DDIL) communications environments. The system closes a full Observe–Orient–Decide–Act
            (OODA) loop onboard the spacecraft without requiring persistent ground contact.
          </p>
          <p>
            The Phase I technical objective is to demonstrate feasibility and execution readiness for adaptation
            of this architecture to space operations, including autonomous power governance, resilient data persistence,
            zero-trust communications, and bounded risk decision arbitration.
          </p>

        <h3>1.2 Required Phase I Deliverables and Milestones</h3>
        <table>
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Deliverable</th>
              <th style={{ width: '20%' }}>Milestone</th>
              <th style={{ width: '52%' }}>Technical Evidence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Initial Report</td>
              <td>M1</td>
              <td style={{ fontSize: '8pt' }}>Literature baseline, architecture audit, and initial feasibility findings.</td>
            </tr>
            <tr>
              <td>Documented Feasibility Assessment</td>
              <td>M2</td>
              <td style={{ fontSize: '8pt' }}>CTE-level feasibility with risk and mitigation traces mapped to Phase II needs.</td>
            </tr>
            <tr>
              <td>Initial CONOPS + Architectural Framework</td>
              <td>M2</td>
              <td style={{ fontSize: '8pt' }}>On-orbit OODA flow, DDIL operational modes, and autonomous decision boundary.</td>
            </tr>
            <tr>
              <td>Proposed Phase II Development Plan</td>
              <td>M3</td>
              <td style={{ fontSize: '8pt' }}>Scope, objectives, transition relevance, and technical maturation path.</td>
            </tr>
            <tr>
              <td>Final Report + AIS Showcase Package</td>
              <td>M3</td>
              <td style={{ fontSize: '8pt' }}>Final technical package, showcase documentation, and transition-ready baseline.</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '12pt', fontSize: '9pt', borderTop: '1px solid #999', paddingTop: '8pt' }}>
          <strong>PI:</strong> Tyler Eno · ARK Intelligent Systems LLC · February 2026
        </div>
      </Page>

      <Page id="p2" pageNum={2}>
        <h2>2.0 System Architecture (Enlarged)</h2>
        <p>
          Figure 1 shows the full architecture at printable scale. It includes hardware interfaces,
          orchestration layers, eight autonomous agents, decision gating, and operator/API boundaries.
        </p>

        <div style={{ marginTop: '10pt' }}>
          <MermaidDiagram
            chart={topologyDiagram}
            figNum="1"
            caption="VITO system architecture with host runtime, CrewAI orchestration, and autonomous agents."
          />
        </div>
      </Page>

      <Page id="p3" pageNum={3}>
        <h2>3.0 OODA Decision Cycle (Enlarged)</h2>
        <p>
          Figure 2 is presented at large format for readability. The cycle executes entirely onboard and
          includes explicit safety arbitration at the ClawBands gate for destructive actions.
        </p>

        <div style={{ marginTop: '12pt' }}>
          <MermaidDiagram
            chart={decisionCycleDiagram}
            figNum="2"
            caption="Six-phase onboard OODA loop with auto-approved low-risk actions and operator review only for destructive actions."
          />
        </div>

        <h3 style={{ marginTop: '14pt' }}>3.1 Execution Characteristics</h3>
        <ul>
          <li><strong>Latency target:</strong> &lt;3 seconds from anomaly detection to bounded action commitment.</li>
          <li><strong>Autonomy mode:</strong> Ground-independent operation during DDIL outages.</li>
          <li><strong>Safety mode:</strong> ClawBands gate prevents unsafe destructive actions without policy approval.</li>
          <li><strong>Auditability:</strong> STOW writes transaction logs for post-event forensics and replay.</li>
        </ul>
      </Page>

      <Page id="p4" pageNum={4}>
        <h2>4.0 Phase I Workplan (Tasks and Milestones)</h2>
        <p>
          The workplan below provides explicit tasks, owners, schedule windows, and acceptance evidence.
          Critical tasks are highlighted in bold task names.
        </p>

        <WorkplanTable />
      </Page>

      <Page id="p5" pageNum={5}>
        <h2>5.0 Validation, Risks, and Technical Deliverables</h2>

        <h3>5.1 Validation Metrics</h3>
        <table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Metric</th>
              <th style={{ width: '15%' }}>Measured</th>
              <th style={{ width: '60%' }}>Context</th>
            </tr>
          </thead>
          <tbody>
            {topMetrics.map(metric => (
              <tr key={metric.metric}>
                <td>{metric.metric}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{metric.value}</td>
                <td style={{ fontSize: '8pt' }}>{metric.context}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: '12pt' }}>5.2 Technical Risk Register (Top Risks)</h3>
        <table>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '18%' }}>Area</th>
              <th style={{ width: '12%' }}>Prob.</th>
              <th style={{ width: '12%' }}>Impact</th>
              <th style={{ width: '48%' }}>Mitigation</th>
            </tr>
          </thead>
          <tbody>
            {topRisks.map(risk => (
              <tr key={risk.id}>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{risk.id}</td>
                <td>{risk.area}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{risk.prob}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{risk.impact}</td>
                <td style={{ fontSize: '8pt' }}>{risk.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: '12pt' }}>5.3 CTE Coverage</h3>
        <p>
          Phase I addresses {cteData.length} critical technology elements spanning onboard runtime,
          power cascade adaptation, data persistence, inference constraints, mesh communications,
          and spacecraft telemetry abstraction.
        </p>

        <h3>5.4 Phase I Technical Exit Condition</h3>
        <p>
          Phase I completion requires demonstration-quality evidence package for architecture feasibility,
          DDIL autonomy behavior, workplan milestone closure, and a Phase II-ready technical baseline.
        </p>
      </Page>
    </div>
  );
}
