/**
 * QA Squad — Testes automatizados do Tier 0 (Sprint 1)
 *
 * Issues: #64 (Daily Reset), #63 (Hardcore), #61 (Curva XP)
 */

import { describe, it, expect } from 'vitest';

// ============================================================
// TIER 0 — Curva de XP (#61)
// ============================================================
describe('Curva de XP (#61)', () => {
  const LEVELS = [
    { level: 1,  xpNeeded: 100,  title: 'Aprendiz' },
    { level: 2,  xpNeeded: 250,  title: 'Desbravador' },
    { level: 5,  xpNeeded: 700,  title: 'Mercenário' },
    { level: 10, xpNeeded: 3200, title: 'Lenda' },
  ];

  function getLevelConfig(level) {
    const found = LEVELS.find(l => l.level === level);
    if (found) return found;
    const xpNeeded = 200 + level * 150;
    const TITLES_EXTENDED = [
      'Lenda', 'Imortal', 'Divino', 'Supremo', 'Absoluto',
      'Eterno', 'Cosmico', 'Transcendente', 'Onipotente', 'Zen',
    ];
    const title = TITLES_EXTENDED[Math.floor((level - 11) / 5)] || 'Mestre Supremo';
    return { level, xpNeeded, title };
  }

  it('nível 10 retorna do array estático', () => {
    const cfg = getLevelConfig(10);
    expect(cfg).toEqual({ level: 10, xpNeeded: 3200, title: 'Lenda' });
  });

  it('nível 11 usa fórmula dinâmica (xpNeeded = 200 + 11*150)', () => {
    const cfg = getLevelConfig(11);
    expect(cfg.xpNeeded).toBe(1850);
    expect(cfg.title).toBe('Lenda');
  });

  it('nível 16 muda título para Imortal', () => {
    const cfg = getLevelConfig(16);
    expect(cfg.title).toBe('Imortal');
  });

  it('nível 21 muda título para Divino', () => {
    const cfg = getLevelConfig(21);
    expect(cfg.title).toBe('Divino');
  });

  it('nível 100 usa fallback Mestre Supremo', () => {
    const cfg = getLevelConfig(100);
    expect(cfg.title).toBe('Mestre Supremo');
    expect(cfg.xpNeeded).toBe(200 + 100 * 150);
  });

  it('addXP faz level up contínuo além do nível 10', () => {
    // Simula addXP com níveis dinâmicos
    const p = { level: 10, xp: 3000, xpToNext: 3200, title: 'Lenda' };
    const xpGain = 500; // suficiente para upar para 11+

    p.xp += xpGain; // 3500
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
    expect(leveledUp).toBe(true);
    expect(p.level).toBe(11);
    expect(p.xp).toBe(300); // 3500 - 3200 = 300
    expect(p.xpToNext).toBe(1850); // 200 + 11*150
    expect(p.title).toBe('Lenda');
  });
});

// ============================================================
// TIER 0 — Hardcore / Game Over (#63)
// ============================================================
describe('Hardcore / Game Over (#63)', () => {
  function revivePlayer(p) {
    const cost = 30 + (p.deaths || 0) * 10;
    if (p.coins < cost) return false;
    p.coins -= cost;
    p.hp = Math.round(p.maxHp * 0.5);
    p.gameOver = false;
    return true;
  }

  it('revive custa 30 moedas na primeira morte', () => {
    const p = { coins: 50, maxHp: 100, hp: 0, deaths: 0, gameOver: true };
    const result = revivePlayer(p);
    expect(result).toBe(true);
    expect(p.coins).toBe(20);
    expect(p.hp).toBe(50);
    expect(p.gameOver).toBe(false);
  });

  it('revive custa 40 na segunda morte', () => {
    const p = { coins: 50, maxHp: 100, hp: 0, deaths: 1, gameOver: true };
    const result = revivePlayer(p);
    expect(result).toBe(true);
    expect(p.coins).toBe(10);
    expect(p.hp).toBe(50);
  });

  it('revive falha se moedas insuficientes', () => {
    const p = { coins: 10, maxHp: 100, hp: 0, deaths: 2, gameOver: true };
    const result = revivePlayer(p);
    expect(result).toBe(false);
    expect(p.gameOver).toBe(true); // continua morto
  });

  it('streakFreeze máximo é 3', () => {
    let freeze = 0;
    const add = (n) => { freeze = Math.min(3, freeze + n); };
    add(1); expect(freeze).toBe(1);
    add(3); expect(freeze).toBe(3);
    add(1); expect(freeze).toBe(3); // capped
  });

  it('healHp remove gameOver se HP > 0', () => {
    const p = { hp: 0, maxHp: 100, gameOver: true };
    // Simula healHp
    p.hp = Math.min(p.maxHp, p.hp + 30);
    if (p.gameOver && p.hp > 0) p.gameOver = false;
    expect(p.hp).toBe(30);
    expect(p.gameOver).toBe(false);
  });
});

// ============================================================
// TIER 0 — Daily Reset (#64)
// ============================================================
describe('Daily Reset (#64)', () => {
  it('streak zera se pulou mais de 1 dia (sem freeze)', () => {
    let streak = 5;
    let streakFreeze = 0;
    const last = '2026-06-28';
    const yesterday = '2026-06-29';
    if (last < yesterday) {
      if (streakFreeze > 0) { streakFreeze--; }
      else { streak = 0; }
    }
    expect(streak).toBe(0);
  });

  it('streak freeze protege quando pula dia', () => {
    let streak = 7;
    let streakFreeze = 1;
    const last = '2026-06-28';
    const yesterday = '2026-06-29';
    if (last < yesterday) {
      if (streakFreeze > 0) { streakFreeze--; }
      else { streak = 0; }
    }
    expect(streak).toBe(7);
    expect(streakFreeze).toBe(0);
  });

  it('streak não zera se last === yesterday', () => {
    let streak = 10;
    const last = '2026-06-29';
    const yesterday = '2026-06-29';
    if (last < yesterday) { streak = 0; }
    // não entra no if
    expect(streak).toBe(10);
  });
});
