# PyHack — Plan de mejora pedagógica

> Documento de continuidad. Si una sesión de Claude se interrumpe o cambia de
> modelo, este archivo contiene TODO el contexto necesario para retomar el
> trabajo sin pedir nada al usuario.

**Fecha de inicio**: 2026-04-27
**Autor original del plan**: Claude Code (asistente IA), bajo dirección del mantenedor del repo.
**Estado**: implementado (ver sección 9).

---

## 1. Contexto del proyecto PyHack

PyHack es un juego educativo en navegador (HTML/JS/Pyodide) para aprender
Python aplicado a ciberseguridad. Proyecto personal del usuario, repo en
`~/Desktop/pyhack/`. No tiene dependencias instalables: vanilla HTML/CSS/JS +
Pyodide vía CDN + CodeMirror 5 vía CDN.

**56 niveles** distribuidos en **10 capítulos** (Cap 0-9). Todos los objetivos
son mocks deterministas; **cero red real**. Filosofía: el alumno escribe el
código, el juego lo ejecuta en sandbox Pyodide y valida.

### Estructura de archivos relevante

```
pyhack/
├── index.html              # menú, pantallas, overlays
├── style.v7.css            # estilos
├── README.md
├── PEDAGOGICAL_PLAN.md     # ← este documento
└── js/
    ├── chapters.js         # 10 capítulos definidos
    ├── levels.js           # 56 niveles con id, chapter, mission, hint, etc.
    ├── theories.js         # teoría HTML por nivel (1-50; 51-56 sin teoría aún)
    ├── tutorial.js         # manual técnico, briefing narrativo
    ├── mocks.js            # APIs JS expuestas a Python (scan_port, fetch_url, …)
    ├── runner.js           # carga Pyodide + prelude Python
    ├── network-map.js      # render del mapa de red
    ├── terminal.js         # render del terminal
    ├── game.js             # motor: vidas, restricciones, win checks
    └── main.js             # pantallas, persistencia, splitters, overlays
```

### Edits previos a este plan (sesión actual)

Antes de empezar este plan, en la misma sesión se hizo:

1. **Auditoría de framing** de niveles supuestamente "ofensivos". Resultado: el
   proyecto ya estaba bien-framed como CTF educativo + defensivo. Solo se
   editaron 5 niveles para ajustar narrativa (L21, L22, L23, L24, L32, L48).
   Detalles: ver historial de Git.
2. **Cap 9 nuevo añadido** (niveles 51-56): "Detección y análisis defensivo".
   Cubre: YARA-lite, typosquat detection, IOC extraction, CVE audit,
   Sigma-lite rules, examen final. Estos 6 niveles **no tienen teoría
   escrita aún** — pendiente para este plan.
3. **Eliminado el lock por progreso** en `main.js`: todos los niveles son
   accesibles sin completar los anteriores (a petición del usuario para
   poder revisar todo el contenido).

### Heurística de seguridad (acordada con el usuario)

Para añadir niveles nuevos sin que crucen líneas con políticas:

- **Rol del alumno**: auditor, QA, IR, forense, dev. Nunca atacante.
- **Output**: veredicto, métrica, reporte, alerta. Nunca secreto en claro
  (excepto si el dato es inequívocamente sintético/público).
- **Código fuera del mock**: debe ser inerte. Datos hardcoded = bien.
- **Verbos**: detectar, auditar, validar, analizar. Nunca explotar/exfiltrar/
  evadir.
- **Línea dura no readaptable**: DoS funcional, phishing operativo (kits),
  malware funcional escrito por el alumno.

---

## 2. Diagnóstico pedagógico

El usuario identificó que el curso, tal como está, **es para alguien con
Python básico**, no para principiante absoluto. La curva real:

| Cap | Nivel real | Salto |
|---|---|---|
| 0 | Principiante absoluto | ✓ |
| 1 | Principiante con bases | leve |
| 2 | Intermedio temprano | **abismo** ⚠ |
| 3-6 | Intermedio | gradual |
| 7-9 | Intermedio-avanzado | gradual |

Problemas identificados:

1. **Densidad de conceptos por nivel**: muchos niveles introducen 2-3 cosas
   nuevas (ej. L33 César+XOR = 5 conceptos: aritmética modular, ord/chr, XOR
   bitwise, comprensión de bytes, validación ASCII).
