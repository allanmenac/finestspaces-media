/* =========================================================
   VISIÓN ARQ — main.js
   UI común (nav, menú, pie, cortina) + transición AJAX entre
   páginas (sin recarga, sin destello, sin loader en páginas
   internas) + animaciones.
   ========================================================= */

/* ----------  Configuración del sitio  ---------- */
const SITE = {
  brand: "VISIONARQ",
  tagline: "Constructora y Consultora",
  email: "vision.arqcr@gmail.com",
  phone: "+506 6454 8401",
  city: "San José, Costa Rica",
  instagram: "https://instagram.com/",
  links: [
    { label: "proyectos", href: "portafolio.html" },
    { label: "servicios", href: "servicios.html" },
    { label: "nosotros",  href: "nosotros.html"   },
    { label: "blog",      href: "blog.html"       },
    { label: "contacto",  href: "contacto.html"   },
  ],
};

/* ----------  Monograma VA (logo)  ---------- */
const MARK = `
  <svg class="mark" viewBox="0 0 120 88" fill="none" aria-hidden="true">
    <path d="M6 84 L38 6 L70 84" stroke="currentColor" stroke-width="11" stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M50 84 L82 6 L114 84" stroke="currentColor" stroke-width="11" stroke-linejoin="miter" stroke-linecap="square"/>
    <path d="M67 54 L97 54" stroke="currentColor" stroke-width="11" stroke-linecap="square"/>
  </svg>`;

/* ----------  Helpers  ---------- */
const currentPage = () => {
  const p = window.location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
};

/* ----------  NAV (persistente)  ---------- */
function buildNav() {
  const navLogo = `
    <a class="nav-logo" href="index.html" aria-label="${SITE.brand} — inicio">
      ${MARK}
      <span class="nav-logo__text">VISIONARQ</span>
    </a>`;
  const links = SITE.links
    .map((l) => `<a class="nav-link" data-href="${l.href}" href="${l.href}">${l.label}</a>`)
    .join("");
  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML = `
    ${navLogo}
    <div class="nav-links">
      ${links}
      <a class="nav-link" href="${SITE.instagram}" target="_blank" rel="noopener">instagram</a>
    </div>
    <button class="nav-toggle" aria-label="Abrir menú">menú</button>`;
  document.body.prepend(nav);

  const s = document.createElement("style");
  s.textContent = `
    .nav-logo { display:flex; align-items:center; gap:.55rem; }
    .nav-logo .mark { height:1.45rem; width:auto; display:block; }
    .nav-logo__text { font-family: var(--serif); font-weight:500; font-size:1.18rem; letter-spacing:.18em; }
    @media (max-width:380px){ .nav-logo__text{ display:none; } }`;
  document.head.appendChild(s);
}

function updateNavActive() {
  const here = currentPage();
  document.querySelectorAll(".navbar .nav-link[data-href]").forEach((a) => {
    a.classList.toggle("is-active", a.getAttribute("data-href") === here);
  });
}

/* ----------  Menú móvil (persistente)  ---------- */
function buildMobileMenu() {
  const links = SITE.links
    .map((l) => `<a href="${l.href}">${l.label}</a>`)
    .join("");
  const menu = document.createElement("div");
  menu.className = "mobile-menu";
  menu.innerHTML = `
    ${links}
    <a href="${SITE.instagram}" target="_blank" rel="noopener">instagram</a>
    <span class="eyebrow">${SITE.city}</span>`;
  document.body.appendChild(menu);

  const toggle = document.querySelector(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    document.documentElement.classList.toggle("menu-open", open);
    toggle.textContent = open ? "cerrar" : "menú";
  });
}

