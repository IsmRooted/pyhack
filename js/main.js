// PyHack — main: pantallas, persistencia, run loop, vidas, teoría, solución.

let cm = null;
let currentLevel = 0;

const STORAGE = {
  // Estado de la RONDA actual (se borra con "Nueva ronda")
  lastLevel: 'pyhack_level',
  maxLevel: 'pyhack_max_level',
  code: id => `pyhack_code_${id}`,
  session: 'pyhack_session',
  // Permanentes (cross-ronda)
  medals: 'pyhack_medals',
  adventures: 'pyhack_completions',
  theoryEnabled: 'pyhack_theory_enabled',
  livesEnabled: 'pyhack_lives_enabled',
};

window.addEventListener('DOMContentLoaded', async () => {
  cm = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'python', theme: 'dracula', lineNumbers: true,
    indentUnit: 4, tabSize: 4, indentWithTabs: false,
    extraKeys: { 'Tab': cm => cm.replaceSelection('    ', 'end') },
  });

  initGame();
  game.onWin = onLevelWin;

  loadMedalsFromStorage();
  loadSession();
  loadSplitterSizes();
  initSplitters();
  updateTheoryButton();
  updateLivesButton();

  buildTutorialUI();
  document.getElementById('howto-content').innerHTML = HOWTO_CONTENT;
  document.getElementById('story-content').innerHTML = STORY_CONTENT;
  buildLevelSelectUI();
  buildDiaryUI();
  updateMenuProgress();
  updateMenuMedals();

  // Botones del menú
  document.getElementById('btn-play').addEventListener('click', onMenuPlay);
  document.getElementById('btn-tutorial').addEventListener('click', () => setScreen('screen-tutorial'));
  document.getElementById('btn-howto').addEventListener('click', () => setScreen('screen-howto'));
  document.getElementById('btn-levelselect').addEventListener('click', () => {
    buildLevelSelectUI();
    setScreen('screen-levelselect');
  });
  document.getElementById('btn-diary').addEventListener('click', () => {
    buildDiaryUI();
    setScreen('screen-diary');
  });
  document.getElementById('btn-story').addEventListener('click', () => setScreen('screen-story'));
  document.getElementById('btn-new-adventure').addEventListener('click', startNewAdventure);

  document.querySelectorAll('[data-back]').forEach(b => {
    b.addEventListener('click', () => setScreen('screen-menu'));
  });

  // Juego
  document.getElementById('game-menu-btn').addEventListener('click', () => {
    setScreen('screen-menu');
    updateMenuProgress();
    updateMenuMedals();
  });
  document.getElementById('run-btn').addEventListener('click', onRun);
  document.getElementById('reset-btn').addEventListener('click', onReset);
  document.getElementById('potion-btn').addEventListener('click', onUsePotion);
  document.getElementById('theory-toggle-btn').addEventListener('click', toggleTheoryPref);
  document.getElementById('theory-disable-checkbox').addEventListener('change', (ev) => {
    setTheoryEnabled(!ev.target.checked);
  });
  document.getElementById('lives-toggle-btn').addEventListener('click', toggleLivesPref);

  document.getElementById('prev-level').addEventListener('click', () => {
    if (currentLevel > 0) loadLevelByIndex(currentLevel - 1, false);
  });
  document.getElementById('next-level').addEventListener('click', () => {
    if (currentLevel >= LEVELS.length - 1) return;
    const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
    const targetIdx = currentLevel + 1;
    if (targetIdx > max) {
      log('Esa operación está bloqueada. Completa la actual primero.', 'err');
      return;
    }
    loadLevelByIndex(targetIdx, false);
  });

  document.getElementById('hint-toggle').addEventListener('click', () => openHintOverlay('code'));
  document.getElementById('theory-hint-btn').addEventListener('click', () => openHintOverlay('theory'));
  document.getElementById('hint-overlay-close').addEventListener('click', () => {
    document.getElementById('overlay-hint').classList.add('hidden');
  });
  document.getElementById('solution-toggle').addEventListener('click', () => {
    const btn = document.getElementById('solution-toggle');
    btn.classList.toggle('expanded');
    btn.querySelector('span:last-child').textContent =
      btn.classList.contains('expanded') ? 'Ocultar solución' : 'Ver solución de referencia';
  });

  // Atajos
  document.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey && ev.key === 'Enter') {
      ev.preventDefault();
      if (document.getElementById('screen-game').classList.contains('active')) onRun();
      return;
    }
    if (ev.key === 'Escape') { hideAllOverlays(); return; }
    if (ev.key === 'Enter' && !ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
      const overlays = [
        { id: 'overlay-hint',        primary: 'hint-overlay-close' },
        { id: 'overlay-complete',    primary: 'complete-next' },
        { id: 'overlay-intro',       primary: 'intro-start' },
        { id: 'overlay-exam-intro',  primary: 'exam-start' },
        { id: 'overlay-gameover',    primary: 'gameover-continue' },
        { id: 'overlay-victory',     primary: 'victory-restart' },
      ];
      for (const o of overlays) {
        const el = document.getElementById(o.id);
        if (el && !el.classList.contains('hidden')) {
          if (ev.target && ev.target.id === 'theory-disable-checkbox') return;
          ev.preventDefault();
          document.getElementById(o.primary).click();
          return;
        }
      }
    }
  });

  // Overlays
  document.getElementById('intro-start').addEventListener('click', () => {
    document.getElementById('overlay-intro').classList.add('hidden');
    setStatus('Listo. Ctrl+Enter o ▶ para ejecutar.');
    refreshEditor();
  });
  document.getElementById('exam-start').addEventListener('click', () => {
    document.getElementById('overlay-exam-intro').classList.add('hidden');
    setStatus('Evaluación en curso. Sin pista.');
    refreshEditor();
  });
  document.getElementById('complete-replay').addEventListener('click', () => {
    document.getElementById('overlay-complete').classList.add('hidden');
    onReset();
  });
  document.getElementById('complete-menu').addEventListener('click', () => {
    document.getElementById('overlay-complete').classList.add('hidden');
    setScreen('screen-menu');
    updateMenuProgress();
    updateMenuMedals();
  });
  document.getElementById('complete-next').addEventListener('click', () => {
    document.getElementById('overlay-complete').classList.add('hidden');
    if (currentLevel < LEVELS.length - 1) {
      loadLevelByIndex(currentLevel + 1, true);
    } else {
      document.getElementById('overlay-victory').classList.remove('hidden');
    }
  });
  document.getElementById('victory-menu').addEventListener('click', () => {
    document.getElementById('overlay-victory').classList.add('hidden');
    setScreen('screen-menu');
    updateMenuProgress();
    updateMenuMedals();
  });
  document.getElementById('victory-restart').addEventListener('click', () => {
    document.getElementById('overlay-victory').classList.add('hidden');
    setScreen('screen-menu');
    startNewAdventure(true);
  });
  document.getElementById('gameover-continue').addEventListener('click', () => {
    document.getElementById('overlay-gameover').classList.add('hidden');
    const cpId = game.session.checkpointLevelId || 1;
    game.session.lives = game.session.maxLives;
    saveSession();
    const cpIdx = LEVELS.findIndex(l => l.id === cpId);
    loadLevelByIndex(Math.max(0, cpIdx), false);
    log(`Vuelves al checkpoint (operación ${cpId}). Cover restaurado a ${game.session.maxLives}.`, 'info');
  });

  // Pyodide
  setMenuStatus('Cargando entorno Python (Pyodide)... 5-15s la primera vez.');
  try {
    await initPyodide();
    setMenuStatus('✓ Entorno listo.');
    document.getElementById('run-btn').disabled = false;
    setStatus('Listo. Ctrl+Enter o ▶ para ejecutar.');
  } catch (err) {
    setMenuStatus('Error cargando Pyodide: ' + (err.message || err));
  }
});

