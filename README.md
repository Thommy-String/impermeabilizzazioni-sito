# 🏗️ Eco Solutions – Landing Page: Impermeabilizzazioni

Landing page per il servizio di impermeabilizzazioni di **Eco Solutions**, servita su:

```
https://www.ecosolutionsas.com/impermeabilizzazioni/
```

---

## 📐 Architettura Multi-Landing

Il dominio `ecosolutionsas.com` ospiterà più landing page indipendenti, ciascuna in una sotto-cartella:

```
ecosolutionsas.com/
├── index.html                          ← Homepage / redirect (futuro)
├── impermeabilizzazioni/               ← ✅ Questa landing
│   ├── index.html
│   └── assets/
├── pannelli-solari/                    ← 🔜 Futuro
├── riscaldamento-pavimento/            ← 🔜 Futuro
└── ristrutturazioni/                   ← 🔜 Futuro
```

Ogni landing è un **progetto Vite + React separato**, con il suo `package.json`, i suoi componenti e il suo tracking Google Ads. Questo garantisce:

- **Indipendenza** – Un aggiornamento a una landing non rompe le altre
- **Performance** – Ogni pagina carica solo il JS che le serve
- **SEO** – HTML statico indipendente per ogni servizio
- **Scalabilità** – Crea una nuova landing copiando la struttura

---

## 🚀 Comandi

```bash
# Sviluppo locale (base path = "/", comodo per test)
npm run dev          # → http://localhost:5173/

# Build di produzione (base path = "/impermeabilizzazioni/")
npm run build        # → output in ./dist/

# Anteprima della build
npm run preview      # → http://localhost:4173/impermeabilizzazioni/
```

> ⚠️ In **dev** il base path è `/` per comodità.
> In **build/preview** diventa `/impermeabilizzazioni/` automaticamente (vedi `vite.config.js`).

---

## 📦 Deploy su Aruba

### Hosting Linux (consigliato)

1. Builda il progetto:
   ```bash
   npm run build
   ```
2. Connettiti via **FTP** (FileZilla o simile) al tuo hosting Aruba
3. Nella webroot (`httpdocs/` o `public_html/`), crea la cartella `impermeabilizzazioni/`
4. Carica **tutto il contenuto** di `dist/` dentro `impermeabilizzazioni/`:
   ```
   httpdocs/
   └── impermeabilizzazioni/
       ├── index.html
       ├── assets/
       │   ├── index-XXXXX.js
       │   └── index-XXXXX.css
       ├── favicon.jpeg
       ├── cookie-banner.js
       ├── cookie-banner.css
       ├── robots.txt
       ├── sitemap.xml
       └── ...
   ```
5. Crea un file `.htaccess` dentro `impermeabilizzazioni/` per il SPA fallback:
   ```apache
   RewriteEngine On
   RewriteBase /impermeabilizzazioni/
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^ index.html [L]
   ```

### Hosting Windows (IIS)

Il file `web.config` è già incluso nella build. Basta caricare `dist/` nella sotto-cartella.

---

## 🆕 Come creare una nuova landing page

1. **Copia** questa cartella di progetto, es:
   ```bash
   cp -r "landing-impermeabilizzazioni" "landing-pannelli-solari"
   ```

2. **Aggiorna `vite.config.js`** → cambia `LANDING_BASE`:
   ```js
   const LANDING_BASE = '/pannelli-solari/'
   ```

3. **Aggiorna `index.html`** → canonical, title, schema, tracking

4. **Aggiorna `src/utils/constants.js`** → COMPANY_NAME, MAIN_CATEGORY, ecc.

5. **Aggiorna `public/robots.txt`** e `public/sitemap.xml`

6. **Personalizza** componenti e contenuti in `src/`

7. **Builda e deploya** nella nuova sotto-cartella su Aruba:
   ```
   httpdocs/pannelli-solari/  ← dist/ della nuova landing
   ```

---

## 🗂️ Struttura del progetto

```
├── index.html               ← Entry point con SEO meta + Google Ads tracking
├── vite.config.js           ← Base path configurabile per sotto-cartella
├── package.json
├── web.config               ← SPA fallback per IIS (Aruba Windows)
├── public/
│   ├── favicon.jpeg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── cookie-banner.js/css ← Gestione consenso GDPR
│   └── web.config
├── scripts/
│   └── generate-sitemap.js  ← Genera sitemap post-build
└── src/
    ├── main.jsx             ← React entry con basename dinamico
    ├── App.jsx              ← Layout (Header + Outlet + Footer)
    ├── components/          ← Tutti i componenti UI
    │   ├── Hero.jsx
    │   ├── SmartQuoteQuiz.jsx
    │   ├── StickyGlassFooter.jsx
    │   └── ...
    ├── pages/
    │   ├── HomePage.jsx
    │   └── PrivacyPolicyPage.jsx
    └── utils/
        └── constants.js     ← Dati aziendali centralizzati
```

---

## 🔍 Tracking

- **Google Tag**: `AW-17830431434`
- **Conversione**: `AW-17830431434/aK3BCJ-QtowcEMqVm7ZC` ("Contatto Impermeabilizzazioni")
- Tutti i CTA (Chiama, WhatsApp, Email) chiamano `gtag_report_conversion()`

---

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS 4**
- **Lucide React** (icone)
- **React Router 7** (privacy policy)
- **React Helmet Async** (SEO)
