import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Terminal, 
  Server, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Radio, 
  Zap,
  GlobeLock,
  Target,
  Image as ImageIcon
} from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "VITO: Vital Isolated Tactical Operator",
    subtitle: "Kubernetes for the Tactical Edge and Critical Infrastructure.",
    icon: <Terminal className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: Hero shot of SUSI bus setup or Lenovo P53 running the dash",
    content: (
      <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
        <p>An autonomous edge operating system designed to maintain deterministic command-and-control in Denied, Degraded, Intermittent, and Limited (DDIL) environments.</p>
        <p className="font-mono text-cyan-500 text-sm mt-8 border-l-2 border-cyan-500 pl-4">
          STATUS: FIELD-VALIDATED (TRL 6) <br/>
          ARCHITECTURE: SOVEREIGN EDGE NODE
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Cloud-Dependency in Austere Environments",
    subtitle: "The Problem with Standard Architecture",
    icon: <ShieldAlert className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: Diagram showing a broken cloud connection or standard DERMS architecture failing",
    content: (
      <ul className="space-y-6 text-slate-300">
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white">Brittle Infrastructure:</strong> Standard DERMS and VPPs fail catastrophically during internet backhaul outages.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white">Dangerous Latency:</strong> High-latency cloud command execution (seconds vs. milliseconds) destabilizes local grid frequency during critical events.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white">Vendor Lock-In:</strong> Hardware-locked controllers prevent rapid redeployment and scaling in the field.</p>
        </li>
      </ul>
    )
  },
  {
    id: 3,
    title: "The Sovereign Server Stack",
    subtitle: "The VITO Architecture",
    icon: <Server className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: Terminal running `docker ps` showing the 33+ VITO containers",
    content: (
      <ul className="space-y-6 text-slate-300">
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Infrastructure:</strong> 33+ Docker containers managed by a decoupled Node.js/React core operating on commodity hardware.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Cognition:</strong> 6 Autonomous AI agents (VIGIL, STOW, GHOST) handling system resilience, health monitoring, and security.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Persistence:</strong> Offline-first telemetry queuing (In-memory to Disk) guaranteeing 100% data retention during outages.</p>
        </li>
      </ul>
    )
  },
  {
    id: 4,
    title: "One Node, Infinite Profiles",
    subtitle: "Modular Deployments",
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: VS Code or terminal showing side-by-side docker-compose.yml and profiles/defense.yml",
    content: (
      <div className="space-y-6 text-slate-300">
        <p>VITO utilizes Docker Compose Profile Overrides to shift system identity in seconds based on deployment context.</p>
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-md font-mono text-sm">
          <span className="text-green-400">$</span> docker compose -f docker-compose.yml -f profiles/defense.yml up -d
        </div>
        <p className="mt-4">Instantly transition from defense air-gapped environments to industrial sensor hubs without changing the underlying OS architecture.</p>
      </div>
    )
  },
  {
    id: 5,
    title: "Tactical Edge Controller",
    subtitle: "Profile A: Defense FOB",
    icon: <GlobeLock className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: Tailscale admin console or GHOST agent logs showing secure nodes connected",
    content: (
      <div className="space-y-6 text-slate-300">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 border border-cyan-500/30 bg-cyan-500/5 rounded-lg">
            <h4 className="text-white font-mono mb-2">Zero-Trust Mesh Networking</h4>
            <p className="text-sm">GHOST agent enforces WireGuard mesh routing (ChaCha20-Poly1305) with zero public ingress.</p>
          </div>
          <div className="p-4 border border-cyan-500/30 bg-cyan-500/5 rounded-lg">
            <h4 className="text-white font-mono mb-2">ATAK Integration</h4>
            <p className="text-sm">Seamless Android Tactical Assault Kit server integration for localized situational awareness.</p>
          </div>
          <div className="p-4 border border-cyan-500/30 bg-cyan-500/5 rounded-lg">
            <h4 className="text-white font-mono mb-2">Air-Gapped Operation</h4>
            <p className="text-sm">Full operational capability disconnected from the wider internet or ground stations.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Deterministic Power Orchestration",
    subtitle: "Profile B: Microgrid & VPP",
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: C++ agent terminal logs showing the 250ms FSM evaluation loop executing",
    content: (
      <ul className="space-y-6 text-slate-300">
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Decoupled C++20 Daemon:</strong> Operates completely independent of the Node.js layers for safety-critical hardware control.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">8-State FSM:</strong> Finite State Machine evaluates grid stability every 250 milliseconds.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Low-Latency Dispatch:</strong> Executes sub-500ms gRPC physical device commands (e.g., <code className="text-cyan-400">SetGridConnection</code> for instant islanding).</p>
        </li>
      </ul>
    )
  },
  {
    id: 7,
    title: "Scale and Sensing",
    subtitle: "Profile C: Industrial Edge",
    icon: <Radio className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: React/Socket.io SCADA HMI dashboard showing live telemetry",
    content: (
      <ul className="space-y-6 text-slate-300">
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Ingestion:</strong> High-frequency MQTT telemetry ingestion for thousands of distributed sensors.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Observability:</strong> Localized React/Socket.io SCADA HMI provides immediate site visibility when cloud tools go offline.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Predictive Analytics:</strong> Edge AI models pre-process machine health data for predictive maintenance without bandwidth saturation.</p>
        </li>
      </ul>
    )
  },
  {
    id: 8,
    title: "Sub-Second Execution Metrics",
    subtitle: "Validated Resilience",
    icon: <Activity className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: Grafana dashboard or VPP solar simulation UI showing the Duck Curve",
    content: (
      <div className="space-y-6 text-slate-300">
        <p>Proving deterministic reliability through the VPP Solar Day Simulation:</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
            <span className="block text-cyan-400 font-mono text-xl">24 Hr</span>
            <span className="text-xs text-slate-400">Solar day compressed into high-speed simulation</span>
          </div>
          <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
            <span className="block text-cyan-400 font-mono text-xl">&lt;500ms</span>
            <span className="text-xs text-slate-400">Automated physical islanding triggered by frequency drops</span>
          </div>
          <div className="col-span-2 p-3 bg-slate-800/50 rounded border border-slate-700">
            <span className="block text-cyan-400 font-mono text-xl">Grafana + InfluxDB</span>
            <span className="text-xs text-slate-400">Auto-provisioned executive dashboards for live oversight</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "DoD & Climate-Tech Integration",
    subtitle: "Market Alignment",
    icon: <Target className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: Logos of target integrators (Anduril, DIU, Scale Microgrids) or STTR header",
    content: (
      <ul className="space-y-6 text-slate-300">
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Defense Innovation:</strong> Directly aligned with Space Force STTR Grant (SF25D-T1201) and DIU mandates for intelligent power management.</p>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <p><strong className="text-white font-mono">Commercial VPPs:</strong> Architecture translates seamlessly to Tier 1 Utility aggregators requiring high-speed DERMS and non-wires alternatives.</p>
        </li>
      </ul>
    )
  },
  {
    id: 10,
    title: "Moving the Brain to the Edge",
    subtitle: "Conclusion",
    icon: <Terminal className="w-8 h-8 text-cyan-400" />,
    placeholderText: "SCREENSHOT: The final VITO logo, or Tyler Eno on-site at a deployment",
    content: (
      <div className="space-y-8 text-center mt-8">
        <blockquote className="text-2xl font-light text-white italic border-l-4 border-cyan-500 pl-6 text-left">
          "VITO provides the deterministic reliability that cloud-based systems simply cannot promise."
        </blockquote>
        
        <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg inline-block text-left mt-8">
          <h4 className="text-cyan-400 font-mono font-bold mb-4 border-b border-slate-700 pb-2">CONTACT / ARCHITECT</h4>
          <p className="text-slate-300"><strong>Tyler Eno</strong></p>
          <p className="text-slate-400 text-sm font-mono mt-2">t.eno992@gmail.com</p>
          <p className="text-slate-400 text-sm font-mono">tylereno.me</p>
        </div>
      </div>
    )
  }
];

export default function VitoPitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col justify-center items-center p-4 selection:bg-cyan-500/30">
      
      <div className="w-full max-w-6xl aspect-[16/9] bg-[#0b1120] border border-slate-800 shadow-2xl rounded-xl overflow-hidden flex flex-col relative">
        
        <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="font-mono text-xs text-slate-500 ml-4 tracking-widest">VITO_PITCH_DECK_V4.7.0</span>
          </div>
          <span className="font-mono text-cyan-500/50 text-xs">SLIDE {currentSlide + 1} // {slides.length}</span>
        </div>

        <div className="flex-1 flex p-10 gap-10">
          
          <div className="flex-1 flex flex-col justify-center" key={`text-${slide.id}`}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                {slide.icon}
                <span className="font-mono text-cyan-500 text-sm tracking-widest uppercase">{slide.subtitle}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-md">
                {slide.title}
              </h1>
            </div>
            <div className="flex-1">
              {slide.content}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center" key={`img-${slide.id}`}>
            <div className="w-full aspect-video border-2 border-dashed border-cyan-500/30 bg-cyan-500/5 rounded-xl flex flex-col items-center justify-center p-8 text-center group transition-colors hover:bg-cyan-500/10 hover:border-cyan-500/50">
              <ImageIcon className="w-12 h-12 text-cyan-500/50 mb-4 group-hover:scale-110 transition-transform" />
              <p className="font-mono text-cyan-400 text-sm max-w-sm">
                {slide.placeholderText}
              </p>
              <p className="text-xs text-slate-500 mt-4 font-sans">
                (Replace this div with an &lt;img src="..." /&gt; tag)
              </p>
            </div>
          </div>
        </div>

        <div className="h-16 border-t border-slate-800 flex items-center justify-between px-6 shrink-0 bg-[#0b1120]">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 rounded font-mono text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> PREV
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded font-mono text-sm text-slate-400 hover:text-cyan-400 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            NEXT <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 text-slate-600 font-mono text-xs flex gap-6">
        <span>USE ARROW KEYS TO NAVIGATE</span>
        <span>|</span>
        <span>CONFIDENTIAL DRAFT</span>
      </div>
    </div>
  );
}