// === Pantallas ===
function setScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'screen-game') refreshEditor();
}
function refreshEditor() {
  if (!cm) return;
  setTimeout(() => cm.refresh(), 60);
}
function hideAllOverlays() {
  document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
}

// === Sesión / persistencia ===
function loadMedalsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE.medals);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) game.session.medals = parsed;
  } catch (e) {}
}
function saveMedalsToStorage() {
  localStorage.setItem(STORAGE.medals, JSON.stringify(game.session.medals));
}
function saveSession() {
  if (!game.session) return;
  try {
    localStorage.setItem(STORAGE.session, JSON.stringify({
      lives: game.session.lives, maxLives: game.session.maxLives,
      potions: game.session.potions, checkpointLevelId: game.session.checkpointLevelId,
    }));
  } catch (e) {}
}
function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE.session);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (typeof s.lives === 'number') game.session.lives = s.lives;
    if (typeof s.maxLives === 'number') game.session.maxLives = s.maxLives;
    if (typeof s.potions === 'number') game.session.potions = s.potions;
    if (typeof s.checkpointLevelId === 'number') game.session.checkpointLevelId = s.checkpointLevelId;
  } catch (e) {}
}
function getAdventuresCount() {
  return parseInt(localStorage.getItem(STORAGE.adventures) || '0', 10) || 0;
}
function incrementAdventures() {
  localStorage.setItem(STORAGE.adventures, String(getAdventuresCount() + 1));
}
function startNewAdventure(skipConfirm = false) {
  if (!skipConfirm) {
    const msg = '¿Empezar una NUEVA RONDA desde la operación 1?\n\n' +
      '• Se RESETEAN: cover, operación desbloqueada y código guardado.\n' +
      '• Se CONSERVAN: insignias y rondas completadas.';
    if (!confirm(msg)) return;
  }
  localStorage.removeItem(STORAGE.lastLevel);
  localStorage.removeItem(STORAGE.maxLevel);
  localStorage.removeItem(STORAGE.session);
  for (const lvl of LEVELS) localStorage.removeItem(STORAGE.code(lvl.id));
  const savedMedals = (game.session && game.session.medals) ? [...game.session.medals] : [];
  initSession();
  game.session.medals = savedMedals;
  buildLevelSelectUI();
  buildDiaryUI();
  updateMenuProgress();
  updateMenuMedals();
  setMenuStatus('Nueva ronda iniciada.');
}

