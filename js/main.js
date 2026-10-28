/* =========================================================
   Mentoria Emagrecimento Definitivo · Thiago Portes
   Interações: preloader, header, reveal, contadores,
   cursor, botões magnéticos, spotlight, parallax e links de contato.
   ========================================================= */

(() => {
  "use strict";

  const CONFIG = {
    whatsappUrl: "https://api.whatsapp.com/send/?phone=5561998878596&text&type=phone_number&app_absent=0&utm_source=ig",
    instagramUrl: "https://www.instagram.com/personalthiagoportes/",
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Links de WhatsApp & Redes Sociais ---------- */
  function initContactLinks() {
    // Garante que cada botão de WhatsApp aponte rigorosamente para o link real fornecido
    $$("[data-wa]").forEach((link) => {
      link.href = CONFIG.whatsappUrl;
      link.target = "_blank";
      link.rel = "noopener";
    });

    // Garante que links de Instagram apontem para o perfil oficial
    $$("a[href*='instagram.com']").forEach((link) => {
      link.href = CONFIG.instagramUrl;
      link.target = "_blank";
      link.rel = "noopener";
    });
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    const preloader = $(".preloader");
    const count = $("[data-preloader-count]");
    const bar = $(".preloader__bar span");
    const finish = () => {
      preloader.classList.add("is-done");
      document.body.classList.remove("is-loading");
      setTimeout(() => document.body.classList.add("is-ready"), 250);
      setTimeout(() => preloader.remove(), 1400);
    };

    if (prefersReducedMotion) { finish(); return; }

    let progress = 0;
    let loaded = document.readyState === "complete";
    window.addEventListener("load", () => { loaded = true; });

    const tick = () => {
      const target = loaded ? 100 : 86;
      progress += Math.max(0.6, (target - progress) * 0.08);
      if (progress > target) progress = target;
      const value = Math.round(progress);
      count.textContent = value;
      bar.style.width = `${value}%`;
      if (value >= 100) { setTimeout(finish, 250); return; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Revelação do hero (escalonada) ---------- */
  function initHeroStagger() {
    $$("[data-hero-reveal]").forEach((el, i) => {
      el.style.transitionDelay = `${0.1 + i * 0.09}s`;
    });
  }

  /* ---------- Header: estado ao rolar + esconder ao descer ---------- */
  function initHeader() {
    const header = $("[data-header]");
    const floatCta = $("[data-float-cta]");
    const hero = $(".hero");
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 40);
      const goingDown = y > lastY && y > 400;
      if (!document.body.classList.contains("menu-open")) header.classList.toggle("is-hidden", goingDown);
      if (floatCta) {
        const pastHero = y > hero.offsetHeight * 0.8;
        const nearEnd = window.innerHeight + y > document.body.scrollHeight - 700;
        floatCta.classList.toggle("is-visible", pastHero && !nearEnd);
      }
      lastY = y;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    const toggle = $("[data-menu-toggle]");
    const close = () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    };
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    $$("[data-nav] a:not(.nav__cta):not(.social-btn)").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- Reveal on scroll (Intersection Observer) ---------- */
  function initReveal() {
    const items = $$(".reveal");

    // Escalonamento automático entre irmãos
    const groups = new Map();
    items.forEach((el) => {
      const parent = el.parentElement;
      const idx = groups.get(parent) || 0;
      el.style.setProperty("--delay", `${Math.min(idx * 0.08, 0.48)}s`);
      groups.set(parent, idx + 1);
    });

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        // Remove o atraso depois da entrada pra não afetar o hover
        el.addEventListener("transitionend", () => el.style.setProperty("--delay", "0s"), { once: true });
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    items.forEach((el) => io.observe(el));
  }

  /* ---------- Contadores ---------- */
  function initCounters() {
    const counters = $$("[data-count]");
    const format = (n) => n.toLocaleString("pt-BR");
    const run = (el) => {
      const target = Number(el.dataset.count);
      if (prefersReducedMotion) { el.textContent = format(target); return; }
      const duration = 2000;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = format(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        // Espera o preloader sair antes de contar
        const start = () => run(entry.target);
        document.body.classList.contains("is-ready") ? start() : setTimeout(start, 1200);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => io.observe(el));
  }

  /* ---------- Cursor personalizado ---------- */
  function initCursor() {
    const cursor = $(".cursor");
    if (!isFinePointer || prefersReducedMotion || !cursor) return;
    const label = $(".cursor__label", cursor);
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;

    window.addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      cursor.classList.add("is-visible");
    }, { passive: true });
    document.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    $$("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-link"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-link"));
    });
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => { label.textContent = el.dataset.cursor; cursor.classList.add("is-label"); });
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-label"));
    });
  }

  /* ---------- Botões magnéticos ---------- */
  function initMagnetic() {
    if (!isFinePointer || prefersReducedMotion) return;
    $$("[data-magnetic]").forEach((btn) => {
      const strength = 0.28;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- Spotlight que segue o mouse nos cards ---------- */
  function initSpotlight() {
    if (!isFinePointer) return;
    $$("[data-spotlight]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Parallax suave nas imagens ---------- */
  function initParallax() {
    if (prefersReducedMotion) return;
    const layers = $$("[data-parallax]");
    let ticking = false;
    const update = () => {
      const vh = innerHeight;
      layers.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const speed = Number(el.dataset.parallax) || 0.15;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Link ativo na navegação ---------- */
  function initActiveNav() {
    const links = $$(".nav__link");
    const map = new Map(links.map((l) => [l.getAttribute("href").slice(1), l]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target.id);
        if (link && entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Ano no rodapé ---------- */
  function initYear() {
    const el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Inicialização ---------- */
  initContactLinks();
  initHeroStagger();
  initPreloader();
  initHeader();
  initMenu();
  initReveal();
  initCounters();
  initCursor();
  initMagnetic();
  initSpotlight();
  initParallax();
  initActiveNav();
  initYear();
})();
