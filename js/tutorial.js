// PyHack — Manual técnico (mapa del curso + onboarding) y textos largos del menú.
//
// El manual técnico es la PUERTA DE ENTRADA: 25 items breves organizados en
// 4 secciones que dan la vista panorámica del curso. Para detalle exhaustivo,
// el alumno tiene:
//   - 📚 Cheatsheet (Ctrl+K) — referencia con ejemplos.
//   - 🔤 Glosario — diccionario de 73 términos técnicos.
//   - 📖 Teoría de cada nivel — concepto en profundidad.

const TUTORIAL_SECTIONS = [

  // ============================================================
  // SECCIÓN 1: PYTHON — FUNDAMENTOS  (Cap 0-1)
  // ============================================================
  {
    section: "1. Python — fundamentos",
    items: [
      {
        id: 'intro',
        title: '0. Antes de empezar',
        body: `
          <h3>0. Antes de empezar</h3>
          <p>Python es un lenguaje de programación. Tú escribes <em>instrucciones</em>
          y la máquina las ejecuta de arriba a abajo, una por una.</p>
          <p>En PyHack escribes Python real. Cada vez que pulsas <strong>▶ Ejecutar</strong>
          (o <code>Ctrl+Enter</code>), tu código corre en un sandbox y su output aparece
          en el terminal.</p>
          <h4>Tres reglas de oro</h4>
          <ul>
            <li>Python distingue mayúsculas: <code>scan_port</code> y <code>Scan_Port</code> son distintos.</li>
            <li>La <strong>indentación</strong> (sangría) importa: usa 4 espacios. Es lo que dice qué pertenece a qué bloque.</li>
            <li>Los comentarios empiezan con <code>#</code> y Python los ignora.</li>
          </ul>
          <p>El curso te lleva del <em>print</em> básico hasta pipelines de threat intel.
          Si te atascas, cada nivel tiene 4 capas de pista (📖 Teoría → 🧭 Estrategia →
          🪜 Esqueleto → 💡 Solución), revelables en orden.</p>
        `,
      },
      {
        id: 'print',
        title: '1. print() y comentarios',
        body: `
          <h3>1. print() y comentarios</h3>
          <p>Tu primera herramienta:</p>
          <pre><span class="fn">print</span>(<span class="str">"Hola"</span>)
<span class="com"># esto es un comentario, Python lo ignora</span></pre>
          <p>print acepta varios argumentos separados por coma, y los imprime con
          un espacio entre cada uno:</p>
          <pre><span class="fn">print</span>(<span class="str">"IP:"</span>, <span class="str">"10.0.0.1"</span>, <span class="str">"port:"</span>, <span class="num">22</span>)
<span class="com"># IP: 10.0.0.1 port: 22</span></pre>
          <p>En auditoría, <code>print</code> es tu primer debugger: lo usarás constantemente
          para ver qué devuelve cada llamada y qué responde el target.</p>
        `,
      },
      {
        id: 'vars',
        title: '2. Variables',
        body: `
          <h3>2. Variables</h3>
          <p>Una variable guarda un valor con un nombre. Asignación con <code>=</code>:</p>
          <pre>target = <span class="str">"target.acme.local"</span>
port = <span class="num">22</span>
abierto = <span class="kw">True</span></pre>
          <p>Después puedes usar el nombre en lugar del valor.</p>
          <h4>Reglas para nombres</h4>
          <ul>
            <li>Solo letras, números y <code>_</code>. No empezar por número.</li>
            <li>Distingue mayúsculas: <code>target</code> ≠ <code>Target</code>.</li>
            <li>Mejor descriptivo: <code>port</code> &gt; <code>p</code>.</li>
          </ul>
          <p>OJO: <code>=</code> es ASIGNACIÓN, <code>==</code> es COMPARACIÓN.
          Confundirlos es el error clásico de principiante.</p>
        `,
      },
      {
        id: 'fstrings',
        title: '3. f-strings',
        body: `
          <h3>3. f-strings — mezclar texto y variables</h3>
          <pre>host = <span class="str">"target.local"</span>
port = <span class="num">80</span>
<span class="fn">print</span>(<span class="str">f"Escaneando </span>{host}<span class="str">:</span>{port}<span class="str">"</span>)</pre>
          <p>Empieza la string con <code>f"</code> y mete las variables entre llaves
          <code>{ }</code>. Cualquier expresión cabe dentro: <code>f"len = {len(items)}"</code>.</p>
          <h4>Formatos avanzados (después de <code>:</code>)</h4>
          <pre><span class="fn">print</span>(<span class="str">f"</span>{<span class="num">42</span>:<span class="str">08b</span>}<span class="str">"</span>)   <span class="com"># '00101010' (binario, 8 bits, padding 0)</span>
<span class="fn">print</span>(<span class="str">f"</span>{<span class="num">3.14159</span>:<span class="str">.2f</span>}<span class="str">"</span>)<span class="com"># '3.14' (2 decimales)</span>
<span class="fn">print</span>(<span class="str">f"</span>{<span class="num">255</span>:<span class="str">x</span>}<span class="str">"</span>)    <span class="com"># 'ff' (hex)</span></pre>
          <p>➜ Más en <strong>📚 Cheatsheet → Sintaxis Python → f-strings</strong>.</p>
        `,
      },
      {
        id: 'lists',
        title: '4. Listas y for',
        body: `
          <h3>4. Listas y for</h3>
          <pre>puertos = [<span class="num">21</span>, <span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>]
<span class="kw">for</span> p <span class="kw">in</span> puertos:
    <span class="fn">print</span>(<span class="str">f"Probando </span>{p}<span class="str">"</span>)</pre>
          <p>La indentación de <em>4 espacios</em> en la línea del print es lo que le
          dice a Python "esto pertenece al bucle".</p>
          <h4>Operaciones útiles sobre listas</h4>
          <ul>
            <li><code>len(lista)</code> — longitud.</li>
            <li><code>lista.append(x)</code> — añade al final.</li>
            <li><code>x in lista</code> — devuelve True/False.</li>
            <li><code>lista[0]</code> — primer elemento (índice empieza en 0).</li>
            <li><code>lista[-1]</code> — último.</li>
          </ul>
        `,
      },
      {
        id: 'range',
        title: '5. for + range',
        body: `
          <h3>5. for + range</h3>
          <p>Cuando necesitas iterar números, no una lista predefinida:</p>
          <pre><span class="kw">for</span> p <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">1025</span>):
    <span class="com"># 1, 2, ..., 1024 (el segundo NO se incluye)</span>
    estado = scan_port(<span class="str">"target.local"</span>, p)</pre>
          <p>Patrones:</p>
          <ul>
            <li><code>range(N)</code> → 0, 1, ..., N-1.</li>
            <li><code>range(A, B)</code> → A, A+1, ..., B-1.</li>
            <li><code>range(A, B, paso)</code> → A, A+paso, ... &lt; B.</li>
          </ul>
          <h4>Bonus: enumerate</h4>
          <pre><span class="kw">for</span> i, ip <span class="kw">in</span> <span class="fn">enumerate</span>(ips, <span class="num">1</span>):
    <span class="fn">print</span>(<span class="str">f"</span>{i}<span class="str">: </span>{ip}<span class="str">"</span>)
<span class="com"># 1: 10.0.0.1
# 2: 10.0.0.2 ...</span></pre>
        `,
      },
      {
        id: 'conditionals',
        title: '6. if / else / comparadores',
        body: `
          <h3>6. Condicionales</h3>
          <pre><span class="kw">if</span> estado == <span class="str">"open"</span>:
    <span class="fn">print</span>(<span class="str">"abierto"</span>)
<span class="kw">elif</span> estado == <span class="str">"closed"</span>:
    <span class="fn">print</span>(<span class="str">"cerrado"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"otro estado"</span>)</pre>
          <h4>Comparadores</h4>
          <ul>
            <li><code>==</code> igual, <code>!=</code> distinto.</li>
            <li><code>&lt; &gt; &lt;= &gt;=</code> orden numérico/lexicográfico.</li>
            <li><code>and</code>, <code>or</code>, <code>not</code> — lógicos.</li>
            <li><code>in</code> — pertenencia: <code>22 in [22, 80]</code> → True.</li>
          </ul>
          <p>Truco: <code>if 0 &lt;= x &lt; 100:</code> funciona — Python permite
          encadenar comparaciones, no como C/Java.</p>
        `,
      },
      {
        id: 'dicts_sets',
        title: '7. Dicts y sets',
        body: `
          <h3>7. Dicts y sets</h3>
          <p><strong>Dict</strong>: pares clave→valor, lookup en O(1):</p>
          <pre>servicios = {<span class="num">22</span>: <span class="str">"SSH"</span>, <span class="num">80</span>: <span class="str">"HTTP"</span>, <span class="num">443</span>: <span class="str">"HTTPS"</span>}
<span class="fn">print</span>(servicios[<span class="num">22</span>])           <span class="com"># 'SSH'</span>
<span class="fn">print</span>(servicios.<span class="fn">get</span>(<span class="num">99</span>, <span class="str">"???"</span>)) <span class="com"># '???' (default si no existe)</span>

<span class="kw">for</span> puerto, nombre <span class="kw">in</span> servicios.<span class="fn">items</span>():
    <span class="fn">print</span>(puerto, nombre)</pre>
          <p><strong>Set</strong>: colección de valores ÚNICOS, no ordenados:</p>
          <pre>ips_unicas = {<span class="str">"10.0.0.1"</span>, <span class="str">"10.0.0.2"</span>}
<span class="str">"10.0.0.1"</span> <span class="kw">in</span> ips_unicas    <span class="com"># True (rapidísimo)</span>
{<span class="num">1</span>,<span class="num">2</span>} &amp; {<span class="num">2</span>,<span class="num">3</span>}              <span class="com"># {2}  intersección</span></pre>
          <p>OJO: <code>{}</code> sin nada es DICT vacío, NO set. Para set vacío usa <code>set()</code>.</p>
          <p>➜ Más en <strong>🔤 Glosario</strong> → "set", "dict".</p>
        `,
      },
      {
        id: 'funcs',
        title: '8. Funciones (def, return, args)',
        body: `
          <h3>8. Funciones</h3>
          <pre><span class="kw">def</span> <span class="fn">escanear</span>(host, puertos):
    abiertos = []
    <span class="kw">for</span> p <span class="kw">in</span> puertos:
        <span class="kw">if</span> scan_port(host, p) == <span class="str">"open"</span>:
            abiertos.<span class="fn">append</span>(p)
    <span class="kw">return</span> abiertos

resultado = <span class="fn">escanear</span>(<span class="str">"target.local"</span>, [<span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>])</pre>
          <p>Encapsular código en funciones es la primera mejora real de calidad —
          permite reutilizar y separar responsabilidades.</p>
          <h4>Argumentos por defecto</h4>
          <pre><span class="kw">def</span> <span class="fn">saludar</span>(nombre, prefijo=<span class="str">"Sr."</span>):
    <span class="kw">return</span> <span class="str">f"Hola </span>{prefijo}<span class="str"> </span>{nombre}<span class="str">"</span>

<span class="fn">saludar</span>(<span class="str">"Vega"</span>)              <span class="com"># 'Hola Sr. Vega'</span>
<span class="fn">saludar</span>(<span class="str">"Vega"</span>, <span class="str">"Iris"</span>)      <span class="com"># 'Hola Iris Vega'</span></pre>
        `,
      },
      {
        id: 'imports',
        title: '9. import + librería estándar',
        body: `
          <h3>9. import + librería estándar</h3>
          <p>La <strong>stdlib</strong> de Python trae cientos de módulos útiles, ya
          incluidos. Solo hay que <code>import</code>arlos:</p>
          <pre><span class="kw">import</span> json
<span class="kw">import</span> hashlib
<span class="kw">from</span> collections <span class="kw">import</span> Counter

datos = {<span class="str">"host"</span>: <span class="str">"acme.local"</span>, <span class="str">"ports"</span>: [<span class="num">22</span>, <span class="num">80</span>]}
<span class="fn">print</span>(json.<span class="fn">dumps</span>(datos, indent=<span class="num">2</span>))

h = hashlib.<span class="fn">sha256</span>(<span class="str">b"hola"</span>).<span class="fn">hexdigest</span>()</pre>
          <h4>Módulos que verás durante el curso</h4>
          <ul>
            <li><code>json</code> — serializar / parsear (Cap 1+)</li>
            <li><code>re</code> — expresiones regulares (Cap 2+)</li>
            <li><code>hashlib</code>, <code>base64</code> — cripto y codificación (Cap 5)</li>
            <li><code>urllib.parse</code> — URLs (Cap 5)</li>
            <li><code>collections.Counter</code>, <code>defaultdict</code> (Cap 6+)</li>
            <li><code>os.path</code>, <code>pathlib</code> — paths seguros (Cap 4)</li>
          </ul>
          <p>➜ Cada uno con ejemplos en <strong>📚 Cheatsheet → Stdlib</strong>.</p>
        `,
      },
    ],
  },

  // ============================================================
  // SECCIÓN 2: PYTHON — INTERMEDIO  (Cap 2)
  // ============================================================
  {
    section: "2. Python — intermedio",
    items: [
      {
        id: 'strings',
        title: '10. Strings: métodos clave',
        body: `
          <h3>10. Métodos de string</h3>
          <p>Los strings tienen métodos integrados súper útiles para parsear logs y
          banners — el 80% del análisis de salida de herramientas pasa por aquí.</p>
          <pre>banner = <span class="str">"SSH-2.0-OpenSSH_8.2p1 Ubuntu"</span>

banner.<span class="fn">split</span>(<span class="str">"-"</span>)          <span class="com"># ['SSH', '2.0', 'OpenSSH_8.2p1 Ubuntu']</span>
banner.<span class="fn">startswith</span>(<span class="str">"SSH"</span>)    <span class="com"># True</span>
banner.<span class="fn">strip</span>()              <span class="com"># quita whitespace alrededor</span>
banner.<span class="fn">lower</span>()              <span class="com"># todo minúsculas</span>
banner.<span class="fn">replace</span>(<span class="str">"SSH"</span>, <span class="str">"X"</span>) <span class="com"># sustituye</span>
<span class="str">", "</span>.<span class="fn">join</span>([<span class="str">"a"</span>, <span class="str">"b"</span>])    <span class="com"># 'a, b' — INVERSO de split</span>

<span class="com"># partition es split que para en el primer match — ideal para "X==Y"</span>
pkg, _, ver = <span class="str">"flask==2.0.1"</span>.<span class="fn">partition</span>(<span class="str">"=="</span>)
<span class="com"># ('flask', '==', '2.0.1')</span></pre>
        `,
      },
      {
        id: 'regex',
        title: '11. Regex (módulo re)',
        body: `
          <h3>11. Regex — re</h3>
          <p>Cuando los formatos varían (logs, banners, mails, captura de tráfico),
          regex es la herramienta universal.</p>
          <pre><span class="kw">import</span> re

m = re.<span class="fn">search</span>(<span class="str">r"(\\d+\\.\\d+\\.\\d+\\.\\d+)"</span>, log_line)
<span class="kw">if</span> m:
    ip = m.<span class="fn">group</span>(<span class="num">1</span>)

todas = re.<span class="fn">findall</span>(<span class="str">r"https?://[^\\s]+"</span>, body)</pre>
          <h4>Sintaxis mínima a recordar</h4>
          <ul>
            <li><code>\\d</code> dígito · <code>\\w</code> "palabra" · <code>\\s</code> whitespace.</li>
            <li><code>+</code> uno o más · <code>*</code> cero o más · <code>?</code> opcional.</li>
            <li><code>( ... )</code> grupo capturable, recuperable con <code>.group(N)</code>.</li>
            <li><code>\\.</code> punto literal (escapado).</li>
            <li><code>[abc]</code> clase · <code>[^abc]</code> negada.</li>
            <li>Siempre prefijo <code>r"..."</code> (raw string).</li>
          </ul>
          <p>➜ Detalle completo en <strong>📚 Cheatsheet → Stdlib → re</strong>
          y en la teoría del Cap 2 OP-14.</p>
        `,
      },
      {
        id: 'try_except',
        title: '12. try / except',
        body: `
          <h3>12. Manejo de errores</h3>
          <p>El código real falla. Servicios que no responden, JSON malformado,
          archivos que no existen. <code>try/except</code> captura la excepción y
          permite seguir adelante.</p>
          <pre><span class="kw">try</span>:
    banner = fetch_banner(host, <span class="num">22</span>)
    <span class="kw">if not</span> banner:
        <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="str">"banner vacío"</span>)
    <span class="fn">print</span>(banner)
<span class="kw">except</span> <span class="fn">ValueError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="str">f"Error: </span>{e}<span class="str">"</span>)
<span class="kw">finally</span>:
    <span class="com"># se ejecuta SIEMPRE, haya o no error</span>
    cerrar_recursos()</pre>
          <h4>Reglas profesionales</h4>
          <ul>
            <li>Captura <strong>tipos específicos</strong>: <code>ValueError</code>,
                <code>FileNotFoundError</code>... Mejor que <code>except</code> a secas.</li>
            <li>NUNCA <code>except:</code> sin tipo — captura hasta Ctrl+C.</li>
            <li>En auditoría: una excepción no debe parar tu script de 200 hosts.</li>
          </ul>
        `,
      },
      {
        id: 'classes',
        title: '13. Clases',
        body: `
          <h3>13. Clases (OOP básico)</h3>
          <p>Cuando manejas decenas del mismo "tipo de cosa" (servicios, hosts,
          findings...), agrupar estado y comportamiento en una clase es más limpio
          que dicts sueltos.</p>
          <pre><span class="kw">class</span> <span class="fn">Service</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, host, port):
        self.host = host
        self.port = port
        self.banner = <span class="str">""</span>

    <span class="kw">def</span> <span class="fn">describe</span>(self):
        <span class="kw">return</span> <span class="str">f"</span>{self.host}<span class="str">:</span>{self.port}<span class="str">"</span>

s = <span class="fn">Service</span>(<span class="str">"acme.local"</span>, <span class="num">22</span>)
<span class="fn">print</span>(s.<span class="fn">describe</span>())</pre>
          <ul>
            <li><code>__init__</code> es el constructor — se ejecuta al crear instancia.</li>
            <li><code>self</code> es la instancia actual; va siempre como primer parámetro de cada método.</li>
            <li>Olvidar <code>self</code> es el TypeError clásico de principiante.</li>
          </ul>
        `,
      },
      {
        id: 'files',
        title: '14. Archivos (open + with)',
        body: `
          <h3>14. Archivos — open + with</h3>
          <p>El patrón <code>with open(...) as f:</code> garantiza que el archivo se
          cierra al salir del bloque, incluso si hay excepción. Es el estándar.</p>
          <pre><span class="com"># Escribir</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"reporte.txt"</span>, <span class="str">"w"</span>) <span class="kw">as</span> f:
    f.<span class="fn">write</span>(<span class="str">"linea 1\\n"</span>)
    f.<span class="fn">write</span>(<span class="str">"linea 2\\n"</span>)

<span class="com"># Leer todo</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"reporte.txt"</span>) <span class="kw">as</span> f:
    contenido = f.<span class="fn">read</span>()

<span class="com"># Leer línea a línea (más eficiente para archivos grandes)</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"access.log"</span>) <span class="kw">as</span> f:
    <span class="kw">for</span> linea <span class="kw">in</span> f:
        <span class="fn">print</span>(linea.<span class="fn">strip</span>())</pre>
          <p>Modos: <code>"r"</code> lectura (default) · <code>"w"</code> escritura
          (sobreescribe) · <code>"a"</code> append.</p>
        `,
      },
    ],
  },

  // ============================================================
  // SECCIÓN 3: PYTHON — AVANZADO  (Cap 5-9)
  // ============================================================
  {
    section: "3. Python — avanzado",
    items: [
      {
        id: 'bitwise',
        title: '15. Bitwise + binario + octal',
        body: `
          <h3>15. Operaciones a nivel de bit</h3>
          <p>Aparecen en permisos UNIX, flags TCP, máscaras de subnet, cripto.</p>
          <pre>a &amp; b    <span class="com"># AND   bit a 1 si AMBOS lo son</span>
a | b    <span class="com"># OR    bit a 1 si AL MENOS uno lo es</span>
a ^ b    <span class="com"># XOR   bit a 1 si DIFIEREN</span>
~a       <span class="com"># NOT   invierte</span>
a &lt;&lt; n   <span class="com"># shift izquierda — multiplica por 2^n</span>
a &gt;&gt; n   <span class="com"># shift derecha   — divide por 2^n</span></pre>
          <h4>Literales y formats</h4>
          <pre><span class="num">0b1100</span>     <span class="com"># binario  = 12</span>
<span class="num">0o751</span>      <span class="com"># octal    = 489 (permisos UNIX)</span>
<span class="num">0xff</span>       <span class="com"># hex      = 255</span>

<span class="fn">print</span>(<span class="str">f"</span>{<span class="num">42</span>:<span class="str">08b</span>}<span class="str">"</span>)  <span class="com"># '00101010' (binario, 8 bits)</span>
<span class="fn">print</span>(<span class="str">f"</span>{<span class="num">42</span>:<span class="str">o</span>}<span class="str">"</span>)    <span class="com"># '52'</span>
<span class="fn">print</span>(<span class="str">f"</span>{<span class="num">42</span>:<span class="str">x</span>}<span class="str">"</span>)    <span class="com"># '2a'</span></pre>
          <p>OJO con confundir <code>and</code>/<code>or</code> (lógicos) con
          <code>&amp;</code>/<code>|</code> (bitwise). Y con <code>~</code> y
          comparaciones, usa paréntesis: <code>(x &amp; 1) == 0</code>.</p>
          <p>➜ Cap 5 OP-34 entra a fondo. <strong>🔤 Glosario → "bitwise", "XOR"</strong>.</p>
        `,
      },
      {
        id: 'lambda_sort',
        title: '16. lambda + sorted con key',
        body: `
          <h3>16. lambda + sorted/min/max con <code>key=</code></h3>
          <p>Para ordenar (o encontrar min/max) por un criterio derivado, no directo.</p>
          <pre>palabras = [<span class="str">"zorro"</span>, <span class="str">"ave"</span>, <span class="str">"perro"</span>]

<span class="fn">sorted</span>(palabras, key=<span class="fn">len</span>)
<span class="com"># ['ave', 'zorro', 'perro']  por longitud</span>

items = [(<span class="str">"a"</span>, <span class="num">3</span>), (<span class="str">"b"</span>, <span class="num">1</span>), (<span class="str">"c"</span>, <span class="num">2</span>)]
<span class="fn">sorted</span>(items, key=<span class="kw">lambda</span> t: t[<span class="num">1</span>])
<span class="com"># [('b', 1), ('c', 2), ('a', 3)]</span>

<span class="com"># Ordenar alertas por severidad usando dict de prioridad:</span>
SEV = {<span class="str">"critical"</span>: <span class="num">0</span>, <span class="str">"high"</span>: <span class="num">1</span>, <span class="str">"medium"</span>: <span class="num">2</span>}
alertas.<span class="fn">sort</span>(key=<span class="kw">lambda</span> a: SEV[a[<span class="str">"severity"</span>]])</pre>
          <p>Una <code>lambda</code> es una función anónima de UNA expresión.
          Si necesitas más, usa <code>def</code>.</p>
        `,
      },
      {
        id: 'collections',
        title: '17. Counter, defaultdict',
        body: `
          <h3>17. collections — estructuras potentes</h3>
          <h4>Counter</h4>
          <p>Contar ocurrencias en un iterable es trivial:</p>
          <pre><span class="kw">from</span> collections <span class="kw">import</span> Counter

ips = [<span class="str">"10.0.0.5"</span>, <span class="str">"10.0.0.5"</span>, <span class="str">"8.8.8.8"</span>]
c = <span class="fn">Counter</span>(ips)
<span class="com"># Counter({'10.0.0.5': 2, '8.8.8.8': 1})</span>

c.<span class="fn">most_common</span>(<span class="num">3</span>)
<span class="com"># [('10.0.0.5', 2), ('8.8.8.8', 1)]</span>

<span class="com"># Idiomático: Counter sobre un generador</span>
c = <span class="fn">Counter</span>(p[<span class="str">"src_ip"</span>] <span class="kw">for</span> p <span class="kw">in</span> pcap)</pre>
          <h4>defaultdict</h4>
          <p>Dict con valor por defecto, evita comprobar "si no existe la key, créala con []":</p>
          <pre><span class="kw">from</span> collections <span class="kw">import</span> defaultdict
groups = <span class="fn">defaultdict</span>(<span class="fn">list</span>)
<span class="kw">for</span> e <span class="kw">in</span> eventos:
    groups[e[<span class="str">"user"</span>]].<span class="fn">append</span>(e)</pre>
        `,
      },
      {
        id: 'comprehensions',
        title: '18. Comprehensions complejas',
        body: `
          <h3>18. Comprehensions — formas avanzadas</h3>
          <pre><span class="com"># Lista filtrada</span>
abiertos = [p <span class="kw">for</span> p <span class="kw">in</span> puertos <span class="kw">if</span> scan_port(host, p) == <span class="str">"open"</span>]

<span class="com"># Set comprehension — únicos</span>
ips = {p[<span class="str">"src_ip"</span>] <span class="kw">for</span> p <span class="kw">in</span> pcap}

<span class="com"># Dict comprehension — invertir un dict</span>
inverso = {v: k <span class="kw">for</span> k, v <span class="kw">in</span> original.<span class="fn">items</span>()}

<span class="com"># Con if/else (ENTRE expresión y for, no al final)</span>
estados = [<span class="str">"OK"</span> <span class="kw">if</span> x &gt; <span class="num">0</span> <span class="kw">else</span> <span class="str">"FAIL"</span> <span class="kw">for</span> x <span class="kw">in</span> valores]</pre>
          <p>Cuándo usar / cuándo no:</p>
          <ul>
            <li>OK: filtro + transformación simple sobre un iterable.</li>
            <li>NO: lógica con varias acciones por iteración o condiciones complejas
                — mejor un for normal, más legible.</li>
          </ul>
        `,
      },
      {
        id: 'generators',
        title: '19. Generadores y yield',
        body: `
          <h3>19. Generadores — producir valores bajo demanda</h3>
          <p>Útil para streams grandes (logs, pcaps) sin cargar todo en memoria:</p>
          <pre><span class="kw">def</span> <span class="fn">primeros_n</span>(n):
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):
        <span class="kw">yield</span> i * i

<span class="com"># Solo computa cada cuadrado cuando se itera</span>
<span class="kw">for</span> x <span class="kw">in</span> <span class="fn">primeros_n</span>(<span class="num">1000000</span>):
    <span class="fn">print</span>(x)
    <span class="kw">if</span> x &gt; <span class="num">100</span>: <span class="kw">break</span>  <span class="com"># solo se han computado las primeras</span></pre>
          <h4>Expresiones generadoras (sin def)</h4>
          <pre>cuad = (x*x <span class="kw">for</span> x <span class="kw">in</span> <span class="fn">range</span>(<span class="num">10</span>))   <span class="com"># NOTA: paréntesis, no corchetes</span>
<span class="fn">sum</span>(<span class="num">1</span> <span class="kw">for</span> p <span class="kw">in</span> pkts <span class="kw">if</span> p[<span class="str">"protocol"</span>] == <span class="str">"TCP"</span>)
<span class="com"># Cuenta sin construir lista intermedia</span></pre>
        `,
      },
    ],
  },

  // ============================================================
  // SECCIÓN 4: APIS Y MECÁNICAS DEL JUEGO
  // ============================================================
  {
    section: "4. APIs y mecánicas del juego",
    items: [
      {
        id: 'apis_overview',
        title: '20. Funciones del juego — vista general',
        body: `
          <h3>20. APIs simuladas — vista general</h3>
          <p>Estas funciones simulan herramientas reales con datos predefinidos por
          nivel. <strong>Cero red real.</strong></p>
          <table style="font-size: 13px; border-collapse: collapse;">
            <tr><th align="left">Función</th><th align="left">Devuelve</th><th align="left">Aparece en</th></tr>
            <tr><td><code>scan_port(host, port)</code></td><td>"open"|"closed"|"filtered"</td><td>Cap 1, 8</td></tr>
            <tr><td><code>fetch_banner(host, port)</code></td><td>str (banner)</td><td>Cap 2</td></tr>
            <tr><td><code>dns_lookup(domain)</code></td><td>list[str] (IPs)</td><td>Cap 1+</td></tr>
            <tr><td><code>fetch_url(url, method, data, headers)</code></td><td>HttpResponse</td><td>Cap 3, 4</td></tr>
            <tr><td><code>socket_request(host, port, payload)</code></td><td>str | None</td><td>Cap 6, 8</td></tr>
            <tr><td><code>bash(cmd)</code></td><td>BashResult</td><td>Cap 7</td></tr>
            <tr><td><code>parse_pcap()</code></td><td>list[dict]</td><td>Cap 6, 7</td></tr>
          </table>
          <p>➜ Firma completa, retorno y ejemplo de cada una en
          <strong>📚 Cheatsheet → API del juego (Ctrl+K)</strong>.</p>
        `,
      },
      {
        id: 'pista_4tier',
        title: '21. Sistema de pistas en 4 capas',
        body: `
          <h3>21. Las 4 capas de pista</h3>
          <p>Cada nivel ofrece 4 botones que se desbloquean en orden — el siguiente
          aparece solo cuando consultas el anterior:</p>
          <ol>
            <li><strong>📖 Teoría</strong> — concepto Python desde cero, ejemplos
                progresivos, errores típicos.</li>
            <li><strong>🧭 Estrategia</strong> — pseudocódigo paso a paso. Sin
                sintaxis Python, solo "qué hacer en orden".</li>
            <li><strong>🪜 Esqueleto</strong> — código con huecos
                <code>[TODO: ...]</code> que rellenas.</li>
            <li><strong>💡 Solución</strong> — código completo comentado. Última
                instancia, para comparar tu trabajo.</li>
          </ol>
          <p>Filosofía: empieza por la capa más baja. Si bastó con la teoría, no
          abras las siguientes. Cada capa que abras se queda registrada (se ve un
          ✓), pero el progreso del nivel solo depende de que tu código pase los
          chequeos.</p>
          <p>En <strong>niveles examen</strong> (uno por capítulo), las 4 capas
          están bloqueadas. Solo dispones del briefing y los datos predefinidos.</p>
        `,
      },
      {
        id: 'cheat_glossary',
        title: '22. Cheatsheet y glosario',
        body: `
          <h3>22. Referencias siempre disponibles</h3>
          <h4>📚 Cheatsheet (Ctrl+K)</h4>
          <p>Overlay modal con 26 entradas detalladas, organizadas en 3 pestañas:</p>
          <ul>
            <li><strong>API del juego</strong> — firmas, retornos, ejemplos de las 8 APIs.</li>
            <li><strong>Stdlib</strong> — los 7 módulos que usa el curso (json, re,
                hashlib, base64, urllib.parse, collections, pathlib).</li>
            <li><strong>Sintaxis Python</strong> — f-strings, comprehensions,
                slicing, sort+key, try/except, with, set ops, bitwise, args/kwargs.</li>
          </ul>
          <p>Disponible <strong>siempre</strong>, también en exámenes.</p>
          <h4>🔤 Glosario</h4>
          <p>73 términos técnicos cubriendo cripto, web/HTTP, forense, red, threat
          intel y Python. Aparecen <span style="border-bottom:1px dotted var(--cyan)">
          subrayados con punteado</span> en briefings y missions — al hacer hover
          ves un tooltip; al hacer click vas a la entrada completa en la pantalla
          del glosario.</p>
          <p>También hay buscador en la pantalla del glosario, accesible desde el
          menú principal.</p>
        `,
      },
      {
        id: 'cover_exams',
        title: '23. Cover, exámenes, medallas',
        body: `
          <h3>23. Stakes del juego</h3>
          <h4>Cover meter ❤</h4>
          <ul>
            <li>Empiezas con 3 puntos. Cada error de Python te quema 1.</li>
            <li>A 0 → vuelves al último checkpoint (cada nivel <em>is_checkpoint</em>).</li>
            <li>El máximo aumenta en +1 con cada examen aprobado.</li>
            <li>Algunos niveles te dan <strong>VPN burner</strong> 🛡 — pulsa para
                recuperar 1 punto.</li>
            <li>Botón <code>❤ ON/OFF</code> en el header lo desactiva si quieres
                jugar sin presión.</li>
          </ul>
          <h4>Exámenes (uno por capítulo)</h4>
          <ul>
            <li>Bloquean las 4 capas de pista — solo briefing y datos.</li>
            <li>Tienen restricciones técnicas (líneas máximas, funciones requeridas,
                operadores específicos).</li>
            <li>Aprobar cura el cover al máximo y aumenta el límite en +1.</li>
            <li>Otorga una <strong>medalla</strong> 🏅 visible en el menú principal
                (persiste cross-rondas).</li>
          </ul>
        `,
      },
      {
        id: 'layout',
        title: '24. Layout y atajos',
        body: `
          <h3>24. Layout y atajos</h3>
          <h4>4 paneles redimensionables</h4>
          <p>Briefing + editor (izquierda), mapa de red + terminal (derecha).
          Arrastra los separadores entre paneles para personalizar.</p>
          <ul>
            <li><strong>🔓 LIBRE / 🔒 FIJO</strong> — botón en el header que bloquea el
                redimensionado cuando ya tienes la disposición que te gusta.</li>
            <li><strong>↺ RESET</strong> — restaura los tamaños originales.</li>
          </ul>
          <h4>Atajos de teclado</h4>
          <table style="font-size: 13px;">
            <tr><td><code>Ctrl+Enter</code></td><td>Ejecutar el código del editor.</td></tr>
            <tr><td><code>Ctrl+K</code></td><td>Abrir el cheatsheet.</td></tr>
            <tr><td><code>Esc</code></td><td>Cerrar overlay activo.</td></tr>
            <tr><td><code>Enter</code></td><td>Aceptar/avanzar en overlays modales.</td></tr>
          </table>
          <h4>Persistencia</h4>
          <p>Todo en <code>localStorage</code> del navegador: progreso, código por
          nivel, preferencias, qué capas de pista has visto, layout. Sin cuentas,
          sin servidor. "Nueva ronda" desde el menú resetea progreso pero conserva
          medallas.</p>
        `,
      },
    ],
  },
];

