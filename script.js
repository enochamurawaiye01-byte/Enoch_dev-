// ---------- custom cursor ----------
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
if (dot && ring) {
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });
  function ringLoop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(ringLoop);
  }
  ringLoop();
  document
    .querySelectorAll(
      "a, button, .stack-card, .feature-card, .work-card, .logo-mark, input, textarea, .faq-q",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
      el.addEventListener("mouseleave", () =>
        ring.classList.remove("is-active"),
      );
    });
}

// ---------- mobile nav ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
    }),
  );
}

// ---------- typing animation (home hero) ----------
const typedEl = document.getElementById("typedWord");
if (typedEl) {
  const words = [
    "web applications.",
    "developer tools.",
    "real-time systems.",
    "e-commerce engines.",
  ];
  let wi = 0,
    ci = 0,
    deleting = false;
  function typeLoop() {
    const word = words[wi];
    if (!deleting) {
      ci++;
      typedEl.textContent = word.slice(0, ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      ci--;
      typedEl.textContent = word.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 70);
  }
  typeLoop();
}

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        entry.target.querySelectorAll(".bar-fill").forEach((b) => {
          b.style.width = b.dataset.w + "%";
        });
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => io.observe(el));

// ---------- work page filter ----------
const chips = document.querySelectorAll(".filter-chip");
const workCards = document.querySelectorAll(".work-card");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    workCards.forEach((card) => {
      const match = f === "all" || card.dataset.cat === f;
      card.style.transition = "opacity .35s ease, transform .35s ease";
      if (match) {
        card.classList.remove("hidden-card");
        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        });
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(.92)";
        setTimeout(() => {
          if (card.style.opacity === "0") card.classList.add("hidden-card");
        }, 340);
      }
    });
  });
});

// ---------- contact form ----------
const form = document.getElementById("contactForm");
if (form) {
  const submitBtn = document.getElementById("submitBtn");
  const submitLabel = document.getElementById("submitLabel");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitLabel.textContent = "Sending…";
    setTimeout(() => {
      submitBtn.classList.add("sent");
      submitLabel.textContent = "Message Sent ✓";
      setTimeout(() => {
        submitBtn.classList.remove("sent");
        submitLabel.textContent = "Send Message";
        form.reset();
      }, 2200);
    }, 900);
  });
}

// ---------- FAQ accordion ----------
document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

// ---------- particle canvas (home hero only) ----------
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  function resizeCanvas() {
    const hero = document.querySelector(".hero");
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  function initParticles() {
    const count = Math.min(60, Math.floor(canvas.width / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }));
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i],
          b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.strokeStyle = `rgba(255,106,0,${0.14 * (1 - d / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  resizeCanvas();
  initParticles();
  if (!reduceMotion) drawParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}
