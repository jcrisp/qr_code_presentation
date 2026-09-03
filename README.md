# QR Codes in Ruby — slide deck

Open `01-title.html` in any browser. No build step, no server, no network — it runs
straight off disk.

- One HTML file per slide, numbered in running order.
- `slides.css` and `slides.js` are shared by all of them.
- Navigate: `→` / `space` / `PageDown` forward, `←` / `PageUp` back, `Home` / `End` to
  jump to the ends, `f` for fullscreen. Clicking the right of the screen advances, the
  left third goes back.

## Sizing

Type is sized in rem off one root value that scales with the viewport (~26px at 1080p),
so the deck adapts to whatever it is projected on. `slides.js` then shrinks that root
value if a slide would overflow the screen or push a code block sideways. It only ever
shrinks — growing sparse slides would make the type size wander between slides.

## Replacing the screenshots

`images/screen.png` and `images/print.png` are generated placeholders. Overwrite them
with the real screenshots, keeping the same filenames — nothing else needs changing.

## The QR code on the last slide

`images/link-qr.png` is the QR code for the commit link. To replace it, overwrite that
file keeping the same name — the slide sizes it via the `.qr` class, which adds a white
margin around it so it is not flush against the black background.

## Adding or reordering slides

Add the file, then add its filename to the `DECK` array at the top of `slides.js`. That
array is the single source of running order and drives the counter and progress bar.
