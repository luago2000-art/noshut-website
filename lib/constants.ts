import type { ServiceItem, TestimonialItem, FAQItem, NavItem, StatItem } from './types'

export const COMPANY = {
  name: 'NOSHUT',
  owner: 'Luigi Agostino',
  fullName: 'NOSHUT — Luigi Agostino',
  address: 'Via Ventotene 38, 00139 Roma (RM)',
  piva: '18471141004',
  pec: 'luigi.agostino@pec.fiscozen.it',
  email: 'l.agostino@noshut.it',
  website: 'www.noshut.it',
  phone: '',
  description:
    'Specialisti in pulizia rack, riordino cablaggi e bonifica data center per aziende IT, system integrator e appalti pubblici.',
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contatti', href: '#contatti' },
]

export const HERO_STATS: StatItem[] = [
  { value: 500, suffix: '+', label: 'Rack puliti' },
  { value: 80, suffix: '+', label: 'Data center serviti' },
  { value: 120, suffix: '+', label: 'Clienti soddisfatti' },
]

export const SERVICES: ServiceItem[] = [
  {
    id: 'pulizia-rack',
    icon: 'Server',
    title: 'Pulizia Rack & Server Room',
    description:
      'Rimozione professionale di polvere e detriti da rack, UPS, patch panel e apparati attivi con attrezzatura specializzata ESD-safe.',
    features: [
      'Aspirazione ESD-safe certificata',
      'Sanificazione con prodotti specifici',
      'Pulizia interna ed esterna',
      'Report fotografico pre/post intervento',
    ],
  },
  {
    id: 'riordino-cablaggi',
    icon: 'Cable',
    title: 'Riordino Cablaggi',
    description:
      'Gestione professionale di cavi UTP, fibra ottica e alimentazione: etichettatura, percorsi ottimizzati e documentazione completa.',
    features: [
      'Etichettatura sistematica cavi',
      'Ottimizzazione percorsi',
      'Gestione fibra ottica',
      'Documentazione as-built',
    ],
  },
  {
    id: 'bonifica-data-center',
    icon: 'Building2',
    title: 'Bonifica Data Center',
    description:
      'Interventi post-cantiere e bonifica completa di sale server: rimozione detriti edili, cavi obsoleti e materiali non conformi.',
    features: [
      'Rimozione detriti post-cantiere',
      'Smaltimento cavi obsoleti',
      'Pulizia pavimento flottante',
      'Bonifica completa sale CED',
    ],
  },
  {
    id: 'manutenzione-periodica',
    icon: 'CalendarCheck',
    title: 'Manutenzione Periodica',
    description:
      'Contratti di manutenzione programmata per mantenere l\'infrastruttura IT sempre pulita ed efficiente, con cadenza personalizzata.',
    features: [
      'Contratti mensili o trimestrali',
      'Interventi programmati',
      'Report di manutenzione',
      'Priorità interventi urgenti',
    ],
  },
  {
    id: 'subappalto-b2b',
    icon: 'Handshake',
    title: 'Subappalto IT B2B',
    description:
      'Partner ideale per system integrator e aziende che operano in appalti pubblici IT: P.IVA regolare, fatturazione elettronica, intervento rapido.',
    features: [
      'Fatturazione elettronica B2B',
      'Disponibilità nazionale',
      'Intervento rapido garantito',
      'Compatibile appalti pubblici',
    ],
  },
  {
    id: 'coverage-italia',
    icon: 'MapPin',
    title: 'Coverage Italia',
    description:
      'Interventi su tutto il territorio nazionale per aziende, data center, enti pubblici e system integrator con base a Roma.',
    features: [
      'Copertura nazionale',
      'Base operativa Roma',
      'Trasferte concordate',
      'Interventi urgenti disponibili',
    ],
  },
]

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Marco Ferretti',
    role: 'IT Manager',
    company: 'TechGroup Italia',
    quote:
      'NOSHUT ha trasformato il nostro data center: da un groviglio di cavi impossibile da gestire a un\'infrastruttura impeccabile. Professionalità e velocità eccezionali.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Alessandra Conti',
    role: 'Responsabile Infrastrutture',
    company: 'Systema Integrations',
    quote:
      'Collaboriamo con NOSHUT per tutti i nostri appalti pubblici. Luigi è il nostro riferimento per pulizia e riordino rack: affidabile, puntuale e documentato.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Roberto Mancini',
    role: 'CTO',
    company: 'DataCare SpA',
    quote:
      'Dopo l\'intervento di bonifica post-cantiere, la nostra server room era di un livello completamente diverso. Consiglio NOSHUT a chiunque abbia un data center da gestire.',
    rating: 5,
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'sud-italia',
    question: 'Eseguite interventi al Sud Italia?',
    answer:
      'Sì, operiamo su tutto il territorio nazionale. Siamo basati a Roma ma effettuiamo trasferte in tutta Italia, incluso il Sud. I costi e la logistica vengono concordati preventivamente.',
  },
  {
    id: 'appalti-pubblici',
    question: 'Lavorate in subappalto per appalti pubblici IT?',
    answer:
      'Assolutamente sì. Siamo una ditta individuale con P.IVA regolare (18471141004), fatturazione elettronica attiva e regime idoneo per collaborare con aziende che operano in gare d\'appalto pubbliche nel settore IT.',
  },
  {
    id: 'certificazioni',
    question: 'Quali certificazioni avete?',
    answer:
      'Utilizziamo attrezzatura professionale ESD-safe certificata per la pulizia di apparati elettronici sensibili. Operiamo sempre nel rispetto delle normative vigenti per la sicurezza nei luoghi di lavoro (D.Lgs 81/2008).',
  },
  {
    id: 'intervento-tipo',
    question: 'Come si svolge un intervento tipo?',
    answer:
      'Un intervento standard prevede: (1) sopralluogo o valutazione da remoto, (2) preventivo dettagliato, (3) intervento programmato con report fotografico pre/post, (4) consegna documentazione as-built. Ogni intervento è personalizzato in base alle esigenze del cliente.',
  },
  {
    id: 'periodicita-pulizia',
    question: 'Qual è la periodicità consigliata per la pulizia rack?',
    answer:
      'Per un data center in produzione raccomandiamo un intervento trimestrale per la pulizia approfondita e mensile per la manutenzione ordinaria. Per ambienti polverosi o con alta densità di apparati, la frequenza può essere aumentata. Offriamo contratti personalizzati.',
  },
  {
    id: 'tempo-intervento',
    question: 'In quanto tempo riuscite a intervenire?',
    answer:
      'Per interventi programmati, solitamente entro 3-5 giorni lavorativi dalla conferma. Per emergenze concordiamo la massima disponibilità. I tempi dipendono anche dalla complessità dell\'intervento e dalla localizzazione geografica.',
  },
]

export const SERVICE_OPTIONS = SERVICES.map((s) => ({ value: s.id, label: s.title }))
