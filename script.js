/* ============================================================
   FOMO CAT — $FOMOCAT
   ============================================================ */
(function () {
  "use strict";

  /* ---------- toast ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 2600);
  }

  /* ---------- copy contract address ---------- */
  var copyBtn = document.getElementById("caCopy");
  var caValue = document.getElementById("caValue");

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      // if the clipboard API is blocked (permissions, embedded frame), fall back
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text);
      });
    }
    return legacyCopy(text);
  }

  // fallback for http / older browsers
  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  if (copyBtn && caValue) {
    copyBtn.addEventListener("click", function () {
      var ca = caValue.textContent.trim();
      copyText(ca).then(
        function () {
          var label = copyBtn.querySelector("span");
          if (label) label.textContent = "Copied";
          copyBtn.classList.add("is-done");
          toast("Contract address copied 😼");
          setTimeout(function () {
            if (label) label.textContent = "Copy";
            copyBtn.classList.remove("is-done");
          }, 2000);
        },
        function () {
          toast("Couldn't copy — select the address manually.");
        }
      );
    });
  }

  /* ---------- links that aren't live yet ---------- */
  var soonMessages = {
    telegram: "Telegram is opening very soon — the cat is still setting up the group 😼"
  };

  document.querySelectorAll("[data-soon]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var href = el.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        toast(soonMessages[el.dataset.soon] || "Coming soon.");
      }
    });
  });

  /* pump.fun links that still hold the placeholder */
  document.querySelectorAll('a[href="PUMPFUN_LINK"]').forEach(function (el) {
    el.setAttribute("href", "https://pump.fun");
  });

  /* ---------- sticky header ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          setTimeout(function () {
            el.classList.add("is-in");
          }, (i % 6) * 70);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- the cat follows your cursor ---------- */
  var cat = document.getElementById("cat");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  if (cat && !reduceMotion && finePointer) {
    var img = cat.querySelector("img");
    var target = { x: 0, y: 0 };
    var current = { x: 0, y: 0 };
    var raf = null;

    window.addEventListener(
      "mousemove",
      function (e) {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
        if (!raf) raf = requestAnimationFrame(tick);
      },
      { passive: true }
    );

    function tick() {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      img.style.transform =
        "translate3d(" + current.x * 14 + "px," + current.y * 12 + "px,0)" +
        " rotateY(" + current.x * 7 + "deg) rotateX(" + -current.y * 6 + "deg)";

      if (Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    cat.style.perspective = "900px";
    img.style.animation = "none"; // cursor tilt replaces the float loop
  }

  /* ---------- year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- konami-lite: the cat blinks once ---------- */
  var typed = "";
  window.addEventListener("keydown", function (e) {
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-5);
    if (typed === "blink") {
      toast("He blinked. You didn't see it. 👁️");
      typed = "";
    }
  });
})();
