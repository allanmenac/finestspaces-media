/* =========================================================
   VISIÓN ARQ — main.js
   Inyecta los elementos comunes (nav, menú, pie, loader,
   cortina de transición) y maneja las animaciones.
   Editar una sola vez aquí actualiza TODAS las páginas.
   ========================================================= */

/* ----------  Configuración del sitio  ---------- */
const SITE = {
  brand: "Visión ARQ",
  email: "hola@visionarq.cr",
  phone: "+506 0000 0000",
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

/* ----------  Helpers  ---------- */
const currentPage = () => {
  const p = window.location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
};

/* ----------  Render NAV  ---------- */
function buildNav() {
  const here = currentPage();
  const links = SITE.links
    .map((l) => {
      const active = l.href === here ? " is-active" : "";
      return `<a class="nav-link${active}" href="${l.href}">${l.label}</a>`;
    })
    .join("");

  const navLogo = `
    <a class="nav-logo" href="index.html" aria-label="${SITE.brand} — inicio">
      <span class="nav-logo__text">VISIÓN ARQ</span>
    </a>`;

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

  // estilos del wordmark de la nav
  const s = document.createElement("style");
  s.textContent = `
    .nav-logo__text { font-family: var(--serif); font-weight:500; font-size:1.2rem; letter-spacing:.16em; }`;
  document.head.appendChild(s);
}

/* ----------  Menú móvil  ---------- */
function buildMobileMenu() {
  const here = currentPage();
  const links = SITE.links
    .map((l) => `<a href="${l.href}"${l.href === here ? ' style="opacity:.5"' : ""}>${l.label}</a>`)
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
    toggle.textContent = open ? "cerrar" : "menú";
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.textContent = "menú";
    })
  );
}

