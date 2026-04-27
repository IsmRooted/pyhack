// PyHack — render del terminal (panel derecho-abajo).
// Output del jugador y del runner aparece aquí en lugar de una "consola" plana.

function terminalLog(msg, type = 'log') {
  const out = document.getElementById('terminal-output');
  if (!out) return;
  const div = document.createElement('div');
  div.className = type;
  div.textContent = msg;
  out.appendChild(div);
  out.parentElement.scrollTop = out.parentElement.scrollHeight;
}

function terminalClear() {
  const out = document.getElementById('terminal-output');
  if (out) out.innerHTML = '';
}

// Compatibilidad: en el motor adaptado de Pythia, `log` se llama desde varios sitios.
// Lo redirigimos al terminal de PyHack.
function log(msg, type = 'log') { terminalLog(msg, type); }
function clearConsole() { terminalClear(); }

window.terminalLog = terminalLog;
window.terminalClear = terminalClear;
window.log = log;
window.clearConsole = clearConsole;
