
KUPA v2 — Static prototype (images updated to generated avatars)
---------------------------------------------------------------
This package is a static prototype designed for GitHub Pages.
Files:
  - index.html
  - assets/css/styles.css
  - assets/js/app.js
  - data/*.json   (profiles, events, news, legends)
How to replace generated avatars with real photos:
  - edit `data/profiles.json` and change the `image` field for any profile to a direct image URL you host (e.g. /assets/images/marwa.jpg)
  - commit & push to GitHub Pages repo; images in /assets/images will be served automatically.
Sources:
  - Maisori Marwa Kitayama (Parliament profile): https://parliament.go.ke/the-national-assembly/hon-maisori-marwa-kemero-kitayama
  - Mathias Nyamabe Robi (Parliament profile): https://www.parliament.go.ke/the-national-assembly/hon-robi-mathias-nyamabe
  - Prof Chacha Nyaigotti-Chacha (Wikipedia): https://en.wikipedia.org/wiki/Chacha_Nyaigotti-Chacha
  - Wilfred Machage (Wikipedia): https://en.wikipedia.org/wiki/Wilfred_Machage
  - Christine Bhoke Nchamah (Communications Authority of Kenya): https://www.ca.go.ke/bhoke-christina-nchamah
Notes:
  - This prototype uses generated avatars from ui-avatars.com for excellent placeholders.
  - If you'd like, I can:
    a) Replace each avatar with a real photo hosted in the repo (you can upload them here or give image URLs),
    b) Add a serverless function to fetch public images (Facebook/Twitter) safely,
    c) Add a GitHub Actions workflow to auto-deploy to GitHub Pages.
