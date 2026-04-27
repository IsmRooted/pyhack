# PyHack

> Aprende Python aplicado a ciberseguridad — jugando.

PyHack es un juego educativo en navegador para aprender Python con un foco aplicado a seguridad: recon mockeado, HTTP, defensa de aplicaciones web, cripto clásica, análisis de tráfico, forense de host, respuesta a incidentes y detección defensiva.

Todo el código del jugador se ejecuta en un sandbox dentro del navegador (Pyodide). **Cero conexiones reales** — todos los objetivos son simulados a partir de datos predefinidos por nivel. Sin servidor, sin cuentas, sin telemetría.

Pensado como complemento práctico para cualquiera que quiera aprender Python con un foco aplicado al campo de la seguridad — útil tanto antes de meterse en plataformas tipo HackTheBox / TryHackMe / PortSwigger como para reforzar la parte de scripting de cara a certificaciones (OSCP, eJPT, BTL1, GCFA, etc.).

---

## ⚠ Disclaimer ético

Todos los objetivos del juego son ficticios. Las funciones `scan_port`, `fetch_url`, `dns_lookup`, `socket_request`, `bash`, `parse_pcap` y similares **NO realizan conexiones reales** — solo retornan datos hardcodeados por nivel.

PyHack es **material educativo**. Aplicar técnicas similares contra sistemas reales sin autorización escrita es ilegal en la mayoría de jurisdicciones. El pentesting profesional requiere:

- Formación específica (cursos, libros, labs como HTB / THM / PortSwigger).
- Certificaciones reconocidas (OSCP, CRTO, eJPT, BTL1, GCFA, CEH, etc.).
- Autorización legal explícita (contrato firmado) del propietario del sistema antes de cualquier prueba.

El proyecto no enseña — y no pretende enseñar — técnicas operativas ofensivas reutilizables contra sistemas reales: el foco está en **detección, auditoría, forense y defensa**, con escenarios ofensivos solo en CTF-style sobre infraestructura ficticia. Ver `docs/PEDAGOGICAL_PLAN.md` para los criterios editoriales.

---

## Estado actual

Todos los capítulos jugables. **56 operaciones** distribuidas en 10 capítulos, 10 evaluaciones internas (una por capítulo).

| Cap | Tema | Operaciones |
|-----|------|-------------|
| 0 | Onboarding técnico — Python fundamentos | 5 |
| 1 | Reconocimiento básico (mockeado) | 7 |
| 2 | Análisis de servicios (regex, clases, try/except, archivos) | 6 |
| 3 | HTTP y APIs — auditoría web autorizada simulada | 6 |
| 4 | Defensa de aplicaciones web (validación, audit logs, headers, authz) | 6 |
| 5 | Cripto clásica y codificaciones (base64, hashes, César/XOR, bitwise) | 5 |
| 6 | Red y protocolos (sockets, pcap, HTTP a mano, anomalías) | 5 |
| 7 | Forense y respuesta a incidentes (triage, logs, hashing, timeline) | 6 |
| 8 | Operación final — blue team contra APT | 4 |
| 9 | Detección y análisis defensivo (YARA-lite, typosquat, IOCs, CVE audit, Sigma-lite) | 6 |

---

## Cómo jugar

Necesitas un navegador moderno (Chrome, Firefox, Edge, Safari recientes) y Python instalado para servir los archivos por HTTP. Pyodide requiere CORS, así que abrir el `index.html` directamente con `file://` no funciona.

```bash
git clone https://github.com/IsmRooted/pyhack.git
cd pyhack
python3 -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000). La primera carga descarga Pyodide (~10 MB desde CDN) y tarda 5-15 segundos. Las siguientes son instantáneas (caché del navegador).

---

## Sistema pedagógico

Cada nivel proporciona **4 capas de pista** revelables progresivamente — el alumno solo desbloquea la siguiente cuando consulta la anterior:

1. 📖 **Teoría** — concepto Python desde cero, ejemplos progresivos, errores típicos.
2. 🧭 **Estrategia** — pseudocódigo paso a paso, sin sintaxis Python.
3. 🪜 **Esqueleto** — código con huecos `# [TODO: ...]` para rellenar.
4. 💡 **Solución** — código completo comentado.

Además:

- **📚 Cheatsheet** (Ctrl+K) — referencia rápida con 26 entradas: APIs del juego, stdlib usada (`json`, `re`, `hashlib`, `base64`, `urllib.parse`, `collections`, `pathlib`) y sintaxis Python esencial.
- **🔤 Glosario** (botón en menú) — 73 términos técnicos cubriendo cripto, web, forense, red, threat intel y Python. Aparecen subrayados en briefings y al hacer hover muestran tooltip.
- **Solución de referencia** se muestra después de ganar, colapsada por defecto.
- **Exámenes** (uno por capítulo) tienen restricciones técnicas (líneas máximas, operadores requeridos) y bloquean todas las pistas.

---

