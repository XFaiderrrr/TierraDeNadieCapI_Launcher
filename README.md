# Tierra de Nadie — sitio web

Landing page estática para presentar y distribuir **Tierra de Nadie - Capítulo I**.

## Tecnologías
- HTML5
- CSS3
- JavaScript
- Compatible con GitHub Pages

## Ejecutar localmente
Abre `index.html` en tu navegador. Para una experiencia más cómoda puedes usar la extensión Live Server de Visual Studio Code.

## Configurar el enlace de descarga
1. Sube el instalador `.exe` a un servicio de distribución (por ejemplo, GitHub Releases o itch.io).
2. Abre `js/main.js`.
3. Reemplaza `const DOWNLOAD_URL = "";` por el enlace directo o público del instalador.
4. Guarda y vuelve a publicar el sitio.

No se debe subir un instalador grande directamente al repositorio de código de GitHub.

## Reemplazar espacios de imágenes
Las secciones de galería y portada usan elementos gráficos provisionales hechos con CSS. Cuando tengas capturas reales:
- Coloca las imágenes dentro de `assets/images/`.
- Reemplaza los bloques `.gallery-placeholder` del HTML por etiquetas `<img>`.
- Para una portada real, se puede agregar una imagen de fondo en `.hero-art` desde `css/styles.css`.

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub y sube el contenido de esta carpeta.
2. Entra a **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona `main` y la carpeta `/ (root)`.
5. Guarda y espera a que GitHub genere la URL.

## Pendiente de confirmar
- Herramienta utilizada para empaquetar el juego como `.exe`.
- Enlace de descarga del instalador.
- Tamaño y versión del instalador.
- Requisitos mínimos reales probados en Windows.
- Logo, portada, capturas y tráiler oficiales.