// Aplanado para el sistema de TOC
const TUTORIAL = TUTORIAL_SECTIONS.flatMap(s => s.items);

// ============================================================
// HOWTO_CONTENT — la pantalla "❓ Cómo opera Sentinel" del menú principal.
// Resumen para quien acaba de llegar y quiere saber qué va a hacer.
// ============================================================

const HOWTO_CONTENT = `
  <h3>Cómo opera Sentinel</h3>
  <p>Eres un analista junior. Tu mentora <strong>Iris Vega</strong> te asigna
  operaciones graduadas, cada una contra un objetivo simulado autorizado.
  Resuelves cada operación con código Python en el editor.</p>

  <h3>El flujo de cada operación</h3>
  <ol>
    <li>Lees el <strong>briefing</strong> (panel izquierdo arriba).</li>
    <li>Escribes Python en el <strong>editor</strong>.</li>
    <li>Pulsas <strong>▶ Ejecutar</strong> (o <code>Ctrl+Enter</code>).</li>
    <li>Ves el output en el <strong>terminal</strong> (abajo a la derecha).</li>
    <li>Si el código pasa los chequeos, sale el aviso de operación completada.</li>
  </ol>
  <p>Si el nivel implica recon de hosts, los servicios descubiertos aparecen en
  el <strong>mapa de red</strong> (arriba a la derecha) según escaneas.</p>

  <h3>Si te atascas — sistema de 4 pistas</h3>
  <p>Cada nivel ofrece 4 capas revelables en orden:</p>
  <ol>
    <li><strong>📖 Teoría</strong> — concepto Python desde cero.</li>
    <li><strong>🧭 Estrategia</strong> — pseudocódigo paso a paso (sin sintaxis Python).</li>
    <li><strong>🪜 Esqueleto</strong> — código con huecos <code>[TODO: ...]</code>.</li>
    <li><strong>💡 Solución</strong> — código completo comentado.</li>
  </ol>
  <p>Empieza siempre por la capa más baja que necesites. Cada capa abierta
  desbloquea la siguiente.</p>

  <h3>Referencias siempre disponibles</h3>
  <ul>
    <li><strong>📚 Cheatsheet</strong> (<code>Ctrl+K</code> o botón del header) —
        APIs del juego, módulos stdlib usados, sintaxis Python esencial. 26 entradas.</li>
    <li><strong>🔤 Glosario</strong> (botón en menú) — 73 términos técnicos
        (cripto, web, forense, red, threat intel, Python). Aparecen subrayados
        en briefings con tooltip.</li>
    <li><strong>📚 Manual técnico</strong> (donde estás ahora) — mapa rápido
        del Python que necesitas a lo largo del curso.</li>
  </ul>

  <h3>Funciones disponibles en el sandbox</h3>
  <table style="font-size: 13px;">
    <tr><td><code>print(...)</code></td><td>Escribir en el terminal.</td></tr>
    <tr><td><code>scan_port(host, port)</code></td><td>"open" / "closed" / "filtered".</td></tr>
    <tr><td><code>fetch_banner(host, port)</code></td><td>Banner del servicio.</td></tr>
    <tr><td><code>dns_lookup(domain)</code></td><td>Lista de IPs.</td></tr>
    <tr><td><code>fetch_url(url, method, data, headers)</code></td><td>Petición HTTP.</td></tr>
    <tr><td><code>socket_request(host, port, payload)</code></td><td>Bytes raw por TCP.</td></tr>
    <tr><td><code>bash(cmd)</code></td><td>Comando bash mockeado (forense).</td></tr>
    <tr><td><code>parse_pcap()</code></td><td>Lista de paquetes simulados.</td></tr>
  </table>
  <p>Cada una se introduce en su capítulo correspondiente. El cheatsheet tiene
  la firma exacta y un ejemplo de cada una.</p>

  <h3>Cover, exámenes y medallas</h3>
  <ul>
    <li>Empiezas con 3 puntos de <strong>cover</strong> ❤. Cada error de Python te
        quema 1 punto.</li>
    <li>A 0 → vuelves al último checkpoint.</li>
    <li>Aprobar un examen restaura el cover y aumenta el máximo en +1, además
        de darte una <strong>medalla</strong> 🏅 (persiste cross-rondas).</li>
    <li>Algunos niveles te dan una <strong>VPN burner</strong> 🛡: úsala para
        recuperar 1 punto.</li>
    <li>¿Sin ganas de stakes? Desactiva el cover meter con el botón
        <code>❤ ON/OFF</code> del header.</li>
  </ul>

  <h3>Niveles examen</h3>
  <p>Hay un examen al final de cada capítulo (10 en total). Son distintos:</p>
  <ul>
    <li>Bloquean TODAS las capas de pista.</li>
    <li>Tienen restricciones técnicas (líneas máximas, funciones requeridas,
        operadores específicos).</li>
    <li>Solo briefing y datos predefinidos. Demuestras lo que has aprendido.</li>
  </ul>

  <h3>Layout configurable</h3>
  <p>Los 4 paneles se redimensionan arrastrando sus separadores. Cuando tengas
  la disposición a tu gusto, pulsa <code>🔓 LIBRE → 🔒 FIJO</code> en el header
  para que no se descuadre por accidente. <code>↺ RESET</code> restaura los
  tamaños originales.</p>

  <h3>Persistencia</h3>
  <p>Todo en <code>localStorage</code> del navegador: progreso, código por nivel,
  preferencias, layout, qué capas de pista has visto. Sin cuentas, sin servidor,
  sin tracking. "Nueva ronda" desde el menú resetea progreso pero conserva las
  medallas.</p>

  <h3>Atajos</h3>
  <table style="font-size: 13px;">
    <tr><td><code>Ctrl+Enter</code></td><td>Ejecutar el código del editor.</td></tr>
    <tr><td><code>Ctrl+K</code></td><td>Abrir el cheatsheet.</td></tr>
    <tr><td><code>Esc</code></td><td>Cerrar overlay activo.</td></tr>
    <tr><td><code>Enter</code></td><td>Aceptar/avanzar en overlays modales.</td></tr>
  </table>

  <h3>Disclaimer</h3>
  <p>Todos los objetivos del juego son ficticios y simulados internamente. Las
  funciones <code>scan_port</code>, <code>fetch_url</code>, etc.
  <strong>NO realizan conexiones de red reales</strong>. Aplicar técnicas
  similares contra sistemas reales sin autorización escrita es ilegal en la
  mayoría de jurisdicciones.</p>
`;

