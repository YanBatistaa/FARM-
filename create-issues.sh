#!/usr/bin/env bash
# =============================================================================
#  FARM / ZÊNITE — Gerador de backlog no GitHub (épicos + sub-issues)
#  Cria labels, milestones, épicos e sub-issues no repositório via GitHub CLI.
#
#  USO:
#    1) Instale o GitHub CLI:  https://cli.github.com/
#    2) Autentique:            gh auth login
#    3) Rode:                  bash create-issues.sh
#       (ou sem confirmação:   bash create-issues.sh -y)
#
#  Repo padrão: YanBatistaa/FARM-  (mude com:  REPO="owner/repo" bash create-issues.sh)
# =============================================================================
set -euo pipefail

REPO="${REPO:-YanBatistaa/FARM-}"
SLEEP="${SLEEP:-0.6}"   # pausa entre criações p/ evitar rate-limit

# ---- pré-requisitos ----------------------------------------------------------
command -v gh >/dev/null 2>&1 || { echo "❌ GitHub CLI (gh) não encontrado. Instale em https://cli.github.com/"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "❌ Você não está autenticado. Rode:  gh auth login"; exit 1; }
gh repo view "$REPO" >/dev/null 2>&1 || { echo "❌ Sem acesso ao repo $REPO. Confira o nome/permissão."; exit 1; }

if [ "${1:-}" != "-y" ]; then
  read -rp "▶ Criar labels, milestones e ~50 issues em '$REPO'? [y/N] " ok
  [[ "$ok" == [yY]* ]] || { echo "Cancelado."; exit 0; }
fi
echo "▶ Trabalhando em: $REPO"

# ---- helpers -----------------------------------------------------------------
lbl() { gh label create "$1" --repo "$REPO" --color "$2" --description "$3" --force >/dev/null 2>&1 || true; }

ms() { # cria milestone se não existir
  local have
  have=$(gh api "repos/$REPO/milestones?state=all" --jq ".[] | select(.title==\"$1\") | .number" 2>/dev/null | head -1 || true)
  [ -z "$have" ] && gh api "repos/$REPO/milestones" -f title="$1" -f description="${2:-}" >/dev/null 2>&1 || true
}

new_epic() { # new_epic "title" "labels" "milestone" ; corpo via stdin -> imprime número
  local title="$1" labels="$2" milestone="${3:-}" url
  local args=(--repo "$REPO" --title "$title" --label "$labels" --body-file -)
  [ -n "$milestone" ] && args+=(--milestone "$milestone")
  url=$(gh issue create "${args[@]}")
  sleep "$SLEEP"; echo "${url##*/}"
}

new_sub() { # new_sub "title" "labels" "milestone" parentNumber ; corpo via stdin -> imprime número
  local title="$1" labels="$2" milestone="${3:-}" parent="$4" body url
  body="> 🧩 Parte do épico #$parent"$'\n\n'"$(cat)"
  local args=(--repo "$REPO" --title "$title" --label "$labels" --body-file -)
  [ -n "$milestone" ] && args+=(--milestone "$milestone")
  url=$(printf '%s' "$body" | gh issue create "${args[@]}")
  sleep "$SLEEP"; echo "${url##*/}"
}

finalize_epic() { # finalize_epic epicNumber "corpoOriginal" sub1 sub2 ...
  local epic="$1" base="$2"; shift 2
  { printf '%s\n\n---\n### 📋 Sub-issues\n' "$base"; for n in "$@"; do printf -- '- [ ] #%s\n' "$n"; done; } \
    | gh issue edit "$epic" --repo "$REPO" --body-file - >/dev/null
  echo "  ✓ Épico #$epic finalizado com $# sub-issues"
}

# ---- LABELS ------------------------------------------------------------------
echo "▶ Criando labels..."
lbl "épico"            "6f42c1" "Épico que agrupa sub-issues"
lbl "core"             "0e8a16" "Núcleo do jogo (XP, moedas, HP, loop)"
lbl "rpg"              "8250df" "Mecânicas de RPG"
lbl "engagement"       "d93f0b" "Retenção e engajamento"
lbl "productivity"     "1d76db" "Módulos de produtividade"
lbl "ui-ux"            "fbca04" "Interface e experiência"
lbl "accessibility"    "0052cc" "Acessibilidade (a11y)"
lbl "quality"          "5319e7" "Qualidade, testes, arquitetura"
lbl "pwa"              "006b75" "PWA / offline"
lbl "backend"          "b60205" "Backend / API / nuvem"
lbl "social"           "e99695" "Social / multiplayer"
lbl "balance"          "c2e0c6" "Balanceamento de jogo"
lbl "enhancement"      "a2eeef" "Melhoria de algo existente"
lbl "good-first-issue" "7057ff" "Bom para começar"
lbl "priority:alta"    "b60205" "Prioridade alta"
lbl "priority:media"   "fbca04" "Prioridade média"
lbl "priority:baixa"   "0e8a16" "Prioridade baixa"

