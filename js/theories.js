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
};
