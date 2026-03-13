import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize once, B&W print-optimized theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  themeVariables: {
    primaryColor: '#f5f5f5',
    primaryTextColor: '#000000',
    primaryBorderColor: '#333333',
    lineColor: '#333333',
    secondaryColor: '#ebebeb',
    tertiaryColor: '#ffffff',
    fontSize: '14px',
    edgeLabelBackground: '#ffffff',
    clusterBkg: '#f0f0f0',
    clusterBorder: '#555555',
    titleColor: '#000000',
    nodeTextColor: '#000000',
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: false,
    curve: 'linear',
  },
  securityLevel: 'loose',
});

export default function MermaidDiagram({ chart, caption, figNum }) {
  const svgRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!chart) return;
    let alive = true;
    // Fresh unique ID each invocation — avoids Strict Mode double-render conflicts
    const renderId = `md-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    mermaid.render(renderId, chart)
      .then(({ svg }) => {
        if (!alive) return;
        if (svgRef.current) {
          svgRef.current.innerHTML = svg;
          const svgEl = svgRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.removeAttribute('height');
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
          }
          setReady(true);
        }
      })
      .catch(err => {
        if (!alive) return;
        setError(String(err));
      });

    return () => {
      alive = false;
      // Scrub any leftover mermaid temp elements from this render attempt
      document.getElementById(renderId)?.remove();
      document.getElementById(`d${renderId}`)?.remove();
    };
  }, [chart]);

  return (
    <div className="no-break" style={{ pageBreakInside: 'avoid', margin: '10pt 0' }}>
      <div className="mermaid-container">
        {!ready && !error && (
          <div style={{ padding: '8pt', fontStyle: 'italic', fontSize: '9pt', color: '#666' }}>
            [Diagram loading...]
          </div>
        )}
        {error && (
          <pre style={{ fontSize: '8pt', padding: '6pt', border: '1px solid #ccc', whiteSpace: 'pre-wrap' }}>
            Diagram error: {error}
          </pre>
        )}
        <div ref={svgRef} style={{ display: ready ? 'block' : 'none' }} />
      </div>
      {caption && (
        <div className="figure-caption">
          {figNum && <span>Figure {figNum}. </span>}{caption}
        </div>
      )}
    </div>
  );
}
