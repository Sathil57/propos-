/* ============================================================
   PROPOSAL — SCRIPT
   ============================================================
   ✏️  CUSTOMISE THE 3 LINES BELOW, THEN SAVE AND REFRESH
   ============================================================ */

const YOUR_CRUSH_NAME = "6ixhomies";   // her name
const YOUR_WHATSAPP_NO = "0705128700";  // your number (country code + digits, no + or spaces)
const LOVE_LETTER_TEXT =
  `Every time I see you, my heart skips a beat.
The way you smile can light up the darkest room.
The way you laugh makes me want to freeze time.

I have tried to find the right words a thousand times,
but nothing I write feels worthy of what you mean to me.

So here I am — heart wide open — hoping you know
that you are the person I want to share every little
moment with. The coffee mornings, the stormy evenings,
the adventures, and the quiet in-between.

You are extraordinary. And I am the luckiest person
in the world just for getting to know you.`;

/* ============================================================ */

const PROPOSAL_Q = YOUR_CRUSH_NAME
  ? `Will you be mine, ${YOUR_CRUSH_NAME}? 💍`
  : `Will you be mine? 💍`;

const YES_MSG = YOUR_CRUSH_NAME
  ? `${YOUR_CRUSH_NAME} said YES! 🎉💍`
  : `She said YES! 🎉💍`;

/* ── tiny helper ── */
const el = (id) => document.getElementById(id);

/* ── screen switcher ── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  el(id).classList.add('active');
}

/* ══════════════════════════════════════════════════════════════
   STARFIELD — pointer-events ALWAYS off
   ══════════════════════════════════════════════════════════════ */
function buildStars() {
  document.querySelectorAll('.bg-layer').forEach(layer => {
    for (let i = 0; i < 100; i++) {
      const s = document.createElement('div');
      const size = (Math.random() * 2.4 + 0.4).toFixed(1);
      const dur = (Math.random() * 4 + 2).toFixed(1);
      const del = (Math.random() * 6).toFixed(1);

      /* All styles inline — pointer-events:none is non-negotiable */
      s.style.cssText = [
        'position:absolute',
        `width:${size}px`,
        `height:${size}px`,
        `top:${(Math.random() * 100).toFixed(1)}%`,
        `left:${(Math.random() * 100).toFixed(1)}%`,
        'border-radius:50%',
        'background:#fff',
        'pointer-events:none',
        `--dur:${dur}s`,
        `animation-delay:${del}s`,
        'animation:twinkle var(--dur,3s) ease-in-out infinite alternate',
      ].join(';');

      layer.appendChild(s);
    }
  });
}

/* floating hearts */
const HEARTS = ['💕', '💗', '💓', '🌸', '✨', '💞', '💖', '🌷'];
function buildHearts() {
  const layer = el('heart-bg');
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    const sz = (Math.random() * 1.8 + 0.7).toFixed(1);
    const dur = (Math.random() * 9 + 6).toFixed(1);
    const del = (Math.random() * 12).toFixed(1);

    h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    h.style.cssText = [
      'position:absolute',
      'pointer-events:none',
      `left:${(Math.random() * 94).toFixed(1)}%`,
      'bottom:-60px',
      `font-size:${sz}rem`,
      `animation:floatUp ${dur}s linear ${del}s infinite`,
      'opacity:0',
    ].join(';');

    layer.appendChild(h);
  }
}

/* ══════════════════════════════════════════════════════════════
   SCREEN 1 — ENVELOPE
   ══════════════════════════════════════════════════════════════ */
function initEnvelope() {
  const wrap = el('env-wrap');
  const env = el('env');

  wrap.addEventListener('click', function onEnvClick() {
    wrap.removeEventListener('click', onEnvClick); // fire once only
    env.classList.add('opening');

    setTimeout(() => {
      showScreen('s-letter');
      setTimeout(startLetter, 500);
    }, 750);
  });
}