# ---- MILESTONES --------------------------------------------------------------
echo "▶ Criando milestones..."
M1="Fase 1 — Polimento do Core"
M2="Fase 2 — Expansão de Features"
M3="Fase 3 — Experiência & Engajamento"
M4="Fase 4 — Nuvem & Social"
ms "$M1" "Fechar e polir o núcleo RPG e o loop de recompensa"
ms "$M2" "Aprofundar missões, economia e módulos de produtividade"
ms "$M3" "Retenção, engajamento, UX, acessibilidade e qualidade"
ms "$M4" "Backend, sincronização e features sociais"

# =============================================================================
#  ÉPICO 1 — Núcleo RPG & Loop de Recompensa
# =============================================================================
echo "▶ Épico 1 — Núcleo RPG..."
E1_BODY=$(cat <<'EOF'
**Objetivo:** fechar e equilibrar o loop central do jogo — XP, níveis, moedas, HP e recompensa — para que cada ação tenha um retorno claro e satisfatório.

**Por quê:** é a fundação. Inspirado no loop coeso do Duolingo (uma ação alimenta vários sistemas) e na economia do LifeUp.
EOF
)
E1=$(new_epic "🎮 [ÉPICO] Núcleo RPG & Loop de Recompensa" "épico,core,rpg" "$M1" <<<"$E1_BODY")
echo "  ✓ Épico #$E1"

