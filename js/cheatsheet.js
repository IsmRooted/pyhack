// PyHack — Cheatsheet de referencia.
//
// Estructura: cada pestaña (api / stdlib / syntax) es una lista de entradas.
// Cada entrada se renderiza como bloque con título, descripción y código.
//
// Para añadir contenido: rellena las listas. La UI lo coge automático.
//
// FORMATO DE ENTRADA:
//   {
//     id: "id-unico",        // usado para anclas / linkado desde glosario
//     title: "scan_port",    // nombre principal
//     subtitle: "host, port → ...",  // opcional, firma o tagline
//     body: `<HTML>`,         // descripción + ejemplos
//     tags: ["recon", "mock"]   // opcional, para búsqueda futura
//   }

const CHEATSHEET = {
  // ============================================================
  // PESTAÑA 1 — API DEL JUEGO
  // Funciones expuestas a Python por el runtime de PyHack
  // ============================================================
  api: [
    {
      id: "scan_port",
      title: "scan_port(host, port)",
      subtitle: '→ "open" | "closed" | "filtered"',
      body: `
        <p>Escaneo de puerto simulado. Devuelve el estado del puerto contra el
        host indicado.</p>
        <ul>
          <li><code>"open"</code> — el puerto responde y acepta conexiones.</li>
          <li><code>"closed"</code> — el puerto rechaza activamente (RST).</li>
          <li><code>"filtered"</code> — sin respuesta (firewall que descarta).</li>
        </ul>
        <pre>estado = scan_port("acme.local", 22)
if estado == "open":
    print("SSH disponible")</pre>
        <p><strong>Notas</strong>: en la realidad esto sería
        <code>socket.socket().connect_ex()</code> con un timeout. La lógica del
        código de tu nivel sería idéntica.</p>
      `,
    },
    {
      id: "fetch_banner",
      title: "fetch_banner(host, port)",
      subtitle: "→ str (banner del servicio)",
      body: `
        <p>Devuelve el "banner" textual que un servicio anunciaría al conectar
        (versión + producto). Solo si el puerto está <code>open</code>.</p>
        <pre>banner = fetch_banner("ftp.acme.local", 21)
print(banner)
# 'vsftpd 3.0.5'</pre>
        <p><strong>Aplicación</strong>: identificación de versión vulnerable
        (cruzando con base de CVEs).</p>
      `,
    },
    {
      id: "dns_lookup",
      title: "dns_lookup(domain)",
      subtitle: "→ list[str] (IPs)",
      body: `
        <p>Resolución DNS simulada. Devuelve la lista de IPs asociadas al
        dominio.</p>
        <pre>ips = dns_lookup("acme.local")
for ip in ips:
    print(ip)</pre>
        <p>Si el dominio no existe en el nivel, devuelve lista vacía
        <code>[]</code>.</p>
      `,
    },
    {
      id: "fetch_url",
      title: "fetch_url(url, method, data, headers)",
      subtitle: "→ HttpResponse",
      body: `
        <p>Petición HTTP simulada. Soporta GET / POST / cualquier método. Las
        cookies persisten entre llamadas dentro de un mismo run (sesión
        interna).</p>
        <pre># GET simple
resp = fetch_url("https://acme.local/")
print(resp.status, resp.body[:80])

# POST con dict de datos (se envía como JSON body)
resp = fetch_url("https://acme.local/login", "POST",
                 {"user": "qa", "pass": "qa-2026"})

# Headers custom (4º arg)
h = {"Authorization": "Bearer XYZ"}
resp = fetch_url("https://acme.local/api", "GET", None, h)</pre>
        <p><strong>HttpResponse</strong> tiene:</p>
        <ul>
          <li><code>.status</code> — código HTTP (200, 401, 404…)</li>
          <li><code>.body</code> — string del cuerpo</li>
          <li><code>.headers</code> — dict de headers de respuesta</li>
          <li><code>.cookies</code> — dict de cookies SET por el servidor</li>
          <li><code>.json()</code> — parsea el body como JSON (dict/list)</li>
          <li><code>.text</code> — alias de <code>.body</code> (estilo requests)</li>
        </ul>
      `,
    },
    {
      id: "socket_request",
      title: "socket_request(host, port, payload)",
      subtitle: "→ str | None",
      body: `
        <p>Envía bytes raw a un puerto y devuelve la respuesta como string. Útil
        para protocolos que no son HTTP (SMTP, FTP, custom).</p>
        <pre>r = socket_request("smtp.acme.local", 25,
                   "HELO sentinel.local\\r\\n")
print(r)
# '250 smtp.acme.local Hello, pleased to meet you\\r\\n'</pre>
        <p>Si el puerto está <code>closed</code>/<code>filtered</code>,
        devuelve <code>None</code>.</p>
      `,
    },
    {
      id: "bash",
      title: "bash(cmd)",
      subtitle: "→ BashResult(.stdout, .stderr, .returncode)",
      body: `
        <p>Ejecuta un comando bash simulado contra el filesystem virtual del
        nivel. Equivalente educativo de
        <code>subprocess.run(cmd, capture_output=True, text=True)</code>.</p>
        <pre>r = bash("cat /etc/passwd")
if r.returncode == 0:
    for line in r.stdout.splitlines():
        print(line)
else:
    print("ERROR:", r.stderr)</pre>
        <p><strong>Comandos soportados</strong> en built-in: <code>ls</code>,
        <code>cat</code>, <code>pwd</code>, <code>whoami</code>, <code>id</code>,
        <code>uname -a</code>, <code>echo</code>, <code>grep PAT FILE</code>,
        <code>find PATH -name PAT</code>. Cada nivel puede definir comandos
        adicionales por handler.</p>
      `,
    },
    {
      id: "parse_pcap",
      title: "parse_pcap()",
      subtitle: "→ list[dict]",
      body: `
        <p>Devuelve la captura de paquetes del nivel actual (ya parseada). Cada
        paquete es un dict con campos:</p>
        <ul>
          <li><code>src_ip</code>, <code>dst_ip</code> (str)</li>
          <li><code>src_port</code>, <code>dst_port</code> (int)</li>
          <li><code>protocol</code> ("TCP" | "UDP")</li>
          <li><code>length</code> (bytes, int)</li>
        </ul>
        <pre>pkts = parse_pcap()
print(f"{len(pkts)} paquetes")
tcp = [p for p in pkts if p["protocol"] == "TCP"]
print(f"TCP: {len(tcp)}")</pre>
      `,
    },
    {
      id: "reset_http_session",
      title: "reset_http_session()",
      subtitle: "→ None",
      body: `
        <p>Limpia las cookies acumuladas en la sesión HTTP simulada. Se llama
        automáticamente al inicio de cada ejecución del editor, así que
        normalmente <strong>no hace falta llamarla manualmente</strong>.</p>
        <p>Útil si dentro del mismo script quieres simular "cerrar sesión y
        empezar de cero" entre dos flujos de login.</p>
      `,
    },
  ],

  // ============================================================
  // PESTAÑA 2 — STDLIB
  // Módulos de la librería estándar usados en el curso
  // ============================================================
  stdlib: [
    {
      id: "json",
      title: "json",
      subtitle: "Serializar / parsear JSON",
      body: `
        <p><strong>Para qué</strong>: convertir entre estructuras Python (dicts,
        listas) y strings JSON. Es el formato universal de APIs y reportes.</p>
        <pre>import json

# Python → JSON string
data = {"host": "acme.local", "ports": [22, 80, 443]}
print(json.dumps(data, indent=2))   # pretty-print con sangría

# JSON string → Python
texto = '{"a": 1, "b": [2, 3]}'
obj = json.loads(texto)
print(obj["b"][0])   # 2</pre>
        <p><strong>Funciones clave</strong>:</p>
        <ul>
          <li><code>json.dumps(obj, indent=2)</code> — Python a string</li>
          <li><code>json.loads(s)</code> — string a Python</li>
          <li><code>json.dump(obj, file)</code> — escribe a fichero</li>
          <li><code>json.load(file)</code> — lee de fichero</li>
        </ul>
      `,
    },
    {
      id: "re",
      title: "re",
      subtitle: "Expresiones regulares",
      body: `
        <p><strong>Para qué</strong>: buscar / extraer / reemplazar patrones en
        strings. La herramienta universal para parsear logs, emails, IOCs,
        cualquier texto semi-estructurado.</p>
        <pre>import re

# Buscar todas las URLs en un texto
urls = re.findall(r"https?://[^\\s]+", body)

# Buscar la primera coincidencia (con grupos)
m = re.search(r"User: (\\w+)", linea)
if m:
    print(m.group(1))   # el contenido del primer ()

# Reemplazar
limpio = re.sub(r"\\d{3}-\\d{2}-\\d{4}", "[REDACTED]", texto)

# Pre-compilar (más rápido si lo usas muchas veces)
URL_RE = re.compile(r"https?://[^\\s]+")
for line in lines:
    print(URL_RE.findall(line))</pre>
        <p><strong>Atomos clave del lenguaje regex</strong>:</p>
        <ul>
          <li><code>.</code> — cualquier carácter (excepto salto de línea)</li>
          <li><code>\\d</code>, <code>\\w</code>, <code>\\s</code> — dígito, "palabra", whitespace</li>
          <li><code>+</code>, <code>*</code>, <code>?</code> — uno o más, cero o más, opcional</li>
          <li><code>{n}</code>, <code>{n,m}</code> — exactamente n, entre n y m</li>
          <li><code>[abc]</code> — clase (a, b o c); <code>[^abc]</code> — negada</li>
          <li><code>^</code>, <code>$</code> — anclas de inicio / fin</li>
          <li><code>(...)</code> — grupo capturable (recuperable con .group(N))</li>
        </ul>
      `,
    },
    {
      id: "hashlib",
      title: "hashlib",
      subtitle: "Hashing criptográfico",
      body: `
        <p><strong>Para qué</strong>: producir hashes (md5, sha1, sha256, sha512).
        Identificadores únicos de archivos, hashes de evidencia, firmas.</p>
        <pre>import hashlib

# Pasar bytes (siempre — los strings hay que .encode() antes)
h = hashlib.md5(b"hello").hexdigest()
# '5d41402abc4b2a76b9719d911017c592'

# Para un string
texto = "hola mundo"
h = hashlib.sha256(texto.encode()).hexdigest()</pre>
        <ul>
          <li><code>.hexdigest()</code> — hash como string hexadecimal</li>
          <li><code>.digest()</code> — hash como bytes raw</li>
        </ul>
        <p><strong>⚠ Aviso</strong>: <code>md5</code> y <code>sha1</code> NO son
        seguros para passwords (son demasiado rápidos y se rompen con
        wordlist). Para passwords usa <code>bcrypt</code> o <code>argon2</code>
        (paquetes externos). Sí se pueden usar para identificar archivos
        únicos o evidencias forenses.</p>
      `,
    },
    {
      id: "base64",
      title: "base64",
      subtitle: "Codificación base64 (no es cifrado)",
      body: `
        <p><strong>Para qué</strong>: codificar bytes a un string ASCII
        imprimible. Útil para transportar binarios por canales que solo
        aceptan texto (email, JSON).</p>
        <pre>import base64

# Bytes → string base64
b64 = base64.b64encode(b"hello").decode()
# 'aGVsbG8='

# String base64 → bytes
data = base64.b64decode("aGVsbG8=")
# b'hello'</pre>
        <p><strong>⚠ Aviso</strong>: base64 NO es cifrado. Cualquiera con
        <code>base64</code> puede decodificarlo. Si ves base64 "protegiendo"
        passwords en un sistema, es bandera roja.</p>
      `,
    },
    {
      id: "urllib_parse",
      title: "urllib.parse",
      subtitle: "URL encoding / decoding y parsing",
      body: `
        <p><strong>Para qué</strong>: codificar caracteres especiales para que
        sean válidos en una URL, y descomponer URLs en sus partes.</p>
        <pre>from urllib.parse import quote, unquote, urlparse

# Texto seguro para URL
quote("hello world / @")
# 'hello%20world%20%2F%20%40'

# Decodificar
unquote("%3Cscript%3E")
# '&lt;script&gt;'

# Descomponer una URL
u = urlparse("https://acme.local:8080/api/v1?q=test")
print(u.scheme, u.hostname, u.port, u.path, u.query)
# https acme.local 8080 /api/v1 q=test</pre>
      `,
    },
    {
      id: "collections",
      title: "collections (Counter, defaultdict)",
      subtitle: "Estructuras de datos potentes",
      body: `
        <p><strong>Counter</strong>: contar ocurrencias en una iterable.
        Devuelve un dict {valor: cuenta}.</p>
        <pre>from collections import Counter

ips = ["10.0.0.5", "10.0.0.5", "8.8.8.8", "10.0.0.5"]
c = Counter(ips)
# Counter({'10.0.0.5': 3, '8.8.8.8': 1})

print(c.most_common(2))
# [('10.0.0.5', 3), ('8.8.8.8', 1)]

# Counter de un generador (muy idiomático)
c = Counter(p["src_ip"] for p in pcap)</pre>
        <p><strong>defaultdict</strong>: dict con valor por defecto. Evita el
        check "<em>si la key no existe, crearla con valor inicial</em>".</p>
        <pre>from collections import defaultdict

groups = defaultdict(list)
for evento in eventos:
    groups[evento["user"]].append(evento)
# groups["alice"] empieza siendo [] sin tener que comprobarlo</pre>
      `,
    },
    {
      id: "pathlib",
      title: "pathlib",
      subtitle: "Manejo de rutas seguro",
      body: `
        <p><strong>Para qué</strong>: trabajar con rutas de archivo de forma
        portable y segura. Sustituye al viejo <code>os.path</code>.</p>
        <pre>from pathlib import Path

p = Path("/var/log/auth.log")
print(p.name)        # 'auth.log'
print(p.suffix)      # '.log'
print(p.parent)      # PosixPath('/var/log')
print(p.exists())    # True/False
print(p.is_file())   # True/False
print(p.read_text()) # contenido del fichero (sin abrir/cerrar)

# Composición segura — IMPORTANTE para path traversal
base = Path("/var/www/uploads")
user = "../../../etc/passwd"
combinado = (base / user).resolve()
# .resolve() normaliza '..' — útil para detectar traversal:
if not str(combinado).startswith(str(base)):
    raise ValueError("Path traversal detected")</pre>
      `,
    },
  ],

  // ============================================================
  // PESTAÑA 3 — SINTAXIS PYTHON
  // Sintaxis esencial que aparece en los niveles
  // ============================================================
  syntax: [
    {
      id: "fstrings",
      title: "f-strings y format specs",
      subtitle: 'f"texto {var:formato}"',
      body: `
        <p>Forma moderna de mezclar variables con texto. Empezar con
        <code>f"</code>, meter expresiones entre <code>{ }</code>.</p>
        <pre>nombre = "Iris"
edad = 35
print(f"{nombre} tiene {edad} años")

# Operaciones dentro:
print(f"En 5 años tendrá {edad + 5}")

# Con format spec (después de :):
pi = 3.14159
print(f"{pi:.2f}")        # 3.14   (2 decimales)
print(f"{pi:10.2f}")      #       3.14   (ancho 10, alineado derecha)
print(f"{nombre:>10}")    #       Iris   (ancho 10, derecha)
print(f"{nombre:&lt;10}|")   # Iris      |   (izquierda)

# Números:
print(f"{255:08b}")  # '11111111'   (binario, 8 bits, padding 0)
print(f"{255:o}")    # '377'        (octal)
print(f"{255:x}")    # 'ff'         (hex minúscula)
print(f"{255:X}")    # 'FF'         (hex mayúscula)

# Repr (para debug):
print(f"{nombre!r}")  # "'Iris'"  (con comillas)</pre>
      `,
    },
    {
      id: "comprehensions",
      title: "List / dict / set comprehensions",
      subtitle: "[expr for x in iter if cond]",
      body: `
        <p>Forma compacta de crear listas (o dicts, o sets) a partir de un
        iterable. Más Pythónico que un for + append.</p>
        <pre># Lista — solo puertos abiertos
abiertos = [p for p in puertos if scan_port(host, p) == "open"]

# Equivalente expandido:
abiertos = []
for p in puertos:
    if scan_port(host, p) == "open":
        abiertos.append(p)

# Set comprehension — únicos
ips_unicas = {pkt["src_ip"] for pkt in pcap}

# Dict comprehension — invertir un dict
inverso = {v: k for k, v in original.items()}

# Con if/else (ojo, ENTRE expresión y for):
estados = ["OK" if x &gt; 0 else "FAIL" for x in valores]

# Anidado (cuidado con la legibilidad):
matriz = [[i*j for j in range(5)] for i in range(5)]</pre>
        <p><strong>Cuándo usar</strong>: cuando la lógica es transformación + filtro
        simple. Si tienes 2+ acciones por iteración o lógica compleja, mejor
        un for normal — más legible.</p>
      `,
    },
    {
      id: "slicing",
      title: "Slicing — listas y strings",
      subtitle: "[start:stop:step]",
      body: `
        <p>Forma de extraer trozos. Funciona en strings, listas, tuplas.</p>
        <pre>s = "abcdefghij"   # 0123456789

s[2:5]      # 'cde'    (inclusive 2, exclusivo 5)
s[:3]       # 'abc'    (desde el inicio)
s[7:]       # 'hij'    (hasta el final)
s[-3:]      # 'hij'    (los 3 últimos)
s[::-1]     # 'jihgfedcba'   (invertido)
s[::2]      # 'acegi'  (cada 2)

# Listas igual:
lista = [10, 20, 30, 40, 50]
print(lista[1:4])   # [20, 30, 40]
print(lista[:-1])   # todos menos el último

# Asignación con slicing (modifica en sitio):
lista[1:3] = [99]   # [10, 99, 40, 50]</pre>
      `,
    },
    {
      id: "sort_key",
      title: "sorted / min / max con key",
      subtitle: "sorted(it, key=lambda x: ...)",
      body: `
        <p>Para ordenar (o encontrar min/max) por un criterio derivado, no
        directo.</p>
        <pre>palabras = ["zorro", "ave", "perro", "águila"]

# Por longitud
print(sorted(palabras, key=len))
# ['ave', 'zorro', 'perro', 'águila']

# Por última letra
print(sorted(palabras, key=lambda s: s[-1]))

# Lista de tuplas: ordenar por el segundo elemento
items = [("a", 3), ("b", 1), ("c", 2)]
print(sorted(items, key=lambda t: t[1]))
# [('b', 1), ('c', 2), ('a', 3)]

# Inverso
sorted(items, key=lambda t: t[1], reverse=True)

# min/max funcionan igual
mas_largo = max(palabras, key=len)

# Ordenar por severidad (con un dict de prioridad):
SEV = {"critical": 0, "high": 1, "medium": 2, "low": 3}
alertas.sort(key=lambda a: SEV[a["severity"]])</pre>
      `,
    },
    {
      id: "try_except",
      title: "try / except / finally",
      subtitle: "Manejar errores sin crashear",
      body: `
        <p>Sintaxis para "intentar algo y, si falla, hacer otra cosa".
        En auditoría: servicios que no responden, JSON corrupto, ficheros que
        no existen.</p>
        <pre>try:
    resp = fetch_url("https://acme.local/api")
    data = resp.json()
except ValueError as e:
    print(f"JSON corrupto: {e}")
    data = {}
except Exception as e:
    print(f"Error genérico: {e}")
    data = {}
finally:
    # Esto se ejecuta SIEMPRE, haya o no error
    print("Petición intentada")

# Capturar varios tipos
try:
    n = int(s)
except (ValueError, TypeError):
    n = 0

# Re-lanzar tras loggear
try:
    do_something()
except Exception as e:
    log(f"Falló: {e}")
    raise</pre>
        <p><strong>Anti-patrón</strong>: <code>except:</code> a secas (sin tipo)
        captura TODO incluyendo Ctrl+C. Siempre tipa el except, o como mucho
        usa <code>except Exception</code>.</p>
      `,
    },
    {
      id: "with",
      title: "with — context managers",
      subtitle: "Recursos que se cierran solos",
      body: `
        <p>Garantiza que un recurso se libera (fichero cerrado, lock soltado,
        socket cerrado) aunque haya error.</p>
        <pre># Lectura de fichero
with open("/etc/passwd") as f:
    contenido = f.read()
# El fichero se cierra al salir del bloque, hagas lo que hagas

# Más de uno a la vez
with open("in.txt") as fi, open("out.txt", "w") as fo:
    fo.write(fi.read().upper())</pre>
        <p><strong>Por qué importa</strong>: no usar <code>with</code> es la causa
        número uno de "el script funciona pero deja recursos abiertos".</p>
      `,
    },
    {
      id: "iter_helpers",
      title: "enumerate / zip / range",
      subtitle: "Iteración avanzada",
      body: `
        <p><strong>enumerate(it, start=0)</strong> — iterar con índice + valor:</p>
        <pre>for i, host in enumerate(hosts, 1):
    print(f"#{i}: {host}")</pre>
        <p><strong>zip(*its)</strong> — recorrer varias listas en paralelo
        (para en la más corta):</p>
        <pre>nombres = ["a", "b", "c"]
edades = [20, 30, 40]
for n, e in zip(nombres, edades):
    print(f"{n} → {e}")

# Construir un dict desde dos listas
d = dict(zip(nombres, edades))   # {'a': 20, 'b': 30, 'c': 40}</pre>
        <p><strong>range(start, stop, step)</strong> — secuencia de enteros.
        <code>stop</code> no se incluye:</p>
        <pre>list(range(5))         # [0,1,2,3,4]
list(range(2, 8))      # [2,3,4,5,6,7]
list(range(0, 10, 2))  # [0,2,4,6,8]
list(range(10, 0, -1)) # [10,9,8,7,6,5,4,3,2,1]</pre>
      `,
    },
    {
      id: "set_ops",
      title: "Operaciones de conjunto",
      subtitle: "& | - ^ .issubset .intersection",
      body: `
        <p>Los <code>set</code>s son colecciones de valores únicos. Soportan
        operaciones tipo álgebra de conjuntos.</p>
        <pre>a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a &amp; b   # {3, 4}     intersección
a | b   # {1,2,3,4,5,6}   unión
a - b   # {1, 2}     diferencia
a ^ b   # {1,2,5,6}  diferencia simétrica (XOR)

a.issubset({1,2,3,4,5})   # True
a.isdisjoint({7, 8})      # True

# YARA-lite: ¿están TODOS los indicadores en la muestra?
indicators = {"WinExec", "URLDownloadToFile"}
sample_strings = set(extract_strings(sample))
matched = indicators.issubset(sample_strings)</pre>
        <p>Crear set vacío: <code>set()</code> (no <code>{}</code> — eso es dict
        vacío).</p>
      `,
    },
    {
      id: "bitwise",
      title: "Operadores bitwise",
      subtitle: "& | ^ ~ << >>",
      body: `
        <p>Operaciones bit a bit sobre enteros. Aparecen en permisos,
        protocolos de red, criptografía clásica.</p>
        <pre>a = 0b1100  # 12
b = 0b1010  # 10

a &amp; b   # 0b1000 = 8    AND  (1 si los dos son 1)
a | b   # 0b1110 = 14   OR   (1 si al menos uno es 1)
a ^ b   # 0b0110 = 6    XOR  (1 si distintos)
~a      # -13           NOT  (invierte todos los bits)
a &lt;&lt; 2  # 0b110000 = 48  shift izquierda (multiplica x4)
a &gt;&gt; 1  # 0b0110 = 6    shift derecha (divide entre 2)

# Aplicación: permisos UNIX en octal
permisos = 0o751  # rwxr-x--x = 111 101 001
OWNER_X = 0o100   # ---x------
print(bool(permisos &amp; OWNER_X))   # True (owner tiene execute)

# Cifrado XOR de byte único
key = 0x42
ciphertext = bytes(b ^ key for b in plaintext_bytes)
# Lo bonito: aplicar XOR otra vez con la misma clave deshace.</pre>
      `,
    },
    {
      id: "args_kwargs",
      title: "*args y **kwargs",
      subtitle: "Funciones con argumentos variables",
      body: `
        <p>Permite definir funciones que aceptan número arbitrario de argumentos
        posicionales (<code>*args</code>) o nombrados (<code>**kwargs</code>).</p>
        <pre>def loggear(prefijo, *mensajes, **opciones):
    sep = opciones.get("sep", " ")
    for m in mensajes:
        print(f"[{prefijo}]{sep}{m}")

loggear("INFO", "iniciando", "cargando", sep=" → ")
# [INFO] → iniciando
# [INFO] → cargando

# Desempaquetar al llamar
args = (1, 2, 3)
kwargs = {"sep": ", "}
loggear("X", *args, **kwargs)</pre>
        <p>Patrón típico en wrappers/decoradores que tienen que reenviar
        cualquier argumento sin saber su forma.</p>
      `,
    },
    {
      id: "chained_compare",
      title: "Comparaciones encadenadas",
      subtitle: "0 <= x < 10",
      body: `
        <p>Python permite encadenar operadores de comparación de forma natural.
        Equivalente a un AND, pero más legible.</p>
        <pre>x = 5
if 0 &lt;= x &lt; 10:
    print("dígito de un solo dígito")

# Equivalente "manual":
if 0 &lt;= x and x &lt; 10:
    ...

# Funciona con cualquier combinación:
if a == b == c:    # los tres iguales
    ...
if a &lt; b &lt; c &lt; d:  # estrictamente creciente
    ...</pre>
        <p>Mucho mejor que los <code>if a &lt;= x and x &lt; b</code> que se
        ven en otros lenguajes.</p>
      `,
    },
  ],
};

