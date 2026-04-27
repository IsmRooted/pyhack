// PyHack — Glosario de términos técnicos.
//
// Una sola fuente de datos, dos consumidores:
//   - Tooltips inline: post-procesa intro/mission/diary y rodea términos
//     con <span class="glossary-term">. Hover muestra `short`.
//   - Página de glosario: lista alfabética con `long`, accesible desde menú.
//
// FORMATO DE ENTRADA:
//   "TERMINO_O_FRASE": {
//     short: "Una frase de explicación (≤120 chars).",
//     long: `<HTML>...</HTML>`,        // explicación amplia para la página
//     related: ["otro-termino", ...],   // opcional
//     seeAlso: { chapter: 5, level: 33 } // opcional, dónde se profundiza
//   }
//
// IMPORTANTE: las claves son case-insensitive en el match. El decorador
// busca todas las apariciones del término (palabra completa).

const GLOSSARY = {
  // ============================================================
  // CRIPTO Y CODIFICACIÓN
  // ============================================================
  "XOR": {
    short: "OR exclusivo bit a bit: 1 si los bits son distintos, 0 si son iguales.",
    long: `<p>Operación binaria fundamental. En Python es el operador
    <code>^</code>.</p>
    <table style="font-family:var(--font-mono);font-size:12px;">
      <tr><th>A</th><th>B</th><th>A^B</th></tr>
      <tr><td>0</td><td>0</td><td>0</td></tr>
      <tr><td>0</td><td>1</td><td>1</td></tr>
      <tr><td>1</td><td>0</td><td>1</td></tr>
      <tr><td>1</td><td>1</td><td>0</td></tr>
    </table>
    <p>Propiedad clave: <code>A ^ B ^ B == A</code>. Aplicar XOR con la misma
    clave dos veces deshace la operación. Por eso XOR aparece en cifrados
    clásicos (cifrado simétrico mínimo) y en checksums.</p>
    <p>Aviso: el XOR con clave de un solo byte es trivialmente rompible
    (256 combinaciones). Solo es seguro si la clave es del mismo tamaño que
    el mensaje y aleatoria (one-time pad).</p>`,
    related: ["bitwise", "cifrado clásico"],
    seeAlso: { chapter: 5, level: 33 },
  },
  "bitwise": {
    short: "Operaciones bit a bit sobre enteros: AND (&), OR (|), XOR (^), NOT (~), shifts (<<, >>).",
    long: `<p>Trabajan con la representación binaria del número, no con su
    valor decimal. Aparecen en permisos UNIX, flags de protocolos de red
    (TCP, IP), criptografía, compresión.</p>
    <pre>0b1100 &amp; 0b1010 == 0b1000   # AND
0b1100 | 0b1010 == 0b1110   # OR
0b1100 ^ 0b1010 == 0b0110   # XOR
0b0011 &lt;&lt; 2     == 0b1100   # shift izquierda</pre>`,
    related: ["XOR"],
    seeAlso: { chapter: 5, level: 34 },
  },
  "MD5": {
    short: "Función hash de 128 bits, OBSOLETA para passwords (rompible en milisegundos).",
    long: `<p>Algoritmo de hashing diseñado en 1991. Produce un hash de
    128 bits (32 caracteres hex). Hoy se considera <strong>cryptographically
    broken</strong> para cualquier uso de seguridad: existen colisiones
    conocidas y se rompe trivialmente con wordlists o GPU.</p>
    <p><strong>Usos aceptables hoy</strong>: identificadores de archivos
    (no de seguridad), checksums no críticos, hash de evidencia forense
    cuando la integridad la garantiza otro mecanismo.</p>
    <p><strong>NO usar para</strong>: passwords, firmas, integridad
    crítica.</p>`,
    related: ["hash", "SHA-1", "bcrypt"],
    seeAlso: { chapter: 5, level: 32 },
  },
  "SHA-1": {
    short: "Hash de 160 bits, también obsoleto. Roto desde 2017 (colisión 'SHAttered').",
    long: `<p>Hash criptográfico de 1995, sustituido por SHA-2. En 2017 Google
    publicó la primera colisión práctica (proyecto SHAttered). Cualquier uso
    de seguridad debe migrar a SHA-256 o superior.</p>`,
    related: ["MD5", "SHA-256", "hash"],
  },
  "SHA-256": {
    short: "Hash de 256 bits de la familia SHA-2. Estándar actual de la industria.",
    long: `<p>Parte de la familia SHA-2 publicada por NIST en 2001. Hash de
    256 bits, sin colisiones conocidas, considerado seguro para integridad
    y firmas. Es el hash por defecto en Bitcoin, certificados TLS modernos,
    y la mayoría de hashes de evidencia forense actuales.</p>
    <p><strong>Para passwords</strong>: incluso SHA-256 es demasiado rápido.
    Usa bcrypt o argon2.</p>`,
    related: ["hash", "SHA-1", "bcrypt"],
  },
  "bcrypt": {
    short: "Función de hashing de passwords lenta a propósito y con sal incorporada.",
    long: `<p>Diseñada en 1999 (Provos &amp; Mazières). Usa el algoritmo
    Blowfish con un parámetro de coste configurable: hace que cada hash tarde
    cientos de milisegundos en computar, lo que hace inviables los ataques de
    diccionario a gran escala.</p>
    <p>La sal va incrustada en el output del hash, así que no hay que
    almacenarla aparte. Un hash bcrypt típico:
    <code>$2b$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy</code></p>`,
    related: ["argon2", "hash", "sal"],
  },
  "argon2": {
    short: "Sucesor moderno de bcrypt. Ganador del Password Hashing Competition (2015).",
    long: `<p>Función KDF moderna diseñada para resistir ataques tanto por
    GPU como por ASIC, usando memoria de forma intensiva. Para passwords
    nuevas en 2026, argon2id es la recomendación de OWASP.</p>`,
    related: ["bcrypt", "hash"],
  },
  "hash": {
    short: "Función que convierte input arbitrario en output de tamaño fijo, no reversible.",
    long: `<p>Propiedades de un hash criptográfico:</p>
    <ul>
      <li><strong>Determinista</strong>: mismo input → mismo output siempre.</li>
      <li><strong>Una vía</strong>: no hay forma eficiente de recuperar el
      input a partir del hash (no se puede "descifrar").</li>
      <li><strong>Avalanche</strong>: cambiar 1 bit del input cambia muchísimos
      bits del output.</li>
      <li><strong>Resistencia a colisiones</strong>: encontrar dos inputs con
      mismo hash es computacionalmente inviable.</li>
    </ul>
    <p>Usos: integridad de ficheros, identificación, indexación, hashing de
    passwords (con sal y función lenta).</p>`,
    related: ["MD5", "SHA-256", "sal", "bcrypt"],
  },
  "sal": {
    short: "Valor aleatorio que se concatena al password antes de hashear, para invalidar rainbow tables.",
    long: `<p>Sin sal, dos usuarios con el mismo password tienen el mismo hash,
    y se pueden romper a la vez con una tabla precomputada (rainbow table).
    Con sal única por usuario, cada hash es distinto y la tabla precomputada
    no sirve.</p>
    <p>bcrypt y argon2 generan sal automática. Si usas sha256 (no recomendado)
    tendrías que añadir tu propia sal aleatoria por usuario.</p>`,
    related: ["bcrypt", "rainbow table"],
  },
  "base64": {
    short: "Codificación que convierte bytes a 64 caracteres ASCII imprimibles. NO es cifrado.",
    long: `<p>Esquema para representar datos binarios en texto. Cualquiera
    con <code>base64.b64decode()</code> puede revertirlo.</p>
    <p>Si ves base64 "protegiendo" passwords o tokens en producción, es
    bandera roja inmediata: el atacante con acceso al string también lo es.</p>`,
    related: ["hex", "URL encoding"],
    seeAlso: { chapter: 5, level: 31 },
  },
  "hex": {
    short: "Notación base 16. Cada byte = 2 caracteres. Usado para representar hashes y bytes raw.",
    long: `<p>Caracteres 0-9 y a-f. Cada byte se representa con 2 caracteres
    hex. Un hash MD5 es 16 bytes = 32 hex chars; un SHA-256 es 32 bytes = 64.
    En Python: <code>bytes.fromhex(s)</code> y <code>b.hex()</code>.</p>`,
    related: ["base64"],
  },
  "URL encoding": {
    short: "Codifica caracteres especiales en URLs como %XX (ej: espacio → %20).",
    long: `<p>También llamado percent-encoding. Necesario porque las URLs
    no pueden contener ciertos caracteres (espacios, &lt;, &gt;, comillas).
    En Python: <code>urllib.parse.quote()</code> y <code>unquote()</code>.</p>`,
    related: ["base64", "hex"],
  },
  "cifrado clásico": {
    short: "Cifrados pre-modernos (César, Vigenère, XOR de byte único). Trivialmente rompibles.",
    long: `<p>Cifrados que no resisten análisis frecuencial o fuerza bruta
    sobre el espacio de claves. Se estudian para entender principios y por
    qué los cifrados modernos necesitan claves grandes y padding correcto.</p>
    <p>En PyHack: César (26 rotaciones brute force) y XOR de 1 byte (256 claves).</p>`,
    related: ["XOR"],
    seeAlso: { chapter: 5, level: 33 },
  },

  // ============================================================
  // WEB / HTTP
  // ============================================================
  "cookie": {
    short: "Pequeña pieza de datos que el servidor pide al navegador que guarde y reenvíe en cada petición.",
    long: `<p>Definidas por el header <code>Set-Cookie</code> en la respuesta.
    En cada petición posterior al mismo dominio, el navegador las envía en
    el header <code>Cookie</code>. Mecanismo principal de autenticación
    persistente en web.</p>
    <p>Atributos importantes: <code>HttpOnly</code> (no accesible desde JS),
    <code>Secure</code> (solo HTTPS), <code>SameSite</code> (mitiga CSRF).</p>`,
    related: ["sesión", "CSRF"],
    seeAlso: { chapter: 3, level: 22 },
  },
  "sesión": {
    short: "Estado de autenticación del usuario, identificado típicamente por una cookie de sesión.",
    long: `<p>Cuando haces login con éxito, el servidor te da un identificador
    (cookie de sesión) que el navegador adjunta a las siguientes peticiones.
    El servidor lo usa para saber que sigues siendo tú sin pedirte el password
    cada vez.</p>`,
    related: ["cookie", "JWT"],
    seeAlso: { chapter: 3, level: 22 },
  },
  "JWT": {
    short: "JSON Web Token. Token de autenticación firmado, autocontenido (header + payload + firma).",
    long: `<p>Tres partes separadas por puntos, codificadas en base64url:
    <em>header.payload.signature</em>. El servidor verifica la firma con su
    clave para confirmar que el token es legítimo.</p>
    <p>Permite stateless auth: el servidor no necesita guardar sesiones,
    confía en la firma del token.</p>
    <p>Aviso: el payload va base64-encoded, NO cifrado. Cualquiera puede
    leerlo. No metas datos sensibles ahí.</p>`,
    related: ["Bearer token", "cookie"],
  },
  "Bearer token": {
    short: 'Token enviado en el header Authorization: "Bearer XXXXX". Forma estándar para APIs.',
    long: `<p>Patrón de OAuth 2.0. El cliente envía el header
    <code>Authorization: Bearer &lt;token&gt;</code> en cada request.
    "Bearer" significa que el portador del token tiene los permisos —
    como un billete de tren.</p>
    <p>Por eso los tokens deben tratarse como passwords: si se filtran, el
    atacante puede usarlos sin necesidad del usuario.</p>`,
    related: ["JWT", "cookie"],
    seeAlso: { chapter: 3, level: 23 },
  },
  "CORS": {
    short: "Cross-Origin Resource Sharing. Mecanismo del navegador para permitir/bloquear peticiones entre dominios.",
    long: `<p>Por defecto, el navegador NO deja a un script de
    <code>app.com</code> hacer peticiones a <code>api.otro.com</code>. CORS
    es el mecanismo por el que el servidor declara qué orígenes puede
    consumirlo (header <code>Access-Control-Allow-Origin</code>).</p>`,
    related: ["CSRF"],
  },
  "CSRF": {
    short: "Cross-Site Request Forgery. Una web malintencionada hace al navegador del usuario ejecutar acciones en otra web donde está logueado.",
    long: `<p>Si vas logueado en <code>banco.com</code>, una web evil
    puede hacer un form que envíe una petición a <code>banco.com/transferir</code>
    aprovechando que tu cookie va automática. Mitigación: tokens CSRF
    aleatorios en cada formulario, atributo SameSite en cookies.</p>`,
    related: ["XSS", "cookie"],
  },
  "XSS": {
    short: "Cross-Site Scripting. Inyectar JavaScript malicioso en una web que otros usuarios verán.",
    long: `<p>Si una web no escapa el input del usuario antes de mostrarlo,
    un atacante puede inyectar <code>&lt;script&gt;</code> que se ejecuta
    cuando la víctima carga la página. Permite robar cookies, suplantar
    al usuario, leer datos.</p>
    <p>Mitigación: escapar/encodear todo output, Content-Security-Policy,
    cookies HttpOnly.</p>`,
    related: ["sanitización", "CSRF"],
  },
  "SQLi": {
    short: "SQL Injection. Inyectar SQL en parámetros del query para alterar la lógica del backend.",
    long: `<p>Si una app construye queries SQL concatenando input del usuario,
    el atacante puede romper la sintaxis e inyectar comandos. Ejemplo
    clásico: <code>' OR '1'='1</code>.</p>
    <p>Defensa real: <strong>prepared statements</strong> (parametrización).
    Nunca concatenes input en queries.</p>`,
    related: ["prepared statement", "parametrización"],
  },
  "prepared statement": {
    short: "Query SQL con placeholders en lugar de concatenación. Defensa real contra SQLi.",
    long: `<p>El driver SQL envía la query y los datos por separado. El motor
    sabe que los datos NO son código, así que cualquier intento de inyección
    se trata como string literal.</p>
    <pre>cur.execute("SELECT * FROM users WHERE name = %s", (nombre,))</pre>
    <p>NO es lo mismo que <code>"... WHERE name = '" + nombre + "'"</code>
    — esto último sigue siendo vulnerable.</p>`,
    related: ["SQLi", "parametrización"],
  },
  "parametrización": {
    short: "Pasar valores como parámetros separados de la query/comando, en lugar de concatenarlos.",
    long: `<p>Patrón general (no solo SQL): cualquier vez que construyas un
    comando con input externo (shell, query, regex…), pásalo como parámetro
    en lugar de string concatenado. Misma idea de prepared statement
    aplicada a otros contextos.</p>`,
    related: ["prepared statement", "SQLi"],
  },
  "sanitización": {
    short: "Limpiar/validar input para que no contenga caracteres peligrosos para el contexto donde se usará.",
    long: `<p>La sanitización es contextual: lo que es seguro en HTML no es
    seguro en SQL, y al revés. Mejor pensar en términos de
    <strong>encoding correcto al SALIR</strong> (escape al renderizar HTML,
    parametrización al ejecutar SQL) que de "limpiar al ENTRAR".</p>`,
    related: ["denylist", "allowlist", "XSS"],
  },
  "denylist": {
    short: "Lista de cosas prohibidas (todo lo demás permitido). Frágil: olvida casos.",
    long: `<p>Estrategia de filtrado por exclusión. Generalmente más débil
    que allowlist porque siempre puedes olvidar un caso (variantes de
    encoding, mayúsculas, equivalentes).</p>`,
    related: ["allowlist", "sanitización"],
  },
  "allowlist": {
    short: "Lista de cosas permitidas (todo lo demás prohibido). Más segura por defecto.",
    long: `<p>Estrategia de filtrado por inclusión: defines exactamente qué
    es válido. Cualquier input que no encaje se rechaza. Más restrictiva
    pero más segura por defecto que denylist.</p>`,
    related: ["denylist"],
  },

  // ============================================================
  // FORENSE / LINUX
  // ============================================================
  "SUID": {
    short: "Bit del filesystem Unix que hace que un binario se ejecute con los permisos del owner, no del usuario que lo lanza.",
    long: `<p>Permite a usuarios normales ejecutar acciones que requieren root
    (ej: <code>passwd</code> necesita modificar <code>/etc/shadow</code>).</p>
    <p>SUID en binarios inesperados (un script bash, un python custom) suele
    ser indicador de privilege escalation: el atacante deja un SUID para
    re-escalar más adelante.</p>`,
    related: ["sticky bit"],
    seeAlso: { chapter: 7, level: 44 },
  },
  "sticky bit": {
    short: "Bit que en directorios permite que solo el owner del fichero pueda borrarlo (ej: /tmp).",
    long: `<p>Útil en directorios compartidos donde varios usuarios pueden
    crear ficheros pero no deben poder borrar los de otros. <code>/tmp</code>
    típicamente lo tiene activado.</p>`,
    related: ["SUID"],
  },
  "cron": {
    short: "Programador de tareas de Unix. Ejecuta comandos en horarios definidos.",
    long: `<p>Configurado en <code>/etc/crontab</code>, <code>/etc/cron.d/</code>
    y crontabs por usuario. Sintaxis: <code>min hora día mes día-semana
    comando</code>. Mecanismo común de persistencia para malware (entrada
    en cron que vuelve a ejecutar el implant).</p>`,
    related: ["systemd", "persistence"],
  },
  "systemd": {
    short: "Sistema init y supervisor de procesos por defecto en Linux moderno.",
    long: `<p>Gestiona servicios (units) que se inician al boot y se
    supervisan en runtime. Las "user units" en
    <code>~/.config/systemd/user/</code> son otro mecanismo de persistencia
    que no requiere root.</p>`,
    related: ["cron", "persistence"],
  },

  // ============================================================
  // RED Y PROTOCOLOS
  // ============================================================
  "pcap": {
    short: "Packet capture. Formato binario para grabar tráfico de red (Wireshark, tcpdump).",
    long: `<p>Cada paquete capturado guarda timestamp, IPs, puertos, protocolo,
    headers y payload. Análisis offline con herramientas como
    <code>tshark</code>, <code>scapy</code>, <code>pyshark</code>.</p>`,
    related: ["TCP", "UDP"],
    seeAlso: { chapter: 6, level: 37 },
  },
  "TCP": {
    short: "Transmission Control Protocol. Protocolo orientado a conexión, fiable y ordenado.",
    long: `<p>Garantiza entrega, orden y control de flujo. Usado por HTTP,
    SSH, SMTP, FTP. Cada conexión empieza con un three-way handshake
    (SYN → SYN-ACK → ACK).</p>`,
    related: ["UDP", "three-way handshake"],
  },
  "UDP": {
    short: "User Datagram Protocol. Protocolo sin conexión, sin garantías, mínima latencia.",
    long: `<p>"Tira y olvida" — el remitente envía, el receptor recibe (o no),
    sin acuse. Usado por DNS, NTP, juegos, VoIP. Más rápido que TCP por
    ausencia de overhead.</p>`,
    related: ["TCP"],
  },
  "three-way handshake": {
    short: "Apretón de manos de 3 pasos para abrir una conexión TCP: SYN → SYN-ACK → ACK.",
    long: `<p>Cliente envía SYN. Servidor responde SYN-ACK. Cliente confirma
    con ACK. A partir de aquí pueden intercambiar datos. Un escaneo SYN
    "stealth" envía solo el primer paso para detectar puertos abiertos sin
    completar la conexión.</p>`,
    related: ["TCP"],
  },
  "well-known port": {
    short: "Puertos 0-1023, reservados para servicios estándar (22 SSH, 80 HTTP, 443 HTTPS…).",
    long: `<p>Definidos por IANA. Para escuchar en estos puertos en Linux
    necesitas root (o capability CAP_NET_BIND_SERVICE). Puertos 1024-49151
    son "registered", 49152-65535 son "ephemeral" (los usa el cliente
    automáticamente).</p>`,
    seeAlso: { chapter: 1, level: 6 },
  },
  "TLS": {
    short: "Transport Layer Security. Protocolo que cifra y autentica conexiones (sucesor de SSL).",
    long: `<p>Versión actual TLS 1.3 (2018). Establece un canal cifrado y
    autenticado entre cliente y servidor mediante certificados X.509.
    HTTPS = HTTP + TLS.</p>`,
    related: ["HTTPS"],
  },
  "HTTPS": {
    short: "HTTP sobre TLS. La versión cifrada del HTTP estándar.",
    long: `<p>En la URL aparece como <code>https://</code> y suele ir por el
    puerto 443. Garantiza confidencialidad, integridad y autenticación del
    servidor.</p>`,
    related: ["TLS"],
  },
  "HTTP status codes": {
    short: "Códigos de respuesta HTTP agrupados por familias: 1xx info, 2xx OK, 3xx redirect, 4xx client error, 5xx server error.",
    long: `<p>Los más comunes:</p>
    <ul>
      <li><code>200 OK</code></li>
      <li><code>301 Moved Permanently</code> / <code>302 Found</code> (redirect)</li>
      <li><code>400 Bad Request</code> (sintaxis mal)</li>
      <li><code>401 Unauthorized</code> (necesitas autenticarte)</li>
      <li><code>403 Forbidden</code> (autenticado pero sin permiso)</li>
      <li><code>404 Not Found</code></li>
      <li><code>500 Internal Server Error</code></li>
      <li><code>502 Bad Gateway</code> / <code>503 Service Unavailable</code></li>
    </ul>`,
    seeAlso: { chapter: 3, level: 19 },
  },

  // ============================================================
  // THREAT INTEL Y RESPUESTA A INCIDENTES
  // ============================================================
  "IOC": {
    short: "Indicator of Compromise. Pista observable que indica que un sistema está comprometido (hash, IP, dominio, registry key…).",
    long: `<p>Tipos típicos: hashes de ficheros, IPs/dominios C2, mutex names,
    registry keys, paths inusuales. Los IOCs se comparten entre orgs
    (MISP, OTX, ATT&amp;CK) para que otros detecten el mismo actor.</p>`,
    related: ["YARA", "Sigma", "C2"],
    seeAlso: { chapter: 9, level: 53 },
  },
  "YARA": {
    short: "Lenguaje de reglas para identificar familias de malware por patrones (strings, hexbytes, condiciones).",
    long: `<p>"The pattern matching swiss knife for malware researchers".
    Cada regla declara strings característicos y una condición lógica.
    Usado por VirusTotal, motores AV, sandboxes.</p>
    <pre>rule keylogger_generic {
  strings: $a = "GetAsyncKeyState"
           $b = "SetWindowsHookEx"
  condition: all of them
}</pre>`,
    related: ["Sigma", "IOC"],
    seeAlso: { chapter: 9, level: 51 },
  },
  "Sigma": {
    short: "Lenguaje YAML genérico para reglas de detección sobre logs (SIEM-agnóstico).",
    long: `<p>Permite escribir una regla una vez y traducirla automáticamente
    a Splunk SPL, Elastic KQL, Sentinel KQL, etc. Cubre detección de
    eventos: failed logons, lateral movement, log clearing, etc.</p>`,
    related: ["YARA", "IOC", "SOC"],
    seeAlso: { chapter: 9, level: 55 },
  },
  "CVE": {
    short: "Common Vulnerabilities and Exposures. ID único para cada vulnerabilidad pública conocida (CVE-AAAA-NNNN).",
    long: `<p>Sistema mantenido por MITRE. Cada CVE tiene descripción, productos
    afectados, severidad (CVSS) y referencias. La base de datos pública es
    NVD (NIST). Auditoría de dependencias = cruzar versiones instaladas
    contra el feed CVE.</p>`,
    related: ["severity", "supply-chain"],
    seeAlso: { chapter: 9, level: 54 },
  },
  "severity": {
    short: "Nivel de gravedad de un hallazgo: critical / high / medium / low / info.",
    long: `<p>En CVE/CVSS se calcula con vectores numéricos. En reportes
    operativos suele ser estimación del analista. Buena práctica: ordenar
    los hallazgos del reporte por severidad descendente.</p>`,
    related: ["CVE"],
  },
  "threat intel": {
    short: "Inteligencia de amenazas: información estructurada sobre atacantes, TTPs, IOCs.",
    long: `<p>Abreviado TI o CTI (Cyber Threat Intelligence). Se distribuye
    en feeds (MISP, OTX, comerciales) y se cruza con telemetría propia para
    detectar amenazas conocidas en la red.</p>`,
    related: ["IOC", "SOC"],
  },
  "SOC": {
    short: "Security Operations Center. Equipo (humano + tecnología) que monitoriza y responde a incidentes en una organización.",
    long: `<p>Niveles típicos: L1 triage de alertas, L2 análisis profundo,
    L3 caza y forense. Trabajan con SIEM (Splunk, Sentinel, Elastic),
    EDR, ticketing.</p>`,
    related: ["blue team", "DFIR"],
  },
  "blue team": {
    short: "Equipo defensivo: detecta, responde y se endurece contra ataques.",
    long: `<p>Contraparte del red team. En ejercicios "purple team" trabajan
    juntos: el rojo ataca con tácticas conocidas, el azul intenta
    detectarlas, los hallazgos se documentan para mejorar.</p>`,
    related: ["red team", "SOC", "DFIR"],
  },
  "red team": {
    short: "Equipo ofensivo autorizado: simula atacantes reales para probar la defensa.",
    long: `<p>A diferencia de un pentest tradicional (busca todas las vulns),
    el red team simula objetivos reales (acceder a un dato concreto,
    persistir en la red) con TTPs realistas. Mide efectividad del blue team,
    no solo presencia de vulns.</p>`,
    related: ["blue team"],
  },
  "DFIR": {
    short: "Digital Forensics and Incident Response. Disciplina de investigar incidentes y reconstruir lo ocurrido.",
    long: `<p>Combina forense (recoger y analizar evidencia preservando
    cadena de custodia) y respuesta (contener, erradicar, recuperar).
    Es el grueso del Cap 7-8 de PyHack.</p>`,
    related: ["triage", "timeline", "chain of custody"],
    seeAlso: { chapter: 7 },
  },
  "triage": {
    short: "Evaluación rápida inicial: qué pasó, qué activos están afectados, qué urgencia.",
    long: `<p>Primer paso de cualquier respuesta a incidente. Sin triage el
    equipo se ahoga investigando todo a la vez. Salida típica: lista
    priorizada de hosts a investigar primero.</p>`,
    related: ["DFIR"],
    seeAlso: { chapter: 7, level: 41 },
  },
  "timeline": {
    short: "Reconstrucción cronológica de eventos en un incidente, basada en logs, mtimes y otros artefactos.",
    long: `<p>Herramientas: <code>plaso/log2timeline</code> consolida cientos
    de fuentes (filesystem, eventlog, browser history, registry…) en un
    super-timeline. Esencial para entender la secuencia de un ataque.</p>`,
    related: ["DFIR"],
    seeAlso: { chapter: 7, level: 45 },
  },
  "chain of custody": {
    short: "Registro documental de cada paso por el que pasa una evidencia digital, para que sea admisible legalmente.",
    long: `<p>Quién recogió la evidencia, cuándo, con qué herramienta, hash
    en cada transferencia. Si la cadena se rompe, la evidencia puede ser
    rechazada en un proceso legal.</p>`,
    related: ["DFIR", "hash"],
  },
  "sandbox": {
    short: "Entorno aislado donde se detona malware o se ejecuta código no confiable sin riesgo para el host real.",
    long: `<p>Puede ser una VM (Cuckoo, Joe Sandbox), un container, o un
    sistema dedicado off-network. Se monitoriza qué hace el sample
    (procesos, ficheros, red) sin que afecte a producción.</p>`,
    related: ["malware"],
  },
  "malware": {
    short: "Software diseñado para hacer daño o ejecutar acciones no autorizadas.",
    long: `<p>Familias: virus, worms, trojans, droppers, ransomware,
    spyware, RATs, rootkits, wipers. La clasificación y atribución a una
    familia se hace con análisis estático (strings, imports) y dinámico
    (ejecución en sandbox).</p>`,
    related: ["dropper", "C2", "YARA"],
  },
  "dropper": {
    short: "Malware cuya única función es descargar y ejecutar la carga real (payload).",
    long: `<p>Suelen ser pequeños y poco detectables. La carga real se baja
    en runtime, lo que dificulta el análisis estático del fichero inicial.
    Patrón clásico: dropper en email → descarga RAT → C2.</p>`,
    related: ["malware", "C2"],
  },
  "persistence": {
    short: "Mecanismos que aseguran que el malware sobrevive a reboots y logins.",
    long: `<p>En Linux: cron, systemd units, .bashrc, init scripts, kernel
    modules. En Windows: registry Run keys, scheduled tasks, services,
    startup folders. La detección de persistencia es uno de los pilares
    forenses post-incidente.</p>`,
    related: ["cron", "systemd"],
  },
  "C2": {
    short: "Command and Control. Servidor del atacante que da órdenes al malware comprometido.",
    long: `<p>El malware se "registra" periódicamente con el C2 (beacon),
    el operador del C2 envía comandos (exfil, lateral movement,
    persistencia). Frameworks conocidos: Cobalt Strike, Sliver, Mythic,
    Empire (depending on era), Caldera (MITRE, también red-team).</p>`,
    related: ["beacon", "malware"],
    seeAlso: { chapter: 8, level: 47 },
  },
  "beacon": {
    short: "Mensaje periódico del malware al C2 para 'reportarse' y pedir comandos.",
    long: `<p>El intervalo (sleep) y la forma del beacon (DNS, HTTPS,
    Twitter, etc.) son un IOC clave. Patrones de beaconing regular son
    detectables estadísticamente.</p>`,
    related: ["C2"],
  },
  "exfiltration": {
    short: "Robar datos del sistema comprometido y sacarlos a la infraestructura del atacante.",
    long: `<p>Patrones de detección: volumen anómalo de salida, conexiones
    a destinos no habituales, compresión/cifrado de archivos antes del
    envío.</p>`,
    related: ["C2"],
  },
  "breach": {
    short: "Incidente en el que un atacante consigue acceso no autorizado a datos.",
    long: `<p>El término legal varía por jurisdicción (GDPR define data breach
    de forma estricta). Coloquialmente: cualquier acceso no autorizado.
    "Dump" se refiere a los datos exfiltrados publicados.</p>`,
    related: ["dump"],
  },
  "dump": {
    short: "Volcado de datos extraídos de un sistema (DB, memoria, ficheros).",
    long: `<p>"Database dump" típicamente publicado tras un breach: tabla
    users con emails y hashes de passwords. Los analistas auditan estos
    dumps para evaluar exposición sin atacar la integridad de los datos.</p>`,
    related: ["breach", "MD5"],
    seeAlso: { chapter: 5, level: 32 },
  },
  "brute force": {
    short: "Probar todas las combinaciones posibles hasta acertar (o agotar el espacio).",
    long: `<p>Funciona contra espacios pequeños (PIN de 4 dígitos = 10000
    intentos) o cifrados débiles. Mitigación: rate limiting, lockout,
    espacios de búsqueda grandes, funciones lentas (bcrypt).</p>`,
    related: ["dictionary attack"],
  },
  "dictionary attack": {
    short: "Brute force con una lista pre-armada de palabras probables (rockyou.txt, top10k passwords).",
    long: `<p>Mucho más eficiente que brute force ciego porque ataca primero
    los candidatos más probables. Cualquier password de la lista cae en
    milisegundos.</p>`,
    related: ["brute force", "rainbow table"],
  },
  "rainbow table": {
    short: "Tabla precomputada de hashes para invertir hash→password sin recomputar.",
    long: `<p>Aprovecha que sin sal, mismo password = mismo hash. Inutilizada
    por el uso de sal: con sal aleatoria por usuario, la tabla precomputada
    no sirve.</p>`,
    related: ["sal", "dictionary attack"],
  },
  "typosquat": {
    short: "Paquete malicioso publicado con nombre muy parecido a uno popular (reqeusts vs requests).",
    long: `<p>Ataque de cadena de suministro: el atacante publica
    <code>reqeusts</code> en PyPI (typo de <code>requests</code>) esperando
    que alguien lo instale por error. Detección con distancia lexicográfica
    (Levenshtein) contra whitelist de paquetes legítimos.</p>`,
    related: ["supply-chain", "Levenshtein"],
    seeAlso: { chapter: 9, level: 52 },
  },
  "supply-chain": {
    short: "Ataque a través de un componente confiable (paquete, librería, proveedor) que el target ya usa.",
    long: `<p>SolarWinds (2020), event-stream (npm 2018), xz (2024) son
    ejemplos famosos. Defensa: SBOM, version pinning, code review de
    actualizaciones, monitoring de cambios en deps.</p>`,
    related: ["typosquat", "SBOM"],
  },
  "SBOM": {
    short: "Software Bill of Materials. Inventario formal de todos los componentes de software de un sistema.",
    long: `<p>Formatos estándar: SPDX, CycloneDX. Permite responder rápido a
    "¿está este paquete vulnerable en mi infra?" cuando sale un CVE
    nuevo. Obligatorio en muchos contratos gubernamentales desde 2022.</p>`,
    related: ["CVE", "supply-chain"],
  },
  "Levenshtein": {
    short: "Distancia entre dos strings = mínimo de inserciones/borrados/sustituciones para convertir uno en otro.",
    long: `<p>Algoritmo clásico de programación dinámica (tabla DP de tamaño
    |a|×|b|). En seguridad: detección de typosquats, fuzzy matching de
    nombres en threat intel.</p>
    <p>"casa" vs "cosa": 1 (sustituir 'a' por 'o').<br>
    "kitten" vs "sitting": 3.</p>`,
    related: ["typosquat"],
    seeAlso: { chapter: 9, level: 52 },
  },

  // ============================================================
  // PYTHON / ESTRUCTURAS DE DATOS
  // ============================================================
  "set": {
    short: "Estructura de Python: colección de valores únicos, no ordenados, con operaciones de conjunto.",
    long: `<p>Útil para deduplicar, comprobar pertenencia rápido (O(1)),
    operaciones tipo álgebra de conjuntos (intersección, unión, diferencia).</p>
    <pre>s = {1, 2, 3}
s.add(4)
3 in s        # True (rapidísimo)
{1,2} &amp; s     # {1, 2}</pre>
    <p>Vacío: <code>set()</code> (no <code>{}</code>, eso es dict).</p>`,
    related: ["dict", "comprehension"],
  },
  "dict": {
    short: "Estructura clave→valor de Python. Búsqueda y inserción O(1) amortizado.",
    long: `<pre>d = {"host": "acme.local", "port": 22}
d["host"]            # 'acme.local'
d.get("missing", "default-val")
for k, v in d.items(): ...
"port" in d          # True</pre>
    <p>Las claves deben ser hashables (strings, ints, tuplas — pero no listas).</p>`,
    related: ["set"],
  },
  "comprehension": {
    short: "Sintaxis compacta para construir listas/dicts/sets a partir de un iterable.",
    long: `<pre>[x*2 for x in nums if x &gt; 0]   # list comprehension
{x: x*x for x in nums}            # dict comprehension
{p["src_ip"] for p in pcap}       # set comprehension</pre>
    <p>Más Pythónico que un for + append en casos simples. Para lógica
    compleja, mejor un for normal por legibilidad.</p>`,
    related: ["set", "dict"],
  },
  "lambda": {
    short: "Función anónima en una sola expresión. lambda args: expr.",
    long: `<p>Útil cuando necesitas pasar una función pequeña como argumento
    (sort, min, max, filter, map) sin definirla aparte.</p>
    <pre>sorted(items, key=lambda t: t[1])
max(palabras, key=len)
sorted(alertas, key=lambda a: SEV[a["severity"]])</pre>
    <p>Limitada a UNA expresión. Si necesitas más, usa <code>def</code>.</p>`,
    related: ["comprehension"],
  },
  "decorator": {
    short: "Función que envuelve otra función para añadir comportamiento (logging, caché, timing).",
    long: `<pre>@cache
def fib(n):
    return n if n &lt; 2 else fib(n-1) + fib(n-2)

# @cache es equivalente a:
fib = cache(fib)</pre>
    <p>Decoradores famosos de stdlib: <code>@functools.cache</code>,
    <code>@functools.lru_cache</code>, <code>@property</code>,
    <code>@classmethod</code>, <code>@staticmethod</code>.</p>`,
  },
  "generator": {
    short: "Función que produce valores bajo demanda con yield, sin construir la lista entera en memoria.",
    long: `<pre>def primeros_n(n):
    for i in range(n):
        yield i * i

# Solo computa cada cuadrado cuando se itera
for x in primeros_n(1000000):
    print(x)
    if x &gt; 100: break</pre>
    <p>Útil para streams grandes (logs, pcaps masivos) donde no quieres
    cargar todo en memoria.</p>`,
  },
};

