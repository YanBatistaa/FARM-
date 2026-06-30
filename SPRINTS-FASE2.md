# FASE 2 — Sprints de Polimento & Retenção

> Foco em juice, engajamento e qualidade. ~7 sprints para MVP completo.

---

## Sprint 12 — Juice & Animações (#65)

> **Tema:** Feedback visual imediato para cada ação do jogador

| # | Micro-task | Área | Estimativa |
|---|------------|------|------------|
| 12.1 | **XP flutuante** ao ganhar XP: número +20 sobe e some com fade | `[UI]` | 2h |
| 12.2 | **Moeda girando** ao ganhar moedas: animação CSS rotate no ícone | `[UI]` | 1h |
| 12.3 | **Level-up celebration**: confete/partículas CSS ao subir de nível | `[UI]` | 3h |
| 12.4 | **HP flash** ao tomar dano: tela treme, barra de HP pisca vermelho | `[UI]` | 1h |
| 12.5 | **Toast animado**: entrar com slide, ícone colorido por tipo | `[UI]` | 2h |
| 12.6 | **Card de missão**: hover scale sutil, concluir com check animado | `[UI]` | 2h |
| 12.7 | **Progresso de XP**: animação suave na barra (transition: width .5s) | `[UI]` | 1h |

**Total estimado: ~12h**

---

## Sprint 13 — Ligas / Leaderboard (#69)

> **Tema:** Competição semanal com bots locais

| # | Micro-task | Área | Estimativa |
|---|------------|------|------------|
| 13.1 | Estrutura de dados de liga + 5 níveis (Ferro→Diamante) | `[DATA]` | 1h |
| 13.2 | Gerar 10 oponentes-bot com XP fictício aleatório | `[DATA]` | 2h |
| 13.3 | Tabela de ranking com posição, nome, XP, destaque pro jogador | `[UI]` | 3h |
| 13.4 | Lógica de promoção (top3) / rebaixamento (bottom3) semanal | `[ENG]` | 2h |
| 13.5 | Recompensa no fim da semana (moedas + loot box) | `[ENG]` | 2h |
| 13.6 | Contagem regressiva para o fim da semana | `[UI]` | 1h |
| 13.7 | Navegação entre ligas e view dedicada | `[UI]` | 1h |
| 13.8 | Reset semanal automático em checkDailyReset | `[ENG]` | 1h |

**Total estimado: ~13h**

---

## Sprint 14 — Notificações PWA (#72)

> **Tema:** Lembretes diários para manter streak

| # | Micro-task | Área | Estimativa |
|---|------------|------|------------|
| 14.1 | Pedir permissão de notificação no init | `[PWA]` | 1h |
| 14.2 | Configurar horário do lembrete nas Configurações | `[UI]` | 2h |
| 14.3 | Agendar notificação no horário escolhido | `[PWA]` | 3h |
| 14.4 | Notificação de "Streak em risco" se nenhuma missão feita hoje | `[PWA]` | 2h |
| 14.5 | Opt-out toggle nas Configurações | `[UI]` | 1h |
| 14.6 | Badge de notificação quando app não aberto no dia | `[PWA]` | 2h |

**Total estimado: ~11h**

---

## Sprint 15 — Loja Personalizada CRUD (#87)

> **Tema:** Usuário cria suas próprias recompensas

| # | Micro-task | Área | Estimativa |
|---|------------|------|------------|
| 15.1 | Modelo de dados: `customRewards: []` + migrated market | `[DATA]` | 1h |
| 15.2 | Modal de criar recompensa (nome, ícone, custo) | `[UI]` | 2h |
| 15.3 | Lista na viewMercado com seção "Minhas Recompensas" | `[UI]` | 2h |
| 15.4 | Botão "Resgatar": gasta moedas, registra no histórico | `[ENG]` | 2h |
| 15.5 | Histórico de resgates (data + recompensa) | `[UI]` | 2h |
| 15.6 | Templates prontos: "Pausa 30min", "Filme", "Doce" | `[DATA]` | 1h |

**Total estimado: ~10h**

---

## Sprint 16 — Caverna/Foco Forest (#97)

> **Tema:** Timer de foco com árvore que cresce

| # | Micro-task | Área | Estimativa |
|---|------------|------|------------|
| 16.1 | Planta/árvore SVG que cresce conforme tempo passa | `[UI]` | 3h |
| 16.2 | Penalidade ao abandonar sessão (perde XP/moedas) | `[ENG]` | 1h |
| 16.3 | Histórico de foco acumulado no dashboard | `[UI]` | 2h |
| 16.4 | Estatística de horas totais de foco | `[DATA]` | 1h |
| 16.5 | Recompensa de XP ao completar sessão | `[ENG]` | 1h |

**Total estimado: ~8h**

---

## Sprint 17 — Acessibilidade + CI (#108 + #110)

> **Tema:** Inclusão e qualidade de código

| # | Micro-task | Área | Estimativa |
|---|------------|------|------------|
| 17.1 | ARIA labels em todos botões e links interativos | `[UI]` | 3h |
| 17.2 | Foco visível + navegação por Tab em modais | `[UI]` | 2h |
| 17.3 | Contraste adequado nos 6 temas | `[UI]` | 2h |
| 17.4 | `role` e `aria-live` para toasts e updates dinâmicos | `[UI]` | 1h |
| 17.5 | GitHub Actions CI: `npm test` em push/PR | `[CI]` | 2h |
| 17.6 | Smoke test: app carrega sem erro | `[TEST]` | 1h |
| 17.7 | Mais testes unitários do game engine | `[TEST]` | 3h |

**Total estimado: ~14h**

---

## Sprint 18 — Sons + Modo Gentil + Capas (#104 + #105 + #106)

> **Tema:** Experiência sensorial e modos alternativos

| # | Micro-task | Área | Estimativa |
|---|------------|------|------------|
| 18.1 | Sons via Web Audio: click, XP, level-up, dano | `[UI]` | 3h |
| 18.2 | Toggle de som nas Configurações | `[UI]` | 1h |
| 18.3 | Modo Gentil: sem perda de HP, sem streak freeze | `[ENG]` | 3h |
| 18.4 | Capas personalizáveis no Personagem | `[UI]` | 3h |

**Total estimado: ~10h**

---

## Sprint 19+ — Tier 3 (Backend & Social)

> **Tema:** Nuvem, multiplayer e eventos

| Sprint | Features |
|--------|----------|
| 19 | Backend/API + Autenticação (#114) |
| 20 | Sincronização multi-dispositivo (#115) |
| 21 | Amigos, Feed, Friend Streaks (#116) |
| 22 | Clãs/Parties com Boss compartilhado (#117) |
| 23 | Rankings globais, Temporadas (#118) |
| 24 | Eventos sazonais, Crafting, Bad Guys (#70, #89, #77) |
| 25 | Mascote, Hall da Glória, Atalhos (#84, #85, #109) |

---

## Cronograma sugerido

```
Sprint 12: Juice        ────────── (semana 1)
Sprint 13: Ligas        ────────── (semana 2)
Sprint 14: Notificações ────────── (semana 2-3)
Sprint 15: Loja CRUD    ────────── (semana 3)
Sprint 16: Caverna      ────────── (semana 4)
Sprint 17: A11y + CI    ────────── (semana 4-5)
Sprint 18: Som + Outros ────────── (semana 5)
```

---

**Total de micro-tasks: ~42 | Horas estimadas: ~78h**
