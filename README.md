# LinkedIn Carousel Builder

Simple, zero‑build web app to design and export LinkedIn carousel posts. Create 2–10 slides (670×850 px), style them with your brand, add background images or shapes, and export a crisp PDF ready to upload.

Live demo: https://carousel-plati.netlify.app/

## Features

- Slides sized for LinkedIn: 670×850 px (portrait)
- Live templates: Classic cover, Bulleted list, Statement, Numbered steps, Image slide, Closing/CTA
- Global brand controls (left panel)
  - Logo upload and company name
  - Colors: Accent, Text, Background (applies to all slides)
  - Background shapes (FX): Blob (default), Rings, Waves, Diagonal, Grid, Soft dots, Corner arc, Zigzag
  - Overlay color + opacity (default 0)
  - Font family: Inter, General Sans, Outfit, Space Grotesk, Manrope, System UI
- Per‑slide background image with global overlay applied
- Duplicate/Delete slide controls
- PDF export at high quality (scale 8, PNG internally) with one page per slide

## Quick start

1. Clone or download this repository.
2. Open `index.html` in your browser (no server required).
3. Use the left panel to set brand, colors, shape FX, overlay, and fonts.
4. Insert slides with the template cards; edit text inline by clicking on each slide.
5. Upload your logo (top bar) and, if needed, per‑slide background images via the BG button on a slide.
6. Click “Export PDF” to download a ready‑to‑post document.

## Tips

- Maximum of 10 slides by design (LinkedIn carousel sweet spot). You can adjust this in `main.js` (`limitSlides`).
- For best readability, keep overlay opacity near 0–30% when using busy photos.
- PDF quality is set to scale 8 by default (very crisp, bigger file). Lower it inside `main.js` if needed.

## Project structure

```
linkedin-carrousel/
├── index.html      # UI and app layout (left panel + stage)
├── styles.css      # Theme tokens, slide styles, FX/overlay layers
├── main.js         # Slide templates, global controls, PDF export
└── README.md
```

## How it works

- Each slide is composed of layered elements:
  - `color-layer` (global background color)
  - `bg-layer` (per‑slide image)
  - `shape-layer` (global decorative SVG)
  - `shade-layer` (global overlay for readability)
  - `frame` (editable content) + brand footer (logo + name)
- Export uses `html2canvas` to rasterize slides and `jsPDF` to assemble a multi‑page PDF (670×850 per page).

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In the repo settings, enable GitHub Pages:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default), folder: `/root`
3. Your app will be available at `https://<user>.github.io/<repo>/`.

## Customization

- Add or edit templates in `main.js` (functions starting with `add...`).
- Tweak the palette in `styles.css` under `:root` CSS variables.
- To add more fonts, include them in `index.html` (Google Fonts link) and the left‑panel select.

## Tech

- Vanilla HTML/CSS/JS
- [html2canvas](https://html2canvas.hertzen.com/) and [jsPDF](https://github.com/parallax/jsPDF) via CDN

## License

MIT License. Use, modify, and distribute freely. Attribution appreciated.