// === Toggles ===
function isTheoryEnabled() {
  const raw = localStorage.getItem(STORAGE.theoryEnabled);
  return raw === null ? true : raw === '1';
}
function setTheoryEnabled(on) {
  localStorage.setItem(STORAGE.theoryEnabled, on ? '1' : '0');
  updateTheoryButton();
}
function toggleTheoryPref() {
  setTheoryEnabled(!isTheoryEnabled());
  log(`Teoría tras operación: ${isTheoryEnabled() ? 'ACTIVADA' : 'desactivada'}.`, 'info');
}
function updateTheoryButton() {
  const btn = document.getElementById('theory-toggle-btn');
  const state = document.getElementById('theory-state');
  if (!btn || !state) return;
  const on = isTheoryEnabled();
  btn.classList.toggle('off', !on);
  state.textContent = on ? 'ON' : 'OFF';
}
function isLivesEnabled() {
  const raw = localStorage.getItem(STORAGE.livesEnabled);
  return raw === null ? true : raw === '1';
}
function setLivesEnabled(on) {
  localStorage.setItem(STORAGE.livesEnabled, on ? '1' : '0');
  if (on && game.session) {
    if (game.session.lives <= 0) game.session.lives = game.session.maxLives;
    saveSession();
  }
  updateLivesButton();
  updateLivesUI();
}
function toggleLivesPref() {
  setLivesEnabled(!isLivesEnabled());
  log(`Cover meter: ${isLivesEnabled() ? 'ACTIVADO' : 'desactivado'}.`, 'info');
}
function updateLivesButton() {
  const btn = document.getElementById('lives-toggle-btn');
  const state = document.getElementById('lives-state');
  if (!btn || !state) return;
  const on = isLivesEnabled();
  btn.classList.toggle('off', !on);
  state.textContent = on ? 'ON' : 'OFF';
}

