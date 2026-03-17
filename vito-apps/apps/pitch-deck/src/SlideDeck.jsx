import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, Terminal } from 'lucide-react';

const ScreenshotDeck = () => {
  const slides = useMemo(
    () => [
      {
        id: 1,
        title: 'Agent Architecture',
        imageSrc: '/pitchimages/1AgentArchitecture.png',
        bullets: [
          'Three-Tiered Topology: Fully cloud-independent edge software architecture.',
          'Cognitive Tier: Localized LLMs (OTTO and VERA) for natural language operator commands.',
          'Operational Tier: Specialized AI agents (KINETIC, GHOST) translating logic into action.',
          'Hardware Interface: Physical execution and relay control at the base layer.',
        ],
      },
      {
        id: 2,
        title: 'System Architecture',
        imageSrc: '/pitchimages/2SystemArchitecture.png',
        bullets: [
          'Integration Schematic: Comprehensive mapping of physical and logical pathways.',
          'Power & Data Routing: Traces flow from physical solar arrays and LiFePO4 battery banks.',
          'Infrastructure Core: Routes through the Linux Docker host and autonomous recovery modules.',
          'Edge Capabilities: Branches into cognitive inference engines, atomic storage arrays, and mesh transport layers.',
        ],
      },
      {
        id: 3,
        title: 'Grid Controller',
        imageSrc: '/pitchimages/3GridController.png',
        bullets: [
          'Microgrid SCADA: Primary interface for autonomous power orchestration.',
          'High-Frequency Telemetry: 250ms-resolution tracking for grid frequency, voltage, and power flows.',
          'Asset Monitoring: Real-time observability across solar generation, local loads, and battery state-of-charge.',
          'State Machine Logic: Live tracking of autonomous transitions between grid-tied and islanded operations.',
        ],
      },
      {
        id: 4,
        title: 'VITO-Net',
        imageSrc: '/pitchimages/4VitoNet.png',
        bullets: [
          'Sovereign Network Layer: Dedicated dashboard for disconnected operational environments.',
          'Connection Monitoring: Tracks status of primary WAN and cellular backhaul.',
          'Zero-Trust Mesh: Verifies health and active peers within the Tailscale network.',
          'DDIL Fallback: Manages the 915 MHz LoRa radio bridge to maintain situational awareness when traditional backhaul is denied.',
        ],
      },
      {
        id: 5,
        title: 'Dashboard',
        imageSrc: '/pitchimages/5Dashboard.png',
        bullets: [
          'System Resilience: High-level operational view of physical compute constraints.',
          'Hardware Protection: Monitors CPU thermals and hardware watchdog timers alongside power metrics.',
          'Data Sovereignty: Visualizes the NVMe "Store & Forward" queue.',
          'Zero Data Loss: Details how telemetry is buffered and secured locally during prolonged network outages.',
        ],
      },
      {
        id: 6,
        title: 'Chat',
        imageSrc: '/pitchimages/6Chat.png',
        bullets: [
          'Cognitive Interface: Interaction console for VERA, the localized cognitive agent.',
          'Cloud-Independent Queries: Enables operators to command the system using natural language on the edge.',
          'Local Analysis: Allows the LLM to parse system logs and analyze historical data on-device.',
          'Actionable Intelligence: Generates immediate intelligence briefings without external API calls.',
        ],
      },
      {
        id: 7,
        title: 'Services',
        imageSrc: '/pitchimages/7Services.png',
        bullets: [
          'Infrastructure Observability: Comprehensive panel tracking the health of the underlying backbone.',
          'Containerized Compute: Monitors over 30 active Docker containers and microservices.',
          'Core Integrations: Tracks networking tools (Traefik, Tailscale) and AI vector databases (ChromaDB).',
          'State Verification: Confirms the operational readiness of the entirely containerized compute kernel.',
        ],
      },
      {
        id: 8,
        title: 'Profile Selector',
        imageSrc: '/pitchimages/8ProfileSelector.png',
        bullets: [
          "Deployment Configuration: Matrix dictating VITO's operational and environmental behavior.",
          'Hardware Agnostic: Grid of standardized Docker Compose profiles categorized by industry tier.',
          'Rapid Reconfiguration: Instantly shifts architecture from industrial substation automation to emergency disaster response with a single command.',
        ],
      },
      {
        id: 9,
        title: 'Profile Activation',
        imageSrc: '/pitchimages/9ProfileActivation.png',
        bullets: [
          'Live Orchestration: Real-time service terminal capturing raw logs during a profile switch.',
          'Dynamic Reallocation: System actively tears down obsolete containers and pulls local build definitions.',
          'Edge DevOps: Resolves Docker contexts to dynamically reallocate compute resources on the fly.',
        ],
      },
    ],
    []
  );

  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((s) => Math.min(s + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(s - 1, 0));
  }, []);

  const toggleNotes = useCallback(() => {
    setShowNotes((n) => !n);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'n') toggleNotes();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleNotes]);

  const current = slides[currentSlide];

  const TacticalFrame = ({ children, className = '' }) => (
    <div
      className={`relative w-full h-full border-2 border-gray-700 bg-gray-950 overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {children}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden select-none">
      <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900/50 backdrop-blur">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-emerald-500" />
          <span className="font-bold tracking-wider text-xs">VITO // DECK</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-[10px] font-mono">
            {currentSlide + 1}/{totalSlides}
          </span>
          <button
            onClick={toggleNotes}
            className={`p-1.5 rounded transition-colors ${showNotes ? 'bg-emerald-900 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
            title="Toggle notes (N)"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div
          className={`flex-1 relative flex flex-col transition-all duration-300 ${showNotes ? 'w-2/3' : 'w-full'}`}
        >
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
              <div className="flex flex-col h-full">
                <div className="mb-6 border-b-2 border-gray-700 pb-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                    {current.title}
                  </h2>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-5">
                    {current.bullets?.map((bullet, idx) => (
                      <div key={idx} className="flex items-start space-x-3 group">
                        <div className="mt-1.5 min-w-[8px] h-2 w-2 bg-emerald-600 group-hover:bg-emerald-400 transition-colors" />
                        <p className="text-lg md:text-xl text-gray-300 font-light leading-snug group-hover:text-white transition-colors">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="h-80 md:h-full w-full">
                    <TacticalFrame className="p-3 md:p-4">
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={current.imageSrc}
                          alt={current.title}
                          className="w-full h-full object-contain"
                          draggable={false}
                        />
                      </div>
                    </TacticalFrame>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-gray-700 hover:text-emerald-500 disabled:opacity-0 transition-all disabled:pointer-events-none"
            aria-label="Previous slide"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-gray-700 hover:text-emerald-500 disabled:opacity-0 transition-all disabled:pointer-events-none"
            aria-label="Next slide"
          >
            <ChevronRight size={40} />
          </button>
        </div>

        <div
          className={`${showNotes ? 'w-80 border-l border-gray-800' : 'w-0'} bg-gray-950 transition-all duration-300 overflow-hidden flex flex-col`}
        >
          <div className="p-6">
            <h3 className="text-emerald-600 font-mono text-xs mb-4 uppercase tracking-widest border-b border-gray-800 pb-2">
              Notes
            </h3>
            <div className="text-sm leading-relaxed text-gray-400 font-light">—</div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gray-900">
        <div
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / totalSlides) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ScreenshotDeck;
