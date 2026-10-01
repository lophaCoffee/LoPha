import React, { useState, useEffect, useRef } from 'react';
import { Waves, Sparkles, Play, Pause, RotateCcw, ShieldCheck } from 'lucide-react';
import { playUltrasonicSound } from '../utils/audio';

export const CavitationSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [frequency, setFrequency] = useState(38); // in kHz (20 to 50 kHz)
  const [cleanedPercent, setCleanedPercent] = useState(85);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Cavitation bubbles simulation
    const bubbles: { x: number; y: number; r: number; vy: number; vx: number; alpha: number; life: number }[] = [];
    for (let i = 0; i < 45; i++) {
      bubbles.push({
        x: Math.random() * 400,
        y: Math.random() * 260,
        r: Math.random() * 4 + 1.5,
        vy: -(Math.random() * 1.5 + 0.8),
        vx: (Math.random() - 0.5) * 1.2,
        alpha: Math.random() * 0.8 + 0.2,
        life: Math.random() * 60 + 20
      });
    }

    const render = () => {
      t += 0.05 * (frequency / 25);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Water background in ultrasonic tank
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1d47');
      gradient.addColorStop(0.5, '#071638');
      gradient.addColorStop(1, '#030c22');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Ultrasonic acoustic wave lines (sinusoidal frequency simulation)
      if (isRunning) {
        ctx.strokeStyle = '#95D0E8';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.35;
        const waveCount = 5;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const yBase = 35 + w * 48;
          for (let x = 0; x < canvas.width; x += 4) {
            const waveY = yBase + Math.sin((x * 0.04) + t * 2 + w) * (6 + (frequency - 20) * 0.25);
            if (x === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // 3. Central Coffee Bean being purified
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Ultrasonic aura around bean
      if (isRunning) {
        const auraGrad = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 75);
        auraGrad.addColorStop(0, 'rgba(149, 208, 232, 0.4)');
        auraGrad.addColorStop(0.6, 'rgba(183, 147, 114, 0.2)');
        auraGrad.addColorStop(1, 'rgba(13, 27, 68, 0)');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
        ctx.fill();
      }

      // Coffee Bean shape
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(0.2);

      // Bean outer body
      ctx.fillStyle = '#773C1C';
      ctx.beginPath();
      ctx.ellipse(0, 0, 42, 60, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bean golden rim highlight
      ctx.strokeStyle = '#B79372';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Bean natural center crease (crevice)
      ctx.strokeStyle = isRunning ? '#95D0E8' : '#210E00';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.bezierCurveTo(-12, -15, 12, 15, 0, 45);
      ctx.stroke();

      // Glowing micro-jets inside crevice
      if (isRunning) {
        ctx.fillStyle = '#F0E5D5';
        for (let j = -3; j <= 3; j++) {
          ctx.beginPath();
          ctx.arc(Math.sin(j + t) * 4, j * 10, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // 4. Cavitation Micro-bubbles imploding and flushing impurities
      if (isRunning) {
        bubbles.forEach((b) => {
          b.y += b.vy * (frequency / 30);
          b.x += b.vx;
          b.life -= 1;

          if (b.life <= 0 || b.y < 10) {
            // Re-spawn near bottom or around bean
            b.x = Math.random() * canvas.width;
            b.y = canvas.height - 15;
            b.r = Math.random() * 3.5 + 1.2;
            b.life = Math.random() * 60 + 20;
          }

          // Draw bubble
          ctx.fillStyle = '#95D0E8';
          ctx.globalAlpha = Math.min(b.alpha, b.life / 20);
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();

          // Bubble burst spark if close to bean
          const distToBean = Math.hypot(b.x - centerX, b.y - centerY);
          if (distToBean < 55 && Math.random() < 0.2) {
            ctx.fillStyle = '#F0E5D5';
            ctx.beginPath();
            ctx.arc(b.x + (Math.random() - 0.5) * 6, b.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning, frequency]);

  const toggleRun = () => {
    const next = !isRunning;
    setIsRunning(next);
    if (next) {
      playUltrasonicSound(frequency * 10, 0.4);
    }
  };

  const handleFrequencyChange = (newFreq: number) => {
    setFrequency(newFreq);
    // cleaning efficiency correlates with frequency
    const percent = Math.min(99.8, 80 + (newFreq - 20) * 0.6);
    setCleanedPercent(Math.round(percent * 10) / 10);
  };

  return (
    <div className="rounded-xl border border-[#B79372]/30 bg-[#071333] p-4 text-[#F0E5D5] shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-[#95D0E8] animate-pulse" />
          <h4 className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#95D0E8] font-serif">
            Mô Phỏng Vật Lý Hiện Tượng Cavitation Siêu Âm (20 - 50 kHz)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[11px] rounded bg-[#773C1C]/40 border border-[#B79372]/40 text-[#F0E5D5]">
            Độ sạch vi mô: <strong className="text-[#95D0E8]">{cleanedPercent}%</strong>
          </span>
          <button
            onClick={toggleRun}
            className={`px-2.5 py-1 rounded text-xs flex items-center gap-1 font-semibold transition-all ${
              isRunning 
                ? 'bg-[#B79372] text-[#0D1B44] hover:bg-[#F0E5D5]' 
                : 'bg-[#95D0E8] text-[#0D1B44] hover:bg-white'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Tạm dừng' : 'Kích hoạt'}
          </button>
        </div>
      </div>

      {/* Simulation Canvas */}
      <div className="relative rounded-lg overflow-hidden border border-[#95D0E8]/30 shadow-inner flex justify-center bg-[#030c22]">
        <canvas
          ref={canvasRef}
          width={480}
          height={260}
          className="w-full max-w-[480px] h-[220px] md:h-[260px] object-cover"
        />

        {/* Realtime stats overlay */}
        <div className="absolute top-2 left-2 bg-[#0D1B44]/80 backdrop-blur-sm px-2.5 py-1.5 rounded border border-[#95D0E8]/40 text-[11px] space-y-0.5">
          <p className="text-[#95D0E8] font-mono">Tần số: <strong>{frequency} kHz</strong></p>
          <p className="text-[#B79372] font-mono">Bọt khí vi mô: <strong>~1,000,000/s</strong></p>
          <p className="text-[#F0E5D5] font-mono">Độc tố Aflatoxin: <strong className="text-green-400">Triệt tiêu</strong></p>
        </div>

        <div className="absolute bottom-2 right-2 bg-[#0D1B44]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#B79372]/40 text-[10px] text-[#B79372]">
          Bể siêu âm nước tinh khiết (Pure Water Bath)
        </div>
      </div>

      {/* Frequency Slider & Control */}
      <div className="mt-3.5 pt-3 border-t border-[#B79372]/20 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:w-2/3 flex items-center gap-3">
          <span className="text-xs text-[#B79372] whitespace-nowrap">Tần số sóng:</span>
          <input
            type="range"
            min={20}
            max={50}
            step={1}
            value={frequency}
            onChange={(e) => handleFrequencyChange(Number(e.target.value))}
            className="w-full accent-[#95D0E8] cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-[#95D0E8] w-14 text-right">
            {frequency} kHz
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#F0E5D5]/80">
          <ShieldCheck className="w-4 h-4 text-[#95D0E8]" />
          <span>Vật lý thuần túy 100% không dùng hóa chất</span>
        </div>
      </div>
    </div>
  );
};
