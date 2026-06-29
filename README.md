# ZÊNITE — Sua Vida em Modo RPG

> *"A jornada até o seu ápice."*

**ZÊNITE** é um PWA (Progressive Web App) gamificado de produtividade que transforma sua vida em um RPG. Missões, XP, moedas, habilidades, conquistas — tudo rodando **local-first** (offline, sem servidor, dados no navegador).

---

## Sumário

- [Status do Projeto](#status-do-projeto)
- [O que já está implementado](#o-que-já-está-implementado)
- [O que precisa ser implementado](#o-que-precisa-ser-implementado)
- [Roadmap Recomendado](#roadmap-recomendado)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Como Contribuir](#como-contribuir)

---

## Status do Projeto

| Camada | Status | Observação |
|--------|--------|------------|
| HTML (estrutura) | ✅ Completo | `index.html` com PWA meta tags, manifest e SW registration |
| CSS (design system) | ✅ Completo | 362 linhas, 6 temas, responsivo, animações |
| Service Worker | ✅ Completo | Cache offline-first, estratégia stale-while-revalidate |
| Manifest (PWA) | ✅ Completo | Instalável como app |
| Engine JS (app.js) | ✅ Funcional | 1665 linhas, núcleo completo |
| Features "Nuvem" | ❌ Placeholder | Social, Clãs, Rankings sem backend |
| QA / Testes | �Não iniciado | Sem testes automatizados |
| Backend / API | ❌ Não iniciado | Tudo local-first |

---

## O que já está implementado

### Núcleo do Jogo
- **Dashboard** — visão geral com KPIs (XP, moedas, HP, ofensiva), últimas missões, status do personagem
- **Campo (Missões)** — CRUD completo com filtros (todas/pendentes/concluídas), dificuldades (Fácil/Média/Difícil), habilidades associadas, missões diárias, toggle de conclusão com recompensa
- **Personagem** — perfil com avatar, nível, título, radar de habilidades, estatísticas (missões, hábitos, minutos de foco)
- **Mercado** — loja de itens com moedas, poção de cura, criação de itens personalizados

### Sistema de RPG
- **XP e Nivelamento** — 10 níveis (Iniciante → Lenda) com progressão por acúmulo de XP
- **Moedas** — ganhas em missões, gastas no mercado
- **HP** — sistema de vida com dano por falha (modo hardcore) e cura por poção
- **Ofensiva (Streak)** — dias consecutivos de produtividade
- **Habilidades** — Destreza, Saúde, Estudos, Gestão (com suporte a customSkills)
- **Conquistas** — 9 troféus com recompensa em moedas
- **Temas** — 6 paletas (Violeta, Azul, Verde, Rubi, Ouro, Neon)

### Features de Produtividade
- **Hábitos** — registro diário com streak tracking
- **Academia** — cadastro de exercícios com séries/reps e log de conclusão
- **Caverna (Pomodoro)** — timer foco/descanso configurável, sessões registradas, XP por foco
- **Finanças** — receitas/despesas por categoria, saldo, histórico
- **Estudos** — matérias com materiais (vídeo, artigo, livro)
- **Mídia** — catálogo filmes/séries/livros (quero ver / já vi) com avaliação
- **Notas** — bloco de notas com busca, pinagem, edição

### Infraestrutura
- **Store** — camada de abstração sobre localStorage com export/import JSON
- **State** — event emitter para reatividade simples
- **Router** — navegação hash-based com views modulares
- **Daily Reset** — reset de missões diárias, dano por falha, verificação de ofensiva
- **PWA** — instalável, offline-first via Service Worker
- **UI System** — toasts, modais, confirm dialog, level-up animation

---

## O que precisa ser implementado

### 🔴 Prioridade Alta

#### 1. Custom Skills — Interface de Criação
O modelo de dados (`player.customSkills`) já existe, mas não há UI para criar/editar habilidades customizadas.

**O que fazer:**
- Criar modal/tela em Configurações para adicionar habilidades customizadas (nome + ícone)
- Associar missões a habilidades customizadas
- Exibir no radar do Personagem

**Arquivos:** `app.js` (viewConfiguracoes, viewPersonagem)

#### 2. Água / Hidratação
O CSS já tem `.water-btns` mas não existe view ou funcionalidade.

**O que fazer:**
- Criar sistema de hidratação (8 copos/dia)
- Adicionar aos hábitos ou criar view separada
- Tracking visual de progresso diário

**Arquivos:** `app.js` (nova view ou integrar em hábitos), `styles.css` (já tem estilos)

#### 3. Calendário de Produtividade
O CSS já tem `.cal` mas não é usado.

**O que fazer:**
- Criar mini calendário no Dashboard ou em view dedicada
- Mostrar dias com missões concluídas, ofensiva, hábitos feitos

**Arquivos:** `app.js` (nova view ou componente no dashboard)

#### 4. Modo Hardcore Completo
Settings tem os toggle switches, mas a aplicação real do dano é básica.

**O que fazer:**
- Revisar `checkDailyReset()` para aplicar dano corretamente
- Mostrar aviso visual quando HP está baixo
- Game over / tela de "morte" quando HP = 0 (com opção de reviver gastando moedas)

**Arquivos:** `app.js` (checkDailyReset, viewPersonagem, viewDashboard)

### 🟡 Prioridade Média

#### 5. Finanças — Gráficos e Metas
**O que fazer:**
- Gráfico de despesas por categoria (pizza/barras)
- Limite mensal por categoria com alerta
- View mensal/anual

**Arquivos:** `app.js` (viewFinancas), `styles.css`

#### 6. Academia — Histórico e Progressão
**O que fazer:**
- Histórico de treinos por data
- Progressão de carga/reps ao longo do tempo
- Estatísticas semanais/mensais

**Arquivos:** `app.js` (viewAcademia)

#### 7. Estudos — Timer Integrado
**O que fazer:**
- Botão "Estudar agora" que inicia Pomodoro com a matéria selecionada
- Tracking de tempo por matéria
- Progresso de conclusão de materiais

**Arquivos:** `app.js` (viewEstudos, viewCaverna)

#### 8. Notas — Categorias e Markdown
**O que fazer:**
- Pastas/categorias para organizar notas
- Suporte básico a Markdown (negrito, itálico, listas)
- Preview vs edição

**Arquivos:** `app.js` (viewNotas, noteModal)

#### 9. Mídia — Filtros Avançados
**O que fazer:**
- Filtro por tipo (filme/série/livro)
- Campo de notas por item
- Ordenação por nota ou data

**Arquivos:** `app.js` (viewMidia)

### 🟢 Prioridade Baixa / Melhorias

#### 10. Recordes e Estatísticas
**O que fazer:**
- Tela de estatísticas detalhadas
- Recordes (maior streak, mais XP num dia, etc.)
- Gráfico de evolução do personagem

#### 11. Efeitos Sonoros
**O que fazer:**
- Som ao completar missão, subir de nível, comprar item
- Usar Web Audio API para sons leves (sem arquivos externos)

#### 12. Dashboard Customizável
**O que fazer:**
- Widgets que o usuário pode mostrar/esconder
- Layout ajustável

#### 13. Modo Noturno Automático
**O que fazer:**
- Alternar tema automaticamente baseado no horário
- Detectar preferência do sistema (`prefers-color-scheme`)

#### 14. Suporte a Teclado / Atalhos
**O que fazer:**
- Atalhos: `n` = nova missão, `d` = dashboard, `m` = mercado
- Navegação por teclado entre abas

#### 15. Acessibilidade (a11y)
**O que fazer:**
- ARIA labels em todos os botões e links
- Foco visível melhorado
- Suporte a leitores de tela
- Contraste de cores nos temas

### 🔵 Fase Nuvem (requer backend)

#### 16. Backend / API
O Store foi projetado para ser substituído por chamadas de API sem reescrever o app.

**O que fazer:**
- Criar API REST (Node.js + Express, ou Supabase)
- Substituir Store.localStorage por Store.api
- Autenticação (email, Google, GitHub)

#### 17. Social
**O que fazer:**
- Feed de atividade dos amigos
- Perfil público
- Mensagens

#### 18. Clãs
**O que fazer:**
- Grupos com missões compartilhadas
- Ranking do clã
- Bônus por participação

#### 19. Rankings
**O que fazer:**
- Leaderboard global
- Rankings por habilidade
- Temporadas competitivas

---

## Roadmap Recomendado

### Fase 1 — Polimento do Core (1-2 semanas)
```
□ Custom Skills — UI de criação
□ Água / Hidratação
□ Calendário de produtividade
□ Modo Hardcore completo (game over, reviver)
□ Bug fixes e polimento geral
```

### Fase 2 — Expansão de Features (2-3 semanas)
```
□ Finanças com gráficos
□ Academia com histórico
□ Estudos com timer integrado
□ Notas com Markdown
□ Mídia com filtros avançados
```

### Fase 3 — Experiência (2-3 semanas)
```
□ Recordes e estatísticas
□ Efeitos sonoros
□ Atalhos de teclado
□ Acessibilidade
□ Dashboard customizável
□ Testes automatizados
```

### Fase 4 — Nuvem (4-8 semanas)
```
□ API REST
□ Autenticação
□ Social
□ Clãs
□ Rankings
```

---

## Arquitetura do Projeto

```
FARM/
├── index.html              # Entry point PWA
├── styles.css              # Design system completo (362 linhas)
├── app.js                  # Engine JS (1665 linhas) — single file
├── sw.js                   # Service Worker (offline-first)
├── manifest.webmanifest    # PWA manifest
├── icons/
│   ├── icon-192.svg        # Ícone 192x192
│   ├── icon-512.svg        # Ícone 512x512
│   └── apple-touch-icon.svg# Ícone iOS
├── LEIA-ME.md              # Documentação original (português)
└── README.md               # Esta documentação
```

### Estrutura do app.js

| Seção | Linhas | Descrição |
|-------|--------|-----------|
| ICONS | 1-44 | Mapa de SVG inline para todos os ícones |
| CONSTANTS | 48-117 | Níveis, dificuldades, habilidades, conquistas, temas |
| DEFAULTS | 121-142 | Modelo de dados inicial |
| Store | 147-182 | Abstração localStorage com export/import |
| State | 187-192 | Event emitter para reatividade |
| Routes + Router | 197-238 | Definição de rotas e navegação hash-based |
| UI System | 244-285 | Toast, Modal, Confirm, LevelUp |
| Theme Engine | 290-300 | Aplicação de temas via CSS custom properties |
| Game Engine | 305-407 | XP, moedas, HP, rewards, achievements |
| Sidebar + Topbar | 412-498 | Renderização do layout |
| Views (11-17) | 507-1556 | Implementação de cada tela |
| Daily Reset | 1561-1604 | Reset diário, dano, streak |
| Init | 1621-1664 | Bootstrap da aplicação |

### Fluxo de Dados

```
Usuário interage → View dispatches → Store.set() → State.emit() → renderAll()
                                    ↕
                              localStorage
```

### Princípios de Design

- **Local-first**: tudo funciona offline, dados no navegador
- **Store isolada**: plugar um backend depois sem reescrever views
- **Single-file JS**: app.js contém toda a lógica (escolha arquitetural para v1)
- **CSS custom properties**: temas via variáveis CSS, sem pré-processador
- **Hash routing**: navegação simples sem framework

---

## Guia de Desenvolvimento

### Pré-requisitos
- Navegador moderno (Chrome, Edge, Firefox, Safari)
- Para servir localmente: Python 3 ou Node.js

### Servir Localmente

```bash
# Com Python
cd D:/PROJETOS/FARM
python -m http.server 8000

# Com Node.js
npx serve .
```

Acesse `http://localhost:8000` no navegador.

### Como Adicionar uma Nova View

1. Adicione a rota em `ROUTES` no `app.js` (linha ~198)
2. Adicione a view no `VIEW_MAP` (linha ~1609)
3. Adicione no `NAV_GROUPS` se necessário (linha ~217)
4. Crie a função `view[NomeView]()` seguindo o padrão das existentes
5. Use `bindActions()` para conectar eventos DOM

### Como Adicionar um Novo Tema

1. Adicione o objeto no `THEMES` (linha ~83)
2. Adicione as cores no `themeStops` dentro de `viewTemas()` (linha ~1414)
3. O tema aparece automaticamente na galeria

### Padrões de Código

- **Estado global**: sempre via `Store.get()` / `Store.set()`
- **Reatividade**: `State.changed(key)` para notificar mudanças
- **Eventos**: use `data-action` nos elementos HTML e `bindActions()` para handlers
- **Modais**: use `openModal()`, `closeModal()`, `confirmModal()`
- **Notificações**: use `showToast(mensagem, tipo)` — tipos: `''`, `'gold'`, `'hp'`, `'success'`
- **Ícones**: use `icon('nome')` para SVG inline

---

## Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Commit suas mudanças: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/nome-da-feature`
5. Abra um Pull Request

### Convenções de Commit

- `feat:` — nova funcionalidade
- `fix:` — correção de bug
- `style:` — mudanças de estilo/CSS
- `refactor:` — refatoração sem mudança de comportamento
- `docs:` — documentação
- `chore:` — tarefas de manutenção

---

## Licença

MIT — sinta-se livre para usar, modificar e compartilhar.

---

*Documentação gerada em 2026-06-29 — projeto ZÊNITE v1, 1665 linhas de engine JS.*