## Cómo está hecho

- **Vanilla** HTML / CSS / JavaScript. Sin frameworks, sin build step, sin dependencias `npm`.
- [**Pyodide**](https://pyodide.org/) (CDN) — Python 3 ejecutándose en el navegador vía WebAssembly. Trae casi toda la stdlib.
- [**CodeMirror 5**](https://codemirror.net/5/) (CDN) — editor de código con resaltado Python.
- **Mocks de red** — funciones JavaScript expuestas a Python que simulan herramientas con datos deterministas por nivel. Sin red real.

### Mecánicas

- **Editor + ejecutar** — escribes Python, pulsas `▶` o `Ctrl+Enter`.
- **Mapa de red** — hosts y servicios descubiertos según vas escaneando.
- **Terminal** — output de tus `print()` y errores de Python.
- **Cover meter** ❤ — equivalente a "vidas". Cada error de Python te quema 1 punto. A 0 → checkpoint. Recargas pasando exámenes y con VPN burners 🛡. Desactivable con un toggle si quieres jugar sin presión.
- **Layout configurable** — los 4 paneles (briefing, editor, terminal, mapa) se redimensionan arrastrando los separadores. Bloquea el layout con 🔒 cuando lo tengas como te gusta. ↺ restaura los tamaños originales.
- **Persistencia local** — progreso, código por nivel y preferencias en `localStorage`. Sin cuentas, sin servidor, sin tracking.

### Atajos de teclado

| Atajo | Acción |
|---|---|
| `Ctrl+Enter` | Ejecutar el código |
| `Ctrl+K` | Abrir el cheatsheet |
| `Esc` | Cerrar overlay activo |
| `Enter` | Aceptar/avanzar en overlays modales |

---

## Estructura del repo

```
pyhack/
├── index.html              # menú + pantallas + overlays
├── style.v7.css            # estilos
├── README.md
├── LICENSE                 # MIT
├── docs/
│   └── PEDAGOGICAL_PLAN.md # documento de continuidad pedagógica
└── js/
    ├── chapters.js         # definición de los 10 capítulos
    ├── levels.js           # 56 operaciones con teoría/estrategia/esqueleto/solución
    ├── theories.js         # teoría HTML por nivel
    ├── cheatsheet.js       # contenido del cheatsheet (API/stdlib/sintaxis)
    ├── glossary.js         # diccionario de términos + decorador de tooltips
    ├── tutorial.js         # manual técnico, briefing narrativo
    ├── mocks.js            # APIs simuladas expuestas a Python
    ├── network-map.js      # render del mapa de red
    ├── terminal.js         # render del terminal
    ├── game.js             # motor: vidas, restricciones, win checks
    ├── runner.js           # carga Pyodide y ejecuta código del jugador
    └── main.js             # pantallas, persistencia, toggles, splitters
```

---

## Filosofía pedagógica

PyHack está diseñado para que **escribas tú el código**, no para copiar:

- Los `starterCode` solo contienen los **datos predefinidos** que el nivel necesita y un recordatorio breve. Nunca pasos numerados ni nombres de funciones.
- Las pistas escalan: si la teoría no basta, prueba la estrategia; si no, el esqueleto; la solución completa es último recurso.
- Cada nivel valida que **uses el concepto enseñado** (regex sobre tu código), no solo que llegues al output correcto.
- Los exámenes tienen restricciones técnicas (líneas máximas, operadores/funciones requeridos) y bloquean toda la ayuda.

Detalles del sistema en [`docs/PEDAGOGICAL_PLAN.md`](docs/PEDAGOGICAL_PLAN.md).

---

## Para contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md). Especialmente importante: si añades o modificas niveles, sigue la **heurística de seguridad** documentada (sección 1 de `docs/PEDAGOGICAL_PLAN.md` y resumen en [SECURITY.md](SECURITY.md)).

Pulls bienvenidos para:

- Más términos en el glosario.
- Más entradas en el cheatsheet (especialmente sintaxis avanzada).
- Niveles puente entre capítulos para suavizar las curvas de dificultad.
- Traducciones (la primera versión es solo en español).

---

## Roadmap

- **Modo libre / sandbox** — pantalla para escribir Python sin nivel asignado, con todas las APIs disponibles.
- **Cap 10** posible — programación segura, cripto moderna o RE de binarios didácticos. Por decidir.
- **Mensajes de error mejorados** — sugerencias contextuales tipo "¿quisiste decir `fetch_url`?".
- **Estadísticas por nivel** (intentos, tier de pista usado).

---

## Licencia

[MIT](LICENSE) — usa, modifica, redistribuye.

---

## Inspirado por


- La forma de [HackTheBox](https://www.hackthebox.com/), [TryHackMe](https://tryhackme.com/) y los retos CTF en general — escenarios autorizados sobre infraestructura ficticia.
- Los recursos clásicos del campo (libros, labs, certificaciones) para guiar el orden de los conceptos enseñados.
