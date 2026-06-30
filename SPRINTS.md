# Plano de Sprints — ZÊNITE / FARM

> **12 sprints** (1-2 semanas cada) organizadas por criticidade e área de desenvolvimento.
>
> Cada micro-task tem um código de área: `[ENG]` Engine, `[UI]` Interface, `[DATA]` Dados, `[PWA]` PWA, `[TEST]` Testes, `[ARCH]` Arquitetura.

---

## Sprint 1 — Fundação Estável (Tier 0)

> **Objetivo:** Corrigir bugs críticos que afetam integridade dos dados e quebram o loop do jogo.
>
> **Issues:** [#64](https://github.com/YanBatistaa/FARM-/issues/64) Daily Reset, [#63](https://github.com/YanBatistaa/FARM-/issues/63) Hardcore, [#61](https://github.com/YanBatistaa/FARM-/issues/61) Curva XP

### #64 — Daily Reset Robusto (fuso horário, streak, dano)

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 1.1 | Extrair timezone do usuário via `Intl.DateTimeFormat().resolvedOptions().timeZone` | `[ENG]` | Substituir `Date.now()` por data calculada no fuso local do usuário |
| 1.2 | Criar helper `today(timezoneOffset?)` que retorna YYYY-MM-DD correto | `[ENG]` | Usar `Intl.DateTimeFormat` para evitar erro de virada de dia |
| 1.3 | Corrigir lógica de streak: verificar CONTINUIDADE, não only último dia | `[ENG]` | `checkDailyReset` deve comparar `last` com `today-1`, `today-2`, etc. Se pulou um dia → streak=0 |
| 1.4 | Separar reset de diárias do dano por falha (hoje estão misturados) | `[ENG]` | Criar `resetDailyMissions()` e `applyFailDamage()` como funções separadas |
| 1.5 | Adicionar log de reset no `console.debug` para debug | `[DATA]` | Rastrear quando cada reset acontece |
| 1.6 | Testar cenários: app fechado 3 dias, mudança de fuso, meia-noite | `[TEST]` | Simular datas no console, verificar streak e missões |
| 1.7 | Salvar `lastDailyReset` com fuso horário explícito | `[DATA]` | Adicionar campo opcional `timezone` junto com a data |

**Critério de aceite:** abrir o app depois de 3 dias → streak = 0, diárias resetadas, dano aplicado apenas 1 vez. Mudar fuso não corrompe streak.

### #63 — Modo Hardcore Completo (Game Over + Reviver)

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 2.1 | Adicionar `gameOver` flag no DEFAULTS.player | `[DATA]` | `{ gameOver: false, deaths: 0 }` |
| 2.2 | Criar função `checkDeath()`: se HP=0, seta gameOver=true | `[ENG]` | Chamar após `damageHp()` |
| 2.3 | Criar tela de Game Over (overlay escuro com mensagem "Você caiu em batalha") | `[UI]` | Overlay fullscreen com contador de mortes e botão de reviver |
| 2.4 | Implementar reviver: gastar moedas (ex: 50) para recuperar HP | `[ENG]` | Criar `revivePlayer(cost)` que debita moedas e restaura HP |
| 2.5 | Bloquear ações quando `gameOver=true` (não pode criar missões, etc.) | `[ENG]` | Verificar em `toggleComplete`, `addMission`, `addHabit` |
| 2.6 | Exibir HP baixo com cor e pulsação quando HP < 25% | `[UI]` | Efeito visual no sidebar/status |
| 2.7 | Aviso "⚠️ HP crítico!" no dashboard quando HP < 20 | `[UI]` | Toast/banner no dashboard |
| 2.8 | Adicionar `hardcoreHp` e `hardcoreFail` ao painel de configurações | `[UI]` | Já existem nos settings, verificar se estão visíveis |

**Critério de aceite:** HP chega a 0 → tela de game over → gasta moedas para reviver. Sem moedas, fica travado até ganhar.

### #61 — Curva de XP Contínua (além do nível 10)

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 3.1 | Criar fórmula de XP contínua: `xpNeeded = 200 + level * 150` para level > 10 | `[ENG]` | Ajustar `getLevelConfig()` para níveis acima de 10 |
| 3.2 | Gerar títulos dinâmicos para níveis 11-20 | `[DATA]` | Array `TITLES_EXTENDED` ou fórmula de título |
| 3.3 | Garantir que `showLevelUp()` funcione para qualquer nível | `[UI]` | Animação de level-up não deve quebrar acima de 10 |
| 3.4 | Atualizar `checkAchievements` com conquistas para nível 20, 30, 50 | `[DATA]` | Adicionar `level_20`, `level_50` em ACHIEVEMENTS |
| 3.5 | Mostrar XP restante no sidebar e dashboard | `[UI]` | Barra de progresso com "Faltam X XP para o próximo nível" |
| 3.6 | (Opcional) Prestígio/Rebirth: resetar level mas ganhar badge permanente | `[ENG]` | Feature extra se sobrar tempo |

**Critério de aceite:** passar do nível 10 sem travamento, barra de progresso correta, títulos contínuos.

---

## Sprint 2 — Features com Estrutura Pronta (Tier 1A)

> **Objetivo:** Implementar features que já têm CSS/suporte no modelo de dados.
>
> **Issues:** [#81](https://github.com/YanBatistaa/FARM-/issues/81) Custom Skills, [#93](https://github.com/YanBatistaa/FARM-/issues/93) Água, [#78](https://github.com/YanBatistaa/FARM-/issues/78) Calendário

### #81 — UI de Habilidades Customizadas

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 4.1 | Criar modal de criação de skill (nome + ícone) | `[UI]` | Modal em `viewConfiguracoes` com campo texto + seletor de ícone |
| 4.2 | Salvar em `player.customSkills[]` | `[DATA]` | Cada skill: `{ id, name, icon, level, xp }` |
| 4.3 | Exibir skills custom no radar do Personagem | `[UI]` | Incluir na `viewPersonagem` abaixo das skills padrão |
| 4.4 | Associar skill custom a uma missão no formulário de criação | `[UI]` | Dropdown no modal de missão inclui skills custom |
| 4.5 | Incrementar XP da skill custom ao concluir missão associada | `[ENG]` | Em `toggleComplete`, adicionar XP à skill vinculada |
| 4.6 | Editar/excluir skills custom | `[UI]` | Botão de editar e excluir na lista |
| 4.7 | Validar limite máximo de skills (ex: 20) | `[ENG]` | Impedir criação acima do limite |

**Critério de aceite:** criar skill, associar a missão, concluir missão, ver skill subir de nível.

### #93 — Água / Hidratação (8 copos)

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 5.1 | Adicionar `agua` ao DEFAULTS: `{ copos: 0, meta: 8, historico: {} }` | `[DATA]` | Modelo de dados do tracker de água |
| 5.2 | Criar view/componente de água (ou integrar em hábitos) | `[UI]` | Botões +250ml, +500ml, progresso visual (copo enchendo) |
| 5.3 | Usar classes CSS `.water-btns` já existentes em styles.css | `[UI]` | Verificar se precisa de ajustes no CSS |
| 5.4 | Salvar progresso diário e resetar ao virar o dia | `[DATA]` | `agua.historico[YYYY-MM-DD] = copos` |
| 5.5 | Conceder XP/moedas ao bater a meta | `[ENG]` | Pequena recompensa ao atingir meta do dia |
| 5.6 | Barra de progresso circular ou horizontal no dashboard | `[UI]` | Widget opcional no dashboard |

**Critério de aceite:** registrar copos, ver progresso, resetar no dia seguinte, ganhar XP ao bater meta.

### #78 — Calendário de Produtividade

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 6.1 | Criar componente de calendário mensal | `[UI]` | Grid de dias, navegação entre meses |
| 6.2 | Usar classes CSS `.cal` já existentes em styles.css | `[UI]` | Adaptar CSS `.cal` ao novo componente |
| 6.3 | Marcar dias com missões concluídas (bolinha verde) | `[UI]` | Mapear `missions[].done` por data |
| 6.4 | Marcar streak no calendário com cor diferente (fogo) | `[UI]` | Dias consecutivos com destaque |
| 6.5 | Ao clicar num dia, mostrar lista de missões daquele dia | `[UI]` | Modal ou expansão inline |
| 6.6 | Missões com prazo: distribuir visualmente no intervalo | `[UI]` | Missão com `startDate`-`dueDate` aparece em todos os dias |
| 6.7 | Adicionar calendário como view ou widget do dashboard | `[UI]` | Definir onde exibir (talvez nova view ou seção no dashboard) |

**Critério de aceite:** calendário mostra dias do mês, missões concluídas, streak, e clicar revela detalhes.

---

## Sprint 3 — Retenção (Tier 1B)

> **Objetivo:** Implementar os maiores motores de retenção do Duolingo.
>
> **Issues:** [#67](https://github.com/YanBatistaa/FARM-/issues/67) Streak Freeze, [#68](https://github.com/YanBatistaa/FARM-/issues/68) Meta Diária

### #67 — Streak Freeze (Proteção de Ofensiva)

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 7.1 | Adicionar `streakFreeze: 0` ao DEFAULTS.player | `[DATA]` | Número de freezes disponíveis |
| 7.2 | Criar item "Congelar Ofensiva" no Mercado (preço: 30 moedas) | `[DATA]` | Adicionar ao `market.items[]` |
| 7.3 | Ao perder um dia de streak, consumir freeze em vez de zerar | `[ENG]` | Em `checkDailyReset`: se freeze > 0, decrementa e mantém streak |
| 7.4 | Indicador visual no sidebar: "❄️ Freeze ativo" | `[UI]` | Mostrar ícone de freeze quando disponível |
| 7.5 | Toast informativo: "❄️ Seu congelar ofensiva protegeu seu streak!" | `[UI]` | Notificação quando freeze é consumido |
| 7.6 | Limitar freezes acumuláveis (max 3) | `[ENG]` | Não deixar acumular mais que o limite |

**Critério de aceite:** perder 1 dia com freeze → streak mantido. Sem freeze → streak = 0.

### #68 — Meta Diária de XP Configurável

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 8.1 | Adicionar `dailyXpGoal: 100` ao DEFAULTS.settings | `[DATA]` | Meta padrão configurável pelo usuário |
| 8.2 | Rastrear XP diário: `dailyXp: 0` com reset em `checkDailyReset` | `[DATA]` | Novo campo no player ou store separada |
| 8.3 | Criar seção de configuração da meta (50/100/150/200 XP) | `[UI]` | `viewConfiguracoes` com seletor de meta |
| 8.4 | Anel/barra de progresso diário no Dashboard | `[UI]` | Círculo de progresso "XP hoje / Meta" |
| 8.5 | Bônus ao bater a meta: multiplicador de 1.5x na próxima missão | `[ENG]` | Primeira missão do dia seguinte rende mais |
| 8.6 | Estatística de dias consecutivos batendo a meta | `[DATA]` | `metaStreak` para futura conquista |
| 8.7 | Toast "🎯 Meta diária batida!" com recompensa | `[UI]` | Feedback imediato ao atingir meta |

**Critério de aceite:** meta configurável, progresso visível, bônus ao atingir.

---

## Sprint 4 — Qualidade de Vida (Tier 1C)

> **Objetivo:** Melhorar a primeira impressão e corrigir comportamento de tarefas.
>
> **Issues:** [#103](https://github.com/YanBatistaa/FARM-/issues/103) Onboarding, [#91](https://github.com/YanBatistaa/FARM-/issues/91) Balanceamento, [#74](https://github.com/YanBatistaa/FARM-/issues/74) Tipos de Tarefa, [#75](https://github.com/YanBatistaa/FARM-/issues/75) Intervalo de Datas

### #103 — Onboarding Gamificado

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 9.1 | Detectar primeiro acesso: `player.totalMissionsDone === 0 && !onboardingDone` | `[ENG]` | Flag `onboardingDone` no player |
| 9.2 | Tela 1: "Qual seu nome?" + seletor de avatar | `[UI]` | Input nome + grid de avatares |
| 9.3 | Tela 2: "Escolha suas forças" (3 skills iniciais) | `[UI]` | Selecionar 3 áreas de habilidade |
| 9.4 | Tela 3: "Sua primeira missão" — criar missão guiada | `[UI]` | Formulário simplificado: nome + dificuldade |
| 9.5 | Tela 4: Explicação rápida (XP, moedas, HP, streak) | `[UI]` | 4 cards swipeáveis ou sequência |
| 9.6 | Pular onboarding se já completou (nunca mais mostrar) | `[ENG]` | Verificar `onboardingDone` no `init()` |
| 9.7 | Bônus de boas-vindas: 50 XP + 10 moedas | `[ENG]` | Recompensa ao terminar onboarding |

**Critério de aceite:** novo usuário cria herói e primeira missão em < 1 minuto.

### #91 — Balanceamento Anti-Abuso

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 10.1 | Revisar ganhos de XP/moedas por dificuldade | `[ENG]` | `DIFFICULTIES` está balanceado? Fácil: 20xp/3coins — Díficil: 70xp/10coins |
| 10.2 | Adicionar teto diário de XP (ex: 500xp/dia) | `[ENG]` | Opcional, para evitar grind infinito |
| 10.3 | Revisar preços da loja vs. ganhos médios | `[ENG]` | Poção 15 moedas — quantas missões para comprar? |
| 10.4 | Preços crescentes de itens (recompra fica mais cara) | `[ENG]` | Inflação controlada para itens recomprados |
| 10.5 | Documentar tabela de economia no README | `[DOC]` | "Ganhos por ação" e "Preços de referência" |

**Critério de aceite:** progressão sente-se merecida, não trivial. Economia documentada.

### #74 — Três Tipos de Tarefa

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 11.1 | Adicionar campo `type: 'mission' | 'daily' | 'habit'` no modelo | `[DATA]` | Tipo da tarefa no DEFAULTS |
| 11.2 | Hábitos (+/−): botões de reforço positivo e negativo | `[UI]` | Hábito bom: + XP. Hábito ruim: - HP |
| 11.3 | Diárias: recorrentes com dias da semana selecionáveis | `[UI]` | Checkboxes (Seg, Ter, Qua...) |
| 11.4 | To-Dos: tarefas únicas com prazo opcional | `[UI]` | Comportamento atual (sem recorrência) |
| 11.5 | Abas/filtros no Campo para cada tipo | `[UI]` | "Todas | Missões | Diárias | Hábitos" |
| 11.6 | Recompensa/penalidade diferente por tipo | `[ENG]` | Hábito: XP pequeno, sem moeda. Diária: XP + moeda. Missão: XP alto + moeda |

**Critério de aceite:** criar e gerenciar os 3 tipos com regras próprias de recompensa.

### #75 — Missões com Intervalo de Datas

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 12.1 | Adicionar campo `startDate` ao modelo de missão | `[DATA]` | Data de início (opcional) |
| 12.2 | Filtrar missões não ativas: `today < startDate` → ocultar | `[UI]` | Missão não aparece antes do startDate |
| 12.3 | Badge "📅 Vence hoje" em missões com prazo = hoje | `[UI]` | Tag visual no card da missão |
| 12.4 | Badge "⚠️ Atrasada" em missões com prazo < today | `[UI]` | Missão vencida mas não concluída |
| 12.5 | No daily reset, aplicar dano apenas a missões atrasadas (não às futuras) | `[ENG]` | `startDate <= today < dueDate` para aplicar dano |

**Critério de aceite:** missão com prazo dia 12 criada no dia 1 aparece de 1 a 12, badge de vencimento correto.

---

## Sprint 5 — Economia & Recompensas (Tier 2A)

> **Objetivo:** Economia rica com recompensa variável (Octalysis Drive 7).
>
> **Issues:** [#62](https://github.com/YanBatistaa/FARM-/issues/62) Loot Box, [#87](https://github.com/YanBatistaa/FARM-/issues/87) Loja, [#90](https://github.com/YanBatistaa/FARM-/issues/90) Poções, [#88](https://github.com/YanBatistaa/FARM-/issues/88) Baús

### #62 — Recompensa Variável / Loot Box

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 13.1 | Definir tabela de drops: 70% moeda, 20% item, 8% poção, 2% raro | `[ENG]` | Objeto `LOOT_TABLE` com pesos |
| 13.2 | Sortear recompensa extra ao concluir missão (chance base: 25%) | `[ENG]` | Em `toggleComplete`, rolar dado |
| 13.3 | Animação de baú abrindo (CSS keyframes) | `[UI]` | Baú que treme e abre com brilho |
| 13.4 | Toast de "🎁 Recompensa extra!" com o item sorteado | `[UI]` | Notificação com nome e ícone do drop |
| 13.5 | Configurar probabilidade em CONSTANTS para fácil balanceamento | `[DATA]` | `LOOT_CHANCE: 0.25` em constantes |

**Critério de aceite:** ~25% das conclusões geram recompensa-surpresa visível.

### #87 — Loja de Recompensas Personalizadas

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 14.1 | CRUD de recompensa: modal criar (nome, ícone, custo) | `[UI]` | Formulário em viewMercado |
| 14.2 | Lista de recompensas criadas pelo usuário | `[UI]` | Grid cards na loja |
| 14.3 | Botão "Resgatar": gasta moedas, registra no histórico | `[ENG]` | `spendCoins()` + log |
| 14.4 | Histórico de resgates (data + recompensa) | `[UI]` | Lista cronológica |
| 14.5 | Modelos prontos: "30min de pausa", "Assistir filme", "Comer algo gostoso" | `[DATA]` | Seed data inicial |

**Critério de aceite:** criar, resgatar e ver histórico de recompensas.

### #90 — Poções e Itens Utilitários

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 15.1 | Poção de cura: comprar e usar recupera HP | `[ENG]` | Já existe, verificar se funciona corretamente |
| 15.2 | Poção grande: recupera 100% HP (custo: 40) | `[DATA]` | Novo item no mercado |
| 15.3 | Item "XP Boost": dobra XP por 30 minutos | `[ENG]` | Timer de boost, multiplicador em `addXP()` |
| 15.4 | Item "Congelar Ofensiva": +1 freeze (link com #67) | `[DATA]` | Item no mercado que incrementa `streakFreeze` |
| 15.5 | Inventário: tela de itens comprados com uso/equipar | `[UI]` | Grid de itens no Personagem |

**Critério de aceite:** itens compráveis, consumíveis, com efeito real no jogo.

### #88 — Loot Boxes com Raridade

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 16.1 | Baú comprável: 3 tiers (Bronze 20moedas, Prata 50, Ouro 100) | `[DATA]` | Items no mercado com preço |
| 16.2 | Tabela de loot por tier (Bronze: 60% moeda, 30% item, 10% poção) | `[ENG]` | `LOOT_BOX_TIERS` com distribuição |
| 16.3 | Raridades: Comum (branco), Raro (azul), Épico (roxo) com cores | `[DATA]` | Sistema de raridade com pesos |
| 16.4 | Animação de abertura com revelação | `[UI]` | Baú que abre com particle effect |
| 16.5 | Garantia: a cada 10 baús sem épico, próximo é épico (pity system) | `[ENG]` | Contador de pity |

**Critério de aceite:** abrir baú dá recompensa aleatória ponderada, pity system funciona.

---

## Sprint 6 — Personagem & Progressão (Tier 2B)

> **Objetivo:** Aprofundar a identidade do personagem.
>
> **Issues:** [#82](https://github.com/YanBatistaa/FARM-/issues/82) Atributos, [#83](https://github.com/YanBatistaa/FARM-/issues/83) Avatar/Gear, [#79](https://github.com/YanBatistaa/FARM-/issues/79) Subtarefas

### #82 — Atributos por Categoria

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 17.1 | Mapear categorias → atributos (Disciplina, Foco, Inteligência, Shape) | `[DATA]` | Objeto `CATEGORY_ATTR_MAP` |
| 17.2 | Incrementar atributo ao concluir tarefa da categoria | `[ENG]` | Em `toggleComplete`, +1 no atributo |
| 17.3 | Barras de atributo na viewPersonagem | `[UI]` | Barras horizontais com nome e nível |
| 17.4 | Bônus de atributo alto: desconto na loja (ex: Disciplina 10 → -10% preço) | `[ENG]` | Benefício por atributo elevado |

**Critério de aceite:** concluir tarefas sobe os atributos certos, barras visíveis.

### #83 — Avatar com Gear

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 18.1 | Criar slots de gear: cabeça, corpo, arma, acessório | `[DATA]` | `player.gear = { head: null, body: null, weapon: null, accessory: null }` |
| 18.2 | Itens de visual: adicionar categoria "cosmético" no mercado | `[DATA]` | Itens com slot + SVG/emoji |
| 18.3 | Avatar reflete gear equipado (troca emoji/SVG) | `[UI]` | Se equipar espada, avatar mostra espada |
| 18.4 | Galeria de equipamentos desbloqueados | `[UI]` | Grid no Personagem |

**Critério de aceite:** equipar item muda aparência do avatar.

### #79 — Subtarefas / Checklists

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 19.1 | Adicionar `subtasks: []` ao modelo de missão | `[DATA]` | `{ name, done }` dentro de cada missão |
| 19.2 | UI de checklists no modal de detalhes da missão | `[UI]` | Lista com checkboxes |
| 19.3 | Progresso parcial (3/5) no card da missão | `[UI]` | Badge "3/5" no card |
| 19.4 | XP proporcional: concluir todas = XP cheio, parciais = XP parcial | `[ENG]` | `xpReward * (doneCount / totalCount)` |

**Critério de aceite:** criar subtarefas, marcar progresso, XP proporcional.

---

## Sprint 7 — Engajamento & Competição Local (Tier 2C)

> **Objectivo:** Sistema de competição local e notificações.
>
> **Issues:** [#71](https://github.com/YanBatistaa/FARM-/issues/71) Combos, [#69](https://github.com/YanBatistaa/FARM-/issues/69) Ligas, [#72](https://github.com/YanBatistaa/FARM-/issues/72) Notificações

### #71 — Combos e Bônus de Momentum

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 20.1 | Rastrear missões consecutivas no mesmo dia | `[DATA]` | `dailyCombo: 0` no player |
| 20.2 | Incrementar combo a cada missão concluída no dia | `[ENG]` | `addXP(amount * (1 + combo * 0.1))` |
| 20.3 | Resetar combo ao virar o dia | `[ENG]` | Em `checkDailyReset`, zerar dailyCombo |
| 20.4 | Feedback visual de combo (x2, x3, x4) no toast | `[UI]` | Toast "🔥 Combo x3! +30% XP" |
| 20.5 | Item "XP em dobro" temporário (30 min de 2x XP) | `[ENG]` | Usar do inventário (#15.3) |

**Critério de aceite:** sequência no mesmo dia rende bônus crescente, feedback visível.

### #69 — Ligas / Leaderboard Semanal

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 21.1 | Estrutura de liga: nome, posições, prêmio | `[DATA]` | `liga = { rank, players: [...bots], prize }` |
| 21.2 | Gerar 10 oponentes-bot com XP fictício | `[DATA]` | `BOT_NAMES` + XP aleatório semanal |
| 21.3 | Tabela de liga com posição, nome, XP | `[UI]` | View ranking com destaque para o jogador |
| 21.4 | Promoção (top 3) / rebaixamento (bottom 3) no fim da semana | `[ENG]` | Ao reset semanal, ajustar liga |
| 21.5 | 5 ligas: Ferro → Bronze → Prata → Ouro → Diamante | `[DATA]` | Progressão de ligas |
| 21.6 | Recompensa no fim da semana (moedas + loot box) | `[ENG]` | Prêmio por posição |
| 21.7 | Contagem regressiva para o fim da semana | `[UI]` | Timer "Faltam 3 dias 12h" |

**Critério de aceite:** ranking semanal com bots, promoção/rebaixamento, prêmio.

### #72 — Notificações PWA

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 22.1 | Pedir permissão de notificação no init | `[PWA]` | `Notification.requestPermission()` |
| 22.2 | Lembrete diário configurável (horário) | `[PWA]` | Input de hora nas Configurações |
| 22.3 | Disparar notificação no horário escolhido | `[PWA]` | `showNotification()` com service worker |
| 22.4 | Notificação de "Sua ofensiva está em risco" no fim do dia | `[PWA]` | Se streak > 0 e nenhuma missão concluída hoje |
| 22.5 | Opt-out nas configurações | `[UI]` | Toggle "Ativar notificações" |

**Critério de aceite:** notificação dispara no horário configurado (app instalado).

---

## Sprint 8 — Módulos de Produtividade (Tier 2D — Lote 1)

> **Objetivo:** Finanças, Academia e Estudos com integração ao jogo.
>
> **Issues:** [#94](https://github.com/YanBatistaa/FARM-/issues/94) Finanças, [#95](https://github.com/YanBatistaa/FARM-/issues/95) Academia, [#96](https://github.com/YanBatistaa/FARM-/issues/96) Estudos

### #94 — Finanças com Gráficos

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 23.1 | Gráfico de despesas por categoria (pizza) via Canvas/SVG | `[UI]` | Criar gráfico simples sem lib externa |
| 23.2 | Limite mensal por categoria com alerta | `[DATA]` | `financas.budgets = { Alimentação: 800, ... }` |
| 23.3 | Visão mensal: receitas vs despesas por mês | `[UI]` | Tabela com saldo mensal |
| 23.4 | Visão anual: acumulado por mês | `[UI]` | Gráfico de barras 12 meses |
| 23.5 | Adicionar campo `month` para filtrar transações | `[DATA]` | `transactions[].month = YYYY-MM` |

**Critério de aceite:** ver para onde o dinheiro vai, alertas de limite.

### #95 — Academia com Histórico

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 24.1 | Log de treinos por data com histórico | `[DATA]` | `academy.log = [{ date, exercises: [...] }]` |
| 24.2 | Progressão de carga/reps no tempo | `[UI]` | Gráfico simples de evolução por exercício |
| 24.3 | Estatísticas: frequência semanal/mensal | `[UI]` | Dias de treino por período |
| 24.4 | XP ao concluir treino | `[ENG]` | Recompensa por treino completo |

**Critério de aceite:** acompanhar evolução física no tempo.

### #96 — Estudos com Pomodoro Integrado

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 25.1 | Botão "Estudar agora" na viewEstudos → inicia Pomodoro | `[UI]` | Link entre viewEstudos e viewCaverna |
| 25.2 | Tracking de tempo por matéria | `[DATA]` | `estudos.timeTracked = { materia: minutos }` |
| 25.3 | Gráfico de tempo por matéria | `[UI]` | Pizza ou barras |
| 25.4 | Progresso de conclusão de materiais da matéria | `[UI]` | "3/10 materiais concluídos" |

**Critério de aceite:** foco e estudo conectados com tempo por matéria.

---

## Sprint 9 — Produtividade + Juice (Tier 2D/2E)

> **Objetivo:** Finalizar módulos de produtividade e melhorar feedback visual.
>
> **Issues:** [#97](https://github.com/YanBatistaa/FARM-/issues/97) Caverna, [#98](https://github.com/YanBatistaa/FARM-/issues/98) Notas, [#99](https://github.com/YanBatistaa/FARM-/issues/99) Mídia, [#65](https://github.com/YanBatistaa/FARM-/issues/65) Juice

### #97 — Caverna/Foco estilo Forest

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 26.1 | Sessão de foco com elemento visual que "cresce" | `[UI]` | Planta/árvore/animação que cresce durante o timer |
| 26.2 | Penalidade ao abandonar sessão (perde XP/moedas) | `[ENG]` | Se fechar antes do fim, penalidade |
| 26.3 | Histórico de foco acumulado no dashboard | `[UI]` | "Total de X horas de foco" |

**Critério de aceite:** foco com recompensa visual e custo ao desistir.

### #98 — Notas com Categorias e Markdown

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 27.1 | Pastas/categorias para organizar notas | `[DATA]` | `notes.categories = ['Pessoal', 'Trabalho', 'Ideias']` |
| 27.2 | Suporte básico a Markdown (negrito, itálico, listas) | `[UI]` | Renderizar markdown simples sem lib |
| 27.3 | Alternar preview vs edição | `[UI]` | Aba "Editar" / "Visualizar" |

**Critério de aceite:** organizar notas por pasta e formatar texto.

### #99 — Mídia com Filtros

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 28.1 | Filtro por tipo (filme/série/livro) | `[UI]` | Dropdown ou abas na viewMidia |
| 28.2 | Campo de notas por item | `[DATA]` | `midia[].notes` |
| 28.3 | Ordenar por nota/data | `[UI]` | Botões de ordenação |

**Critério de aceite:** encontrar e organizar mídia por tipo e avaliação.

### #65 — Polir 'Juice' (Animações)

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 29.1 | Partículas/contador animado ao ganhar XP | `[UI]` | Número flutuando + sumindo (+20 XP) |
| 29.2 | Moeda girando ao ganhar moedas | `[UI]` | Animação de moeda |
| 29.3 | Flash de HP ao tomar dano (tela treme/vibrar) | `[UI]` | CSS animation na barra de HP |
| 29.4 | Toast animado ao desbloquear conquista | `[UI]` | Já existe, melhorar transição |

**Critério de aceite:** toda recompensa tem feedback visual imediato.

---

## Sprint 10 — Qualidade & Métricas (Tier 2E)

> **Objetivo:** Expandir conquistas e adicionar testes.
>
> **Issues:** [#101](https://github.com/YanBatistaa/FARM-/issues/101) Conquistas, [#102](https://github.com/YanBatistaa/FARM-/issues/102) Estatísticas, [#108](https://github.com/YanBatistaa/FARM-/issues/108) Acessibilidade, [#110](https://github.com/YanBatistaa/FARM-/issues/110) Testes

### #101 — Expandir Conquistas

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 30.1 | Categorizar conquistas: Recordes Pessoais vs Prêmios | `[DATA]` | Separar em dois arrays ou adicionar campo `type` |
| 30.2 | Novas conquistas: foco (10h, 50h), finanças (economizar 500), academia (30 treinos) | `[DATA]` | Expandir ACHIEVEMENTS |
| 30.3 | Barras de progresso nas conquistas | `[UI]` | "3/10 missões" |
| 30.4 | Recompensa em moeda/cosmético ao desbloquear | `[ENG]` | Moedas + item cosmético |

**Critério de aceite:** painel de conquistas rico com progresso.

### #102 — Estatísticas e Recordes

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 31.1 | Recordes: maior streak, mais XP num dia, mais moedas acumuladas | `[DATA]` | `player.records = {}` |
| 31.2 | Gráfico de evolução do personagem (nível ao longo do tempo) | `[UI]` | Canvas chart simples |
| 31.3 | Resumo semanal: missões concluídas, XP ganho, moedas gastas | `[UI]` | Card no dashboard |
| 31.4 | Nova view "Estatísticas" | `[UI]` | Rota + view |

**Critério de aceite:** evolução visível em números e gráficos.

### #108 — Acessibilidade

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 32.1 | ARIA labels em todos os botões e links | `[UI]` | `aria-label` nos elementos interativos |
| 32.2 | Foco visível e navegação por teclado (Tab, Enter, Escape) | `[UI]` | Outline de foco + trap em modais |
| 32.3 | Contraste adequado em todos os 6 temas | `[UI]` | Verificar WCAG AA |
| 32.4 | `role` e `aria-live` para toasts e atualizações dinâmicas | `[UI]` | Regiões live para leitores de tela |

**Critério de aceite:** navegável por teclado e leitor de tela.

### #110 — Testes Automatizados + CI

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 33.1 | Configurar ambiente de teste (Node + Vitest) | `[TEST]` | `npm init -y && npm i vitest` |
| 33.2 | Smoke test: app carrega sem erro no console | `[TEST]` | Teste que importa app.js e verifica init |
| 33.3 | Testes do Game Engine: addXP, addCoins, damageHp, levelUp | `[TEST]` | Testes unitários das funções puras |
| 33.4 | Testes do Daily Reset: streak, dano, fuso horário | `[TEST]` | Simular datas e verificar comportamento |
| 33.5 | Workflow CI (GitHub Actions) que roda testes em push/PR | `[CI]` | `.github/workflows/ci.yml` |

**Critério de aceite:** `npm test` roda todos os testes, CI verde em PRs.

---

## Sprint 11 — Arquitetura & Performance (Tier 2E)

> **Objetivo:** Refatorar monólito e melhorar PWA.
>
> **Issues:** [#111](https://github.com/YanBatistaa/FARM-/issues/111) Refatorar, [#112](https://github.com/YanBatistaa/FARM-/issues/112) PWA Polish

### #111 — Refatorar app.js em Módulos

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 34.1 | Criar estrutura `/src/`: engine.js, store.js, ui.js, views/, router.js | `[ARCH]` | Separação de responsabilidades |
| 34.2 | Extrair Store + State para `src/store.js` | `[ARCH]` | ~180 linhas movidas |
| 34.3 | Extrair Game Engine (XP, moedas, HP, level) para `src/engine.js` | `[ARCH]` | Funções puras do jogo |
| 34.4 | Extrair Router + UI System para `src/router.js` e `src/ui.js` | `[ARCH]` | Router, toasts, modais |
| 34.5 | Extrair views para `src/views/` (um arquivo por view) | `[ARCH]` | viewDashboard.js, viewCampo.js, etc. |
| 34.6 | Configurar build simples (bundler opcional, manter PWA) | `[ARCH]` | ES modules nativos ou bundler leve |
| 34.7 | Verificar que tudo funciona sem mudança de comportamento | `[TEST]` | Smoke test pós-refatoração |

**Critério de aceite:** mesma funcionalidade, código modular em `/src/`.

### #112 — Performance & PWA Polish

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 35.1 | Auditar com Lighthouse (PWA/perf/a11y) | `[PWA]` | Rodar e documentar resultados |
| 35.2 | Revisar estratégia de cache do sw.js | `[PWA]` | Cache-first para assets, network-first para dados |
| 35.3 | Garantir 100% offline (sem erros no console) | `[PWA]` | Testar com DevTools offline |
| 35.4 | Estratégia de atualização de versão detectando mudanças | `[PWA]` | `sw.js` version check |
| 35.5 | Splash screen e ícones em todos os tamanhos | `[PWA]` | Manifest completo |

**Critério de aceite:** Lighthouse PWA ≥ 90, funcionando 100% offline.

---

## Sprint 12+ — Social & Nuvem (Tier 3)

> **Objetivo:** Backend, sincronização e features multiplayer.
>
> **Issues:** [#114-#118](https://github.com/YanBatistaa/FARM-/issues/114) Épico 9

### #114-#118 — Backend + Social

| # | Micro-task | Área | Descrição |
|---|------------|------|-----------|
| 36.1 | Escolher stack: Supabase ou Node/Express | `[BACKEND]` | Decisão arquitetural |
| 36.2 | API REST: endpoints para player, missões, loja | `[BACKEND]` | CRUD básico |
| 36.3 | Adaptar Store para trocar localStorage por API (mesma interface) | `[ARCH]` | Store.api vs Store.local |
| 36.4 | Autenticação (email + Google OAuth) | `[BACKEND]` | Login/register |
| 36.5 | Sincronização multi-dispositivo com resolução de conflitos | `[BACKEND]` | Offline-first sync |
| 36.6 | Amigos: adicionar, feed de atividade | `[SOCIAL]` | |
| 36.7 | Friend streaks e desafios | `[SOCIAL]` | |
| 36.8 | Clãs/parties com boss compartilhado | `[SOCIAL]` | |
| 36.9 | Rankings globais com temporadas | `[SOCIAL]` | |

**Critério de aceite:** dados na nuvem, multiplayer funcional.

### Features Extras (Tier 3 — Lote 3B/3C)

| # | Micro-task | Área | Issue |
|---|------------|------|-------|
| 37.1 | Boss Fights: lore, dificuldade, recompensa épica | `[ENG/UI]` | [#76](https://github.com/YanBatistaa/FARM-/issues/76) |
| 37.2 | Bad Guys + Power-Ups (SuperBetter) | `[ENG/UI]` | [#77](https://github.com/YanBatistaa/FARM-/issues/77) |
| 37.3 | Mascote/Pet que evolui (modo gentil) | `[UI]` | [#84](https://github.com/YanBatistaa/FARM-/issues/84) |
| 37.4 | Hall da Glória com títulos | `[UI]` | [#85](https://github.com/YanBatistaa/FARM-/issues/85) |
| 37.5 | Eventos sazonais com recompensa exclusiva | `[ENG/UI]` | [#70](https://github.com/YanBatistaa/FARM-/issues/70) |
| 37.6 | Crafting: receitas (A+B → C) | `[ENG/UI]` | [#89](https://github.com/YanBatistaa/FARM-/issues/89) |
| 37.7 | Modo Gentil (sem punição) | `[ENG]` | [#104](https://github.com/YanBatistaa/FARM-/issues/104) |
| 37.8 | Capas personalizáveis (GIF) | `[UI]` | [#105](https://github.com/YanBatistaa/FARM-/issues/105) |
| 37.9 | Sons (Web Audio) + Modo noturno | `[UI]` | [#106](https://github.com/YanBatistaa/FARM-/issues/106) |
| 37.10 | Atalhos de teclado | `[UI]` | [#109](https://github.com/YanBatistaa/FARM-/issues/109) |

---

## 📊 Resumo por Sprint

| Sprint | Tier | Issues | Micro-tasks | Foco |
|--------|------|--------|-------------|------|
| 1 | 🔴 0 | 3 | 19 | Fundação estável (daily reset, hardcore, XP) |
| 2 | 🟠 1A | 3 | 18 | Features com estrutura pronta |
| 3 | 🟠 1B | 2 | 13 | Retenção (streak freeze, meta) |
| 4 | 🟠 1C | 4 | 25 | Qualidade de vida (onboarding, tarefas) |
| 5 | 🟡 2A | 4 | 20 | Economia & recompensas |
| 6 | 🟡 2B | 3 | 13 | Personagem & progressão |
| 7 | 🟡 2C | 3 | 17 | Engajamento local (ligas, combos) |
| 8 | 🟡 2D | 3 | 13 | Módulos produtividade (lote 1) |
| 9 | 🟡 2D/E | 4 | 13 | Produtividade (lote 2) + juice |
| 10 | 🟡 2E | 4 | 17 | Qualidade (conquistas, testes, a11y) |
| 11 | 🟡 2E | 2 | 12 | Arquitetura & PWA |
| 12+ | 🟢 3 | 15+ | ~20+ | Nuvem, social, polimento |
| | **Total** | **~50** | **~180** | |

---

## 📋 Legenda das Áreas de Desenvolvimento

| Código | Área | Descrição |
|--------|------|-----------|
| `[ENG]` | Game Engine | Lógica do jogo: XP, HP, moedas, níveis, dano, reset |
| `[UI]` | Interface | Views, componentes, modais, animações, CSS |
| `[DATA]` | Dados/Store | localStorage, modelo de dados, migrações, constantes |
| `[PWA]` | PWA/Infra | Service worker, manifest, notificações, offline |
| `[TEST]` | Testes | Testes automatizados (Vitest) |
| `[ARCH]` | Arquitetura | Refatoração, módulos, build |
| `[BACKEND]` | Backend/API | Servidor, autenticação, banco de dados |
| `[SOCIAL]` | Social | Amigos, clãs, rankings |
| `[CI]` | CI/CD | GitHub Actions, deploy |
| `[DOC]` | Documentação | README, docs, comentários |

---

*Alinhado com `create-issues.sh` e `PLANO-DEPLOY-ISSUES.md`. Cada micro-task é estimada em horas (2-8h) para desenvolvimento individual.*
