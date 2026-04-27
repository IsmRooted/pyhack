// PyHack — Manual técnico (Python básico + módulos cyber) y textos largos del menú.

const TUTORIAL_SECTIONS = [
  {
    section: "Python — fundamentos",
    items: [
      {
        id: 'intro',
        title: '0. Antes de empezar',
        body: `
          <h3>0. Antes de empezar</h3>
          <p>Python es un lenguaje de programación. Tú escribes <em>instrucciones</em>
          y la máquina las ejecuta de arriba a abajo, una por una.</p>
          <p>En PyHack escribes Python real. Cada vez que pulsas <strong>▶ Ejecutar</strong>,
          tu código corre en un sandbox y su output aparece en el terminal.</p>
          <h4>Reglas de oro</h4>
          <ul>
            <li>Python distingue mayúsculas: <code>scan_port</code> y <code>Scan_Port</code> son distintos.</li>
            <li>La <strong>indentación</strong> (sangría) importa: usa 4 espacios.</li>
            <li>Los comentarios empiezan con <code>#</code> y Python los ignora.</li>
          </ul>
        `,
      },
      {
        id: 'print', title: '1. print() y comentarios',
        body: `
          <h3>1. print() y comentarios</h3>
          <p>Tu primera herramienta:</p>
          <pre><span class="fn">print</span>(<span class="str">"Hola"</span>)
<span class="com"># esto es un comentario, Python lo ignora</span></pre>
          <p>print acepta varios argumentos separados por coma, y los imprime con
          un espacio entre cada uno:</p>
          <pre><span class="fn">print</span>(<span class="str">"IP:"</span>, <span class="str">"10.0.0.1"</span>, <span class="str">"port:"</span>, <span class="num">22</span>)
<span class="com"># IP: 10.0.0.1 port: 22</span></pre>
        `,
      },
      {
        id: 'vars', title: '2. Variables',
        body: `
          <h3>2. Variables</h3>
          <p>Una variable guarda un valor con un nombre:</p>
          <pre>target = <span class="str">"target.acme.local"</span>
port = <span class="num">22</span>
abierto = <span class="kw">True</span></pre>
          <p>Reglas:</p>
          <ul>
            <li>Solo letras, números y <code>_</code>. No empezar por número.</li>
            <li>Distingue mayúsculas: <code>target</code> ≠ <code>Target</code>.</li>
            <li>Mejor nombres descriptivos: <code>port</code> > <code>p</code>.</li>
          </ul>
        `,
      },
      {
        id: 'fstrings', title: '3. f-strings',
        body: `
          <h3>3. f-strings</h3>
          <pre>host = <span class="str">"target.local"</span>
port = <span class="num">80</span>
<span class="fn">print</span>(<span class="str">f"Escaneando </span>{host}<span class="str">:</span>{port}<span class="str">"</span>)</pre>
          <p>Cualquier expresión cabe entre las llaves: <code>f"len = {len(items)}"</code>,
          <code>f"hex = {255:x}"</code> (formato hex), etc.</p>
        `,
      },
      {
        id: 'lists', title: '4. Listas y for',
        body: `
          <h3>4. Listas y for</h3>
          <pre>puertos = [<span class="num">21</span>, <span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>]
<span class="kw">for</span> p <span class="kw">in</span> puertos:
    <span class="fn">print</span>(<span class="str">f"Probando </span>{p}<span class="str">"</span>)</pre>
          <p>Operaciones útiles: <code>len(lista)</code>, <code>lista.append(x)</code>,
          <code>x in lista</code>, <code>lista[0]</code> (índice empieza en 0).</p>
        `,
      },
      {
        id: 'range', title: '5. for + range',
        body: `
          <h3>5. for + range</h3>
          <pre><span class="kw">for</span> p <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">1025</span>):
    <span class="com"># escanea puertos 1 a 1024</span>
    ...</pre>
          <p><code>range(1, 1025)</code> genera 1, 2, ..., 1024 (el segundo no se incluye).</p>
        `,
      },
    ],
  },

  {
    section: "Cyber — APIs simuladas",
    items: [
      {
        id: 'apis', title: 'Vista general',
        body: `
          <h3>Funciones disponibles en PyHack</h3>
          <p>Estas funciones simulan herramientas reales de pentesting. Todas
          devuelven datos predefinidos por el nivel — <strong>no se hacen
          peticiones de red de verdad</strong>.</p>
          <ul>
            <li><code>scan_port(host, port)</code> → <code>"open"</code>, <code>"closed"</code> o <code>"filtered"</code>.</li>
            <li><code>fetch_banner(host, port)</code> → string con el banner del servicio.</li>
            <li><code>dns_lookup(domain)</code> → lista de IPs.</li>
            <li><code>fetch_url(url, method="GET", data=None)</code> → dict con <code>status</code>, <code>body</code>, <code>headers</code>.</li>
          </ul>
          <p>Conforme avances en el curriculum, irán apareciendo más funciones (cripto, sockets, subprocess…).</p>
        `,
      },
      {
        id: 'recon', title: 'Recon: escanear puertos',
        body: `
          <h3>Reconocimiento</h3>
          <p>El primer paso de cualquier operación: identificar superficie de ataque.</p>
          <pre><span class="kw">for</span> port <span class="kw">in</span> [<span class="num">21</span>, <span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>, <span class="num">3306</span>]:
    estado = scan_port(<span class="str">"target.local"</span>, port)
    <span class="kw">if</span> estado == <span class="str">"open"</span>:
        <span class="fn">print</span>(<span class="str">f"</span>{port}<span class="str"> abierto"</span>)</pre>
        `,
      },
    ],
  },
];

