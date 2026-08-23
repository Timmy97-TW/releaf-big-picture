/* =============================================================================
   ReLeaf: the big picture
   -----------------------------------------------------------------------------
   Two jobs, and no third.

     1  reveal      the one-shot entrance, matching .rise elsewhere on the page
     2  emphasis    pointing at a piece of work lights the run it belongs to

   NOTHING OPENS. There is no panel to build, no state to remember and no route
   to change. Every word in the figure is in the markup before this file runs,
   so the drawing is complete with scripting off. If a future edit starts
   storing content in here, the section has stopped doing its job.

   THE LIGHTING RULES, IN FULL

     a step        lights itself and the work that feeds it
     a piece       lights itself, the step it joins, every step after that one
                   on the same line, and everything past the lines: the meeting
                   node, the map, the block. That is the answer to the only
                   question worth asking of a figure like this: how does my
                   work reach a farm. It also MARKS the pieces it talks to
                   elsewhere, in a quieter state, so the web of connections
                   shows without a permanent line cluttering the pipeline
     the node      lights both lines end to end, because that is what it joins
     the map       lights itself and the block, and marks what feeds it
     the end block lights everything

   Segments carry data-flow rather than data-lit, because a segment belongs to
   the gap after a step rather than to the step itself.
   ========================================================================== */

(function () {
  "use strict";

  var figure  = document.getElementById("figure");
  var join    = document.getElementById("join");
  var gis     = document.getElementById("gis");
  var term    = document.getElementById("term");
  if (!figure) return;

  var steps  = [].slice.call(figure.querySelectorAll(".step"));
  var chips  = [].slice.call(figure.querySelectorAll(".chip"));
  var stacks = [].slice.call(figure.querySelectorAll(".stack"));

  /* ---------------------------------------------------------- 1  reveal --- */

  var reduced = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced && "IntersectionObserver" in window) {
    figure.classList.add("will-rise");
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" }).observe(figure);
  }

  /* -------------------------------------------------------- 2  emphasis --- */

  function clear() {
    figure.removeAttribute("data-focus");
    figure.removeAttribute("data-line");
    steps.forEach(function (s) {
      s.removeAttribute("data-lit");
      s.removeAttribute("data-flow");
    });
    chips.forEach(function (c) {
      c.removeAttribute("data-lit");
      c.removeAttribute("data-rel");
    });
    stacks.forEach(function (s) { s.removeAttribute("data-lit"); });
    [join, gis, term].forEach(function (n) { if (n) n.removeAttribute("data-lit"); });
  }

  function litChip(chip) {
    chip.setAttribute("data-lit", "");
    var stack = chip.closest(".stack");
    if (stack) stack.setAttribute("data-lit", "");
  }

  /* The quiet half of the interaction. A card names the pieces of work it
     talks to, usually in the other zone, and pointing at it marks them. They
     are marked and not lit, so the run through the pipeline stays the loud
     thing and the web of who-talks-to-whom sits underneath it. */
  function relate(el) {
    var list = (el.getAttribute("data-with") || "").split(/\s+/);
    list.forEach(function (id) {
      if (!id) return;
      var t = document.getElementById(id);
      if (t && !t.hasAttribute("data-lit")) t.setAttribute("data-rel", "");
    });
  }

  /* light one line from a given column to its end, segments included */
  function runOut(line, from) {
    steps.forEach(function (s) {
      if (s.getAttribute("data-line") !== line) return;
      if (Number(s.getAttribute("data-step")) < from) return;
      s.setAttribute("data-lit", "");
      s.setAttribute("data-flow", "");
    });
  }

  /* everything downstream of the two lines: the meeting, the map, the block */
  function tail() {
    [join, gis, term].forEach(function (n) { if (n) n.setAttribute("data-lit", ""); });
  }

  function show(el) {
    clear();
    figure.setAttribute("data-focus", "1");

    if (el === term) {                                   /* the whole drawing */
      figure.setAttribute("data-line", "both");
      steps.forEach(function (s) {
        s.setAttribute("data-lit", "");
        s.setAttribute("data-flow", "");
      });
      chips.forEach(litChip);
      tail();
      return;
    }

    if (el === join) {                                   /* both lines, in full */
      figure.setAttribute("data-line", "both");
      runOut("bio", 1);
      runOut("eng", 1);
      tail();
      return;
    }

    if (el === gis) {                                    /* the map on outward */
      if (gis) gis.setAttribute("data-lit", "");
      if (term) term.setAttribute("data-lit", "");
      relate(el);
      return;
    }

    var line = el.getAttribute("data-line");
    if (line) {                                          /* a step */
      el.setAttribute("data-lit", "");
      var at = el.getAttribute("data-step");
      chips.forEach(function (c) {
        if (c.getAttribute("data-feeds") === line && c.getAttribute("data-at") === at) litChip(c);
      });
      return;
    }

    var feeds = el.getAttribute("data-feeds");           /* a piece of work */
    if (!feeds) return;
    litChip(el);
    if (feeds === "dep") {                               /* deployment sits past the lines */
      if (gis) gis.setAttribute("data-lit", "");
      if (term) term.setAttribute("data-lit", "");
      relate(el);
      return;
    }
    figure.setAttribute("data-line", feeds);
    runOut(feeds, Number(el.getAttribute("data-at")));
    tail();
    relate(el);                    /* after, so a lit node is never also marked */
  }

  /* Pointer and keyboard reach the same code path. Touch lands on pointerenter
     in every browser we have, and because nothing is hidden behind the
     emphasis, a device that never fires it loses nothing. */
  [].slice.call(figure.querySelectorAll(".step, .chip, .join, .gis, .term")).forEach(function (el) {
    el.addEventListener("pointerenter", function () { show(el); });
    el.addEventListener("pointerleave", clear);
    el.addEventListener("focus", function () { show(el); });
    el.addEventListener("blur", clear);
  });

  figure.addEventListener("pointerleave", clear);
})();
