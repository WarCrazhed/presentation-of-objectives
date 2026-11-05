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

El script hace todo el trabajo: entra por SSH a `216.238.86.245`, consulta las 5 bases y
reescribe `src/data/platforms.js`. **Es solo lectura** — cada sentencia pasa por un guardia
que aborta si no empieza en `SELECT`. No ejecutes SQL por tu cuenta ni "de paso": si hace
falta un dato que el script no trae, dilo y espera instrucciones.

El script saca dos cosas por plataforma:
- **`metrics`**: cifras de uso agregadas (`COUNT`), del periodo (`value`) y del periodo anterior
  (`prev`, mismos meses justo antes). Si el periodo sigue abierto, ambos se cortan al mismo
  número de días (oct–nov al 5 nov vs ago–sep al 5 sep) para que la comparación sea justa.
- **`records`**: elementos con nombre del periodo completo (diagnósticos, blogs, programas,
  módulos, vacantes). Estado por fechas: Programado / En curso / Completado.

| Plataforma | Métricas (fuente) |
|---|---|
| Suitedo | Personas que respondieron (`diagnostic_participant_answers.created_at`), cuestionarios terminados (`diagnostic_participants.status = 0` — **0 = terminado** — con última respuesta en el periodo), diagnósticos aplicados (`diagnostic_applieds.start_datetime`) |
| Página Web | Posts de Comunidad y personas que publicaron (`humana11.posts` tipo `user`/`recognition`), comentarios, reacciones, blogs publicados (`resources.published_at`) |
| UHE | Alumnos activos (distintos en quiz/survey attempts, `tc_files`, `module_progress.updated_at`, asistencias por `prg_sessions.start_date`), inscripciones (`prg_participants`), certificados, módulos iniciados, programas nuevos |
| Talento | Candidatos nuevos, evaluaciones completadas (`assessment_candidates.status = 'completed'` por `start_datetime`), encuestas respondidas (`diagnostic_applied_responses.completed_at`), vacantes |
| Criba de Mentores | Mentores nuevos, evaluaciones, cuentas creadas en SuiteDO/UHE |

Columnas que no son de fiar y el script no usa: `vacancies.published_at` (NULL en toda la tabla),
`vacancies.updated_at` (update masivo), `prg_programs.start_date` (NULL en toda la tabla) y
`assessment_candidates.completed_at` (la app nunca lo escribe).

El periodo se escribe solo: `Platforms.jsx` lee `periodo` de `platforms.js`. No toques nada más:
`Home` y `Uso de Plataformas` derivan sus cifras de `platforms.js`.

## 2. Verifica

```
npx eslint .
npx vite build
```

`src/context/ThemeContext.jsx` tiene un error de lint preexistente (`react-refresh/only-export-components`).
Ese no cuenta; cualquier otro sí.

## 3. Reporta

- La tabla de métricas que imprimió el script (actual · anterior · variación) y «personas
  activas». Señala caídas o subidas fuertes y si la base es chica.
- **Los descartados por parecer pruebas**: el script quita nombres con «prueba», «test»,
  «testing» o «demo». Enséñalos y pregunta si alguno debía quedarse.
- **Los nombres marcados para revisar**: mayúsculas sostenidas o palabras fuera del
  diccionario (`nspell` + `dictionary-es`, que es de España: si marca un mexicanismo correcto,
  agrégalo a `NOMBRES_PROPIOS` en el script). El script **no** los corrige solo,
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
