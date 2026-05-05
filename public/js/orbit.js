// Orbit animation — depends on NODES and LANG injected by home.ejs
const RATIO = { 1: 0.22, 2: 0.34, 3: 0.46 };
const SPEEDS = { 1: 0.004, 2: -0.0025, 3: 0.0018 };

document.addEventListener('DOMContentLoaded', () => {
  const eco = document.getElementById('eco');
  const tt  = document.getElementById('tt');
  if (!eco) return;

  function getSize() {
    const s = eco.offsetWidth;
    return { cx: s / 2, cy: s / 2, radii: { 1: s * RATIO[1], 2: s * RATIO[2], 3: s * RATIO[3] } };
  }

  const o1 = NODES.filter(n => n.r === 1);
  const o2 = NODES.filter(n => n.r === 2);
  const o3 = NODES.filter(n => n.r === 3);

  const bases = {
    1: o1.map((_, i) => i * (2 * Math.PI / o1.length)),
    2: o2.map((_, i) => i * (2 * Math.PI / o2.length) + Math.PI / o2.length),
    3: o3.map((_, i) => i * (2 * Math.PI / o3.length)),
  };
  const angles = { 1: 0, 2: 0, 3: 0 };

  NODES.forEach(n => {
    const el = document.createElement('div');
    el.className = 'snode';
    const lbl = LANG === 'en' ? (n.ne || n.n) : n.n;
    el.innerHTML = `<span class="snode-icon">${n.i}</span><span class="snode-lbl">${lbl.split(' ')[0]}</span>`;
    n._el = el;

    el.addEventListener('mouseenter', () => {
      el.style.borderColor = 'rgba(0,232,122,.6)';
      el.style.boxShadow = '0 0 20px rgba(0,232,122,.3)';
      el.style.zIndex = '20';
      document.getElementById('tt-n').textContent = LANG === 'en' ? (n.ne || n.n) : n.n;
      document.getElementById('tt-d').textContent = LANG === 'en' ? (n.de || n.d) : n.d;
      document.getElementById('tt-t').textContent = n.t;
      const eW = eco.offsetWidth;
      let tx = parseFloat(el.style.left) + 50;
      let ty = parseFloat(el.style.top) - 10;
      if (tx > eW * 0.55) tx = parseFloat(el.style.left) - 185;
      if (ty < 10) ty = parseFloat(el.style.top) + 50;
      if (ty > eW * 0.75) ty = parseFloat(el.style.top) - 90;
      tt.style.left = tx + 'px';
      tt.style.top  = ty + 'px';
      tt.classList.add('on');
    });
    el.addEventListener('mouseleave', () => {
      el.style.borderColor = '';
      el.style.boxShadow = '';
      el.style.zIndex = '';
      tt.classList.remove('on');
    });
    eco.appendChild(el);
  });

  function animate() {
    angles[1] += SPEEDS[1];
    angles[2] += SPEEDS[2];
    angles[3] += SPEEDS[3];
    const { cx, cy, radii } = getSize();
    const half = eco.offsetWidth * 0.058;
    const cnt = { 1: 0, 2: 0, 3: 0 };
    NODES.forEach(n => {
      const i = cnt[n.r]++;
      const a = bases[n.r][i] + angles[n.r];
      n._el.style.left = (cx + radii[n.r] * Math.cos(a) - half) + 'px';
      n._el.style.top  = (cy + radii[n.r] * Math.sin(a) - half) + 'px';
    });
    requestAnimationFrame(animate);
  }
  animate();
});
