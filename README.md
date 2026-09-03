# QR Codes in Ruby — slide deck

Open `01-title.html` in any browser. No build step, no server, no network — it runs
straight off disk.

- One HTML file per slide, numbered in running order.
- `deck.css` and `deck.js` are shared by all of them.
- Navigate: `→` / `space` / `PageDown` forward, `←` / `PageUp` back, `Home` / `End` to
  jump to the ends, `f` for fullscreen. Clicking the slide does nothing — use the keys,
  or the arrows beside the slide counter.

## Sizing

Slides are authored in plain px. The `.slide` box shrink-wraps its own content
(`width: max-content` up to a 1280px wrap limit, `height: auto`), and `deck.js`
scales it with a CSS transform to whichever axis runs out first. So each slide fills
the screen on its own terms: a four-bullet slide scales up further than a slide with
a code block, instead of both being locked to one canvas.

The consequence is that type size varies between slides — a sparse slide genuinely
shows bigger text than a dense one. To make a slide's text larger, give it less
content; to make it smaller, add more.

## Replacing the screenshots

`images/screen.png` and `images/print.png` are generated placeholders. Overwrite them
with the real screenshots, keeping the same filenames — nothing else needs changing.

## The QR code on the last slide

`images/link-qr.png` is the QR code for the commit link. To replace it, overwrite that
file keeping the same name — the slide sizes it via the `.qr` class, which adds a white
margin around it so it is not flush against the black background.

## Adding or reordering slides

Add the file, then add its filename to the `DECK` array at the top of `deck.js`. That
array is the single source of running order and drives the counter and progress bar.