// ============================================================
// STORY_CONTENT — el "Briefing completo" del menú principal. Marco narrativo.
// ============================================================

const STORY_CONTENT = `
  <h3>Prólogo</h3>
  <p><strong>Sentinel Labs</strong> es una firma de seguridad ofensiva con sede en
  un edificio sin nombre del distrito financiero. Sus clientes contratan
  auditorías controladas: bancos, hospitales, infraestructura crítica. Cada
  prueba está documentada, autorizada por escrito y diseñada para encontrar
  fallos antes de que los encuentre alguien menos amable.</p>
  <p>Te acaban de contratar como <em>analista junior</em>. Las primeras seis
  semanas son formación interna — operaciones de práctica contra laboratorios
  controlados, supervisadas por una senior con la paciencia justa.</p>

  <h3>Iris Vega</h3>
  <p>Diez años en la industria. Un máster en criptografía aplicada, dos
  certificaciones que importan, una década respondiendo a incidentes que el
  cliente nunca admitirá públicamente. Te trata como adulto. Espera el mismo
  trato.</p>
  <p>Su filosofía: no hay magia en pentesting. Hay método, código, reglas
  legales y mucha lectura previa. Lo demás es marketing.</p>

  <h3>Caldera</h3>
  <p>Grupo de amenaza persistente avanzada (APT) cuyas tácticas la firma viene
  documentando desde hace dos años. Atacan cadenas de suministro de
  infraestructura. Su origen es desconocido. Sus objetivos son siempre los
  mismos: penetrar sin ser detectados, mantenerse el tiempo necesario, salir
  con datos sensibles.</p>
  <p>Hasta ahora era una amenaza académica. En la sexta semana de tu formación,
  Iris cierra la puerta de la sala y te dice: <em>«Caldera está dentro de la red
  de un cliente. Necesitamos detectarlo, contenerlo y reportar. Vas a aplicar
  todo lo que has aprendido — pero esta vez es real.»</em></p>

  <h3>El programa de formación — 10 capítulos</h3>
  <ul>
    <li><strong>Cap 0</strong> — Onboarding técnico. Python desde cero hasta
        listas y for. Ningún recon todavía.</li>
    <li><strong>Cap 1</strong> — Reconocimiento básico. <code>scan_port</code>
        contra un laboratorio del cliente ACME. Primer contacto con el método.</li>
    <li><strong>Cap 2</strong> — Análisis de servicios. Banner grabbing,
        regex, manejo de errores, clases. Convertir bytes en información útil.</li>
    <li><strong>Cap 3</strong> — HTTP y APIs. Auditoría web autorizada simulada
        contra una tienda online (ShopStack). Petición / respuesta / sesión / headers.</li>
    <li><strong>Cap 4</strong> — Defensa de aplicaciones web. Validación de
        input, audit logs, security headers, authz, path normalization. El
        reverso defensivo de las vulnerabilidades clásicas.</li>
    <li><strong>Cap 5</strong> — Cripto clásica y datos. Codificaciones,
        hashes, César, XOR, bitwise. Romper cosas mal protegidas y entender
        por qué se rompen.</li>
    <li><strong>Cap 6</strong> — Red y protocolos. Sockets simulados, análisis
        de pcap, HTTP construido a mano, detección de anomalías.</li>
    <li><strong>Cap 7</strong> — Forense y respuesta a incidentes. Triage de
        host, parsing de logs, hashing de evidencia, timeline.</li>
    <li><strong>Cap 8</strong> — Operación final. Caldera está en un cliente
        real. Detectar, contener, reportar al blue team.</li>
    <li><strong>Cap 9</strong> — Detección y análisis defensivo. YARA-lite,
        typosquat, extracción de IOCs, auditoría de dependencias contra CVE feed,
        reglas Sigma-lite. El bloque del analista de threat intel.</li>
  </ul>

  <h3>Tono</h3>
  <p>Esto no es un juego sobre "hackear es guay". Es un curso disfrazado de
  juego, ambientado en la única forma legal y útil de aplicar estas técnicas:
  pentesting ético autorizado y, sobre todo, defensa. La mayoría del curriculum
  se centra en <strong>auditar, detectar, defender y responder</strong>, no en
  atacar. Los pocos escenarios ofensivos están enmarcados en CTF-style sobre
  infraestructura ficticia con autorización explícita en el briefing.</p>
  <p>Si lo terminas, sabrás Python aplicado lo suficiente como para abrir la
  puerta. Lo que hay detrás depende de ti — y de lo que decidas leer, practicar
  y certificar después.</p>

  <p style="text-align:center; color: var(--cyan); margin-top: 24px; font-style: italic;">
  — Bienvenido a Sentinel Labs —</p>
`;
