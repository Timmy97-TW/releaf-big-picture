/* =============================================================================
   ReLeaf: the big picture
   -----------------------------------------------------------------------------
   Two jobs, and no third.

     1  reveal      the one-shot entrance, matching .rise elsewhere on the page
     2  emphasis    pointing at a piece of work lights the run it belongs to and
                    writes one sentence under the drawing

   NOTHING OPENS. There is no panel to build, no state to remember and no route
   to change. Every word in the figure is in the markup before this file runs,
   so the drawing is complete with scripting off. If a future edit starts
   storing content in here, the section has stopped doing its job.

   THE LIGHTING RULES, IN FULL

     a step        lights itself and the work that feeds it
     a piece       lights itself, the step it joins, every step after that one
                   on the same line, the node the two lines meet at, and the
                   block after it. That is the answer to the only question
                   worth asking of a figure like this: how does my work reach
                   a farm
     the node      lights both lines end to end, because that is what it joins
     the end block lights everything

   Segments carry data-flow rather than data-lit, because a segment belongs to
   the gap after a step rather than to the step itself.
   ========================================================================== */

(function () {
  "use strict";

  var figure  = document.getElementById("figure");
  var readout = document.getElementById("readout");
  var join    = document.getElementById("join");
  var term    = document.getElementById("term");
  if (!figure || !readout) return;

  var steps  = [].slice.call(figure.querySelectorAll(".step"));
  var chips  = [].slice.call(figure.querySelectorAll(".chip"));
  var stacks = [].slice.call(figure.querySelectorAll(".stack"));
  var REST   = readout.innerHTML;

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
    chips.forEach(function (c) { c.removeAttribute("data-lit"); });
    stacks.forEach(function (s) { s.removeAttribute("data-lit"); });
    if (join) join.removeAttribute("data-lit");
    if (term) term.removeAttribute("data-lit");
    readout.innerHTML = REST;
    readout.removeAttribute("data-active");
  }

  function litChip(chip) {
    chip.setAttribute("data-lit", "");
    var stack = chip.closest(".stack");
    if (stack) stack.setAttribute("data-lit", "");
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

  function show(el) {
    clear();
    figure.setAttribute("data-focus", "1");
    readout.innerHTML = el.getAttribute("data-say") || REST;
    readout.setAttribute("data-active", "");

    if (el === term) {                                   /* everything */
      figure.setAttribute("data-line", "both");
      steps.forEach(function (s) {
        s.setAttribute("data-lit", "");
        s.setAttribute("data-flow", "");
      });
      if (join) join.setAttribute("data-lit", "");
      term.setAttribute("data-lit", "");
      return;
    }

    if (el === join) {                                   /* both lines, in full */
      figure.setAttribute("data-line", "both");
      runOut("wet", 1);
      runOut("dry", 1);
      join.setAttribute("data-lit", "");
      if (term) term.setAttribute("data-lit", "");
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
    figure.setAttribute("data-line", feeds);
    runOut(feeds, Number(el.getAttribute("data-at")));
    if (join) join.setAttribute("data-lit", "");
    if (term) term.setAttribute("data-lit", "");
  }

  /* Pointer and keyboard reach the same code path. Touch lands on pointerenter
     in every browser we have, and because nothing is hidden behind the
     emphasis, a device that never fires it loses nothing. */
  [].slice.call(figure.querySelectorAll("[data-say]")).forEach(function (el) {
    el.addEventListener("pointerenter", function () { show(el); });
    el.addEventListener("pointerleave", clear);
    el.addEventListener("focus", function () { show(el); });
    el.addEventListener("blur", clear);
  });

  figure.addEventListener("pointerleave", clear);
})();
