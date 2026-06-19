/* Matrix rain + typing + scroll + 3D parallax + cursor glow */
(function () {
  const mouse = { x: 0.5, y: 0.5 };
  const smooth = { x: 0.5, y: 0.5 };

  function onMove(x, y) {
    mouse.x = x / window.innerWidth;
    mouse.y = y / window.innerHeight;
  }
  window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  window.addEventListener('touchmove', e => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  // Cursor glow trail
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);

  const grid = document.querySelector('.grid-floor');
  const hero = document.querySelector('.hero-inner');
  const matrix = document.getElementById('matrix-rain');
  const hud = document.querySelectorAll('.hud-corner');
  const scene3d = document.getElementById('canvas-3d');

  function parallaxLoop() {
    smooth.x += (mouse.x - smooth.x) * 0.1;
    smooth.y += (mouse.y - smooth.y) * 0.1;
    const mx = (smooth.x - 0.5) * 2;
    const my = (smooth.y - 0.5) * 2;

    glow.style.left = (smooth.x * 100) + '%';
    glow.style.top = (smooth.y * 100) + '%';

    if (grid) {
      grid.style.transform =
        `perspective(500px) rotateX(${55 + my * 18}deg) rotateZ(${mx * -8}deg) translateX(${mx * 80}px) translateY(${my * 30}px)`;
    }
    if (hero) {
      hero.style.transform = `translateY(${-my * 6}px) translateX(${mx * 8}px)`;
    }
    if (matrix) {
      matrix.style.transform = `translate(${mx * -30}px, ${my * -20}px)`;
    }
    if (scene3d) {
      scene3d.style.transform = `translate(${mx * 25}px, ${my * 18}px)`;
    }
    hud.forEach((el, i) => {
      const f = i < 2 ? 1 : -1;
      el.style.transform = `translate(${mx * 15 * f}px, ${my * 15 * f}px)`;
    });

    requestAnimationFrame(parallaxLoop);
  }
  parallaxLoop();

  const matrixCanvas = document.getElementById('matrix-rain');
  if (matrixCanvas) {
    const mctx = matrixCanvas.getContext('2d');
    let mw, mh, cols, drops;
    const chars = '01アイウエオカキクABCDEF<>{}[]/\\|_lu3ky13@#$%&';

    function mResize() {
      mw = matrixCanvas.width = window.innerWidth;
      mh = matrixCanvas.height = window.innerHeight;
      cols = Math.floor(mw / 14);
      drops = Array(cols).fill(1);
    }

    function mDraw() {
      mctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
      mctx.fillRect(0, 0, mw, mh);
      mctx.font = '14px JetBrains Mono, monospace';
      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        mctx.fillStyle = `rgba(0, 255, 136, ${Math.random() * 0.5 + 0.15})`;
        mctx.fillText(char, i * 14, drops[i] * 14);
        if (drops[i] * 14 > mh && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(mDraw);
    }
    mResize();
    window.addEventListener('resize', mResize);
    mDraw();
  }

  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = ['Bug Bounty Hunter', 'Penetration Tester', 'Red Team Operator', 'API Security Researcher'];
    let wi = 0, ci = 0, deleting = false;
    function type() {
      const word = words[wi];
      if (!deleting) {
        typingEl.textContent = word.substring(0, ci + 1);
        ci++;
        if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
      } else {
        typingEl.textContent = word.substring(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, deleting ? 35 : 75);
    }
    setTimeout(type, 1500);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section-header, .card, .blog-item').forEach(el => observer.observe(el));

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-12px) rotateX(${-y * 15}deg) rotateY(${x * 15}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();
