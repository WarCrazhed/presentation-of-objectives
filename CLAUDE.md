# presentation-of-objectives

Presentación interna del área de **Funcionalidad Tecnológica** (ecosistema Humana11). SPA tipo slides, protegida por contraseña, que muestra objetivos estratégicos, proyectos, avances, gastos y uso de IA.

## Stack
- **React 19** + **Vite 7** (ESM, `"type": "module"`).
- **Tailwind CSS 4** vía `@tailwindcss/vite` (sin `tailwind.config.js`; config en CSS).
- **qrcode.react** para códigos QR.
- ESLint 9 (flat config en `eslint.config.js`).
- No TypeScript. No router — la navegación es por slides en estado local.

## Comandos
- `pnpm dev` — servidor de desarrollo (Vite + HMR).
- `pnpm build` — build de producción.
- `pnpm preview` — previsualizar el build.
- `pnpm lint` — ESLint sobre todo el repo.

> Nota: el lockfile actual es `package-lock.json` (npm). Usa el gestor que tengas configurado; el proyecto es estándar Vite.

### Datos de «Uso de Plataformas»
- `/update-tasks <meses> <año>` — comando del repo (`.claude/commands/update-tasks.md`). Regenera `src/data/platforms.js` con la actividad real del ecosistema. Ejemplo: `/update-tasks agosto + septiembre 2026`.
- Por debajo corre `node scripts/uso-plataformas.mjs "<periodo>"`, que entra por SSH al server de BD (`216.238.86.245`) y ejecuta **solo `SELECT`** contra `suitedo`, `humana11`, `uhe` y `talento`. Un guardia en el script aborta cualquier sentencia que no empiece en `SELECT`.
- `src/data/platforms.js` es **generado**: edítalo a mano solo si no vas a regenerarlo. Las correcciones de redacción permanentes van en el mapa `CORRECCIONES` del script, no en el archivo de salida.

## Arquitectura
- `src/main.jsx` — entry; monta `<App />` envuelto en `<ThemeProvider>` y `<StrictMode>`.
- `src/App.jsx` — **núcleo**. Contiene:
  - Gate de autenticación por contraseña (`isAuthenticated`, password hardcodeada).
  - Array `slides` (cada item: `{ content, view }`) + navegación (`currentSlide`, `nextSlide`, `prevSlide`) con footer de paginación.
- `src/components/Layout/index.jsx` — header fijo ("Funcionalidad Tecnológica") + botón de tema; envuelve todo.
- `src/context/ThemeContext.jsx` — tema claro/oscuro; persiste en `localStorage`, respeta `prefers-color-scheme`, togglea la clase `dark` en `<html>`.
- `src/pages/` — una página = un slide. Se exportan en barril desde `src/pages/index.js`.
- `src/data/platforms.js` — datos de la sección de plataformas.

## Cómo agregar una sección/slide nueva
1. Crear `src/pages/MiSeccion.jsx` exportando un componente nombrado (`export const MiSeccion = () => {...}`).
2. Añadir `export * from './MiSeccion'` en `src/pages/index.js`.
3. Importar en `src/App.jsx` y agregar un objeto `{ content, view: <MiSeccion /> }` al array `slides` en la posición deseada.

## Convenciones
- **Componentes nombrados**, no default exports (`export const X = () => ...`).
- Páginas con datos = arrays de objetos declarados dentro del componente (ver `StrategicObjective.jsx` como patrón canónico: tabla con filas objetivo/descripción/iniciativas, columnas de meses `['E','F',...,'D']`).
- Listas con `<Fragment key>` cuando hay varias filas por item.
- Estilos Tailwind inline; soportar **siempre** modo oscuro con variantes `dark:`.
- Gradientes de título por sección (`bg-clip-text text-transparent bg-gradient-to-r`); cada slide usa su propia paleta.
- Indentación: 4 espacios.
- Textos de cara al usuario en **español**.

## Contexto
Forma parte del ecosistema Humana11; ver `/Users/zamora/Documents/CLAUDE.md` y `CH11/` para el cerebro del ecosistema. Este repo es solo la presentación, no consume APIs de los demás proyectos.