// ----------------------------------------------------------------
// Decorador: envuelve apariciones de términos en HTML pre-renderizado
// ----------------------------------------------------------------

let _glossaryRegex = null;
function _buildGlossaryRegex() {
  const terms = Object.keys(GLOSSARY);
  if (terms.length === 0) { _glossaryRegex = null; return; }
  // Ordenar por longitud descendente para que "SHA-256" pille antes que "SHA"
  terms.sort((a, b) => b.length - a.length);
  // Escape de caracteres especiales regex
  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // \b funciona mal con guiones; usamos lookarounds simples
  _glossaryRegex = new RegExp('(?<![\\w-])(' + escaped.join('|') + ')(?![\\w-])', 'gi');
}
_buildGlossaryRegex();

/**
 * Toma un string (texto plano o HTML simple) y rodea las apariciones de
 * términos del glosario con <span class="glossary-term" data-term="...">.
 * Si el input es HTML, sólo decora dentro de nodos de texto (no rompe tags).
 */
function decorateGlossaryTerms(input) {
  if (!input || !_glossaryRegex) return input;
  // Detección naive: si parece HTML (tiene <tag>), decoramos por nodos.
  if (/<[a-z][\s\S]*>/i.test(input)) {
    return _decorateHtmlString(input);
  }
  // Texto plano: regex directa
  return input.replace(_glossaryRegex, (match) => {
    const canonical = _findCanonicalKey(match);
    return `<span class="glossary-term" data-term="${escAttr(canonical)}">${escHtml(match)}</span>`;
  });
}

