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

/* ----------  Cortina de transición entre páginas  ---------- */
function buildCurtain() {
  const curtain = document.createElement("div");
  curtain.className = "curtain";
  document.body.appendChild(curtain);

  // al entrar, retira la cortina
  requestAnimationFrame(() => {
    curtain.classList.add("is-active");
    requestAnimationFrame(() => {
      curtain.classList.remove("is-active");
      curtain.classList.add("is-leaving");
    });
  });

  // intercepta enlaces internos
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
    curtain.classList.remove("is-leaving");
    curtain.classList.add("is-active");
    setTimeout(() => (window.location.href = href), 600);
  });
}

/* ----------  Reveal al hacer scroll  ---------- */
function buildReveals() {
  const els = document.querySelectorAll(".reveal");
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

/* ----------  Init  ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildLoader();
  buildCurtain();
  buildNav();
  buildMobileMenu();
  buildFooter();
  buildReveals();
});
