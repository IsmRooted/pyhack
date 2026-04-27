// PyHack — APIs simuladas expuestas a Python.
// Cero red real. Todo determinista a partir de game.level.targets.

function simScanPort(host, port) {
  const target = (game.level && game.level.targets && game.level.targets[host]);
  // Host inexistente → respuesta "filtered" (no route / firewall)
  if (!target || !target.ports) {
    if (typeof netmapMarkUnknownHost === 'function') {
      netmapMarkUnknownHost(host, port);
    }
    return "filtered";
  }
  const p = target.ports[port];
  const status  = p ? (p.status  || "open") : "closed";
  const service = p ? (p.service || "")     : "";
  if (typeof netmapMarkPort === 'function') {
    netmapMarkPort(host, port, status, service);
  }
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

function simFetchUrl(url, method, data) {
  const endpoints = (game.level && game.level.endpoints) || {};
  const ep = endpoints[url];
  if (!ep) return { status: 404, body: "Not Found", headers: {} };
  const fn = ep[method || "GET"];
  if (typeof fn === 'function') return fn(data);
  if (fn) return fn;
  return { status: 405, body: "Method Not Allowed", headers: {} };
}

window.simScanPort     = simScanPort;
window.simFetchBanner  = simFetchBanner;
window.simDnsLookup    = simDnsLookup;
window.simFetchUrl     = simFetchUrl;

window.simSay = function (text) {
  if (!text) return;
  if (typeof game !== 'undefined') {
    game.lastRunOutput = game.lastRunOutput || [];
    game.lastRunOutput.push(String(text));
  }
};