/* ----------  Footer  ---------- */
function buildFooter() {
  const links = SITE.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("");
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="footer__top">
      <div class="footer__brand">Visión<br>ARQ</div>
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
      <span>© ${new Date().getFullYear()} Visión ARQ — Donde la visión toma forma</span>
      <span>San José · Costa Rica</span>
    </div>`;
  document.body.appendChild(footer);
}

/* ----------  Loader  ---------- */
function buildLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = `<div class="loader__brand">VISIÓN ARQ</div><div class="loader__word">Donde la visión toma forma</div>`;
  document.body.prepend(loader);

  const done = () => {
    setTimeout(() => {
      loader.classList.add("is-done");
      document.querySelector(".hero")?.classList.add("is-ready");
    }, 900);
  };
  if (document.readyState === "complete") done();
  else window.addEventListener("load", done);
}

/* ----------  Cortina de transición (panel izq. sube · panel der. baja)
   Al entrar: los paneles ya cubren (pintados negros) y solo se abren
   cuando la página está lista, así la nueva página YA está detrás.
   Al salir: cubren por completo y recién entonces navegamos.            ---------- */
function buildCurtain() {
  const cl = document.createElement("div");
  cl.className = "curtain-l is-in";
  const cr = document.createElement("div");
  cr.className = "curtain-r is-in";
  // sin transición mientras cubren al cargar
  cl.style.transition = "none";
  cr.style.transition = "none";
  document.body.appendChild(cl);
  document.body.appendChild(cr);

  // Abrir cuando la página esté lista (contenido ya pintado detrás)
  const open = () => {
    requestAnimationFrame(() => {
      cl.style.transition = "";
      cr.style.transition = "";
      cl.classList.remove("is-in");
      cr.classList.remove("is-in");
    });
  };
  // Espera breve para garantizar pintado del contenido nuevo
  if (document.readyState === "complete") setTimeout(open, 120);
  else window.addEventListener("load", () => setTimeout(open, 80));
  // Salvaguarda: si load tarda demasiado, abrir igual
  setTimeout(open, 1400);

  // Al salir: cerrar paneles, navegar SOLO cuando ya cubren del todo (640ms)
  const TRANSITION_MS = 640;
  let leaving = false;
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || leaving) return;
    const href = a.getAttribute("href");
    if (
      !href ||
      a.target === "_blank" ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http")
    )
      return;
    e.preventDefault();
    leaving = true;
    cl.classList.add("is-in");
    cr.classList.add("is-in");
    // navegar justo cuando la cortina termina de cubrir
    setTimeout(() => (window.location.href = href), TRANSITION_MS);
  });
}

/* ----------  Prepara texto para revelado por líneas  ---------- */
function buildLineReveals() {
  document.querySelectorAll(".line-reveal").forEach((el) => {
    if (el.dataset.lineBuilt) return;
    // Cada <br> separa una línea; envolvemos cada línea en .ln > span
    const html = el.innerHTML;
    const lines = html.split(/<br\s*\/?>/i);
    el.innerHTML = lines
      .map((l) => `<span class="ln"><span>${l.trim()}</span></span>`)
      .join("");
    el.dataset.lineBuilt = "1";
  });
}

/* ----------  Reveal al hacer scroll (op / clip / line)  ---------- */
function buildReveals() {
  buildLineReveals();
  const els = document.querySelectorAll(".reveal, .reveal-clip, .line-reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ----------  Filtros de portafolio  ---------- */
function buildFilters() {
  const bars = document.querySelectorAll(".filtros, .proj-filtros");
  if (!bars.length) return;
  const items = Array.from(
    document.querySelectorAll(".portfolio-item[data-cat], .proj-card[data-cat]")
  );
  bars.forEach((bar) => {
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filtro");
      if (!btn) return;
      bar.querySelectorAll(".filtro").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const cat = btn.dataset.cat;
      items.forEach((it) => {
        const show = cat === "todos" || it.dataset.cat === cat;
        it.classList.toggle("is-hidden", !show);
      });
    });
  });
}

/* ----------  Panel lateral de FAQ (columna desde la derecha)  ---------- */
function buildFaqPanel() {
  const qa = document.querySelector(".qa");
  if (!qa) return;

  const panel = document.createElement("div");
  panel.className = "qa-panel";
  panel.innerHTML =
    '<button class="qa-panel__close" aria-label="Cerrar">cerrar <span>✕</span></button>' +
    '<div class="qa-panel__body"></div>';
  const overlay = document.createElement("div");
  overlay.className = "qa-overlay";
  document.body.appendChild(overlay);
  document.body.appendChild(panel);
  const body = panel.querySelector(".qa-panel__body");

  const questions = Array.from(qa.querySelectorAll(".qa-q"));

  const close = () => {
    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    questions.forEach((q) => q.classList.remove("is-active"));
  };

  questions.forEach((q) => {
    q.addEventListener("click", () => {
      const i = q.dataset.q;
      const ans = qa.querySelector('.qa-a[data-a="' + i + '"]');
      body.innerHTML = ans ? ans.innerHTML : "";
      questions.forEach((x) => x.classList.remove("is-active"));
      q.classList.add("is-active");
      panel.classList.add("is-open");
      overlay.classList.add("is-open");
    });
  });

  panel.querySelector(".qa-panel__close").addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ----------  Zoom de la cuadrícula "piano" al hacer scroll (proyectos)  ---------- */
function buildPianoZoom() {
  const piano = document.querySelector(".piano");
  if (!piano) return;
  let raf = false;
  const update = () => {
    raf = false;
    const rect = piano.getBoundingClientRect();
    const vh = window.innerHeight;
    // progreso desde que el strip entra por abajo hasta que su top llega arriba
    const start = vh;
    const end = 0;
    let t = (start - rect.top) / (start - end);
    t = Math.max(0, Math.min(1, t));
    const scale = 1 + t * 0.12; // zoom suave (piano "bajo")
    piano.style.transform = "scale(" + scale.toFixed(4) + ")";
  };
  window.addEventListener("scroll", () => {
    if (!raf) { raf = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* ----------  Init  ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildLoader();
  buildCurtain();
  buildNav();
  buildMobileMenu();
  buildFooter();
  buildReveals();
  buildFilters();
  buildFaqPanel();
  buildPianoZoom();
});
