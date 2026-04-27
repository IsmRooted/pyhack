// PyHack — APIs simuladas expuestas a Python.
// Cero red real. Todo determinista a partir de game.level (targets, endpoints,
// bash_fs, bash, socket_handlers, etc.).

// ============================================================
// RECON: scan_port, fetch_banner, dns_lookup
// ============================================================

function simScanPort(host, port) {
  const target = (game.level && game.level.targets && game.level.targets[host]);
  if (!target || !target.ports) {
    if (typeof netmapMarkUnknownHost === 'function') netmapMarkUnknownHost(host, port);
    return "filtered";
  }
  const p = target.ports[port];
  const status  = p ? (p.status  || "open") : "closed";
  const service = p ? (p.service || "")     : "";
  if (typeof netmapMarkPort === 'function') netmapMarkPort(host, port, status, service);
  return status;
}

function simFetchBanner(host, port) {
  const target = (game.level && game.level.targets && game.level.targets[host]);
  if (!target || !target.ports) return "";
  const p = target.ports[port];
  if (!p || p.status !== "open") return "";
  return p.banner || "";
}

function simDnsLookup(domain) {
  const records = (game.level && game.level.dns) || {};
  return records[domain] || [];
}

// ============================================================
// HTTP: fetch_url con métodos, headers, cookies, sesiones
// ============================================================

// Una "sesión" persistente entre llamadas (cookies acumuladas)
const httpSession = { cookies: {} };

function resetHttpSession() { httpSession.cookies = {}; }

function _matchEndpoint(url, method) {
  const endpoints = (game.level && game.level.endpoints) || {};
  // Match exacto
  if (endpoints[url]) {
    const ep = endpoints[url];
    if (ep[method]) return ep[method];
  }
  // Match sin query string
  const base = url.split('?')[0];
  if (endpoints[base]) {
    const ep = endpoints[base];
    if (ep[method]) return ep[method];
  }
  // Match por patrón (claves con * al final)
  for (const key of Object.keys(endpoints)) {
    if (key.endsWith('*') && url.startsWith(key.slice(0, -1))) {
      const ep = endpoints[key];
      if (ep[method]) return ep[method];
    }
  }
  return null;
}

function simFetchUrl(url, method, data, headers) {
  method = (method || "GET").toUpperCase();
  data = data || null;
  headers = headers || {};
  // Pyodide envía objetos JS proxy — convertir a plain object
  const reqHeaders = (headers && headers.toJs) ? Object.fromEntries(headers.toJs()) : (headers || {});
  const reqData = (data && data.toJs) ? Object.fromEntries(data.toJs()) : data;

  const handler = _matchEndpoint(url, method);
  if (!handler) {
    return { status: 404, body: "Not Found", headers: {}, cookies: {} };
  }

  // Cookies enviadas por la sesión:
  const reqCookies = { ...httpSession.cookies };

  let response;
  if (typeof handler === 'function') {
    response = handler({ url, method, data: reqData, headers: reqHeaders, cookies: reqCookies }) || {};
  } else {
    response = { ...handler };
  }

  const finalResponse = {
    status:  response.status  || 200,
    body:    response.body    || "",
    headers: response.headers || {},
    cookies: response.cookies || {},
  };

  // Cookies del servidor → guarda en sesión
  if (finalResponse.cookies && typeof finalResponse.cookies === 'object') {
    Object.assign(httpSession.cookies, finalResponse.cookies);
  }

  return finalResponse;
}

// ============================================================
// SOCKET: send raw payload, recibe respuesta
// ============================================================

function simSocketRequest(host, port, payload) {
  const target = (game.level && game.level.targets && game.level.targets[host]);
  if (!target || !target.ports) return null;
  const p = target.ports[port];
  if (!p || p.status !== "open") return null;
  if (typeof p.socket_handler === 'function') {
    return p.socket_handler(String(payload || ""));
  }
  return p.socket_response || p.banner || "";
}

// ============================================================
// BASH: simulación de comandos básicos sobre filesystem virtual
// ============================================================

function _bashFs() { return (game.level && game.level.bash_fs) || {}; }
function _bashHandlers() { return (game.level && game.level.bash) || {}; }