/* ----------  Footer (persistente)  ---------- */
function buildFooter() {
  const links = SITE.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("");
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="footer__top">
      <div class="footer__brand">VISIONARQ<span class="footer__brand-desc">Constructora y Consultora</span></div>
      <div class="footer__cols">
        <div class="footer__col">
          <h4>Navegación</h4>
          ${links}
        </div>
        <div class="footer__col">
          <h4>Estudio</h4>
          <p>${SITE.city}</p>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
          <a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a>
        </div>
        <div class="footer__col">
          <h4>Social</h4>
          <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="contacto.html">Agendar una cita</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} VISIONARQ — Constructora y Consultora</span>
      <span>San José · Costa Rica</span>
    </div>`;
  document.body.appendChild(footer);
}

/* ----------  Loader (SOLO en la primera carga del Inicio)  ---------- */
function buildLoaderIfHome() {
  if (currentPage() !== "index.html") return;
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = `<div class="loader__logo">${MARK}</div><div class="loader__brand">VISIONARQ</div><div class="loader__word">Constructora y Consultora</div>`;
  document.body.prepend(loader);
  const done = () => setTimeout(() => loader.classList.add("is-done"), 900);
  if (document.readyState === "complete") done();
  else window.addEventListener("load", done);
}

/* =========================================================
   TRANSICIÓN AJAX (cortina + intercambio de contenido)
   ========================================================= */
let CL, CR;                 // paneles de cortina
const TRANSITION_MS = 640;  // debe coincidir con el CSS
let navigating = false;

function buildCurtain() {
  CL = document.createElement("div");
  CL.className = "curtain-l";
  CR = document.createElement("div");
  CR.className = "curtain-r";
  document.body.appendChild(CL);
  document.body.appendChild(CR);
}

function coverCurtain()  { CL.classList.add("is-in");    CR.classList.add("is-in"); }
function openCurtain()   {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => { CL.classList.remove("is-in"); CR.classList.remove("is-in"); })
  );
}

/* Reemplaza el contenido de la página (todo menos la UI persistente) */
function swapContent(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  // 1) quitar contenido actual (conservar UI inyectada por JS y main.js)
  const keep = (n) =>
    (n.matches &&
      n.matches(
        ".navbar,.mobile-menu,.footer,.curtain-l,.curtain-r,.loader,.qa-panel,.qa-overlay"
      )) ||
    (n.tagName === "SCRIPT" && n.src);
  Array.from(document.body.children).forEach((n) => { if (!keep(n)) n.remove(); });

  // 2) insertar contenido nuevo antes del footer; recolectar scripts inline
  const footer = document.querySelector(".footer");
  const frag = document.createDocumentFragment();
  const inlineScripts = [];
  Array.from(doc.body.children).forEach((node) => {
    if (node.tagName === "SCRIPT") {
      if (node.src) return;            // no recargar main.js
      inlineScripts.push(node.textContent);
      return;
    }
    frag.appendChild(document.importNode(node, true));
  });
  document.body.insertBefore(frag, footer);

  // 3) actualizar título y clase del body
  document.title = doc.title;
  document.body.className = doc.body.className;

  // 4) ejecutar scripts inline (ya con el contenido en el DOM)
  inlineScripts.forEach((code) => {
    const s = document.createElement("script");
    s.textContent = code;
    document.body.insertBefore(s, footer);
  });
}

/* Color de acento de la cortina al navegar a un proyecto (Phase 2, Mersi).
   La cortina toma el color del proyecto pulsado; si no hay, queda negra. */
function setCurtainColor(color) {
  if (!CL || !CR) return;
  CL.style.background = color || "";
  CR.style.background = color || "";
}

async function navigate(href, push = true, accent = "") {
  if (navigating) return;
  navigating = true;

  setCurtainColor(accent);
  coverCurtain();
  const closed = new Promise((r) => setTimeout(r, TRANSITION_MS));

  let html;
  try {
    const res = await fetch(href, { headers: { "X-Requested-With": "fetch" } });
    html = await res.text();
  } catch (e) {
    window.location.href = href; // respaldo: navegación normal
    return;
  }

  await closed;          // esperar a que la cortina cubra del todo
  clearPageAnims();      // matar ScrollTriggers/SplitText de la página saliente
  swapContent(html);     // la nueva página YA está lista detrás
  if (push) history.pushState({ href }, "", href);
  if (lenis) resetLenisForPage(); else window.scrollTo(0, 0);
  initPage();            // reactivar animaciones de la nueva página
  openCurtain();         // descubrir → la página nueva ya está ahí

  setTimeout(() => {
    navigating = false;
    setCurtainColor("");  // restablecer a negro para la próxima navegación
  }, TRANSITION_MS);
}

/* Color de acento desde el enlace pulsado (tarjeta de proyecto / slide) */
function accentFromLink(a) {
  if (a.dataset && a.dataset.accent) return a.dataset.accent;
  if (a.classList && a.classList.contains("slide-card") && a.style.backgroundColor)
    return a.style.backgroundColor;
  const etiq = a.querySelector && a.querySelector(".proj-card__etiq");
  if (etiq && etiq.style.backgroundColor) return etiq.style.backgroundColor;
  return "";
}

function isInternalLink(a) {
  const href = a.getAttribute("href");
  if (!href) return false;
  if (a.target === "_blank") return false;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http"))
    return false;
  return true;
}

/* =========================================================
   SCROLL SUAVE (Lenis) + GSAP / ScrollTrigger
   Config y tiempos calcados de mersi-architecture.com.
   ========================================================= */
const prefersReduced = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGSAP = () => typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

let lenis = null;

function initSmoothScroll() {
  if (prefersReduced() || typeof window.Lenis === "undefined" || !hasGSAP()) return;
  gsap.registerPlugin(ScrollTrigger);
  if (typeof window.SplitText !== "undefined") gsap.registerPlugin(SplitText);

  lenis = new Lenis({
    duration: currentPage() === "index.html" ? 2.5 : 1.2,
    easing: (n) => Math.min(1, 1.001 - Math.pow(2, -10 * n)),
    orientation: "vertical",          // Lenis 1.x (= direction de Mersi)
    gestureOrientation: "vertical",   // Lenis 1.x (= gestureDirection)
    smoothWheel: true,                // (= smooth)
    syncTouch: false,                 // (= smoothTouch:false)
    touchMultiplier: 1.5,
    wheelMultiplier: 0.8,
    lerp: 0.06,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.__lenis = lenis;
}

/* Color de la barra según scroll (calcado de Mersi /projets/*):
   en el Inicio la nav empieza crema sobre el slider de imágenes y pasa a
   negro al terminar el slider, donde empieza el contenido claro.
   Anima el color de .navbar → afecta logo (currentColor) y botón "menú". */
const NAV_CREAM = "#EDE7DE";
const NAV_DARK = "#1A1A1A";
let navColorTrigger = null;

function initNavScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  if (navColorTrigger) { try { navColorTrigger.kill(); } catch (e) {} navColorTrigger = null; }

  if (!hasGSAP() || prefersReduced()) { navbar.style.color = ""; return; }

  const isHome = currentPage() === "index.html";
  const slider = document.querySelector(".home-slider");
  if (!isHome || !slider) { gsap.set(navbar, { clearProps: "color" }); return; }

  gsap.set(navbar, { color: NAV_CREAM });
  navColorTrigger = ScrollTrigger.create({
    trigger: slider,
    start: "bottom top+=72",     // el slider termina → empieza el contenido claro
    onEnter: () => gsap.to(navbar, { color: NAV_DARK, duration: 0.4, ease: "power2.out" }),
    onLeaveBack: () => gsap.to(navbar, { color: NAV_CREAM, duration: 0.4, ease: "power2.out" }),
  });
}

/* Reinicia el scroll suave y la duración según la página (Inicio = 2.5) */
function resetLenisForPage() {
  if (!lenis) return;
  lenis.options.duration = currentPage() === "index.html" ? 2.5 : 1.2;
  lenis.scrollTo(0, { immediate: true });
  lenis.resize();
}

/* =========================================================
   ANIMACIONES DE REVELADO (GSAP)  — calcadas de Mersi:
     .reveal       → [reveal-op]   opacity 0→1   1s  power2.out  delay .3   start "top 85%"
     .reveal-clip  → [reveal-clip] clipPath inset 100%→0  1.35s power4.inOut delay .3 start "top 85%"
     .line-reveal  → [line]        SplitText líneas+máscara yPercent 100→0 1s power3.out
                                   stagger .05 delay .3  start "top 90%"
   ========================================================= */
let pageTriggers = [];
let pageSplits = [];

function clearPageAnims() {
  pageTriggers.forEach((t) => { try { t.kill(); } catch (e) {} });
  pageTriggers = [];
  pageSplits.forEach((s) => { try { s.revert(); } catch (e) {} });
  pageSplits = [];
}

/* Respaldo sin GSAP / con movimiento reducido: mostrar todo */
function revealAllStatic() {
  document.querySelectorAll(".reveal, .line-reveal").forEach((el) => { el.style.opacity = "1"; });
  document
    .querySelectorAll(".reveal-clip > img, .reveal-clip > .reveal-clip__inner")
    .forEach((el) => { el.style.clipPath = "inset(0% 0% 0% 0%)"; });
}

function buildReveals() {
  clearPageAnims();

  if (prefersReduced() || !hasGSAP()) { revealAllStatic(); return; }

  // [reveal-op] ← .reveal
  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.set(el, { opacity: 0 });
    pageTriggers.push(
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: () => gsap.to(el, { opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }),
      })
    );
  });

  // [reveal-clip] ← .reveal-clip
  document.querySelectorAll(".reveal-clip").forEach((wrap) => {
    const targets = wrap.querySelectorAll(":scope > img, :scope > .reveal-clip__inner");
    if (!targets.length) return;
    gsap.set(targets, { clipPath: "inset(100% 0% 0% 0%)" });
    pageTriggers.push(
      ScrollTrigger.create({
        trigger: wrap, start: "top 85%", once: true,
        onEnter: () =>
          gsap.to(targets, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "power4.inOut", delay: 0.3 }),
      })
    );
  });

  // [line] ← .line-reveal  (SplitText líneas + máscara)
  if (typeof window.SplitText !== "undefined") {
    document.querySelectorAll(".line-reveal").forEach((el) => {
      const split = new SplitText(el, { type: "lines", mask: "lines", linesClass: "sl-line" });
      pageSplits.push(split);
      gsap.set(el, { opacity: 1 });
      gsap.set(split.lines, { yPercent: 100 });
      pageTriggers.push(
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () =>
            gsap.to(split.lines, { yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.05, delay: 0.3 }),
        })
      );
    });
  } else {
    document.querySelectorAll(".line-reveal").forEach((el) => { el.style.opacity = "1"; });
  }

  ScrollTrigger.refresh();
}

/* Intro "pianista" — la onda izq→der al entrar el strip en pantalla */
let pianoObserver = null;
function buildPianoIntro() {
  const piano = document.querySelector(".piano");
  if (!piano) return;
  // numerar las teclas para el retardo escalonado
  piano.querySelectorAll(".piano__img").forEach((img, i) => img.style.setProperty("--i", i));
  if (pianoObserver) pianoObserver.disconnect();
  pianoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-playing");
          pianoObserver.unobserve(en.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  pianoObserver.observe(piano);
}

/* Morph piano→cuadrícula: el strip fijo hace zoom y se desvanece mientras
   el pin se desplaza (state 1 → state 2). Escucha global, una sola vez. */
function initPianoMorphGlobal() {
  let raf = false;
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const update = () => {
    raf = false;
    const pin = document.querySelector(".piano-pin");
    const track = document.querySelector(".piano__track");
    if (!pin || !track) return;
    if (window.innerWidth <= 760) { track.style.transform = ""; track.style.opacity = ""; return; }
    const rect = pin.getBoundingClientRect();
    const total = pin.offsetHeight - window.innerHeight;
    const t = total > 0 ? clamp(-rect.top / total) : 0;
    const scale = 1 + 0.2 * t;                 // zoom progresivo
    const fade = clamp((t - 0.4) / 0.45);       // se desvanece en el tramo final
    track.style.transform = "scale(" + scale.toFixed(4) + ")";
    track.style.opacity = (1 - fade).toFixed(3);
  };
  window.addEventListener("scroll", () => {
    if (!raf) { raf = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* Filtros — delegación global (una sola vez) */
function initFiltersGlobal() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".filtro");
    if (!btn) return;
    const bar = btn.closest(".filtros, .proj-filtros");
    if (!bar) return;
    bar.querySelectorAll(".filtro").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const cat = btn.dataset.cat;
    document
      .querySelectorAll(".portfolio-item[data-cat], .proj-card[data-cat]")
      .forEach((it) => {
        const show = cat === "todos" || it.dataset.cat === cat;
        it.classList.toggle("is-hidden", !show);
      });
  });
}

/* Panel lateral de FAQ — panel persistente + delegación global */
function initFaqGlobal() {
  const panel = document.createElement("div");
  panel.className = "qa-panel";
  panel.innerHTML =
    '<button class="qa-panel__close" aria-label="Cerrar">cerrar <span>✕</span></button><div class="qa-panel__body"></div>';
  const overlay = document.createElement("div");
  overlay.className = "qa-overlay";
  document.body.appendChild(overlay);
  document.body.appendChild(panel);
  const body = panel.querySelector(".qa-panel__body");

  const close = () => {
    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.querySelectorAll(".qa-q").forEach((q) => q.classList.remove("is-active"));
  };

  document.addEventListener("click", (e) => {
    const q = e.target.closest(".qa-q");
    if (q) {
      const i = q.dataset.q;
      const ans = document.querySelector('.qa-a[data-a="' + i + '"]');
      body.innerHTML = ans ? ans.innerHTML : "";
      document.querySelectorAll(".qa-q").forEach((x) => x.classList.remove("is-active"));
      q.classList.add("is-active");
      panel.classList.add("is-open");
      overlay.classList.add("is-open");
      return;
    }
    if (e.target.closest(".qa-panel__close") || e.target.classList.contains("qa-overlay")) close();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* Se ejecuta en cada página (carga inicial y tras cada swap AJAX) */
function initPage() {
  updateNavActive();
  buildReveals();
  buildPianoIntro();
  initNavScroll();
}

/* =========================================================
   INIT (una sola vez)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Capa global: oscurece ~5% con un leve viñeteado (no bloquea clics)
  const tint = document.createElement("div");
  tint.className = "site-tint";
  document.body.appendChild(tint);

  buildLoaderIfHome();
  buildNav();
  buildMobileMenu();
  buildFooter();
  buildCurtain();
  initSmoothScroll();
  initFaqGlobal();
  initFiltersGlobal();
  initPianoMorphGlobal();

  // Interceptar enlaces internos → transición AJAX
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const a = e.target.closest("a");
    if (!a || !isInternalLink(a)) return;
    e.preventDefault();
    // cerrar menú móvil si está abierto
    const mm = document.querySelector(".mobile-menu.is-open");
    if (mm) {
      mm.classList.remove("is-open");
      document.documentElement.classList.remove("menu-open");
      document.querySelector(".nav-toggle").textContent = "menú";
    }
    navigate(a.getAttribute("href"), true, accentFromLink(a));
  });

  // Atrás/adelante del navegador
  window.addEventListener("popstate", () => navigate(location.pathname.split("/").pop() || "index.html", false));

  // updateNavActive de inmediato; los reveals (SplitText) esperan a las fuentes
  updateNavActive();
  const startReveals = () => { buildReveals(); buildPianoIntro(); initNavScroll(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(startReveals);
  else startReveals();
});
