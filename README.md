# The big picture

The closing section of the ReLeaf homepage, built to stand alone while it is being worked on.

**Live page:** https://timmy97-tw.github.io/releaf-big-picture/

Drawn on the wiki's own design tokens, copied unmodified from
[`releaf-wiki`](https://github.com/Timmy97-TW/releaf-wiki) at `assets/css/tokens.css`, with the
same self-hosted Inter. Nothing in this repo forks the palette or the type.

## What it is

A judge who has read the whole homepage arrives with one question left: does all of that add up to
one thing. This section answers it as a drawing rather than a paragraph.

Six numbered steps run left to right on a tinted band, from a field under stress to a crop that came
through it, and the band ends in a dark block naming what still has to be true before the line
reaches a farm. Above the band is what we made. Below it is how we know. A hairline returns along
the bottom to the start, because the map and the farmers are both where the work began and where it
goes back to.

Fourteen pieces of work, six steps, one end block. That is the resolution the drawing holds. An
earlier version carried twenty-three workstreams with a subtitle each, and the subtitles turned
fourteen cards into fourteen paragraphs competing with the line they were meant to feed.

The section opens on its heading and goes straight into the drawing. It used to carry a kicker, a
paragraph and a key as well; all three explained a figure that explains itself, and between them
they cost about two hundred pixels of the screen the drawing was meant to fill.

## Reading it

- **Nothing opens.** No panel, no modal, no drawer, no page change. Every label is on screen before
  you touch anything.
- **Point at a step** and the work that feeds it lights up.
- **Point at a piece of work** and it lights the step it joins, every step after that one, and the
  block at the end. That is the answer to the only question worth asking of a figure like this:
  how does my work reach a farm.
- **Point at the end block** and the whole line lights.
- One readout line under the drawing names the relationship in words. It is the only thing that
  changes, and it changes in place.

Keyboard reaches all of it: every card is focusable and focus runs the same code path as hover.

## The icons

Every glyph is drawn from our own hardware or from the system schematic, not from an icon library.
That is the point of them: a generic flask says "science", and the culture bottle with its ribbed
cap, its fill line and its stir bar says *this bottle*.

| Glyph | Drawn from |
|---|---|
| Protein made | the culture carboy: ribbed screw cap, fill line, rod cells, stir bar |
| The handover, the harvest | the hollow fibre cartridge, both side ports in place |
| Green light | the 520 nm LED can and its cone, off the system schematic |
| The light array | DIOPAL: the sloped housing with the well block seated on top |
| The photometer | the tower on its open square foot, sensor box at the base |
| The reactor | the base plate, the cartridge column, a carboy, the pump head, the tubing loop |
| Into the crop, the tandem run | the hydroponic tray, net pots on the rim and roots in the water |
| The call | the AIoT board that reads the sensor and the forecast |
| The molecule | the docking pose: a receptor cleft with the peptide at its mouth |

The CAD renders they were traced from live in the wiki at `hardware/img/card-*.png`, and the
schematic at `assets/img/home/system-schematic-1600.png`. If a piece of hardware changes, redraw the
glyph rather than swapping in a library icon.

One stroke voice throughout: round caps and joins, no fills except the parts meant to read as live,
which are the wells, the cells, the bands, the residues and the site marker.

## Where the evidence stops

A dashed outline means the work is designed and not yet run. That is the whole vocabulary, and the
readout says it in words, so the drawing needs no key. An earlier build carried a three-mark system
with a legend above the figure; the legend explained a distinction the dashes make on their own.

Most of this project is not finished, and drawing it as finished would be the one thing on the
homepage that lies. Two of the six steps are dashed, and three more carry a sentence saying where
the evidence stops, at the same size as the claim it limits. The end block names the three
conditions the line still depends on, and says plainly that none of them is closed.

## Behaviour worth keeping

- **Readable with no JavaScript and no motion.** The hidden state of the entrance is added by
  script, never by the stylesheet, so with scripting off the drawing is simply there. Check with
  `prefers-reduced-motion` before shipping a change.
- **Under 820px the line turns vertical**: each step, then the work that made it, then the work
  that checks it. Same markup, same order of argument, no second copy of the content to keep in
  sync. Between 820 and 1060 the drawing scrolls sideways inside its own frame and says so.
- **Two motion primitives only**: one entrance on first sight, one highlight on point. Nothing
  scales, nothing bounces, and the focus ring is never transitioned.

## Merging into the homepage

Four steps.

1. Copy `assets/css/big-picture.css` and `assets/js/big-picture.js` into the wiki's `assets/`.
2. Paste the whole `<section class="band bigpic">` element into `index.html`, including the
   `<svg class="sprite">` block at the top of it. The sprite has to travel with the section: a
   `<use href="external.svg#id">` does not resolve reliably, so the symbols are inlined.
3. Add the stylesheet link and the script tag.
4. Delete two things from this repo's copy: the `<div class="shell">` element and the whole inline
   `<style>` block in the head. Both exist only so the standalone page has a body to sit in.

It reads as the last band, after **Explore our project**, which is `band--tint`, so this one stays
on white.

The section also declares `--ink` and `--sig-green` in its own token block. `home.css` already
defines both for the dark act, so those two lines can go at merge.

## A conflict worth knowing about

`tokens.css` sets `--font-display` and `--font-body` to the same face. The pre-flight rule is to
preserve a project's font stack rather than fork it, so this section does. The comment at the top of
`tokens.css` already notes that the homepage brief argues against Inter and that swapping the site
over is an edit to two variables. If that swap happens, this section follows it with no changes.

## Editing the content

Everything readable is in `index.html`. A card is a `.chip` with `data-feeds="<step number>"`, a
`data-say="..."` sentence and an `<svg class="ico ico--chip">` pointing at a symbol in the sprite. A
step is a `.step` with `data-step` and `data-say`. Add `data-ev="none"` to draw the outline dashed.
The script reads those attributes and holds no content of its own, so adding a piece of work is one
element, one symbol, and no JavaScript.

Related pages: the [judging session board](https://timmy97-tw.github.io/judging-session-prep/) and
the [iGEM bioreactor landscape](https://timmy97-tw.github.io/igem-bioreactor-landscape/).
