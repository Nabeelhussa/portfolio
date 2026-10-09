# Nabeel Hussain – Portfolio

A light-themed, responsive portfolio built with plain HTML, CSS and JavaScript (no build step).

## Run it in VS Code
1. Open this folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

You can also just double-click `index.html` to open it in a browser.

## Files
- `index.html` – all five pages (Home, About, Projects, Resume, Contact). Each page is a `<div class="page" id="...">`.
- `css/style.css` – all styles. Colors and fonts are CSS variables at the top (`:root`).
- `js/main.js` – switches between pages using the URL hash and powers the contact form (opens the visitor's email app).
- `assets/photo.jpg` – your photo.
- `assets/Nabeel_Hussain_CV.pdf` and `.docx` – the CV files used by the Download buttons. Replace them with updated versions using the same names.

## Common edits
- **Change text or links:** edit `index.html`.
- **Change colors:** edit the variables in `:root` in `css/style.css`.
- **Add a project:** copy one `<article class="card">` block on the Projects page and change the text and links.
- **Project pictures:** the drawings are SVG symbols at the top of `index.html` (`a-deep`, `a-nexus`, `a-shop`, `a-park`, `a-vote`, `a-temp`). To use a real screenshot, put it in `assets/` and replace the `<svg>...</svg>` inside that project's `<a class="thumb">` with `<img src="assets/your-shot.png" alt="...">`. Add `style="width:100%;display:block"` to the image if needed.

## Publish for free
Upload the folder to Netlify, Vercel or GitHub Pages.