/* ══════════════════════════════════════════════════════════════
   SCREEN 2 — LOVE LETTER (typewriter)
   ══════════════════════════════════════════════════════════════ */
function typewrite(target, text, speed, onDone) {
  let i = 0;
  target.textContent = '';
  const tick = setInterval(() => {
    target.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(tick);
      if (onDone) onDone();
    }
  }, speed);
}

function startLetter() {
  const body = el('letter-body');
  const btn = el('btn-next');
  btn.style.display = 'none';

  typewrite(body, LOVE_LETTER_TEXT, 16, () => {
    btn.style.display = 'block';
  });

  btn.onclick = () => {
    showScreen('s-proposal');
    setTimeout(startProposal, 500);
  };
}

/* ══════════════════════════════════════════════════════════════
   SCREEN 3 — PROPOSAL
   ══════════════════════════════════════════════════════════════ */
function startProposal() {
  const q = el('prop-q');
  typewrite(q, PROPOSAL_Q, 50, null);

  /* YES button */
  el('btn-yes').onclick = () => {
    showScreen('s-celebrate');
    setTimeout(startCelebration, 400);
  };

  /* NO button — runs away */
  const btnNo = el('btn-no');
  let escapes = 0;
  let surrendered = false;

  btnNo.onclick = () => {
    if (surrendered) {
      showScreen('s-celebrate');
      setTimeout(startCelebration, 400);
    }
  };

  btnNo.addEventListener('mouseenter', () => {
    if (surrendered) return;

    if (escapes >= 8) {
      surrendered = true;
      btnNo.textContent = 'Okay fine… YES! 💕';
      return;
    }
    escapes++;

    const bw = btnNo.offsetWidth || 140;
    const bh = btnNo.offsetHeight || 48;
    const maxX = Math.max(0, window.innerWidth - bw - 20);
    const maxY = Math.max(0, window.innerHeight - bh - 20);

    btnNo.style.position = 'fixed';
    btnNo.style.left = (Math.random() * maxX) + 'px';
    btnNo.style.top = (Math.random() * maxY) + 'px';
    btnNo.style.transition = 'left .25s ease, top .25s ease';

    if (escapes === 4) btnNo.textContent = "I can't escape 😅";
    if (escapes === 7) btnNo.textContent = 'Fine, you win 🥺';
  });
}

/* ══════════════════════════════════════════════════════════════
   SCREEN 4 — CELEBRATION
   ══════════════════════════════════════════════════════════════ */
function startCelebration() {
  el('cel-title').textContent = YES_MSG;
  el('cel-hearts').textContent = '💖 💍 💖 ✨ 💖';

  /* WhatsApp button */
  const waBtn = el('wa-btn');
  if (YOUR_WHATSAPP_NO && YOUR_WHATSAPP_NO.trim()) {
    const msg = encodeURIComponent('YES!! 💍🥹 I say YES with all my heart! 💖');
    waBtn.href = `https://wa.me/${YOUR_WHATSAPP_NO.trim()}?text=${msg}`;
    waBtn.style.display = 'inline-block';
  }

  launchConfetti();
}

/* ── confetti canvas ── */
function launchConfetti() {
  const canvas = el('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLS = ['#ff4d75', '#ff80ab', '#f9d423', '#fff', '#e91e63', '#ffcdd2'];
  const pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 7 + 3,
    c: COLS[Math.floor(Math.random() * COLS.length)],
    vx: (Math.random() - .5) * 2.5,
    vy: Math.random() * 2.5 + 1.5,
    a: Math.random() * Math.PI * 2,
    av: (Math.random() - .5) * .1,
  }));

  let raf;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.a += p.av;
      if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.fillStyle = p.c;
      ctx.globalAlpha = .85;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    raf = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(() => cancelAnimationFrame(raf), 12000);
}

/* ══════════════════════════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildStars();
  buildHearts();
  initEnvelope();
});