function simBash(cmd) {
  cmd = String(cmd || "").trim();
  if (!cmd) return { stdout: "", stderr: "", returncode: 0 };

  // Handler explícito en el nivel para este comando exacto
  const handlers = _bashHandlers();
  if (handlers[cmd]) {
    const h = handlers[cmd];
    return {
      stdout: h.stdout || "",
      stderr: h.stderr || "",
      returncode: typeof h.returncode === 'number' ? h.returncode : 0,
    };
  }

  // Comandos built-in básicos contra el "filesystem" del nivel
  const fs = _bashFs();

  // ls [path]
  let m = cmd.match(/^ls(?:\s+(.+))?$/);
  if (m) {
    const path = (m[1] || ".").trim();
    const entries = fs[path];
    if (entries === undefined) return { stdout: "", stderr: `ls: ${path}: No such file or directory`, returncode: 1 };
    if (Array.isArray(entries)) return { stdout: entries.join("\n"), stderr: "", returncode: 0 };
    return { stdout: String(entries), stderr: "", returncode: 0 };
  }
  // cat <path>
  m = cmd.match(/^cat\s+(.+)$/);
  if (m) {
    const path = m[1].trim();
    const content = fs[path];
    if (content === undefined) return { stdout: "", stderr: `cat: ${path}: No such file or directory`, returncode: 1 };
    const text = Array.isArray(content) ? content.join("\n") : String(content);
    return { stdout: text, stderr: "", returncode: 0 };
  }
  // pwd
  if (cmd === "pwd") return { stdout: fs._pwd || "/home/operative", stderr: "", returncode: 0 };
  // whoami
  if (cmd === "whoami") return { stdout: fs._whoami || "operative", stderr: "", returncode: 0 };
  // id
  if (cmd === "id") return { stdout: fs._id || "uid=1000(operative) gid=1000(operative) groups=1000(operative)", stderr: "", returncode: 0 };
  // uname -a
  if (cmd === "uname -a" || cmd === "uname") {
    return { stdout: fs._uname || "Linux acme-host 5.15.0-generic #1 SMP x86_64 GNU/Linux", stderr: "", returncode: 0 };
  }
  // echo <txt>
  m = cmd.match(/^echo\s+(.*)$/);
  if (m) return { stdout: m[1].replace(/^["']|["']$/g, ""), stderr: "", returncode: 0 };
  // grep <patron> <archivo>
  m = cmd.match(/^grep\s+(\S+)\s+(\S+)$/);
  if (m) {
    const pat = m[1].replace(/^["']|["']$/g, "");
    const path = m[2];
    const content = fs[path];
    if (content === undefined) return { stdout: "", stderr: `grep: ${path}: No such file or directory`, returncode: 2 };
    const lines = Array.isArray(content) ? content : String(content).split("\n");
    const matched = lines.filter(l => l.includes(pat));
    return { stdout: matched.join("\n"), stderr: "", returncode: matched.length ? 0 : 1 };
  }
  // find <path> -name <pattern>
  m = cmd.match(/^find\s+(\S+)\s+-name\s+(\S+)$/);
  if (m) {
    const path = m[1];
    const pat = m[2].replace(/^["']|["']$/g, "").replace(/\*/g, ".*");
    const re = new RegExp("^" + pat + "$");
    const found = Object.keys(fs).filter(k => k.startsWith(path) && re.test(k.split("/").pop() || ""));
    return { stdout: found.join("\n"), stderr: "", returncode: 0 };
  }

  return { stdout: "", stderr: `bash: ${cmd.split(" ")[0]}: command not found`, returncode: 127 };
}

// ============================================================
// PCAP simulado (paquetes en JSON)
// ============================================================

function simParsePcap() {
  const packets = (game.level && game.level.pcap) || [];
  // Devolver copia para que Python pueda iterar sin afectar al estado
  return packets.map(p => ({ ...p }));
}

// ============================================================
// EXPONER A WINDOW (Pyodide accede vía js.simXxx)
// ============================================================

window.simScanPort     = simScanPort;
window.simFetchBanner  = simFetchBanner;
window.simDnsLookup    = simDnsLookup;
window.simFetchUrl     = simFetchUrl;
window.simSocketRequest = simSocketRequest;
window.simBash         = simBash;
window.simParsePcap    = simParsePcap;
window.resetHttpSession = resetHttpSession;

window.simSay = function (text) {
  if (!text) return;
  if (typeof game !== 'undefined') {
    game.lastRunOutput = game.lastRunOutput || [];
    game.lastRunOutput.push(String(text));
  }
};
