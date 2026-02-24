# Level Up — Web Accessibility Services Website

A fully accessible, professional, single-page portfolio + client acquisition website for **Level Up Accessibility Services**.

## 📁 Project Structure

```
levelup-website/
├── index.html              ← Main website (fully accessible, semantic HTML5)
├── assets/
│   ├── css/
│   │   └── styles.css      ← All styles (responsive, custom animations)
│   ├── js/
│   │   └── main.js         ← Vanilla JS: nav, scroll reveal, form, counters
│   └── images/
│       └── logo.png        ← Brand logo (also used as favicon)
└── README.md               ← This file
```

## 🚀 How to Run Locally

No build tools required. Just open in a browser:

```bash
# Option 1 — Open directly
open index.html

# Option 2 — Local server (recommended for forms to work correctly)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

## 🌐 Deploy on GitHub Pages

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Level Up website"
   git remote add origin https://github.com/YOUR_USERNAME/levelup-website.git
   git push -u origin main
   ```

2. Go to **Settings → Pages** in your GitHub repo.

3. Under **Source**, select: `Branch: main` / `Folder: / (root)` → **Save**.

4. Your site will be live at: `https://YOUR_USERNAME.github.io/levelup-website/`

## ✅ Accessibility Features

- **Skip links** (Skip to main content / contact)
- Fully **semantic HTML5** (header, nav, main, section, article, footer, address)
- **ARIA labels** on all interactive elements
- **aria-required**, **aria-invalid**, **aria-live**, **aria-expanded** on dynamic elements
- **Keyboard navigable** — all buttons, links, and form fields accessible via Tab
- **Focus management** — visible `:focus-visible` outlines throughout
- **Color contrast** — all text passes WCAG 2.1 AA (4.5:1+)
- **Alt text** on all meaningful images; `aria-hidden` on decorative elements
- **Prefers-reduced-motion** media query honored
- Screen reader live region on form success message
- Proper heading hierarchy (h1 → h2 → h3)

## 🎨 Design

- **Colors:** Brand blue `#1a3fa8` + orange `#f47c20`
- **Fonts:** [Sora](https://fonts.google.com/specimen/Sora) (headings) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (body) via Google Fonts
- **Responsive:** Mobile-first, works on all screen sizes
- **Animations:** CSS-only fade-up, float, pulse, counter animations

## 📬 Contact Info (embedded in site)

- **Phone / WhatsApp:** +92 308 6324003
- **Email:** LevelUpwcag@gmail.com
- **WhatsApp link:** https://wa.me/923086324003

## 🔧 Customization

- Update **placeholder testimonials** with real client quotes
- Replace **portfolio mock-ups** with real project screenshots in `/assets/images/`
- Connect the **contact form** to a backend (Formspree, EmailJS, or Netlify Forms)
  - For Formspree: replace `<form action="mailto:...">` with `<form action="https://formspree.io/f/YOUR_ID" method="POST">`

## 📦 Technologies

- Pure HTML5, CSS3, Vanilla JavaScript (zero dependencies)
- Google Fonts (Sora + DM Sans)
- IntersectionObserver API for scroll animations and active nav
- No frameworks, no npm, no build step

---

**Built with ♿ accessibility-first principles.**
