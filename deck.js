/* Deck navigation + a tiny Ruby highlighter.

   One HTML file per slide; this script knows the running order and moves
   between them. No libraries on purpose - a talk about deleting a dependency
   should not pull in a syntax-highlighting library to render its own code. */

(function () {
  var DECK = [
    "01-title.html",
    "02-problem.html",
    "03-screen.html",
    "04-print.html",
    "05-choosing-a-gem.html",
    "06-cutting-the-dependency.html",
    "07-generating.html",
    "08-testing-what-we-skipped.html",
    "09-testing-what-we-did.html",
    "10-proving-it-changed.html",
    "11-layered-coverage.html",
    "12-takeaways.html",
    "13-questions.html"
  ];

  var here = location.pathname.split("/").pop() || DECK[0];
  var index = DECK.indexOf(here);
  if (index < 0) index = 0;

  function go(offset) {
    var target = index + offset;
    if (target < 0 || target >= DECK.length) return;
    location.href = DECK[target];
  }

  document.addEventListener("keydown", function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "Home") {
      location.href = DECK[0];
    } else if (event.key === "End") {
      location.href = DECK[DECK.length - 1];
    } else if (event.key === "f") {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  });

  // Click the right two thirds to advance, the left third to go back.
  document.addEventListener("click", function (event) {
    if (event.target.closest("a")) return;
    go(event.clientX < window.innerWidth / 3 ? -1 : 1);
  });

  function addChrome(slide) {
    // on the body, not the slide: it must not scale with the slide, and must not
    // be hidden while the slide waits to be fitted
    var progress = document.createElement("div");
    progress.className = "progress";
    progress.style.width = ((index + 1) / DECK.length * 100) + "%";
    document.body.appendChild(progress);

    var counter = document.createElement("div");
    counter.className = "counter";
    counter.innerHTML =
      '<a href="' + DECK[Math.max(index - 1, 0)] + '">&#8592;</a>' +
      (index + 1) + " / " + DECK.length +
      '<a href="' + DECK[Math.min(index + 1, DECK.length - 1)] + '">&#8594;</a>';
    slide.appendChild(counter);
  }

  var KEYWORDS = /^(def|end|do|if|elsif|else|unless|then|return|require|class|module|self|nil|true|false|and|or|not|new|it|expect|to|be|eq|find|select|yield|begin|rescue|ensure)$/;

  var TOKEN = new RegExp(
    [
      "#[^\\n]*",                          // comment
      '"(?:[^"\\\\]|\\\\.)*"',             // double-quoted string
      "'(?:[^'\\\\]|\\\\.)*'",             // single-quoted string
      "::",                                // scope operator, so Foo::Bar isn't read as a symbol
      ":[A-Za-z_][A-Za-z0-9_]*",           // symbol
      "[A-Za-z_][A-Za-z0-9_]*[?!]?",       // word
      "\\d+"                               // number
    ].join("|"),
    "g"
  );

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function classify(token) {
    if (token[0] === "#") return "tok-comment";
    if (token[0] === '"' || token[0] === "'") return "tok-string";
    if (token[0] === ":") return "tok-symbol";
    if (/^\d/.test(token)) return "tok-number";
    if (/^[A-Z]/.test(token)) return "tok-constant";
    if (KEYWORDS.test(token)) return "tok-keyword";
    return null;
  }

  function highlight(block) {
    var source = block.textContent;
    var output = "";
    var last = 0;
    var match;

    TOKEN.lastIndex = 0;
    while ((match = TOKEN.exec(source)) !== null) {
      output += escapeHtml(source.slice(last, match.index));
      var className = classify(match[0]);
      output += className
        ? '<span class="' + className + '">' + escapeHtml(match[0]) + "</span>"
        : escapeHtml(match[0]);
      last = match.index + match[0].length;
    }
    output += escapeHtml(source.slice(last));
    block.innerHTML = output;
  }


  /* Scale each slide to fill the screen.

     The slide box shrink-wraps its own content, so offsetWidth/offsetHeight are
     the real content size (layout metrics, unaffected by any transform already
     applied). Scaling to whichever axis runs out first means a slide with four
     bullets fills the screen just as a slide with a code block does. */

  function fit() {
    var slide = document.querySelector(".slide");
    if (!slide) return;
    var scale = Math.min(
      window.innerWidth / slide.offsetWidth,
      window.innerHeight / slide.offsetHeight
    );
    slide.style.transform = "scale(" + scale + ")";
    slide.classList.add("fitted");
  }

  // Images have no intrinsic size until they load, which would make the first
  // measurement wrong. On a slide with one, hold the reveal until it is ready.
  function imagesReady() {
    var images = document.images;
    for (var i = 0; i < images.length; i++) if (!images[i].complete) return false;
    return true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      addChrome(document.querySelector(".slide"));
      var blocks = document.querySelectorAll("pre code.ruby");
      for (var i = 0; i < blocks.length; i++) highlight(blocks[i]);
      if (imagesReady()) fit();
    } finally {
      // never leave a slide invisible, whatever went wrong above
      setTimeout(function () {
        var slide = document.querySelector(".slide");
        if (slide) slide.classList.add("fitted");
      }, 700);
    }
  });

  window.addEventListener("load", fit);   // measures correctly once images are in
  window.addEventListener("resize", fit);
  document.addEventListener("fullscreenchange", fit);
})();
