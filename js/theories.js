// PyHack — teoría por nivel. Solo lo nuevo del nivel.
// Por ahora solo Cap 0. El resto se irá rellenando.

const THEORIES = {
  1: {
    title: "print() y comentarios",
    body: `
      <p><strong>print(...)</strong> escribe en la salida estándar — en PyHack,
      en el terminal del juego.</p>
      <pre><span class="fn">print</span>(<span class="str">"Operativo: Aldric"</span>)</pre>
      <p>Lo que va entre comillas es un <em>string</em> (texto). Da igual si usas
      <code>"</code> o <code>'</code>, son equivalentes.</p>
      <p>Las líneas que empiezan por <code>#</code> son <strong>comentarios</strong>:
      Python las ignora. Sirven para dejarte notas tú o explicar algo a otro
      analista que lea tu código mañana.</p>
      <p><strong>¿Por qué importa?</strong> En pentesting, print es tu primera
      herramienta de depuración. La usarás para ver qué devuelve cada llamada,
      qué responde el target, qué encontró tu scanner. Constantemente.</p>
    `,
  },
  2: {
    title: "Variables y f-strings",
    body: `
      <p>Una <strong>variable</strong> guarda un valor con un nombre. Se crea con
      <code>=</code>:</p>
      <pre>alias = <span class="str">"Aldric"</span>
rol = <span class="str">"junior"</span>
edad = <span class="num">25</span></pre>
      <p>Después puedes usar el nombre en lugar del valor.</p>
      <h4>f-strings: la forma moderna</h4>
      <p>Para mezclar texto y variables, usa una <strong>f-string</strong>: empieza
      con <code>f"</code> y mete las variables entre llaves <code>{ }</code>:</p>
      <pre><span class="fn">print</span>(<span class="str">f"Operativo </span>{alias}<span class="str">, rango </span>{rol}<span class="str">"</span>)</pre>
      <p>Mucho más limpio que concatenar con <code>+</code>. En reports, logs y
      output formateado, las usarás siempre.</p>
    `,
  },
  3: {
    title: "Operadores y conversión de tipos",
    body: `
      <p>Python sabe matemáticas:</p>
      <pre>2 + 3    <span class="com"># 5</span>
12 % 7   <span class="com"># 5    resto (módulo)</span>
2 ** 8   <span class="com"># 256  potencia</span>
17 // 4  <span class="com"># 4    división entera</span></pre>
      <p>El módulo (<code>%</code>) es especialmente útil en cripto: hashes,
      operaciones modulares, etc.</p>
      <h4>Conversión de tipos</h4>
      <p>NO puedes sumar texto y número directamente. Para concatenar, primero
      convierte con <code>str(...)</code>:</p>
      <pre><span class="str">"Hash: "</span> + 42         <span class="com"># ✗ TypeError</span>
<span class="str">"Hash: "</span> + <span class="fn">str</span>(42)    <span class="com"># ✓ "Hash: 42"</span></pre>
      <p>O usa una f-string, que convierte sola.</p>
    `,
  },
  4: {
    title: "Listas y for in lista",
    body: `
      <p>Una <strong>lista</strong> guarda varios valores entre corchetes:</p>
      <pre>empleados = [<span class="str">"Iris"</span>, <span class="str">"Marco"</span>, <span class="str">"Sara"</span>]</pre>
      <ul>
        <li><code>empleados[0]</code> → <code>"Iris"</code> (índice empieza en 0)</li>
        <li><code>len(empleados)</code> → 3</li>
        <li><code>"Iris" in empleados</code> → <code>True</code></li>
      </ul>
      <h4>for in lista</h4>
      <p>Para hacer algo con cada elemento:</p>
      <pre><span class="kw">for</span> e <span class="kw">in</span> empleados:
    <span class="fn">print</span>(<span class="str">f"Empleado: </span>{e}<span class="str">"</span>)</pre>
      <p>La línea interior va <strong>indentada</strong> (4 espacios). En Python,
      la indentación es lo que dice qué pertenece al bucle.</p>
      <p>Las listas son la estructura más usada del lenguaje. En recon procesarás
      listas de IPs, puertos, hosts, credenciales, vulnerabilidades… constantemente.</p>
    `,
  },
  5: {
    title: "Repaso del Capítulo 0",
    body: `
      <p>En Cap 0 has cubierto los <strong>cuatro pilares iniciales</strong>:</p>
      <ul>
        <li><strong>print y comentarios</strong> — comunicarte con el output y dejarte notas.</li>
        <li><strong>Variables</strong> (<code>=</code>) — guardar valores con un nombre.</li>
        <li><strong>Operadores y str()</strong> — calcular y combinar texto con números.</li>
        <li><strong>Listas + for</strong> — recorrer colecciones.</li>
      </ul>
      <p>Con esto ya puedes escribir Python básico funcional. A partir de mañana
      vendrán las APIs simuladas: <code>scan_port</code>, <code>fetch_url</code>,
      <code>dns_lookup</code>… cyber sobre la base que ya tienes.</p>
      <h4>Truco profesional: enumerate</h4>
      <p>Cuando recorres una lista y necesitas el índice <em>y</em> el valor:</p>
      <pre><span class="kw">for</span> i, ip <span class="kw">in</span> <span class="fn">enumerate</span>(ips, <span class="num">1</span>):
    <span class="fn">print</span>(<span class="str">f"Target </span>{i}<span class="str">: </span>{ip}<span class="str">"</span>)</pre>
      <p><code>enumerate(lista, 1)</code> empieza a contar desde 1 en lugar de 0.
      Útil cuando muestras resultados al cliente.</p>
    `,
  },

  6: {
    title: "scan_port y bucles for",
    body: `
      <p>El <strong>reconocimiento</strong> es la primera fase de cualquier
      pentesting. Antes de tocar nada, identificas la superficie: qué
      servidores hay, qué puertos están escuchando, qué software corre detrás.</p>
      <h4>scan_port(host, port)</h4>
      <p>En PyHack es una función simulada que devuelve uno de tres strings:</p>
      <ul>
        <li><code>"open"</code> — el puerto responde y está aceptando conexiones.</li>
        <li><code>"closed"</code> — el puerto rechaza activamente la conexión (RST).</li>
        <li><code>"filtered"</code> — no hay respuesta (firewall, drop silencioso).</li>
      </ul>
      <h4>Patrón básico: iterar sobre una lista de puertos</h4>
      <pre><span class="kw">for</span> port <span class="kw">in</span> [<span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>]:
    estado = <span class="fn">scan_port</span>(<span class="str">"host.local"</span>, port)
    <span class="fn">print</span>(<span class="str">f"Puerto </span>{port}<span class="str">: </span>{estado}<span class="str">"</span>)</pre>
      <p>Una llamada por iteración. La variable <code>port</code> toma cada
      valor de la lista. Por debajo, en la realidad, esto sería una conexión
      TCP por puerto — aquí es simulado pero la lógica del código es idéntica
      a la de un escáner real.</p>
      <p><strong>Puertos típicos a probar de partida</strong> (well-known):
      21 FTP, 22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 110 POP3, 143 IMAP,
      443 HTTPS, 3306 MySQL, 8080 HTTP-alt.</p>
    `,
  },

  7: {
    title: "Filtrar con if",
    body: `
      <p>Un escaneo crudo imprime todo. En un reporte real solo te interesa lo
      relevante. <code>if</code> filtra:</p>
      <pre><span class="kw">if</span> estado == <span class="str">"open"</span>:
    <span class="fn">print</span>(<span class="str">f"Puerto </span>{port}<span class="str"> abierto"</span>)</pre>
      <ul>
        <li><code>==</code> es comparación (devuelve <code>True</code>/<code>False</code>).</li>
        <li><code>=</code> es asignación (guarda valor en variable).</li>
        <li>Confundirlos es el error más frecuente de cualquier programador.</li>
      </ul>
      <h4>Comparaciones útiles en pentesting</h4>
      <pre>estado == <span class="str">"open"</span>      <span class="com"># exacto</span>
estado != <span class="str">"closed"</span>   <span class="com"># cualquier cosa menos cerrado</span>
estado <span class="kw">in</span> [<span class="str">"open"</span>, <span class="str">"filtered"</span>]  <span class="com"># varias opciones</span></pre>
      <p>El operador <code>in</code> con una lista es un atajo limpio para "es
      uno de estos valores".</p>
    `,
  },

  8: {
    title: "List comprehensions",
    body: `
      <p>Patrón muy común: "dada una lista, dame otra lista filtrada/transformada".
      Python tiene una sintaxis dedicada — <strong>list comprehension</strong>:</p>
      <pre>abiertos = [p <span class="kw">for</span> p <span class="kw">in</span> puertos
            <span class="kw">if</span> <span class="fn">scan_port</span>(host, p) == <span class="str">"open"</span>]</pre>
      <p>Lee literalmente: "p, para cada p en puertos, si scan_port(host, p) es
      'open'".</p>
      <h4>Estructura general</h4>
      <pre>[expresion <span class="kw">for</span> elemento <span class="kw">in</span> iterable <span class="kw">if</span> condicion]</pre>
      <ul>
        <li><strong>expresión</strong>: qué meter en la lista resultante (puede transformar).</li>
        <li><strong>elemento in iterable</strong>: lo de siempre del for.</li>
        <li><strong>if condición</strong> (opcional): filtra.</li>
      </ul>
      <h4>Transformar + filtrar a la vez</h4>
      <pre>etiquetas = [<span class="str">f"</span>{p}<span class="str">/tcp"</span> <span class="kw">for</span> p <span class="kw">in</span> puertos
             <span class="kw">if</span> <span class="fn">scan_port</span>(host, p) == <span class="str">"open"</span>]
<span class="com"># ['22/tcp', '80/tcp', '8080/tcp']</span></pre>
      <p><strong>Cuándo NO usarla</strong>: si la condición o expresión son
      complejas (varias líneas), un bucle for explícito es más legible.
      Reglar: una operación simple → comprehension. Lógica con varios pasos
      → bucle.</p>
    `,
  },

  9: {
    title: "Diccionarios",
    body: `
      <p>Un <strong>dict</strong> empareja claves con valores entre llaves
      <code>{ }</code>:</p>
      <pre>servicios = {
    <span class="num">22</span>: <span class="str">"SSH"</span>,
    <span class="num">80</span>: <span class="str">"HTTP"</span>,
    <span class="num">443</span>: <span class="str">"HTTPS"</span>,
}
<span class="fn">print</span>(servicios[<span class="num">22</span>])  <span class="com"># "SSH"</span></pre>
      <p>Como una lista, pero accedes <strong>por nombre</strong> (clave) en
      vez de por número (índice). Ideal cuando los datos tienen "etiquetas":
      puerto → servicio, ip → hostname, hash → contraseña, etc.</p>
      <h4>Operaciones útiles</h4>
      <ul>
        <li><code>servicios[22]</code> → "SSH" (lanza KeyError si no existe).</li>
        <li><code>servicios.get(99, "?")</code> → valor o default si no existe.</li>
        <li><code>22 in servicios</code> → True/False.</li>
        <li><code>servicios.keys()</code>, <code>.values()</code>, <code>.items()</code>.</li>
      </ul>
      <h4>Recorrer pares clave-valor</h4>
      <pre><span class="kw">for</span> puerto, nombre <span class="kw">in</span> servicios.<span class="fn">items</span>():
    <span class="fn">print</span>(<span class="str">f"</span>{puerto}<span class="str"> = </span>{nombre}<span class="str">"</span>)</pre>
      <p><code>.items()</code> devuelve pares <code>(clave, valor)</code>; el
      <code>for</code> los desempaqueta en dos variables.</p>
    `,
  },

  10: {
    title: "Funciones (def + return)",
    body: `
      <p>Una <strong>función</strong> agrupa instrucciones bajo un nombre, con
      argumentos opcionales y un valor de retorno opcional. Se define con
      <code>def</code>:</p>
      <pre><span class="kw">def</span> <span class="fn">escanear</span>(host, puertos):
    abiertos = []
    <span class="kw">for</span> p <span class="kw">in</span> puertos:
        <span class="kw">if</span> <span class="fn">scan_port</span>(host, p) == <span class="str">"open"</span>:
            abiertos.<span class="fn">append</span>(p)
    <span class="kw">return</span> abiertos</pre>
      <ul>
        <li><strong>def nombre(args):</strong> declara la función.</li>
        <li>El cuerpo va indentado.</li>
        <li><strong>return</strong> devuelve un valor y termina la función.</li>
        <li>Sin return → devuelve <code>None</code> implícitamente.</li>
      </ul>
      <h4>Llamar a la función</h4>
      <pre>resultado = <span class="fn">escanear</span>(<span class="str">"target.local"</span>, [<span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>])
<span class="fn">print</span>(resultado)</pre>
      <h4>Por qué importa en pentesting</h4>
      <p>Un toolkit es básicamente una colección de funciones reutilizables.
      Hoy escaneas ACME, mañana otro cliente — el código es el mismo si la
      función está bien parametrizada. <code>def</code> es la diferencia entre
      escribir scripts desechables y construir herramientas.</p>
    `,
  },

  11: {
    title: "import y la stdlib",
    body: `
      <p>Python viene con una biblioteca estándar enorme. Para usarla,
      <code>import</code>:</p>
      <pre><span class="kw">import</span> json</pre>
      <p>Después puedes usar todo lo que el módulo exporta con
      <code>nombre.cosa</code>: <code>json.dumps(...)</code>, <code>json.loads(...)</code>,
      etc.</p>
      <h4>json.dumps: serializar a string</h4>
      <pre><span class="kw">import</span> json

datos = {<span class="str">"host"</span>: <span class="str">"x.com"</span>, <span class="str">"puertos"</span>: [<span class="num">22</span>, <span class="num">80</span>]}
<span class="fn">print</span>(json.<span class="fn">dumps</span>(datos, indent=<span class="num">2</span>))</pre>
      <p>Salida:</p>
      <pre>{
  "host": "x.com",
  "puertos": [22, 80]
}</pre>
      <p>El parámetro <code>indent=2</code> formatea bonito (legible para
      humanos). Sin él, sale todo en una línea (compacto, ideal para guardar
      en archivo o enviar por red).</p>
      <h4>Módulos útiles en pentesting (todos en stdlib)</h4>
      <ul>
        <li><code>json</code> — serialización de datos.</li>
        <li><code>base64</code>, <code>hashlib</code> — codificación, hashes.</li>
        <li><code>re</code> — expresiones regulares.</li>
        <li><code>socket</code> — sockets TCP/UDP raw.</li>
        <li><code>ipaddress</code> — manipulación de IPs y subredes.</li>
        <li><code>urllib.parse</code> — parsing de URLs.</li>
      </ul>
      <p>Pyodide (lo que corre Python en tu navegador) trae casi toda la stdlib.
      Para módulos externos como <code>requests</code> hay equivalentes simulados
      en PyHack.</p>
    `,
  },

  12: {
    title: "Repaso del Capítulo 1",
    body: `
      <p>Has cerrado el primer capítulo de recon. Lo que sabes ahora:</p>
      <ul>
        <li><strong>scan_port + for</strong>: iteración sobre puertos.</li>
        <li><strong>if + ==</strong>: filtrado básico.</li>
        <li><strong>List comprehensions</strong>: filtrar/transformar en una línea.</li>
        <li><strong>Diccionarios</strong>: estructura clave-valor para mapear datos.</li>
        <li><strong>def + return</strong>: encapsular lógica reutilizable.</li>
        <li><strong>import json</strong>: salida estructurada legible para humanos y máquinas.</li>
      </ul>
      <p>El siguiente capítulo es <strong>análisis de servicios</strong>: una
      vez sabes que un puerto está abierto, identificar qué corre detrás
      (banner grabbing, regex, parsing) y manejar los errores que aparecen
      cuando los servicios no se comportan como esperabas.</p>
    `,
  },

  13: {
    title: "Banner grabbing y métodos de string",
    body: `
      <p><strong>Banner grabbing</strong>: cuando te conectas a un puerto, muchos
      servicios envían un string identificándose. SSH dice
      <code>SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4</code>. HTTP dice
      <code>Apache/2.4.41 (Ubuntu)</code>. Saber la versión exacta = saber qué CVEs
      conocidos podrían aplicar.</p>
      <h4>Métodos de string esenciales</h4>
      <pre>texto.<span class="fn">split</span>(<span class="str">"_"</span>)         <span class="com"># parte por separador → lista</span>
texto.<span class="fn">strip</span>()              <span class="com"># quita espacios al inicio/fin</span>
texto.<span class="fn">lower</span>()              <span class="com"># todo minúsculas</span>
texto.<span class="fn">startswith</span>(<span class="str">"SSH"</span>)   <span class="com"># True si empieza por SSH</span>
texto.<span class="fn">replace</span>(<span class="str">"a"</span>, <span class="str">"b"</span>)    <span class="com"># sustituye</span>
<span class="str">" "</span>.<span class="fn">join</span>([<span class="str">"a"</span>, <span class="str">"b"</span>])    <span class="com"># une lista con separador</span></pre>
      <p>El parsing del banner es 80% <code>.split()</code> y un poco de indexing.
      Un banner típico:
      <code>"SSH-2.0-OpenSSH_8.2p1"</code>.
      <code>banner.split(<span class="str">"OpenSSH_"</span>)[1]</code> →
      <code>"8.2p1"</code>.</p>
    `,
  },

  14: {
    title: "Regex con re",
    body: `
      <p>Regex (expresiones regulares) son patrones para reconocer texto.
      Imprescindibles cuando los formatos varían: distintos servicios con distintos
      formatos de versión, logs con campos opcionales, parsing de tráfico.</p>
      <pre><span class="kw">import</span> re

m = re.<span class="fn">search</span>(<span class="str">r"(\\d+\\.\\d+)"</span>, <span class="str">"Apache/2.4.41"</span>)
<span class="kw">if</span> m:
    <span class="fn">print</span>(m.<span class="fn">group</span>(<span class="num">1</span>))   <span class="com"># "2.4"</span></pre>
      <h4>Los tres más usados</h4>
      <ul>
        <li><code>re.search(patron, texto)</code> — primer match o <code>None</code>.</li>
        <li><code>re.findall(patron, texto)</code> — todos los matches como lista.</li>
        <li><code>re.match(patron, texto)</code> — match al inicio del texto.</li>
      </ul>
      <h4>Sintaxis básica</h4>
      <pre>\\d         <span class="com"># un dígito</span>
\\d+        <span class="com"># uno o más dígitos</span>
\\.         <span class="com"># un punto literal (escapado)</span>
[a-z]      <span class="com"># una letra minúscula</span>
( ... )    <span class="com"># grupo de captura → .group(1), .group(2)</span>
*          <span class="com"># cero o más</span>
+          <span class="com"># uno o más</span>
?          <span class="com"># opcional</span></pre>
      <p>El prefijo <code>r"..."</code> es una raw string — Python no interpreta
      <code>\\d</code> como escape, lo deja para el motor de regex. <strong>Siempre</strong>
      escribe los patrones como raw strings.</p>

      <h4>Ejemplos progresivos</h4>
      <p>Empezamos simple y vamos subiendo:</p>
      <pre><span class="com"># 1. Buscar un dígito en cualquier sitio</span>
re.<span class="fn">search</span>(<span class="str">r"\\d"</span>, <span class="str">"abc7def"</span>).<span class="fn">group</span>()
<span class="com"># '7'</span>

<span class="com"># 2. Buscar versión X.Y</span>
re.<span class="fn">search</span>(<span class="str">r"(\\d+)\\.(\\d+)"</span>, <span class="str">"Apache/2.4.41"</span>).groups()
<span class="com"># ('2', '4')   — dos grupos capturados, en orden</span>

<span class="com"># 3. Versión X.Y.Z (con tercer número opcional)</span>
m = re.<span class="fn">search</span>(<span class="str">r"(\\d+\\.\\d+(?:\\.\\d+)?)"</span>, <span class="str">"Apache/2.4.41"</span>)
m.<span class="fn">group</span>(<span class="num">1</span>)
<span class="com"># '2.4.41'   — (?:...) es grupo no-capturable</span>

<span class="com"># 4. Todos los emails en un texto</span>
re.<span class="fn">findall</span>(<span class="str">r"[\\w.+-]+@[\\w.-]+"</span>, body)
<span class="com"># ['admin@acme.com', 'soporte@acme.com']</span>

<span class="com"># 5. Sustituir números de teléfono por [REDACTED]</span>
re.<span class="fn">sub</span>(<span class="str">r"\\b\\d{9}\\b"</span>, <span class="str">"[REDACTED]"</span>, texto)</pre>

      <h4>Anclas y boundaries</h4>
      <ul>
        <li><code>^</code> — inicio del string (o de línea con flag MULTILINE).</li>
        <li><code>$</code> — final del string.</li>
        <li><code>\\b</code> — boundary de palabra (entre carácter "de palabra"
            <code>[a-zA-Z0-9_]</code> y otro que no lo sea). Útil para no
            matchear <code>22</code> dentro de <code>1224</code>.</li>
      </ul>

      <h4>Greedy vs non-greedy</h4>
      <p>Por defecto, los cuantificadores son <strong>greedy</strong>: consumen
      lo máximo posible. Añadir <code>?</code> los hace no-greedy:</p>
      <pre>re.<span class="fn">search</span>(<span class="str">r"&lt;.+&gt;"</span>,  <span class="str">"&lt;a&gt;hi&lt;/a&gt;"</span>).<span class="fn">group</span>()
<span class="com"># '&lt;a&gt;hi&lt;/a&gt;'   — greedy, llega hasta el último &gt;</span>

re.<span class="fn">search</span>(<span class="str">r"&lt;.+?&gt;"</span>, <span class="str">"&lt;a&gt;hi&lt;/a&gt;"</span>).<span class="fn">group</span>()
<span class="com"># '&lt;a&gt;'   — non-greedy, para en el primer &gt;</span></pre>

      <h4>Errores típicos con regex</h4>
      <dl>
        <dt>1. Olvidar el <code>r</code></dt>
        <dd>Sin el prefijo raw, <code>"\\d"</code> es ambiguo: Python intenta
            interpretar <code>\\d</code> como secuencia de escape (no existe →
            DeprecationWarning) y luego se la pasa a regex. Mejor siempre
            <code>r"..."</code>, te ahorra problemas.</dd>
        <dt>2. No escapar <code>.</code></dt>
        <dd>Dentro de regex, <code>.</code> matchea cualquier carácter (excepto
            salto de línea). Para un punto literal: <code>\\.</code>. Patrón
            típico de error: <code>r"\\d+.\\d+"</code> matchea
            <code>"123x456"</code> también.</dd>
        <dt>3. <code>re.search</code> sin comprobar <code>None</code></dt>
        <dd>Si no hay match, <code>re.search</code> devuelve <code>None</code>.
            Llamar <code>.group(1)</code> sobre <code>None</code> lanza
            AttributeError. Siempre <code>if m:</code> antes de acceder a
            grupos.</dd>
        <dt>4. Greedy donde no toca</dt>
        <dd>Si el patrón consume más de lo esperado, prueba con <code>?</code>.</dd>
      </dl>

      <h4>Cuándo NO usar regex</h4>
      <p>Para HTML/JSON/XML completo no uses regex — usa parsers reales
      (<code>BeautifulSoup</code>, <code>json.loads</code>, etc). Regex es para
      texto plano semi-estructurado: logs, banners, configs, lo que sale de
      un comando shell.</p>
    `,
  },

  15: {
    title: "try / except — manejo de errores",
    body: `
      <p>Python lanza excepciones cuando algo sale mal: archivo no existe, índice
      fuera de rango, conversión inválida, JSON malformado. <code>try/except</code>
      las captura.</p>
      <pre><span class="kw">try</span>:
    banner = fetch_banner(host, <span class="num">22</span>)
    <span class="kw">if not</span> banner:
        <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="str">"banner vacío"</span>)
    <span class="fn">print</span>(banner)
<span class="kw">except</span> <span class="fn">ValueError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="str">f"Error: </span>{e}<span class="str">"</span>)
<span class="kw">except</span> <span class="fn">Exception</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="str">f"Error inesperado: </span>{e}<span class="str">"</span>)</pre>
      <h4>Patrón profesional</h4>
      <ul>
        <li>Captura excepciones <strong>específicas</strong> (<code>ValueError</code>,
            <code>KeyError</code>, <code>FileNotFoundError</code>) primero.</li>
        <li><code>except Exception</code> al final como red de seguridad — solo si
            tiene sentido.</li>
        <li>NO uses <code>except:</code> sin tipo: te traga incluso KeyboardInterrupt
            (Ctrl+C) y oculta bugs.</li>
        <li><code>raise</code> sin argumentos dentro de un except = re-lanza la
            misma excepción.</li>
      </ul>
      <p>En pentesting, una excepción no debe matarte el script de 200 hosts.
      Captura, registra, sigue. La consigna: nunca pierdas datos por un host caído.</p>
    `,
  },

  16: {
    title: "Clases en Python",
    body: `
      <p>Una <strong>clase</strong> es un molde para crear objetos. Cada objeto
      (instancia) lleva sus datos (atributos) y comportamiento (métodos).</p>
      <pre><span class="kw">class</span> <span class="fn">Service</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, host, port):
        self.host = host
        self.port = port
        self.banner = <span class="str">""</span>

    <span class="kw">def</span> <span class="fn">grab</span>(self):
        self.banner = <span class="fn">fetch_banner</span>(self.host, self.port)
        <span class="kw">return</span> self

s = <span class="fn">Service</span>(<span class="str">"target.local"</span>, <span class="num">22</span>)
s.<span class="fn">grab</span>()
<span class="fn">print</span>(s.banner)</pre>
      <ul>
        <li><strong>__init__</strong> es el constructor: se ejecuta al crear la instancia.</li>
        <li><strong>self</strong> es la instancia actual; va siempre como primer
            parámetro de cada método.</li>
        <li>Los <strong>atributos</strong> se asignan a <code>self.x = ...</code>.</li>
      </ul>
      <h4>¿Cuándo usar clases vs dicts?</h4>
      <ul>
        <li><strong>Dict</strong>: pocos campos, datos sin lógica asociada, transitorio.</li>
        <li><strong>Clase</strong>: muchos campos, lógica asociada, vida larga, varias
            instancias del mismo tipo.</li>
      </ul>
      <p>En pentesting verás clases en frameworks (Scapy, Volatility, pwntools).
      Aprender a leerlas es más importante que escribirlas — la mayoría de scripts
      ofensivos siguen siendo procedurales.</p>

      <h4>El parámetro <code>self</code> en detalle</h4>
      <p>Cada método de una clase recibe automáticamente como primer argumento
      la <strong>instancia sobre la que se llama</strong>. Por convención se
      llama <code>self</code>:</p>
      <pre><span class="kw">class</span> <span class="fn">Service</span>:
    <span class="kw">def</span> <span class="fn">describe</span>(self):     <span class="com"># self obligatorio</span>
        <span class="kw">return</span> <span class="str">f"</span>{self.host}<span class="str">:</span>{self.port}<span class="str">"</span>

s = <span class="fn">Service</span>(<span class="str">"acme.local"</span>, <span class="num">22</span>)
s.<span class="fn">describe</span>()           <span class="com"># Python pasa s como self automáticamente</span>
<span class="com"># Equivalente a: Service.describe(s)</span></pre>
      <p>Si te olvidas <code>self</code> en la firma, salta el error
      <code>TypeError: describe() takes 0 positional arguments but 1 was given</code>.
      Es uno de los errores más confusos al empezar — recuérdalo.</p>

      <h4>Crear varias instancias = el patrón típico</h4>
      <pre>servicios = []
<span class="kw">for</span> port <span class="kw">in</span> [<span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>]:
    s = <span class="fn">Service</span>(<span class="str">"acme.local"</span>, port)   <span class="com"># crea una instancia</span>
    s.<span class="fn">grab</span>()                          <span class="com"># método sobre esa instancia</span>
    servicios.<span class="fn">append</span>(s)

<span class="kw">for</span> s <span class="kw">in</span> servicios:
    <span class="fn">print</span>(s.<span class="fn">describe</span>())             <span class="com"># cada instancia es independiente</span></pre>
      <p>Cada instancia tiene su propia copia de <code>self.host</code>,
      <code>self.port</code>, <code>self.banner</code>. Modificar una no
      afecta a las otras.</p>

      <h4>Métodos vs funciones libres</h4>
      <p>Un método es una función "que vive dentro de una clase". Cuando
      tiene sentido pensar en "ESTE servicio sabe describirse", lo metes
      como método. Cuando es lógica genérica que no pertenece a un objeto
      concreto, mejor función suelta:</p>
      <pre><span class="com"># Método — depende de la instancia</span>
s.<span class="fn">describe</span>()

<span class="com"># Función — no necesita instancia, opera sobre lo que le pases</span>
<span class="fn">parse_version</span>(<span class="str">"2.4.1"</span>)</pre>

      <h4>Errores comunes con clases</h4>
      <dl>
        <dt>1. Olvidar self</dt>
        <dd>Como decíamos arriba — el primer parámetro de TODO método debe
            ser self.</dd>
        <dt>2. Acceder a atributo no inicializado</dt>
        <dd>Si <code>__init__</code> no le asigna <code>self.foo</code> y luego
            otro método hace <code>self.foo</code>, peta con AttributeError.
            Solución: inicializa todos los atributos en <code>__init__</code>,
            aunque sea con valor por defecto (<code>self.banner = ""</code>).</dd>
        <dt>3. Confundir variable de clase con de instancia</dt>
        <dd>Atributos asignados FUERA de <code>__init__</code> (a nivel de
            clase) se comparten entre todas las instancias. Es fuente de bugs
            cuando ese atributo es mutable (lista, dict). Regla simple: si
            es estado de cada objeto, va dentro de <code>__init__</code>.</dd>
        <dt>4. Olvidar <code>return</code> en métodos que devuelven valor</dt>
        <dd><code>describe(self)</code> sin return no devuelve nada
            (<code>None</code>). Si lo asignas a una variable y la usas,
            te da problemas más adelante.</dd>
      </dl>
    `,
  },

  17: {
    title: "Archivos: open + with",
    body: `
      <p>Lectura/escritura de archivos con la sintaxis <strong>with</strong>, que
      cierra el archivo automáticamente al salir del bloque (incluso si hay
      excepción).</p>
      <pre><span class="com"># Escribir</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"reporte.txt"</span>, <span class="str">"w"</span>) <span class="kw">as</span> f:
    f.<span class="fn">write</span>(<span class="str">"linea 1\\n"</span>)
    f.<span class="fn">write</span>(<span class="str">"linea 2\\n"</span>)

<span class="com"># Leer</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"reporte.txt"</span>) <span class="kw">as</span> f:
    contenido = f.<span class="fn">read</span>()       <span class="com"># todo en un string</span>
    <span class="com"># o</span>
    <span class="kw">for</span> linea <span class="kw">in</span> f:
        <span class="fn">print</span>(linea.<span class="fn">strip</span>())</pre>
      <h4>Modos</h4>
      <ul>
        <li><code>"r"</code> lectura (por defecto)</li>
        <li><code>"w"</code> escritura nueva (sobreescribe el archivo)</li>
        <li><code>"a"</code> append (añade al final)</li>
        <li><code>"rb"/"wb"</code> binario (bytes en lugar de strings)</li>
      </ul>
      <p>En pentesting, la escritura de archivos es crítica para reportes y
      bitácoras. La lectura para parsear configs, logs y wordlists.</p>
    `,
  },

  18: {
    title: "Repaso del Capítulo 2",
    body: `
      <p>Cap 2 ha sido sobre transformar bytes en información:</p>
      <ul>
        <li><strong>String methods</strong>: split, strip, startswith — el 80% del parsing.</li>
        <li><strong>regex (re)</strong>: cuando los strings no tienen formato fijo.</li>
        <li><strong>try/except</strong>: scripts robustos que no mueren al primer fallo.</li>
        <li><strong>Clases</strong>: estructurar estado complejo cuando hay muchas instancias.</li>
        <li><strong>Archivos con with</strong>: persistir resultados.</li>
      </ul>
      <p>El siguiente capítulo es <strong>Web Hacking I</strong>: el protocolo HTTP
      es el lenguaje del 80% de las aplicaciones modernas. Si dominas requests, status
      codes, headers, cookies y JSON, entiendes la mayoría del ataque y la mayoría de
      la defensa.</p>
    `,
  },

  19: {
    title: "HTTP — primera petición",
    body: `
      <p><strong>HTTP</strong> es un protocolo cliente-servidor basado en peticiones
      y respuestas. Cliente envía: método + URL + headers + body opcional. Servidor
      responde: status code + headers + body.</p>
      <pre>resp = <span class="fn">fetch_url</span>(<span class="str">"https://target.local/admin"</span>)
<span class="fn">print</span>(resp.status)   <span class="com"># 401</span>
<span class="fn">print</span>(resp.body)     <span class="com"># "Authentication required"</span>
<span class="fn">print</span>(resp.headers)  <span class="com"># {'content-type': 'text/html'}</span></pre>
      <h4>Status codes que hay que conocer</h4>
      <ul>
        <li><strong>2xx</strong> éxito (200 OK, 201 Created, 204 No Content)</li>
        <li><strong>3xx</strong> redirección (301 Moved, 302 Found, 304 Not Modified)</li>
        <li><strong>4xx</strong> error del cliente (400 Bad, 401 Unauth, 403 Forbidden, 404 Not Found, 429 Too Many)</li>
        <li><strong>5xx</strong> error del servidor (500 Internal, 502 Bad Gateway, 503 Unavailable)</li>
      </ul>
      <p>En pentesting, distintos códigos te dicen cosas distintas: 401 = "necesitas
      auth", 403 = "auth válida pero no autorizado para este recurso" (¡puede haber
      bypass!), 429 = "te están limitando, ralentiza".</p>
    `,
  },

  20: {
    title: "JSON y APIs REST",
    body: `
      <p>Las APIs modernas devuelven <strong>JSON</strong>: dicts, listas, números,
      strings, true/false/null. Python tiene mapeo directo:</p>
      <pre>resp = <span class="fn">fetch_url</span>(<span class="str">"https://api/products"</span>)
productos = resp.<span class="fn">json</span>()    <span class="com"># lista de dicts</span>

<span class="kw">for</span> p <span class="kw">in</span> productos:
    <span class="fn">print</span>(p[<span class="str">"name"</span>], p[<span class="str">"price"</span>])</pre>
      <h4>JSON ↔ Python</h4>
      <ul>
        <li>JSON object <code>{}</code> ↔ Python dict</li>
        <li>JSON array <code>[]</code> ↔ Python list</li>
        <li>JSON string ↔ Python str</li>
        <li>JSON true/false/null ↔ Python True/False/None</li>
      </ul>
      <h4>Patrón típico de auditoría</h4>
      <pre>resp = <span class="fn">fetch_url</span>(<span class="str">"/api/users"</span>)
<span class="kw">if</span> resp.status == <span class="num">200</span>:
    users = resp.<span class="fn">json</span>()
    admins = [u <span class="kw">for</span> u <span class="kw">in</span> users <span class="kw">if</span> u[<span class="str">"role"</span>] == <span class="str">"admin"</span>]
    <span class="fn">print</span>(<span class="str">f"Found </span>{<span class="fn">len</span>(admins)}<span class="str"> admins"</span>)</pre>
      <p>Si la API devuelve formatos inesperados, <code>resp.json()</code> lanzará
      <code>JSONDecodeError</code> — captúralo con try/except.</p>
    `,
  },

  21: {
    title: "POST con datos",
    body: `
      <p>POST envía datos al servidor para crear o actualizar. Login, formularios,
      uploads, mutaciones de cualquier tipo.</p>
      <pre>resp = <span class="fn">fetch_url</span>(
    <span class="str">"https://target/login"</span>,
    method=<span class="str">"POST"</span>,
    data={<span class="str">"username"</span>: <span class="str">"admin"</span>, <span class="str">"password"</span>: <span class="str">"x"</span>},
)</pre>
      <h4>GET vs POST en pentesting</h4>
      <ul>
        <li><strong>GET</strong>: parámetros en la URL — visibles en logs, en el
            historial del navegador. No usar para credenciales.</li>
        <li><strong>POST</strong>: parámetros en el body — no aparecen en URL.
            Estándar para login y operaciones que cambian estado.</li>
      </ul>
      <h4>Bruteforcing controlado</h4>
      <pre>passwords = [<span class="str">"admin"</span>, <span class="str">"123456"</span>, <span class="str">"password"</span>, <span class="str">"qwerty"</span>]
<span class="kw">for</span> p <span class="kw">in</span> passwords:
    r = <span class="fn">fetch_url</span>(url, <span class="str">"POST"</span>, {<span class="str">"u"</span>:<span class="str">"admin"</span>, <span class="str">"p"</span>:p})
    <span class="kw">if</span> r.status == <span class="num">200</span>:
        <span class="fn">print</span>(<span class="str">f"PWND: </span>{p}<span class="str">"</span>)
        <span class="kw">break</span></pre>
      <p>En la realidad esto sería contra un endpoint con rate limiting roto. Si
      lo encuentras en un cliente, es un hallazgo crítico (alta likelihood de
      explotación).</p>
    `,
  },

  22: {
    title: "Sesiones y cookies",
    body: `
      <p>HTTP es <strong>stateless</strong>: cada petición es independiente. Para
      mantener "tú eres el mismo usuario que hizo login hace 2 segundos", el
      servidor te envía una <strong>cookie</strong>, y tu cliente la incluye en
      cada petición siguiente.</p>
      <pre><span class="com"># Tras login el servidor responde con Set-Cookie: session=...</span>
login = <span class="fn">fetch_url</span>(url_login, <span class="str">"POST"</span>, creds)
<span class="fn">print</span>(login.cookies)   <span class="com"># {'session': 'abc123'}</span>

<span class="com"># PyHack mantiene la cookie automáticamente</span>
admin = <span class="fn">fetch_url</span>(url_admin)   <span class="com"># lleva session=abc123</span></pre>
      <h4>Vulnerabilidades clásicas de sesión</h4>
      <ul>
        <li><strong>Session fixation</strong>: el server no rota el id tras login.</li>
        <li><strong>Session prediction</strong>: ids predecibles (incremental).</li>
        <li><strong>Faltan flags</strong>: cookie sin <code>HttpOnly</code> = robable
            via XSS; sin <code>Secure</code> = filtrable por HTTP plano.</li>
      </ul>
      <p>En tu reporte, comprueba siempre los flags de las cookies de sesión —
      es uno de los hallazgos más fáciles y más reales.</p>
    `,
  },

  23: {
    title: "Headers HTTP",
    body: `
      <p>Los headers son metadatos del request o response. Algunos comunes:</p>
      <ul>
        <li><strong>Authorization</strong>: <code>Bearer TOKEN</code> o <code>Basic ...</code> — auth.</li>
        <li><strong>User-Agent</strong>: identifica el cliente. Servidores responden
            distinto según éste.</li>
        <li><strong>X-Forwarded-For</strong>: IP original cuando hay proxy. ¡A veces
            se confía sin validar!</li>
        <li><strong>Cookie</strong>: cookies de sesión.</li>
        <li><strong>Content-Type</strong>: formato del body (json, form, multipart).</li>
      </ul>
      <pre>headers = {
    <span class="str">"Authorization"</span>: <span class="str">"Bearer eyJhbG..."</span>,
    <span class="str">"User-Agent"</span>: <span class="str">"Mozilla/5.0 ..."</span>,
}
resp = <span class="fn">fetch_url</span>(url, <span class="str">"GET"</span>, <span class="kw">None</span>, headers)</pre>
      <h4>Trucos clásicos</h4>
      <ul>
        <li><strong>X-Forwarded-For: 127.0.0.1</strong> — algunos panels admin
            confían en este header para "saltarse" auth si vienes "de localhost".</li>
        <li><strong>Cambiar User-Agent</strong> — webs sirven páginas distintas a
            crawlers, móviles, IE6, etc.</li>
        <li><strong>Accept-Language</strong> — algunos sites filtran/redirigen por
            idioma con lógica vulnerable.</li>
      </ul>
    `,
  },

  24: {
    title: "Repaso del Capítulo 3",
    body: `
      <p>Web HTTP completo:</p>
      <ul>
        <li><strong>fetch_url + status codes</strong>: petición y lectura.</li>
        <li><strong>JSON</strong>: parsing automático con .json().</li>
        <li><strong>POST con data</strong>: enviar al servidor.</li>
        <li><strong>Sesiones y cookies</strong>: mantener autenticación entre peticiones.</li>
        <li><strong>Headers</strong>: metadatos para auth, identificación, manipulación.</li>
      </ul>
      <p>Cap 4 entra en <strong>vulnerabilidades web clásicas</strong>:
      SQLi, XSS, IDOR, path traversal. Todo educativo, contra labs simulados, y
      cada una con su mitigación correspondiente: aprender el ataque para
      entender la defensa.</p>
    `,
  },

  25: {
    title: "Validación de input — denylist con regex",
    body: `
      <p>Una capa defensiva temprana: si el input contiene metacaracteres típicos
      de inyección (comillas, dobles guiones SQL, palabras clave como OR/UNION),
      lo marcas y lo rechazas antes de que toque la lógica de la aplicación.</p>
      <pre><span class="kw">import</span> re

<span class="kw">def</span> <span class="fn">is_suspicious</span>(s):
    <span class="kw">return</span> <span class="fn">bool</span>(re.<span class="fn">search</span>(<span class="str">r"'|--|\bOR\b|\bUNION\b"</span>, s, re.IGNORECASE))</pre>
      <p><code>re.search</code> devuelve <code>None</code> si no encuentra el
      patrón, o un objeto Match si lo encuentra. <code>bool(...)</code> lo
      convierte a True/False.</p>
      <h4>Lo que esto NO sustituye</h4>
      <p>Esta capa es <em>telemetría barata</em>, no una defensa real. La defensa
      de fondo contra SQLi son los <strong>prepared statements</strong>: pasar
      los valores como parámetros separados de la query, no concatenarlos.
      Cualquier ORM moderno (SQLAlchemy, Django ORM) lo hace por ti.</p>
      <pre><span class="com"># Bien — parametrizado</span>
cursor.<span class="fn">execute</span>(<span class="str">"SELECT * FROM users WHERE u=%s"</span>, (user,))</pre>
      <p>Una denylist regex tiene falsos positivos (un usuario llamado
      <code>O'Brien</code> activa la regla) y falsos negativos (un atacante con
      paciencia codifica el payload). Sirve para alertar y aprender qué te llega
      — no para confiar en ella como única barrera.</p>
    `,
  },

  26: {
    title: "Auditoría de access.log con Counter",
    body: `
      <p><code>collections.Counter</code> es un dict que cuenta ocurrencias.
      Construido sobre cualquier iterable, devuelve {valor: cuántas veces
      apareció}.</p>
      <pre><span class="kw">from</span> collections <span class="kw">import</span> Counter

ips = Counter(ip <span class="kw">for</span> ip, _, _, _ <span class="kw">in</span> LOGS)
top = ips.<span class="fn">most_common</span>(<span class="num">3</span>)   <span class="com"># [(ip, n), ...] ordenado</span></pre>
      <h4>Detectar scanners en logs</h4>
      <p>Un scanner toca rutas que no están en la app — <code>/.env</code>,
      <code>/.git/config</code>, <code>/wp-login.php</code>, <code>/admin</code>.
      El patrón es: una IP que dispara varias requests a paths sospechosos en
      poco tiempo.</p>
      <pre>SUS = (<span class="str">"/.env"</span>, <span class="str">"/.git"</span>, <span class="str">"/wp-login"</span>, <span class="str">"/admin"</span>)
sus = Counter(ip <span class="kw">for</span> ip, _, path, _ <span class="kw">in</span> LOGS
              <span class="kw">if</span> <span class="fn">any</span>(s <span class="kw">in</span> path <span class="kw">for</span> s <span class="kw">in</span> SUS))</pre>
      <p><strong>any(...)</strong> devuelve True si al menos un elemento del
      iterable es truthy — útil para "¿el path contiene alguno de los patrones?"
      sin tener que escribir un OR largo.</p>
      <p>En producción, esto suele vivir como reglas de un WAF (ModSecurity,
      Cloudflare, AWS WAF). Pero saber expresarlo en Python te permite hacer
      auditorías ad-hoc, generar gráficas para reportes, o validar que las
      reglas del WAF están funcionando.</p>
    `,
  },

  27: {
    title: "Security headers — defensa barata",
    body: `
      <p>Cuatro headers que toda app web debería mandar. Cuesta minutos
      configurarlos y reducen drásticamente la superficie a XSS, clickjacking
      y downgrade attacks.</p>
      <table>
        <tr><th>Header</th><th>Para qué</th></tr>
        <tr><td><code>Content-Security-Policy</code></td>
            <td>Limita de dónde puede cargar JS, CSS, imágenes — la mejor
                defensa contra XSS si está bien configurado.</td></tr>
        <tr><td><code>Strict-Transport-Security</code></td>
            <td>Fuerza HTTPS para futuras visitas. Mata downgrade attacks.</td></tr>
        <tr><td><code>X-Frame-Options</code></td>
            <td>Impide que tu sitio se cargue dentro de un <code>&lt;iframe&gt;</code>
                de otro sitio (clickjacking).</td></tr>
        <tr><td><code>X-Content-Type-Options: nosniff</code></td>
            <td>Impide que el navegador "adivine" el Content-Type — para que un
                <code>.txt</code> con HTML dentro no se ejecute como página.</td></tr>
      </table>
      <h4>Auditoría con fetch_url</h4>
      <pre>r = <span class="fn">fetch_url</span>(url)
faltan = [h <span class="kw">for</span> h <span class="kw">in</span> REQUERIDOS <span class="kw">if</span> h <span class="kw">not in</span> r.headers]</pre>
      <p>La <strong>list comprehension</strong> <code>[expr for x in lista if
      cond]</code> es una forma compacta de filtrar y transformar. Aquí:
      "para cada header de la lista, dame los que NO están en r.headers".</p>
      <p>En servidores reales: <code>nginx</code> los pone con <code>add_header</code>;
      <code>Apache</code> con <code>Header set</code>; en Express (Node) hay
      <code>helmet</code>. Pero auditarlos desde fuera con un script Python
      sigue siendo la forma más rápida de saber si están.</p>
    `,
  },

  28: {
    title: "Authz por recurso — auth ≠ authz",
    body: `
      <p>Dos cosas distintas que mucha gente confunde:</p>
      <ul>
        <li><strong>Autenticación</strong> — "¿quién eres?" (login, sesión).</li>
        <li><strong>Autorización</strong> — "¿puedes tocar ESTE recurso?".</li>
      </ul>
      <p>El bug típico (IDOR) es escribir el segundo paso así:</p>
      <pre><span class="com"># MAL — solo comprueba que estás logueado</span>
@<span class="fn">login_required</span>
<span class="kw">def</span> <span class="fn">account</span>(uid):
    <span class="kw">return</span> db.users.<span class="fn">get</span>(uid)</pre>
      <p>Un usuario logueado como id 7 puede pedir <code>/account/1</code> y
      recibir los datos del admin. La regla correcta verifica ownership (o un
      rol con privilegio):</p>
      <pre><span class="kw">def</span> <span class="fn">can_access</span>(user, resource):
    <span class="kw">if</span> user[<span class="str">"role"</span>] == <span class="str">"admin"</span>:
        <span class="kw">return</span> <span class="kw">True</span>
    <span class="kw">return</span> user[<span class="str">"id"</span>] == resource[<span class="str">"owner_id"</span>]</pre>
      <h4>Por qué un helper</h4>
      <p>Centralizar la decisión en una función te deja:</p>
      <ul>
        <li>Probarla sola con tests unitarios — sin levantar el servidor.</li>
        <li>Reusarla en cada endpoint protegido. Una sola fuente de verdad.</li>
        <li>Cambiar la política (añadir roles, permisos por equipo) en un sitio.</li>
      </ul>
      <p>En frameworks reales hay paquetes que hacen esto: <code>casbin</code>
      (multi-lenguaje), <code>django-guardian</code>, <code>oso</code>. Empieza
      simple — una función con <code>return True/False</code> resuelve el 80% de
      los casos.</p>
    `,
  },

  29: {
    title: "Path normalization — bloquear traversal",
    body: `
      <p>Servir archivos a partir de un nombre que llega del usuario es un patrón
      común y peligroso. Sin saneamiento, <code>?name=../../../../etc/passwd</code>
      hace que el path resuelto salga del directorio permitido.</p>
      <h4>El idioma defensivo</h4>
      <pre><span class="kw">import</span> os

BASE = <span class="str">"/var/www/files"</span>

<span class="kw">def</span> <span class="fn">safe_join</span>(base, name):
    candidate = os.path.<span class="fn">normpath</span>(os.path.<span class="fn">join</span>(base, name))
    <span class="kw">if</span> candidate == base <span class="kw">or</span> candidate.<span class="fn">startswith</span>(base + os.sep):
        <span class="kw">return</span> candidate
    <span class="kw">return</span> <span class="kw">None</span>   <span class="com"># se escapaba — rechazar</span></pre>
      <ul>
        <li><code>os.path.join</code> concatena respetando el separador del SO.</li>
        <li><code>os.path.normpath</code> resuelve los <code>..</code>, los
            <code>./</code>, los separadores duplicados.</li>
        <li><code>.startswith(base + os.sep)</code> es la comprobación clave:
            tras normalizar, el path debe seguir dentro del directorio base.</li>
      </ul>
      <h4>Casos a probar</h4>
      <ul>
        <li><code>readme.txt</code> → OK</li>
        <li><code>subdir/notes.md</code> → OK</li>
        <li><code>../../../../etc/passwd</code> → rechazado</li>
        <li><code>/etc/shadow</code> (path absoluto) → rechazado, porque al
            hacer <code>join</code> con un absoluto, Python <em>descarta</em>
            el base y se queda con el absoluto.</li>
      </ul>
      <p>Otra opción aún más restrictiva: una <strong>allowlist</strong> de
      archivos servibles (un dict {alias: path_real}). El usuario manda el
      alias, no el path. Imposible escapar de algo que no controla.</p>
    `,
  },

  30: {
    title: "Repaso del Capítulo 4",
    body: `
      <p>El reverso defensivo de las vulnerabilidades clásicas — el código que
      hace que SQLi, XSS, IDOR y traversal NO caigan:</p>
      <ul>
        <li><strong>Validación de input</strong>: denylist con regex como capa
            de aviso; prepared statements como defensa real.</li>
        <li><strong>Auditoría de logs</strong>: detectar scanners y patrones
            sospechosos antes de que escalen.</li>
        <li><strong>Security headers</strong>: CSP, HSTS, X-Frame-Options,
            X-Content-Type-Options. Configurarlos cuesta minutos.</li>
        <li><strong>Authz por recurso</strong>: una función centralizada
            <code>can_access(user, resource)</code> que el código llama en cada
            endpoint protegido.</li>
        <li><strong>Path normalization</strong>: <code>safe_join</code> con
            <code>os.path.normpath</code> + <code>.startswith(base)</code>
            para rechazar lo que se sale del directorio permitido.</li>
      </ul>
      <p>Todas comparten un principio: <strong>nunca confiar en input del usuario
      sin validar o escapar, y nunca asumir que estar logueado equivale a tener
      permiso</strong>. Casi todo lo que sale en el OWASP Top 10 cae cuando estos
      cinco hábitos están instalados.</p>
      <p>Cap 5: <strong>cripto</strong>. Romper lo mal hecho, entender por qué
      lo bien hecho funciona.</p>
    `,
  },

  31: {
    title: "Codificaciones (NO son cifrado)",
    body: `
      <p>Codificación = transformar bytes a representación textual portable.
      Cualquiera con la receta lo revierte. <strong>NO protege nada.</strong></p>
      <h4>Las tres más comunes</h4>
      <ul>
        <li><strong>base64</strong>: bytes → 64 caracteres imprimibles (A-Z, a-z, 0-9, +, /).
            Termina en uno o dos <code>=</code>. Usado en headers HTTP, JWT, claves SSH, emails.</li>
        <li><strong>hex</strong>: bytes → dos caracteres por byte (0-9, a-f).
            Hashes, dumps de memoria, MAC addresses.</li>
        <li><strong>URL encoding</strong>: caracteres especiales → <code>%XX</code>.
            En URLs y form data.</li>
      </ul>
      <pre><span class="kw">import</span> base64
base64.<span class="fn">b64decode</span>(<span class="str">"YWRtaW46c3VwZXJzZWNyZXQ="</span>)
<span class="com"># b'admin:supersecret' → str.decode() → "admin:supersecret"</span>

<span class="fn">bytes</span>.<span class="fn">fromhex</span>(<span class="str">"68656c6c6f"</span>)
<span class="com"># b'hello'</span>

<span class="kw">from</span> urllib.parse <span class="kw">import</span> unquote
<span class="fn">unquote</span>(<span class="str">"%3Cscript%3E"</span>)
<span class="com"># '&lt;script&gt;'</span></pre>
      <p>Si encuentras <code>YWRtaW46...</code> en un header Authorization, es Basic
      auth — username:password en base64. Inseguro sobre HTTP plano (cualquiera con
      acceso al tráfico lo revierte). Sobre HTTPS sigue siendo malo (cualquier log
      expuesto y tienes la credencial en claro).</p>
    `,
  },

  32: {
    title: "Hashes y diccionarios",
    body: `
      <p><strong>Hash</strong>: función que mapea bytes arbitrarios a un valor de
      longitud fija. Determinista (mismo input → mismo output) y "irreversible"
      (no se puede recuperar el input desde el output... directamente).</p>
      <pre><span class="kw">import</span> hashlib
hashlib.<span class="fn">md5</span>(<span class="str">b"password"</span>).<span class="fn">hexdigest</span>()
<span class="com"># '5f4dcc3b5aa765d61d8327deb882cf99'</span></pre>
      <h4>Por qué los hashes débiles caen</h4>
      <p>Aunque el hash no se puede invertir directamente, sí se puede atacar por
      diccionario: hasheas candidatos hasta encontrar uno que coincida.</p>
      <pre><span class="kw">for</span> word <span class="kw">in</span> wordlist:
    <span class="kw">if</span> hashlib.<span class="fn">md5</span>(word.<span class="fn">encode</span>()).<span class="fn">hexdigest</span>() == target_hash:
        <span class="fn">print</span>(<span class="str">f"Cracked: </span>{word}<span class="str">"</span>)
        <span class="kw">break</span></pre>
      <p>md5 es <strong>velocísimo</strong>. Una GPU moderna calcula billones de hashes
      md5 por segundo. Una wordlist de 14 millones (rockyou.txt) se prueba en
      milésimas.</p>
      <h4>Buenos hashes para passwords</h4>
      <ul>
        <li><strong>bcrypt</strong>: lento a propósito, sal automática, factor de coste configurable.</li>
        <li><strong>argon2</strong>: ganador de Password Hashing Competition 2015.</li>
        <li><strong>scrypt</strong>: lento + memory-hard.</li>
      </ul>
      <p>Si auditando ves md5/sha1 sin sal en una tabla de passwords, es hallazgo
      crítico inmediato.</p>
    `,
  },

  33: {
    title: "César y XOR",
    body: `
      <h4>Cifrado César</h4>
      <p>Cada letra se desplaza N posiciones en el alfabeto. Solo 26 claves
      posibles → fuerza bruta humana en segundos.</p>
      <pre><span class="kw">for</span> shift <span class="kw">in</span> <span class="fn">range</span>(<span class="num">26</span>):
    plain = <span class="str">""</span>
    <span class="kw">for</span> c <span class="kw">in</span> ciphertext:
        <span class="kw">if</span> c.<span class="fn">isalpha</span>():
            base = <span class="fn">ord</span>(<span class="str">"A"</span>) <span class="kw">if</span> c.<span class="fn">isupper</span>() <span class="kw">else</span> <span class="fn">ord</span>(<span class="str">"a"</span>)
            plain += <span class="fn">chr</span>((<span class="fn">ord</span>(c) - base - shift) % <span class="num">26</span> + base)
        <span class="kw">else</span>:
            plain += c
    <span class="fn">print</span>(<span class="str">f"shift=</span>{shift}<span class="str">: </span>{plain}<span class="str">"</span>)</pre>
      <h4>XOR de byte único</h4>
      <p>Cada byte del mensaje se XOR con el mismo byte clave. Solo 256 claves →
      fuerza bruta trivial.</p>
      <pre><span class="kw">for</span> key <span class="kw">in</span> <span class="fn">range</span>(<span class="num">256</span>):
    decoded = <span class="fn">bytes</span>(b ^ key <span class="kw">for</span> b <span class="kw">in</span> ciphertext)
    <span class="kw">if</span> <span class="fn">all</span>(<span class="num">32</span> &lt;= c &lt; <span class="num">127</span> <span class="kw">for</span> c <span class="kw">in</span> decoded):
        <span class="fn">print</span>(<span class="str">f"key=</span>{key}<span class="str">: </span>{decoded.<span class="fn">decode</span>()}<span class="str">"</span>)</pre>
      <p>El filtro "todos imprimibles" descarta el 99% de las claves equivocadas y
      te deja unos pocos candidatos a inspeccionar.</p>
      <h4>Por qué importa entender estos rotos</h4>
      <p>Crypto seria moderna (AES-GCM, ChaCha20-Poly1305) usa claves de 256 bits
      = 2^256 combinaciones — inalcanzable por fuerza bruta. Y lleva autenticación
      integrada para detectar manipulación. Lo que César y XOR-1 no tienen: clave
      grande, IV, padding bien hecho, autenticación.</p>
    `,
  },

  34: {
    title: "Bitwise: bits son lo más bajo",
    body: `
      <p>Operadores que trabajan a nivel de bit:</p>
      <pre>a & b    <span class="com"># AND   — bit 1 si ambos lo son</span>
a | b    <span class="com"># OR    — bit 1 si al menos uno</span>
a ^ b    <span class="com"># XOR   — bit 1 si difieren</span>
~a       <span class="com"># NOT   — invierte</span>
a &lt;&lt; n   <span class="com"># shift izquierda — multiplica por 2^n</span>
a &gt;&gt; n   <span class="com"># shift derecha   — divide por 2^n</span></pre>
      <h4>Cuándo aparecen</h4>
      <ul>
        <li><strong>Permisos UNIX</strong> (chmod 755): cada bit es un permiso.</li>
        <li><strong>Flags TCP</strong> (SYN, ACK, FIN, RST): un byte = ocho flags.</li>
        <li><strong>IP / subnet masks</strong>: AND para sacar la red, NOT para
            la wildcard.</li>
        <li><strong>Crypto</strong>: XOR es la operación fundamental de cifrados
            stream y de muchas primitivas internas.</li>
        <li><strong>Optimizaciones</strong>: <code>x &amp; 1</code> es par/impar
            mucho más rápido que <code>x % 2</code> (en lenguajes no-Python).</li>
      </ul>
      <pre><span class="com"># ¿El usuario tiene permiso de execute?</span>
EXEC_BIT = <span class="num">0o100</span>
<span class="kw">if</span> permisos &amp; EXEC_BIT:
    <span class="fn">print</span>(<span class="str">"sí, owner-x"</span>)</pre>

      <h4>Tabla de verdad — los 4 operadores binarios</h4>
      <pre>A   B  | A&amp;B  A|B  A^B
0   0  |  0    0    0
0   1  |  0    1    1
1   0  |  0    1    1
1   1  |  1    1    0</pre>
      <p>El AND da 1 solo si ambos son 1; el OR da 1 si al menos uno; el
      XOR da 1 si son DIFERENTES (clave en cripto).</p>

      <h4>Representación binaria</h4>
      <p>Un byte tiene 8 bits. Cada bit vale 1, 2, 4, 8, 16, 32, 64, 128 según
      su posición (de derecha a izquierda):</p>
      <pre>0b1100 = 8 + 4         = 12
0b0110 = 4 + 2         = 6
0b1111 = 8 + 4 + 2 + 1 = 15</pre>
      <p>En Python escribes literales binarios con <code>0b...</code>, octales
      con <code>0o...</code>, hexadecimales con <code>0x...</code>. Imprimir
      con f-string en distintas bases:</p>
      <pre>n = <span class="num">42</span>
<span class="fn">print</span>(<span class="str">f"</span>{n}<span class="str">"</span>)         <span class="com"># 42       (decimal)</span>
<span class="fn">print</span>(<span class="str">f"</span>{n:b}<span class="str">"</span>)        <span class="com"># 101010   (binario)</span>
<span class="fn">print</span>(<span class="str">f"</span>{n:08b}<span class="str">"</span>)      <span class="com"># 00101010 (binario, 8 bits, padding 0)</span>
<span class="fn">print</span>(<span class="str">f"</span>{n:o}<span class="str">"</span>)        <span class="com"># 52       (octal)</span>
<span class="fn">print</span>(<span class="str">f"</span>{n:x}<span class="str">"</span>)        <span class="com"># 2a       (hex)</span></pre>

      <h4>Patrones idiomáticos: máscaras</h4>
      <p>Una <strong>máscara</strong> es un patrón de bits que aísla los que
      te interesan.</p>
      <pre><span class="com"># Comprobar bit (mask con AND)</span>
<span class="kw">if</span> permisos &amp; <span class="num">0o100</span>:        <span class="com"># ¿está activo el bit owner-x?</span>
    ...

<span class="com"># Activar bit (set con OR)</span>
permisos = permisos | <span class="num">0o002</span>   <span class="com"># añadir others-w</span>

<span class="com"># Desactivar bit (clear con AND + NOT)</span>
permisos = permisos &amp; ~<span class="num">0o002</span>  <span class="com"># quitar others-w</span>

<span class="com"># Alternar bit (toggle con XOR)</span>
permisos = permisos ^ <span class="num">0o002</span>   <span class="com"># cambia el bit, sea cual sea</span></pre>

      <h4>XOR como cifrado mínimo</h4>
      <p>La propiedad <code>A ^ B ^ B == A</code> es la base de los cifrados
      stream simétricos. Aplicar XOR con la misma clave dos veces deshace:</p>
      <pre>plaintext = <span class="str">b"hola"</span>
key = <span class="num">0x42</span>

<span class="com"># Cifrar: XOR byte a byte</span>
ciphertext = <span class="fn">bytes</span>(b ^ key <span class="kw">for</span> b <span class="kw">in</span> plaintext)

<span class="com"># Descifrar: el MISMO XOR con la misma clave</span>
recuperado = <span class="fn">bytes</span>(b ^ key <span class="kw">for</span> b <span class="kw">in</span> ciphertext)
<span class="kw">assert</span> recuperado == plaintext   <span class="com"># True</span></pre>
      <p>Aviso: con clave de 1 byte solo hay 256 posibilidades, brute force
      en milisegundos. Para cifrado serio hace falta clave grande, padding,
      modo de operación.</p>

      <h4>Errores típicos con bitwise</h4>
      <dl>
        <dt>1. Confundir AND lógico con AND bitwise</dt>
        <dd><code>and</code> es lógico (devuelve True/False).
            <code>&amp;</code> es bitwise (devuelve enteros). Si haces
            <code>permisos and 0o100</code> no estás comprobando el bit,
            estás haciendo lógica truthy.</dd>
        <dt>2. Olvidar paréntesis con &amp; y comparaciones</dt>
        <dd><code>x &amp; 1 == 0</code> NO es lo que esperas — Python lo lee
            como <code>x &amp; (1 == 0)</code> = <code>x &amp; False</code>.
            Pon paréntesis: <code>(x &amp; 1) == 0</code>.</dd>
        <dt>3. Confundir <code>~</code> con NOT lógico</dt>
        <dd><code>~5</code> en Python es <code>-6</code> (complemento a 2 con
            signo). Si lo que quieres es invertir bits dentro de N bits,
            usa máscara: <code>x ^ 0xFF</code> invierte solo los 8 bits bajos.</dd>
        <dt>4. Shift fuera de rango</dt>
        <dd><code>1 &lt;&lt; 100</code> da un número enorme. En Python no
            desborda (los enteros son arbitrarios), pero si lo pasas a un
            socket o struct, puedes liar mucho.</dd>
      </dl>

      <h4>Cuándo NO obsesionarse con bitwise</h4>
      <p>Para lógica de aplicación (estados, banderas de tu juego, etc.) un
      conjunto de booleanos en un dict es más legible que un bitfield. Bitwise
      cobra sentido cuando manejas formatos compactos (protocolos de red,
      permisos UNIX, hardware) o cripto.</p>
    `,
  },

  35: {
    title: "Repaso del Capítulo 5",
    body: `
      <p>Cripto y datos:</p>
      <ul>
        <li><strong>Codificaciones</strong>: base64, hex, url — NO son cifrado.</li>
        <li><strong>Hashes</strong>: irreversibles directamente, atacables por diccionario si son débiles (md5, sha1) o sin sal.</li>
        <li><strong>Cifrados clásicos</strong>: César y XOR-1 — rotos en milisegundos. Ilustran qué falla en crypto débil.</li>
        <li><strong>Bitwise</strong>: AND, OR, XOR, shifts. Aparece en permisos, protocolos, crypto interna.</li>
      </ul>
      <p>Cap 6 baja un nivel: <strong>red bajo HTTP</strong>. Sockets, paquetes,
      construir HTTP a mano para entender qué te abstraen las librerías.</p>
    `,
  },

  36: {
    title: "Sockets — la base de la red",
    body: `
      <p>Bajo todo HTTP/HTTPS hay TCP. Bajo TCP hay sockets — la API básica de
      "abre conexión, manda bytes, recibe bytes".</p>
      <pre><span class="com"># API real de Python (no PyHack)</span>
<span class="kw">import</span> socket
s = socket.<span class="fn">socket</span>(socket.AF_INET, socket.SOCK_STREAM)
s.<span class="fn">connect</span>((<span class="str">"target.local"</span>, <span class="num">22</span>))
banner = s.<span class="fn">recv</span>(<span class="num">1024</span>)
s.<span class="fn">close</span>()</pre>
      <p>En PyHack se simplifica con <code>socket_request(host, port, payload)</code>:
      manda payload, devuelve respuesta como string, o None si el puerto no responde.</p>
      <h4>Para qué sirve a bajo nivel</h4>
      <ul>
        <li>Hablar con servicios que no usan HTTP: SMTP, FTP, SSH, telnet, custom.</li>
        <li>Escribir HTTP a mano para entender qué te oculta requests.</li>
        <li>Construir clientes de protocolos custom (CTFs).</li>
        <li>Banner grabbing más detallado que un escáner genérico.</li>
      </ul>
      <p>Para tareas serias en ofensiva real: <strong>scapy</strong> (manipulación
      de paquetes capa 2/3/4) y <strong>pwntools</strong> (CTFs/exploit dev).</p>
    `,
  },

  37: {
    title: "Análisis de tráfico capturado",
    body: `
      <p>El blue team captura tráfico continuamente. Cuando hay incidente, te
      pasan un <strong>pcap</strong> y necesitas extraer información: quién habló
      con quién, qué protocolos, qué patrones extraños.</p>
      <p>En PyHack los pcaps se simulan como listas de dicts (en la realidad
      usarías scapy o pyshark con archivos .pcap binarios — la lógica de filtrado y
      conteo es idéntica).</p>
      <pre>pkts = <span class="fn">parse_pcap</span>()

<span class="com"># Filtrar por puerto destino</span>
ssh = [p <span class="kw">for</span> p <span class="kw">in</span> pkts <span class="kw">if</span> p[<span class="str">"dst_port"</span>] == <span class="num">22</span>]

<span class="com"># Contar por src_ip</span>
<span class="kw">from</span> collections <span class="kw">import</span> Counter
talkers = <span class="fn">Counter</span>(p[<span class="str">"src_ip"</span>] <span class="kw">for</span> p <span class="kw">in</span> pkts)
<span class="fn">print</span>(talkers.<span class="fn">most_common</span>(<span class="num">5</span>))</pre>
      <h4>collections.Counter</h4>
      <p>Diccionario especializado para contar. <code>Counter(iterable)</code>
      cuenta apariciones; <code>.most_common(N)</code> devuelve los N más frecuentes.
      Hace en una línea lo que en un dict normal serían 4-5.</p>
    `,
  },

  38: {
    title: "HTTP a mano",
    body: `
      <p>El protocolo HTTP es <strong>texto plano</strong> sobre TCP. Una request
      mínima es:</p>
      <pre>GET / HTTP/1.1\\r\\n
Host: target.local\\r\\n
\\r\\n</pre>
      <p>Las dos líneas vacías al final (<code>\\r\\n\\r\\n</code>) marcan el fin
      de los headers. El servidor responde con:</p>
      <pre>HTTP/1.1 200 OK\\r\\n
Server: Apache/2.4.41\\r\\n
Content-Type: text/html\\r\\n
Content-Length: 47\\r\\n
\\r\\n
&lt;html&gt;...&lt;/html&gt;</pre>
      <h4>Por qué saber esto importa</h4>
      <ul>
        <li>Entender qué te abstrae la librería = depurar más rápido.</li>
        <li>Servicios mal hechos rechazan requests bien formados pero aceptan
            ligeras variaciones (raros, pero se ven).</li>
        <li>Algunas vulns requieren manipular el request a nivel de bytes
            (HTTP smuggling, header injection con \\r\\n).</li>
      </ul>
      <p>En la realidad, herramientas como <strong>Burp Suite</strong> o
      <strong>mitmproxy</strong> te dan esta vista por defecto en una GUI.
      Construirlo a mano una vez es ejercicio fundamental.</p>
    `,
  },

  39: {
    title: "Detección de patrones / anomalías",
    body: `
      <p>Análisis de tráfico no es solo "qué hay", es "qué se sale de lo normal".
      Patrones a buscar:</p>
      <ul>
        <li><strong>Volumen anómalo</strong> desde una IP (DDoS o exfil).</li>
        <li><strong>Frecuencia</strong>: muchas conexiones a 22/3389 desde una IP =
            posible bruteforce.</li>
        <li><strong>Beaconing</strong>: paquetes a intervalos regulares hacia el
            mismo destino externo (típico de C2).</li>
        <li><strong>Protocolos extraños en puertos comunes</strong>: SSH no debería
            hablar HTTP, etc.</li>
        <li><strong>DNS sospechoso</strong>: dominios largos generados (DGA),
            queries TXT inusualmente grandes (DNS exfil).</li>
      </ul>
      <pre><span class="kw">from</span> collections <span class="kw">import</span> Counter

SENSIBLE = {<span class="num">22</span>, <span class="num">3389</span>, <span class="num">3306</span>}
intentos_por_ip = <span class="fn">Counter</span>(
    p[<span class="str">"src_ip"</span>] <span class="kw">for</span> p <span class="kw">in</span> pkts
    <span class="kw">if</span> p[<span class="str">"dst_port"</span>] <span class="kw">in</span> SENSIBLE
)
sospechosos = [ip <span class="kw">for</span> ip, n <span class="kw">in</span> intentos_por_ip.<span class="fn">items</span>() <span class="kw">if</span> n &gt; <span class="num">10</span>]</pre>
      <p>Esto es lo que un IDS hace por debajo, simplificado. Reglas de Snort/Suricata
      son más complejas pero la lógica base es la misma: filtrar, contar, alertar
      sobre lo que sale del baseline.</p>
    `,
  },

  40: {
    title: "Repaso del Capítulo 6",
    body: `
      <p>Red bajo HTTP:</p>
      <ul>
        <li><strong>Sockets</strong>: la primitiva más baja. Habla cualquier protocolo TCP.</li>
        <li><strong>Análisis de tráfico</strong>: paquetes capturados como datos. Filtrar, contar, agrupar.</li>
        <li><strong>HTTP a mano</strong>: para entender qué te abstrae requests.</li>
        <li><strong>Detección de patrones</strong>: volumen + destino + frecuencia identifica anomalías.</li>
      </ul>
      <p>Cap 7: <strong>post-explotación + Bash</strong>. Una vez dentro de un
      sistema, qué hacer. Bash básico para enumeración. Combinar Python (orquestación)
      con bash (I/O del sistema).</p>
    `,
  },

  41: {
    title: "subprocess simulado: bash()",
    body: `
      <p>En la realidad, Python ejecuta comandos del sistema con
      <code>subprocess.run([cmd], capture_output=True, text=True)</code>. Devuelve
      un objeto con <code>.stdout</code>, <code>.stderr</code> y <code>.returncode</code>.</p>
      <p>PyHack te da la función <code>bash(cmd)</code> con la misma interfaz pero
      contra un filesystem virtual definido por nivel:</p>
      <pre>r = <span class="fn">bash</span>(<span class="str">"whoami"</span>)
<span class="fn">print</span>(r.stdout)       <span class="com"># "shopapp"</span>
<span class="fn">print</span>(r.returncode)   <span class="com"># 0</span></pre>
      <h4>Primer recon en un host comprometido</h4>
      <pre><span class="kw">for</span> cmd <span class="kw">in</span> [<span class="str">"whoami"</span>, <span class="str">"id"</span>, <span class="str">"uname -a"</span>, <span class="str">"pwd"</span>]:
    r = <span class="fn">bash</span>(cmd)
    <span class="fn">print</span>(<span class="str">f"$ </span>{cmd}<span class="str">"</span>)
    <span class="fn">print</span>(r.stdout)</pre>
      <p>Estos cuatro comandos son lo primero que ejecuta cualquier auditor al
      caer en un sistema: ¿quién soy?, ¿qué privilegios tengo?, ¿qué SO?, ¿dónde
      estoy?</p>
    `,
  },

  42: {
    title: "Bash básico: ls, cat, find, grep",
    body: `
      <p>Cuatro comandos que cubren el 80% del recon local de un sistema:</p>
      <ul>
        <li><code>ls /path</code> — listar directorio.</li>
        <li><code>cat /path</code> — leer archivo.</li>
        <li><code>find /path -name pattern</code> — buscar archivos por nombre.</li>
        <li><code>grep "pattern" /path</code> — buscar texto dentro de archivo.</li>
      </ul>
      <h4>Targets típicos en post-explotación</h4>
      <ul>
        <li><code>/etc/passwd</code> — usuarios del sistema.</li>
        <li><code>/etc/issue</code>, <code>/etc/os-release</code> — versión del SO.</li>
        <li><code>/var/www</code> — código de aplicaciones web.</li>
        <li><code>~/.bash_history</code> — comandos recientes del usuario.</li>
        <li><code>~/.ssh/</code> — claves SSH (si tienes lectura).</li>
        <li><code>/var/log/</code> — logs del sistema (si tienes lectura).</li>
        <li><code>/proc/self/environ</code> — variables de entorno del proceso actual.</li>
      </ul>
      <h4>Pipes y combinaciones</h4>
      <p>En bash real (no en PyHack todavía):</p>
      <pre>find / -name <span class="str">"*.conf"</span> 2&gt;/dev/null | xargs grep -l <span class="str">"password"</span></pre>
      <p>"Busca todos los .conf, descarta errores, busca 'password' en el contenido,
      lista archivos coincidentes". Pipelines bash + Python son la herramienta
      universal de cualquier auditor en linux.</p>
    `,
  },

  43: {
    title: "Python + Bash combinados",
    body: `
      <p>Patrón típico de scripts de post-explotación:</p>
      <ol>
        <li>Bash hace I/O del sistema (lecturas, ejecuciones).</li>
        <li>Python orquesta: itera, filtra, estructura el resultado.</li>
        <li>Salida final estructurada (JSON, dict).</li>
      </ol>
      <pre><span class="kw">def</span> <span class="fn">buscar_creds</span>(paths):
    found = []
    <span class="kw">for</span> path <span class="kw">in</span> paths:
        r = <span class="fn">bash</span>(<span class="str">f"cat </span>{path}<span class="str">"</span>)
        <span class="kw">for</span> line <span class="kw">in</span> r.stdout.<span class="fn">split</span>(<span class="str">"\\n"</span>):
            <span class="kw">if</span> <span class="str">"password"</span> <span class="kw">in</span> line.<span class="fn">lower</span>():
                found.<span class="fn">append</span>((path, line.<span class="fn">strip</span>()))
    <span class="kw">return</span> found</pre>
      <h4>Por qué este patrón</h4>
      <ul>
        <li>Bash sin Python es rígido para lógica condicional compleja.</li>
        <li>Python sin bash es ciego al sistema operativo (sin acceso a binarios).</li>
        <li>La combinación: lo mejor de los dos. Bash para "obtener", Python para "decidir".</li>
      </ul>
      <p>En la realidad lo verás también con <code>subprocess.Popen</code> y pipes
      programáticos cuando los outputs son grandes y no caben en memoria de golpe.</p>
    `,
  },

  44: {
    title: "Privesc: SUID y GTFOBins",
    body: `
      <p>El bit <strong>SUID</strong> (Set User ID) en un binario hace que el
      proceso corra con privilegios del PROPIETARIO del archivo, no del usuario
      que lo ejecuta. Si un binario es propiedad de root y tiene SUID, cualquier
      usuario que lo ejecute corre como root durante esa ejecución.</p>
      <p>Si ese binario tiene una vulnerabilidad o un feature que permita "salir"
      de su contexto (escape a shell, ejecución arbitraria) → privesc.</p>
      <pre><span class="com"># Listar binarios SUID en el sistema</span>
find / -perm -<span class="num">4000</span> <span class="num">2</span>&gt;/dev/null</pre>
      <h4>GTFOBins</h4>
      <p><strong>gtfobins.github.io</strong> es la referencia de la comunidad: lista
      qué binarios tienen feature/vuln explotable cuando son SUID. Ejemplos clásicos:</p>
      <ul>
        <li><code>find</code> con <code>-exec /bin/sh \\;</code> ejecuta sh.</li>
        <li><code>vim</code>: <code>:!sh</code> sale a shell.</li>
        <li><code>less</code>: <code>!sh</code> sale a shell.</li>
        <li><code>awk 'BEGIN {system("/bin/sh")}'</code>.</li>
      </ul>
      <p>Cualquiera de estos siendo SUID-root = root shell para ti.</p>
      <h4>Mitigación</h4>
      <p>Auditar binarios SUID. Solo deben tenerlo los estrictamente necesarios
      (passwd, ping, sudo) y todos esos deben estar parcheados.
      <code>setuid()</code> en código propio = bandera roja.</p>
    `,
  },

  45: {
    title: "Pipelines de operación",
    body: `
      <p>Una operación real es un <strong>pipeline</strong>: enumeración → recolección
      → estructuración → exfiltración (en pentest legítimo: reporte). Cada paso
      es trivial individualmente; lo que vale es componerlos.</p>
      <pre><span class="kw">import</span> json

<span class="com"># 1. Enumerar archivos</span>
files = <span class="fn">bash</span>(<span class="str">"ls /var/www/secrets"</span>).stdout.<span class="fn">split</span>(<span class="str">"\\n"</span>)
files = [f <span class="kw">for</span> f <span class="kw">in</span> files <span class="kw">if</span> f]

<span class="com"># 2. Leer contenidos</span>
botin = {}
<span class="kw">for</span> f <span class="kw">in</span> files:
    botin[f] = <span class="fn">bash</span>(<span class="str">f"cat /var/www/secrets/</span>{f}<span class="str">"</span>).stdout

<span class="com"># 3. Estructurar como JSON</span>
<span class="fn">print</span>(json.<span class="fn">dumps</span>(botin, indent=<span class="num">2</span>))</pre>
      <h4>El reporte como producto final</h4>
      <p>En pentesting profesional, lo que cobra el cliente NO son las shells que
      conseguiste — es el reporte estructurado:</p>
      <ul>
        <li>Qué encontraste (hallazgo).</li>
        <li>Severidad y CVSS.</li>
        <li>Pasos para reproducirlo.</li>
        <li>Mitigación recomendada.</li>
        <li>Evidencias (capturas, output).</li>
      </ul>
      <p>Un script que automatiza la generación de la sección "evidencia" del
      reporte ahorra horas. Por eso aprender a estructurar JSON desde el primer
      capítulo importa.</p>
    `,
  },

  46: {
    title: "Repaso del Capítulo 7",
    body: `
      <p>Post-explotación + Bash:</p>
      <ul>
        <li><strong>bash() / subprocess.run</strong>: ejecutar comandos del sistema desde Python.</li>
        <li><strong>Bash básico</strong>: ls, cat, find, grep — el 80% del recon local.</li>
        <li><strong>Python + Bash</strong>: bash hace I/O, Python orquesta y filtra.</li>
        <li><strong>SUID + GTFOBins</strong>: vector clásico de privesc local.</li>
        <li><strong>Pipelines</strong>: encadenar primitivas hasta producir un reporte estructurado.</li>
      </ul>
      <p>Solo queda <strong>Cap 8</strong>: la Operación Caldera. Aplicar todo en
      un caso real (ficcionado): NorthBank bajo APT, identificar el host
      comprometido, hablar con el C2, generar el reporte para el blue team.</p>
    `,
  },

  47: {
    title: "Recon estructurado bajo presión",
    body: `
      <p>En operación real, el recon ya no es ejercicio académico. Tienes:</p>
      <ul>
        <li>Tiempo limitado.</li>
        <li>Múltiples hosts a evaluar simultáneamente.</li>
        <li>Pista de qué buscar (en Caldera: puertos C2 conocidos).</li>
        <li>Un blue team trabajando en paralelo — no quieres pisarles.</li>
      </ul>
      <p>El código es el mismo que en Cap 1 (<code>scan_port</code> en bucle), pero
      la diferencia está en saber QUÉ buscas:</p>
      <pre>C2_PORTS = {<span class="num">4444</span>, <span class="num">9001</span>, <span class="num">8443</span>}   <span class="com"># puertos típicos de Caldera</span>

<span class="kw">for</span> host <span class="kw">in</span> hosts:
    <span class="kw">for</span> port <span class="kw">in</span> common_ports + <span class="fn">list</span>(C2_PORTS):
        <span class="kw">if</span> <span class="fn">scan_port</span>(host, port) == <span class="str">"open"</span>:
            <span class="kw">if</span> port <span class="kw">in</span> C2_PORTS:
                <span class="fn">print</span>(<span class="str">f"⚠ </span>{host}<span class="str">:</span>{port}<span class="str"> = posible C2"</span>)</pre>
      <p>Threat intelligence (puertos, dominios, hashes conocidos de un actor)
      convierte recon genérico en hunting dirigido. Cuando tienes IOCs (Indicators
      of Compromise) del adversario, los enlazas a tu enumeración.</p>
    `,
  },

  48: {
    title: "Hablar el protocolo del adversario",
    body: `
      <p>Si tu equipo ha recopilado tráfico previo de Caldera (pcaps de incidentes
      anteriores, samples de su malware), conoces su protocolo de C2. Hablarlo te
      permite:</p>
      <ul>
        <li>Confirmar que el servicio raro es realmente Caldera (no falso positivo).</li>
        <li>Capturar la cola de comandos pendientes.</li>
        <li>Identificar el host objetivo final del atacante.</li>
        <li>(Con autorización legal y de la autoridad competente) potencialmente desviarlo.</li>
      </ul>
      <p>El handshake de Caldera en este lab es:</p>
      <pre>CALDERA-HANDSHAKE-V2:&lt;md5_hex_del_día&gt;</pre>
      <p>Hashing del día: el grupo rota el token diariamente para evitar replays.
      Si conoces el algoritmo, lo replicas. Si no, no entras.</p>
      <pre><span class="kw">import</span> hashlib
token = hashlib.<span class="fn">md5</span>(<span class="str">"2026-04-27"</span>.<span class="fn">encode</span>()).<span class="fn">hexdigest</span>()
handshake = <span class="str">f"CALDERA-HANDSHAKE-V2:</span>{token}<span class="str">"</span>
resp = <span class="fn">socket_request</span>(host, port, handshake)</pre>
      <p>Esto es <strong>defensa activa</strong>: no atacar al adversario, sino
      hablarlo para entenderlo. Legalmente delicada — siempre con autorización
      del cliente (que es la víctima) y consultoría legal previa.</p>
    `,
  },

  49: {
    title: "Reportes para el blue team",
    body: `
      <p>El reporte final NO es para impresionar. Es <strong>accionable</strong>:
      el blue team debe poder, leyendo el reporte, ejecutar acciones inmediatas.</p>
      <h4>Estructura mínima</h4>
      <pre>{
  <span class="str">"client"</span>: <span class="str">"NorthBank"</span>,
  <span class="str">"date"</span>: <span class="str">"2026-04-27"</span>,
  <span class="str">"summary"</span>: <span class="str">"Caldera APT activo en backup.northbank.local"</span>,
  <span class="str">"findings"</span>: [
    {
      <span class="str">"id"</span>: <span class="num">1</span>,
      <span class="str">"severity"</span>: <span class="str">"critical"</span>,
      <span class="str">"host"</span>: <span class="str">"backup.northbank.local"</span>,
      <span class="str">"port"</span>: <span class="num">4444</span>,
      <span class="str">"description"</span>: <span class="str">"C2 channel active"</span>
    }
  ],
  <span class="str">"recommended_actions"</span>: [
    <span class="str">"Aislar host de la red corporativa"</span>,
    <span class="str">"Bloquear IPs de C2 conocidas en perímetro"</span>,
    <span class="str">"Forensics: imagen del disco antes de cualquier limpieza"</span>
  ]
}</pre>
      <h4>Severidad: CVSS</h4>
      <p>El estándar para puntuar findings es CVSS (Common Vulnerability Scoring
      System). De 0.0 a 10.0, con descomposición por vector (red/local), complejidad,
      privilegios requeridos, impacto. Niveles típicos:</p>
      <ul>
        <li><strong>Critical</strong> 9.0–10.0: explotación trivial, impacto total.</li>
        <li><strong>High</strong> 7.0–8.9: vectorial pero serio.</li>
        <li><strong>Medium</strong> 4.0–6.9: requiere condiciones.</li>
        <li><strong>Low</strong> 0.1–3.9: hallazgo informativo.</li>
      </ul>
      <p>"C2 activo en infraestructura crítica" = critical 10.0. Sin discusión.</p>
    `,
  },

  50: {
    title: "Has terminado PyHack",
    body: `
      <p>Cincuenta operaciones. Nueve capítulos. Ocho evaluaciones. Has cubierto:</p>
      <ul>
        <li><strong>Python fundamentos</strong>: tipos, control de flujo, funciones,
            clases, módulos, manejo de errores, archivos.</li>
        <li><strong>Recon</strong>: scan_port, banner grabbing, regex, structured reporting.</li>
        <li><strong>HTTP / Web</strong>: fetch_url, status codes, JSON, sesiones, headers.</li>
        <li><strong>Web vulns clásicas</strong>: SQLi, UNION, XSS, IDOR, path traversal — y sus mitigaciones.</li>
        <li><strong>Cripto y datos</strong>: codificaciones, hashes, cifrado clásico, bitwise.</li>
        <li><strong>Red bajo HTTP</strong>: sockets, pcap analysis, HTTP a mano.</li>
        <li><strong>Post-explotación</strong>: bash, enumeración, búsqueda de credenciales,
            SUID + GTFOBins.</li>
        <li><strong>Operativa real</strong>: threat intel, defensa activa, reporting al SOC.</li>
      </ul>
      <h4>¿Qué viene después?</h4>
      <p>PyHack es el escalón inicial. Lo siguiente para llegar a profesional:</p>
      <ul>
        <li><strong>Lab real</strong>: HackTheBox, TryHackMe, OffSec PG. Máquinas
            sin scripts ni mocks. La diferencia entre saber la técnica y aplicarla
            contra cosas que no cooperan.</li>
        <li><strong>OSCP</strong>: la cert estándar de la industria para pentesting
            ofensivo. 24h de examen práctico contra un lab real.</li>
        <li><strong>Bug bounty</strong>: programas de empresas que pagan por hallazgos
            reales (HackerOne, Bugcrowd, YesWeHack). Aprendizaje brutal en condiciones
            reales con scope legal.</li>
        <li><strong>CTFs</strong>: picoCTF, HTB CTFs, DEFCON CTF para los avanzados.</li>
      </ul>
      <p>El Python que has escrito aquí es el mismo que vas a escribir en cualquiera
      de esos contextos. La diferencia es que ahora los targets no cooperan, las
      respuestas no están predefinidas, y los matices del protocolo importan al byte.</p>
      <p style="text-align:center; color: var(--cyan); margin-top: 24px; font-style: italic;">
        — Sentinel Labs · Operativo certificado —</p>
    `,
  },

  // ============================================================
  // CAP 9 — DETECCIÓN Y ANÁLISIS DEFENSIVO (51-56)
  // ============================================================

  51: {
    title: "YARA-lite: matching por sets de strings",
    body: `
      <h4>El problema</h4>
      <p>Una sandbox de malware extrae los <strong>strings imprimibles</strong>
      de un binario sospechoso (lo que haría <code>strings sample.bin</code> en
      Linux). Tú no analizas el binario en bruto: recibes la lista ya extraída
      y tienes que <strong>clasificarlo en una familia</strong> según qué
      indicadores aparecen.</p>
      <p>Es la lógica detrás de YARA, el "swiss army knife" de los analistas
      de malware. Cada regla declara strings característicos de una familia y
      una condición. Si la condición se cumple para una muestra, esa muestra
      se etiqueta con esa familia.</p>

      <h4>El concepto Python: set y issubset</h4>
      <p>Un <strong>set</strong> es una colección de valores únicos, no
      ordenados. Sintaxis: llaves como un dict pero sin pares.</p>
      <pre>s = {"a", "b", "c"}    <span class="com"># set</span>
"a" <span class="kw">in</span> s              <span class="com"># True — comprobación O(1)</span></pre>
      <p>La operación clave para este nivel es <code>issubset</code>:
      "¿están TODOS los elementos de A dentro de B?"</p>
      <pre>regla = {"WinExec", "URLDownloadToFile"}
muestra = {"WinExec", "URLDownloadToFile", "tmp", "kernel32.dll"}
regla.issubset(muestra)   <span class="com"># True — todos los de regla están en muestra</span></pre>

      <h4>El patrón: lista de reglas como dict</h4>
      <p>Una forma idiomática de representar varias reglas: dict {nombre →
      lista de strings indicador}.</p>
      <pre>RULES = {
    <span class="str">"downloader"</span>: [<span class="str">"URLDownloadToFile"</span>, <span class="str">"WinExec"</span>],
    <span class="str">"keylogger"</span>:  [<span class="str">"GetAsyncKeyState"</span>, <span class="str">"SetWindowsHookEx"</span>],
}</pre>
      <p>Para cada muestra, recorres el dict, conviertes cada lista a set, y
      compruebas <code>issubset</code> contra el set de strings de la muestra.</p>

      <h4>Errores típicos</h4>
      <ul>
        <li><strong>Confundir <code>{}</code> con dict vacío</strong>: en
        Python, <code>{}</code> es un dict vacío, NO un set vacío. Para set
        vacío usa <code>set()</code>.</li>
        <li><strong>Comparar listas con <code>in</code> esperando subset</strong>:
        <code>[1,2] in [1,2,3]</code> NO comprueba subset, comprueba si la
        lista <code>[1,2]</code> es un elemento. Para subset, sets.</li>
        <li><strong>Olvidar convertir lista a set</strong>: <code>list.issubset</code>
        no existe — issubset es método de set.</li>
      </ul>

      <h4>Por qué importa</h4>
      <p>Esta es la lógica EXACTA que usa YARA, AV signature engines, y
      muchas herramientas de threat intel. La sintaxis es distinta (YARA
      tiene reglas en un lenguaje propio), pero la matemática es la misma.</p>
    `,
  },

  52: {
    title: "Distancia de Levenshtein y typosquat",
    body: `
      <h4>El problema</h4>
      <p>Atacantes publican paquetes en PyPI con nombres muy parecidos a los
      legítimos: <code>reqeusts</code> en vez de <code>requests</code>,
      <code>urllib4</code> en vez de <code>urllib3</code>. Si un dev distraído
      lo escribe en su <code>requirements.txt</code>, instala malware sin
      saberlo.</p>
      <p>Tu trabajo defensivo: dado un requirements.txt y una whitelist de
      paquetes legítimos populares, detectar candidatos a typosquat por
      similitud lexicográfica.</p>

      <h4>El concepto: distancia de Levenshtein</h4>
      <p>Mide cuántas <strong>operaciones simples</strong> (insertar borrar
      sustituir un carácter) hacen falta para convertir un string en otro.</p>
      <pre><span class="str">"casa"</span> ↔ <span class="str">"cosa"</span>     <span class="com"># 1 (sustituir 'a' por 'o')</span>
<span class="str">"requests"</span> ↔ <span class="str">"reqeusts"</span> <span class="com"># 2 (transposición e↔u)</span>
<span class="str">"abc"</span> ↔ <span class="str">"xyz"</span>       <span class="com"># 3 (3 sustituciones)</span></pre>

      <h4>Algoritmo: tabla de programación dinámica</h4>
      <p>Es uno de los ejemplos más clásicos de DP. Construyes una tabla de
      tamaño |a|×|b|, donde <code>tabla[i][j]</code> = distancia entre los
      primeros <code>i</code> caracteres de <code>a</code> y los primeros
      <code>j</code> caracteres de <code>b</code>.</p>
      <p>Recurrencia:</p>
      <ul>
        <li>Si <code>a[i] == b[j]</code> → coste 0, copiar diagonal.</li>
        <li>Si no → 1 + mínimo de:
          <ul>
            <li>tabla[i-1][j] (borrar de a)</li>
            <li>tabla[i][j-1] (insertar en a)</li>
            <li>tabla[i-1][j-1] (sustituir)</li>
          </ul>
        </li>
      </ul>

      <h4>Implementación compacta (memoria O(min(a,b)))</h4>
      <pre><span class="kw">def</span> <span class="fn">lev</span>(a, b):
    <span class="kw">if</span> a == b: <span class="kw">return</span> 0
    <span class="kw">if</span> <span class="kw">not</span> a: <span class="kw">return</span> <span class="fn">len</span>(b)
    <span class="kw">if</span> <span class="kw">not</span> b: <span class="kw">return</span> <span class="fn">len</span>(a)
    prev = <span class="fn">list</span>(<span class="fn">range</span>(<span class="fn">len</span>(b) + 1))
    <span class="kw">for</span> i, ca <span class="kw">in</span> <span class="fn">enumerate</span>(a, 1):
        cur = [i]
        <span class="kw">for</span> j, cb <span class="kw">in</span> <span class="fn">enumerate</span>(b, 1):
            cost = 0 <span class="kw">if</span> ca == cb <span class="kw">else</span> 1
            cur.append(<span class="fn">min</span>(cur[-1] + 1, prev[j] + 1, prev[j-1] + cost))
        prev = cur
    <span class="kw">return</span> prev[-1]</pre>

      <h4>La heurística de typosquat</h4>
      <p>Para cada paquete en el requirements.txt, calcula la distancia
      mínima contra cada paquete de la whitelist. Reglas:</p>
      <ul>
        <li>Distancia 0 → es el paquete legítimo, OK.</li>
        <li>Distancia 1-2 → typosquat probable.</li>
        <li>Distancia ≥3 → es otro paquete (puede ser desconocido pero no
        confundible).</li>
      </ul>
      <p><strong>Limitación de la heurística</strong>: no atrapa typosquats
      con cambios largos (ej. <code>py-cryptos</code> vs
      <code>pycryptodome</code> tienen distancia &gt;2). En producción
      complementarías con análisis de actividad del paquete (descargas,
      autor, fecha de subida).</p>
    `,
  },

  53: {
    title: "Extracción de IOCs con regex y whitelist",
    body: `
      <h4>El problema</h4>
      <p>Los usuarios reportan al SOC emails que parecen phishing. Tú extraes
      los IOCs (URLs, dominios, IPs) y los pasas al feed de threat intel.
      Detalle crítico: <strong>NO debes meter los dominios propios del
      cliente en la blacklist</strong>. Eso bloquearía el correo legítimo.</p>

      <h4>El concepto: regex con re.findall</h4>
      <p><code>re.findall(pattern, text)</code> devuelve una lista con TODAS
      las coincidencias del patrón en el texto.</p>
      <pre><span class="kw">import</span> re

texto = <span class="str">"Visita https://acme.local y mira https://evil.test/x"</span>
re.findall(<span class="str">r"https?://[^\\s]+"</span>, texto)
<span class="com"># ['https://acme.local', 'https://evil.test/x']</span></pre>

      <h4>Construir la regex paso a paso</h4>
      <p>Para URLs:</p>
      <ul>
        <li><code>https?</code> — http con s opcional (el ? significa
        "0 o 1 del carácter anterior").</li>
        <li><code>://</code> — literal.</li>
        <li><code>[^\\s]+</code> — uno o más caracteres que NO sean
        whitespace (<code>^</code> dentro de <code>[]</code> es negación).</li>
      </ul>
      <p>Para IPs:</p>
      <pre>r<span class="str">"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b"</span></pre>
      <ul>
        <li><code>\\b</code> — anchor de "boundary" de palabra.</li>
        <li><code>(?:\\d{1,3}\\.){3}</code> — grupo no-capturador (?:...) que
        repite 3 veces "1-3 dígitos + punto".</li>
        <li><code>\\d{1,3}</code> — los últimos dígitos.</li>
      </ul>

      <h4>Pre-compilar para reusar</h4>
      <p>Si vas a usar la misma regex muchas veces (ej. iterando sobre
      muchos emails), compílala una vez:</p>
      <pre>URL_RE = re.compile(<span class="str">r"https?://[^\\s]+"</span>)
<span class="kw">for</span> em <span class="kw">in</span> emails:
    <span class="fn">print</span>(URL_RE.findall(em[<span class="str">"body"</span>]))</pre>
      <p>Mejor rendimiento + más legible.</p>

      <h4>Filtrar contra whitelist con set</h4>
      <p>El test "¿este dominio NO está en la whitelist?" es típico de set:</p>
      <pre>TRUSTED = {<span class="str">"acmecorp.com"</span>, <span class="str">"intranet.acmecorp.com"</span>}
sospechosos = [d <span class="kw">for</span> d <span class="kw">in</span> dominios_extraídos <span class="kw">if</span> d <span class="kw">not</span> <span class="kw">in</span> TRUSTED]</pre>

      <h4>Errores típicos</h4>
      <ul>
        <li><strong>No escapar <code>.</code></strong>: dentro de regex,
        <code>.</code> matchea CUALQUIER carácter. Para un punto literal
        usa <code>\\.</code>.</li>
        <li><strong>Greedy vs non-greedy</strong>: <code>.+</code> es greedy
        (consume todo lo posible). Para parar lo antes posible usa
        <code>.+?</code>.</li>
        <li><strong>Olvidar el <code>r</code> al inicio</strong>: si no
        pones <code>r"..."</code>, las barras invertidas se interpretan
        como escapes de Python primero. <code>"\\b"</code> sin <code>r</code>
        es ambiguo.</li>
      </ul>
    `,
  },

  54: {
    title: "Auditoría de dependencias contra feed CVE",
    body: `
      <h4>El problema</h4>
      <p>El cliente quiere un check en su CI que falle el build cuando una
      dependencia tiene un CVE conocido. Equivalente educativo de
      <code>pip-audit</code>, <code>safety</code> o <code>Trivy</code>.</p>

      <h4>El concepto: parsing de strings + comparación de versiones</h4>
      <p>Un <code>requirements.txt</code> simple es:</p>
      <pre>flask==2.0.1
django==3.2.5
requests==2.25.0</pre>
      <p>Para cada línea quieres separar nombre y versión. La forma idiomática
      en Python es <code>str.partition(sep)</code>:</p>
      <pre><span class="str">"flask==2.0.1"</span>.partition(<span class="str">"=="</span>)
<span class="com"># ('flask', '==', '2.0.1')</span></pre>
      <p><code>partition</code> devuelve siempre 3 elementos: lo de antes,
      el separador, lo de después. Diferencia clave con <code>split</code>:
      partition para SIEMPRE en el primer match — útil cuando solo quieres
      una división.</p>

      <h4>Versiones como tuples de enteros</h4>
      <p>Comparar versiones con strings da problemas: <code>"10.0.0"</code> &lt;
      <code>"2.0.0"</code> alfabéticamente (porque "1" &lt; "2"). La solución:
      convertir a tuple de ints.</p>
      <pre><span class="kw">def</span> <span class="fn">parse_version</span>(v):
    <span class="kw">return</span> <span class="fn">tuple</span>(<span class="fn">int</span>(x) <span class="kw">for</span> x <span class="kw">in</span> v.split(<span class="str">"."</span>))

parse_version(<span class="str">"2.0.1"</span>)   <span class="com"># (2, 0, 1)</span>
(2, 0, 1) &lt; (10, 0, 0)         <span class="com"># True ✓</span></pre>
      <p>Las tuples se comparan elemento a elemento, así que esto funciona.</p>

      <h4>El operador en la regla del CVE</h4>
      <p>Cada CVE en el feed declara una regla tipo <code>"&lt;2.0.3"</code>
      o <code>"&lt;=3.2.4"</code>. Tu función <code>is_vulnerable</code>
      lee el operador del principio y compara:</p>
      <pre><span class="kw">def</span> <span class="fn">is_vulnerable</span>(version, rule):
    <span class="kw">if</span> rule.startswith(<span class="str">"&lt;="</span>):
        <span class="kw">return</span> parse_version(version) &lt;= parse_version(rule[2:])
    <span class="kw">if</span> rule.startswith(<span class="str">"&lt;"</span>):
        <span class="kw">return</span> parse_version(version) &lt;  parse_version(rule[1:])
    <span class="kw">return</span> <span class="kw">False</span></pre>

      <h4>Aviso sobre semver real</h4>
      <p>Esta versión simplificada NO maneja:</p>
      <ul>
        <li>Pre-releases (<code>2.0.0-alpha</code>, <code>2.0.0-rc1</code>).</li>
        <li>Sufijos exóticos (<code>2.0.0+build123</code>).</li>
        <li>Rangos no triviales (<code>~=</code>, <code>!=</code>).</li>
      </ul>
      <p>En producción usa <code>packaging.version</code> de stdlib.</p>

      <h4>Counter para el resumen final</h4>
      <p>Para contar cuántos hallazgos hay por severidad:</p>
      <pre><span class="kw">from</span> collections <span class="kw">import</span> Counter
sev = Counter(f[<span class="str">"severity"</span>] <span class="kw">for</span> f <span class="kw">in</span> findings)
<span class="fn">print</span>(<span class="str">f"critical=</span>{sev[<span class="str">'critical'</span>]}<span class="str"> high=</span>{sev[<span class="str">'high'</span>]}<span class="str">"</span>)</pre>
    `,
  },

  55: {
    title: "Reglas Sigma-lite con matcher genérico",
    body: `
      <h4>El problema</h4>
      <p>El SIEM dispara alertas a partir de reglas. Quieres implementar el
      núcleo del matching: cada regla es un dict de condiciones que el evento
      debe cumplir, opcionalmente con un threshold para detectar bursts
      (ej. "5 logons fallidos desde la misma IP").</p>

      <h4>El concepto: matcher genérico con all()</h4>
      <p>La función <code>all(iterable)</code> devuelve <code>True</code> si
      <strong>todos</strong> los elementos del iterable son truthy. Es la
      forma idiomática de comprobar "se cumplen TODAS las condiciones".</p>
      <pre><span class="kw">def</span> <span class="fn">event_matches</span>(event, condition):
    <span class="kw">return</span> <span class="fn">all</span>(event.get(k) == v <span class="kw">for</span> k, v <span class="kw">in</span> condition.items())</pre>
      <p>Tres líneas que valen toda la lógica. Notar:</p>
      <ul>
        <li><code>condition.items()</code> da pares (clave, valor).</li>
        <li><code>event.get(k)</code> devuelve <code>None</code> si la
        clave no existe (en lugar de <code>KeyError</code>).</li>
        <li>El generador <code>(... <span class="kw">for</span> ...)</code>
        no construye lista intermedia: para en cuanto encuentra un False.</li>
      </ul>

      <h4>El concepto: agregación con Counter para threshold</h4>
      <p>Para detectar "N eventos del mismo tipo agrupados por src_ip", usas
      <code>Counter</code>:</p>
      <pre><span class="kw">from</span> collections <span class="kw">import</span> Counter

ips = Counter(e[<span class="str">"src_ip"</span>] <span class="kw">for</span> e <span class="kw">in</span> matched)
<span class="kw">for</span> ip, n <span class="kw">in</span> ips.items():
    <span class="kw">if</span> n &gt;= threshold:
        alert(...)</pre>

      <h4>Estructura idiomática de una regla</h4>
      <pre>{
    <span class="str">"name"</span>: <span class="str">"failed_logon_burst"</span>,
    <span class="str">"condition"</span>: {<span class="str">"event_id"</span>: 4625},     <span class="com"># el matcher</span>
    <span class="str">"threshold"</span>: 5, <span class="str">"groupby"</span>: <span class="str">"src_ip"</span>, <span class="com"># opcional: agregación</span>
    <span class="str">"severity"</span>: <span class="str">"high"</span>,
}</pre>
      <p>Esto se traduce 1-a-1 a YAML Sigma real:</p>
      <pre>detection:
  selection:
    EventID: 4625
  condition: selection | count() by src_ip &gt;= 5</pre>

      <h4>Eventos comunes de Windows que verás</h4>
      <ul>
        <li><strong>4624</strong> — logon exitoso.</li>
        <li><strong>4625</strong> — logon fallido. ← sospecha de bruteforce.</li>
        <li><strong>4720</strong> — cuenta de usuario creada.</li>
        <li><strong>4732</strong> — usuario añadido a grupo (¡atención si es
        Administrators!).</li>
        <li><strong>1102</strong> — log de seguridad limpiado. ← señal
        crítica, MITRE T1070.001.</li>
      </ul>

      <h4>Patrones comunes de Sigma</h4>
      <p>Una vez tienes el matcher genérico, puedes expresar cualquier regla
      como datos. Ese es el poder de Sigma: la misma regla declarativa se
      traduce automáticamente a Splunk SPL, Elastic KQL, Microsoft Sentinel,
      etc. — porque el matching es genérico.</p>
    `,
  },

  56: {
    title: "Pipeline de threat intel completo",
    body: `
      <h4>Pipeline genérico de TI</h4>
      <p>El examen une los conceptos del Cap 9 en el flujo real de un
      analista L1 del SOC:</p>
      <ol>
        <li><strong>Recibir</strong> emails reportados.</li>
        <li><strong>Extraer IOCs</strong> con regex (URLs, IPs).</li>
        <li><strong>Clasificar</strong> contra reglas de detección
        (similar a YARA/Sigma).</li>
        <li><strong>Construir</strong> alertas estructuradas con severidad.</li>
        <li><strong>Priorizar</strong> ordenando por severidad.</li>
        <li><strong>Reportar</strong> en JSON al ticketing del SOC.</li>
      </ol>

      <h4>Conceptos Python implicados</h4>
      <ul>
        <li><strong>Funciones</strong> con responsabilidades claras: una para
        extraer, otra para clasificar, otra para construir alertas. Es la
        receta para que el código quepa en 30 líneas con sentido.</li>
        <li><strong>Comprehensions con filtro</strong>: descartar emails que
        no matchean ninguna regla.</li>
        <li><strong>Sort con key</strong>: ordenar por severidad usando un
        dict de prioridad como <code>SEV_ORDER = {"critical": 0,
        "high": 1, ...}</code>. <code>sorted(alerts, key=lambda a:
        SEV_ORDER[a["severity"]])</code>.</li>
        <li><strong>min con key</strong>: para obtener "la severidad más
        crítica de las que matchean": <code>min(severities,
        key=lambda s: SEV_ORDER[s])</code>.</li>
        <li><strong>json.dumps con indent</strong>: salida que se pueda leer
        a ojo y pegar en un ticket.</li>
      </ul>

      <h4>Por qué esto importa</h4>
      <p>Lo que sale de este examen no es muy distinto del JSON que se
      intercambia entre TheHive (case management) y MISP (threat intel
      sharing). Si entiendes este pipeline, entiendes el corazón del trabajo
      diario de un L1 del SOC — solo que tu sandbox son emails de juguete
      y el SIEM real tendría miles por hora.</p>
    `,
  },
};
