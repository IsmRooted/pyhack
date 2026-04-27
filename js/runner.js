// PyHack — Pyodide loader + APIs expuestas a Python.

let pyodide = null;

// Cabecera: helpers para que las APIs simuladas se vean limpias en Python.
const PY_PRELUDE = `
import js

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

def fetch_url(url, method="GET", data=None):
    """Devuelve un dict con status, body, headers."""
    r = js.simFetchUrl(str(url), str(method), data)
    try:
        return dict(r.to_py()) if hasattr(r, 'to_py') else dict(r)
    except Exception:
        return r
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

  const ns = pyodide.globals.get("dict")();
  ns.set("__builtins__", pyodide.globals.get("__builtins__"));
  // Exponer las funciones del prelude al namespace del usuario
  ['scan_port', 'fetch_banner', 'dns_lookup', 'fetch_url'].forEach(name => {
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