2. **Falta scaffolding** entre conceptos: list comprehension, lambda + key=,
   bitwise, regex aparecen sin nivel puente previo.
3. **Doble curva simultánea**: el alumno aprende Python + concepto de
   seguridad + API mock al mismo tiempo.
4. **Documentación enterrada**: las APIs del juego se descubren nivel a nivel.
5. **Hints saltan directo a la solución**: faltan tiers intermedios.
6. **Teoría poco profunda**: 250-400 caracteres por nivel (debería ser
   1500-3000 para los niveles complejos).

### Decisión clave del usuario sobre el diagnóstico

> "no necesitamos bajar el nivel, si el material didactico es bueno es bueno,
> tenemos que poder enseñarlo bien, crear ese contexto. quiero la mejor y mas
> calidad para el proyecto sin importar el volumen. y sobre todo contenido
> explicatorio mucho mucho mucho, no bajar nivel sino darlo nosotros"

**No simplificar los niveles. Construir un sistema pedagógico potente
alrededor.**

---

## 3. Decisiones validadas por el usuario

Antes de implementar, se le presentaron 5 preguntas de arquitectura. Sus
respuestas (verbatim):

1. **¿4 capas de pista o 3?** → "cuanto mas explicativo mejor, la finalidad
   es aprender python". → **4 capas mínimo**, ampliable si fuera útil.
2. **Cheatsheet permanente o modal?** → "que existan las 2 configuraciones
   modificable con un boton arriba al lado de los corazones rollo que lo
   puedas modoficar y fijar". → **Toggle entre los dos modos** con botón en
   el header del juego, junto al cover meter (lo que el usuario llama
   "corazones").
3. **Glosario tooltips o página?** → "ponme ambas". → **Tooltips inline +
   página dedicada**, ambas alimentadas por la misma fuente de datos.
4. **Pilotos: Cap 0 + Cap 9?** → "que la curva de evolucion sea lo mas suave
   pero se vean todos los conceptos". → **Cap 0 + Cap 9** sigue siendo
   óptimo: Cap 0 valida la línea para principiante absoluto; Cap 9 es el
   nuevo sin teoría que necesita el contenido sí o sí.
5. **Infraestructura primero o contenido?** → "por donde tu prefieras". →
   **Infraestructura primero** para que el contenido se escriba ya con
   destino real.

---

## 4. Arquitectura del sistema pedagógico

### A) Pista en 4 capas

Se sustituyen los 2 botones actuales (📖 teoría / 💡 código) por un panel de 4
botones revelables en orden:

| # | Botón | Contenido | Cuándo se usa |
|---|---|---|---|
| 1 | 📖 **Teoría** | Concepto Python desde cero + por qué se usa aquí + 3+ ejemplos progresivos + errores típicos + conexión con niveles previos | El alumno no entiende el concepto |
| 2 | 🧭 **Estrategia** | Pseudocódigo paso a paso, sin sintaxis Python — solo qué hacer en orden | El alumno entiende el concepto pero no sabe descomponer |
| 3 | 🪜 **Esqueleto** | Código con huecos `# [TODO: ...]` que el alumno rellena | Sabe el qué, no el cómo sintáctico |
| 4 | 💡 **Solución** | Código completo comentado | Última instancia |

**Reglas de revelado**:

- Cada capa empieza bloqueada salvo que el alumno haya pulsado la anterior.
- Pulsar una capa la revela y desbloquea la siguiente.
- En exámenes (`is_exam: true`), todas las capas siguen bloqueadas igual que
  ahora.
- El estado de "qué capas ha visto" se persiste en `localStorage` por nivel
  (clave nueva: `pyhack_hints_revealed_<level_id>` → set serializado).

**Reglas de calidad por capa**:

- Teoría: si el nivel introduce N conceptos nuevos, la teoría los cubre TODOS,
  no solo el que da nombre al nivel.
- Estrategia: 5-10 pasos en lenguaje natural. Pasos atómicos (uno por línea).
- Esqueleto: revela ~50% del código. Las decisiones clave (qué función llamar,
  qué operador usar) van en `[TODO]`.
- Solución: lo que ya es el `hint` actual. NO se toca.

