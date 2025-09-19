
KUPA Pro — Green & Gold (Superb) — Static Prototype

This is a pro-grade static prototype for the KUPA platform built for the Kuria community.
Theme: Deep Green (#0b6b3f) and Royal Gold (#f5b700).

Files:
- index.html (single-page site)
- assets/css/styles.css
- assets/js/app.js
- assets/images/kuria-placeholder.svg
- data/*.json (profiles, news, events, legends)

Deploy:
1. Push repo to GitHub and enable GitHub Pages (main branch / root)
2. Replace placeholder avatars and images in /assets/images and update data/profiles.json to point to real images (recommended: Wikimedia Commons or user-uploaded images)

Notes:
- The site is static and stores join form submissions locally (localStorage) in this prototype. For production, connect a backend (Supabase, Firebase, or serverless functions) to store data, handle authentication, and integrate M-Pesa.
