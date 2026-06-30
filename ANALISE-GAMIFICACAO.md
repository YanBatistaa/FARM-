# Análise de Sistemas de Gamificação de Rotina — base para o FARM / ZÊNITE

> Pesquisa dos sistemas mais famosos da internet, seus **diferenciais** e **funções centrais (core functions)**, com uma síntese do que vale a pena trazer para o seu projeto. Serve de fundamento para o backlog de issues (`create-issues.sh`).

---

## TL;DR — o que copiar de cada um

| App | Diferencial em 1 frase | O que roubar pro FARM |
|-----|------------------------|------------------------|
| **Habitica** | RPG completo de tarefas com party e boss fights | 3 tipos de tarefa, HP/dano, party com responsabilidade compartilhada, pets/gear |
| **Duolingo** | A máquina de retenção: streaks + ligas + XP unificado | Streak freeze, ligas semanais, meta diária, eventos sazonais |
| **LifeUp** | RPG de produtividade local-first e altamente customizável | Atributos por categoria, loja própria, **loot boxes + crafting** |
| **SuperBetter** | Gamificação científica de resiliência | Power-Ups, **Bad Guys** (maus hábitos), Allies, Epic Win |
| **Finch** | Autocuidado fofo (Tamagotchi + terapeuta) | **Modo gentil** sem punição, mascote que evolui |
| **Forest** | Foco que vira floresta + bloqueio de distração | Foco "plantado", deep focus que bloqueia apps |
| **Streaks** | Minimalismo: tocar no círculo e pronto | Fricção zero para marcar hábito, integrações de saúde |
| **Octalysis** | Framework dos 8 drives de motivação | Equilibrar White Hat (controle) x Black Hat (urgência) p/ não causar burnout |

---

## 1. Habitica — o RPG de tarefas de referência

**O que é:** app de produtividade estruturado como um RPG retrô (8-bit). As tarefas da vida real viram ações dentro de um jogo de fantasia.

**Funções centrais:**
- **3 tipos de tarefa:** *Hábitos* (comportamentos repetíveis, com + e −), *Diárias* (recorrentes agendadas) e *To-Dos* (únicas).
- **XP + Ouro** ao concluir; **perde HP** ao falhar diárias ou ativar hábitos negativos (loss aversion).
- **Avatar customizável** com gear equipável que muda a aparência.
- **Pets e mounts** chocados de ovos + poções; colecionáveis que dão profundidade à progressão.
- **Quests e Boss Fights:** concluir tarefas causa dano ao chefe; quests de coleta.
- **Party (social):** grupo vai pra quest junto — **se alguém falha as diárias, o grupo inteiro toma dano** (responsabilidade compartilhada).

**Diferenciais:** profundidade RPG real (gear, pets, classes, skills mágicas) e a **accountability social via party**.

**Fraquezas (o que evitar):** arte estagnada, **múltiplas moedas e menus aninhados causam paralisia de decisão**, cosméticos atrás de assinatura.

## 2. Duolingo — a engenharia de retenção

**O que é:** app de idiomas, mas referência mundial em gamificação de hábito diário. Reduziu churn de 47% → 28% com o motor de engajamento.

**Funções centrais:**
- **XP unificado:** toda ação rende XP, que alimenta streak, liga e conquistas ao mesmo tempo (sistema coeso, não features soltas).
- **Streaks + Streak Freeze:** proteção que evita zerar a ofensiva por 1 dia perdido. Usuários com freeze duram **48% mais** na ofensiva.
- **Meta diária configurável.**
- **Ligas (leaderboards semanais)** com promoção/rebaixamento — aumentaram conclusão de lições em **25%**; quem usa leaderboard faz **40% mais** por semana.
- **Conquistas** divididas em *Recordes pessoais* e *Prêmios (Awards)*.
- **Eventos sazonais** e desafios por tempo limitado.
- **Camada social:** friend streaks, friend challenges.
- **Sistema de "corações" (hearts):** punição por erro + recompensa variável.

**Diferenciais:** a integração — uma única ação avança vários sistemas. **Streak + Liga são os maiores motores de retenção** e hoje o FARM não tem ligas nem streak freeze.

## 3. LifeUp — o RPG de produtividade customizável (o mais próximo do FARM)

**O que é:** to-do gamificado em RPG, **100% local/offline**, foco em customização. Praticamente um primo do seu projeto.

**Funções centrais:**
- **Atributos + Skills:** cada tarefa sobe atributos relacionados; dá pra criar skills próprias (ex: "pesca", "escrita").
- **EXP + Moedas** ao concluir; EXP melhora atributos e níveis de skill.
- **Loja própria:** o usuário cria recompensas ("30 min de pausa", "assistir um filme") e define o preço em moedas.
- **Loot Boxes:** itens da loja como baús com recompensa aleatória.
- **Crafting:** receitas para combinar itens (🔑+🔒 → abrir baú).
- **Conquistas auto-rastreadas**, Pomodoro, lembretes, deadlines, checklists, histórico.
- **One-time purchase, sem anúncios, dados locais.**

**Diferenciais:** **loot boxes + crafting** (recompensa variável) e o nível de customização da economia. É o melhor modelo de "economia de recompensas" pra se inspirar.

