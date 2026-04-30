# NOSHUT — Sito Aziendale

Sito web B2B per **NOSHUT**, ditta individuale di Luigi Agostino specializzata in pulizia rack, riordino cablaggi e bonifica data center.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion · shadcn/ui · Resend

---

## Setup Locale

```bash
cd noshut
npm install
cp .env.example .env.local   # poi configura le variabili
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

---

## Variabili d'Ambiente

Crea `.env.local` con questi valori (vedi `.env.example`):

| Variabile | Descrizione |
|-----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numero WhatsApp senza `+` (es: `393XXXXXXXXX`) |
| `NEXT_PUBLIC_SITE_URL` | URL produzione (`https://noshut.it`) |
| `RESEND_API_KEY` | API key [Resend](https://resend.com) per invio email |
| `CONTACT_EMAIL` | Email dove ricevere i contatti (`l.agostino@noshut.it`) |

---

## Aggiungere Foto Prima/Dopo

La gallery si auto-aggiorna leggendo le cartelle in `public/images/before-after/`.

**Per aggiungere un nuovo lavoro:**

1. Crea una cartella `public/images/before-after/lavoro-XX/`
2. Inserisci `prima.jpg` e `dopo.jpg` (proporzione consigliata: 16:9, min 800px larghezza)
3. Aggiungi i metadati in `components/sections/Gallery.tsx` nel dizionario `FOLDER_LABELS`:

```ts
'lavoro-04': {
  title: 'Nome del lavoro',
  description: 'Breve descrizione intervento',
  location: 'Città, Provincia',
},
```

4. Fai push → Vercel rideploya automaticamente e la gallery si aggiorna.

> **Nota:** su Vercel, nuove cartelle immagini richiedono un nuovo deploy per essere rilevate dall'API.

---

## Modificare i Contenuti

Tutti i contenuti del sito sono centralizzati in `lib/constants.ts`:

- **Servizi** → array `SERVICES`
- **FAQ** → array `FAQ_ITEMS`
- **Testimonianze** → array `TESTIMONIALS`
- **Statistiche Hero** → array `HERO_STATS`
- **Dati azienda** → oggetto `COMPANY`

---

## Struttura Cartelle

```
noshut/
├── app/
│   ├── layout.tsx          # Font, metadata, JSON-LD schema
│   ├── page.tsx            # Assembla tutte le sezioni
│   ├── globals.css         # Design tokens Tailwind v4
│   ├── sitemap.ts          # Sitemap automatica
│   ├── robots.ts           # robots.txt
│   └── api/
│       ├── contact/        # POST → invio email Resend
│       └── gallery/        # GET → lista cartelle before-after
├── components/
│   ├── layout/             # Header, Footer, WhatsAppButton
│   ├── sections/           # Le 7 sezioni della pagina
│   ├── common/             # Componenti riusabili
│   └── ui/                 # Componenti shadcn/ui
├── lib/
│   ├── constants.ts        # TUTTI i contenuti del sito
│   ├── types.ts            # Tipi TypeScript
│   ├── seo.ts              # Metadata e JSON-LD
│   └── resend.ts           # Client email
├── hooks/                  # useInView, useMediaQuery
└── public/
    ├── images/before-after/ # Foto prima/dopo (aggiungere qui)
    ├── images/hero/         # Immagini hero (opzionale)
    ├── images/team/         # Foto team
    └── logo/               # Logo SVG e favicon
```

---

## Deploy su Vercel

### Prima volta

```bash
# 1. Crea repo GitHub
git init
git add .
git commit -m "Initial commit: NOSHUT website"
gh repo create noshut-website --public --source=. --remote=origin --push

# 2. Deploy
npx vercel --prod
```

### Dominio noshut.it

Su **Vercel Dashboard → Project → Domains**, aggiungi:
- `noshut.it`
- `www.noshut.it`

Record DNS da configurare sul provider:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

### CI/CD Automatico

Ogni push su `main` deploya automaticamente. I branch laterali creano preview deployments.

### Variabili su Vercel

Aggiungi le stesse variabili di `.env.local` su **Vercel → Settings → Environment Variables**.

---

## Checklist Lancio

- [ ] Logo finale caricato in `public/logo/`
- [ ] Foto prima/dopo caricate in `public/images/before-after/`
- [ ] `RESEND_API_KEY` configurata e testata
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` impostato
- [ ] Dominio noshut.it connesso su Vercel
- [ ] DNS propagati (verificare con `nslookup noshut.it`)
- [ ] SSL attivo (automatico su Vercel)
- [ ] Test form contatti in produzione
- [ ] Google Search Console → invia sitemap
