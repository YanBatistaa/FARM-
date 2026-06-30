// ============================================================
// ZÊNITE — app.js  ·  "A jornada até o seu ápice."
// Single-file vanilla JS PWA · Local-first gamified productivity
// ============================================================

// ============================================================
// 1. ICONS — SVG inline map
// ============================================================
const ICONS = {
  grid:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  target:     '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  user:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/></svg>',
  cart:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  check:      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>',
  dumbbell:   '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 12h12M6 12a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V8a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3M6 12v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-6"/></svg>',
  clock:      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>',
  dollar:     '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  book:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  film:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M8 2v20M16 2v20M2 8h20M2 16h20"/></svg>',
  file:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  trophy:     '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M6 5h12v4a6 6 0 0 1-12 0z"/><path d="M10 14v4h4v-4"/><path d="M12 18v3"/></svg>',
  palette:    '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
  settings:   '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
  plus:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  x:          '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  edit:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
  trash:      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  heart:      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  zap:        '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  coin:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 10h4a2 2 0 0 1 0 4H9"/></svg>',
  users:      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  flag:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  'bar-chart':'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  cloud:      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
  play:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  pause:      '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  search:     '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  pin:        '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>',
  star:       '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  activity:   '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
};

function icon(name) { return ICONS[name] || ''; }

// ============================================================
// 2. CONSTANTS — Game data
// ============================================================
const LEVELS = [
  { level: 1,  xpNeeded: 0,    title: 'Iniciante' },
  { level: 2,  xpNeeded: 100,  title: 'Aprendiz' },
  { level: 3,  xpNeeded: 250,  title: 'Desbravador' },
  { level: 4,  xpNeeded: 450,  title: 'Guerreiro' },
  { level: 5,  xpNeeded: 700,  title: 'Mercenário' },
  { level: 6,  xpNeeded: 1000, title: 'Elite' },
  { level: 7,  xpNeeded: 1400, title: 'Mestre' },
  { level: 8,  xpNeeded: 1900, title: 'Sábio' },
  { level: 9,  xpNeeded: 2500, title: 'Herói' },
  { level: 10, xpNeeded: 3200, title: 'Lenda' },
];

const DIFFICULTIES = {
  facil:  { xp: 20, coins: 3,  label: 'Fácil' },
  media:  { xp: 40, coins: 6,  label: 'Média' },
  dificil:{ xp: 70, coins: 10, label: 'Difícil' },
};

const SKILL_NAMES = { destreza: 'Destreza', saude: 'Saúde', estudos: 'Estudos', gestao: 'Gestão' };
const SKILL_CLASSES = { destreza: 's-dex', saude: 's-life', estudos: 's-study', gestao: 's-mgmt' };
const SKILL_ICONS = { destreza: 'zap', saude: 'heart', estudos: 'book', gestao: 'activity' };

const ACHIEVEMENTS = [
  { id: 'first_mission',  name: 'Primeiro Passo', desc: 'Complete sua primeira missão.',         icon: '🎯', reward: 10 },
  { id: 'ten_missions',   name: 'Dedicação',       desc: 'Complete 10 missões.',                  icon: '⚔️', reward: 25 },
  { id: 'fifty_missions', name: 'Incansável',      desc: 'Complete 50 missões.',                  icon: '🏆', reward: 50 },
  { id: 'streak_7',       name: 'Ofensiva Semanal',desc: 'Mantenha 7 dias de ofensiva.',          icon: '🔥', reward: 30 },
  { id: 'streak_30',      name: 'Ofensiva Mortal', desc: 'Mantenha 30 dias de ofensiva.',         icon: '💀', reward: 100 },
  { id: 'level_5',        name: 'Mercenário',      desc: 'Alcance o nível 5.',                    icon: '⭐', reward: 40 },
  { id: 'level_10',       name: 'Lenda',           desc: 'Alcance o nível 10.',                   icon: '👑', reward: 100 },
  { id: 'level_20',       name: 'Imortal',         desc: 'Alcance o nível 20.',                   icon: '🌟', reward: 200 },
  { id: 'level_50',       name: 'Supremo',         desc: 'Alcance o nível 50.',                   icon: '💫', reward: 500 },
  { id: 'first_coin',     name: 'Primeira Moeda',  desc: 'Ganhe sua primeira moeda.',             icon: '🪙', reward: 5 },
  { id: 'hoard_100',      name: 'Poupeiro',        desc: 'Acumule 100 moedas.',                   icon: '💰', reward: 50 },
];

const THEMES = {
  violeta: {
    '--bg':'#0B0913','--bg-2':'#0F0C1C','--surface':'#15122A','--surface-2':'#1C1838','--surface-3':'#241F47',
    '--primary':'#8B5CF6','--primary-bright':'#A78BFA','--primary-dim':'rgba(139,92,246,.16)',
    '--gold':'#F4C44E','--gold-dim':'rgba(244,196,78,.14)','--hp':'#FB6A8A','--energy':'#38BDF8','--success':'#34D399','--danger':'#F4556B',
  },
  azul: {
    '--bg':'#0A0E1A','--bg-2':'#0D1424','--surface':'#111B30','--surface-2':'#162240','--surface-3':'#1C2D50',
    '--primary':'#3B82F6','--primary-bright':'#60A5FA','--primary-dim':'rgba(59,130,246,.16)',
    '--gold':'#F4C44E','--gold-dim':'rgba(244,196,78,.14)','--hp':'#FB6A8A','--energy':'#38BDF8','--success':'#34D399','--danger':'#F4556B',
  },
  verde: {
    '--bg':'#0A140E','--bg-2':'#0D1C12','--surface':'#112618','--surface-2':'#163220','--surface-3':'#1C4028',
    '--primary':'#10B981','--primary-bright':'#34D399','--primary-dim':'rgba(16,185,129,.16)',
    '--gold':'#F4C44E','--gold-dim':'rgba(244,196,78,.14)','--hp':'#FB6A8A','--energy':'#38BDF8','--success':'#34D399','--danger':'#F4556B',
  },
  rubi: {
    '--bg':'#140A0A','--bg-2':'#1C0D0D','--surface':'#2A1111','--surface-2':'#381616','--surface-3':'#471C1C',
    '--primary':'#EF4444','--primary-bright':'#F87171','--primary-dim':'rgba(239,68,68,.16)',
    '--gold':'#F4C44E','--gold-dim':'rgba(244,196,78,.14)','--hp':'#FB6A8A','--energy':'#38BDF8','--success':'#34D399','--danger':'#F4556B',
  },
  ouro: {
    '--bg':'#14100A','--bg-2':'#1C160D','--surface':'#2A1F11','--surface-2':'#382816','--surface-3':'#47331C',
    '--primary':'#F59E0B','--primary-bright':'#FBBF24','--primary-dim':'rgba(245,158,11,.16)',
    '--gold':'#F4C44E','--gold-dim':'rgba(244,196,78,.14)','--hp':'#FB6A8A','--energy':'#38BDF8','--success':'#34D399','--danger':'#F4556B',
  },
  neon: {
    '--bg':'#0A0A14','--bg-2':'#0E0E20','--surface':'#14142E','--surface-2':'#1A1A3C','--surface-3':'#22224A',
    '--primary':'#06B6D4','--primary-bright':'#22D3EE','--primary-dim':'rgba(6,182,212,.16)',
    '--gold':'#F4C44E','--gold-dim':'rgba(244,196,78,.14)','--hp':'#FB6A8A','--energy':'#38BDF8','--success':'#34D399','--danger':'#F4556B',
  },
};

const THEME_NAMES = Object.keys(THEMES);

// ============================================================
// 3. DEFAULTS — Data model
// ============================================================
const DEFAULTS = {
  player: {
    name: 'Aventureiro', avatar: '😺', level: 1, xp: 0, xpToNext: 100,
    coins: 0, hp: 100, maxHp: 100, streak: 0, bestStreak: 0,
    title: 'Iniciante',
    skills: { destreza: 0, saude: 0, estudos: 0, gestao: 0 },
    customSkills: [],
    totalMissionsDone: 0, totalHabitsDone: 0, totalFocusMinutes: 0,
    gameOver: false, deaths: 0, bestStreak: 0, streakFreeze: 0,
  },
  missions: [],
  habits: [],
  academy: [],
  caverna: { sessions: [], settings: { focus: 25, rest: 5 } },
  financas: { transactions: [], categories: ['Alimentação','Transporte','Lazer','Saúde','Educação','Moradia','Outros'] },
  estudos: { subjects: [], materials: [] },
  midia: [],
  notes: [],
  market: { items: [
    { id:'potion', name:'Poção de Cura', desc:'Recupera 30 HP', cost: 15 },
    { id:'streak_freeze', name:'❄️ Congelar Ofensiva', desc:'Protege seu streak por 1 dia', cost: 30 },
    { id:'big_potion', name:'🧪 Poção Grande', desc:'Recupera 100% do HP', cost: 40 },
  ], purchases: [] },
  settings: { theme: 'violeta', hardcoreFail: false, hardcoreHp: false },
  achievements: { claimed: [] },
  lastDailyReset: null,
};

// ============================================================
// 4. STORE — localStorage abstraction
// ============================================================
const Store = {
  _prefix: 'zenite_',
  get(key) {
    try { return JSON.parse(localStorage.getItem(this._prefix + key)); } catch { return undefined; }
  },
  set(key, value) {
    localStorage.setItem(this._prefix + key, JSON.stringify(value));
  },
  export() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(this._prefix)) {
        data[k.slice(this._prefix.length)] = JSON.parse(localStorage.getItem(k));
      }
    }
    return data;
  },
  import(data) {
    for (const [key, value] of Object.entries(data)) {
      this.set(key, value);
    }
  },
  resetAll() {
    for (const key of Object.keys(DEFAULTS)) {
      this.set(key, JSON.parse(JSON.stringify(DEFAULTS[key])));
    }
  },
  init() {
    for (const [key, defaults] of Object.entries(DEFAULTS)) {
      if (this.get(key) === undefined || this.get(key) === null) {
        this.set(key, JSON.parse(JSON.stringify(defaults)));
      }
    }
  },
};

// ============================================================
// 5. STATE — Simple event emitter
// ============================================================
const State = {
  _listeners: {},
  on(event, fn) { (this._listeners[event] ??= []).push(fn); },
  emit(event, data) { (this._listeners[event] ?? []).forEach(fn => fn(data)); },
  changed(key) { this.emit('change', key); this.emit('change:'+key, Store.get(key)); },
};

