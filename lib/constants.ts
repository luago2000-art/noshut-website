import type { NavItem, ServiceItem, Testimonial, FaqItem } from './types'

export const COMPANY = {
  name: 'NOSHUT',
  owner: 'Luigi Agostino',
  address: 'Via Ventotene 38, 00139 Roma (RM)',
  piva: '18471141004',
  email: 'l.agostino@noshut.it',
  pec: 'luigi.agostino@pec.fiscozen.it',
  phone: '+39 351 476 9421',
  whatsapp: '+393514769421',
  website: 'https://noshut.it',
  description:
    'Specialisti in pulizia rack, riordino cablaggi e bonifica data center. Partner affidabile per system integrator e appalti pubblici IT in tutta Italia.',
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contatti', href: '#contatti' },
]

export const STATS = [
  { value: 5, suffix: '.0★', label: 'Rating Google' },
  { value: 100, suffix: '+', label: 'Rack bonificati' },
  { value: 8, suffix: ' anni', label: 'Sul campo' },
  { value: 100, suffix: '%', label: 'Copertura IT' },
]

export const SERVICES: ServiceItem[] = [
  {
    icon: 'Server',
    title: 'Pulizia Rack & Server Room',
    description:
      'Pulizia professionale di rack, UPS, patch panel e armadi in fibra con aspiratori ESD-safe e prodotti specifici.',
    features: [
      'Aspiratori ESD-safe certificati',
      'Prodotti antistatici professionali',
      'Report fotografico pre/post',
      'Interventi in orario notturno',
    ],
  },
  {
    icon: 'Cable',
    title: 'Riordino Cablaggi',
    description:
      'Riorganizzazione e documentazione completa del cablaggio strutturato: rame, fibra ottica e patch cord.',
    features: [
      'Etichettatura numerica/colorata',
      'Gestione canaline e fascette',
      'Documentazione As-Built',
      'Test e certificazione',
    ],
  },
  {
    icon: 'Building2',
    title: 'Bonifica Data Center',
    description:
      'Bonifica completa post-cantiere o pre-collaudo: rimozione cavi morti, sanitizzazione ambienti, smaltimento materiali.',
    features: [
      'Rimozione cavi abbandonati',
      'Sanitizzazione ambienti',
      'Smaltimento certificato',
      'Verbale di bonifica',
    ],
  },
  {
    icon: 'CalendarCheck',
    title: 'Manutenzione Periodica',
    description:
      'Contratti di manutenzione mensile o trimestrale per mantenere l\'infrastruttura sempre in ordine e documentata.',
    features: [
      'Contratti mensili/trimestrali',
      'Interventi programmati',
      'Reportistica periodica',
      'SLA garantiti',
    ],
  },
  {
    icon: 'Handshake',
    title: 'Partner B2B',
    description:
      'Supporto tecnico white-label per MSP, system integrator e aziende IT che necessitano di un partner operativo affidabile.',
    features: [
      'Fatturazione B2B diretta',
      'Disponibilità white-label',
      'Coordinamento on-site',
      'NDA e riservatezza',
    ],
  },
  {
    icon: 'MapPin',
    title: 'Copertura Nazionale',
    description:
      'Operativi su tutto il territorio italiano con base operativa a Roma e interventi in tutta Italia anche urgenti.',
    features: [
      'Sede operativa Roma',
      'Copertura nazionale',
      'Interventi urgenti H24',
      'Spostamenti inclusi',
    ],
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Valentino Egidi',
    role: 'Titolare',
    company: 'Agenzia Immobiliare — Roma Centro',
    quote:
      'Necessitavo di riorganizzare e pulire il mio Rack per la mia agenzia immobiliare al centro di Roma. Ho trovato un servizio innovativo e professionale da parte di Luigi, un giovane talentuoso e con molta esperienza nonostante la giovane età.',
    rating: 5,
  },
  {
    name: 'Stefano Aversa',
    role: 'Responsabile Progetto',
    company: 'Settore Industriale — Puglia',
    quote:
      'Abbiamo commissionato un intervento di bonifica e pulizia post cantiere presso la sala server di un\'azienda industriale in Puglia e il risultato è stato eccellente.',
    rating: 5,
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Operate anche fuori Roma e nel Sud Italia?',
    answer:
      'Sì, siamo operativi su tutto il territorio nazionale. La base operativa è a Roma ma effettuiamo interventi in tutta Italia, incluso il Sud. I costi di trasferta vengono valutati in sede di preventivo.',
  },
  {
    question: 'Lavorate anche per piccole aziende o PMI?',
    answer:
      'Assolutamente sì. Gestiamo sia interventi su grandi data center enterprise sia lavori di piccole dimensioni per PMI, studi professionali e sedi regionali. Nessun intervento è troppo piccolo.',
  },
  {
    question: 'Siete certificati? Quali normative rispettate?',
    answer:
      'Operiamo con attrezzature ESD-safe certificate e nel rispetto del D.Lgs. 81/2008 in materia di sicurezza sul lavoro. Su richiesta emettiamo verbali di intervento e report fotografici.',
  },
  {
    question: 'Come funziona un tipico intervento?',
    answer:
      'Sopralluogo (anche da remoto con foto), preventivo dettagliato, pianificazione dell\'intervento in accordo con voi (anche fuori orario), esecuzione, report fotografico pre/post e verbale di fine lavori.',
  },
  {
    question: 'Con quale frequenza consigliate la manutenzione?',
    answer:
      'Per data center in produzione consigliamo un intervento di pulizia ogni 3-6 mesi. Per ambienti ad alta densità o con molto traffico anche mensile. Offriamo contratti di manutenzione programmata.',
  },
  {
    question: 'In quanto tempo riuscite a intervenire in urgenza?',
    answer:
      'Per interventi urgenti nella area di Roma siamo disponibili in 24-48 ore. Per il resto d\'Italia generalmente entro 3-5 giorni lavorativi, salvo disponibilità di voli/treni.',
  },
]

export const SERVICE_OPTIONS = SERVICES.map((s) => ({
  value: s.title.toLowerCase().replace(/\s+/g, '-'),
  label: s.title,
}))
