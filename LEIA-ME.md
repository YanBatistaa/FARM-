# ZÊNITE — sua vida em modo RPG

> *A jornada até o seu ápice.*

App web gamificado de produtividade, hábitos, finanças e segundo cérebro. **Local-first** (funciona offline, sem login, dados salvos no seu navegador) e já preparado como **PWA** para instalar no celular/PC.

---

## Como abrir

**Modo simples:** dê dois cliques em **`index.html`**. O app abre no navegador e já funciona — todo o progresso fica salvo nesse navegador.

**Como app instalável (PWA, recomendado):** o "instalar" e o modo offline completo exigem que os arquivos sejam servidos por um endereço (não `file://`). Duas formas fáceis:

- **Servidor local** (se tiver Python): abra a pasta `zenite` no terminal e rode
  `python -m http.server 8000` → acesse `http://localhost:8000` → no Chrome/Edge, ícone de **instalar** na barra de endereço.
- **Hospedagem grátis:** arraste a pasta `zenite` para **app.netlify.com/drop** → você recebe um link `https://...` → abra no celular e use "Adicionar à tela inicial".

---

## Como funciona (regras do jogo)

- **Missões** (aba Campo): cada tarefa vira missão. Dificuldade define a recompensa — Fácil `+20 XP`, Média `+40`, Difícil `+70` (com moedas proporcionais). Pode repetir todo dia (vira diária).
- **XP & Nível:** completar missões, hábitos, foco e estudos dá XP. Acumulou o bastante → sobe de nível e ganha título novo (Iniciante → Mercenário → Lenda...).
- **Moedas:** ganhas nas tarefas, gastas no **Mercado** em recompensas reais que você cria (ex: fast food, episódio de série) ou em poções de cura.
- **HP & modo hardcore:** em Configurações, ative "auto-falha" e "perder vida ao falhar" — missões não feitas tiram HP no dia seguinte.
- **Ofensiva (streak):** dias seguidos cumprindo tarefas/hábitos.
- **Habilidades:** Destreza, Saúde, Estudos, Gestão (+ as que você criar) sobem conforme o tipo de missão.
- **Conquistas:** 9 troféus com recompensa em moedas.

## O que tem dentro

**Núcleo:** Dashboard · Campo (missões) · Personagem · Mercado
**Vida:** Hábitos · Academia · Caverna (Pomodoro) · Finanças
**Segundo cérebro (do seu Notion):** Estudos (matérias + materiais) · Mídia (filmes/séries/livros: quero ver / já vi) · Notas
**Mais:** Conquistas · Temas (6 paletas) · Configurações

**Backup:** Configurações → Exportar/Importar dados (arquivo `.json`).

## Fase nuvem (depois)

Social, Clãs e Rankings precisam de servidor e outros usuários reais — estão como telas prontas marcadas "nuvem". A arquitetura já isola o armazenamento (`Store` no `app.js`), então plugar um backend depois é direto, sem reescrever o app.

## Personalizar

- **Nome/avatar:** Configurações → Perfil.
- **Cores:** aba Temas (ou edite as variáveis em `styles.css` / objeto `THEMES` no `app.js`).
- **Nome do app "ZÊNITE":** troque em `index.html`, `manifest.webmanifest` e no `.brand` do `app.js`.

---

*Feito como base v1. Social/clãs/rankings e qualquer coisa a mais do seu Notion entram nas próximas iterações.*
