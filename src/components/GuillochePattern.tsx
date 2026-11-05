import React, { useEffect, useRef } from 'react';

interface GuillochePatternProps {
  size?: number; // Logical size of dial (e.g. 800)
}

export const GuillochePattern: React.FC<GuillochePatternProps> = ({ size = 800 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina display support
    const dpr = window.devicePixelRatio || 2;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Warm ivory base radial gradient
    const baseGrad = ctx.createRadialGradient(cx * 0.9, cy * 0.85, 20, cx, cy, size * 0.49);
    baseGrad.addColorStop(0, '#F9F1DC'); // Highlight
    baseGrad.addColorStop(0.35, '#EFE4C7'); // Mid tone
    baseGrad.addColorStop(0.75, '#E5D5AF'); // Base warm ivory
    baseGrad.addColorStop(1, '#D8C59B'); // Outer rim champagne
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.485, 0, Math.PI * 2);
    ctx.fill();

    // Rosette / Grain d'Orge Guilloche Engraving
    // True rose engine math: concentric rings with sinusoidal oscillation and phase offset
    const rings = 92;
    const minR = 36;
    const maxR = size * 0.475;
    const lobes = 64; // frequency of waves around the circle

    ctx.save();
    // Clip to dial circle
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.485, 0, Math.PI * 2);
    ctx.clip();

    // Draw the barleycorn guilloche rings
    for (let i = 0; i < rings; i++) {
      const t = i / rings;
      const rBase = minR + (maxR - minR) * t;
      // Amplitude scales gently with radius
      const amp = 1.2 + 2.8 * t;
      // Phase shifts progressively creating the spiral diamond interlocking texture
      const phase = i * 0.38;

      // 1. Engraved Shadow Stroke (creates depth)
      ctx.beginPath();
      ctx.strokeStyle = `rgba(165, 140, 95, ${0.35 + 0.25 * t})`;
      ctx.lineWidth = 0.9;
      const steps = 360;
      for (let s = 0; s <= steps; s++) {
        const theta = (s * Math.PI * 2) / steps;
        const wave = Math.sin(lobes * theta + phase);
        const r = rBase + amp * wave;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (s === 0) ctx.moveTo(x + 0.4, y + 0.6);
        else ctx.lineTo(x + 0.4, y + 0.6);
      }
      ctx.stroke();

      // 2. Specular Highlight Stroke (catches light)
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 252, 240, ${0.45 + 0.35 * (1 - t * 0.3)})`;
      ctx.lineWidth = 0.75;
      for (let s = 0; s <= steps; s++) {
        const theta = (s * Math.PI * 2) / steps;
        const wave = Math.sin(lobes * theta + phase);
        const r = rBase + amp * wave;
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (s === 0) ctx.moveTo(x - 0.2, y - 0.2);
        else ctx.lineTo(x - 0.2, y - 0.2);
      }
      ctx.stroke();
    }

    // Subtle counter-spiral rays for the woven moiré depth seen in reference photo
    const rays = 128;
    for (let j = 0; j < rays; j++) {
      const angle = (j * Math.PI * 2) / rays;
      ctx.beginPath();
      ctx.strokeStyle = j % 2 === 0 ? 'rgba(255, 250, 235, 0.12)' : 'rgba(150, 125, 80, 0.08)';
      ctx.lineWidth = 1;
      
      const rStart = minR;
      const rEnd = maxR;
      const spiralOffset = 0.45;

      const x1 = cx + rStart * Math.cos(angle);
      const y1 = cy + rStart * Math.sin(angle);
      const x2 = cx + rEnd * Math.cos(angle + spiralOffset);
      const y2 = cy + rEnd * Math.sin(angle + spiralOffset);

      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(
        cx + (rStart + 100) * Math.cos(angle + 0.15),
        cy + (rStart + 100) * Math.sin(angle + 0.15),
        cx + (rEnd - 100) * Math.cos(angle + 0.35),
        cy + (rEnd - 100) * Math.sin(angle + 0.35),
        x2,
        y2
      );
      ctx.stroke();
    }

    // Dial edge shadow for realistic case depth
    const edgeShade = ctx.createRadialGradient(cx, cy, size * 0.44, cx, cy, size * 0.485);
    edgeShade.addColorStop(0, 'rgba(0,0,0,0)');
    edgeShade.addColorStop(0.85, 'rgba(120, 100, 65, 0.15)');
    edgeShade.addColorStop(1, 'rgba(70, 55, 30, 0.45)');
    ctx.fillStyle = edgeShade;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.485, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
      className="absolute inset-0 pointer-events-none select-none rounded-full"
    />
  );
};