// === Menú principal ===
function onMenuPlay() {
  const savedIdx = parseInt(localStorage.getItem(STORAGE.lastLevel) || '0', 10);
  loadLevelByIndex(Math.max(0, Math.min(savedIdx, LEVELS.length - 1)), true);
}
function updateMenuProgress() {
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  document.getElementById('menu-progress-text').textContent = `${max} / ${LEVELS.length}`;
  const last = parseInt(localStorage.getItem(STORAGE.lastLevel) || '0', 10);
  document.getElementById('play-label').textContent =
    (max > 0 || last > 0) ? `Continuar (Op ${last + 1})` : 'Empezar entrenamiento';
  const adv = getAdventuresCount();
  const advEl = document.getElementById('menu-adventures');
  if (advEl) advEl.textContent = adv > 0 ? `· Rondas: ${adv}` : '';
}
function updateMenuMedals() {
  const root = document.getElementById('menu-medals');
  if (!root) return;
  const exams = LEVELS.filter(l => l.is_exam).map(l => l.id);
  let html = '';
  exams.forEach(id => {
    const earned = game.session.medals.includes(id);
    html += `<span class="${earned ? 'medal-earned' : 'medal-locked'}" title="Op ${id}">${earned ? '🏅' : '🔒'}</span>`;
  });
  root.innerHTML = html;
}
function setMenuStatus(msg) {
  document.getElementById('menu-status-msg').textContent = msg;
}

