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

/* ----------  Monograma (V)  ---------- */
const MARK = `
  <svg class="mark" viewBox="0 0 48 56" fill="none" aria-hidden="true">
    <path d="M4 4 L24 50 L44 4" stroke="currentColor" stroke-width="3" stroke-linecap="square"/>
    <path d="M24 28 L24 50" stroke="currentColor" stroke-width="1.2"/>
  </svg>`;

const LOADER_MARK = `
  <svg class="loader__mark" viewBox="0 0 48 56" fill="none" aria-hidden="true">
    <path d="M4 4 L24 50" stroke="#1A1A1A" stroke-width="3" stroke-linecap="square"/>
    <path d="M44 4 L24 50" stroke="#1A1A1A" stroke-width="3" stroke-linecap="square"/>
    <path d="M24 28 L24 50" stroke="#1A1A1A" stroke-width="1.2"/>
  </svg>`;

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
      ${MARK}
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

  // estilos del wordmark de la nav (no se repiten en el CSS principal)
  const s = document.createElement("style");
  s.textContent = `
    .nav-logo { gap:.6rem; }
    .nav-logo .mark { height:1.5rem; width:auto; }
    .nav-logo__text { font-family: var(--serif); font-weight:500; font-size:1.15rem; letter-spacing:.14em; }
    @media (max-width:420px){ .nav-logo__text{ display:none; } }`;
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
  loader.innerHTML = `${LOADER_MARK}<div class="loader__word">Donde la visión toma forma</div>`;
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

/* ----------  Cortina de transición (panel izq. sube · panel der. baja)  ---------- */
function buildCurtain() {
  const cl = document.createElement("div");
  cl.className = "curtain-l";
  const cr = document.createElement("div");
  cr.className = "curtain-r";
  document.body.appendChild(cl);
  document.body.appendChild(cr);

  // Al entrar: paneles cubren sin transición, luego se abren
  cl.style.transition = "none";
  cr.style.transition = "none";
  cl.classList.add("is-in");
  cr.classList.add("is-in");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      cl.style.transition = "";
      cr.style.transition = "";
      cl.classList.remove("is-in");
      cr.classList.remove("is-in");
    });
  });

  // Al salir: izquierdo sube · derecho baja · navega al terminar (680 ms = 64ms buffer)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
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
    cl.classList.add("is-in");
    cr.classList.add("is-in");
    setTimeout(() => (window.location.href = href), 680);
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
  const bar = document.querySelector(".filtros");
  if (!bar) return;
  const items = Array.from(document.querySelectorAll(".portfolio-item"));
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
});
