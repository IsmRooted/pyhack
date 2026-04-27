# Política de seguridad y editorial

## Naturaleza del proyecto

PyHack es **material educativo** que enseña Python aplicado a ciberseguridad. Todo el contenido se ejecuta dentro del navegador del usuario, sobre datos sintéticos. **No realiza conexiones de red reales contra ningún sistema.**

## Vulnerabilidades en el código del juego

Si encuentras una vulnerabilidad real en el código del juego (XSS por contenido del usuario en localStorage, escape de Pyodide, exposición de algo que no debería, etc.), abre una *security advisory* privada en GitHub o un issue describiendo el problema sin publicar el exploit. Confirmamos en menos de una semana.

Vulnerabilidades en las dependencias externas (Pyodide, CodeMirror) deben reportarse a esos proyectos directamente.

## Heurística editorial — qué se acepta como contenido

Este proyecto mantiene una línea editorial estricta sobre qué tipo de niveles se incluyen. Es lo que separa "material didáctico de seguridad" de "material que entrena atacantes".

### ✅ Se acepta

Para CADA nivel nuevo, se aplican 5 criterios:

1. **Rol del alumno** = auditor, QA, IR, forense, dev, threat hunter. Nunca atacante operativo.
2. **Output** = veredicto, métrica, reporte, alerta. No secreto en claro (excepto si los datos son inequívocamente sintéticos/públicos).
3. **Código fuera del mock** = inerte. Si el código del alumno funcionara contra un sistema real, hay que reescribir.
4. **Verbo del enunciado** = detectar, auditar, validar, analizar, reportar. No exfiltrar / evadir / persistir.
5. **No toca línea dura** (ver abajo).

Los 5 deben dar verde. Si dan verde: hay que comprobar después que las 4 capas de pista (teoría/estrategia/esqueleto/solución) cumplen los mismos criterios.

### ❌ Línea dura — no readaptable, no se acepta

Categorías que NO tienen versión formativa válida en este proyecto:

- **DoS / DDoS funcional** (incluso "para entender el efecto"). Solo se acepta el lado defensivo: detección de patrones DoS en pcap/logs, rate limiting, mitigación arquitectónica.
- **Phishing operativo**: kits, plantillas convincentes, spoofing de marca. El lado defensivo (clasificadores, extracción de IOCs, awareness) sí se acepta.
- **Malware funcional escrito por el alumno**: droppers, RATs, ransomware, wipers. Sí se aceptan análisis estático/dinámico de muestras simuladas con datos ya capturados, escribir reglas YARA/Sigma, etc.
- **Evasión de detección con fines maliciosos**: anti-AV, ofuscación, anti-sandbox, anti-forense. Sí se acepta detección de TTPs de evasión.
- **Mass targeting**: paralelización contra rangos /16, fuzzing masivo de subdominios reales.
- **Supply-chain ofensivo**: typosquatting "pa'sembrar", dependency confusion. Sí se acepta detección de typosquats, audit de SBOM.
- **Credential stuffing operativo a escala**. Sí se acepta detección y mitigación de bruteforce.
- **Exploits funcionales contra software de terceros identificable**. Productos genéricos ficticios sí; "WordPress 6.4.x" o "Fortinet FortiOS" no.

### 📋 Patrón general — los tres ángulos formativos

Para cualquier técnica ofensiva, casi siempre se puede construir su versión formativa desde uno de estos tres ángulos:

1. **Detección** — "dado el rastro que deja esta técnica, escribe la regla/script que la encuentra".
2. **Forense** — "ya pasó, reconstruye qué hizo el atacante a partir de logs/disco/memoria".
3. **Mitigación** — "implementa el control que lo hubiera bloqueado".

Si una idea de nivel no encaja en ninguno de los 3, probablemente toca línea dura.

## Datos sintéticos — convenciones

Para mantener limpia la línea entre ficción y realidad:

- **Empresas / clientes ficticios** (`acme.local`, `northbank.local`, `shopstack.local`).
- **Productos genéricos** ("un servidor SMTP", "un CMS"), no marcas reales.
- **CVEs ficticias** con prefijo `CVE-EDU-XX-NNN`. Nunca CVEs reales con instrucciones explotativas.
- **IPs de documentación** (RFC 5737: `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`) y rangos privados (`10.x`, `192.168.x`, `172.16-31.x`).
- **Protocolos inventados** (`CALDERA-HANDSHAKE-V2`), no protocolos reales de C2 conocidos (Cobalt Strike, Sliver, Metasploit, etc.).

## Si tienes dudas

Antes de fusionar contenido nuevo, abre un issue describiendo el nivel y el ángulo. Mejor preguntar que aceptar algo que después haya que revertir.
