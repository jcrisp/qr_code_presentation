# QR Codes in Ruby — slide deck

Open `01-title.html` in any browser. No build step, no server, no network — it runs
straight off disk.

- One HTML file per slide, numbered in running order.
- `slides.css` and `slides.js` are shared by all of them.
- Navigate: `→` / `space` / `PageDown` forward, `←` / `PageUp` back, `Home` / `End` to
  jump to the ends, `f` for fullscreen. Clicking the right of the screen advances, the
  left third goes back.

## Replacing the screenshots

`images/screen.png` and `images/print.png` are generated placeholders. Overwrite them
with the real screenshots, keeping the same filenames — nothing else needs changing.

## Adding or reordering slides

Add the file, then add its filename to the `DECK` array at the top of `slides.js`. That
array is the single source of running order and drives the counter and progress bar.