### B) Cheatsheet (modo doble con toggle)

**Botón nuevo en el header del juego**, junto al cover meter, que alterna
entre dos modos:

- 📌 **Anclado** — pestaña permanente (panel lateral o columna fija en
  layout) siempre visible. Útil mientras escribes código.
- 🪟 **Modal** — overlay que se abre con un atajo (sugerido: `Ctrl+K` o `?`).
  Se cierra con Esc. Útil cuando quieres más espacio para el editor.

El estado del toggle se persiste en `localStorage` (`pyhack_cheatsheet_mode`)
con valor `pinned` o `modal`.

**Contenido del cheatsheet** — tres pestañas internas:

1. **API del juego** (datos en `cheatsheet.js` → array `GAME_API`):
   - `scan_port(host, port) → "open"|"closed"|"filtered"`
   - `fetch_banner(host, port) → str`
   - `dns_lookup(domain) → list[str]`
   - `fetch_url(url, method="GET", data=None, headers=None) → HttpResponse`
   - `socket_request(host, port, payload="") → str|None`
   - `bash(cmd) → BashResult`
   - `parse_pcap() → list[dict]`
   - `reset_http_session() → None`
   Cada entrada: firma + retorno + ejemplo de 2-3 líneas.

2. **Stdlib usada** (organizada por módulo):
   - `json` — `dumps(obj, indent=2)`, `loads(s)`
   - `re` — `compile()`, `findall()`, `search()`, `match()`, `sub()` + grupos
   - `hashlib` — `md5()`, `sha256()`, `hexdigest()`, `digest()`
   - `base64` — `b64encode()`, `b64decode()`
   - `urllib.parse` — `quote()`, `unquote()`, `urlparse()`
   - `collections` — `Counter`, `defaultdict`, `most_common()`
   - `pathlib` — `Path()`, `.resolve()`, `.parent`, `.is_file()`
   - `subprocess` (educativo) — `run()`, `capture_output`, `check_returncode()`

3. **Sintaxis Python esencial**:
   - f-strings + format specs (`:08b`, `:o`, `:.2f`, `:>10`)
   - List/dict/set comprehensions con condicionales
   - Slicing `[start:stop:step]`
   - `sorted(it, key=lambda x: ...)` y `min`/`max` con key
   - `try`/`except`/`finally`
   - `with` (context managers)
   - `enumerate`, `zip`, `range`
   - Comparadores chained (`0 <= x < 10`)
   - `*args`, `**kwargs`
   - Set ops (`& | - ^`, `.issubset`, `.intersection`)
   - Bitwise (`& | ^ ~ << >>`) con tabla de verdad

### C) Glosario (tooltips + página)

**Fuente única de datos**: `js/glossary.js` con un dict de términos:

```js
const GLOSSARY = {
  "XOR": {
    short: "OR exclusivo: bit a bit, da 1 si los dos bits son distintos.",
    long: "...",       // explicación HTML para la página
    related: ["bitwise", "cifrado clásico"],
    seeAlso: "cap5",   // dónde se profundiza
  },
  "MD5": { ... },
  // ~50 términos
};
```

**Tooltips inline** en intro/mission/diary del nivel:

- Un script post-procesa el texto al renderizar y rodea con
  `<span class="glossary-term" data-term="XOR">XOR</span>` los términos que
  matchean el dict.
- CSS: borde inferior punteado.
- Hover (desktop) o tap (móvil): tooltip con `short` y un link "ver más".

**Página dedicada**: nueva pantalla accesible desde el menú principal
("📚 Glosario"). Lista todos los términos con `long`. Buscador básico.

**Lista mínima de términos a cubrir**:

XOR, AND/OR/NOT bitwise, MD5, SHA-1, SHA-256, bcrypt, argon2, hash, sal,
base64, hex, URL-encoding, regex, regex greedy/non-greedy, cookie, sesión,
JWT, Bearer token, CORS, CSRF, XSS, SQLi, prepared statement, parametrización,
sanitización, denylist, allowlist, SUID, sticky bit, cron, systemd, pcap,
TCP, UDP, three-way handshake, port (well-known/registered/ephemeral), TLS,
HTTPS, HTTP status codes (familias), IOC, YARA, Sigma, CVE, severity, threat
intel, SOC, blue team, red team, DFIR, triage, timeline, hash de evidencia,
chain of custody, sandbox, malware, dropper, persistence, C2, beacon,
exfiltration, breach, dump, brute force, dictionary attack, rainbow table,
typosquat, supply-chain attack, SBOM, Levenshtein, set, dict, comprehension,
lambda, decorator, generator.

