import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Droplet, Sparkles } from 'lucide-react';
import { playWaterDropSound } from '../utils/audio';

interface WelcomeScreenProps {
  onEnter: () => void;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  lineWidth: number;
  color: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const [isDissolving, setIsDissolving] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<WaterRipple[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Canvas Water Ripple Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Subtle ambient water drops before click
    const createAmbientRipple = () => {
      if (isDissolving) return;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.min(canvas.width, canvas.height) * 0.35,
        alpha: 0.3,
        speed: 2.2,
        lineWidth: 1.5,
        color: '#95D0E8'
      });
    };

    const ambientInterval = setInterval(createAmbientRipple, 2600);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.alpha -= 0.006;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // Concentric wave 1 (Primary Cyan/Water)
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.lineWidth = r.lineWidth;
        ctx.shadowColor = '#95D0E8';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Concentric wave 2 (Golden secondary harmonic)
        if (r.radius > 28) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 24, 0, Math.PI * 2);
          ctx.strokeStyle = '#B79372';
          ctx.globalAlpha = Math.max(0, r.alpha * 0.7);
          ctx.lineWidth = r.lineWidth * 0.8;
          ctx.shadowColor = '#B79372';
          ctx.shadowBlur = 6;
          ctx.stroke();
        }

        // Concentric wave 3 (Inner third harmonic)
        if (r.radius > 55) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 48, 0, Math.PI * 2);
          ctx.strokeStyle = '#F0E5D5';
          ctx.globalAlpha = Math.max(0, r.alpha * 0.4);
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(ambientInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDissolving]);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDissolving) return;
    
    const clickX = e.clientX;
    const clickY = e.clientY;

    if (audioEnabled) {
      playWaterDropSound();
    }

    // Trigger expanding water ripples from exact click location
    const canvas = canvasRef.current;
    const maxR = canvas ? Math.max(canvas.width, canvas.height) * 1.3 : 1400;

    [0, 20, 45, 75, 110].forEach((delay, idx) => {
      setTimeout(() => {
        ripplesRef.current.push({
          x: clickX,
          y: clickY,
          radius: 6,
          maxRadius: maxR,
          alpha: 0.95 - idx * 0.12,
          speed: 8 + idx * 1.8,
          lineWidth: 3.5 - idx * 0.5,
          color: idx % 2 === 0 ? '#95D0E8' : '#B79372'
        });
      }, delay);
    });

    // Start dissolving effect
    setIsDissolving(true);

    // Transition smoothly after ripple and dissolve animation
    setTimeout(() => {
      onEnter();
    }, 950);
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center cursor-pointer select-none overflow-hidden transition-all duration-1000 ease-out ${
        isDissolving 
          ? 'opacity-0 scale-105 blur-sm pointer-events-none' 
          : 'opacity-100 scale-100 blur-0'
      }`}
      style={{
        backgroundColor: '#0D1B44',
        backgroundImage: `
          radial-gradient(ellipse at 50% 30%, rgba(149, 208, 232, 0.16) 0%, transparent 65%),
          radial-gradient(circle at 80% 80%, rgba(183, 147, 114, 0.12) 0%, transparent 50%),
          linear-gradient(180deg, #071233 0%, #0D1B44 50%, #04091a 100%)
        `
      }}
    >
      {/* Background Interactive Water Ripple Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Subtle misty water reflection overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#95D0E8_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none" />

      {/* TOP: Audio Sound Toggle */}
      <div className="relative z-20 w-full flex items-center justify-between p-6 md:px-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#95D0E8] animate-ping" />
          <span className="text-xs font-semibold tracking-wider text-[#F0E5D5]/80 uppercase font-['Outfit']">
            Sóng Siêu Âm Cavitation
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setAudioEnabled(!audioEnabled);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-[#F0E5D5] hover:bg-white/20 transition-colors shadow-sm"
        >
          {audioEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#95D0E8]" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
          <span className="hidden sm:inline font-medium">{audioEnabled ? 'Âm thanh: BẬT' : 'TẮT'}</span>
        </button>
      </div>

      {/* CENTER: LOGO & SLOGAN ONLY (Clean, Minimal & Luxury) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-3xl my-auto space-y-6">
        
        {/* Emblem Logo Badge */}
        <div className="relative group">
          <div className="p-1 rounded-3xl bg-gradient-to-tr from-[#773C1C] via-[#B79372] to-[#95D0E8] shadow-[0_0_60px_rgba(149,208,232,0.35)] transition-transform group-hover:scale-105 duration-500">
            <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-[22px] bg-[#071333]/90 backdrop-blur-xl flex flex-col items-center justify-center p-5 border border-[#F0E5D5]/20 overflow-hidden relative shadow-inner">
              
              {/* Official Lopha Emblem Logo (1110x1110) */}
              <img
                src="/LOPHA-LOGO-3.png"
                alt="Lopha Coffee Logo"
                className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.6)] animate-pulse"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Water sheen reflection */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#95D0E8]/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Brand Slogan */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-[#F0E5D5] font-serif drop-shadow-md">
            LOPHA COFFEE
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#95D0E8] tracking-[0.25em] uppercase font-bold font-['Outfit'] drop-shadow">
            SỰ TINH KHIẾT NGUYÊN BẢN
          </p>

          <p className="text-xs sm:text-sm text-[#B79372] italic font-serif max-w-lg mx-auto leading-relaxed pt-1">
            &ldquo;Tinh khiết không phải đích đến. Đó là cách chúng tôi bắt đầu mọi thứ.&rdquo;
          </p>
        </div>

      </div>

      {/* BOTTOM: Minimal Invitation Hint */}
      <div className="relative z-20 pb-10 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-[#95D0E8]/40 text-[#F0E5D5] text-xs font-semibold tracking-wide shadow-md hover:border-[#95D0E8] transition-all">
          <Droplet className="w-4 h-4 text-[#95D0E8] animate-bounce" />
          <span>Chạm vào mặt nước để khám phá</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B79372]" />
        </div>
      </div>

    </div>
  );
};