## 4. SuperBetter — gamificação de resiliência (científica)

**O que é:** criado pela game designer Jane McGonigal; transforma estresse/burnout em desafios gerenciáveis. Validado em ensaios clínicos.

**Funções centrais (vocabulário próprio):**
- **Quests:** micro-missões que somam num objetivo grande.
- **Power-Ups:** ações positivas simples que dão energia/humor (beber água, respirar).
- **Bad Guys:** obstáculos / pensamentos / hábitos negativos que você "batalha" com estratégias.
- **Allies:** amigos que te apoiam.
- **Epic Win:** o objetivo final significativo que move tudo.

**Diferenciais:** o **enquadramento narrativo** (Power-Ups e Bad Guys) e a base científica de resiliência. Ótimo para dar significado às "batalhas de mau hábito" que o FARM já tem.

## 5. Finch — autocuidado gentil

**O que é:** cruzamento de Tamagotchi com terapeuta. Você cria um passarinho e o "energiza" cumprindo micro-hábitos de autocuidado.

**Funções centrais:** mascote que evolui, micro-hábitos de bem-estar (respiração, diário, higiene), reforço **positivo sem punição**.

**Diferenciais:** **modo gentil** — ideal pra dias ruins / ADHD, sem o estresse de streaks. Bom como *opção* no FARM (alternar entre "modo hardcore" e "modo gentil").

## 6. Forest — foco que vira floresta

**O que é:** app de foco; você planta uma árvore que cresce enquanto você não mexe no celular; sair do app mata a árvore. Planta árvores reais via parceria.

**Funções centrais:** sessão de foco visual (árvore crescendo), **deep focus que bloqueia apps distrativos**, floresta acumulada = histórico de foco.

**Diferenciais:** o **bloqueio de distração** e o feedback visual imediato. Aplicável à sua "Caverna/Pomodoro".

## 7. Streaks — minimalismo

**O que é:** rastreador de hábitos minimalista (círculos; toca pra concluir). Pago único, integra Apple Health.

**Diferenciais:** **fricção zero** e integração com saúde. Lembra que nem tudo precisa de RPG — marcar um hábito tem que ser instantâneo.

---

## 8. Octalysis — o framework por trás de tudo (Yu-kai Chou)

Os **8 Core Drives** de motivação (vai além de "pontos, badges e leaderboards", que cobrem só uma fatia do Drive 2):

1. **Significado Épico & Chamado** — sentir que faz parte de algo maior (lore, Epic Win).
2. **Desenvolvimento & Realização** — XP, níveis, badges, barras de progresso, quests.
3. **Empoderamento de Criatividade & Feedback** — customizar (skills, loja, temas, capas).
4. **Propriedade & Posse** — avatar, coleção, moedas, "minhas coisas".
5. **Influência Social & Pertencimento** — party, amigos, clãs, rankings.
6. **Escassez & Impaciência** — eventos por tempo limitado, itens raros.
7. **Imprevisibilidade & Curiosidade** — **loot boxes, recompensa variável**.
8. **Perda & Evitação** — streak (loss aversion), HP, ofensiva que pode zerar.

**White Hat (1,2,3)** → sensação de controle, mas pode procrastinar. **Black Hat (6,7,8)** → urgência e vício, mas leva a burnout. **A regra de ouro:** misture os dois, mas deixe o usuário no controle (ex: streak freeze, modo gentil) pra não queimar.

---

## 9. Síntese — o que o FARM já tem vs. o que falta

✅ **Já tem (forte):** XP/níveis, moedas, HP, ofensiva, hábitos, skills, conquistas, temas, loja, Pomodoro, finanças, estudos, mídia, notas, PWA offline. Base de RPG sólida.

🟡 **Tem, mas dá pra aprofundar:** loja (falta loot box/crafting), boss fights (falta lore/party), atributos (subir por categoria), conquistas (recordes vs prêmios).

🔴 **Falta (são os maiores diferenciais dos famosos):**
- **Streak Freeze** e **meta diária** (Duolingo) — retenção.
- **Ligas / leaderboard** (Duolingo) — competição.
- **Loot boxes + crafting** (LifeUp) — recompensa variável (Drive 7).
- **Avatar/gear + pet** (Habitica/Finch) — posse e progressão visual.
- **Party / accountability social** (Habitica) — Drive 5.
- **Modo gentil** (Finch) e **deep focus** (Forest) — bem-estar e foco.
- **Eventos sazonais** (Duolingo) — escassez (Drive 6).
- **Onboarding gamificado**, estatísticas/recordes, acessibilidade, sons.

**Recomendação estratégica:** priorize o eixo **engajamento/retenção** (streak freeze + meta diária + ligas) porque é o que transforma um "app legal" num "app que você abre todo dia" — é exatamente onde Duolingo ganha e onde o FARM hoje é mais fraco. Em seguida, a **economia de recompensa variável** (loot boxes/crafting do LifeUp) e a **camada social** (party do Habitica).

---

*Fontes: documentação e estudos de caso de Habitica, Duolingo, LifeUp, SuperBetter, Finch, Forest, Streaks e o framework Octalysis (Yu-kai Chou). Links no chat.*
