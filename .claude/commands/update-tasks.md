---
description: Actualiza «Uso de Plataformas» con la actividad real del ecosistema para un periodo
argument-hint: agosto + septiembre 2026
allowed-tools: Bash(node scripts/uso-plataformas.mjs:*), Bash(npx eslint:*), Bash(npx vite build:*), Bash(git diff:*), Read, Edit
---

Actualiza la sección **Uso de Plataformas** con los datos de: **$ARGUMENTS**

Si `$ARGUMENTS` viene vacío o sin año, no adivines: pide el periodo y detente.
Formato esperado: uno o varios meses + año — `agosto + septiembre 2026`, `septiembre 2026`,
`julio, agosto 2026`.

## 1. Regenera los datos

```
node scripts/uso-plataformas.mjs "$ARGUMENTS"
```

El script hace todo el trabajo: entra por SSH a `216.238.86.245`, consulta las 4 bases y
reescribe `src/data/platforms.js`. **Es solo lectura** — cada sentencia pasa por un guardia
que aborta si no empieza en `SELECT`. No ejecutes SQL por tu cuenta ni "de paso": si hace
falta un dato que el script no trae, dilo y espera instrucciones.

De dónde sale cada plataforma:

| Plataforma | Fuente | Fecha que usa |
|---|---|---|
| Suitedo | `suitedo.diagnostic_applieds` | `start_datetime` |
| Página Web | `humana11.resources` | `published_at` |
| UHE | `uhe.prg_programs` + `uhe.prg_modules` | `created_at` / `start_date` |
| Talento | `talento.vacancies` + `talento.candidates` | `created_at` |

Dos columnas no son de fiar y por eso el script no las usa: `vacancies.published_at` está
NULL en toda la tabla y `vacancies.updated_at` trae un update masivo; `prg_programs.start_date`
también está NULL en toda la tabla.

## 2. Ajusta el texto del periodo

En `src/pages/PeriodActivity.jsx`, la prop `description` del `SlideHeader` nombra el periodo.
Actualízala para que coincida con `$ARGUMENTS` (p. ej. «Registros de agosto y septiembre 2026
en las plataformas del ecosistema.»). Si ya coincide, déjala como está.

No toques nada más: `Home` y `Actividad del Periodo` derivan sus cifras de `platforms.js`
y se actualizan solas.

## 3. Verifica

```
npx eslint .
npx vite build
```

`src/context/ThemeContext.jsx` tiene un error de lint preexistente (`react-refresh/only-export-components`).
Ese no cuenta; cualquier otro sí.

## 4. Reporta

- La tabla de registros por plataforma que imprimió el script, y el total.
- **Los descartados por parecer pruebas**: el script quita nombres con «prueba», «test»,
  «testing» o «demo». Enséñalos y pregunta si alguno debía quedarse.
- **Los nombres marcados para revisar**: capturas en mayúsculas sostenidas o con erratas
  (p. ej. `EGDOO2 - 21` con letra O en vez de cero). El script **no** los corrige solo,
  porque son datos de producción. Propón la corrección de redacción y espera el visto bueno
  antes de editarla a mano en `src/data/platforms.js`.
- Si el periodo devolvió pocos registros o ninguno, dilo claramente en vez de entregar una
  sección vacía, y ofrece ampliar el rango.

## Si falla el SSH

Síntoma: `Permission denied` o timeout, pero los sitios siguen respondiendo. Casi siempre es
el firewall de Vultr, que tiene el puerto 22 fijado a la IP pública del Mac y el ISP la rotó.

```
curl -s https://api.ipify.org
```

Compara esa IP con la regla SSH del panel de Vultr (Products → Firewall) y avísale al usuario.
No intentes rodearlo por otra vía.
