/* ============================================================
   Seven Generations in Orbit — the sky
   A canvas rendering of Earth, a starfield, and six debris
   objects in slow orbit. As the time slider moves toward seven
   generations, faint fragments gather around crowded objects —
   the future made visible, not asserted.
   Respects prefers-reduced-motion.
   ============================================================ */

const Sky = (() => {
  let canvas, ctx, stars = [], w = 0, h = 0, dpr = 1;
  let generation = 0;
  let selectedId = null;
  let rankOrder = [];          // object ids in current rank order
  let lastPos = {};            // id -> {x, y, hit} from the latest drawn frame
  let lastT = 0;
  let running = true;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function init(canvasEl) {
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
    seedStars();
    if (reduced) { draw(0); } else { requestAnimationFrame(loop); }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
    if (reduced) draw(0);
  }

  function seedStars() {
    stars = [];
    const n = Math.floor((w * h) / 6500);
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        tw: Math.random() * Math.PI * 2,
        ts: 0.0004 + Math.random() * 0.0008
      });
    }
  }

  // Earth centre sits below the viewport: we see a wide limb arc.
  function earthCenter() {
    return { x: w * 0.5, y: h * 1.55, r: Math.max(w, h) * 0.72 };
  }

  function objectPosition(obj, t) {
    const e = earthCenter();
    const orbR = e.r * (0.55 + obj.sky.radius);
    const a = obj.sky.phase + t * obj.sky.speed;
    return {
      x: e.x + Math.cos(a) * orbR,
      y: e.y + Math.sin(a) * orbR * 0.92
    };
  }

  function draw(t) {
    lastT = t;
    lastPos = {};
    // Night: deep olive-charcoal, warm at the horizon
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#16140f");
    g.addColorStop(0.6, "#1c1a14");
    g.addColorStop(1, "#2A2520");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Stars
    for (const s of stars) {
      const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(s.tw + t * s.ts));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244,236,216,${a})`;
      ctx.fill();
    }

    const e = earthCenter();

    // Atmospheric halo
    const halo = ctx.createRadialGradient(e.x, e.y, e.r * 0.98, e.x, e.y, e.r * 1.1);
    halo.addColorStop(0, "rgba(170,187,135,0.28)");
    halo.addColorStop(0.5, "rgba(202,162,102,0.10)");
    halo.addColorStop(1, "rgba(202,162,102,0)");
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r * 1.1, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    // Earth body
    const body = ctx.createRadialGradient(e.x - e.r * 0.3, e.y - e.r * 0.35, e.r * 0.1, e.x, e.y, e.r);
    body.addColorStop(0, "#384732");
    body.addColorStop(0.55, "#2F3D29");
    body.addColorStop(1, "#191d14");
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();

    // Faint orbital paths
    for (const obj of DEBRIS_OBJECTS) {
      const orbR = e.r * (0.55 + obj.sky.radius);
      ctx.beginPath();
      ctx.ellipse(e.x, e.y, orbR, orbR * 0.92, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,236,216,0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Fragments: the future gathering. Density grows with the slider.
    const fragPerObject = Math.round(generation * 6); // 0 .. 42
    if (fragPerObject > 0) {
      for (const obj of DEBRIS_OBJECTS) {
        const cf = CLUSTER_FACTOR[obj.clusterDensity] || 1;
        const count = Math.round(fragPerObject * cf);
        const base = objectPosition(obj, t);
        for (let i = 0; i < count; i++) {
          const seed = (i * 137.5 + obj.sky.phase * 100) % 360;
          const ang = (seed * Math.PI) / 180 + t * obj.sky.speed * (1 + (i % 5) * 0.06);
          const spread = 6 + (i % 7) * 5 * cf;
          const fx = base.x + Math.cos(ang) * spread;
          const fy = base.y + Math.sin(ang) * spread * 0.7;
          ctx.beginPath();
          ctx.arc(fx, fy, 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(217,164,65,${0.05 + 0.05 * cf})`;
          ctx.fill();
        }
      }
    }

    // Debris objects — drawn in reverse rank so the top priority
    // is drawn last, on top.
    const ordered = [...DEBRIS_OBJECTS].sort((a, b) => {
      return rankOrder.indexOf(a.id) - rankOrder.indexOf(b.id);
    });
    for (const obj of ordered) {
      const p = objectPosition(obj, t);
      const rankIdx = rankOrder.indexOf(obj.id);
      const isTop = rankIdx === 0 && rankOrder.length > 0;
      const isSel = obj.id === selectedId;
      const size = 2.2 + (obj.massKg / 9000) * 3.2;

      if (isSel) {
        const pulse = 1 + 0.25 * Math.sin(t * 0.004);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 4.2 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(217,164,65,0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.6, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(217,164,65,0.5)";
        ctx.stroke();
      }

      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
      glow.addColorStop(0, obj.sky.hue);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.globalAlpha = isTop ? 0.9 : 0.45;
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = isTop ? "#E9C46A" : obj.sky.hue;
      ctx.fill();

      // remember where it is, so the sky can be touched
      lastPos[obj.id] = { x: p.x, y: p.y, hit: Math.max(30, size * 7) };
    }
  }

  // Return the id of the debris object nearest to a viewport point,
  // or null when the point is open sky. Generous touch targets.
  function pickAt(x, y) {
    let best = null, bestD = Infinity;
    for (const obj of DEBRIS_OBJECTS) {
      const p = lastPos[obj.id];
      if (!p) continue;
      const d = Math.hypot(x - p.x, y - p.y);
      if (d < p.hit && d < bestD) { best = obj.id; bestD = d; }
    }
    return best;
  }

  function loop(t) {
    if (running) draw(t);
    requestAnimationFrame(loop);
  }

  return {
    init,
    pickAt,
    setGeneration(g) { generation = g; if (reduced) draw(0); },
    setSelected(id) { selectedId = id; if (reduced) draw(0); },
    setRankOrder(ids) { rankOrder = ids; if (reduced) draw(0); },
    pause() { running = false; },
    resume() { if (!reduced) { running = true; } }
  };
})();
