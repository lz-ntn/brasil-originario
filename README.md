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
    ├── js/principal.js
    └── img/og.png       # cartão Open Graph 1200×630
```

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

- **Cabeçalhos de segurança:** `Content-Security-Policy` restritivo (o único script
  inline é o que liga a classe `js`, autorizado por hash SHA-256), `X-Frame-Options:
  DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` e `Permissions-Policy`.
  Ao mudar o script inline, **recalcule o hash**:
  `printf '%s' '<conteúdo>' | openssl dgst -sha256 -binary | openssl base64`.
- **Cache:** `/assets/*` com `max-age=31536000, immutable`; HTML sempre revalidado
  (`must-revalidate`), para que uma correção apareça no próximo acesso.

Qualquer outro host estático (GitHub Pages, Netlify, Cloudflare Pages) também
funciona: basta apontar para a raiz. Não há variáveis de ambiente, backend ou banco.

## SEO

- `robots.txt` libera a indexação e aponta para o `sitemap.xml`.
- `sitemap.xml` lista as sete páginas com `lastmod`.
- Cada página tem `canonical`, `robots`, Open Graph e Twitter Card próprios, além de
  **JSON-LD** (`WebSite` na home, `WebPage` nas demais).
- Imagem de compartilhamento: `assets/img/og.png` (1200×630).

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
