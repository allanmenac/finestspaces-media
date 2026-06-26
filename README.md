# Visión ARQ — Sitio web

Sitio web del estudio de arquitectura y construcción **Visión ARQ** (San José, Costa Rica).
*Donde la visión toma forma.*

Es un sitio **estático** (HTML, CSS y JavaScript). No necesita compilarse ni instalar nada.

> Este repositorio también almacena archivos de medios (fotos y videos) de Finest Spaces
> Studio Ltd. El sitio web vive junto a ellos; las fotos del sitio están en `assets/img/photos/`.

---

## 📄 Páginas

| Archivo | Página |
|---|---|
| `index.html` | Inicio |
| `servicios.html` | Servicios (Arquitectura, Construcción, Interiores, Consultoría) |
| `portafolio.html` | Portafolio de proyectos |
| `nosotros.html` | Sobre el estudio |
| `blog.html` | Blog (grilla editorial a dos columnas) |
| `contacto.html` | Contacto (formulario) |
| `gracias.html` | Confirmación tras enviar el formulario |

## 📁 Estructura

```
assets/
  css/style.css   → todos los estilos y colores
  js/main.js      → menú, pie de página, animaciones y datos del estudio
  img/
    logo.svg      → logo de Visión ARQ
    photos/       → fotos del sitio (reemplazables)
```

---

## ✏️ Cómo cambiar cosas (sin ser técnico)

- **Tus datos** (correo, teléfono, ciudad, Instagram): edita la sección `SITE` al inicio de `assets/js/main.js`.
- **Las fotos**: reemplaza los archivos dentro de `assets/img/photos/` por los tuyos, **manteniendo el mismo nombre** (por ejemplo `proyecto-01.jpg`). Aparecerán automáticamente.
- **Los textos**: están dentro de cada archivo `.html`, en español, fáciles de encontrar.
- **Los proyectos del portafolio**: edita `portafolio.html` e `index.html`.

> Las fotos actuales son temporales (de la biblioteca existente) para que veas el diseño.
> Reemplázalas por las fotos reales de Visión ARQ cuando las tengas.

---

## 🚀 Publicar en Netlify

1. Entra a [netlify.com](https://www.netlify.com) (ya tienes cuenta).
2. **Add new site → Import an existing project → GitHub**.
3. Elige este repositorio y la rama `claude/architecture-website-setup-ef3k08`
   (o `main` cuando se haya fusionado).
4. No hace falta tocar nada: la configuración ya está en `netlify.toml`. Pulsa **Deploy**.
5. En unos segundos el sitio estará en línea con una dirección `*.netlify.app`.
   Después puedes conectar tu propio dominio (ej. `visionarq.cr`).

### Formulario de contacto
El formulario usa **Netlify Forms** (gratis). Los mensajes llegan al panel de
Netlify, en **Forms**, y puedes configurar que te lleguen por correo. Funciona
automáticamente al publicar; no requiere configuración extra.

---

## 👀 Ver el sitio en tu computadora (opcional)

Si tienes Python instalado, abre una terminal en esta carpeta y ejecuta:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en tu navegador.
