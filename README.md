# Brasil Originário

**Pindorama · memória e verdade**

Site estático, sem dependências, que reúne com fontes verificáveis a história da
invasão de 1500 e do genocídio dos povos originários do Brasil. Não é um site de
opinião: cada número, data e afirmação cita a origem.

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Abertura: a escala do que houve, as quatro teses e os números-chave |
| `linha-do-tempo.html` | Cronologia de antes de 1500 até hoje, com filtros por período |
| `dossie.html` | O genocídio: definição da ONU, mecanismos, Relatório Figueiredo, CNV e dados de 2024 |
| `povos-linguas.html` | Povos extintos, as ~1.000 línguas perdidas e os que resistem |
| `mitos.html` | Refutação documentada das narrativas oficiais ("descobrimento", "foi doença"…) |
| `esperanca.html` | Carta de reconciliação: a verdade contada com afeto, sem confronto |
| `fontes.html` | Todas as fontes, com links |

## Tecnologia

HTML + CSS + JavaScript puro. Sem build, sem framework, sem rastreamento.
Funciona abrindo o `index.html` diretamente no navegador.

```
brasil-originario/
├── index.html
├── linha-do-tempo.html
├── dossie.html
├── povos-linguas.html
├── mitos.html
├── esperanca.html
├── fontes.html
├── robots.txt
├── sitemap.xml
├── vercel.json          # cabeçalhos de segurança e cache
└── assets/
    ├── css/estilo.css
    ├── js/cabeca.js     # classe js + shims window.va/window.si (sem inline)
    ├── js/principal.js  # interações
    └── img/
        ├── og.png                     # cartão Open Graph 1200×630
        ├── <slug>.webp / .jpg         # ilustrações de IA (selo "gerada por IA")
        ├── <slug>-640.webp            # variante leve para fundos de cabeçalho
        └── grafismos-boggiani, mulher-bandeira   # fotos em domínio público
```

Cada imagem existe em `.webp` (padrão) e `.jpg` (fallback), servidas por `<picture>`.

## Rodar localmente

```bash
# abrir direto
xdg-open index.html

# ou servir (recomendado, evita bloqueios de file://)
python3 -m http.server 5500
# depois acesse http://localhost:5500
```

## Publicar

Em produção na Vercel: **https://brasil-originario.vercel.app/**

O projeto Vercel está ligado a este repositório (`lz-ntn/brasil-originario`), então
**todo `git push` na `main` republica sozinho** — não é preciso rodar nada. O
`vercel.json` é lido a cada deploy e aplica:

- **Cabeçalhos de segurança:** `Content-Security-Policy` com `script-src 'self'` —
  **o site não tem nenhum script inline** (a classe `js` e os shims de analytics ficam
  em `assets/js/cabeca.js`), então não há hash de CSP para manter. Também
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy` e `connect-src` liberando `https://*.vercel-insights.com`
  (necessário ao Speed Insights).
- **Cache:** CSS/JS revalidados por ETag (`max-age=0, must-revalidate`) e imagens por
  1 dia. De propósito **sem `immutable`**: os arquivos não têm hash no nome, e
  `immutable` deixaria uma correção presa por até um ano no navegador de quem já
  visitou.

## Analytics

Web Analytics e Speed Insights da Vercel estão ativos: as páginas carregam
`/_vercel/insights/script.js` e `/_vercel/speed-insights/script.js` (ambos respondem
`200 application/javascript`). Eles só existem porque foram **habilitados no painel da
Vercel** (projeto → *Analytics* / *Speed Insights* → **Enable**); se forem desabilitados,
esses caminhos passam a dar 404 e o console acusa recurso faltante. O shim
`window.va`/`window.si` fica em `assets/js/cabeca.js` (nunca inline, para não quebrar o CSP).

Qualquer outro host estático (GitHub Pages, Netlify, Cloudflare Pages) também
funciona: basta apontar para a raiz. Não há variáveis de ambiente, backend ou banco.

## SEO

- `robots.txt` libera a indexação e aponta para o `sitemap.xml`.
- `sitemap.xml` lista as sete páginas com `lastmod`.
- Cada página tem `canonical`, `robots`, Open Graph e Twitter Card próprios, além de
  **JSON-LD** (`WebSite` na home, `WebPage` nas demais).
- Imagem de compartilhamento: `assets/img/og.png` (1200×630).

## Imagens e créditos

Há duas famílias, e a diferença entre elas é obrigatória:

**Reais — registro/documento, com crédito e licença na legenda:**
- `grafismos-boggiani` — fotografia de Guido Boggiani (1861–1902), **domínio público**.
- `mulher-bandeira` — fotografia em **domínio público** (confirmar a origem exata antes de
  reaproveitar fora deste projeto).

**Ilustrações geradas por IA — sempre com o selo "Ilustração gerada por IA":**
`ilustracao-ia-povos` (colagem), `dialogo-reconciliacao`, `floresta-renasce`,
`heranca-ancestral`, `orgulho-identidade`, `valeu-entao`. **Não são registro histórico** e
nenhuma representa fato, pessoa ou povo real. O selo nunca deve ser removido enquanto a
imagem for usada.

Onde aparecem:
- **Banner de abertura** — `index.html` (colagem de IA) e `esperanca.html` (retrato de IA).
- **Ilustração de seção** — `esperanca.html` (quatro figuras de IA) e `povos-linguas.html`
  (duas fotos reais).
- **Faixa de cabeçalho** — cada página interna escolhe a sua com
  `--cabecalho-img` no próprio `<section class="pagina-cabecalho">`; o fundo é desfocado,
  então usa a variante `-640.webp` (leve).

Toda figura é um `<figure>`/`<figcaption>` com crédito, `<picture>` com WebP + JPEG,
`srcset`/`sizes` (640w + tamanho cheio), `width`/`height` (evita salto de layout) e
`loading="lazy"` fora da dobra. Ao trocar uma imagem, mantenha crédito, licença, `alt` — e o
selo de IA, quando for o caso.

## Princípios editoriais

1. **Fonte para tudo.** Nenhum dado sem origem citada.
2. **Honestidade sobre incerteza.** Onde os historiadores divergem (sobretudo na
   população de 1500), o site mostra a faixa e nomeia os autores.
3. **Termo correto.** "Invasão", não "descobrimento". "Genocídio", com a definição
   jurídica da ONU e a ressalva sobre a prova de intenção.
4. **Corrigível.** Erro encontrado com fonte é bem-vindo.

## Licença

Uso livre para educação e memória. O conteúdo histórico pertence aos povos
originários e à humanidade.
