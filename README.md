# PyHack

> Aprende Python ofensivo desde cero — jugando.

PyHack es un juego educativo en navegador para aprender programación Python aplicada a ciberseguridad ofensiva, desde la sintaxis más básica hasta operaciones de pentesting completas. Todo el código del jugador se ejecuta en un sandbox dentro del navegador (Pyodide). **Cero conexiones reales** — todos los objetivos son simulados a partir de datos predefinidos por nivel.

Pensado como complemento práctico para alguien que se prepara OSCP o equivalente, o cualquiera que quiera aprender Python con un foco aplicado al campo.

---

## ⚠ Disclaimer ético

Todos los objetivos del juego son ficticios. Las funciones `scan_port`, `fetch_url`, `dns_lookup` y similares **NO realizan conexiones de red reales** — solo retornan datos hardcodeados por nivel.

PyHack es **material educativo**. Aplicar las técnicas mostradas contra sistemas reales sin autorización escrita es ilegal en la mayoría de jurisdicciones. El pentesting profesional requiere:

- Formación específica (cursos, libros, labs como HTB / THM / PortSwigger).
- Certificaciones reconocidas (OSCP, CRTO, eJPT, CEH, etc.).
- Autorización legal explícita (contrato firmado) del propietario del sistema antes de cualquier prueba.

---

## Estado actual

| Capítulo | Tema | Estado |
|----------|------|--------|
| 0 | Onboarding técnico (Python fundamentos) | ✓ Jugable (5 ops) |
| 1 | Reconocimiento básico | ✓ Jugable (7 ops) |
| 2 | Análisis de servicios | En desarrollo |
| 3 | Web Hacking I — HTTP / APIs | En desarrollo |
| 4 | Web Hacking II — Vulnerabilidades clásicas | En desarrollo |
| 5 | Cripto y datos | En desarrollo |
| 6 | Red y protocolos | En desarrollo |
| 7 | Post-explotación + Bash | En desarrollo |
| 8 | Operación final | En desarrollo |

Total previsto: **50 operaciones en 9 capítulos · 8 evaluaciones internas**.

---

## Conceptos cubiertos hasta hoy

**Capítulo 0** — `print`, comentarios, variables, f-strings, operadores aritméticos, conversión de tipos (`str()`), listas, `for in lista`, `len()`, `enumerate()`.

**Capítulo 1** — `scan_port` (mock), `for` sobre lista de puertos, `if`/`else`/`==` para filtrar, list comprehensions, diccionarios + `.items()`, funciones (`def` con argumentos + `return`), `import` de la librería estándar, `json.dumps(indent=2)`.

---

## Cómo jugar

Necesitas un navegador moderno (Chrome, Firefox, Edge, Safari recientes) y Python instalado para servir los archivos por HTTP. Pyodide requiere CORS, así que abrir el `index.html` directamente con `file://` no funciona.

```bash
git clone https://github.com/IsmRooted/pyhack.git
cd pyhack
python3 -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000). La primera carga descarga Pyodide (~10 MB) y tarda 5-15 segundos. Las siguientes son instantáneas (caché del navegador).

---

## Cómo está hecho

- **Vanilla** HTML / CSS / JavaScript. Sin frameworks, sin build step, sin dependencias instalables.
- [**Pyodide**](https://pyodide.org/) — Python 3 ejecutándose en el navegador vía WebAssembly. Trae casi toda la stdlib (`json`, `re`, `hashlib`, `base64`, `socket`, `ipaddress`…).
- [**CodeMirror 5**](https://codemirror.net/5/) — editor de código con resaltado Python.
- **Mocks de red** — funciones JavaScript expuestas a Python que simulan herramientas de pentesting con datos deterministas por nivel. Sin red real.

### Mecánicas

- **Editor + ejecutar** — escribes Python, pulsas `▶` o `Ctrl+Enter`.
- **Mapa de red** — muestra hosts y servicios descubiertos según vas escaneando.
- **Terminal** — output de tus `print()` y errores de Python.
- **Cover meter** — equivalente a "vidas". Cada error de Python te quema 1 punto. A 0 → checkpoint. Recargas pasando exámenes y con VPN burners.
- **Ayuda en dos niveles** — primero teoría (concepto sin código), después pista de código. Los exámenes no permiten ninguna.
- **Solución de referencia** — disponible tras completar (colapsada). Para comparar, no para copiar.
- **Splitters arrastrables** — los 4 paneles se redimensionan a tu gusto.
- **Persistencia local** — progreso, código por nivel y preferencias en `localStorage`. Sin cuentas, sin servidor.

---

## Estructura del repo

```
pyhack/
├── index.html              # menú + pantallas + overlays
├── style.v7.css            # estilos
└── js/
    ├── chapters.js         # definición de los 9 capítulos
    ├── levels.js           # 50 operaciones (Cap 0+1 implementadas, resto stubs)
    ├── theories.js         # teoría por nivel (sin código)
    ├── tutorial.js         # manual técnico, cómo jugar, briefing narrativo
    ├── mocks.js            # APIs simuladas (scan_port, fetch_url, …)
    ├── network-map.js      # render del mapa de red
    ├── terminal.js         # render del terminal
    ├── game.js             # motor: vidas, restricciones, win checks
    ├── runner.js           # carga Pyodide y ejecuta código del jugador
    └── main.js             # pantallas, persistencia, toggles, splitters
```

---

## Filosofía pedagógica

PyHack está diseñado para que **escribas tú el código**, no para copiar:

- Los starters son comentarios con la misión, **nunca solución**.
- La pista tiene dos niveles: primero teoría sin código, después código solo si insistes.
- La solución de referencia se muestra después de ganar, colapsada por defecto.
- Cada nivel valida que **uses el concepto enseñado** (regex sobre tu código), no solo que llegues al output.
- Los exámenes (cada 5 niveles) tienen restricciones técnicas (líneas máximas, operadores requeridos) y bloquean toda la ayuda.

---

## Roadmap

- Implementar Caps 2-8 con la misma profundidad que Caps 0-1.
- Añadir mocks para HTTP, sockets simulados, base64/hashing aplicado, parsing de pcap-en-JSON, Bash básico.
- Sistema de "informe final" automático generable desde el código del jugador.
- Modo libre / sandbox para experimentar fuera de los niveles.

---

## Licencia

[MIT](LICENSE) — usa, modifica, redistribuye.

---

## Inspirado por

- La idea visual de [CodeCombat](https://codecombat.com/) — programar como mecánica central de un juego.
- La forma de pentesting de [HackTheBox](https://www.hackthebox.com/), [TryHackMe](https://tryhackme.com/) y los retos CTF en general.
- Los recursos clásicos del campo (libros, labs, certificaciones) para guiar el orden de los conceptos enseñados.
