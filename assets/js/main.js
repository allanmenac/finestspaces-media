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
  <svg class="mark" viewBox="0 0 803 311" fill="none" aria-hidden="true">
    <path fill="currentColor" fill-rule="evenodd" d="M216.937,283.265C210.099,274.044 161.416,209.01 108.752,138.745C56.088,68.48 13,10.753 13,10.462C13,10.172 18.063,10.062 24.25,10.217L35.5,10.5L115,116.435C158.725,174.699 194.95,222.498 195.5,222.654C196.05,222.81 232.384,175.027 276.242,116.469L355.984,10L401.099,10C436.794,10 446.109,10.261 445.709,11.25C445.29,12.287 232.191,296.893 230.058,299.265C229.679,299.686 223.775,292.486 216.937,283.265ZM267.645,297.169C268.665,295.601 317.42,230.342 375.989,152.149L482.479,9.98L527.963,10.24L573.448,10.5L579.111,18C596.349,40.829 788.709,297.702 789.352,298.75C789.947,299.722 787.592,300 778.78,300L767.442,300L664.571,162.783C569.534,36.017 561.596,25.717 560.333,27.533C559.581,28.615 513.407,90.25 457.724,164.5L356.482,299.5L311.136,299.76L265.791,300.021L267.645,297.169Z"/>
  </svg>`;

/* ----------  Monograma VA en dos trazos (V y A) para animación de dibujo
   en direcciones opuestas (nav, loader, pie)  ---------- */
const VA_V = "M216.94,283.27C210.1,274.04 161.42,209.01 108.75,138.75C56.09,68.48 13,10.75 13,10.46C13,10.17 18.06,10.06 24.25,10.22L35.5,10.5L115,116.44C158.73,174.7 194.95,222.5 195.5,222.65C196.05,222.81 232.38,175.03 276.24,116.47L355.98,10L401.1,10C436.79,10 446.11,10.26 445.71,11.25C445.29,12.29 232.19,296.89 230.06,299.27C229.68,299.69 223.78,292.49 216.94,283.27Z";
const VA_A = "M267.65,297.17C268.67,295.6 317.42,230.34 375.99,152.15L482.48,9.98L527.96,10.24L573.45,10.5L579.11,18C596.35,40.83 788.71,297.7 789.35,298.75C789.95,299.72 787.59,300 778.78,300L767.44,300L664.57,162.78C569.53,36.02 561.6,25.72 560.33,27.53C559.58,28.62 513.41,90.25 457.72,164.5L356.48,299.5L311.14,299.76L265.79,300.02L267.65,297.17Z";
const MARK_SPLIT = `
  <svg class="mark mark--split" viewBox="0 0 803 311" fill="none" aria-hidden="true">
    <path class="va-v" fill="currentColor" fill-rule="evenodd" d="${VA_V}"/>
    <path class="va-a" fill="currentColor" fill-rule="evenodd" d="${VA_A}"/>
  </svg>`;

/* Dibuja el logo: la V de izq→der y la A de der→izq, encontrándose al centro. */
function drawLogoIn(scope, duration, delay) {
  if (!scope) return;
  const v = scope.querySelector(".va-v");
  const a = scope.querySelector(".va-a");
  if (!v || !a) return;
  if (prefersReduced() || !hasGSAP()) {
    if (v.style) v.style.clipPath = "none";
    if (a.style) a.style.clipPath = "none";
    return;
  }
  gsap.set(v, { clipPath: "inset(0 100% 0 0)" });   // V oculta por la derecha
  gsap.set(a, { clipPath: "inset(0 0 0 100%)" });    // A oculta por la izquierda
  gsap.to([v], { clipPath: "inset(0 0% 0 0)", duration: duration || 1.2, ease: "power3.inOut", delay: delay || 0 });
  gsap.to([a], { clipPath: "inset(0 0% 0 0)", duration: duration || 1.2, ease: "power3.inOut", delay: delay || 0 });
}

/* Convierte el texto de un elemento en letras (flex) para escribir y para
   ocupar exactamente el ancho del contenedor (mismo "box" que el logo). */
function letterify(el) {
  const txt = (el.textContent || "").trim();
  el.textContent = "";
  el.classList.add("is-letters");
  const spans = [];
  for (const ch of txt) {
    const s = document.createElement("span");
    s.className = "lt";
    s.textContent = ch;
    el.appendChild(s);
    spans.push(s);
  }
  return spans;
}
function writeLetters(spans, delay) {
  if (!spans.length) return;
  if (prefersReduced() || !hasGSAP()) { spans.forEach((s) => (s.style.opacity = 1)); return; }
  gsap.set(spans, { yPercent: 120, opacity: 0 });
  gsap.to(spans, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.05, delay: delay || 0 });
}

/* ----------  Iconos sociales (simple-icons, monocromos)  ---------- */
const SOCIAL = [
  { name: "Instagram", href: "#", d: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" },
  { name: "Facebook", href: "#", d: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" },
  { name: "TikTok", href: "#", d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
  { name: "YouTube", href: "#", d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "LinkedIn", href: "#", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "X", href: "#", d: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" },
  { name: "Google Business", href: "#", d: "M19.527 4.799c1.212 2.608.937 5.678-.405 8.173-1.101 2.047-2.744 3.74-4.098 5.614-.619.858-1.244 1.75-1.669 2.727-.141.325-.263.658-.383.992-.121.333-.224.673-.34 1.008-.109.314-.236.684-.627.687h-.007c-.466-.001-.579-.53-.695-.887-.284-.874-.581-1.713-1.019-2.525-.51-.944-1.145-1.817-1.79-2.671L19.527 4.799zM8.545 7.705l-3.959 4.707c.724 1.54 1.821 2.863 2.871 4.18.247.31.494.622.737.936l4.984-5.925-.029.01c-1.741.601-3.691-.291-4.392-1.987a3.377 3.377 0 0 1-.209-.716c-.063-.437-.077-.761-.004-1.198l.001-.007zM5.492 3.149l-.003.004c-1.947 2.466-2.281 5.88-1.117 8.77l4.785-5.689-.058-.05-3.607-3.035zM14.661.436l-3.838 4.563a.295.295 0 0 1 .027-.01c1.6-.551 3.403.15 4.22 1.626.176.319.323.683.377 1.045.068.446.085.773.012 1.22l-.003.016 3.836-4.561A8.382 8.382 0 0 0 14.67.439l-.009-.003zM9.466 5.868L14.162.285l-.047-.012A8.31 8.31 0 0 0 11.986 0a8.439 8.439 0 0 0-6.169 2.766l-.016.018 3.665 3.084z" },
];

/* ----------  Helpers  ---------- */
const currentPage = () => {
  const p = window.location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
};

/* ----------  NAV (persistente)  ---------- */
function buildNav() {
  const navLogo = `
    <a class="nav-logo" href="index.html" aria-label="${SITE.brand} — inicio">
      ${MARK_SPLIT}
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
    .nav-logo .mark { height:.82rem; width:auto; display:block; }
    .nav-logo__text { font-family: var(--serif); font-weight:700; font-size:.92rem; letter-spacing:.16em; }
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

