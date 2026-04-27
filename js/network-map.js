// PyHack — render del mapa de red.
// Estado: hosts descubiertos y servicios + status (unknown / open / closed / filtered).
// Los hosts del nivel se cargan al inicio sin servicios visibles — solo aparecen
// los que el jugador escanee. Si escanea un host fuera del nivel, se añade igual
// pero marcado como "no autorizado" (didáctico: fuera de scope).

const netmap = {
  hosts: {},
};

function netmapReset(targets) {
  netmap.hosts = {};
  if (targets) {
    for (const [host, info] of Object.entries(targets)) {
      netmap.hosts[host] = { name: host, services: {}, info, inScope: true };
    }
  }
  renderNetmap();
}

function netmapMarkPort(host, port, status, service) {
  if (!netmap.hosts[host]) {
    netmap.hosts[host] = { name: host, services: {}, info: {}, inScope: true };
  }
  netmap.hosts[host].services[port] = {
    status: status || 'open',
    name: service || (netmap.hosts[host].services[port] && netmap.hosts[host].services[port].name) || '',
  };
  renderNetmap();
}

function netmapMarkUnknownHost(host, port) {
  if (!netmap.hosts[host]) {
    netmap.hosts[host] = { name: host, services: {}, info: { note: 'fuera de scope · sin respuesta' }, inScope: false };
  }
  netmap.hosts[host].services[port] = { status: 'filtered', name: '' };
  renderNetmap();
}

function renderNetmap() {
  const root = document.getElementById('netmap');
  const status = document.getElementById('netmap-status');
  if (!root) return;
  const hostKeys = Object.keys(netmap.hosts);
  if (hostKeys.length === 0) {
    root.innerHTML = '<div class="netmap-empty">No hay objetivos en esta operación.</div>';
    if (status) status.textContent = '— sin objetivos —';
    return;
  }
  if (status) {
    const totalScanned = hostKeys.reduce((acc, h) => acc + Object.keys(netmap.hosts[h].services).length, 0);
    const opens = hostKeys.reduce((acc, h) => acc + Object.values(netmap.hosts[h].services).filter(s => s.status === 'open').length, 0);
    status.textContent = `${hostKeys.length} host(s) · ${totalScanned} servicios escaneados · ${opens} abiertos`;
  }
  let html = '';
  for (const host of hostKeys) {
    const h = netmap.hosts[host];
    const meta = h.info && h.info.note ? `<div class="netmap-host-meta">${escapeNm(h.info.note)}</div>` : '';
    html += `<div class="netmap-host${h.inScope === false ? ' out-of-scope' : ''}">`;
    html += `<div class="netmap-host-name">${escapeNm(h.name)}</div>`;
    html += meta;
    const ports = Object.keys(h.services).sort((a, b) => parseInt(a) - parseInt(b));
    if (ports.length) {
      html += `<ul class="netmap-services">`;
      for (const p of ports) {
        const s = h.services[p];
        const cls = s.status || 'unknown';
        const label = cls === 'unknown' ? '?' : cls;
        html += `<li class="netmap-service">`;
        html += `<span class="netmap-service-port">:${p}</span>`;
        html += `<span class="netmap-service-name">${escapeNm(s.name || '')}</span>`;
        html += `<span class="netmap-service-status ${cls}">${label}</span>`;
        html += `</li>`;
      }
      html += `</ul>`;
    } else {
      html += `<div class="netmap-host-empty">— sin servicios escaneados —</div>`;
    }
    html += `</div>`;
  }
  root.innerHTML = html;
}

function escapeNm(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

window.netmapMarkPort = netmapMarkPort;
window.netmapMarkUnknownHost = netmapMarkUnknownHost;
window.netmapReset = netmapReset;
