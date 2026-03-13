import React from 'react';

function Page({ id, num, title, children }) {
  return (
    <div className="doc-page" id={id}>
      <div className="page-header">
        <span>VITO Series-4 — Submission Volumes</span>
        <span>{title}</span>
      </div>
      <div className="page-body">
        {children}
      </div>
      <div className="page-footer">
        <span>SF25D-T1201 · February 2026</span>
        <span>Page {num}</span>
      </div>
    </div>
  );
}

export default function SubmissionVolumes() {
  return (
    <div>
      <div className="toolbar">
        <div><strong>AIS Showcase Submission Volumes</strong> · 1 / 2 / 3 / 4 / 6 / 7</div>
        <div>
          <button onClick={() => document.getElementById('v1').scrollIntoView({ behavior: 'smooth' })}>Volume 1</button>
          <button onClick={() => document.getElementById('v2').scrollIntoView({ behavior: 'smooth' })}>Volume 2</button>
          <button onClick={() => document.getElementById('v3').scrollIntoView({ behavior: 'smooth' })}>Volume 3</button>
          <button onClick={() => document.getElementById('v4').scrollIntoView({ behavior: 'smooth' })}>Volume 4</button>
          <button onClick={() => document.getElementById('v6').scrollIntoView({ behavior: 'smooth' })}>Volume 6</button>
          <button onClick={() => document.getElementById('v7').scrollIntoView({ behavior: 'smooth' })}>Volume 7</button>
          <button onClick={() => window.print()}>Export PDF</button>
        </div>
      </div>

      <Page id="v1" num={1} title="Volume 1 — Proposal Cover Sheet">
        <h1>Volume 1 — Proposal Cover Sheet</h1>
        <table>
          <tbody>
            <tr><th style={{ width: '34%' }}>Topic</th><td>SF25D-T1201 — Adaptive and Intelligent Space</td></tr>
            <tr><th>Offeror</th><td>ARK Intelligent Systems LLC</td></tr>
            <tr><th>Principal Investigator</th><td>Tyler Eno</td></tr>
            <tr><th>Research Institution</th><td>San José State University</td></tr>
            <tr><th>Program</th><td>SpaceWERX STTR Phase I</td></tr>
            <tr><th>Submission Event</th><td>AIS Phase I Showcase (El Segundo, CA)</td></tr>
            <tr><th>Prepared</th><td>February 2026</td></tr>
          </tbody>
        </table>

        <h2 style={{ marginTop: '12pt' }}>Volume Set Checklist</h2>
        <ul>
          <li>Volume 1 — Proposal Cover Sheet</li>
          <li>Volume 2 — Technical Volume (maximum 5 technical pages; separate document)</li>
          <li>Volume 3 — Cost Volume</li>
          <li>Volume 4 — Company Commercialization Report</li>
          <li>Volume 6 — Fraud, Waste, and Abuse Training</li>
          <li>Volume 7 — Disclosures of Foreign Affiliations</li>
          <li>Presentation Slide Deck (maximum 10 slides)</li>
        </ul>
      </Page>

      <Page id="v2" num={2} title="Volume 2 — Technical Volume (Index)">
        <h1>Volume 2 — Technical Volume (Index)</h1>
        <p>
          Volume 2 is maintained as a separate 5-page technical document in the technical-volume app
          and is intentionally separated from this multi-volume packet.
        </p>

        <h2>Volume 2 Package Contents</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '14%' }}>Page</th>
              <th style={{ width: '30%' }}>Section</th>
              <th style={{ width: '56%' }}>Content Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Technical Basis + Deliverables</td><td>Phase I scope, required milestones, and evidence mapping.</td></tr>
            <tr><td>2</td><td>System Architecture</td><td>Large-format architecture diagram and subsystem relationships.</td></tr>
            <tr><td>3</td><td>OODA Cycle</td><td>Large-format decision loop and safety arbitration path.</td></tr>
            <tr><td>4</td><td>Workplan</td><td>Task-by-task schedule, owner, duration, and milestone criteria.</td></tr>
            <tr><td>5</td><td>Validation + Risk</td><td>Metrics, top risks/mitigations, CTE coverage, exit condition.</td></tr>
          </tbody>
        </table>
      </Page>

      <Page id="v3" num={3} title="Volume 3 — Cost Volume">
        <h1>Volume 3 — Cost Volume</h1>
        <p>
          This volume is intentionally separate from the Technical Volume and pitch deck.
          It provides Phase I cost breakdown by labor, subcontract, materials, travel, and indirects.
        </p>

        <h2>3.1 Cost Basis Summary</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '34%' }}>Cost Element</th>
              <th style={{ width: '16%' }}>Type</th>
              <th style={{ width: '15%' }}>Value ($)</th>
              <th style={{ width: '35%' }}>Basis of Estimate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Direct Labor — ARK</td><td>Direct</td><td>TBD</td><td>PI + engineering labor hours by work package (T1–T9)</td></tr>
            <tr><td>Subcontract — SJSU</td><td>Direct</td><td>TBD</td><td>STTR partner effort allocation and negotiated rates</td></tr>
            <tr><td>Materials / COTS Hardware</td><td>Direct</td><td>TBD</td><td>Vendor quotes for SBCs, RF, sensors, power modules</td></tr>
            <tr><td>Travel</td><td>Direct</td><td>TBD</td><td>AIS showcase and sponsor coordination travel</td></tr>
            <tr><td>ODCs</td><td>Direct</td><td>TBD</td><td>Cloud/dev tooling, test consumables, documentation</td></tr>
            <tr><td>Fringe / Overhead / G&amp;A</td><td>Indirect</td><td>TBD</td><td>Provisional or approved accounting rates</td></tr>
          </tbody>
        </table>

        <h2 style={{ marginTop: '10pt' }}>3.2 Notes</h2>
        <ul>
          <li>All numeric values are maintained in this volume only.</li>
          <li>No cost figures are duplicated in Volume 2 or in the slide deck.</li>
          <li>Final pricing table follows sponsor template and accounting system outputs.</li>
        </ul>
      </Page>

      <Page id="v4" num={4} title="Volume 4 — Company Commercialization Report">
        <h1>Volume 4 — Company Commercialization Report</h1>

        <h2>4.1 Commercialization Objective</h2>
        <p>
          Transition VITO from terrestrial autonomy deployments to space-qualified autonomy products,
          with dual-use paths spanning DoD, civil, and commercial operators.
        </p>

        <h2>4.2 Market and Transition Channels</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '24%' }}>Segment</th>
              <th style={{ width: '28%' }}>Target Customer</th>
              <th style={{ width: '24%' }}>Adoption Driver</th>
              <th style={{ width: '24%' }}>Revenue Path</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Defense Space Ops</td><td>USSF, AFRL, AFMC, SDA missions</td><td>On-orbit autonomy under DDIL</td><td>Program integration + sustainment</td></tr>
            <tr><td>Commercial LEO</td><td>Constellation operators</td><td>Reduced ops labor, autonomous fault response</td><td>License + support contracts</td></tr>
            <tr><td>Civil / Science</td><td>NASA and academic missions</td><td>Delayed-link autonomous decisions</td><td>Mission package integration</td></tr>
            <tr><td>Industrial Dual-Use</td><td>Remote infrastructure operators</td><td>Existing VITO deployments and telemetry stack</td><td>Profile-based subscriptions</td></tr>
          </tbody>
        </table>

        <h2 style={{ marginTop: '10pt' }}>4.3 Commercialization Readiness</h2>
        <ul>
          <li>Existing deployed software baseline and operational telemetry heritage.</li>
          <li>Architecture modularity enables profile transfer with minimal rework.</li>
          <li>Phase I/II milestones map directly to procurement and pilot-readiness gates.</li>
        </ul>
      </Page>

      <Page id="v6" num={5} title="Volume 6 — Fraud, Waste, and Abuse Training">
        <h1>Volume 6 — Fraud, Waste, and Abuse (FWA) Training</h1>

        <h2>6.1 Training Attestation</h2>
        <p>
          ARK certifies completion of required FWA training for personnel participating in this proposal and,
          upon award, for personnel charging effort to the funded project.
        </p>

        <h2>6.2 Internal FWA Controls</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Control Area</th>
              <th style={{ width: '34%' }}>Procedure</th>
              <th style={{ width: '38%' }}>Evidence / Record</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Timekeeping Integrity</td><td>Daily labor charging by task code with supervisor review</td><td>Timestamped timesheets and approval logs</td></tr>
            <tr><td>Procurement Controls</td><td>Quote comparison and purchase authorization workflow</td><td>PO records and vendor quote archive</td></tr>
            <tr><td>Expense Allowability</td><td>Cost allowability checks against contract rules</td><td>Expense ledger with justification fields</td></tr>
            <tr><td>Issue Escalation</td><td>Confidential reporting and corrective-action process</td><td>Incident register and disposition documentation</td></tr>
          </tbody>
        </table>

        <h2 style={{ marginTop: '10pt' }}>6.3 Compliance Statement</h2>
        <p>
          FWA training completion records, policy acknowledgements, and periodic refresh actions are maintained
          in auditable project records and made available on request.
        </p>
      </Page>

      <Page id="v7" num={6} title="Volume 7 — Disclosures of Foreign Affiliations">
        <h1>Volume 7 — Disclosures of Foreign Affiliations</h1>

        <h2>7.1 Disclosure Scope</h2>
        <p>
          This volume captures all required disclosures regarding foreign ownership, influence, collaborations,
          appointments, funding relationships, and other affiliations relevant to project personnel and institutions.
        </p>

        <h2>7.2 Disclosure Matrix</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Entity / Person</th>
              <th style={{ width: '20%' }}>Disclosure Category</th>
              <th style={{ width: '20%' }}>Status</th>
              <th style={{ width: '30%' }}>Notes / Attachments</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ARK Intelligent Systems LLC</td><td>Foreign Ownership / Control</td><td>Declared</td><td>Declaration form attached per template</td></tr>
            <tr><td>PI and key personnel</td><td>Foreign appointments / support</td><td>Declared</td><td>Individual attestations attached</td></tr>
            <tr><td>Subcontract institution (SJSU)</td><td>Institutional affiliation review</td><td>Declared</td><td>University-provided disclosure packet</td></tr>
          </tbody>
        </table>

        <h2 style={{ marginTop: '10pt' }}>7.3 Certification</h2>
        <p>
          To the best of our knowledge, disclosures are complete and current as of submission date.
          Updates will be provided promptly if circumstances change.
        </p>
      </Page>
    </div>
  );
}