// ============================================================
// 6. ROUTES + ROUTER
// ============================================================
const ROUTES = {
  dashboard:{label:'Dashboard',icon:'grid',group:'núcleo'},
  campo:{label:'Campo',icon:'target',group:'núcleo'},
  personagem:{label:'Personagem',icon:'user',group:'núcleo'},
  mercado:{label:'Mercado',icon:'cart',group:'núcleo'},
  habitos:{label:'Hábitos',icon:'check',group:'vida'},
  academia:{label:'Academia',icon:'dumbbell',group:'vida'},
  caverna:{label:'Caverna',icon:'clock',group:'vida'},
  financas:{label:'Finanças',icon:'dollar',group:'vida'},
  estudos:{label:'Estudos',icon:'book',group:'cérebro'},
  midia:{label:'Mídia',icon:'film',group:'cérebro'},
  notas:{label:'Notas',icon:'file',group:'cérebro'},
  conquistas:{label:'Conquistas',icon:'trophy',group:'mais'},
  temas:{label:'Temas',icon:'palette',group:'mais'},
  configuracoes:{label:'Configurações',icon:'settings',group:'mais'},
  social:{label:'Social',icon:'users',group:'nuvem'},
  clans:{label:'Clãs',icon:'flag',group:'nuvem'},
  rankings:{label:'Rankings',icon:'bar-chart',group:'nuvem'},
};

const NAV_GROUPS = [
  { label:'Núcleo', routes:['dashboard','campo','personagem','mercado'] },
  { label:'Vida', routes:['habitos','academia','caverna','financas'] },
  { label:'Segundo Cérebro', routes:['estudos','midia','notas'] },
  { label:'Mais', routes:['conquistas','temas','configuracoes'] },
  { label:'Nuvem', routes:['social','clans','rankings'] },
];

const CLOUD_ROUTES = ['social','clans','rankings'];

const Router = {
  getRoute() { return location.hash.slice(1) || 'dashboard'; },
  navigate(route) {
    if (!ROUTES[route]) route = 'dashboard';
    location.hash = route;
  },
  init() {
    window.addEventListener('hashchange', () => renderAll());
    if (!location.hash) this.navigate('dashboard');
    renderAll();
  },
};

// ============================================================
// 7. UI SYSTEM — Toast, Modal, Confirm, LevelUp
// ============================================================
let toastTimer = null;

function showToast(message, type = '') {
  const container = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = message;
  container.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, 3000);
}

function openModal(html, wide = false) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `<div class="overlay show"><div class="modal${wide?' wide':''}">${html}</div></div>`;
  const overlay = root.querySelector('.overlay');
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  const xBtn = overlay.querySelector('.x');
  if (xBtn) xBtn.addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}

function confirmModal(msg, cb) {
  openModal(`
    <div class="modal-head"><div class="mi">${icon('alert-circle')||'⚠️'}</div><h2>Confirmar</h2><button class="x">${icon('x')}</button></div>
    <p style="margin-bottom:18px;color:var(--muted);">${msg}</p>
    <div class="row" style="justify-content:flex-end;">
      <button class="btn" data-action="modal-cancel">Cancelar</button>
      <button class="btn primary" data-action="modal-confirm">Confirmar</button>
    </div>`);
  document.querySelector('[data-action=modal-confirm]')?.addEventListener('click', () => { closeModal(); cb(true); });
  document.querySelector('[data-action=modal-cancel]')?.addEventListener('click', () => { closeModal(); cb(false); });
}