### D) Teoría ampliada por nivel

Cada entrada de `theories.js` debe pasar a tener al menos 4 secciones:

```js
1: {
  title: "...",
  body: `<HTML actual>`,           // se mantiene como fallback
  // CAMPOS NUEVOS:
  concept_explained: `<HTML largo>`,   // sección 1: concepto desde cero
  syntax_examples: `<HTML largo>`,     // sección 2: 3+ ejemplos progresivos
  common_errors: `<HTML largo>`,       // sección 3: errores típicos
  why_here: `<HTML breve>`,            // sección 4: motivación del nivel
  prerequisites: [4, 5],               // ids de niveles que da por sabidos
  introduces: ["set.issubset", "list comprehension condicional"],
}
```

El `body` actual se descompone en estos campos. El renderizador del overlay
de teoría los concatena en orden y añade índice navegable arriba.

---

## 5. Estructura de datos nueva (cambios en `levels.js`)

A cada nivel se le añaden 2 campos opcionales:

```js
{
  id: 51, chapter: 9,
  title: "...",
  hint: "...",                    // SE MANTIENE — pasa a ser tier 4 (solución)
  // NUEVOS:
  strategy: "...",                // tier 2 — pseudocódigo en texto
  skeleton: "...",                // tier 3 — código con [TODO]
  // ...
}
```

