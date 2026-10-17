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
├── fontes.html
└── assets/
    ├── css/estilo.css
    └── js/principal.js
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

Qualquer hospedagem de arquivos estáticos: Vercel, GitHub Pages, Netlify,
Cloudflare Pages. Basta apontar para a raiz do repositório. Não há variáveis de
ambiente, backend ou banco de dados.

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