function showLevelUp(level, title) {
  const el = document.createElement('div');
  el.className = 'levelup';
  el.innerHTML = `<div class="burst"><div class="big">NÍVEL ${level}!<br>${title}</div></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2000);
}

// ============================================================
// 8. THEME ENGINE
// ============================================================
function applyTheme(name) {
  const theme = THEMES[name] || THEMES.violeta;
  const root = document.documentElement;
  for (const [prop, val] of Object.entries(theme)) {
    root.style.setProperty(prop, val);
  }
  const s = Store.get('settings') || {};
  s.theme = name;
  Store.set('settings', s);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme['--bg']);
}

// ============================================================
// 9. GAME ENGINE
// ============================================================
function getLevelConfig(level) {
  const found = LEVELS.find(l => l.level === level);
  if (found) return found;
  // Dynamic formula for levels beyond the predefined array
  const xpNeeded = 200 + level * 150;
  const TITLES_EXTENDED = [
    'Lenda', 'Imortal', 'Divino', 'Supremo', 'Absoluto',
    'Eterno', 'Cosmico', 'Transcendente', 'Onipotente', 'Zen',
  ];
  const title = TITLES_EXTENDED[Math.floor((level - 11) / 5)] || 'Mestre Supremo';
  return { level, xpNeeded, title };
}

function addXP(amount, skillType) {
  const p = Store.get('player');
  p.xp += amount;
  let leveledUp = false;
  while (p.xp >= p.xpToNext) {
    const nextLv = p.level + 1;
    const cfg = getLevelConfig(nextLv);
    p.xp -= p.xpToNext;
    p.level = nextLv;
    p.title = cfg.title;
    p.xpToNext = cfg.xpNeeded;
    leveledUp = true;
  }
  if (skillType && p.skills[skillType] !== undefined) {
    p.skills[skillType] = (p.skills[skillType] || 0) + Math.floor(amount / 10);
  }
  Store.set('player', p);
  State.changed('player');
  if (leveledUp) {
    showLevelUp(p.level, p.title);
    showToast(`🎉 Subiu para o nível ${p.level}: ${p.title}!`, 'gold');
    checkAchievements();
  }
}

function addCoins(amount) {
  const p = Store.get('player');
  p.coins += amount;
  Store.set('player', p);
  State.changed('player');
  checkAchievements();
}

function spendCoins(amount) {
  const p = Store.get('player');
  if (p.coins < amount) return false;
  p.coins -= amount;
  Store.set('player', p);
  State.changed('player');
  return true;
}

function healHp(amount) {
  const p = Store.get('player');
  p.hp = Math.min(p.maxHp, p.hp + amount);
  if (p.gameOver && p.hp > 0) {
    p.gameOver = false;
    showToast('💫 Você reviveu!', 'success');
  }
  Store.set('player', p);
  State.changed('player');
}

function damageHp(amount) {
  const p = Store.get('player');
  p.hp = Math.max(0, p.hp - amount);
  Store.set('player', p);
  State.changed('player');
  checkDeath();
}

function checkDeath() {
  const p = Store.get('player');
  if (p.hp <= 0 && !p.gameOver) {
    p.gameOver = true;
    p.deaths = (p.deaths || 0) + 1;
    Store.set('player', p);
    State.changed('player');
    renderAll();
  }
}

function revivePlayer() {
  const p = Store.get('player');
  const cost = 30 + (p.deaths || 0) * 10; // aumenta a cada morte
  if (p.coins < cost) {
    showToast(`💰 Precisava de ${cost} moedas para reviver. Você tem ${p.coins}.`, 'hp');
    return false;
  }
  p.coins -= cost;
  p.hp = Math.round(p.maxHp * 0.5); // revive com 50% HP
  p.gameOver = false;
  Store.set('player', p);
  State.changed('player');
  showToast(`💫 Você reviveu! -${cost} moedas`, 'gold');
  renderAll();
  return true;
}

function calcReward(difficulty) {
  return DIFFICULTIES[difficulty] || DIFFICULTIES.facil;
}

// ============================================================
// 9b. ACHIEVEMENT ENGINE
// ============================================================
function checkAchievements() {
  const p = Store.get('player');
  const ach = Store.get('achievements');
  const claimed = ach.claimed || [];
  let changed = false;

  ACHIEVEMENTS.forEach(a => {
    if (claimed.includes(a.id)) return;
    let earned = false;
    switch (a.id) {
      case 'first_mission': earned = p.totalMissionsDone >= 1; break;
      case 'ten_missions': earned = p.totalMissionsDone >= 10; break;
      case 'fifty_missions': earned = p.totalMissionsDone >= 50; break;
      case 'streak_7': earned = p.streak >= 7; break;
      case 'streak_30': earned = p.streak >= 30; break;
      case 'level_5': earned = p.level >= 5; break;
      case 'level_10': earned = p.level >= 10; break;
      case 'level_20': earned = p.level >= 20; break;
      case 'level_50': earned = p.level >= 50; break;
      case 'first_coin': earned = p.coins >= 1; break;
      case 'hoard_100': earned = p.coins >= 100; break;
    }
    if (earned) {
      claimed.push(a.id);
      p.coins += a.reward;
      changed = true;
      showToast(`🏅 Conquista: ${a.name}! +${a.reward} moedas`, 'gold');
    }
  });

  if (changed) {
    Store.set('achievements', ach);
    Store.set('player', p);
    State.changed('player');
  }
}

// ============================================================
// 10. SIDEBAR + TOPBAR RENDERER
// ============================================================
function renderSidebar(route) {
  const p = Store.get('player');
  const xpPct = Math.min(100, Math.round((p.xp / p.xpToNext) * 100));
  const hpPct = Math.round(p.hp / p.maxHp * 100);
  const hpLow = hpPct <= 25 && hpPct > 0;
  const gameOverBanner = p.gameOver ? '<div class="go-sidebar-banner" style="text-align:center;padding:8px;background:var(--danger);color:#fff;font-weight:700;font-size:13px;border-radius:8px;margin-bottom:8px;">💀 DERROTADO</div>' : '';

  let navHTML = '';
  NAV_GROUPS.forEach(g => {
    navHTML += `<div class="group-label">${g.label}</div>`;
    g.routes.forEach(r => {
      const rt = ROUTES[r];
      const isCloud = CLOUD_ROUTES.includes(r);
      navHTML += `<a href="#${r}" class="${r===route?'active':''}">${icon(rt.icon)} ${rt.label}${isCloud?' <span class="chip">nuvem</span>':''}</a>`;
    });
  });

  document.getElementById('sidebar').innerHTML = `
    <div class="brand">
      <img src="icons/icon-192.svg" alt="Z" onerror="this.style.display='none'">
      <div class="name">Z<b>ÊNITE</b></div>
    </div>
    <div class="profile">
      ${gameOverBanner}
      <div class="top">
        <div class="avatar ${p.gameOver?'go-avatar':''}">${p.avatar||'😺'}<span class="lvl-badge">${p.level}</span></div>
        <div class="who"><div class="nm">${p.name}</div><div class="cls">${p.title}</div></div>
      </div>
      <div class="stats-row">
        <span class="pill hp" style="${hpLow?'animation:pulse-hp 1.5s infinite;':''}">${icon('heart')} ${p.hp}/${p.maxHp}</span>
        <span class="pill en">${icon('zap')} ${p.streak}</span>
        <span class="pill co">${icon('coin')} ${p.coins}</span>
        ${p.streakFreeze > 0 ? `<span class="pill freeze">❄️ ${p.streakFreeze}</span>` : ''}
      </div>
      <div class="xpbar-wrap">
        <div class="xpbar-label"><span>XP</span><span>${p.xp}/${p.xpToNext}</span></div>
        <div class="bar"><i style="width:${xpPct}%"></i></div>
      </div>
    </div>
    <nav class="nav">${navHTML}</nav>
    <div class="sidebar-foot">
      <button class="btn-new" data-action="quick-mission">${icon('plus')} Nova Missão</button>
    </div>
  `;

  document.querySelectorAll('.sidebar .nav a').forEach(a => {
    a.addEventListener('click', closeSidebarMobile);
  });
  document.querySelector('[data-action=quick-mission]')?.addEventListener('click', () => {
    closeSidebarMobile();
    if (p.gameOver) return showToast('💀 Você está derrotado! Reviva primeiro.', 'hp');
    Router.navigate('campo');
    setTimeout(() => document.querySelector('[data-action=new-mission]')?.click(), 100);
  });
}

function closeSidebarMobile() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('scrim').classList.remove('show');
}

function renderTopbar(route) {
  const info = ROUTES[route];
  const subLabels = {
    dashboard:'Visão geral', campo:'Missões e tarefas', personagem:'Seu perfil', mercado:'Gaste suas moedas',
    habitos:'Rotina diária', academia:'Treinos', caverna:'Foco profundo', financas:'Seu dinheiro',
    estudos:'Matérias e materiais', midia:'Filmes, séries e livros', notas:'Anotações rápidas',
    conquistas:'Troféus', temas:'Paletas de cores', configuracoes:'Ajustes',
    social:'Comunidade', clans:'Grupos', rankings:'Leaderboard',
  };

  document.getElementById('topbar').innerHTML = `
    <button class="menu-toggle" id="menuToggle">${icon('grid')}</button>
    <h1>${info?info.label:''}</h1>
    <span class="sub">${subLabels[route]||''}</span>
    <span class="spacer"></span>
  `;

  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('scrim').classList.toggle('show');
  });
}

// Helper: bind events in a container
function bindActions(container, handlers) {
  container.querySelectorAll('[data-action]').forEach(el => {
    const action = el.getAttribute('data-action');
    if (handlers[action]) {
      el.addEventListener('click', e => handlers[action](e, el));
    }
  });
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function today() { return todayInTz(); }

// Timezone-aware today string
function todayInTz() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }); // en-CA → YYYY-MM-DD
    return formatter.format(now);
  } catch {
    return new Date().toISOString().slice(0,10);
  }
}

// ============================================================
// 11. VIEWS
// ============================================================

// ——— VIEW: Dashboard ———
function viewDashboard() {
  const p = Store.get('player');
  const missions = Store.get('missions') || [];

  // Game Over screen
  if (p.gameOver) {
    const reviveCost = 30 + (p.deaths || 0) * 10;
    document.getElementById('view').innerHTML = `
      <div class="center-empty" style="padding:60px 20px;">
        <div style="font-size:64px;margin-bottom:16px;">💀</div>
        <h2 style="font-weight:800;font-size:28px;margin-bottom:8px;">Você foi derrotado!</h2>
        <p class="muted" style="margin-bottom:4px;">${p.name} caiu em batalha no nível ${p.level}.</p>
        <p class="muted" style="margin-bottom:24px;">Mortes: ${p.deaths} · Streak máximo: ${p.bestStreak||p.streak} dias</p>
        <div class="card" style="text-align:center;padding:24px;max-width:320px;margin:0 auto;">
          <div style="font-size:32px;margin-bottom:8px;">${icon('coin')}</div>
          <div style="font-weight:700;font-size:18px;margin-bottom:4px;">Reviver com ${reviveCost} moedas</div>
          <div class="muted" style="font-size:13px;margin-bottom:16px;">Você revive com 50% do HP max.</div>
          <button class="btn gold" data-action="revive" ${p.coins<reviveCost?'disabled':''}>
            ${p.coins>=reviveCost?'💫 Reviver':'💰 Faltam '+(reviveCost-p.coins)+' moedas'}
          </button>
          <div style="margin-top:16px;font-size:13px;" class="muted">Moedas: ${p.coins}</div>
        </div>
      </div>`;
    bindActions(document.getElementById('view'), {
      'revive': revivePlayer,
    });
    return;
  }

  const recent = [...missions].filter(m => m.done).sort((a,b) => (b.completedAt||'')>(a.completedAt||'')?1:-1).slice(0,5);
  const pending = missions.filter(m => !m.done && m.date === today()).length;
  const hpPct = Math.round(p.hp / p.maxHp * 100);
  const hpWarning = hpPct <= 25 && hpPct > 0 ? `<div class="alert hp-critical" style="margin-bottom:16px;padding:12px 16px;border-radius:12px;background:var(--hp-dim, rgba(251,106,138,.12));border:1px solid rgba(251,106,138,.25);color:var(--hp);font-weight:600;font-size:14px;">⚠️ HP crítico! Use poções no Mercado para se curar.</div>` : '';

  document.getElementById('view').innerHTML = `
    ${hpWarning}
    <div class="grid g-4" style="margin-bottom:20px;">
      <div class="kpi"><div class="ico">${icon('zap')}</div><div class="val">${p.xp}</div><div class="lbl">XP / ${p.xpToNext}</div></div>
      <div class="kpi gold"><div class="ico">${icon('coin')}</div><div class="val">${p.coins}</div><div class="lbl">Moedas</div></div>
      <div class="kpi ${hpPct<=25?'hp':''}"><div class="ico">${icon('heart')}</div><div class="val">${p.hp}<span style="font-size:13px;color:var(--muted);">/${p.maxHp}</span></div><div class="lbl">HP · Nv ${p.level}</div></div>
      <div class="kpi green"><div class="ico">${icon('activity')}</div><div class="val">${p.streak}</div><div class="lbl">Ofensiva (dias)</div></div>
    </div>
    <div class="grid g-2">
      <div class="card">
        <h3><span class="accent"></span>Últimas Missões</h3>
        ${recent.length?recent.map(m => `<div class="lrow"><div class="lbody"><div class="ltitle">${m.title}</div><div class="lsub">${DIFFICULTIES[m.difficulty]?.label||''} · +${m.reward?.xp||0}XP</div></div></div>`).join(''):'<div class="muted">Nenhuma missão concluída ainda.</div>'}
      </div>
      <div class="card">
        <h3><span class="accent"></span>Status</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div><div class="xpbar-label"><span>${p.title}</span><span>Nível ${p.level}</span></div><div class="bar"><i style="width:${Math.min(100,Math.round(p.xp/p.xpToNext*100))}%"></i></div></div>
          <div><div class="xpbar-label"><span>HP</span><span>${p.hp}/${p.maxHp}</span></div><div class="bar hp"><i style="width:${Math.round(p.hp/p.maxHp*100)}%"></i></div></div>
          <div class="muted" style="font-size:13px;">${pending} missão(ões) pendente(s) hoje</div>
        </div>
      </div>
    </div>`;
}

// ——— VIEW: Campo (Missões) ———
function viewCampo() {
  const missions = Store.get('missions') || [];
  const todayStr = today();
  const filter = sessionStorage.getItem('campoFilter') || 'all';
  let list = [...missions].sort((a,b) => a.done===b.done?0:(a.done?1:-1));

  if (filter === 'pending') list = list.filter(m => !m.done && m.date === todayStr);
  else if (filter === 'done') list = list.filter(m => m.done);

  const html = `
    <div class="between" style="margin-bottom:16px;">
      <div class="tabs">
        ${['all','pending','done'].map(f =>
          `<button class="${filter===f?'active':''}" data-action="filter" data-filter="${f}">${f==='all'?'Todas':f==='pending'?'Pendentes':'Concluídas'}</button>`
        ).join('')}
      </div>
      <button class="btn primary" data-action="new-mission">${icon('plus')} Nova</button>
    </div>
    <div class="list">
      ${list.length ? list.map(m => {
        const r = m.reward || calcReward(m.difficulty);
        const cls = m.done ? 'mission done' : 'mission' + (m.skill && SKILL_CLASSES[m.skill] ? ' '+SKILL_CLASSES[m.skill] : '');
        return `<div class="${cls}" data-id="${m.id}">
          <div class="check" data-action="toggle-mission" data-id="${m.id}">${m.done?icon('check'):''}</div>
          <div class="m-body">
            <div class="m-title">${m.title}</div>
            <div class="m-meta">
              <span class="tag">${DIFFICULTIES[m.difficulty]?.label||'?'}</span>
              ${m.skill?`<span class="tag v">${SKILL_NAMES[m.skill]||m.skill}</span>`:''}
              ${m.isDaily?'<span class="tag b">diária</span>':''}
            </div>
          </div>
          <div class="m-reward"><span class="xp">+${r.xp}XP</span><span class="co">+${r.coins}</span></div>
          <div class="m-actions">
            <button class="icon-btn" data-action="edit-mission" data-id="${m.id}">${icon('edit')}</button>
            <button class="icon-btn" data-action="delete-mission" data-id="${m.id}">${icon('trash')}</button>
          </div>
        </div>`;
      }).join('') : `<div class="center-empty"><div class="big">${icon('target')}</div><p>Nenhuma missão ${filter==='pending'?'pendente':filter==='done'?'concluída':''}.</p></div>`}
    </div>`;

  document.getElementById('view').innerHTML = html;
  bindActions(document.getElementById('view'), {
    'filter'(e, el) { sessionStorage.setItem('campoFilter', el.dataset.filter); viewCampo(); },
    'new-mission'() { missionModal(); },
    'toggle-mission'(e, el) { toggleMission(el.dataset.id); },
    'edit-mission'(e, el) { missionModal(el.dataset.id); },
    'delete-mission'(e, el) {
      confirmModal('Excluir esta missão?', ok => { if (ok) { deleteMission(el.dataset.id); viewCampo(); }});
    },
  });
}

function missionModal(id) {
  const missions = Store.get('missions') || [];
  const m = id ? missions.find(x => x.id === id) : null;
  const isEdit = !!m;
  const r = m ? calcReward(m.difficulty) : calcReward('facil');

  openModal(`
    <div class="modal-head"><div class="mi">${icon('target')}</div><h2>${isEdit?'Editar':'Nova'} Missão</h2><button class="x">${icon('x')}</button></div>
    <div class="field"><label>Título</label><input class="input" id="f-title" value="${isEdit?escHtml(m.title):''}" placeholder="Ex: Estudar React"></div>
    <div class="field"><label>Descrição (opcional)</label><textarea class="textarea" id="f-desc" placeholder="Detalhes...">${isEdit?escHtml(m.description||''):''}</textarea></div>
    <div class="two">
      <div class="field"><label>Habilidade</label><select class="input" id="f-skill">
        ${Object.entries(SKILL_NAMES).map(([k,v]) => `<option value="${k}" ${isEdit&&m.skill===k?'selected':''}>${v}</option>`).join('')}
        <option value="custom" ${isEdit&&m.skill==='custom'?'selected':''}>Customizada</option>
      </select></div>
      <div class="field"><label><input type="checkbox" id="f-daily" ${isEdit&&m.isDaily?'checked':''}> Missão diária</label></div>
    </div>
    <div class="field"><label>Dificuldade</label>
      <div class="diff-grid" id="diff-grid">
        ${Object.entries(DIFFICULTIES).map(([k,v]) => `
          <div class="diff ${isEdit&&m.difficulty===k?'active':k==='facil'&&!isEdit?'active':''}" data-value="${k}">
            <div class="dname">${v.label}</div>
            <div class="dxp">+${v.xp}XP</div>
            <div class="dco">+${v.coins}</div>
          </div>`).join('')}
      </div>
    </div>
    <button class="btn primary full" data-action="save-mission" data-id="${isEdit?id:''}">${icon('check')} ${isEdit?'Salvar':'Criar Missão'}</button>
  `, false);

  document.getElementById('diff-grid')?.addEventListener('click', e => {
    const diff = e.target.closest('.diff');
    if (!diff) return;
    document.querySelectorAll('.diff').forEach(d => d.classList.remove('active'));
    diff.classList.add('active');
  });

  document.querySelector('[data-action=save-mission]')?.addEventListener('click', () => {
    const title = document.getElementById('f-title')?.value.trim();
    if (!title) return showToast('Digite um título para a missão.', 'hp');
    const p = Store.get('player');
    if (p.gameOver) { closeModal(); return showToast('💀 Você está derrotado! Reviva primeiro.', 'hp'); }
    const desc = document.getElementById('f-desc')?.value.trim() || '';
    const skill = document.getElementById('f-skill')?.value || 'destreza';
    const isDaily = document.getElementById('f-daily')?.checked || false;
    const diffEl = document.querySelector('.diff.active');
    const difficulty = diffEl ? diffEl.dataset.value : 'facil';
    const reward = calcReward(difficulty);

    if (isEdit) {
      const missions = Store.get('missions') || [];
      const idx = missions.findIndex(x => x.id === id);
      if (idx >= 0) {
        missions[idx] = { ...missions[idx], title, description: desc, skill, difficulty, isDaily, reward };
        Store.set('missions', missions);
        showToast('Missão atualizada!', 'success');
      }
    } else {
      const missions = Store.get('missions') || [];
      missions.push({ id:uid(), title, description:desc, skill, difficulty, done:false, date:today(), createdAt:new Date().toISOString(), completedAt:null, isDaily, reward });
      Store.set('missions', missions);
      showToast(`Missão criada! (+${reward.xp}XP quando concluir)`, '');
    }
    closeModal();
    viewCampo();
  });
}

function toggleMission(id) {
  const missions = Store.get('missions') || [];
  const m = missions.find(x => x.id === id);
  if (!m) return;
  if (m.done) return showToast('Missão já concluída.', '');
  const p = Store.get('player');
  if (p.gameOver) return showToast('💀 Você está derrotado! Reviva primeiro.', 'hp');

  m.done = true;
  m.completedAt = new Date().toISOString();
  p.totalMissionsDone = (p.totalMissionsDone || 0) + 1;
  Store.set('missions', missions);
  Store.set('player', p);

  addXP(m.reward.xp, m.skill);
  addCoins(m.reward.coins);
  updateStreak();
  showToast(`✅ ${m.title} concluída! +${m.reward.xp}XP +${m.reward.coins} moedas`, 'gold');
  viewCampo();
}

function deleteMission(id) {
  let missions = Store.get('missions') || [];
  missions = missions.filter(x => x.id !== id);
  Store.set('missions', missions);
  showToast('Missão excluída.', 'hp');
}

function updateStreak() {
  const p = Store.get('player');
  const last = Store.get('lastDailyReset');
  const todayStr = today();
  // Only increment if not already done today
  if (last !== todayStr) {
    p.streak++;
    if (p.streak > (p.bestStreak || 0)) p.bestStreak = p.streak;
  }
  Store.set('player', p);
  State.changed('player');
}

// ——— VIEW: Personagem ———
function viewPersonagem() {
  const p = Store.get('player');
  const xpPct = Math.min(100, Math.round(p.xp/p.xpToNext*100));
  const totalSkills = Object.keys(SKILL_NAMES).length;
  const skillMax = Math.max(1, ...Object.values(p.skills).filter(v=>typeof v==='number'));

  const radarPoints = Object.keys(SKILL_NAMES).map((k,i) => {
    const val = (p.skills[k]||0) / Math.max(skillMax,1);
    const angle = (i / totalSkills) * 2 * Math.PI - Math.PI/2;
    const cx = 80 + 60 * val * Math.cos(angle);
    const cy = 80 + 60 * val * Math.sin(angle);
    return `${cx},${cy}`;
  });

  document.getElementById('view').innerHTML = `
    <div class="grid g-2" style="margin-bottom:20px;">
      <div class="card" style="text-align:center;padding:28px;">
        <div class="avatar" style="width:72px;height:72px;font-size:28px;margin:0 auto 12px;border-radius:18px;">
          ${p.avatar||'😺'}<span class="lvl-badge" style="font-size:13px;padding:2px 8px;">${p.level}</span>
        </div>
        <h2 style="font-weight:800;font-size:22px;margin-bottom:4px;">${p.name}</h2>
        <div style="color:var(--gold);font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;">${p.title}</div>
        <div style="margin:16px 0;">
          <div class="xpbar-label"><span>XP</span><span>${p.xp}/${p.xpToNext}</span></div>
          <div class="bar"><i style="width:${xpPct}%"></i></div>
          <div class="muted" style="font-size:12px;margin-top:4px;">${p.xpToNext - p.xp} XP para o próximo nível</div>
        </div>
        <div class="stats-row" style="justify-content:center;">
          <span class="pill hp">${icon('heart')} ${p.hp}/${p.maxHp}</span>
          <span class="pill en">${icon('zap')} ${p.streak} ofensiva</span>
          <span class="pill co">${icon('coin')} ${p.coins}</span>
        </div>
      </div>
      <div class="card">
        <h3><span class="accent"></span>Habilidades</h3>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${Object.entries(SKILL_NAMES).map(([k,v]) => `
            <div><div class="xpbar-label"><span>${icon(SKILL_ICONS[k])} ${v}</span><span>Lv. ${Math.floor((p.skills[k]||0)/10)+1}</span></div>
            <div class="bar gold"><i style="width:${Math.min(100,(p.skills[k]||0)%10*10)}%"></i></div></div>`).join('')}
        </div>
        <div style="margin-top:16px;">
          <svg class="chart-svg" viewBox="0 0 160 160" style="max-width:220px;margin:0 auto;">
            <polygon points="${['80,15', ...Object.keys(SKILL_NAMES).map((k,i)=>{const a=(i/totalSkills)*2*Math.PI-Math.PI/2;return `${80+60*Math.cos(a)},${80+60*Math.sin(a)}`;})].join(' ')}" fill="var(--surface-3)" stroke="var(--border)" stroke-width="1"/>
            <polygon points="${radarPoints.join(' ')}" fill="var(--primary-dim)" stroke="var(--primary-bright)" stroke-width="2"/>
            ${Object.keys(SKILL_NAMES).map((k,i)=>{const a=(i/totalSkills)*2*Math.PI-Math.PI/2;const lx=80+75*Math.cos(a),ly=80+75*Math.sin(a);return `<text x="${lx}" y="${ly}" fill="var(--muted)" font-size="8" text-anchor="middle" dominant-baseline="middle">${SKILL_NAMES[k].slice(0,4)}</text>`;}).join('')}
          </svg>
        </div>
      </div>
    </div>
    <div class="grid g-3">
      <div class="kpi"><div class="ico">${icon('check')}</div><div class="val">${p.totalMissionsDone||0}</div><div class="lbl">Missões</div></div>
      <div class="kpi green"><div class="ico">${icon('activity')}</div><div class="val">${p.totalHabitsDone||0}</div><div class="lbl">Hábitos</div></div>
      <div class="kpi gold"><div class="ico">${icon('clock')}</div><div class="val">${p.totalFocusMinutes||0}</div><div class="lbl">Min. Foco</div></div>
    </div>`;
}

// ——— VIEW: Mercado ———
function viewMercado() {
  const p = Store.get('player');
  const market = Store.get('market') || { items: [] };

  document.getElementById('view').innerHTML = `
    <div class="between" style="margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:22px;font-weight:800;">${icon('coin')} ${p.coins}</span>
        <span class="muted">moedas disponíveis</span>
      </div>
      <button class="btn primary" data-action="add-market-item">${icon('plus')} Adicionar</button>
    </div>
    <div class="grid g-3">
      ${market.items.map(item => `
        <div class="card" style="text-align:center;padding:22px;">
          <div style="font-size:32px;margin-bottom:8px;">${item.id==='potion'?'🧪':'🎁'}</div>
          <div style="font-weight:700;font-size:16px;margin-bottom:4px;">${item.name}</div>
          <div class="muted" style="font-size:12px;margin-bottom:12px;">${item.desc||''}</div>
          <div style="font-weight:800;font-size:18px;color:var(--gold);margin-bottom:12px;">${icon('coin')} ${item.cost}</div>
          <button class="btn ${p.coins>=item.cost?'gold':'ghost muted'}" data-action="buy-item" data-id="${item.id}" ${p.coins<item.cost?'disabled':''}>${p.coins>=item.cost?'Comprar':'Sem moedas'}</button>
        </div>`).join('')}
    </div>`;

  bindActions(document.getElementById('view'), {
    'add-market-item'() {
      openModal(`
        <div class="modal-head"><div class="mi">${icon('cart')}</div><h2>Novo Item</h2><button class="x">${icon('x')}</button></div>
        <div class="field"><label>Nome</label><input class="input" id="mi-name" placeholder="Ex: Fast food"></div>
        <div class="field"><label>Descrição</label><input class="input" id="mi-desc" placeholder="Ex: Um hambúrguer"></div>
        <div class="field"><label>Custo (moedas)</label><input class="input" id="mi-cost" type="number" value="10" min="1"></div>
        <button class="btn primary full" data-action="save-market-item">${icon('plus')} Adicionar</button>`);
      document.querySelector('[data-action=save-market-item]')?.addEventListener('click', () => {
        const name = document.getElementById('mi-name')?.value.trim();
        if (!name) return showToast('Digite um nome.', 'hp');
        const desc = document.getElementById('mi-desc')?.value.trim()||'';
        const cost = parseInt(document.getElementById('mi-cost')?.value)||10;
        const market = Store.get('market') || { items: [] };
        market.items.push({ id:uid(), name, desc, cost });
        Store.set('market', market);
        closeModal();
        viewMercado();
        showToast('Item adicionado ao mercado!', 'success');
      });
    },
    'buy-item'(e, el) {
      const id = el.dataset.id;
      const market = Store.get('market') || { items: [] };
      const item = market.items.find(x => x.id === id);
      if (!item) return;
      confirmModal(`Comprar "${item.name}" por ${item.cost} moedas?`, ok => {
        if (!ok) return;
        if (spendCoins(item.cost)) {
          if (item.id === 'potion') { healHp(30); showToast('🧪 HP recuperado! (+30)', 'success'); }
          else if (item.id === 'big_potion') { healHp(999); showToast('🧪 HP totalmente recuperado!', 'success'); }
          else if (item.id === 'streak_freeze') {
            const p = Store.get('player');
            p.streakFreeze = Math.min(3, (p.streakFreeze || 0) + 1);
            Store.set('player', p);
            State.changed('player');
            showToast(`❄️ +1 Congelar Ofensiva (${p.streakFreeze}/3)`, '');
          }
          else showToast(`🎁 ${item.name} adquirido!`, 'gold');
          viewMercado();
        } else {
          showToast('Moedas insuficientes!', 'hp');
        }
      });
    },
  });
}

// ——— VIEW: Hábitos ———
function viewHabitos() {
  const habits = Store.get('habits') || [];
  const todayStr = today();

  document.getElementById('view').innerHTML = `
    <div class="between" style="margin-bottom:16px;">
      <span class="muted">${habits.length} hábito(s)</span>
      <button class="btn primary" data-action="add-habit">${icon('plus')} Novo Hábito</button>
    </div>
    <div class="list">
      ${habits.length ? habits.map(h => {
        const done = (h.doneDates||[]).includes(todayStr);
        return `<div class="lrow" style="opacity:${done?.5:1}">
          <div class="lic" style="background:${done?'var(--success)':'var(--surface-2)'};color:${done?'#04241a':'var(--muted)'};cursor:pointer;" data-action="toggle-habit" data-id="${h.id}">${done?icon('check'):''}</div>
          <div class="lbody"><div class="ltitle">${h.title}</div><div class="lsub">${done?'Concluído hoje':(h.doneDates||[]).length+' vez(es) no total'}</div></div>
          <button class="icon-btn" data-action="del-habit" data-id="${h.id}">${icon('trash')}</button>
        </div>`;
      }).join('') : `<div class="center-empty"><div class="big">${icon('check')}</div><p>Nenhum hábito ainda.</p></div>`}
    </div>`;

  bindActions(document.getElementById('view'), {
    'add-habit'() {
      openModal(`
        <div class="modal-head"><div class="mi">${icon('check')}</div><h2>Novo Hábito</h2><button class="x">${icon('x')}</button></div>
        <div class="field"><label>Nome</label><input class="input" id="h-name" placeholder="Ex: Beber 2L de água"></div>
        <button class="btn primary full" data-action="save-habit">${icon('plus')} Criar</button>`);
      document.querySelector('[data-action=save-habit]')?.addEventListener('click', () => {
        const title = document.getElementById('h-name')?.value.trim();
        if (!title) return showToast('Digite um nome.', 'hp');
        const habits = Store.get('habits') || [];
        habits.push({ id:uid(), title, doneDates:[] });
        Store.set('habits', habits);
        closeModal();
        viewHabitos();
        showToast('Hábito criado!', 'success');
      });
    },
    'toggle-habit'(e, el) {
      const habits = Store.get('habits') || [];
      const h = habits.find(x => x.id === el.dataset.id);
      if (!h) return;
      const d = (h.doneDates||[]);
      if (d.includes(todayStr)) {
        h.doneDates = d.filter(x => x !== todayStr);
      } else {
        h.doneDates.push(todayStr);
        const p = Store.get('player');
        p.totalHabitsDone = (p.totalHabitsDone||0)+1;
        addXP(5, 'saude');
        Store.set('player', p);
      }
      Store.set('habits', habits);
      viewHabitos();
    },
    'del-habit'(e, el) {
      confirmModal('Excluir este hábito?', ok => {
        if (!ok) return;
        let habits = Store.get('habits') || [];
        habits = habits.filter(x => x.id !== el.dataset.id);
        Store.set('habits', habits);
        viewHabitos();
      });
    },
  });
}

// ——— VIEW: Academia ———
function viewAcademia() {
  const academy = Store.get('academy') || [];

  document.getElementById('view').innerHTML = `
    <div class="between" style="margin-bottom:16px;">
      <span class="muted">${academy.length} exercício(s)</span>
      <button class="btn primary" data-action="add-exercise">${icon('plus')} Novo</button>
    </div>
    <div class="list">
      ${academy.length ? academy.map(ex => `
        <div class="lrow">
          <div class="lic">${icon('dumbbell')}</div>
          <div class="lbody">
            <div class="ltitle">${ex.name}</div>
            <div class="lsub">${ex.reps||0} reps · ${ex.sets||0} séries${ex.lastDone?' · Último: '+ex.lastDone:''}</div>
          </div>
          <button class="btn sm success" data-action="done-exercise" data-id="${ex.id}">${icon('check')} Feito</button>
          <button class="icon-btn" data-action="del-exercise" data-id="${ex.id}">${icon('trash')}</button>
        </div>`).join('') : `<div class="center-empty"><div class="big">${icon('dumbbell')}</div><p>Nenhum exercício cadastrado.</p></div>`}
    </div>`;

  bindActions(document.getElementById('view'), {
    'add-exercise'() {
      openModal(`
        <div class="modal-head"><div class="mi">${icon('dumbbell')}</div><h2>Novo Exercício</h2><button class="x">${icon('x')}</button></div>
        <div class="field"><label>Nome</label><input class="input" id="ex-name" placeholder="Ex: Flexão"></div>
        <div class="two"><div class="field"><label>Repetições</label><input class="input" id="ex-reps" type="number" value="12" min="1"></div>
        <div class="field"><label>Séries</label><input class="input" id="ex-sets" type="number" value="3" min="1"></div></div>
        <button class="btn primary full" data-action="save-exercise">${icon('plus')} Criar</button>`);
      document.querySelector('[data-action=save-exercise]')?.addEventListener('click', () => {
        const name = document.getElementById('ex-name')?.value.trim();
        if (!name) return showToast('Digite um nome.', 'hp');
        const reps = parseInt(document.getElementById('ex-reps')?.value)||12;
        const sets = parseInt(document.getElementById('ex-sets')?.value)||3;
        const a = Store.get('academy') || [];
        a.push({ id:uid(), name, reps, sets, lastDone: null });
        Store.set('academy', a);
        closeModal();
        viewAcademia();
        showToast('Exercício adicionado!', 'success');
      });
    },
    'done-exercise'(e, el) {
      const a = Store.get('academy') || [];
      const ex = a.find(x => x.id === el.dataset.id);
      if (!ex) return;
      ex.lastDone = today();
      Store.set('academy', a);
      addXP(15, 'saude');
      showToast(`💪 ${ex.name} concluído! +15XP`, 'gold');
      viewAcademia();
    },
    'del-exercise'(e, el) {
      confirmModal('Excluir exercício?', ok => {
        if (!ok) return;
        let a = Store.get('academy') || [];
        a = a.filter(x => x.id !== el.dataset.id);
        Store.set('academy', a);
        viewAcademia();
      });
    },
  });
}

// ——— VIEW: Caverna (Pomodoro) ———
let pomodoroState = { running: false, phase: 'focus', timeLeft: 25*60, total: 25*60, timerId: null };
const POMODORO_STORE_KEY = 'caverna';

function viewCaverna() {
  const data = Store.get(POMODORO_STORE_KEY) || DEFAULTS.caverna;
  const s = data.settings || { focus: 25, rest: 5 };
  const focusSec = s.focus * 60, restSec = s.rest * 60;
  if (!pomodoroState.running && pomodoroState.timerId === null) {
    pomodoroState.timeLeft = focusSec;
    pomodoroState.total = focusSec;
    pomodoroState.phase = 'focus';
  }
  const pct = pomodoroState.total > 0 ? (pomodoroState.timeLeft / pomodoroState.total) * 100 : 0;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference * (1 - pct / 100);
  const mins = Math.floor(pomodoroState.timeLeft / 60);
  const secs = pomodoroState.timeLeft % 60;

  document.getElementById('view').innerHTML = `
    <div class="grid g-2">
      <div class="card" style="text-align:center;padding:30px;">
        <svg class="ring" width="160" height="160" viewBox="0 0 100 100">
          <circle class="track" cx="50" cy="50" r="40" stroke-width="9"/>
          <circle class="ind" cx="50" cy="50" r="40" stroke-width="9" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
        </svg>
        <div style="font-size:42px;font-weight:800;margin:12px 0 4px;letter-spacing:-.02em;">${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}</div>
        <div class="muted" style="font-size:14px;font-weight:600;text-transform:uppercase;">${pomodoroState.phase==='focus'?'Foco':'Descanso'}</div>
        <div style="margin-top:16px;display:flex;gap:10px;justify-content:center;">
          <button class="btn ${pomodoroState.running?'danger':'primary'}" data-action="toggle-pomo">${icon(pomodoroState.running?'pause':'play')} ${pomodoroState.running?'Pausar':'Iniciar'}</button>
          <button class="btn ghost" data-action="reset-pomo">${icon('x')} Reset</button>
        </div>
      </div>
      <div class="card">
        <h3><span class="accent"></span>Configurações</h3>
        <div class="field"><label>Foco (min)</label><input class="input" id="pomo-focus" type="number" value="${s.focus}" min="1" max="120"></div>
        <div class="field"><label>Descanso (min)</label><input class="input" id="pomo-rest" type="number" value="${s.rest}" min="1" max="30"></div>
        <button class="btn primary full" data-action="save-pomo-settings">Salvar</button>
        <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--border);">
          <div class="muted" style="font-size:12px;">Sessões hoje: ${data.sessions?.filter(s=>s.date===today()).length||0}</div>
          <div class="muted" style="font-size:12px;">Total: ${data.settings?.totalMinutes||0} minutos</div>
        </div>
      </div>
    </div>`;

  bindActions(document.getElementById('view'), {
    'toggle-pomo'() {
      if (pomodoroState.running) {
        clearInterval(pomodoroState.timerId);
        pomodoroState.running = false;
        pomodoroState.timerId = null;
      } else {
        pomodoroState.running = true;
        pomodoroState.timerId = setInterval(() => {
          pomodoroState.timeLeft--;
          if (pomodoroState.timeLeft <= 0) {
            clearInterval(pomodoroState.timerId);
            pomodoroState.timerId = null;
            pomodoroState.running = false;
            if (pomodoroState.phase === 'focus') {
              showToast('🔔 Foco concluído! Hora de descansar.', 'success');
              const data = Store.get(POMODORO_STORE_KEY) || DEFAULTS.caverna;
              if (!data.sessions) data.sessions = [];
              data.sessions.push({ date: today(), phase: 'focus', completedAt: new Date().toISOString() });
              if (!data.settings) data.settings = { focus: 25, rest: 5, totalMinutes: 0 };
              data.settings.totalMinutes = (data.settings.totalMinutes||0) + (data.settings.focus||25);
              Store.set(POMODORO_STORE_KEY, data);
              const p = Store.get('player');
              p.totalFocusMinutes = (p.totalFocusMinutes||0) + (data.settings.focus||25);
              addXP(20, 'estudos');
              Store.set('player', p);
              const s = data.settings || DEFAULTS.caverna.settings;
              pomodoroState.phase = 'rest';
              pomodoroState.timeLeft = (s.rest||5)*60;
              pomodoroState.total = (s.rest||5)*60;
            } else {
              showToast('🔔 Descanso concluído! Bora focar.', '');
              const s = (Store.get(POMODORO_STORE_KEY)||DEFAULTS.caverna).settings||DEFAULTS.caverna.settings;
              pomodoroState.phase = 'focus';
              pomodoroState.timeLeft = (s.focus||25)*60;
              pomodoroState.total = (s.focus||25)*60;
            }
            viewCaverna();
          }
          viewCaverna();
        }, 1000);
      }
      viewCaverna();
    },
    'reset-pomo'() {
      clearInterval(pomodoroState.timerId);
      pomodoroState = { running:false, phase:'focus', timeLeft:25*60, total:25*60, timerId:null };
      const s = (Store.get(POMODORO_STORE_KEY)||DEFAULTS.caverna).settings||DEFAULTS.caverna.settings;
      pomodoroState.timeLeft = (s.focus||25)*60;
      pomodoroState.total = (s.focus||25)*60;
      viewCaverna();
    },
    'save-pomo-settings'() {
      const focus = parseInt(document.getElementById('pomo-focus')?.value)||25;
      const rest = parseInt(document.getElementById('pomo-rest')?.value)||5;
      const data = Store.get(POMODORO_STORE_KEY) || DEFAULTS.caverna;
      data.settings = { focus, rest, totalMinutes: data.settings?.totalMinutes||0 };
      Store.set(POMODORO_STORE_KEY, data);
      clearInterval(pomodoroState.timerId);
      pomodoroState = { running:false, phase:'focus', timeLeft:focus*60, total:focus*60, timerId:null };
      viewCaverna();
      showToast('Configurações salvas!', 'success');
    },
  });
}

// ——— VIEW: Finanças ———
function viewFinancas() {
  const data = Store.get('financas') || DEFAULTS.financas;
  const tx = data.transactions || [];
  const balance = tx.reduce((acc,t) => acc + (t.type==='income'?t.amount:-t.amount), 0);
  const sorted = [...tx].sort((a,b) => b.date>a.date?1:-1).slice(0,20);

  document.getElementById('view').innerHTML = `
    <div class="grid g-2" style="margin-bottom:16px;">
      <div class="kpi green"><div class="ico">${icon('dollar')}</div><div class="val">R$${balance.toFixed(2)}</div><div class="lbl">Saldo</div></div>
      <div style="display:flex;gap:10px;align-items:flex-end;justify-content:flex-end;">
        <button class="btn success" data-action="add-income">${icon('plus')} Receita</button>
        <button class="btn danger" data-action="add-expense">${icon('minus')||'-'} Despesa</button>
      </div>
    </div>
    <div class="card flush">
      ${sorted.length ? sorted.map(t => `
        <div class="lrow" style="border-radius:0;border:none;border-bottom:1px solid var(--border);">
          <div class="lic" style="background:${t.type==='income'?'rgba(52,211,153,.13)':'rgba(244,85,107,.13)'};color:${t.type==='income'?'var(--success)':'var(--danger)'};">${icon(t.type==='income'?'plus':'minus')||' '}</div>
          <div class="lbody">
            <div class="ltitle">${t.description||'Sem descrição'}</div>
            <div class="lsub">${t.category||''} · ${t.date||''}</div>
          </div>
          <div style="font-weight:800;color:${t.type==='income'?'var(--success)':'var(--danger)'};">${t.type==='income'?'+':'-'}R$${Math.abs(t.amount).toFixed(2)}</div>
          <button class="icon-btn" data-action="del-transaction" data-id="${t.id}">${icon('trash')}</button>
        </div>`).join('') : `<div class="center-empty"><div class="big">${icon('dollar')}</div><p>Nenhuma transação.</p></div>`}
    </div>`;

  bindActions(document.getElementById('view'), {
    'add-income'() { transactionModal('income'); },
    'add-expense'() { transactionModal('expense'); },
    'del-transaction'(e, el) {
      confirmModal('Excluir transação?', ok => {
        if (!ok) return;
        const data = Store.get('financas') || DEFAULTS.financas;
        data.transactions = (data.transactions||[]).filter(t => t.id !== el.dataset.id);
        Store.set('financas', data);
        viewFinancas();
      });
    },
  });
}

function transactionModal(type) {
  const data = Store.get('financas') || DEFAULTS.financas;
  openModal(`
    <div class="modal-head"><div class="mi">${icon('dollar')}</div><h2>${type==='income'?'Nova Receita':'Nova Despesa'}</h2><button class="x">${icon('x')}</button></div>
    <div class="field"><label>Descrição</label><input class="input" id="tx-desc" placeholder="Ex: Salário"></div>
    <div class="field"><label>Valor (R$)</label><input class="input" id="tx-amount" type="number" step="0.01" value="0" min="0"></div>
    <div class="field"><label>Categoria</label><select class="input" id="tx-cat">
      ${(data.categories||DEFAULTS.financas.categories).map(c => `<option value="${c}">${c}</option>`).join('')}
    </select></div>
    <button class="btn primary full" data-action="save-transaction">Salvar</button>`);
  document.querySelector('[data-action=save-transaction]')?.addEventListener('click', () => {
    const desc = document.getElementById('tx-desc')?.value.trim();
    if (!desc) return showToast('Digite uma descrição.', 'hp');
    const amount = parseFloat(document.getElementById('tx-amount')?.value)||0;
    if (amount <= 0) return showToast('Valor deve ser positivo.', 'hp');
    const cat = document.getElementById('tx-cat')?.value || 'Outros';
    const data = Store.get('financas') || DEFAULTS.financas;
    (data.transactions||[]).push({ id:uid(), type, description:desc, amount, category:cat, date:today() });
    Store.set('financas', data);
    closeModal();
    viewFinancas();
    showToast(`${type==='income'?'Receita':'Despesa'} registrada!`, 'success');
  });
}

// ——— VIEW: Estudos ———
function viewEstudos() {
  const data = Store.get('estudos') || DEFAULTS.estudos;
  const subjects = data.subjects || [];

  document.getElementById('view').innerHTML = `
    <div class="between" style="margin-bottom:16px;">
      <span class="muted">${subjects.length} matéria(s)</span>
      <button class="btn primary" data-action="add-subject">${icon('plus')} Matéria</button>
    </div>
    <div class="grid g-2">
      ${subjects.length ? subjects.map(s => `
        <div class="card">
          <div class="between"><h3>${s.name}</h3><button class="icon-btn" data-action="add-material" data-subj="${s.id}">${icon('plus')}</button></div>
          ${(s.materials||[]).length ? (s.materials||[]).map(m => `
            <div class="lrow" style="margin-bottom:6px;">
              <div style="width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:var(--surface-2);">${m.type==='video'?'🎬':m.type==='artigo'?'📄':m.type==='livro'?'📚':'📝'}</div>
              <div class="lbody"><div class="ltitle">${m.title}</div></div>
              <button class="icon-btn" data-action="del-material" data-subj="${s.id}" data-mat="${m.id}">${icon('trash')}</button>
            </div>`).join('') : `<div class="muted" style="font-size:13px;">Nenhum material.</div>`}
        </div>`).join('') : `<div class="center-empty"><div class="big">${icon('book')}</div><p>Nenhuma matéria cadastrada.</p></div>`}
    </div>`;

  bindActions(document.getElementById('view'), {
    'add-subject'() {
      openModal(`<div class="modal-head"><div class="mi">${icon('book')}</div><h2>Nova Matéria</h2><button class="x">${icon('x')}</button></div>
        <div class="field"><label>Nome</label><input class="input" id="subj-name" placeholder="Ex: Matemática"></div>
        <button class="btn primary full" data-action="save-subject">Criar</button>`);
      document.querySelector('[data-action=save-subject]')?.addEventListener('click', () => {
        const name = document.getElementById('subj-name')?.value.trim();
        if (!name) return showToast('Digite um nome.', 'hp');
        const data = Store.get('estudos') || DEFAULTS.estudos;
        (data.subjects||[]).push({ id:uid(), name, materials:[] });
        Store.set('estudos', data);
        closeModal();
        viewEstudos();
        showToast('Matéria criada!', 'success');
      });
    },
    'add-material'(e, el) {
      const subjId = el.dataset.subj;
      openModal(`<div class="modal-head"><div class="mi">${icon('book')}</div><h2>Novo Material</h2><button class="x">${icon('x')}</button></div>
        <div class="field"><label>Título</label><input class="input" id="mat-title" placeholder="Ex: Vídeo Aula 1"></div>
        <div class="field"><label>Tipo</label><select class="input" id="mat-type"><option value="video">🎬 Vídeo</option><option value="artigo">📄 Artigo</option><option value="livro">📚 Livro</option><option value="outro">📝 Outro</option></select></div>
        <button class="btn primary full" data-action="save-material" data-subj="${subjId}">Adicionar</button>`);
      document.querySelector('[data-action=save-material]')?.addEventListener('click', (e) => {
        const title = document.getElementById('mat-title')?.value.trim();
        if (!title) return showToast('Digite um título.', 'hp');
        const type = document.getElementById('mat-type')?.value||'outro';
        const data = Store.get('estudos') || DEFAULTS.estudos;
        const subj = (data.subjects||[]).find(s => s.id === (e.target.dataset.subj||subjId));
        if (subj) { (subj.materials||[]).push({ id:uid(), title, type }); }
        Store.set('estudos', data);
        closeModal();
        viewEstudos();
        showToast('Material adicionado!', 'success');
      });
    },
    'del-material'(e, el) {
      confirmModal('Excluir material?', ok => {
        if (!ok) return;
        const data = Store.get('estudos') || DEFAULTS.estudos;
        const subj = data.subjects?.find(s => s.id === el.dataset.subj);
        if (subj) subj.materials = (subj.materials||[]).filter(m => m.id !== el.dataset.mat);
        Store.set('estudos', data);
        viewEstudos();
      });
    },
  });
}

// ——— VIEW: Mídia ———
function viewMidia() {
  const midia = Store.get('midia') || [];
  const filter = sessionStorage.getItem('midiaFilter') || 'wishlist';

  const filtered = midia.filter(m => m.status === filter);

  document.getElementById('view').innerHTML = `
    <div class="between" style="margin-bottom:16px;">
      <div class="tabs">
        <button class="${filter==='wishlist'?'active':''}" data-action="midia-filter" data-val="wishlist">Quero Ver</button>
        <button class="${filter==='consumed'?'active':''}" data-action="midia-filter" data-val="consumed">Já Vi</button>
      </div>
      <button class="btn primary" data-action="add-midia">${icon('plus')} Adicionar</button>
    </div>
    <div class="grid g-3">
      ${filtered.length ? filtered.map(m => `
        <div class="card" style="text-align:center;padding:20px;">
          <div style="font-size:32px;margin-bottom:8px;">${m.type==='movie'?'🎬':m.type==='series'?'📺':'📖'}</div>
          <div style="font-weight:700;font-size:15px;margin-bottom:4px;">${m.title}</div>
          <div class="muted" style="font-size:12px;margin-bottom:8px;">${m.type==='movie'?'Filme':m.type==='series'?'Série':'Livro'}</div>
          ${m.rating ? `<div style="color:var(--gold);font-size:13px;">${'★'.repeat(m.rating)}${'☆'.repeat(5-m.rating)}</div>` : ''}
          <div style="margin-top:10px;display:flex;gap:6px;justify-content:center;">
            <button class="btn sm ghost" data-action="toggle-midia-status" data-id="${m.id}">${filter==='wishlist'?'✅ Vi':'↩ Quero Ver'}</button>
            <button class="icon-btn" data-action="del-midia" data-id="${m.id}">${icon('trash')}</button>
          </div>
        </div>`).join('') : `<div class="center-empty" style="grid-column:1/-1;"><div class="big">${icon('film')}</div><p>Nenhum item ${filter==='wishlist'?'na lista':'consumido'}.</p></div>`}
    </div>`;

  bindActions(document.getElementById('view'), {
    'midia-filter'(e, el) { sessionStorage.setItem('midiaFilter', el.dataset.val); viewMidia(); },
    'add-midia'() {
      openModal(`<div class="modal-head"><div class="mi">${icon('film')}</div><h2>Adicionar Mídia</h2><button class="x">${icon('x')}</button></div>
        <div class="field"><label>Título</label><input class="input" id="md-title" placeholder="Ex: Interestelar"></div>
        <div class="two"><div class="field"><label>Tipo</label><select class="input" id="md-type"><option value="movie">🎬 Filme</option><option value="series">📺 Série</option><option value="book">📖 Livro</option></select></div>
        <div class="field"><label>Nota</label><select class="input" id="md-rating"><option value="0">—</option><option value="1">1 ★</option><option value="2">2 ★★</option><option value="3">3 ★★★</option><option value="4">4 ★★★★</option><option value="5">5 ★★★★★</option></select></div></div>
        <button class="btn primary full" data-action="save-midia">Adicionar</button>`);
      document.querySelector('[data-action=save-midia]')?.addEventListener('click', () => {
        const title = document.getElementById('md-title')?.value.trim();
        if (!title) return showToast('Digite um título.', 'hp');
        const type = document.getElementById('md-type')?.value||'movie';
        const rating = parseInt(document.getElementById('md-rating')?.value)||0;
        const midia = Store.get('midia') || [];
        midia.push({ id:uid(), title, type, status:'wishlist', rating, notes:'' });
        Store.set('midia', midia);
        closeModal();
        viewMidia();
        showToast('Item adicionado!', 'success');
      });
    },
    'toggle-midia-status'(e, el) {
      const midia = Store.get('midia') || [];
      const m = midia.find(x => x.id === el.dataset.id);
      if (!m) return;
      m.status = m.status === 'wishlist' ? 'consumed' : 'wishlist';
      Store.set('midia', midia);
      viewMidia();
    },
    'del-midia'(e, el) {
      confirmModal('Excluir item?', ok => {
        if (!ok) return;
        let midia = Store.get('midia') || [];
        midia = midia.filter(x => x.id !== el.dataset.id);
        Store.set('midia', midia);
        viewMidia();
      });
    },
  });
}

// ——— VIEW: Notas ———
function viewNotas() {
  const notes = Store.get('notes') || [];
  const search = (sessionStorage.getItem('notasSearch')||'').toLowerCase();
  let list = [...notes];
  if (search) list = list.filter(n => n.title.toLowerCase().includes(search) || n.content.toLowerCase().includes(search));
  list.sort((a,b) => (b.pinned?1:0) - (a.pinned?1:0) || (b.updatedAt||'').localeCompare(a.updatedAt||''));

  document.getElementById('view').innerHTML = `
    <div class="between" style="margin-bottom:16px;">
      <div style="display:flex;gap:10px;flex:1;max-width:300px;"><input class="input" id="notas-search" placeholder="Buscar..." value="${search}" style="font-size:13px;"></div>
      <button class="btn primary" data-action="add-note">${icon('plus')} Nota</button>
    </div>
    <div class="grid g-3">
      ${list.length ? list.map(n => `
        <div class="card" style="${n.pinned?'border-color:var(--gold);':''}">
          <div class="between" style="margin-bottom:8px;">
            <div style="font-weight:700;font-size:14px;display:flex;align-items:center;gap:6px;">${n.pinned?'<span style="color:var(--gold);">📌</span>':''}${n.title||'Sem título'}</div>
            <div style="display:flex;gap:4px;">
              <button class="icon-btn" data-action="toggle-pin" data-id="${n.id}">${icon('pin')}</button>
              <button class="icon-btn" data-action="edit-note" data-id="${n.id}">${icon('edit')}</button>
              <button class="icon-btn" data-action="del-note" data-id="${n.id}">${icon('trash')}</button>
            </div>
          </div>
          <div class="muted" style="font-size:13px;white-space:pre-wrap;overflow:hidden;max-height:80px;">${escHtml(n.content||'').slice(0,150)}</div>
          <div class="muted-2" style="font-size:10px;margin-top:10px;">${(n.updatedAt||n.createdAt||'').slice(0,10)}</div>
        </div>`).join('') : `<div class="center-empty" style="grid-column:1/-1;"><div class="big">${icon('file')}</div><p>${search?'Nenhuma nota encontrada.':'Nenhuma nota ainda.'}</p></div>`}
    </div>`;

  document.getElementById('notas-search')?.addEventListener('input', e => {
    sessionStorage.setItem('notasSearch', e.target.value);
    viewNotas();
  });

  bindActions(document.getElementById('view'), {
    'add-note'() { noteModal(); },
    'edit-note'(e, el) { noteModal(el.dataset.id); },
    'toggle-pin'(e, el) {
      const notes = Store.get('notes') || [];
      const n = notes.find(x => x.id === el.dataset.id);
      if (n) { n.pinned = !n.pinned; n.updatedAt = new Date().toISOString(); }
      Store.set('notes', notes);
      viewNotas();
    },
    'del-note'(e, el) {
      confirmModal('Excluir nota?', ok => {
        if (!ok) return;
        let notes = Store.get('notes') || [];
        notes = notes.filter(x => x.id !== el.dataset.id);
        Store.set('notes', notes);
        viewNotas();
      });
    },
  });
}

function noteModal(id) {
  const notes = Store.get('notes') || [];
  const n = id ? notes.find(x => x.id === id) : null;
  openModal(`
    <div class="modal-head"><div class="mi">${icon('file')}</div><h2>${n?'Editar':'Nova'} Nota</h2><button class="x">${icon('x')}</button></div>
    <div class="field"><label>Título</label><input class="input" id="note-title" value="${n?escHtml(n.title):''}" placeholder="Título"></div>
    <div class="field"><label>Conteúdo</label><textarea class="textarea" id="note-content" style="min-height:120px;" placeholder="Escreva algo...">${n?escHtml(n.content):''}</textarea></div>
    <button class="btn primary full" data-action="save-note" data-id="${id||''}">${icon('check')} Salvar</button>`);
  document.querySelector('[data-action=save-note]')?.addEventListener('click', () => {
    const title = document.getElementById('note-title')?.value.trim()||'Sem título';
    const content = document.getElementById('note-content')?.value||'';
    const notes = Store.get('notes') || [];
    if (id) {
      const ex = notes.find(x => x.id === id);
      if (ex) { ex.title = title; ex.content = content; ex.updatedAt = new Date().toISOString(); }
    } else {
      notes.push({ id:uid(), title, content, pinned:false, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString() });
    }
    Store.set('notes', notes);
    closeModal();
    viewNotas();
    showToast(id?'Nota atualizada!':'Nota criada!', 'success');
  });
}

function escHtml(s) { if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ——— VIEW: Conquistas ———
function viewConquistas() {
  const p = Store.get('player');
  const ach = Store.get('achievements');
  const claimed = ach?.claimed || [];

  const canClaim = (a) => {
    if (claimed.includes(a.id)) return false;
    switch (a.id) {
      case 'first_mission': return p.totalMissionsDone >= 1;
      case 'ten_missions': return p.totalMissionsDone >= 10;
      case 'fifty_missions': return p.totalMissionsDone >= 50;
      case 'streak_7': return p.streak >= 7;
      case 'streak_30': return p.streak >= 30;
      case 'level_5': return p.level >= 5;
      case 'level_10': return p.level >= 10;
      case 'first_coin': return p.coins >= 1;
      case 'hoard_100': return p.coins >= 100;
      default: return false;
    }
  };

  document.getElementById('view').innerHTML = `
    <div class="grid g-3">
      ${ACHIEVEMENTS.map(a => {
        const done = claimed.includes(a.id);
        const ready = !done && canClaim(a);
        return `<div class="ach ${done?'done':ready?'':'locked'}">
          ${!done&&!ready?'<div class="atop"><div class="abadge" style="filter:grayscale(1);">🔒</div></div>':`
          <div class="atop"><div class="abadge">${a.icon}</div></div>`}
          <div class="aname">${a.name}</div>
          <div class="adesc">${a.desc}</div>
          <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;">
            <span style="color:var(--gold);font-weight:700;font-size:13px;">${done?'✅ +'+a.reward:ready?'🔓 Disponível':''}</span>
            ${done?'<span class="tag s">concluída</span>':ready?`<button class="btn gold sm" data-action="claim-achievement" data-id="${a.id}">Receber ${a.reward}</button>`:`<span class="muted" style="font-size:11px;">+${a.reward} moedas</span>`}
          </div>
        </div>`;
      }).join('')}
    </div>`;

  bindActions(document.getElementById('view'), {
    'claim-achievement'(e, el) {
      const ach = Store.get('achievements');
      const aId = el.dataset.id;
      const aData = ACHIEVEMENTS.find(x => x.id === aId);
      if (!aData || ach.claimed.includes(aId)) return;
      ach.claimed.push(aId);
      Store.set('achievements', ach);
      addCoins(aData.reward);
      showToast(`🏅 Conquista: ${aData.name}! +${aData.reward} moedas`, 'gold');
      viewConquistas();
    },
  });
}

// ——— VIEW: Temas ———
function viewTemas() {
  const current = (Store.get('settings')||{}).theme || 'violeta';

  const themeStops = {
    violeta: ['#8B5CF6','#A78BFA'], azul: ['#3B82F6','#60A5FA'],
    verde: ['#10B981','#34D399'], rubi: ['#EF4444','#F87171'],
    ouro: ['#F59E0B','#FBBF24'], neon: ['#06B6D4','#22D3EE'],
  };

  document.getElementById('view').innerHTML = `
    <div class="grid g-3">
      ${THEME_NAMES.map(name => {
        const t = THEMES[name];
        const stops = themeStops[name]||['#8B5CF6','#A78BFA'];
        return `<div class="theme-card ${current===name?'active':''}" data-action="apply-theme" data-theme="${name}">
          <div class="theme-prev" style="background:linear-gradient(135deg,${stops[0]},${stops[1]});">
            <span class="dot" style="left:6px;bottom:6px;background:${t['--surface']};border:2px solid ${t['--bg']};"></span>
            <span class="dot" style="left:28px;bottom:6px;background:${t['--primary']};border:2px solid ${t['--bg']};"></span>
          </div>
          <div style="font-weight:700;font-size:14px;text-transform:capitalize;">${name}</div>
          <div class="muted" style="font-size:11px;">${current===name?'✓ ativo':'clique para aplicar'}</div>
        </div>`;
      }).join('')}
    </div>`;

  bindActions(document.getElementById('view'), {
    'apply-theme'(e, el) {
      const name = el.dataset.theme;
      applyTheme(name);
      viewTemas();
      showToast(`Tema "${name}" ativado!`, 'success');
    },
  });
}

// ——— VIEW: Configurações ———
function viewConfiguracoes() {
  const p = Store.get('player');
  const settings = Store.get('settings') || DEFAULTS.settings;

  document.getElementById('view').innerHTML = `
    <div class="card" style="margin-bottom:16px;">
      <h3><span class="accent"></span>Perfil</h3>
      <div class="two">
        <div class="field"><label>Nome</label><input class="input" id="cfg-name" value="${escHtml(p.name)}"></div>
        <div class="field"><label>Avatar (emoji)</label><input class="input" id="cfg-avatar" value="${p.avatar||'😺'}" style="font-size:20px;"></div>
      </div>
      <button class="btn primary" data-action="save-profile">${icon('check')} Salvar Perfil</button>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <h3><span class="accent"></span>Jogo</h3>
      <div class="field">
        <div class="between"><label style="margin:0;cursor:pointer;">Auto-falha (missões não feitas falham no dia seguinte)</label><div class="switch ${settings.hardcoreFail?'on':''}" data-action="toggle-setting" data-key="hardcoreFail"></div></div>
      </div>
      <div class="field">
        <div class="between"><label style="margin:0;cursor:pointer;">Perder vida ao falhar (-10HP por missão)</label><div class="switch ${settings.hardcoreHp?'on':''}" data-action="toggle-setting" data-key="hardcoreHp"></div></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <h3><span class="accent"></span>Backup</h3>
      <div class="row">
        <button class="btn primary" data-action="export-data">${icon('file')} Exportar JSON</button>
        <label class="btn">${icon('upload')||'📂'} Importar JSON<input type="file" accept=".json" data-action="import-data" style="display:none;"></label>
      </div>
    </div>

    <div class="card" style="border-color:rgba(244,85,107,.3);">
      <h3 style="color:var(--danger);"><span class="accent" style="background:var(--danger);"></span>Zona de Perigo</h3>
      <p class="muted" style="font-size:13px;margin-bottom:12px;">Isso vai apagar TODOS os seus dados. Essa ação não pode ser desfeita.</p>
      <button class="btn danger" data-action="reset-all">${icon('trash')} Resetar Tudo</button>
    </div>`;

  bindActions(document.getElementById('view'), {
    'save-profile'() {
      const name = document.getElementById('cfg-name')?.value.trim()||'Aventureiro';
      const avatar = document.getElementById('cfg-avatar')?.value.trim()||'😺';
      const p = Store.get('player');
      p.name = name;
      p.avatar = avatar;
      Store.set('player', p);
      State.changed('player');
      showToast('Perfil salvo!', 'success');
      renderAll();
    },
    'toggle-setting'(e, el) {
      const key = el.dataset.key;
      const s = Store.get('settings') || DEFAULTS.settings;
      s[key] = !s[key];
      Store.set('settings', s);
      viewConfiguracoes();
      const label = key === 'hardcoreFail' ? 'Auto-falha' : key === 'hardcoreHp' ? 'Perder vida' : 'Opção';
      showToast(label + ' ' + (s[key] ? 'ativada' : 'desativada') + '.', '');
    },
    'export-data'() {
      const data = Store.export();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zenite-backup-${today()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Backup exportado!', 'success');
    },
    'import-data'(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          Store.import(data);
          showToast('Dados importados! Recarregando...', 'success');
          setTimeout(() => location.reload(), 1000);
        } catch { showToast('Arquivo inválido.', 'hp'); }
      };
      reader.readAsText(file);
    },
    'reset-all'() {
      confirmModal('TEM CERTEZA? Isso vai apagar TODOS os seus dados!', ok => {
        if (!ok) return;
        confirmModal('Última chance... Confirma o reset completo?', ok2 => {
          if (!ok2) return;
          Store.resetAll();
          showToast('Dados resetados! Recarregando...', 'hp');
          setTimeout(() => location.reload(), 1000);
        });
      });
    },
  });
}

// ——— CLOUD PLACEHOLDER VIEWS ———
function viewSocial() { cloudPlaceholder('Social', 'users'); }
function viewClans() { cloudPlaceholder('Clãs', 'flag'); }
function viewRankings() { cloudPlaceholder('Rankings', 'bar-chart'); }
function cloudPlaceholder(title, ic) {
  document.getElementById('view').innerHTML = `
    <div class="center-empty">
      <div class="big">${icon(ic)}</div>
      <h3 style="margin-bottom:6px;font-weight:700;font-size:18px;">${title}</h3>
      <p>Disponível na fase nuvem.</p>
    </div>`;
}

// ============================================================
// 12. DAILY RESET
// ============================================================
function checkDailyReset() {
  const last = Store.get('lastDailyReset');
  const todayStr = today();
  if (last === todayStr) return;

  console.debug('[DailyReset] last=%s today=%s', last, todayStr);

  const p = Store.get('player');
  const settings = Store.get('settings') || DEFAULTS.settings;
  const missions = Store.get('missions') || [];

  // 1. Apply fail damage for hardcore mode
  applyFailDamage(p, settings, missions, last);

  // 2. Reset daily missions
  resetDailyMissions(missions, todayStr);

  // 3. Check streak continuity
  checkStreakContinuity(p, last, todayStr);

  // 4. Reset daily XP counter
  p.dailyXp = 0;

  Store.set('missions', missions);
  Store.set('player', p);
  Store.set('lastDailyReset', todayStr);
  State.changed('player');
}

function applyFailDamage(p, settings, missions, last) {
  if (!last) return; // first ever run, skip damage
  if (!settings.hardcoreFail) return;
  let hpLost = 0;
  const yesterday = dateSub(1);
  missions.forEach(m => {
    if (!m.done && m.date && m.date <= yesterday && !m.isDaily) {
      if (settings.hardcoreHp) hpLost += 10;
    }
  });
  if (hpLost > 0) {
    p.hp = Math.max(0, p.hp - hpLost);
    showToast(`💔 Perdeu ${hpLost} HP por missões incompletas!`, 'hp');
  }
}

function resetDailyMissions(missions, todayStr) {
  missions.forEach(m => {
    if (m.isDaily && m.done && m.date !== todayStr) {
      m.done = false;
      m.date = todayStr;
    }
  });
}

function checkStreakContinuity(p, last, todayStr) {
  if (!last) return; // first ever run
  // The streak should have been updated yesterday when missions were done
  // Here we only check if the player missed a FULL day (last < yesterday)
  const yesterday = dateSub(1);
  if (last < yesterday) {
    // Check if player has streak freeze
    if (p.streakFreeze > 0) {
      p.streakFreeze--;
      showToast('❄️ Streak congelado! Você foi protegido.', '');
      console.debug('[DailyReset] Streak freeze consumed, remaining=%d', p.streakFreeze);
    } else {
      p.streak = 0;
      console.debug('[DailyReset] Streak reset to 0');
    }
  }
}

// Date helpers
function dateSub(days) {
  return todayInTzOffset(-days);
}
function todayInTzOffset(offsetDays) {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const d = new Date();
    d.setDate(d.getDate() + (offsetDays || 0));
    const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' });
    return formatter.format(d);
  } catch {
    const d = new Date();
    d.setDate(d.getDate() + (offsetDays || 0));
    return d.toISOString().slice(0,10);
  }
}

// ============================================================
// 13. VIEW ROUTER — dispatch
// ============================================================
const VIEW_MAP = {
  dashboard: viewDashboard, campo: viewCampo, personagem: viewPersonagem,
  mercado: viewMercado, habitos: viewHabitos, academia: viewAcademia,
  caverna: viewCaverna, financas: viewFinancas, estudos: viewEstudos,
  midia: viewMidia, notas: viewNotas, conquistas: viewConquistas,
  temas: viewTemas, configuracoes: viewConfiguracoes,
  social: viewSocial, clans: viewClans, rankings: viewRankings,
};

// ============================================================
// 14. INIT — Bootstrap
// ============================================================
function renderAll() {
  const route = Router.getRoute();
  renderTopbar(route);
  renderSidebar(route);

  const viewFn = VIEW_MAP[route];
  if (viewFn) {
    viewFn();
  } else {
    document.getElementById('view').innerHTML = `<div class="center-empty"><div class="big">${icon('grid')}</div><p>Página não encontrada.</p></div>`;
  }

  // Close mobile sidebar when scrim is clicked
  document.getElementById('scrim').onclick = closeSidebarMobile;
}

// State change listener: re-render sidebar on player changes
State.on('change:player', () => {
  const route = Router.getRoute();
  renderSidebar(route);
});

function init() {
  // Initialize store with defaults
  Store.init();

  // Apply saved theme
  const settings = Store.get('settings') || {};
  applyTheme(settings.theme || 'violeta');

  // Run daily reset
  checkDailyReset();

  // Check achievements on load
  checkAchievements();

  // Start router (renders everything)
  Router.init();

  // Expose for debugging
  window.__zenite = { Store, State, Router };
}

document.addEventListener('DOMContentLoaded', init);