/* ----------  Footer (persistente, simple)  ---------- */
function buildFooter() {
  const links = SITE.links
    .map((l) => `<a href="${l.href}">${l.label}</a>`)
    .join("");
  const social = SOCIAL.map(
    (s) =>
      `<a class="soc" href="${s.href}" aria-label="${s.name}" title="${s.name}">
         <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${s.d}"/></svg>
       </a>`
  ).join("");

  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="footer__brandwrap">
      <a class="footer__brand" href="index.html" aria-label="${SITE.brand} — inicio">
        <span class="footer__mark">${MARK_SPLIT}</span>
        <span class="footer__wm">VISIONARQ</span>
      </a>
    </div>

    <div class="footer__grid">
      <nav class="footer__nav" aria-label="Pie de página">
        ${links}
        <a href="${SITE.instagram}" target="_blank" rel="noopener">instagram</a>
      </nav>
      <div class="footer__nap">
        <span class="footer__naplabel">Estudio</span>
        <span>${SITE.city}</span>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a>
      </div>
      <div class="footer__socialwrap">
        <span class="footer__naplabel">Síguenos</span>
        <div class="footer__social">${social}</div>
      </div>
    </div>

    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} ${SITE.brand} — ${SITE.tagline}</span>
      <span class="footer__legal"><a href="#">Aviso legal</a><a href="#">Privacidad</a></span>
    </div>`;
  document.body.appendChild(footer);

  initFooterAnim(footer);
}

/* Animación del pie: el logo VA se dibuja y "VISIONARQ" se escribe letra a
   letra al entrar en pantalla (una sola vez). */
function initFooterAnim(footer) {
  const logoScope = footer.querySelector(".footer__mark");
  const wm = footer.querySelector(".footer__wm");
  const letters = wm ? letterify(wm) : [];
  if (prefersReduced() || !hasGSAP()) { letters.forEach((s) => (s.style.opacity = 1)); return; }
  // estado inicial: logo oculto + letras abajo
  gsap.set(footer.querySelector(".va-v"), { clipPath: "inset(0 100% 0 0)" });
  gsap.set(footer.querySelector(".va-a"), { clipPath: "inset(0 0 0 100%)" });
  if (letters.length) gsap.set(letters, { yPercent: 120, opacity: 0 });
  ScrollTrigger.create({
    trigger: footer,
    start: "top 82%",
    once: true,
    onEnter: () => {
      drawLogoIn(logoScope, 1.2, 0);     // V→ / A← (la misma animación del logo)
      writeLetters(letters, 0.55);       // "VISIONARQ" se escribe
    },
  });
}

/* ----------  Loader (SOLO en la primera carga del Inicio)  ---------- */
function buildLoaderIfHome() {
  if (currentPage() !== "index.html") return;
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = `
    <div class="loader__inner">
      <div class="loader__logo">${MARK_SPLIT}</div>
      <div class="loader__brand">VISIONARQ</div>
    </div>`;
  document.body.prepend(loader);

  const brand = loader.querySelector(".loader__brand");
  const letters = letterify(brand);
  const play = () => {
    drawLogoIn(loader.querySelector(".loader__logo"), 1.3, 0.15);  // V→ / A←
    writeLetters(letters, 1.0);                                     // nombre se escribe
    setTimeout(() => loader.classList.add("is-done"), 3000);        // dura más para leer
  };
  if (document.readyState === "complete") play();
  else window.addEventListener("load", play);
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

/* Transición de imagen compartida (Flip, estilo Mersi): la foto de la tarjeta
   vuela hasta el hero de la página de proyecto. */
async function navigateProject(href, imgEl, accent) {
  if (navigating) return;
  if (!hasGSAP() || prefersReduced()) return navigate(href, true, accent);
  navigating = true;

  const rect = imgEl.getBoundingClientRect();
  const src = imgEl.currentSrc || imgEl.src;

  const clone = document.createElement("img");
  clone.className = "flip-clone";
  clone.src = src;
  clone.style.top = rect.top + "px";
  clone.style.left = rect.left + "px";
  clone.style.width = rect.width + "px";
  clone.style.height = rect.height + "px";
  document.body.appendChild(clone);

  let html;
  try {
    const res = await fetch(href, { headers: { "X-Requested-With": "fetch" } });
    html = await res.text();
  } catch (e) {
    clone.remove();
    window.location.href = href;
    return;
  }

  clearPageAnims();
  swapContent(html);            // ejecuta el script inline → rellena el hero
  history.pushState({ href }, "", href);
  if (lenis) resetLenisForPage(); else window.scrollTo(0, 0);
  initPage();

  const heroImg = document.getElementById("pd-hero-img");
  if (!heroImg) { clone.remove(); navigating = false; return; }

  gsap.set(heroImg, { opacity: 0 });   // se revela cuando el clon aterriza
  requestAnimationFrame(() => {
    const t = heroImg.getBoundingClientRect();
    gsap.to(clone, {
      top: t.top, left: t.left, width: t.width, height: t.height,
      duration: 0.9, ease: "expo.inOut",
      onComplete: () => {
        gsap.set(heroImg, { opacity: 1 });
        clone.remove();
        setTimeout(() => { navigating = false; }, 30);
      },
    });
  });
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

  // Hero oscuro a tope de página: slider del Inicio o hero del proyecto
  const hero = document.querySelector(".home-slider, .pd-hero");
  if (!hero) { gsap.set(navbar, { clearProps: "color" }); return; }

  gsap.set(navbar, { color: NAV_CREAM });
  navColorTrigger = ScrollTrigger.create({
    trigger: hero,
    start: "bottom top+=72",     // el hero termina → empieza el contenido claro
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
/* Morph "tira → cuadrícula" con GSAP Flip (estilo Mersi).
   Las 8 tarjetas arrancan en una tira horizontal y, al entrar en pantalla,
   vuelan a su posición de cuadrícula (duration 2 → aquí 1.3, expo.inOut). */
function initProjectsMorph() {
  const rows = document.getElementById("proj-rows");
  if (!rows) return;

  // Móvil / sin GSAP / movimiento reducido: cuadrícula directa, sin Flip
  if (prefersReduced() || !hasGSAP() || typeof window.Flip === "undefined" || window.innerWidth <= 760) {
    rows.classList.remove("is-strip");
    return;
  }

  rows.classList.add("is-strip");
  const cards = rows.querySelectorAll(".proj-card");
  const t = ScrollTrigger.create({
    trigger: rows,
    start: "top 38%",   // tira visible al cargar; se despliega al hacer scroll
    once: true,
    onEnter: () => {
      const state = Flip.getState(cards);
      rows.classList.remove("is-strip");
      Flip.from(state, {
        duration: 1.3,
        ease: "expo.inOut",
        stagger: 0.05,
        absolute: true,
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
  });
  pageTriggers.push(t);
}

/* Servicios — recorrido con tarjeta central fija: cambia imagen/texto activo
   según el progreso de scroll por la sección. */
let svcOnScroll = null;
function initServicesScroll() {
  const scroll = document.getElementById("svc-scroll");
  if (!scroll) return;
  const medias = scroll.querySelectorAll(".svc-media__svc");
  const copies = scroll.querySelectorAll(".svc-copy__svc");
  const numEl = document.getElementById("svc-num");
  const nameEl = document.getElementById("svc-name");
  const N = copies.length;
  if (!N) return;

  let current = -1;
  const setActive = (i) => {
    if (i === current) return;
    current = i;
    medias.forEach((m, k) => m.classList.toggle("is-active", k === i));
    copies.forEach((c, k) => c.classList.toggle("is-active", k === i));
    if (numEl) numEl.textContent = String(i + 1).padStart(2, "0");
    if (nameEl && copies[i]) nameEl.textContent = copies[i].querySelector(".svc-copy__title").textContent;
  };

  const clamp = (v) => Math.max(0, Math.min(1, v));
  let raf = false;
  const update = () => {
    raf = false;
    if (window.innerWidth <= 860) { setActive(0); return; }
    const total = scroll.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const t = clamp(-scroll.getBoundingClientRect().top / total);
    setActive(Math.min(N - 1, Math.floor(t * N)));
  };

  if (svcOnScroll) window.removeEventListener("scroll", svcOnScroll);
  svcOnScroll = () => { if (!scroll.isConnected) return; if (!raf) { raf = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", svcOnScroll, { passive: true });
  update();
}

function initPage() {
  updateNavActive();
  buildReveals();
  buildPianoIntro();
  initProjectsMorph();
  initServicesScroll();
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
    const href = a.getAttribute("href");
    const card = e.target.closest(".proj-card");
    const cardImg = card && card.querySelector(".proj-card__media img");
    if (cardImg && href.indexOf("proyecto.html") === 0) {
      navigateProject(href, cardImg, accentFromLink(a));   // imagen compartida (Flip)
    } else {
      navigate(href, true, accentFromLink(a));               // cortina
    }
  });

  // Atrás/adelante del navegador
  window.addEventListener("popstate", () => navigate(location.pathname.split("/").pop() || "index.html", false));

  // updateNavActive de inmediato; los reveals (SplitText) esperan a las fuentes
  updateNavActive();
  const startReveals = () => { buildReveals(); buildPianoIntro(); initProjectsMorph(); initServicesScroll(); initNavScroll(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(startReveals);
  else startReveals();

  // El logo de la nav se dibuja una vez (tras el loader en el Inicio)
  const navLogoEl = document.querySelector(".nav-logo");
  if (navLogoEl) setTimeout(() => drawLogoIn(navLogoEl, 1.0, 0), currentPage() === "index.html" ? 3050 : 250);
});