a=$(new_sub "Curva de XP e nivelamento balanceada (além do nível 10)" "core,balance,priority:alta" "$M1" "$E1" <<'EOF'
**Contexto:** hoje são 10 níveis (Iniciante→Lenda). Falta progressão de longo prazo.
**Tarefas:**
- [ ] Revisar a fórmula de XP por nível (curva suave e contínua)
- [ ] Suportar níveis acima de 10 (prestígio/rebirth opcional)
- [ ] Mostrar XP restante para o próximo nível e título atual
**Aceite:** dá pra passar do nível 10 sem "travar"; barra de progresso correta.
**Arquivos:** `app.js` (CONSTANTS, Game Engine)
EOF
)
b=$(new_sub "Recompensa variável / Loot box ao concluir missões" "core,enhancement,rpg" "$M1" "$E1" <<'EOF'
**Inspiração:** LifeUp (loot boxes) + Octalysis Drive 7 (imprevisibilidade).
**Tarefas:**
- [ ] Chance de "drop" extra (moeda bônus, item, fragmento) ao concluir
- [ ] Animação de baú/recompensa surpresa
- [ ] Configurar probabilidade no balanceamento
**Aceite:** ~X% das conclusões geram recompensa-surpresa visível.
**Arquivos:** `app.js` (Game Engine, rewards)
EOF
)
c=$(new_sub "Modo Hardcore completo: dano, HP baixo e Game Over com reviver" "core,rpg,priority:alta" "$M1" "$E1" <<'EOF'
**Contexto:** os toggles existem, mas a aplicação do dano é básica (README #4).
**Tarefas:**
- [ ] Aplicar dano corretamente ao falhar diárias/missões
- [ ] Aviso visual quando HP está baixo
- [ ] Tela de "morte" ao HP=0 + opção de reviver gastando moedas
**Aceite:** ciclo de risco/punição/recuperação funciona ponta a ponta.
**Arquivos:** `app.js` (checkDailyReset, viewPersonagem, viewDashboard)
EOF
)
d=$(new_sub "Daily Reset robusto (fuso horário, diárias, streak, dano)" "core,priority:alta" "$M1" "$E1" <<'EOF'
**Contexto:** `checkDailyReset()` precisa ser confiável em todos os cenários.
**Tarefas:**
- [ ] Tratar fuso horário e virada de dia corretamente
- [ ] Resetar diárias e verificar ofensiva sem perder dados
- [ ] Testar: app fechado por dias, mudança de fuso, meia-noite
**Aceite:** nenhum reset duplicado/perdido; streak correto.
**Arquivos:** `app.js` (Daily Reset)
EOF
)
e=$(new_sub "Polir 'juice': animações de XP/moeda/level e micro-feedback" "ui-ux,enhancement" "$M1" "$E1" <<'EOF'
**Contexto:** manter as animações de conquista/level-up que já agradam, e estender.
**Tarefas:**
- [ ] Partículas/contador animado ao ganhar XP e moeda
- [ ] Flash de HP ao tomar dano
- [ ] Toast/animação ao desbloquear conquista
**Aceite:** toda recompensa tem feedback visual imediato.
**Arquivos:** `app.js` (UI System), `styles.css`
EOF
)
finalize_epic "$E1" "$E1_BODY" "$a" "$b" "$c" "$d" "$e"

# =============================================================================
#  ÉPICO 2 — Engajamento & Retenção  (o maior diferencial)
# =============================================================================
echo "▶ Épico 2 — Engajamento & Retenção..."
E2_BODY=$(cat <<'EOF'
**Objetivo:** transformar o FARM de "app legal" em "app que se abre todo dia". É onde o Duolingo ganha e onde o projeto hoje é mais fraco.

**Inspiração:** Duolingo — streak freeze (+48% de duração da ofensiva), ligas (+25% de conclusão), meta diária e eventos sazonais.
EOF
)
E2=$(new_epic "🔥 [ÉPICO] Engajamento & Retenção (streaks, ligas, eventos)" "épico,engagement" "$M3" <<<"$E2_BODY")
echo "  ✓ Épico #$E2"

a=$(new_sub "Streak Freeze (proteção de ofensiva)" "engagement,priority:alta" "$M3" "$E2" <<'EOF'
**Inspiração:** Duolingo. Loss aversion sem punir demais (evita burnout).
**Tarefas:**
- [ ] Item "Congelar Ofensiva" comprável na loja (em moedas)
- [ ] Consome automaticamente ao perder 1 dia, em vez de zerar
- [ ] Indicador visual de freeze ativo/disponível
**Aceite:** perder 1 dia com freeze mantém a ofensiva.
**Arquivos:** `app.js` (Daily Reset, viewMercado, Game Engine)
EOF
)
b=$(new_sub "Meta diária de XP configurável" "engagement,priority:alta" "$M3" "$E2" <<'EOF'
**Inspiração:** Duolingo (daily goal).
**Tarefas:**
- [ ] Configurar meta (ex: 50/100/200 XP/dia)
- [ ] Anel/barra de progresso diário no Dashboard
- [ ] Bônus ao bater a meta (moeda/loot)
**Aceite:** progresso diário visível e recompensado.
**Arquivos:** `app.js` (viewDashboard, viewConfiguracoes)
EOF
)
c=$(new_sub "Ligas / Leaderboard semanal (local, com bots)" "engagement,enhancement" "$M3" "$E2" <<'EOF'
**Inspiração:** Duolingo (promoção/rebaixamento). Sem backend, usar oponentes simulados.
**Tarefas:**
- [ ] Liga semanal com XP acumulado vs. bots (perfis fictícios)
- [ ] Promoção/rebaixamento ao fim da semana
- [ ] Tela de liga com posição e tempo restante
**Aceite:** ranking semanal que zera e promove/rebaixa.
**Arquivos:** `app.js` (nova view Ligas)
EOF
)
d=$(new_sub "Eventos sazonais / desafios por tempo limitado" "engagement" "$M3" "$E2" <<'EOF'
**Inspiração:** Duolingo + Octalysis Drive 6 (escassez).
**Tarefas:**
- [ ] Estrutura de evento com início/fim e recompensa exclusiva
- [ ] Banner/contagem regressiva no Dashboard
- [ ] Recompensa cosmética (tema/capa) exclusiva do evento
**Aceite:** evento aparece, conta o tempo e premia ao concluir.
**Arquivos:** `app.js` (Game Engine, viewDashboard)
EOF
)
e=$(new_sub "Combos & bônus de momentum (multiplicador de XP)" "engagement,enhancement" "$M3" "$E2" <<'EOF'
**Tarefas:**
- [ ] Multiplicador ao concluir várias missões em sequência no dia
- [ ] "XP em dobro" temporário (item/evento)
- [ ] Feedback de combo (ex: x2, x3)
**Aceite:** sequência no mesmo dia rende bônus crescente.
**Arquivos:** `app.js` (Game Engine)
EOF
)
f=$(new_sub "Notificações/lembretes PWA para manter a ofensiva" "engagement,pwa" "$M3" "$E2" <<'EOF'
**Tarefas:**
- [ ] Permissão de notificação + lembrete diário configurável
- [ ] Aviso "sua ofensiva está em risco" no fim do dia
- [ ] Respeitar opt-out
**Aceite:** lembrete dispara no horário escolhido (app instalado).
**Arquivos:** `sw.js`, `app.js` (viewConfiguracoes)
EOF
)
finalize_epic "$E2" "$E2_BODY" "$a" "$b" "$c" "$d" "$e" "$f"

# =============================================================================
#  ÉPICO 3 — Missões, Hábitos & Batalhas
# =============================================================================
echo "▶ Épico 3 — Missões, Hábitos & Batalhas..."
E3_BODY=$(cat <<'EOF'
**Objetivo:** dar profundidade ao sistema de tarefas — os tipos, recorrência, prazos e as "batalhas".

**Inspiração:** Habitica (3 tipos de tarefa + boss fights) e SuperBetter (Bad Guys + Power-Ups).
EOF
)
E3=$(new_epic "⚔️ [ÉPICO] Missões, Hábitos & Batalhas" "épico,rpg" "$M2" <<<"$E3_BODY")
echo "  ✓ Épico #$E3"

a=$(new_sub "Três tipos de tarefa: Hábitos (+/−), Diárias e To-Dos" "rpg,priority:alta" "$M2" "$E3" <<'EOF'
**Inspiração:** Habitica.
**Tarefas:**
- [ ] Hábitos com botões + e − (reforço positivo/negativo)
- [ ] Diárias recorrentes com agenda (dias da semana)
- [ ] To-Dos únicos com prazo
- [ ] Recompensa/penalidade por tipo
**Aceite:** os três tipos coexistem com regras próprias.
**Arquivos:** `app.js` (viewCampo, modelo de dados)
EOF
)
b=$(new_sub "Missões com intervalo de datas (início → prazo)" "rpg,enhancement,priority:alta" "$M2" "$E3" <<'EOF'
**Contexto:** uma missão com prazo dia 12 criada no dia 1 deve aparecer **todos os dias** de 1 a 12, não só no dia limite.
**Tarefas:**
- [ ] Campos "começa em" e "prazo" na missão
- [ ] Exibir a missão em todo o intervalo ativo
- [ ] Badge de prazo / "vence hoje" / "atrasada"
**Aceite:** missão visível em todos os dias do intervalo.
**Arquivos:** `app.js` (viewCampo, Daily Reset)
EOF
)
c=$(new_sub "Boss Fights com lore, recompensa e penalidade" "rpg" "$M2" "$E3" <<'EOF'
**Inspiração:** Habitica (boss) + sua estrutura de Notion (lore/como vencer/recompensa/penalidade).
**Tarefas:**
- [ ] Tipo "Boss" com estrelas de dificuldade
- [ ] Campos: lore, como vencer, recompensa se vencer, penalidade se perder
- [ ] Recompensa épica (XP/moeda/item) ao derrotar
**Aceite:** criar, ver detalhes e derrotar um boss com payoff.
**Arquivos:** `app.js` (viewCampo)
EOF
)
d=$(new_sub "Batalhas de mau hábito (Bad Guys) + Power-Ups" "rpg,enhancement" "$M2" "$E3" <<'EOF'
**Inspiração:** SuperBetter (Bad Guys, Power-Ups).
**Tarefas:**
- [ ] "Batalha" = mau hábito a eliminar; "resistir hoje" dá XP, "ceder" tira HP
- [ ] Power-Ups: micro-ações positivas rápidas (água, respirar) com mini-recompensa
- [ ] Contagem de dias resistindo
**Aceite:** resistir/ceder afeta XP/HP; power-ups dão impulso.
**Arquivos:** `app.js` (viewCampo)
EOF
)
e=$(new_sub "Calendário de produtividade" "productivity" "$M2" "$E3" <<'EOF'
**Contexto:** o CSS já tem `.cal`, mas não é usado (README #3).
**Tarefas:**
- [ ] Mini calendário (semana/mês) com missões/streak/hábitos por dia
- [ ] Distribuir missões com prazo ao longo do intervalo
- [ ] Clique no dia mostra o que estava ativo
**Aceite:** calendário reflete a atividade real.
**Arquivos:** `app.js` (nova view/componente), `styles.css`
EOF
)
f=$(new_sub "Subtarefas / checklists dentro de uma missão" "enhancement" "$M2" "$E3" <<'EOF'
**Inspiração:** LifeUp (checklists).
**Tarefas:**
- [ ] Itens de checklist por missão
- [ ] Progresso parcial (3/5) e XP proporcional
**Aceite:** concluir itens avança a missão.
**Arquivos:** `app.js` (viewCampo, modal de missão)
EOF
)
finalize_epic "$E3" "$E3_BODY" "$a" "$b" "$c" "$d" "$e" "$f"

# =============================================================================
#  ÉPICO 4 — Personagem, Skills & Progressão
# =============================================================================
echo "▶ Épico 4 — Personagem & Skills..."
E4_BODY=$(cat <<'EOF'
**Objetivo:** aprofundar a identidade e a progressão do personagem — atributos, skills, avatar e mascote.

**Inspiração:** LifeUp (atributos/skills custom), Habitica (gear) e Finch (mascote).
EOF
)
E4=$(new_epic "🧙 [ÉPICO] Personagem, Skills & Progressão" "épico,rpg" "$M1" <<<"$E4_BODY")
echo "  ✓ Épico #$E4"

a=$(new_sub "UI de Habilidades Customizadas (criar/editar)" "rpg,priority:alta" "$M1" "$E4" <<'EOF'
**Contexto:** `player.customSkills` já existe, mas não há UI (README #1).
**Tarefas:**
- [ ] Tela/modal para criar skill (nome + ícone)
- [ ] Associar missões a skills customizadas
- [ ] Exibir no radar do Personagem
**Aceite:** criar uma skill e vê-la subir ao concluir missões ligadas.
**Arquivos:** `app.js` (viewConfiguracoes, viewPersonagem)
EOF
)
b=$(new_sub "Atributos que sobem por categoria de tarefa" "rpg,enhancement" "$M1" "$E4" <<'EOF'
**Inspiração:** LifeUp (cada tarefa sobe atributos).
**Tarefas:**
- [ ] Mapear categorias → atributos (Disciplina, Foco, Inteligência, Shape)
- [ ] Incrementar atributo ao concluir tarefa da categoria
- [ ] Barras de atributo no Personagem
**Aceite:** concluir tarefas evolui os atributos certos.
**Arquivos:** `app.js` (Game Engine, viewPersonagem)
EOF
)
c=$(new_sub "Avatar com equipamentos/gear desbloqueáveis" "rpg,enhancement" "$M2" "$E4" <<'EOF'
**Inspiração:** Habitica (gear muda o avatar).
**Tarefas:**
- [ ] Itens de visual compráveis/desbloqueáveis
- [ ] Avatar reflete o gear equipado
- [ ] Galeria de equipamentos
**Aceite:** equipar item muda a aparência do avatar.
**Arquivos:** `app.js` (viewPersonagem, viewMercado)
EOF
)
d=$(new_sub "Mascote/Pet que evolui (modo fofo)" "rpg,enhancement" "$M3" "$E4" <<'EOF'
**Inspiração:** Finch/Tamagotchi.
**Tarefas:**
- [ ] Pet que "energiza" ao concluir hábitos de autocuidado
- [ ] Estágios de evolução visíveis
- [ ] Reações ao progresso/ofensiva
**Aceite:** pet reage e evolui com a rotina.
**Arquivos:** `app.js` (viewPersonagem ou nova view)
EOF
)
e=$(new_sub "Títulos & Hall da Glória" "rpg,ui-ux" "$M3" "$E4" <<'EOF'
**Tarefas:**
- [ ] Títulos desbloqueados por nível/feitos
- [ ] Vitrine: bosses derrotados, recordes, conquistas, títulos
**Aceite:** página celebra o legado do jogador.
**Arquivos:** `app.js` (viewPersonagem, nova view Hall)
EOF
)
finalize_epic "$E4" "$E4_BODY" "$a" "$b" "$c" "$d" "$e"

# =============================================================================
#  ÉPICO 5 — Economia, Loja & Recompensas
# =============================================================================
echo "▶ Épico 5 — Economia & Loja..."
E5_BODY=$(cat <<'EOF'
**Objetivo:** tornar a economia rica e a recompensa imprevisível — onde o LifeUp brilha.

**Inspiração:** LifeUp (loja custom, loot boxes, crafting) + Octalysis Drive 7.
EOF
)
E5=$(new_epic "🛒 [ÉPICO] Economia, Loja & Recompensas" "épico,rpg" "$M2" <<<"$E5_BODY")
echo "  ✓ Épico #$E5"

a=$(new_sub "Loja de recompensas personalizadas (preço em moedas)" "rpg,priority:media" "$M2" "$E5" <<'EOF'
**Inspiração:** LifeUp (o usuário cria as recompensas reais).
**Tarefas:**
- [ ] CRUD de recompensas (nome, ícone, custo)
- [ ] Resgatar gastando moedas + histórico
- [ ] Modelos prontos (folga, jogo, comida)
**Aceite:** criar, resgatar e ver histórico de recompensas.
**Arquivos:** `app.js` (viewMercado)
EOF
)
b=$(new_sub "Loot boxes / baús com recompensa aleatória" "enhancement,rpg" "$M2" "$E5" <<'EOF'
**Inspiração:** LifeUp.
**Tarefas:**
- [ ] Baú comprável que sorteia recompensa de uma tabela
- [ ] Raridades (comum/raro/épico) com pesos
- [ ] Animação de abertura
**Aceite:** abrir baú dá recompensa aleatória ponderada.
**Arquivos:** `app.js` (viewMercado, Game Engine)
EOF
)
c=$(new_sub "Crafting / combinar itens" "enhancement,rpg,priority:baixa" "$M2" "$E5" <<'EOF'
**Inspiração:** LifeUp (receitas).
**Tarefas:**
- [ ] Inventário de itens/fragmentos
- [ ] Receitas (A+B → C)
- [ ] Tela de crafting
**Aceite:** combinar itens segundo receitas funciona.
**Arquivos:** `app.js` (nova view/loja)
EOF
)
d=$(new_sub "Poções e itens utilitários (cura, streak freeze, x2 XP)" "rpg" "$M2" "$E5" <<'EOF'
**Tarefas:**
- [ ] Poção de cura (recupera HP)
- [ ] Item de congelar ofensiva (liga ao Épico 2)
- [ ] Item de XP em dobro temporário
**Aceite:** itens utilitários compráveis e consumíveis.
**Arquivos:** `app.js` (viewMercado, Game Engine)
EOF
)
e=$(new_sub "Balanceamento anti-abuso da economia" "balance,quality" "$M2" "$E5" <<'EOF'
**Contexto:** evitar inflação de moedas/XP que quebra a motivação.
**Tarefas:**
- [ ] Revisar ganhos x preços
- [ ] Tetos diários / rendimentos decrescentes onde fizer sentido
- [ ] Planilha/tabela de economia documentada
**Aceite:** progressão sente-se merecida, não trivial.
**Arquivos:** `app.js` (CONSTANTS, Game Engine)
EOF
)
finalize_epic "$E5" "$E5_BODY" "$a" "$b" "$c" "$d" "$e"

# =============================================================================
#  ÉPICO 6 — Módulos de Produtividade
# =============================================================================
echo "▶ Épico 6 — Módulos de Produtividade..."
E6_BODY=$(cat <<'EOF'
**Objetivo:** completar e aprofundar os módulos de vida real que alimentam o jogo.

**Inspiração:** Forest (deep focus) + roadmap do README (água, finanças, academia, estudos, notas, mídia).
EOF
)
E6=$(new_epic "🧰 [ÉPICO] Módulos de Produtividade" "épico,productivity" "$M2" <<<"$E6_BODY")
echo "  ✓ Épico #$E6"

a=$(new_sub "Água / Hidratação (8 copos)" "productivity,good-first-issue" "$M1" "$E6" <<'EOF'
**Contexto:** CSS `.water-btns` existe, falta a feature (README #2).
**Tarefas:**
- [ ] Tracking de copos/ml por dia com meta
- [ ] Botões rápidos (+250ml etc.) e progresso visual
- [ ] XP/recompensa ao bater a meta
**Aceite:** registrar água e ver progresso diário.
**Arquivos:** `app.js` (nova view ou hábitos), `styles.css`
EOF
)
b=$(new_sub "Finanças com gráficos e metas por categoria" "productivity" "$M2" "$E6" <<'EOF'
**Contexto:** README #5.
**Tarefas:**
- [ ] Gráfico de despesas por categoria (pizza/barras)
- [ ] Limite mensal por categoria com alerta
- [ ] Visão mensal/anual
**Aceite:** ver para onde o dinheiro vai e alertas de limite.
**Arquivos:** `app.js` (viewFinancas), `styles.css`
EOF
)
c=$(new_sub "Academia com histórico e progressão de carga" "productivity" "$M2" "$E6" <<'EOF'
**Contexto:** README #6.
**Tarefas:**
- [ ] Histórico de treinos por data
- [ ] Progressão de carga/reps no tempo
- [ ] Estatísticas semanais/mensais
**Aceite:** acompanhar evolução física ao longo do tempo.
**Arquivos:** `app.js` (viewAcademia)
EOF
)
d=$(new_sub "Estudos com Pomodoro integrado por matéria" "productivity" "$M2" "$E6" <<'EOF'
**Contexto:** README #7.
**Tarefas:**
- [ ] "Estudar agora" inicia Pomodoro com a matéria escolhida
- [ ] Tracking de tempo por matéria
- [ ] Progresso de conclusão de materiais
**Aceite:** foco e estudo conectados, com tempo por matéria.
**Arquivos:** `app.js` (viewEstudos, viewCaverna)
EOF
)
e=$(new_sub "Caverna/Foco estilo Forest (bloqueio de distração)" "productivity,enhancement" "$M3" "$E6" <<'EOF'
**Inspiração:** Forest (deep focus + árvore).
**Tarefas:**
- [ ] Sessão de foco com elemento visual que "cresce"
- [ ] Penalidade se sair/abandonar a sessão
- [ ] Histórico de foco acumulado
**Aceite:** foco tem recompensa visual e custo ao desistir.
**Arquivos:** `app.js` (viewCaverna)
EOF
)
f=$(new_sub "Notas com categorias e Markdown" "productivity" "$M2" "$E6" <<'EOF'
**Contexto:** README #8.
**Tarefas:**
- [ ] Pastas/categorias para notas
- [ ] Markdown básico (negrito, itálico, listas)
- [ ] Preview vs edição
**Aceite:** organizar e formatar notas.
**Arquivos:** `app.js` (viewNotas, noteModal)
EOF
)
g=$(new_sub "Mídia com filtros avançados" "productivity,good-first-issue" "$M2" "$E6" <<'EOF'
**Contexto:** README #9.
**Tarefas:**
- [ ] Filtro por tipo (filme/série/livro)
- [ ] Campo de notas por item
- [ ] Ordenar por nota/data
**Aceite:** encontrar e organizar a lista de mídia.
**Arquivos:** `app.js` (viewMidia)
EOF
)
finalize_epic "$E6" "$E6_BODY" "$a" "$b" "$c" "$d" "$e" "$f" "$g"

# =============================================================================
#  ÉPICO 7 — Conquistas, Estatísticas & Onboarding/UX
# =============================================================================
echo "▶ Épico 7 — Conquistas, Stats & UX..."
E7_BODY=$(cat <<'EOF'
**Objetivo:** reforçar significado e progresso de longo prazo, e melhorar a primeira impressão.

**Inspiração:** Duolingo (recordes vs prêmios), Finch (modo gentil), Notion (capas).
EOF
)
E7=$(new_epic "🏆 [ÉPICO] Conquistas, Estatísticas & Onboarding/UX" "épico,ui-ux" "$M3" <<<"$E7_BODY")
echo "  ✓ Épico #$E7"

a=$(new_sub "Expandir conquistas: Recordes pessoais + Prêmios" "ui-ux,enhancement" "$M3" "$E7" <<'EOF'
**Inspiração:** Duolingo (separa Records de Awards).
**Tarefas:**
- [ ] Mais conquistas (missões, foco, finanças, ofensiva)
- [ ] Categorias e barras de progresso
- [ ] Recompensa em moeda/cosmético
**Aceite:** painel de conquistas rico com progresso.
**Arquivos:** `app.js` (CONSTANTS, viewConquistas)
EOF
)
b=$(new_sub "Tela de Estatísticas & Recordes" "ui-ux" "$M3" "$E7" <<'EOF'
**Contexto:** README #10.
**Tarefas:**
- [ ] Recordes (maior streak, mais XP num dia, etc.)
- [ ] Gráfico de evolução do personagem
- [ ] Resumos semanais/mensais
**Aceite:** dá pra ver a própria evolução em números.
**Arquivos:** `app.js` (nova view Estatísticas)
EOF
)
c=$(new_sub "Onboarding gamificado (criar herói + 1ª missão)" "ui-ux,priority:alta" "$M3" "$E7" <<'EOF'
**Tarefas:**
- [ ] Fluxo: nome, avatar, escolher forças → viram skills
- [ ] Primeira missão garantida pra destravar o loop
- [ ] Explicação rápida das mecânicas
**Aceite:** novo usuário entende e age em < 1 min.
**Arquivos:** `app.js` (Init, nova view onboarding)
EOF
)
d=$(new_sub "Modo Gentil / Self-care (sem punição)" "ui-ux,enhancement" "$M3" "$E7" <<'EOF'
**Inspiração:** Finch.
**Tarefas:**
- [ ] Alternar Hardcore ⇄ Gentil nas configurações
- [ ] Modo Gentil remove dano e foca em reforço positivo
- [ ] Linguagem acolhedora nesse modo
**Aceite:** usuário escolhe o nível de pressão.
**Arquivos:** `app.js` (viewConfiguracoes, Game Engine)
EOF
)
e=$(new_sub "Capas personalizáveis (GIF estilo Notion) + Dashboard customizável" "ui-ux,enhancement" "$M3" "$E7" <<'EOF'
**Contexto:** README #12.
**Tarefas:**
- [ ] Capa por página (colar URL de GIF/imagem ou preset)
- [ ] Widgets do Dashboard que dá pra mostrar/esconder
**Aceite:** usuário personaliza visual e layout.
**Arquivos:** `app.js` (render, viewDashboard), `styles.css`
EOF
)
f=$(new_sub "Sons/efeitos (Web Audio) + Modo noturno automático" "ui-ux,good-first-issue" "$M3" "$E7" <<'EOF'
**Contexto:** README #11 e #13.
**Tarefas:**
- [ ] Sons leves (Web Audio) ao concluir/subir nível/comprar
- [ ] Toggle de som
- [ ] Tema automático por horário / `prefers-color-scheme`
**Aceite:** feedback sonoro opcional + tema adaptativo.
**Arquivos:** `app.js` (UI System, Theme Engine)
EOF
)
finalize_epic "$E7" "$E7_BODY" "$a" "$b" "$c" "$d" "$e" "$f"

# =============================================================================
#  ÉPICO 8 — Qualidade: Acessibilidade, Atalhos, PWA, Testes, Arquitetura
# =============================================================================
echo "▶ Épico 8 — Qualidade & Acessibilidade..."
E8_BODY=$(cat <<'EOF'
**Objetivo:** deixar o app sólido, acessível e fácil de evoluir.

**Inspiração:** boas práticas de PWA, a11y e CI.
EOF
)
E8=$(new_epic "♿ [ÉPICO] Qualidade, Acessibilidade & Arquitetura" "épico,quality" "$M3" <<<"$E8_BODY")
echo "  ✓ Épico #$E8"

a=$(new_sub "Acessibilidade (ARIA, foco, contraste, leitor de tela)" "accessibility,priority:media" "$M3" "$E8" <<'EOF'
**Contexto:** README #15.
**Tarefas:**
- [ ] ARIA labels em botões/links
- [ ] Foco visível e navegação por teclado
- [ ] Contraste adequado em todos os temas
**Aceite:** navegável por teclado e leitor de tela.
**Arquivos:** `app.js`, `styles.css`
EOF
)
b=$(new_sub "Atalhos de teclado" "ui-ux,good-first-issue" "$M3" "$E8" <<'EOF'
**Contexto:** README #14.
**Tarefas:**
- [ ] `n` = nova missão, `d` = dashboard, `m` = mercado
- [ ] Navegação por teclado entre abas
- [ ] Tela de ajuda com atalhos (`?`)
**Aceite:** principais ações têm atalho.
**Arquivos:** `app.js` (Router, UI System)
EOF
)
c=$(new_sub "Testes automatizados + CI (GitHub Actions)" "quality" "$M3" "$E8" <<'EOF'
**Tarefas:**
- [ ] Smoke test (carregar app, navegar views sem erro)
- [ ] Testes do Game Engine (XP/nível/moeda/HP)
- [ ] Workflow CI que roda os testes em cada push/PR
**Aceite:** PRs rodam testes verdes automaticamente.
**Arquivos:** `/tests`, `.github/workflows/ci.yml`
EOF
)
d=$(new_sub "Refatorar app.js em módulos (ES Modules)" "quality,enhancement" "$M3" "$E8" <<'EOF'
**Contexto:** hoje é single-file (1665 linhas). Manter funcionando, mas modular.
**Tarefas:**
- [ ] Separar engine, store, views, ui em módulos
- [ ] Build simples (opcional) mantendo PWA
- [ ] Sem mudança de comportamento
**Aceite:** mesma funcionalidade, código mais sustentável.
**Arquivos:** `app.js` → `/src/*`
EOF
)
e=$(new_sub "Performance & PWA polish (Lighthouse, cache, offline)" "pwa,quality" "$M3" "$E8" <<'EOF'
**Tarefas:**
- [ ] Auditar com Lighthouse (PWA/perf/a11y)
- [ ] Revisar estratégia de cache do `sw.js`
- [ ] Garantir 100% offline e atualização de versão
**Aceite:** instalável, rápido e confiável offline.
**Arquivos:** `sw.js`, `manifest.webmanifest`, `index.html`
EOF
)
finalize_epic "$E8" "$E8_BODY" "$a" "$b" "$c" "$d" "$e"

# =============================================================================
#  ÉPICO 9 — Fase Nuvem & Social
# =============================================================================
echo "▶ Épico 9 — Nuvem & Social..."
E9_BODY=$(cat <<'EOF'
**Objetivo:** sair do local-first para multi-dispositivo e social — onde o Habitica (party) e o Duolingo (friend streaks) ganham.

**Pré-requisito:** a Store já foi desenhada para trocar localStorage por API sem reescrever as views.
EOF
)
E9=$(new_epic "☁️ [ÉPICO] Fase Nuvem & Social" "épico,backend,social" "$M4" <<<"$E9_BODY")
echo "  ✓ Épico #$E9"

a=$(new_sub "Backend/API + Autenticação" "backend,priority:alta" "$M4" "$E9" <<'EOF'
**Contexto:** README #16.
**Tarefas:**
- [ ] API REST (Node/Express ou Supabase)
- [ ] Trocar Store.localStorage por Store.api (mesma interface)
- [ ] Auth (email, Google, GitHub)
**Aceite:** dados na nuvem sem reescrever as views.
**Arquivos:** `app.js` (Store), backend novo
EOF
)
b=$(new_sub "Sincronização multi-dispositivo" "backend" "$M4" "$E9" <<'EOF'
**Tarefas:**
- [ ] Sync de estado entre dispositivos
- [ ] Resolução de conflito (last-write-wins ou merge)
- [ ] Funcionar offline e sincronizar ao voltar
**Aceite:** jogar no celular e ver no PC.
**Arquivos:** `app.js` (Store), backend
EOF
)
c=$(new_sub "Social: amigos, feed e friend streaks" "social" "$M4" "$E9" <<'EOF'
**Inspiração:** Duolingo (friend streaks) — README #17.
**Tarefas:**
- [ ] Adicionar amigos (código/usuário)
- [ ] Feed de atividade dos amigos
- [ ] Friend streaks e desafios
**Aceite:** ver e incentivar amigos.
**Arquivos:** `app.js` (viewSocial), backend
EOF
)
d=$(new_sub "Clãs / parties com missão e boss compartilhado" "social" "$M4" "$E9" <<'EOF'
**Inspiração:** Habitica (party accountability) — README #18.
**Tarefas:**
- [ ] Criar/entrar em clã
- [ ] Missão/boss compartilhado (todos contribuem)
- [ ] Penalidade/bônus coletivo
**Aceite:** grupo progride junto com responsabilidade compartilhada.
**Arquivos:** `app.js` (viewClas), backend
EOF
)
e=$(new_sub "Rankings globais / temporadas competitivas" "social" "$M4" "$E9" <<'EOF'
**Inspiração:** Duolingo (ligas) — README #19.
**Tarefas:**
- [ ] Leaderboard global e por habilidade
- [ ] Temporadas com reset e recompensa
**Aceite:** competição global real (com backend).
**Arquivos:** `app.js` (viewRankings), backend
EOF
)
finalize_epic "$E9" "$E9_BODY" "$a" "$b" "$c" "$d" "$e"

# =============================================================================
echo ""
echo "✅ Pronto! Épicos e sub-issues criados em https://github.com/$REPO/issues"
echo "   Dica: filtre por label 'épico' para ver a visão macro, ou por milestone para o roadmap."