// ----------------------------------------------------------------
// Render helpers
// ----------------------------------------------------------------

function renderCheatsheetTab(tabName) {
  const entries = CHEATSHEET[tabName] || [];
  if (entries.length === 0) {
    return `<div class="cheat-empty">
      <p><em>(En desarrollo — esta pestaña se rellenará en Fase 2 del plan pedagógico.)</em></p>
      <p>Mientras tanto, consulta la teoría del nivel (📖 Teoría) o el manual técnico
      desde el menú principal.</p>
    </div>`;
  }
  return entries.map(e => `
    <article class="cheat-entry" id="cheat-${escapeAttr(e.id)}">
      <header class="cheat-entry-header">
        <h4 class="cheat-entry-title">${escapeHtmlSafe(e.title)}</h4>
        ${e.subtitle ? `<code class="cheat-entry-sub">${escapeHtmlSafe(e.subtitle)}</code>` : ''}
      </header>
      <div class="cheat-entry-body">${e.body || ''}</div>
    </article>
  `).join('');
}

// Helpers locales (no dependen de main.js para que el archivo sea autónomo)
function escapeHtmlSafe(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeAttr(s) {
  return String(s).replace(/[^a-zA-Z0-9_-]/g, '-');
}

// Búsqueda global de una entrada por id (para deeplinks desde glosario)
function findCheatsheetEntry(id) {
  for (const tab of Object.keys(CHEATSHEET)) {
    const found = (CHEATSHEET[tab] || []).find(e => e.id === id);
    if (found) return { tab, entry: found };
  }
  return null;
}

window.CHEATSHEET = CHEATSHEET;
window.renderCheatsheetTab = renderCheatsheetTab;
window.findCheatsheetEntry = findCheatsheetEntry;
