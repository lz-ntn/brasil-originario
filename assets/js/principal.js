/* ==========================================================================
   Brasil Originário — interações (vanilla, sem dependências)
   ========================================================================== */
(function () {
  "use strict";

  /* Menu móvel --------------------------------------------------------- */
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav-principal");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var aberto = nav.classList.toggle("aberto");
      btn.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("aberto");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Cabeçalho com sombra ao rolar -------------------------------------- */
  var cabecalho = document.querySelector(".cabecalho");
  if (cabecalho) {
    var aoRolar = function () {
      cabecalho.classList.toggle("rolou", window.scrollY > 12);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
  }

  /* Revelação no scroll ------------------------------------------------ */
  var alvos = document.querySelectorAll(".revelar-scroll");
  if (alvos.length && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            obs.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    alvos.forEach(function (el) {
      obs.observe(el);
    });
  } else {
    alvos.forEach(function (el) {
      el.classList.add("visivel");
    });
  }

  /* Contadores animados ------------------------------------------------ */
  var contadores = document.querySelectorAll("[data-contar]");
  if (contadores.length && "IntersectionObserver" in window) {
    var obsCont = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          var el = entrada.target;
          obsCont.unobserve(el);
          var fim = parseFloat(el.getAttribute("data-contar"));
          var casas = parseInt(el.getAttribute("data-casas") || "0", 10);
          var separador = el.getAttribute("data-sep") === "milhar";
          var duracao = 1400;
          var inicio = performance.now();
          var sufixo = el.getAttribute("data-sufixo") || "";
          var prefixo = el.getAttribute("data-prefixo") || "";
          var passo = function (agora) {
            var t = Math.min((agora - inicio) / duracao, 1);
            var e = 1 - Math.pow(1 - t, 3);
            var atual = fim * e;
            var txt = atual.toLocaleString("pt-BR", {
              minimumFractionDigits: casas,
              maximumFractionDigits: casas,
              useGrouping: separador,
            });
            el.textContent = prefixo + txt + sufixo;
            if (t < 1) requestAnimationFrame(passo);
          };
          requestAnimationFrame(passo);
        });
      },
      { threshold: 0.5 }
    );
    contadores.forEach(function (el) {
      obsCont.observe(el);
    });
  } else {
    contadores.forEach(function (el) {
      var fim = parseFloat(el.getAttribute("data-contar"));
      var casas = parseInt(el.getAttribute("data-casas") || "0", 10);
      var separador = el.getAttribute("data-sep") === "milhar";
      el.textContent =
        (el.getAttribute("data-prefixo") || "") +
        fim.toLocaleString("pt-BR", {
          minimumFractionDigits: casas,
          maximumFractionDigits: casas,
          useGrouping: separador,
        }) +
        (el.getAttribute("data-sufixo") || "");
    });
  }

  /* Filtro da linha do tempo ------------------------------------------- */
  var filtros = document.querySelectorAll(".tempo-filtros button");
  if (filtros.length) {
    filtros.forEach(function (f) {
      f.addEventListener("click", function () {
        var valor = f.getAttribute("data-filtro");
        filtros.forEach(function (o) {
          o.setAttribute("aria-pressed", o === f ? "true" : "false");
        });
        document.querySelectorAll(".tempo-item").forEach(function (item) {
          var eras = (item.getAttribute("data-era") || "").split(" ");
          var mostrar = valor === "tudo" || eras.indexOf(valor) !== -1;
          item.style.display = mostrar ? "" : "none";
        });
      });
    });
  }
})();
