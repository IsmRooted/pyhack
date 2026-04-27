// PyHack — Pyodide loader + APIs expuestas a Python.

let pyodide = null;

const PY_PRELUDE = `
import js

# ---- Recon ----------------------------------------------------------------

def scan_port(host, port):
    """Devuelve 'open' / 'closed' / 'filtered'."""
    return js.simScanPort(str(host), int(port))

def fetch_banner(host, port):
    """Devuelve el banner del servicio o '' si no hay."""
    return js.simFetchBanner(str(host), int(port))

def dns_lookup(domain):
    """Devuelve la lista de IPs asociadas al dominio."""
    r = js.simDnsLookup(str(domain))
    try:
        return list(r)
    except Exception:
        return []

# ---- HTTP -----------------------------------------------------------------

class HttpResponse:
    def __init__(self, status, body, headers, cookies):
        self.status = status
        self.body = body or ""
        self.headers = dict(headers) if headers else {}
        self.cookies = dict(cookies) if cookies else {}
        self.text = self.body  # alias estilo requests

    def json(self):
        import json
        return json.loads(self.body) if self.body else None

    def __repr__(self):
        return f"<HttpResponse {self.status}>"


def fetch_url(url, method="GET", data=None, headers=None):
    """Petición HTTP simulada. Devuelve HttpResponse."""
    js_data = data
    js_headers = headers
    # Convertir dicts Python a JS si hace falta
    try:
        if data is not None and isinstance(data, dict):
            from pyodide.ffi import to_js
            js_data = to_js(data, dict_converter=js.Object.fromEntries)
        if headers is not None and isinstance(headers, dict):
            from pyodide.ffi import to_js
            js_headers = to_js(headers, dict_converter=js.Object.fromEntries)
    except Exception:
        pass
    r = js.simFetchUrl(str(url), str(method), js_data, js_headers)
    py = r.to_py() if hasattr(r, 'to_py') else dict(r)
    return HttpResponse(
        py.get('status', 0),
        py.get('body', ''),
        py.get('headers', {}),
        py.get('cookies', {}),
    )


def reset_http_session():
    """Limpia las cookies acumuladas por la sesión HTTP simulada."""
    js.resetHttpSession()


# ---- Sockets --------------------------------------------------------------

def socket_request(host, port, payload=""):
    """Envía un payload TCP simulado y devuelve la respuesta como string,
    o None si el puerto no responde."""
    r = js.simSocketRequest(str(host), int(port), str(payload or ""))
    return None if r is None or r is js.undefined else str(r)


# ---- Bash / subprocess ----------------------------------------------------

class BashResult:
    def __init__(self, stdout, stderr, returncode):
        self.stdout = stdout or ""
        self.stderr = stderr or ""
        self.returncode = returncode

    def __repr__(self):
        return f"<BashResult rc={self.returncode}>"


def bash(cmd):
    """Ejecuta un comando bash simulado. Devuelve BashResult."""
    r = js.simBash(str(cmd))
    py = r.to_py() if hasattr(r, 'to_py') else dict(r)
    return BashResult(py.get('stdout', ''), py.get('stderr', ''), py.get('returncode', 0))


# ---- Pcap simulado --------------------------------------------------------

def parse_pcap():
    """Devuelve la lista de paquetes simulados del nivel actual."""
    r = js.simParsePcap()
    try:
        return [dict(p.to_py()) if hasattr(p, 'to_py') else dict(p) for p in r]
    except Exception:
        return []
`;

async function initPyodide() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
  });

  pyodide.setStdout({ batched: msg => {
    const text = msg.replace(/\n+$/, '');
    if (!text) return;
    text.split('\n').forEach(line => {
      const t = line.trim();
      if (!t) return;
      log(t, 'out');
      if (typeof simSay === 'function') simSay(t);
    });
  }});

  pyodide.setStderr({ batched: msg => {
    const trimmed = msg.replace(/\n+$/, '');
    if (trimmed) log(trimmed, 'err');
  }});

  await pyodide.runPythonAsync(PY_PRELUDE);
}

async function runUserCode(code) {
  game.lastRunOutput = [];
  game.lastRunHadError = false;
  // Reset sesión HTTP por cada ejecución para evitar leak entre runs
  if (typeof resetHttpSession === 'function') resetHttpSession();

  const ns = pyodide.globals.get("dict")();
  ns.set("__builtins__", pyodide.globals.get("__builtins__"));
  // Exponer las funciones del prelude al namespace del usuario
  ['scan_port', 'fetch_banner', 'dns_lookup',
   'fetch_url', 'reset_http_session', 'HttpResponse',
   'socket_request',
   'bash', 'BashResult',
   'parse_pcap'].forEach(name => {
    const fn = pyodide.globals.get(name);
    if (fn) ns.set(name, fn);
  });

  try {
    await pyodide.runPythonAsync(code, { globals: ns });
    return { ok: true };
  } catch (err) {
    game.lastRunHadError = true;
    const msg = (err && err.message) ? err.message : String(err);
    return { ok: false, error: simplifyPyError(msg) };
  } finally {
    ns.destroy();
  }
}

function simplifyPyError(msg) {
  const lines = msg.split('\n').filter(l => l.trim());
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^[A-Z][A-Za-z]*Error:/.test(lines[i]) || /^[A-Z][A-Za-z]*Exception/.test(lines[i])) {
      let context = '';
      for (let j = i - 1; j >= 0 && j >= i - 3; j--) {
        if (/line \d+/.test(lines[j])) { context = lines[j].trim() + ' — '; break; }
      }
      return context + lines[i];
    }
  }
  return lines.slice(-3).join(' | ');
}
