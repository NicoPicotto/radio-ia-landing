# Radio IA — Landing Page

Landing page de una radio AI 24/7. Una sola página full-screen con un paisaje animado que reacciona a la hora del día y el clima real de General Deheza, Córdoba, Argentina.

## Qué hace

- El cielo cambia de color según la hora (13 fases, interpoladas con CSS `@property`)
- El sol y la luna se mueven en arco según el horario real (UTC-3)
- Las estrellas aparecen de noche en canvas
- Las nubes, lluvia, nieve y niebla se activan según el clima real (Open-Meteo API)
- El player reproduce el stream de audio del VPS

## Stack

- **Astro 5** — build estático, sin SSR ni JS de framework
- **Tailwind CSS v4** — uso mínimo, mayormente CSS custom por componente
- **Vanilla TypeScript** en `<script>` de Astro
- **pnpm** como package manager

## Comandos

```bash
pnpm install  # instalar dependencias
pnpm dev      # dev server en localhost:4321
pnpm build    # build estático → dist/
pnpm preview  # previsualizar el build
```

## Configuración inicial

Antes de deployar, reemplazar los placeholders:

| Archivo | Qué cambiar |
|---|---|
| `src/components/RadioPlayer.astro` | URL del stream (buscar `PLACEHOLDER_STREAM_URL`) |
| `src/layouts/Layout.astro` | Nombre del proyecto (`Radio IA`) |
| `src/components/RadioPlayer.astro` | Nombre del proyecto |
| `src/components/AboutModal.astro` | Nombre y descripción del proyecto |
| `src/components/AboutModal.astro` / `src/components/SideButtons.astro` | Link de donaciones |

## Deploy en VPS

El build genera archivos estáticos en `dist/`. Servir con nginx apuntando a esa carpeta:

```nginx
server {
    listen 80;
    server_name tudominio.com;
    root /var/www/radio-ai-landing/dist;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```

No requiere Node.js en producción.

## Clima

Usa [Open-Meteo](https://open-meteo.com/) (gratuito, sin API key). Coordenadas hardcodeadas a General Deheza (`-32.75, -63.76`). Se actualiza al cargar y cada 30 minutos.
