# AGENTS.md — Brasil Originário

Site **estático** (HTML + CSS + JS puro) em PT-BR: dossiê com fontes sobre a invasão
de 1500 e o genocídio dos povos originários. Sem build, sem framework, sem package
manager, sem testes. **Não rode `npm`/`pnpm`/bundler** — não existe.

Contexto mais amplo do ecossistema (`~/vidaReal`): `~/vidaReal/AGENTS.md`. Ele pode
**não** carregar aqui dentro, porque a busca de instruções para na raiz deste repo.

## Rodar e verificar

- Servir local: `python3 -m http.server 5500` (depois `http://localhost:5500`).
  `file://` funciona, mas pode bloquear recursos.
- Não há linter/teste. A verificação é abrir no navegador + checar links/âncoras.
- Verificação rápida e útil (usada neste repo): um script Python que (1) confere se
  todo `href`/`src`/âncora resolvem, (2) valida o JSON/JSON-LD embutido e (3) garante
  que **não há `<script>` inline executável**. Rode ad-hoc; não está commitado.

## Deploy

- Produção: https://brasil-originario.vercel.app/ — Vercel ligada ao repo
  `lz-ntn/brasil-originario`. **`git push` na `main` = deploy automático** (~10s).
  Deploy **não** é feito por `vercel` CLI nem por workflow de CI.
- Publicar exige a conta `gh` **lz-ntn** (o padrão do ambiente pode ser `losmanim`):
  `gh auth switch --user lz-ntn`. O autor do commit já está fixado no repo
  (`lz-ntn <302248648+lz-ntn@users.noreply.github.com>`).

## O que um agente erraria aqui

- **CSP é `script-src 'self'`: NENHUM script inline.** Todo JS mora em arquivo, nunca
  em `<script>…</script>`. `assets/js/cabeca.js` (no `<head>`, roda antes da pintura —
  põe a classe `js` e os shims de analytics) ou `assets/js/principal.js` (fim do
  `<body>`). Script inline novo é **bloqueado em produção**.
- **Não há template/include: cabeçalho, nav e rodapé são copiados nas 7 páginas.**
  Mudar um item de menu = editar nav **e** o rodapé "Navegar" em todas as páginas. O
  `aria-current="page"` fica só na página atual.
- **O domínio está escrito à mão** em `canonical`, `og:url`, `og:image`, `twitter:image`,
  `sitemap.xml` e `robots.txt`. Trocar de domínio = atualizar todos.
- **As interações dependem de atributos no HTML** (lidos por `assets/js/principal.js`):
  - contadores: `data-contar` (número cru, ex. `1694836` — sem pontos/vírgula) +
    `data-sep="milhar"`, `data-casas`, `data-sufixo`, `data-prefixo`;
  - filtros da linha do tempo: `data-filtro` (botão) contra `data-era` (item).
- **`.revelar-scroll` só esconde conteúdo quando `<html>` tem a classe `js`** (posta por
  `cabeca.js`); sem JS tudo aparece. É vanilla — não introduza framework.
- **Analytics Vercel** ativos via `/_vercel/insights/script.js` e
  `/_vercel/speed-insights/script.js`; o shim `window.va`/`window.si` fica em
  `cabeca.js`. Se desabilitar no painel da Vercel, esses caminhos dão 404.

## SEO (manter ao criar página)

- Cada página carrega `canonical`, `robots`, Open Graph, Twitter Card e `JSON-LD`
  próprios (`WebSite` na home, `WebPage` nas demais). Ao criar página nova, copie o
  bloco de outra e ajuste título/descrição/URL — **e adicione a URL ao `sitemap.xml`**.
- Imagem social única: `assets/img/og.png` (1200×630).

## Imagens

- Sempre `<picture>` com WebP + JPEG, `srcset`/`sizes` (640w + tamanho cheio),
  `width`/`height` (evita salto de layout) e `loading="lazy"` **fora da dobra**; legenda em
  `<figure>`/`<figcaption>` com **crédito e licença**.
- **Toda imagem gerada por IA leva o selo "Ilustração gerada por IA"** e nunca é
  apresentada como registro histórico: `ilustracao-ia-povos`, `dialogo-reconciliacao`,
  `floresta-renasce`, `heranca-ancestral`, `orgulho-identidade`, `valeu-entao`. Só
  `grafismos-boggiani` e `mulher-bandeira` são fotos reais (domínio público).
- Faixa de cabeçalho: cada página interna escolhe a sua imagem com
  `style="--cabecalho-img:url('assets/img/<slug>-640.webp')"` no próprio
  `<section class="pagina-cabecalho">` (o fundo é desfocado, então use sempre a variante
  `-640.webp`). Não duplique CSS de cabeçalho por página.
- Nome de arquivo nunca com parênteses, acento ou maiúscula (quebra URL) — use slug.

## Conteúdo — regra de ouro

- **Todo número, data e afirmação cita a fonte** (IBGE, Funai, CNV, Cimi, ONU, ISA,
  produção acadêmica). Onde os historiadores divergem (sobretudo a população de 1500),
  mostre a **faixa** e nomeie os autores — nunca escolha o número mais dramático.
- Termos corretos: "invasão" (não "descobrimento"), "genocídio" com a definição
  jurídica da ONU. Página `mitos.html` refuta as narrativas; `esperanca.html` é
  reconciliação (tom afetuoso, sem confronto) — não transforme uma na outra.

## Estilo

- Indentação de 2 espaços em HTML/CSS/JS. Sem emojis.
- CSS **sem Tailwind**: tokens em `:root` de `assets/css/estilo.css`, classes em
  português (`.numero`, `.card`, `.tempo-item`, `.mito`…). Reuse os primitivos
  existentes em vez de criar estilo solto.