function _decorateHtmlString(html) {
  // Parser muy simple: evitamos decorar dentro de <pre>, <code>, atributos.
  // Implementación: dividir por tags, decorar sólo los segmentos de texto.
  const parts = html.split(/(<[^>]+>)/g);
  let inSkip = 0;
  const SKIP_OPEN = /^<(pre|code|script|style)\b/i;
  const SKIP_CLOSE = /^<\/(pre|code|script|style)>/i;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.startsWith('<')) {
      if (SKIP_OPEN.test(p)) inSkip++;
      else if (SKIP_CLOSE.test(p)) inSkip = Math.max(0, inSkip - 1);
      continue;
    }
    if (inSkip > 0) continue;
    parts[i] = p.replace(_glossaryRegex, (match) => {
      const canonical = _findCanonicalKey(match);
      return `<span class="glossary-term" data-term="${escAttr(canonical)}">${escHtml(match)}</span>`;
    });
  }
  return parts.join('');
}

function _findCanonicalKey(match) {
  // Match insensitive a mayúsculas, devolvemos la clave canónica del dict.
  const low = match.toLowerCase();
  for (const k of Object.keys(GLOSSARY)) {
    if (k.toLowerCase() === low) return k;
  }
  return match;
}

function getGlossaryEntry(term) {
  return GLOSSARY[term] || GLOSSARY[_findCanonicalKey(term)] || null;
}

