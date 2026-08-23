# Project big picture

The terminal section of the ReLeaf homepage, built to stand alone while it is being developed.

**Live page:** https://timmy97-tw.github.io/releaf-big-picture/

## What this is

A judge scrolls to the bottom of the homepage having been told what we believe. This is where they
are shown that the work holds together. It occupies exactly one viewport and never scrolls the page,
because the argument is that the project is one object, and an object you have to scroll is not one
object.

Twenty-three workstreams. They are not twenty-three projects. Each one sits on a single chain: a
field in Taiwan, a molecule chosen for the stress in it, a machine that makes the molecule, an assay
that says whether it did anything, and a route back to that field at a cost somebody will pay under a
law that exists.

## How the screen is divided

| | Column | Answers |
|---|---|---|
| left | **The loop** | What the thing is. Eight steps, one drawn open. |
| centre | **The board** | What we did. All twenty-three workstreams, in two arrangements. |
| right | **The arithmetic** | What it is for. Six numbers that either close or do not. |
| foot | **Threads and counts** | How it hangs together, and how far along it honestly is. |

Each column filters the other two.

- **Hover a station on the loop** and the board shows only the work serving that step of the machine.
  Four workstreams sit outside the loop entirely, and the left column names them.
- **Pick a thread** and its route lights across the board. Six threads, drawn behind the cards so a
  route reads as one continuous line rather than a hairball.
- **Click an arithmetic row** and it opens the workstream that owes that number.
- **Click any card** for what it produces, what it hands on, where it sits in the loop, and the
  individual pieces of work inside it with their own status.

## The two arrangements

**By stage** puts the twenty-three cards in six columns, left to right, in the order the work has to
happen. **By evidence** puts the same twenty-three cards into three bands: data in hand, under way,
not yet run. The cards animate between the two arrangements rather than being redrawn, so it stays
visible that it is one set of work seen two ways.

The second arrangement is the one worth showing a judge. Trace *the molecule* thread under it and the
route starts in the top band and finishes in the bottom, which says in one picture that the design is
done and the biology is not.

## The rule this page keeps

Filled marks are data in hand. Outline marks are designed and not yet run. The counts at the foot are
computed from the board at load, so they cannot be rounded up by hand.

Two slots in the arithmetic are open on purpose and will stay open. There is no bill-of-materials
total, so no page of ours may say cheap, low-cost or affordable, or quote a per-unit price. Contained
use is a classification we are pursuing rather than one we hold, and it has not been confirmed by a
Taiwan regulator.

No biological output has been measured. The light response is design intent and not a curve in our
hands, the membrane is intended to retain every cell rather than demonstrated to, and no plant has
received anything. Step 7 to step 8 of the loop is drawn as a gap because delivery currently stops at
a reservoir.

## The keystone

One card carries a ring: **the reactor to hydroponics tandem run** (串聯bioreactor與水耕箱). It is the
only experiment on the board that closes the chain end to end. Everything else proves a link. That
one proves the line, and it is also what would close the open step of the loop, because it forces the
reservoir to root-zone interface to exist rather than be deferred.

## Merging into the homepage

Single self-contained `index.html`. No build step and no dependencies beyond Google Fonts. Open it
directly in a browser to work on it.

At merge time:

1. Delete the whole `<div class="devshell">` element.
2. Swap the Google Fonts link for the wiki's self-hosted, subset Source faces. The iGEM wiki blocks
   external font hosts.
3. Keep everything else. Tokens are lifted from the homepage (Studio theme, Source superfamily,
   forest green anchor), so the section drops in without a reskin.

The section claims one full viewport only where there is room to honour it. Below 821px wide or
620px tall the same markup falls back to ordinary flow and scrolls, and a compressed tier steps
every size down one notch on short laptop screens so no pane ever grows its own scrollbar.

## Editing the content

Everything readable on the page comes from four arrays at the top of the `<script>` block:
`STAGES`, `THREADS`, `RING` with `EDGES`, `NODES`, and `CONV` with `END`. Add a workstream by adding
one object to `NODES`; the board, the loop filter, the counts and the thread membership all follow.
Nothing below the data block needs to change.

## Sources

Content is drawn from the team's project brief, the wet-lab instructor's assay list, the stakeholder
engagement log and the regulation research. Where a number is not on record the page says so rather
than guessing. Context figures are FAO, cited on the page.

Related pages: the [judging session board](https://timmy97-tw.github.io/judging-session-prep/) and
the [iGEM bioreactor landscape](https://timmy97-tw.github.io/igem-bioreactor-landscape/).
