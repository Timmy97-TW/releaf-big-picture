# The big picture &middot; V1

The closing section of the ReLeaf homepage, built to stand alone while it is being worked on.

**Live page:** https://timmy97-tw.github.io/releaf-big-picture/

This repository is **V1** and is settled. It is tagged `v1`. A second reading of the same
material, one level of abstraction higher, is being explored separately as V2; this one does not
change to accommodate it.

Drawn on the wiki's own design tokens, copied unmodified from
[`releaf-wiki`](https://github.com/Timmy97-TW/releaf-wiki) at `assets/css/tokens.css`, with the
same self-hosted Inter. Nothing in this repo forks the palette.

## What it is

Two lines run left to right, and they meet.

**Biology**, on top: a field under stress, a molecule chosen against it, cells that make the
molecule, a plant that comes through. **Engineering**, underneath: the call to make some, the green
light that sets the dose, the bioreactor that holds the culture, the hollow fibre membrane that
hands the protein over and keeps the cells in.

They meet at **the tandem run**, the only experiment on the board that joins a machine to a plant
with nobody carrying a tube between them. Past it sits **the map**, because one tandem run says the
line works once, and the map says how much land is under the stress, where, and in which month.
That is the step that turns a result into a claim about a country. Then the dark block, which is
where it ends up.

Above the biology line sits the biology work that feeds it. Below the engineering line sits the
engineering work. Under the map sits the deployment work, the business plan and the regulation it
has to fit inside. Nothing floats.

## Reading it

- **Nothing opens.** No panel, no modal, no drawer, no page change. Every label is on screen before
  you touch anything.
- **Point at a step** and the work that feeds it lights up.
- **Point at a piece of work** and it lights the step it joins, every step after that one on the
  same line, the node where the two lines meet, and the block after it. That is the answer to the
  only question worth asking of a figure like this: how does my work reach a farm.
- **Point at the node** and both lines light end to end, because that is what it joins.
- **Point at anything and its cross-links are marked in amber.** That is the quiet half of the
  interaction. Dose response marks Expression, the model and the light array. Outreach marks the
  farmers, the map and the business plan. The run through the pipeline stays the loud thing, and
  the web of who-talks-to-whom sits underneath it rather than being drawn as permanent lines that
  would turn the figure into a hairball. Cross-links live in `data-with` on each card.

Nothing is written under the drawing. There is no caption strip and no key: every label is in the
markup before the script runs.

Keyboard reaches all of it: every card is focusable and focus runs the same code path as hover.

## Three colour systems, and they do not overlap

**The zone** tells you which part of the team a piece of work belongs to. Green is biology, slate is
engineering, amber is deployment. It colours the wash behind a zone, the well behind its icons, the
connector that ties a card to its line, and the cross-link marks, so a card's home is legible before
a word on it is read.

**The ramp** tells you direction. Each line's four badges walk light to dark, and each band deepens
toward the right, where the two meet. The wet band also warms at its left edge, where the stress is.

**The icons** are coloured by what the object actually is.

## The icons

Every glyph is drawn from our own hardware or from the system schematic, not from a library. That is
the point of them: a generic flask says "science", and the culture carboy with its ribbed cap, its
pink medium, its rod cells and its stir bar says *this bottle*.

| Glyph | Drawn from |
|---|---|
| Cells that make it | the culture carboy: ribbed cap, pink medium, rods, stir bar |
| The handover, the harvest | the hollow fibre cartridge, both side ports in place |
| Green light | the 520 nm LED can and its cone |
| The light array | DIOPAL: the well plate seated on its sloped housing |
| The photometer | the tower on its open foot, light path lit, sensor box at the base |
| The reactor | base plate, cartridge column, carboy, pump head, tubing loop and its LED strip |
| A plant that comes through | the hydroponic tray, net pots on the rim, roots in the water |
| The call | the AIoT board, its chip lit |
| A molecule for it | the docking pose: the peptide at the mouth of the cleft |
| The map | Taiwan, with the salinity and heat layers laid over it |

Sources live in the wiki at `hardware/img/card-*.png` and
`assets/img/home/system-schematic-1600.png`. If a piece of hardware changes, redraw the glyph rather
than swapping in a library icon.

The palette is the wiki's own signal colours (leaf, amber, rust, slate) plus three interpolated mid
tones, because `tokens.css` carries only a 700 and a 100 for each signal colour and flat colour art
needs a middle. Every value in the sprite comes through `var()`.

## Where the evidence stops

A dashed outline means the work is designed and not yet run. That is the whole vocabulary, and the
readout says it in words, so the drawing needs no key.

Most of this project is not finished, and drawing it as finished would be the one thing on the
homepage that lies. Two of the eight steps are dashed, the node where the lines meet is dashed, and
five of the fifteen cards are dashed. The block at the end carries a **Still open** line naming the
three conditions the whole thing still depends on: a build cost we can put a number on, a
classification a Taiwanese regulator accepts, and a cooperative willing to run the thing.

## Behaviour worth keeping

- **Readable with no JavaScript and no motion.** The hidden state of the entrance is added by
  script, never by the stylesheet, so with scripting off the drawing is simply there.
- **Under 900px both lines turn vertical**: the biology line top to bottom with its work under each
  step, then the engineering line, then the node, the map, and the deployment work. Same markup, no
  second copy of the content to keep in sync.
- **Two motion primitives only**: one entrance on first sight, one highlight on point. Nothing
  scales, nothing bounces, and the focus ring is never transitioned.

## Merging into the homepage

1. Copy `assets/css/big-picture.css` and `assets/js/big-picture.js` into the wiki's `assets/`.
2. Paste the whole `<section class="band bigpic">` element into `index.html`, including the
   `<svg class="sprite">` block at the top of it. The sprite has to travel with the section: a
   `<use href="external.svg#id">` does not resolve reliably, so the symbols are inlined.
3. Add the stylesheet link and the script tag.
4. Delete the `<div class="shell">` element and the inline `<style>` block in the head. Both exist
   only so the standalone page has a body to sit in.

It reads as the last band, after **Explore our project**, which is `band--tint`, so this one stays
on white. The section also declares `--ink` and `--sig-green`; `home.css` already defines both for
the dark act, so those two lines can go at merge.

## A conflict worth knowing about

`tokens.css` sets `--font-display` and `--font-body` to the same face. The pre-flight rule is to
preserve a project's font stack rather than fork it, so this section does. The comment at the top of
`tokens.css` already notes that the homepage brief argues against Inter and that swapping the site
over is an edit to two variables. If that swap happens, this section follows it with no changes.

## Editing the content

Everything readable is in `index.html`. A card is a `.chip` with an `id`, `data-feeds="bio|eng|dep"`,
`data-at="<step number>"`, an optional `data-with="<space separated ids>"` and an
`<svg class="ico ico--chip">` pointing at a symbol in the sprite. A step is a `.step` with
`data-line` and `data-step`. Add `data-ev="none"` to draw the outline dashed. The script reads those
attributes and holds no content of its own, so adding a piece of work is one element, one symbol,
and no JavaScript.

Related pages: the [judging session board](https://timmy97-tw.github.io/judging-session-prep/) and
the [iGEM bioreactor landscape](https://timmy97-tw.github.io/igem-bioreactor-landscape/).