// ----------------------------------------------------------------
// Render de la pantalla completa (lista alfabética + búsqueda)
// ----------------------------------------------------------------

function renderGlossaryPage(filter = '') {
  const terms = Object.keys(GLOSSARY).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()));
  if (terms.length === 0) {
    return `<p><em>El glosario se rellenará en Fase 2 del plan pedagógico
      (~50 términos previstos). Mientras tanto, consulta la teoría de cada
      nivel desde el botón 📖 Teoría dentro del juego.</em></p>`;
  }
  const f = filter.trim().toLowerCase();
  const filtered = f
    ? terms.filter(t =>
        t.toLowerCase().includes(f) ||
        (GLOSSARY[t].short || '').toLowerCase().includes(f))
    : terms;

  if (filtered.length === 0) {
    return `<p>Sin resultados para "<code>${escHtml(filter)}</code>".</p>`;
  }

  // Agrupar por inicial
  const groups = {};
  filtered.forEach(t => {
    const ini = t[0].toUpperCase();
    (groups[ini] = groups[ini] || []).push(t);
  });

  return Object.keys(groups).sort().map(letter => `
    <section class="glossary-group">
      <h3 class="glossary-letter">${letter}</h3>
      ${groups[letter].map(t => {
        const e = GLOSSARY[t];
        return `<article class="glossary-entry" id="gl-${escAttr(t)}">
          <h4 class="glossary-term-title">${escHtml(t)}</h4>
          <p class="glossary-short">${e.short || ''}</p>
          ${e.long ? `<div class="glossary-long">${e.long}</div>` : ''}
          ${e.related && e.related.length ? `
            <p class="glossary-related">Relacionado:
              ${e.related.map(r => `<a href="#gl-${escAttr(r)}">${escHtml(r)}</a>`).join(', ')}
            </p>` : ''}
          ${e.seeAlso ? `<p class="glossary-seealso">
            Profundiza en Cap ${e.seeAlso.chapter}${e.seeAlso.level ? ` · OP-${String(e.seeAlso.level).padStart(2,'0')}` : ''}.
          </p>` : ''}
        </article>`;
      }).join('')}
    </section>
  `).join('');
}

function getGlossaryStats() {
  return { total: Object.keys(GLOSSARY).length };
}

// ----------------------------------------------------------------
// Helpers locales
// ----------------------------------------------------------------

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escAttr(s) {
  return String(s).replace(/[^a-zA-Z0-9_-]/g, '_');
}

// ----------------------------------------------------------------
// Exports
// ----------------------------------------------------------------

window.GLOSSARY = GLOSSARY;
window.decorateGlossaryTerms = decorateGlossaryTerms;
window.getGlossaryEntry = getGlossaryEntry;
window.renderGlossaryPage = renderGlossaryPage;
window.getGlossaryStats = getGlossaryStats;
window.rebuildGlossaryRegex = _buildGlossaryRegex;  // por si rellenamos en runtime
