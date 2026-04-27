// PyHack — motor de juego (sin grid).
// Estado de operación, vidas, restricciones, win check.

const game = {
  level: null,
  lastRunOutput: [],
  lastRunHadError: false,
  lastCode: '',
  onWin: null,

  // Sesión (vidas, items)
  session: null,
};

function initSession() {
  game.session = {
    lives: 3,
    maxLives: 3,
    potions: 0,
    checkpointLevelId: 1,
    medals: [],
  };
}

function computeMaxLivesFor(levelId) {
  // Cada 5 niveles +1 al máximo (3+0=3, 3+1=4, 3+2=5, ...)
  return 3 + Math.floor(levelId / 5);
}

function loseLife() {
  if (!game.session) return;
  if (typeof isLivesEnabled === 'function' && !isLivesEnabled()) return;
  game.session.lives = Math.max(0, game.session.lives - 1);
  if (typeof saveSession === 'function') saveSession();
}

function fullHealAndUpgrade() {
  if (!game.session) return;
  game.session.maxLives += 1;
  game.session.lives = game.session.maxLives;
  if (typeof saveSession === 'function') saveSession();
}

function addPotion() {
  if (!game.session) return;
  game.session.potions += 1;
  if (typeof saveSession === 'function') saveSession();
}

function usePotion() {
  if (!game.session) return false;
  if (game.session.potions <= 0) return false;
  if (game.session.lives >= game.session.maxLives) return false;
  game.session.potions -= 1;
  game.session.lives = Math.min(game.session.maxLives, game.session.lives + 1);
  if (typeof saveSession === 'function') saveSession();
  return true;
}

function setCheckpoint(levelId) {
  if (!game.session) return;
  game.session.checkpointLevelId = levelId;
  if (typeof saveSession === 'function') saveSession();
}

function awardMedal(levelId) {
  if (!game.session) return;
  if (!game.session.medals.includes(levelId)) game.session.medals.push(levelId);
}

function initGame() {
  initSession();
}

function loadLevel(lvl) {
  game.level = lvl;
  game.lastRunOutput = [];
  game.lastRunHadError = false;
  // Reset mapa de red con los targets del nivel
  if (typeof netmapReset === 'function') {
    netmapReset(lvl.targets || null);
  }
}

// === Validación de restricciones (exámenes) y requirements (todos) ===

function stripCommentsAndBlanks(code) {
  return code.split('\n').filter(line => {
    const stripped = line.trim();
    if (!stripped) return false;
    if (stripped.startsWith('#')) return false;
    return true;
  });
}

function stripCodeComments(code) {
  return code.split('\n').map(line => {
    let inSingle = false, inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      const prev = i > 0 ? line[i - 1] : '';
      if (c === "'" && !inDouble && prev !== '\\') inSingle = !inSingle;
      else if (c === '"' && !inSingle && prev !== '\\') inDouble = !inDouble;
      else if (c === '#' && !inSingle && !inDouble) return line.slice(0, i);
    }
    return line;
  }).join('\n');
}

function checkRestrictions(code, restrictions) {
  if (!restrictions || restrictions.length === 0) return { ok: true };
  for (const r of restrictions) {
    if (r.type === 'maxLines') {
      const count = stripCommentsAndBlanks(code).length;
      if (count > r.value) {
        return { ok: false, message: `${r.message} (tienes ${count}).` };
      }
    } else if (r.type === 'mustContain') {
      if (!r.regex.test(code)) return { ok: false, message: r.message };
    } else if (r.type === 'mustNotContain') {
      if (r.regex.test(code)) return { ok: false, message: r.message };
    } else if (r.type === 'maxOccurrences') {
      const matches = code.match(r.regex);
      const count = matches ? matches.length : 0;
      if (count > r.max) {
        return { ok: false, message: `${r.message} (tienes ${count}).` };
      }
    }
  }
  return { ok: true };
}

// === Win check ===

function checkWinCondition() {
  const lvl = game.level;
  const w = lvl.win || {};
  const fails = [];

  if (w.mustPrint && game.lastRunOutput.length === 0) {
    fails.push("debes producir output con print()");
  }
  if (w.mustPrintMin && game.lastRunOutput.length < w.mustPrintMin) {
    fails.push(`faltan prints (necesarias ${w.mustPrintMin}, tienes ${game.lastRunOutput.length})`);
  }

  // Custom check (si el nivel define uno como función)
  if (typeof w.customCheck === 'function') {
    const r = w.customCheck(game);
    if (r && r.ok === false) fails.push(r.message || 'fallo en check personalizado');
  }

  // Requirements de código
  if (lvl.requires && lvl.requires.length && game.lastCode) {
    const cleanCode = stripCodeComments(game.lastCode);
    for (const r of lvl.requires) {
      let pass = true;
      if (r.type === 'mustContain') pass = r.regex.test(cleanCode);
      else if (r.type === 'mustNotContain') pass = !r.regex.test(cleanCode);
      if (!pass) fails.push(r.message);
    }
  }

  if (fails.length === 0) {
    log("✓ Operación completada correctamente.", "ok");
    if (game.onWin) game.onWin(lvl);
  } else {
    log("Operación incompleta: " + fails.join(", ") + ".", "err");
  }
}

window.computeMaxLivesFor = computeMaxLivesFor;
