/* =============================================================================
   ReLeaf: the big picture
   -----------------------------------------------------------------------------
   Two jobs, and no third.

     1  reveal      the one-shot entrance, matching .rise elsewhere on the page
     2  emphasis    pointing at a piece of work lights the part of the line it
                    belongs to and writes one sentence under the drawing

   NOTHING OPENS. There is no panel to build, no state to remember and no route
   to change. Every word in the figure is in the markup before this file runs,
   so the drawing is complete with scripting off. If a future edit starts
   storing content in here, the section has stopped doing its job.

   The lighting rules, in full:

     a step        lights itself and the work that feeds it
     a piece       lights itself, the step it joins, every step after that one,
                   and the block at the end. That is the answer to the only
                   question worth asking of a figure like this: how does my
                   work reach a farm
     the end block lights the whole line

   Segments of the line carry data-flow rather than data-lit, because a segment
   belongs to the gap after a step rather than to the step itself.
   ========================================================================== */

(function () {
  "use strict";

  var figure  = document.getElementById("figure");
  var readout = document.getElementById("readout");
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
    steps.forEach(function (s) {
      s.removeAttribute("data-lit");
      s.removeAttribute("data-flow");
    });
    chips.forEach(function (c) { c.removeAttribute("data-lit"); });
    stacks.forEach(function (s) { s.removeAttribute("data-lit"); });
    if (term) term.removeAttribute("data-lit");
    readout.innerHTML = REST;
    readout.removeAttribute("data-active");
  }

  function litChip(chip) {
    chip.setAttribute("data-lit", "");
    var stack = chip.closest(".stack");
    if (stack) stack.setAttribute("data-lit", "");
  }

  function show(el) {
    clear();
    figure.setAttribute("data-focus", "1");
    readout.innerHTML = el.getAttribute("data-say") || REST;
    readout.setAttribute("data-active", "");

    if (el === term) {                                    /* the whole line */
      steps.forEach(function (s) {
        s.setAttribute("data-lit", "");
        s.setAttribute("data-flow", "");
      });
      term.setAttribute("data-lit", "");
      return;
    }

    var n = Number(el.getAttribute("data-step"));
    if (n) {                                              /* a step */
      el.setAttribute("data-lit", "");
      chips.forEach(function (c) {
        if (Number(c.getAttribute("data-feeds")) === n) litChip(c);
      });
      return;
    }

    var joins = Number(el.getAttribute("data-feeds"));    /* a piece of work */
    if (!joins) return;
    litChip(el);
    steps.forEach(function (s) {
      var i = Number(s.getAttribute("data-step"));
      if (i < joins) return;
      s.setAttribute("data-lit", "");
      if (i >= joins) s.setAttribute("data-flow", "");
    });
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