// Aplanado para el sistema de TOC (igual que Pythia)
const TUTORIAL = TUTORIAL_SECTIONS.flatMap(s => s.items);

const HOWTO_CONTENT = `
  <h3>Cómo opera Sentinel</h3>
  <p>Eres un analista junior. Tu mentora <strong>Iris Vega</strong> te asigna
  operaciones graduadas, cada una contra un objetivo simulado autorizado.
  Resuelves cada operación con código Python en el editor de la izquierda.</p>

  <h3>El editor y el terminal</h3>
  <ul>
    <li>Escribe Python en el editor (panel izquierdo).</li>
    <li>Pulsa <strong>▶ Ejecutar</strong> (o <code>Ctrl+Enter</code>).</li>
    <li>El output aparece en el <strong>terminal</strong> (abajo a la derecha).</li>
    <li>Si el nivel tiene objetivos de red, verás los servicios descubiertos
        en el <strong>mapa de red</strong> (arriba a la derecha).</li>
  </ul>

  <h3>Funciones disponibles</h3>
  <ul>
    <li><code>print(...)</code> — escribir en el terminal.</li>
    <li><code>scan_port(host, port)</code> — comprobar si un puerto está abierto.</li>
    <li><code>fetch_banner(host, port)</code> — leer el banner de un servicio.</li>
    <li><code>dns_lookup(domain)</code> — resolver un dominio a IPs.</li>
    <li><code>fetch_url(url, method, data)</code> — petición HTTP simulada.</li>
  </ul>
  <p>Estas funciones se irán activando conforme las introduzcamos en el curriculum.</p>

  <h3>Cover, items y evaluaciones</h3>
  <ul>
    <li>Empiezas con 3 puntos de <strong>cover</strong> (corazones).</li>
    <li>Cada error de Python te quema un punto.</li>
    <li>Cada 5 niveles tu cover se restaura y aumenta en +1 al máximo.</li>
    <li>Algunos niveles te dan una <strong>VPN burner</strong> 🛡 — pulsa
        para usarla y recuperar 1 punto.</li>
    <li>Los <strong>niveles examen</strong> (cada 5) tienen restricciones
        técnicas, sin pista, sin teoría previa.</li>
  </ul>
  <p>¿Sin ganas de stakes? Desactiva el cover meter con el botón <code>❤ ON/OFF</code> del header.</p>

  <h3>Disclaimer</h3>
  <p>Todos los objetivos del juego son ficticios y simulados internamente. Las
  funciones <code>scan_port</code>, <code>fetch_url</code>, etc. NO realizan
  conexiones de red reales. Aplicar técnicas similares contra sistemas reales
  sin autorización escrita es ilegal en la mayoría de jurisdicciones.</p>
`;

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
  de un cliente. Necesitamos extraer evidencia. Vas a aplicar todo lo que has
  aprendido — pero esta vez es real.»</em></p>

  <h3>El programa</h3>
  <p>Cap 0 te trae al nivel mínimo de Python. Cap 1-2 son recon contra un único
  cliente ficticio (ACME) — aprendes a escuchar antes de tocar. Cap 3-4 son web,
  el grueso del pentesting moderno. Cap 5 es cripto y datos. Cap 6 es red bajo
  HTTP. Cap 7 es post-explotación, donde por fin metes algo de Bash.</p>
  <p>Y Cap 8 es la operación contra Caldera. Sin red. Sin supervisión continua.
  Aplicado todo lo aprendido.</p>

  <h3>Tono</h3>
  <p>Esto no es un juego sobre "hackear es guay". Es un curso disfrazado de
  juego, ambientado en la única forma legal y útil de aplicar estas técnicas:
  pentesting ético, autorizado, documentado. Si lo terminas, sabrás Python
  aplicado lo suficiente como para abrir la puerta. Lo que hay detrás depende
  de ti — y de lo que decidas leer, practicar y certificar después.</p>

  <p style="text-align:center; color: var(--cyan); margin-top: 24px; font-style: italic;">
  — Bienvenido a Sentinel Labs —</p>
`;