// === Tutorial ===
function buildTutorialUI() {
  const toc = document.getElementById('tutorial-toc');
  const content = document.getElementById('tutorial-content');
  toc.innerHTML = '';
  TUTORIAL_SECTIONS.forEach(section => {
    const heading = document.createElement('div');
    heading.className = 'toc-section';
    heading.textContent = section.section;
    toc.appendChild(heading);
    section.items.forEach((topic, i) => {
      const btn = document.createElement('button');
      btn.className = 'toc-item';
      btn.textContent = topic.title;
      btn.addEventListener('click', () => {
        toc.querySelectorAll('.toc-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        content.innerHTML = topic.body;
        content.scrollTop = 0;
      });
      toc.appendChild(btn);
    });
  });
  // Activar primero
  const first = toc.querySelector('.toc-item');
  if (first) {
    first.classList.add('active');
    content.innerHTML = TUTORIAL[0].body;
  }
}

// === Selector de operaciones ===
function buildLevelSelectUI() {
  const grid = document.getElementById('levelselect-grid');
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  grid.innerHTML = '';
  CHAPTERS.forEach(ch => {
    const chapterLevels = LEVELS.filter(l => l.chapter === ch.id);
    if (chapterLevels.length === 0) return;
    const completedInCh = chapterLevels.filter(l => l.id <= max).length;
    const section = document.createElement('div');
    section.className = 'chapter-section';
    section.innerHTML = `
      <div class="chapter-header">
        <div class="chapter-num">CAPÍTULO ${ch.id}</div>
        <div class="chapter-title">${escapeHtml(ch.title)}</div>
        <div class="chapter-sub">${escapeHtml(ch.subtitle)}</div>
        <div class="chapter-progress">${completedInCh} / ${chapterLevels.length}</div>
      </div>
      <div class="chapter-cards"></div>
    `;
    const cards = section.querySelector('.chapter-cards');
    chapterLevels.forEach(lvl => {
      const idx = LEVELS.indexOf(lvl);
      const completed = lvl.id <= max;
      // En PyHack, los stubs aparecen pero no se pueden cargar
      const isStub = !!lvl.stub;
      const locked = isStub || (idx > 0 && idx > max);
      const isExam = lvl.is_exam;
      const card = document.createElement('div');
      card.className = 'level-card'
        + (locked ? ' locked' : '')
        + (completed ? ' completed' : '')
        + (isExam ? ' exam' : '')
        + (isStub ? ' stub' : '');
      card.innerHTML = `
        ${completed ? '<span class="check">✓</span>' : ''}
        <div class="num">${isExam ? '⚠ EVAL ' : 'OP-'}${String(lvl.id).padStart(2, '0')}</div>
        <div class="title">${escapeHtml(lvl.title)}</div>
        <div class="loc">${escapeHtml(lvl.location)}</div>
        <span class="concept">${escapeHtml(lvl.concept)}</span>
      `;
      if (!locked) {
        card.addEventListener('click', () => loadLevelByIndex(idx, true));
      }
      cards.appendChild(card);
    });
    grid.appendChild(section);
  });
}

// === Diario ===
function buildDiaryUI() {
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  const root = document.getElementById('diary-content');
  if (max === 0) {
    root.innerHTML = `
      <p style="text-align:center; color: var(--text-muted); margin-top: 60px; font-style: italic;">
        Bitácora vacía. Completa tu primera operación para empezar a llenarla.
      </p>`;
    return;
  }
  let html = `<p style="font-style:italic; color:var(--text-muted); margin-bottom:20px;">
    Notas privadas del operativo. Solo aparecen las entradas de las operaciones completadas.
  </p>`;
  CHAPTERS.forEach(ch => {
    const entries = LEVELS.filter(l => l.chapter === ch.id && l.id <= max && l.diary);
    if (entries.length === 0) return;
    html += `<h3>Capítulo ${ch.id} — ${escapeHtml(ch.title)}</h3>`;
    entries.forEach(lvl => {
      html += `<div class="diary-entry">
        <div class="diary-meta">OP-${String(lvl.id).padStart(2, '0')} · ${escapeHtml(lvl.location)}</div>
        <div class="diary-text">${escapeHtml(lvl.diary)}</div>
      </div>`;
    });
  });
  root.innerHTML = html;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// === Cargar nivel ===
function loadLevelByIndex(idx, showIntro = false) {
  currentLevel = idx;
  const lvl = LEVELS[idx];

  if (lvl.stub) {
    alert('Esta operación todavía no está implementada — próximamente.');
    return;
  }

  // Checkpoint
  const cpsBefore = LEVELS.filter(l => l.is_checkpoint && l.id <= lvl.id);
  if (cpsBefore.length > 0) setCheckpoint(cpsBefore[cpsBefore.length - 1].id);

  // Subir max si toca
  const expectedMax = computeMaxLivesFor(lvl.id);
  if (game.session.maxLives < expectedMax) {
    game.session.maxLives = expectedMax;
    saveSession();
  }

  document.getElementById('level-num').textContent = String(lvl.id).padStart(2, '0');
  document.getElementById('level-title').textContent = lvl.title;
  document.getElementById('level-location').textContent = '— ' + lvl.location;
  document.getElementById('mission-text').textContent = lvl.mission || '';

  const t = (typeof THEORIES !== 'undefined') ? THEORIES[lvl.id] : null;
  const hintToggle = document.getElementById('hint-toggle');
  const theoryHintBtn = document.getElementById('theory-hint-btn');

  if (lvl.is_exam) {
    hintToggle.textContent = '🔒 bloqueada';
    hintToggle.disabled = true;
    theoryHintBtn.textContent = '🔒 bloqueada';
    theoryHintBtn.disabled = true;
  } else {
    hintToggle.textContent = '💡 código';
    hintToggle.disabled = !lvl.hint;
    theoryHintBtn.textContent = '📖 teoría';
    theoryHintBtn.disabled = !t;
  }

  const restPanel = document.getElementById('restrictions-panel');
  const restList = document.getElementById('restrictions-list');
  if (lvl.is_exam && lvl.restrictions && lvl.restrictions.length) {
    restPanel.classList.remove('hidden');
    restList.innerHTML = lvl.restrictions.map(r => `<li>${escapeHtml(r.message)}</li>`).join('');
  } else {
    restPanel.classList.add('hidden');
    restList.innerHTML = '';
  }

  document.getElementById('concept-pill').textContent = lvl.concept || '';

  const savedCode = localStorage.getItem(STORAGE.code(lvl.id));
  cm.setValue(savedCode !== null ? savedCode : (lvl.starterCode || ''));

  loadLevel(lvl);
  clearConsole();
  log(`Operación ${String(lvl.id).padStart(2, '0')}: ${lvl.title}`, 'info');
  log(`Lugar: ${lvl.location}`, 'log');

  const maxCompleted = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  document.getElementById('prev-level').disabled = (idx === 0);
  document.getElementById('next-level').disabled =
    (idx === LEVELS.length - 1) || (idx + 1 > maxCompleted);
  document.getElementById('next-level').title =
    (idx + 1 > maxCompleted)
      ? 'Bloqueada — completa esta operación primero'
      : 'Operación siguiente';

  localStorage.setItem(STORAGE.lastLevel, String(idx));

  setScreen('screen-game');
  updateLivesUI();

  if (showIntro) {
    if (lvl.is_exam) showExamIntro(lvl);
    else showLevelIntro(lvl);
  }
}

function openHintOverlay(kind) {
  const lvl = game.level;
  if (!lvl) return;
  if (lvl.is_exam) return;  // bloqueada en exámenes
  const overlay = document.getElementById('overlay-hint');
  const tag = document.getElementById('hint-overlay-tag');
  const title = document.getElementById('hint-overlay-title');
  const body = document.getElementById('hint-overlay-body');

  if (kind === 'theory') {
    const t = (typeof THEORIES !== 'undefined') ? THEORIES[lvl.id] : null;
    if (!t) return;
    tag.textContent = '📖 TEORÍA';
    tag.style.background = 'var(--cyan)';
    tag.style.color = '#04101c';
    title.textContent = t.title || lvl.concept || 'Teoría';
    body.innerHTML = t.body || '';
  } else {
    if (!lvl.hint) return;
    tag.textContent = '💡 PISTA DE CÓDIGO';
    tag.style.background = 'var(--amber)';
    tag.style.color = '#1f1308';
    title.textContent = 'Sugerencia de código';
    body.innerHTML = '<pre>' + escapeHtml(lvl.hint) + '</pre>';
  }
  overlay.classList.remove('hidden');
  setTimeout(() => document.getElementById('hint-overlay-close').focus(), 50);
}

function showLevelIntro(lvl) {
  document.getElementById('intro-location').textContent = lvl.location;
  document.getElementById('intro-title').textContent = `OP-${String(lvl.id).padStart(2, '0')} — ${lvl.title}`;
  document.getElementById('intro-story').textContent = lvl.intro || '';
  document.getElementById('intro-mission').textContent = (lvl.mission || '').split('\n')[0];
  document.getElementById('intro-concept').textContent = lvl.concept || '';
  document.getElementById('overlay-intro').classList.remove('hidden');
}
function showExamIntro(lvl) {
  document.getElementById('exam-title').textContent = `Evaluación — ${lvl.title}`;
  document.getElementById('exam-story').textContent = lvl.intro || '';
  const list = document.getElementById('exam-rules-list');
  list.innerHTML = '';
  const missionFirst = (lvl.mission || '').split('\n')[0];
  const liMission = document.createElement('li');
  liMission.innerHTML = `<strong>Objetivo:</strong> ${escapeHtml(missionFirst)}`;
  list.appendChild(liMission);
  if (lvl.restrictions) {
    lvl.restrictions.forEach(r => {
      const li = document.createElement('li');
      li.textContent = r.message;
      list.appendChild(li);
    });
  }
  document.getElementById('overlay-exam-intro').classList.remove('hidden');
}

// === UI vidas ===
function updateLivesUI() {
  const root = document.getElementById('lives-display');
  if (!root) return;
  const s = game.session;
  if (!isLivesEnabled()) {
    root.innerHTML = '<span class="lives-off">∞</span>';
    root.title = 'Cover meter desactivado';
    document.getElementById('potion-btn').disabled = true;
    document.getElementById('potion-count').textContent = String(s.potions);
    return;
  }
  let html = '';
  for (let i = 0; i < s.maxLives; i++) {
    if (i < s.lives) html += '<span class="heart-full">♥</span>';
    else html += '<span class="heart-empty">♡</span>';
  }
  root.innerHTML = html;
  root.title = `Cover: ${s.lives} / ${s.maxLives}`;
  document.getElementById('potion-count').textContent = String(s.potions);
  document.getElementById('potion-btn').disabled = (s.potions === 0 || s.lives >= s.maxLives);
}
function onUsePotion() {
  if (usePotion()) {
    log('VPN burner consumida. Cover restaurado +1.', 'ok');
    updateLivesUI();
  } else {
    log('No tienes VPN burner disponible o ya estás al máximo.', 'err');
  }
}
function showGameOver() {
  const cpId = game.session.checkpointLevelId || 1;
  document.getElementById('gameover-checkpoint').textContent =
    `Volverás a la operación ${String(cpId).padStart(2, '0')} con cover a tope.`;
  document.getElementById('overlay-gameover').classList.remove('hidden');
}

// === Run ===
async function onRun() {
  if (!pyodide) { log('Entorno aún cargando, espera un momento...', 'err'); return; }
  const lvl = game.level;
  const code = cm.getValue();
  localStorage.setItem(STORAGE.code(lvl.id), code);
  game.lastCode = code;

  clearConsole();
  log(`python3 op_${String(lvl.id).padStart(2, '0')}.py`, 'cmd');
  setRunEnabled(false);

  // Reset estado lógico (mapa de red etc)
  loadLevel(lvl);

  // Validar restricciones (solo exam)
  if (lvl.is_exam && lvl.restrictions) {
    const check = checkRestrictions(code, lvl.restrictions);
    if (!check.ok) {
      log(`✗ Restricción violada: ${check.message}`, 'err');
      if (isLivesEnabled()) log('Cover comprometido.', 'err');
      loseLife();
      updateLivesUI();
      checkLifeStatus();
      setRunEnabled(true);
      refreshEditor();
      return;
    }
  }

  const result = await runUserCode(code);
  if (!result.ok) {
    log(result.error, 'err');
    if (isLivesEnabled()) log('Error de Python: cover comprometido.', 'err');
    loseLife();
    updateLivesUI();
    checkLifeStatus();
    setRunEnabled(true);
    refreshEditor();
    return;
  }

  checkWinCondition();
  setRunEnabled(true);
  refreshEditor();
}
function checkLifeStatus() {
  if (!isLivesEnabled()) return;
  if (game.session.lives <= 0) setTimeout(() => showGameOver(), 600);
}
function onReset() {
  const lvl = LEVELS[currentLevel];
  if (!confirm('¿Volver al template inicial? Se perderá el código actual.')) return;
  cm.setValue(lvl.starterCode || '');
  localStorage.removeItem(STORAGE.code(lvl.id));
  loadLevel(lvl);
  clearConsole();
  log('Código y operación reseteados.', 'info');
  refreshEditor();
}

function onLevelWin(lvl) {
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  if (lvl.id > max) localStorage.setItem(STORAGE.maxLevel, String(lvl.id));
  if (lvl.gives_potion) {
    addPotion();
    log('🛡 Has obtenido una VPN burner. Aparece en tu kit del header.', 'ok');
  }
  if (lvl.is_exam) {
    awardMedal(lvl.id);
    saveMedalsToStorage();
    fullHealAndUpgrade();
    log(`🏅 Insignia obtenida. Cover restaurado. Máximo ahora: ${game.session.maxLives}`, 'ok');
  }
  if (lvl.is_final) {
    incrementAdventures();
    log(`🏆 Ronda completada. Total: ${getAdventuresCount()}.`, 'ok');
  }
  updateLivesUI();
  updateMenuMedals();

  setTimeout(() => {
    document.getElementById('complete-title').textContent =
      lvl.is_final ? '🏆 Caldera neutralizada' : '✓ Operación completada';
    document.getElementById('complete-concept').textContent = lvl.concept || '';
    document.getElementById('complete-next').textContent =
      lvl.is_final ? 'Ver final ▶' : 'Siguiente operación ▶';
    populateTheoryBlock(lvl);
    populateSolutionBlock(lvl);
    document.getElementById('overlay-complete').classList.remove('hidden');
    const nextBtn = document.getElementById('complete-next');
    if (nextBtn) {
      if (cm) cm.getInputField().blur();
      setTimeout(() => nextBtn.focus(), 50);
    }
  }, 350);
}

function populateTheoryBlock(lvl) {
  const block = document.getElementById('complete-theory');
  const titleEl = document.getElementById('theory-title');
  const bodyEl = document.getElementById('theory-body');
  const checkbox = document.getElementById('theory-disable-checkbox');
  const t = (typeof THEORIES !== 'undefined') ? THEORIES[lvl.id] : null;
  const enabled = isTheoryEnabled();
  if (!t || !enabled) { block.classList.add('hidden'); return; }
  block.classList.remove('hidden');
  titleEl.textContent = t.title || lvl.concept || '';
  bodyEl.innerHTML = t.body || '';
  checkbox.checked = false;
}

function populateSolutionBlock(lvl) {
  const block = document.getElementById('complete-solution');
  const codeEl = document.getElementById('solution-code');
  const toggle = document.getElementById('solution-toggle');
  const code = lvl.solution || lvl.hint || '';
  if (!code || /Evaluación sin pista|EXAMEN FINAL/.test(code)) {
    block.classList.add('hidden');
    return;
  }
  block.classList.remove('hidden');
  codeEl.innerHTML = highlightPython(code);
  toggle.classList.remove('expanded');
  toggle.querySelector('span:last-child').textContent = 'Ver solución de referencia';
}

function highlightPython(code) {
  const KW = ['def','return','if','elif','else','for','while','in','not','and','or','is','None','True','False','break','continue','pass','import','from','as','lambda'];
  const FN = ['print','range','len','str','int','float','list','dict','enumerate','scan_port','fetch_banner','dns_lookup','fetch_url'];
  let html = code.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  html = html.replace(/(#[^\n]*)/g, '<span class="com">$1</span>');
  html = html.replace(/(f?"[^"\n]*"|f?'[^'\n]*')/g, '<span class="str">$1</span>');
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="num">$1</span>');
  const fnRe = new RegExp('\\b(' + FN.join('|') + ')(?=\\s*\\()', 'g');
  html = html.replace(fnRe, '<span class="fn">$1</span>');
  const kwRe = new RegExp('\\b(' + KW.join('|') + ')\\b', 'g');
  html = html.replace(kwRe, '<span class="kw">$1</span>');
  return html;
}

function setRunEnabled(on) {
  document.getElementById('run-btn').disabled = !on;
}
function setStatus(msg) {
  document.getElementById('status-msg').textContent = msg;
}

// === Splitters arrastrables (4 paneles redimensionables) ===
const SPLITTER_KEY = 'pyhack_splitters';

function initSplitters() {
  setupSplit('splitter-lr',      'x', '--left-w',    320, 800);
  setupSplit('splitter-mission', 'y', '--mission-h', 80,  600);
  setupSplit('splitter-netmap',  'y', '--netmap-h',  100, 700);
}

function setupSplit(id, axis, varName, min, max) {
  const el = document.getElementById(id);
  if (!el) return;
  let dragging = false;
  let startCoord = 0;
  let startSize = 0;

  function readVar() {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return parseInt(v, 10) || 0;
  }
  function onMove(e) {
    if (!dragging) return;
    const cur = axis === 'x' ? e.clientX : e.clientY;
    let next = startSize + (cur - startCoord);
    next = Math.max(min, Math.min(max, next));
    document.documentElement.style.setProperty(varName, next + 'px');
    if (typeof cm !== 'undefined' && cm) cm.refresh();
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    if (typeof cm !== 'undefined' && cm) cm.refresh();
    saveSplitterSizes();
  }
  el.addEventListener('mousedown', e => {
    dragging = true;
    startCoord = axis === 'x' ? e.clientX : e.clientY;
    startSize = readVar();
    el.classList.add('dragging');
    document.body.style.cursor = axis === 'x' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    e.preventDefault();
  });
  // Doble click → resetear al default (recogido del CSS al cargar la página)
  el.addEventListener('dblclick', () => {
    document.documentElement.style.removeProperty(varName);
    if (typeof cm !== 'undefined' && cm) cm.refresh();
    saveSplitterSizes();
  });
}

function saveSplitterSizes() {
  try {
    const root = document.documentElement;
    const sizes = {};
    ['--left-w', '--mission-h', '--netmap-h'].forEach(v => {
      const inline = root.style.getPropertyValue(v).trim();
      if (inline) sizes[v] = inline;  // solo guardamos si el usuario lo ha tocado
    });
    localStorage.setItem(SPLITTER_KEY, JSON.stringify(sizes));
  } catch (e) {}
}

function loadSplitterSizes() {
  try {
    const raw = localStorage.getItem(SPLITTER_KEY);
    if (!raw) return;
    const sizes = JSON.parse(raw);
    const root = document.documentElement;
    Object.entries(sizes).forEach(([k, v]) => root.style.setProperty(k, v));
  } catch (e) {}
}