Los niveles existentes quedan funcionales sin estos campos (la UI degrada
graciosamente: si no existe `strategy`, ese tier sale como "no disponible
para este nivel — intenta con teoría/solución").

---

## 6. Cambios en la UI

### Header del juego (donde están los corazones del cover meter)

Añadir 1 botón nuevo:

- 📚 / 📌 — toggle del modo cheatsheet (anclado vs modal). El icono refleja
  el estado actual.

### Panel de pistas (donde están "📖 teoría" y "💡 código")

Sustituir por 4 botones en fila:

```
[📖 Teoría]  [🧭 Estrategia]  [🪜 Esqueleto]  [💡 Solución]
```

Cada uno con estado visual:
- Disponible (color normal)
- Bloqueado (gris, candado, no clicable hasta revelar el anterior)
- Visto (check pequeño en la esquina)

### Cheatsheet anclado (modo `pinned`)

Panel lateral derecho, redimensionable. Usa la mecánica de splitters que ya
existe. Tres tabs internas (API / Stdlib / Sintaxis).

### Cheatsheet modal (modo `modal`)

Overlay que cubre 80% del viewport. Mismo contenido. Atajo `Ctrl+K` para
abrir, `Esc` para cerrar.

### Glosario — términos en intro/mission

Post-procesar el texto antes de inyectar al DOM. Aplicar regex sobre los
términos del glosario y envolver en `<span class="glossary-term">`. CSS:
`border-bottom: 1px dotted var(--cyan); cursor: help;`. Hover → tooltip.

### Página de glosario

Nueva pantalla en el menú principal con lista alfabética + buscador.

---

## 7. Plan de implementación por fases

### Fase 1 — Infraestructura (estimado: 6-10h código)

**Subfase 1.1 — Sistema de 4 tiers**:
- [ ] Modificar `index.html`: sustituir 2 botones de pista por 4
- [ ] Añadir CSS para los 4 estados (disponible/bloqueado/visto)
- [ ] Modificar `main.js`: lógica de revelado progresivo + persistencia
- [ ] Modificar `main.js`: `openHintOverlay(kind)` acepta los 4 kinds
- [ ] Comportamiento de fallback si un nivel no tiene `strategy` o
      `skeleton` (mensaje educado)

**Subfase 1.2 — Cheatsheet**:
- [ ] Crear `js/cheatsheet.js` con la estructura de datos vacía
- [ ] Añadir tab en `index.html` (modo anclado): nuevo splitter pane
- [ ] Añadir overlay en `index.html` (modo modal)
- [ ] Botón toggle en el header (al lado del cover meter)
- [ ] CSS para ambos modos
- [ ] Persistencia del modo en `localStorage`
- [ ] Atajo `Ctrl+K` para abrir el modal

**Subfase 1.3 — Glosario**:
- [ ] Crear `js/glossary.js` con la estructura de datos vacía
- [ ] Crear función `decorateGlossaryTerms(htmlString)` que envuelve
      términos
- [ ] Aplicar en intro/mission/diary del nivel + en intro overlay
- [ ] CSS para tooltips
- [ ] Nueva pantalla "📚 Glosario" en el menú principal con búsqueda

**Subfase 1.4 — Estructura de datos en niveles**:
- [ ] Añadir campos `strategy` y `skeleton` opcionales a cada nivel (vacíos
      al principio en los 56)
- [ ] Renombrar mentalmente: `hint` → tier 4 "solución"

### Fase 2 — Pilotos: Cap 0 + Cap 9 (estimado: 18-25h escritura)

**Cap 0** (niveles 1-5):
- [ ] L1: teoría ampliada + estrategia + esqueleto
- [ ] L2: ídem
- [ ] L3: ídem
- [ ] L4: ídem
- [ ] L5: ídem

**Cap 9** (niveles 51-56):
- [ ] L51: teoría completa (no existe) + estrategia + esqueleto
- [ ] L52: ídem
- [ ] L53: ídem
- [ ] L54: ídem
- [ ] L55: ídem
- [ ] L56 (examen — solo teoría conceptual, sin estrategia/esqueleto)

**Cheatsheet — contenido inicial**:
- [ ] API del juego (8 entradas)
- [ ] Stdlib mínimo: json, re, hashlib, base64, urllib.parse, collections,
      pathlib (7 módulos)
- [ ] Sintaxis: f-strings, comprehensions, slicing, sort+key, try/except,
      enumerate/zip/range, set ops, bitwise (8 secciones)

**Glosario — contenido inicial**:
- [ ] Cubrir los ~50 términos de la lista mínima en sección 4.C

### Fase 3 — Resto de capítulos (estimado: 30-40h escritura)

Para cada nivel del Cap 1-8:
- [ ] Teoría ampliada (si la actual es <800 caracteres, expandir)
- [ ] Estrategia (pseudocódigo)
- [ ] Esqueleto (código con TODOs)
- [ ] Verificar que el glosario cubre todos los términos que aparecen en el
      nivel (si aparece uno nuevo, añadir)

Orden recomendado para Fase 3:
1. **Cap 1** — base de programación; principio del salto.
2. **Cap 2** — el "abismo" identificado en el diagnóstico. Crítico.
3. **Cap 5** — segundo salto duro (cripto + bitwise).
4. **Cap 4** — defensa (regex avanzada + sets).
5. **Cap 3, 6, 7, 8** — completar.

---

## 8. Plantillas de calidad

### Plantilla de teoría ampliada (campo nuevo `concept_explained`)

```html
<h4>¿Qué es <strong>X</strong>?</h4>
<p>Definición desde cero, sin asumir conocimiento previo más allá de lo
visto en niveles previos (listados en `prerequisites`).</p>
<p>Cuándo aparece, en qué contexto del mundo real (auditor, dev, SOC...).</p>

<h4>Sintaxis básica</h4>
<pre><code>ejemplo mínimo (3-5 líneas)</code></pre>
<p>Explicación línea a línea de qué hace cada parte.</p>

<h4>Ejemplo progresivo</h4>
<pre><code>ejemplo más completo</code></pre>
<p>Por qué este ejemplo añade dificultad sobre el anterior.</p>

<h4>Patrón típico en seguridad</h4>
<pre><code>ejemplo aplicado al dominio del nivel</code></pre>
```

### Plantilla de errores típicos (`common_errors`)

```html
<h4>Errores comunes con <strong>X</strong></h4>
<dl>
  <dt>1. NombreDelError</dt>
  <dd>Cómo se manifiesta. Qué causa el error. Cómo arreglarlo.</dd>
  <dt>2. ...</dt>
</dl>
```

Mínimo 3 errores por concepto introducido.

### Plantilla de estrategia (`strategy`)

```
PASO 1 — Lo que tienes: enumera los datos de entrada del nivel.
PASO 2 — Lo que necesitas producir: salida esperada.
PASO 3 — Para cada elemento de los datos:
   3a. ...
   3b. ...
PASO 4 — Acumula resultado en una estructura que tenga sentido.
PASO 5 — Imprime con el formato exacto pedido en la misión.
```

Sin código Python. Todo lenguaje natural.

### Plantilla de esqueleto (`skeleton`)

```python
import [TODO: qué módulo necesitas]

DATOS = [TODO: ya están en el starterCode, no los redefinas]

resultado = []
for elemento in DATOS:
    # [TODO: comprobar condición — ¿qué buscas?]
    if [TODO]:
        # [TODO: añadir a resultado]
        resultado.append([TODO])

# [TODO: imprime con f-string el resumen]
print(f"...")
```

50% del código real, 50% TODOs. Los TODOs deben ser preguntas concretas, no
"completa esto".

### Plantilla de entrada de cheatsheet

**API del juego**:
```
### scan_port(host, port)
**Devuelve**: "open" | "closed" | "filtered"

**Ejemplo**:
\`\`\`python
estado = scan_port("acme.local", 22)
if estado == "open":
    print("SSH disponible")
\`\`\`

**Notas**: Es una llamada simulada. En la realidad usarías socket.connect_ex
y latencias reales. La lógica del código sería idéntica.
```

**Stdlib**:
```
### hashlib
**Para qué**: hashing criptográfico (md5, sha1, sha256, sha512).

**Funciones clave**:
- `hashlib.md5(bytes_input)` — objeto hasher
- `.hexdigest()` — el hash como string hex
- `.digest()` — el hash como bytes

**Ejemplo**:
\`\`\`python
import hashlib
h = hashlib.md5(b"hello").hexdigest()
# '5d41402abc4b2a76b9719d911017c592'
\`\`\`

**⚠ Aviso**: md5 y sha1 NO son seguros para passwords. Usa bcrypt/argon2.
```

**Sintaxis**:
```
### List comprehensions con condicional

**Sintaxis**:
\`\`\`python
[expr for item in iterable if condicion]
\`\`\`

**Ejemplos**:
\`\`\`python
# Solo puertos abiertos
abiertos = [p for p in puertos if scan_port(host, p) == "open"]

# Pares al cuadrado
pares_cuad = [n*n for n in range(20) if n % 2 == 0]
\`\`\`

**Equivalente expandido**:
\`\`\`python
abiertos = []
for p in puertos:
    if scan_port(host, p) == "open":
        abiertos.append(p)
\`\`\`

Cuando la condición es compleja o tienes múltiples acciones, mejor el for
expandido. Si es una transformación simple con filtro, el comprehension es
más Pythónico.
```

### Plantilla de entrada de glosario

```js
"XOR": {
  short: "OR exclusivo bit a bit: 1 si los bits son distintos, 0 si son iguales.",
  long: `<p>... explicación de 1-2 párrafos ...</p>
         <table>
           <tr><th>A</th><th>B</th><th>A^B</th></tr>
           <tr><td>0</td><td>0</td><td>0</td></tr>
           <tr><td>0</td><td>1</td><td>1</td></tr>
           <tr><td>1</td><td>0</td><td>1</td></tr>
           <tr><td>1</td><td>1</td><td>0</td></tr>
         </table>
         <p>Propiedad clave: <code>A ^ B ^ B == A</code>. Por eso XOR se usa
         en cifrados clásicos como clave reversible.</p>`,
  related: ["bitwise", "cifrado clásico"],
  seeAlso: { chapter: 5, level: 33 },
}
```

---

## 9. Estado actual

### Hecho

- [x] Auditoría de framing de niveles (5 ediciones aplicadas).
- [x] Cap 9 añadido (51-56) con framing defensivo.
- [x] Lock de progresión removido en main.js.
- [x] Diagnóstico pedagógico hecho.
- [x] Arquitectura validada por el usuario.
- [x] Este documento (PEDAGOGICAL_PLAN.md).
- [x] **Fase 1 — Infraestructura completa**:
  - [x] Sistema 4-tier en UI + lógica de revelado progresivo + persistencia
        en `localStorage` (clave: `pyhack_hints_seen_<id>`).
  - [x] Cheatsheet con dos modos (anclado / modal) controlados por toggle
        en el header. Tres pestañas (api/stdlib/syntax). Splitter para el
        panel anclado. Atajo `Ctrl+K` para abrir modal.
  - [x] Glosario: decorador `decorateGlossaryTerms()` aplicado a mission e
        intro overlay. Tooltip flotante. Pantalla completa accesible desde
        el menú principal con buscador y agrupación alfabética.
  - [x] Archivos nuevos creados: `js/cheatsheet.js`, `js/glossary.js` —
        ambos con estructura vacía y comentarios `[TODO Fase 2]`.
  - [x] Estructura de datos: campos `strategy` y `skeleton` opcionales
        ya soportados por el código (devuelven "no disponible" si faltan).

### Pendiente — Fase 1.4 (mínimo, no bloqueante)

- [ ] Añadir campos `strategy` y `skeleton` (string vacío) a los niveles
      ya implementados. Opcional: el sistema ya degrada gracioso si faltan.

### Fase 2 (pilotos) — PARCIALMENTE COMPLETA

- [x] **Cheatsheet** — contenido completo (26 entradas):
      - 8 APIs del juego (scan_port, fetch_banner, dns_lookup, fetch_url,
        socket_request, bash, parse_pcap, reset_http_session).
      - 7 stdlib (json, re, hashlib, base64, urllib.parse, collections, pathlib).
      - 11 sintaxis Python (f-strings, comprehensions, slicing, sort+key,
        try/except, with, iter helpers, set ops, bitwise, args/kwargs,
        chained compare).
- [x] **Glosario** — 73 términos cubriendo:
      - Cripto: XOR, MD5, SHA-1, SHA-256, bcrypt, argon2, hash, sal, base64,
        hex, URL encoding, cifrado clásico, bitwise.
      - Web/HTTP: cookie, sesión, JWT, Bearer token, CORS, CSRF, XSS, SQLi,
        prepared statement, parametrización, sanitización, denylist, allowlist.
      - Forense/Linux: SUID, sticky bit, cron, systemd.
      - Red: pcap, TCP, UDP, three-way handshake, well-known port, TLS, HTTPS,
        HTTP status codes.
      - Threat intel/IR: IOC, YARA, Sigma, CVE, severity, threat intel, SOC,
        blue team, red team, DFIR, triage, timeline, chain of custody, sandbox,
        malware, dropper, persistence, C2, beacon, exfiltration, breach, dump,
        brute force, dictionary attack, rainbow table, typosquat, supply-chain,
        SBOM, Levenshtein.
      - Python: set, dict, comprehension, lambda, decorator, generator.
- [x] **Cap 0** — strategy + skeleton añadidos a L1, L2, L3, L4 (L5 examen).
- [x] **Cap 9** — teoría completa (escrita desde cero) para L51-L56 + strategy
      y skeleton para L51-L55 (L56 examen).

### Fase 3 — COMPLETA

- [x] Cap 1 (L6-12): strategy + skeleton para los 6 no-examen.
- [x] Cap 2 (L13-18): teoría AMPLIADA (L14 regex 1614→5502 chars, L16
      clases 1637→5455) + strategy + skeleton para los 5 no-examen.
- [x] Cap 3 (L19-24): strategy + skeleton para los 5 no-examen.
- [x] Cap 4 (L25-30): strategy + skeleton para los 5 no-examen.
- [x] Cap 5 (L31-35): teoría AMPLIADA (L34 bitwise 1365→6227 chars) +
      strategy + skeleton para los 4 no-examen.
- [x] Cap 6 (L36-40): strategy + skeleton para los 4 no-examen.
- [x] Cap 7 (L41-46): strategy + skeleton para los 5 no-examen.
- [x] Cap 8 (L47-50): strategy + skeleton para los 3 no-examen.

**Cobertura total: 46/56 niveles con strategy + skeleton.** Los 10
restantes son exámenes (`is_exam: true`) — por diseño NO llevan pista.
Esto es el comportamiento esperado.

### Estado del proyecto pedagógico

El sistema completo está en producción:
- 4-tier hints funcionando en los 46 niveles no-examen.
- Cheatsheet con 26 entradas (8 API + 7 stdlib + 11 sintaxis).
- Glosario con 73 términos cubriendo cripto, web, forense, red, threat
  intel y Python — con tooltips inline + página dedicada.
- Toggle anclado/modal del cheatsheet en el header.
- Atajo Ctrl+K para abrir cheatsheet en cualquier momento.

No hay nada del plan original pendiente. Todo lo que aparecía en la sección
"Pendiente" original está hecho.

### Pendiente — Fase 2 (pilotos)

- [ ] Contenido completo Cap 0 (5 niveles)
- [ ] Contenido completo Cap 9 (6 niveles, sin teoría aún)
- [ ] Contenido inicial cheatsheet
- [ ] Contenido inicial glosario (~50 términos)

### Pendiente — Fase 3 (resto)

- [ ] Cap 1, 2, 5, 4, 3, 6, 7, 8 (en ese orden recomendado)

---

## 10. Cómo continuar este trabajo (si la sesión cambia de modelo o se reinicia)

Si tú (Claude futuro) lees este documento sin contexto previo:

1. **Lee** este documento entero.
2. **Lee** `README.md`, `js/chapters.js`, `js/levels.js` (al menos cabecera y
   un par de niveles para entender estructura), `js/theories.js` (al menos 3
   ejemplos), `js/main.js` (función `openHintOverlay`, `loadLevelByIndex`,
   `buildLevelSelectUI`).
3. **Comprueba** el estado en sección 9 — ¿qué tareas siguen abiertas?
4. **Pregunta al usuario** confirmación antes de empezar la siguiente
   subfase, en caso de que sus prioridades hayan cambiado. No empieces a
   reescribir teoría sin alinearse antes.
5. **Mantén** la heurística de seguridad de la sección 1 al añadir o
   modificar cualquier nivel.
6. **Actualiza** la sección 9 de este documento al cerrar cada subfase.

### Convenciones de estilo (para que el contenido sea consistente)

- Idioma: **español** (el usuario es hispanohablante).
- Tono: directo, técnico, pero accesible. Sin "vamos a", sin "como puedes
  ver". Frases cortas.
- Markdown / HTML: usa el HTML que ya está en `theories.js` como guía.
  Tags principales: `<p>`, `<h4>`, `<pre>`, `<code>`, `<ul>`, `<ol>`,
  `<dl>`, `<strong>`, `<em>`. Clases CSS de syntax highlight ya existentes:
  `kw`, `str`, `num`, `fn`, `com`.
- Ejemplos: siempre mostrar **input → output**. El alumno necesita ver el
  efecto.
- Errores: "vas a cometer este error", no "podrías cometer". Trato cercano.
- Nunca usar emojis decorativos en el contenido pedagógico (los iconos de
  los botones sí: 📖 🧭 🪜 💡 📚 son parte de la UI).

### Convenciones de seguridad (recordatorio)

Antes de añadir o modificar un nivel, comprobar contra heurística sección 1:

1. ¿Rol del alumno = auditor/QA/IR/forense/dev? Si no, revisar.
2. ¿Output = veredicto/métrica/reporte? Si no, revisar.
3. ¿Código fuera del mock = inerte? Si no, revisar.
4. ¿Verbo = detectar/auditar/validar/analizar? Si no, revisar.
5. ¿Toca DoS, phishing operativo, malware funcional? Si sí, NO se hace.

Si los 5 dan verde, adelante.

---

## 11. Referencia rápida — APIs del juego (para no tener que ir a `runner.js`)

```python
# Recon
scan_port(host, port)        # → "open" | "closed" | "filtered"
fetch_banner(host, port)     # → str (banner del servicio)
dns_lookup(domain)           # → list[str]

# HTTP
fetch_url(url, method="GET", data=None, headers=None)
                             # → HttpResponse(.status, .body, .headers,
                             #               .cookies, .json(), .text)
reset_http_session()         # → None (limpia cookies)

# Sockets
socket_request(host, port, payload="")
                             # → str | None

# Bash mockeado
bash(cmd)                    # → BashResult(.stdout, .stderr, .returncode)

# Pcap mockeado
parse_pcap()                 # → list[dict] con keys src_ip, dst_ip,
                             #   src_port, dst_port, protocol, length
```

---

**Fin del documento.** Próximo paso lógico: Fase 1.1 — modificar `index.html`
y `main.js` para soportar los 4 tiers de pista.
