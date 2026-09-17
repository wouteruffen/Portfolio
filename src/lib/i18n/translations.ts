/**
 * Centralized NL/EN copy for the entire site. One object per page/component
 * (named after the file it backs) so copy is easy to find and edit later.
 * `nl` is the source of truth for shape — `en` is typed against it so a
 * missing translation is a compile error, not a silent fallback.
 *
 * Proper names, client names, brand names and technology names are never
 * translated (Studio Bit & Beeld, Wouter, Bouwbedrijf Kruize, React, Figma,
 * Microsoft 365, ...) and appear identically in both objects.
 */

const nl = {
  meta: {
    title: "Studio Bit & Beeld | Creativiteit & Techniek",
    description:
      "Sterke vormgeving gecombineerd met technische kennis, voor web, merk en alles daartussenin.",
  },

  // Shared across many pages/components — CTAs, form fields, small recurring labels.
  common: {
    startProject: "Start Project",
    viewWork: "Bekijk werk",
    viewWebsite: "Bekijk website",
    backToHome: "Terug naar home",
    featuredProject: "Uitgelicht project",
    bookCall: "Plan Gesprek",
    sendMessage: "Verstuur Bericht",
    moreAboutMe: "Meer over mij",
    getInTouch: "Neem Contact Op",
    name: "Naam",
    email: "Email",
    phone: "Telefoon",
    location: "Locatie",
    message: "Bericht",
    namePlaceholder: "Jouw naam",
    emailPlaceholder: "jouw@email.nl",
    messagePlaceholder: "Vertel over je project...",
    locationValue: "Amsterdam, NL",
  },

  nav: {
    home: "Home",
    about: "Over Mij",
    projects: "Projecten",
    contact: "Contact",
    brandbook: "Brandbook",
    available: "Beschikbaar voor project",
    availableFrom: "Medio 2026",
    menu: "Menu",
    emailLabel: "Email",
    socialsLabel: "Socials",
    logoAria: "Bit & Beeld: naar de homepage",
    themeToggleAria: "Schakel tussen licht en donker thema",
    mailSocialLabel: "E-mail",
  },

  hero: {
    taglineBold: "Creativiteit en techniek komen samen in alles wat ik maak.",
    taglineRest: "Niet alleen om iets goed te laten ogen, maar vooral om iets te maken dat werkt voor jou.",
  },

  mobileHero: {
    heading: "Merken en websites die werken.",
    subtitle: "Ontworpen en gebouwd met intentie, helderheid en zorg.",
  },

  about: {
    greeting: "Hi! Ik ben",
    name: "Wouter",
    paragraph1:
      "Mijn kracht zit in de combinatie van creativiteit en techniek. Ik wil iets niet alleen mooi maken, maar ook begrijpen hoe het werkt en hoe het beter kan.",
    paragraph2:
      "Daarom denk ik het liefst vanaf het begin met je mee: luisteren, ideeën uitwisselen en samen ontdekken wat het beste bij jou past.",
    portraitAlt: "Portret van Wouter",
  },

  projects: {
    // The four homepage service cards — desktop stack (ProjectsV2) and
    // mobile list (MobileProjects) both read from here via getProjects().
    webdesign: {
      title: "Webdesign, Development & IT",
      description:
        "Moderne, snelle websites die niet alleen mooi zijn maar ook converteren en resultaat opleveren. Van strategie, design en front-end development tot de technische kennis om alles daarna soepel te laten draaien.",
      tools: ["React", "TypeScript", "Figma", "IT & Systemen"],
    },
    designIdentity: {
      title: "Design & Identiteit",
      description:
        "Visuele identiteiten die consistent overkomen op elk oppervlak. Van logo en typografie tot kleursystemen en brand guidelines: één merk dat overal hetzelfde verhaal vertelt.",
      tools: ["Logo Design", "Huisstijl", "Typografie", "Brand Guidelines"],
    },
    printDesign: {
      title: "Print & Campaign Design",
      description:
        "Posters, flyers en ander drukwerk dat ook offline overtuigt. Van los grafisch ontwerp tot complete campagnebeelden: vormgeving die staat, op papier en op straat.",
      tools: ["Illustrator", "Photoshop", "Grafisch Ontwerp", "Drukwerk"],
    },
    contentSocial: {
      title: "Content & Social Media",
      description:
        "Visueel content die opvalt in de feed. Van social media content en fotografie tot video en reels: content die een merk laat leven op de kanalen waar het publiek al is.",
      tools: ["Social Media", "Fotografie", "Video", "Content Design"],
    },
  },

  footer: {
    tagline: ["Design dat werkt.", "Gebouwd met visie."],
    copyright: "© 2026 Studio Bit & Beeld",
    location: "Amsterdam, NL",
  },

  contact: {
    title: "Contact",
    heading: { lead: "Klaar om iets", accent: "moois", rest: "te bouwen?" },
    sending: "Versturen...",
    successMessage: "Bedankt voor je bericht. Ik neem snel contact met je op.",
    errorMessage: "Er ging iets mis bij het versturen. Probeer het opnieuw.",
  },

  overMij: {
    backLink: "Terug naar home",
    title: "MEER OVER MIJ",
    heading: { line1: "Vorm en functie,", accent: "balans", rest: "in", suffix: "." },
    paragraph1:
      "Bij Studio Bit & Beeld combineer ik strategie, design en development tot digitale ervaringen die impact maken. Mijn passie ligt bij het vertalen van complexe ideeën naar strakke, functionele oplossingen.",
    paragraph2:
      "Ik bouw alles, van merkidentiteit tot volledige webplatformen, met precisie, passie en een scherp oog voor detail. Als eenmanszaak werk ik nauw samen met mijn klanten: korte lijnen, snelle beslissingen, persoonlijke aandacht.",
    paragraph3: "Elk project is een kans om iets unieks te creëren.",
    stats: [
      { num: "50+", label: "Projecten" },
      { num: "8", label: "Jaar ervaring" },
      { num: "100%", label: "Maatwerk" },
    ],
    portraitAlt: "Portret van Wouter",
    timelineTitle: "De weg tot hier",
    timeline: [
      { year: "2018", title: "Start als freelancer", desc: "Begonnen met kleine webprojecten en lokale bedrijven." },
      { year: "2019", title: "Eerste grote klant", desc: "Volledige merkidentiteit en website voor een tech-startup." },
      { year: "2021", title: "Studio Bit & Beeld", desc: "Officieel gestart onder de naam Studio Bit & Beeld." },
      { year: "2023", title: "Focus op digitale producten", desc: "Uitgebreid naar SaaS-platformen en complexe webapplicaties." },
      { year: "2026", title: "Vandaag", desc: "50+ projecten afgerond, continue groei en vernieuwing." },
    ],
    skillsTitle: "Waarmee ik werk",
    valuesTitle: "Waar ik voor sta",
    values: [
      { title: "Kwaliteit boven kwantiteit", desc: "Liever één project goed dan drie half. Elk detail telt." },
      { title: "Transparante communicatie", desc: "Geen verrassingen. Eerlijk, direct en altijd bereikbaar." },
      { title: "Continu leren", desc: "Technologie evolueert, en ik evolueer mee. Altijd up-to-date." },
    ],
    ctaHeading: { lead: "Klaar om iets", accent: "moois", rest: "te bouwen?" },
    ctaButton: "Neem Contact Op",
  },

  projectWebdesign: {
    pageTitle: "Webdesign, Development & IT",
    featuredEyebrow: "Uitgelicht project",
    featuredSubtitle: { lead: "Website ontwikkeld voor", client: "Bouwbedrijf Kruize" },
    mockupAlt: "Website van Bouwbedrijf Kruize: webdesign en development door Studio Bit & Beeld",
    intro:
      "Voor Bouwbedrijf Kruize ontwierp en bouwde ik een website die het bedrijf en de dienstverlening professioneel en overzichtelijk presenteert. Vanuit gebruiksvriendelijkheid en responsive gedrag op elk scherm werkte ik toe naar een technische uitvoering die de site soepel online bracht en zorgt voor een consistente ervaring op elk device.",
    viewWebsite: "Bekijk website",
    seoTitle: "SEO en Analyse",
    seoImageAlt: "SEO en Analyse",
    seoText:
      "Een mooie website is pas compleet als hij ook gevonden wordt. Voor Bouwbedrijf Kruize is daarom gelet op een semantische opbouw, correcte metadata en snelle laadtijden: de technische basis die zoekmachines nodig hebben om de site goed te kunnen indexeren.",
    seoPills: ["Analyse websitebezoekers", "Zoekopdrachten", "Technische SEO", "Snelheid & performance"],
    hostingTitle: "Hosting",
    hostingImageAlt: "Webhosting",
    hostingText:
      "Een website is pas af als hij ook daadwerkelijk online staat. Voor Bouwbedrijf Kruize heb ik naast het ontwerp en de bouw ook de hosting, domeinkoppeling en SSL-certificering geregeld, zodat de site niet alleen werkt, maar ook veilig en betrouwbaar bereikbaar is.",
    hostingPills: ["Domein & DNS", "SSL", "Deployment", "Hostingbeheer"],
    reviewsTitle: "Reviews die overtuigen sneller dan tekst",
    reviewsText:
      "Echte klantervaringen overtuigen sneller dan verkooptaal. Daarom kregen de Google-reviews een vaste, prominente plek op de site zelf, in plaats van weggestopt achter een externe link.",
    reviewsScore: "5,0",
    reviewsScoreLabel: ["Gemiddelde", "Google-score"],
    reviewsImageAlt: "Reviews",
    ictTitle: "Informatie en Communicatie Technologie (ICT)",
    ictSubtitle: "Systeembeheer · Applicatiebeheer · IT-support · Microsoft-omgevingen",
    ictParagraph1:
      "Naast webdesign en development heb ik bredere IT-ervaring: het beheren, ondersteunen en onderhouden van systemen en applicaties binnen een organisatie.",
    ictParagraph2:
      "Denk aan systeembeheer en applicatiebeheer, met aandacht voor werkplekbeheer, gebruikersondersteuning en het oplossen van technische problemen.",
    ictTechLabel: "Technologieën & capabilities",
    ictTech: ["Systeembeheer", "Applicatiebeheer", "IT-support", "Werkplekbeheer", "Microsoft 365", "SharePoint", "Microsoft Intune"],
    ictImagePending: "Afbeelding volgt",
    ctaHeading: { lead: "Klaar voor een nieuwe website of", accent: "IT-vraagstuk", rest: "?" },
    startProject: "Start Project",
  },

  projectDesignIdentity: {
    pageTitle: "Design & Identiteit",
    introHeading: "Een merk is meer dan een logo",
    introParagraph1:
      "Een sterke identiteit begint bij een logo, maar eindigt daar niet. Ze groeit uit tot een systeem van grid, witruimte, typografie en kleur, dat vervolgens consistent wordt toegepast op elk raakvlak met een klant.",
    introParagraph2:
      "Hieronder een kijkje in hoe dat er in de praktijk uitziet: van een vastgelegd merksysteem tot een identiteit die tot leven komt in fotografie en tone-of-voice.",
    systemEyebrow: "Identiteit → systeem",
    systemHeading: "Vastgelegd, niet toevallig",
    systemParagraph:
      "Voor Bouwbedrijf Kruize, dezelfde identiteit die je terugziet op de website, is de visuele taal vastgelegd in een navolgbaar systeem: witruimteregels rond het merkteken en exacte specificaties voor briefpapier, zodat de identiteit consistent blijft ongeacht wie 'm toepast.",
    logoSpacingAlt: "Huisstijlgids Bouwbedrijf Kruize: clearspace- en witruimteregels rond het logo",
    logoSpacingCaption: "Logo & witruimte",
    letterheadAlt: "Huisstijlgids Bouwbedrijf Kruize: briefpapierspecificaties en A4-formaat",
    letterheadCaption: "Briefpapier: specificaties",
    applicationEyebrow: "Systeem → toepassing",
    applicationHeading: "Een identiteit die een gevoel oproept",
    applicationParagraph:
      "Bij FIXY stopt de identiteit niet bij het logo. Kleur, typografie en toon vertalen zich net zo goed naar fotografie en copy: dezelfde merkwereld, herkenbaar in elke uiting.",
    fixyCampaignAlt: "FIXY-merkwereld vertaald naar fotografie, kleur en tone-of-voice",
    fixyCampaignCaption: "Merkwereld in beeld en tekst",
    fixySpacesAlt: "FIXY-ruimtes gepresenteerd in dezelfde visuele en tekstuele toon als de rest van het merk",
    fixySpacesCaption: "Toegepast op de ruimtes zelf",
    consistencyEyebrow: "Toepassing → consistentie",
    consistencyHeading: "Identiteit in de praktijk",
    consistencyParagraph:
      "Een visuele identiteit stopt niet bij een logo. Ook in dagelijkse communicatie moet een merk herkenbaar en consistent blijven. Voor verschillende merken ontwierp ik e-mailhandtekeningen waarin typografie, kleur, logo en digitale contactpunten samenkomen in één herkenbare toepassing.",
    signatureAlt: (brand: string) => `E-mailhandtekening voor ${brand} (namen en contactgegevens zijn placeholders)`,
    coversEyebrow: "Wat dit kan omvatten",
    coversParagraph:
      "Dit soort werk combineert meerdere disciplines, van eerste merkverkenning tot de kleinste toepassing, afhankelijk van wat een merk nodig heeft.",
    disciplines: ["Logo & wordmark", "Visuele identiteit", "Typografie & kleursystemen", "Brand guidelines", "Zakelijke drukwerktoepassingen"],
    ctaHeading: { lead: "Tijd voor een", accent: "sterke identiteit", rest: "?" },
    startProject: "Start Project",
  },

  projectPrintDesign: {
    pageTitle: "Print & Campaign Design",
    introHeading: "Vormgeving die ook offline werkt",
    introParagraph1: "Niet alles hoeft op een scherm te leven. Posters, flyers en ander drukwerk trekken de aandacht juist doordat ze tastbaar zijn.",
    introParagraph2:
      "Ik ontwerp print- en promotiemateriaal dat overtuigt: van los grafisch ontwerp voor een enkele opdracht tot samenhangende campagnebeelden, van eerste schets tot drukklaar bestand.",
    introParagraph3: "Ook hier geldt: consistent, doordacht en afgestemd op waar het materiaal daadwerkelijk gebruikt wordt.",
    postersEyebrow: "Posters in de praktijk",
    postersParagraph: "Een selectie posters, van eerste schets tot drukklaar ontwerp.",
    posterAlt: "Posterontwerp, A2 formaat",
    canMakeTitle: "Wat ik kan maken",
    canMakeBlocks: [
      { title: "Drukwerk", items: ["Posters & flyers", "Promotiemateriaal", "Drukklare bestanden"] },
      { title: "Grafisch Ontwerp", items: ["Losse ontwerpopdrachten", "Campagnebeelden", "Visuele consistentie"] },
      { title: "Toepassing", items: ["Advies over formaat & materiaal", "Afstemming met drukker", "Van concept tot eindresultaat"] },
    ],
    ctaHeading: { lead: "Tijd voor", accent: "sterk drukwerk", rest: "?" },
    startProject: "Start Project",
  },

  projectContentSocial: {
    pageTitle: "Content & Social Media",
    introHeading: "Content die een merk laat leven",
    introParagraph1:
      "Social media vraagt om meer dan losse plaatjes. Het draait om een visuele lijn die overal even herkenbaar blijft: in de feed, in een story of in een aankondiging.",
    introParagraph2:
      "Hieronder een selectie van content die ik ontwierp voor merken in de nachtcultuur: van terugkerende campagnesystemen tot content die zich aanpast aan uiteenlopende formaten.",
    kopjekEyebrow: "Uitgelichte campagne",
    kopjekHeading: "Een terugkerend sjabloon voor een clubtour",
    kopjekParagraph:
      "Voor de Kopjek Clubtour ontwierp ik één visueel sjabloon, met typografie, 3D-vorm en indeling, dat per stad een eigen kleurstelling kreeg. Vier steden, hetzelfde sjabloon, elk met een eigen kleur en line-up.",
    kopjekAlt: (city: string) => `Kopjek Clubtour aankondiging voor ${city}, zelfde sjabloon in eigen kleurstelling`,
    practiceEyebrow: "In de praktijk",
    practiceHeading: "Andere merken, andere sferen",
    practiceParagraph:
      "Niet elk merk vraagt om dezelfde toon: de aanpak verschuift mee met wat het merk nodig heeft, van een moody editorial aankondiging tot warme releasefotografie en een speelse typografische wending.",
    groningsAlt: "Gronings Finest: moody editorial eventaankondiging",
    leviAlt: "Levi: Moovline releasefeest, fotografie-gedreven aankondiging",
    tonightFlipAlt: "FIXY Bar: 'Tonight we flip', omgedraaide typografie als visuele wending",
    formatsEyebrow: "Campagne → formaten",
    formatsHeading: "Eén verhaal, verteld in drie momenten",
    formatsParagraph:
      "Voor FIXY's DJ Talentroom liep de aankondiging op via stories, met \"stay tuned\" en \"big news soon\", voordat de feed-post de line-up onthulde. Zelfde visuele systeem, drie momenten, drie formaten.",
    feedPostAlt: "FIXY DJ Talentroom: feed post met line-up onthulling",
    feedPostCaption: "Feed post: line-up onthuld",
    storyTeaserAlt: "FIXY DJ Talentroom: story teaser 'stay tuned'",
    storyTeaserCaption: "Story: teaser",
    storyAnnouncementAlt: "FIXY DJ Talentroom: story aankondiging 'big news soon'",
    storyAnnouncementCaption: "Story: aankondiging",
    approachEyebrow: "Hoe ik dit aanpak",
    approachParagraph:
      "Ik werk niet met een vast contentpakket of een vaste hoeveelheid posts per maand. Ik kijk naar wat een merk, avond of campagne nodig heeft en bouw de content daaromheen op.",
    disciplines: ["Campagnebeelden", "Social posts & stories", "Terugkerende sjablonen", "Aankondigingen", "Eventfotografie"],
    ctaHeading: { lead: "Tijd om", accent: "iets te laten zien", rest: "?" },
    startProject: "Start Project",
  },

  projectProduct: {
    pageTitle: "Digitale Producten",
    heading: "Complexe problemen, simpele oplossingen",
    paragraph1: "Digitale producten vragen om een andere aanpak. Het draait om gebruikerservaring, schaalbaarheid en slimme architectuur.",
    paragraph2: "Ik ontwerp en bouw producten die gebruikers graag gebruiken, van SaaS-platformen tot interne tools en mobiele apps.",
    paragraph3: "Met een iteratieve aanpak zorgen we samen dat het product precies aansluit op de behoeften van jouw gebruikers.",
    imageAlt: "Product design voorbeeld",
    expertiseTitle: "Expertise",
    expertise: [
      { title: "Product Strategie", desc: "Samen bepalen we wat gebouwd moet worden en waarom, van idee tot roadmap." },
      { title: "UX/UI Design", desc: "Gebruiksvriendelijke interfaces op basis van onderzoek en best practices." },
      { title: "Full-Stack Development", desc: "Robuuste applicaties met moderne frameworks en schaalbare architectuur." },
      { title: "Iteratie & Groei", desc: "Data-gedreven optimalisatie na lancering voor continue verbetering." },
    ],
    ctaHeading: { lead: "Een", accent: "product", rest: "bouwen?" },
    startProject: "Start Project",
  },

  notFound: {
    title: "404",
    message: "Oeps! Pagina niet gevonden",
    returnHome: "Terug naar Home",
  },
} as const;

export type TranslationShape = typeof nl;

const en: TranslationShape = {
  meta: {
    title: "Studio Bit & Beeld | Creativity & Technology",
    description:
      "Strong design combined with technical knowledge, for web, brand and everything in between.",
  },

  common: {
    startProject: "Start Project",
    viewWork: "View work",
    viewWebsite: "View website",
    backToHome: "Back to home",
    featuredProject: "Featured project",
    bookCall: "Book a Call",
    sendMessage: "Send Message",
    moreAboutMe: "More about me",
    getInTouch: "Get in Touch",
    name: "Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@email.com",
    messagePlaceholder: "Tell us about your project...",
    locationValue: "Amsterdam, Netherlands",
  },

  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    brandbook: "Brandbook",
    available: "Available for projects",
    availableFrom: "Mid 2026",
    menu: "Menu",
    emailLabel: "Email",
    socialsLabel: "Socials",
    logoAria: "Bit & Beeld: back to homepage",
    themeToggleAria: "Toggle light/dark mode",
    mailSocialLabel: "Mail",
  },

  hero: {
    taglineBold: "Creativity and technology come together in everything I make.",
    taglineRest: "I don't just want something to look good. Above all, I want to create something that works for you.",
  },

  mobileHero: {
    heading: "Brands and websites that work.",
    subtitle: "Designed and built with intention, clarity and care.",
  },

  about: {
    greeting: "Hi, I'm",
    name: "Wouter",
    paragraph1:
      "My strength lies in combining creativity with technical thinking. I don't just want to make something look good. I want to understand how it works, and how it could work better.",
    paragraph2:
      "That's why I like to get involved from the very start: listening, exchanging ideas, and figuring out together what truly fits you.",
    portraitAlt: "Portrait of Wouter",
  },

  projects: {
    webdesign: {
      title: "Webdesign, Development & IT",
      description:
        "Modern, fast websites that don't just look good but convert and deliver results. From strategy, design and front-end development to the technical knowledge to keep everything running smoothly afterwards.",
      tools: ["React", "TypeScript", "Figma", "IT & Systems"],
    },
    designIdentity: {
      title: "Design & Identity",
      description:
        "Visual identities that come across consistently on every surface. From logo and typography to color systems and brand guidelines: one brand that tells the same story everywhere.",
      tools: ["Logo Design", "Brand Identity", "Typography", "Brand Guidelines"],
    },
    printDesign: {
      title: "Print & Campaign Design",
      description:
        "Posters, flyers and other print work that convinces offline too. From standalone graphic design to complete campaign visuals: design that holds up, on paper and in the street.",
      tools: ["Illustrator", "Photoshop", "Graphic Design", "Print"],
    },
    contentSocial: {
      title: "Content & Social Media",
      description:
        "Visual content that stands out in the feed. From social media content and photography to video and reels: content that brings a brand to life on the channels its audience is already on.",
      tools: ["Social Media", "Photography", "Video", "Content Design"],
    },
  },

  footer: {
    tagline: ["Design that works.", "Built with vision."],
    copyright: "© 2026 Studio Bit & Beeld",
    location: "Amsterdam, Netherlands",
  },

  contact: {
    title: "Contact",
    heading: { lead: "Ready to build something", accent: "great", rest: "together?" },
    sending: "Sending...",
    successMessage: "Thanks for your message. I'll get back to you soon.",
    errorMessage: "Something went wrong while sending. Please try again.",
  },

  overMij: {
    backLink: "Back to home",
    title: "MORE ABOUT ME",
    heading: { line1: "Form and function,", accent: "balance", rest: "in", suffix: "." },
    paragraph1:
      "At Studio Bit & Beeld I combine strategy, design and development into digital experiences that make an impact. My passion lies in translating complex ideas into clean, functional solutions.",
    paragraph2:
      "I build everything, from brand identity to full web platforms, with precision, passion and a sharp eye for detail. As a one-person studio I work closely with my clients: short lines of communication, fast decisions, personal attention.",
    paragraph3: "Every project is a chance to create something unique.",
    stats: [
      { num: "50+", label: "Projects" },
      { num: "8", label: "Years of experience" },
      { num: "100%", label: "Custom work" },
    ],
    portraitAlt: "Portrait of Wouter",
    timelineTitle: "The road so far",
    timeline: [
      { year: "2018", title: "Started as a freelancer", desc: "Started with small web projects and local businesses." },
      { year: "2019", title: "First major client", desc: "Full brand identity and website for a tech startup." },
      { year: "2021", title: "Studio Bit & Beeld", desc: "Officially launched under the name Studio Bit & Beeld." },
      { year: "2023", title: "Focus on digital products", desc: "Expanded into SaaS platforms and complex web applications." },
      { year: "2026", title: "Today", desc: "50+ projects completed, continuous growth and renewal." },
    ],
    skillsTitle: "What I work with",
    valuesTitle: "What I stand for",
    values: [
      { title: "Quality over quantity", desc: "One project done well beats three done halfway. Every detail counts." },
      { title: "Transparent communication", desc: "No surprises. Honest, direct and always reachable." },
      { title: "Continuous learning", desc: "Technology evolves, and I evolve with it. Always up to date." },
    ],
    ctaHeading: { lead: "Ready to build something", accent: "great", rest: "together?" },
    ctaButton: "Get in Touch",
  },

  projectWebdesign: {
    pageTitle: "Webdesign, Development & IT",
    featuredEyebrow: "Featured project",
    featuredSubtitle: { lead: "Website developed for", client: "Bouwbedrijf Kruize" },
    mockupAlt: "Website for Bouwbedrijf Kruize: web design and development by Studio Bit & Beeld",
    intro:
      "For Bouwbedrijf Kruize I designed and built a website that presents the company and its services professionally and clearly. Working from usability and responsive behavior on every screen, I built toward a technical execution that got the site smoothly online and keeps the experience consistent on every device.",
    viewWebsite: "View website",
    seoTitle: "SEO & Analytics",
    seoImageAlt: "SEO & Analytics",
    seoText:
      "A great website isn't finished until it's actually found. For Bouwbedrijf Kruize that meant attention to a semantic structure, correct metadata and fast load times: the technical foundation search engines need to properly index the site.",
    seoPills: ["Visitor analytics", "Search queries", "Technical SEO", "Speed & performance"],
    hostingTitle: "Hosting",
    hostingImageAlt: "Web hosting",
    hostingText:
      "A website isn't finished until it's actually live. For Bouwbedrijf Kruize I handled the hosting, domain setup and SSL certification alongside the design and build, so the site doesn't just work, but is also securely and reliably reachable.",
    hostingPills: ["Domain & DNS", "SSL", "Deployment", "Hosting management"],
    reviewsTitle: "Reviews that convince faster than text",
    reviewsText:
      "Real customer experiences convince faster than sales talk. That's why the Google reviews got a fixed, prominent place on the site itself, instead of being tucked away behind an external link.",
    reviewsScore: "5.0",
    reviewsScoreLabel: ["Average", "Google rating"],
    reviewsImageAlt: "Reviews",
    ictTitle: "Information and Communication Technology (ICT)",
    ictSubtitle: "System administration · Application administration · IT support · Microsoft environments",
    ictParagraph1:
      "Besides web design and development, I have broader IT experience: managing, supporting and maintaining systems and applications within an organization.",
    ictParagraph2:
      "Think system administration and application administration, with attention to workplace management, user support and solving technical problems.",
    ictTechLabel: "Technologies & capabilities",
    ictTech: ["System administration", "Application administration", "IT support", "Workplace management", "Microsoft 365", "SharePoint", "Microsoft Intune"],
    ictImagePending: "Image coming soon",
    ctaHeading: { lead: "Ready for a new website or", accent: "IT challenge", rest: "?" },
    startProject: "Start Project",
  },

  projectDesignIdentity: {
    pageTitle: "Design & Identity",
    introHeading: "A brand is more than a logo",
    introParagraph1:
      "A strong identity starts with a logo, but doesn't end there. It grows into a system of grid, whitespace, typography and color, which is then applied consistently across every touchpoint with a client.",
    introParagraph2:
      "Below is a look at what that looks like in practice: from a documented brand system to an identity that comes to life in photography and tone of voice.",
    systemEyebrow: "Identity → system",
    systemHeading: "Documented, not accidental",
    systemParagraph:
      "For Bouwbedrijf Kruize, the same identity you see on the website, the visual language is captured in a repeatable system: whitespace rules around the mark and exact specifications for letterhead, so the identity stays consistent no matter who applies it.",
    logoSpacingAlt: "Bouwbedrijf Kruize brand guidelines: clearspace and whitespace rules around the logo",
    logoSpacingCaption: "Logo & whitespace",
    letterheadAlt: "Bouwbedrijf Kruize brand guidelines: letterhead specifications and A4 format",
    letterheadCaption: "Letterhead: specifications",
    applicationEyebrow: "System → application",
    applicationHeading: "An identity that evokes a feeling",
    applicationParagraph:
      "At FIXY the identity doesn't stop at the logo. Color, typography and tone translate just as well into photography and copy: the same brand world, recognizable in every expression.",
    fixyCampaignAlt: "FIXY brand world translated into photography, color and tone of voice",
    fixyCampaignCaption: "Brand world in image and text",
    fixySpacesAlt: "FIXY spaces presented in the same visual and textual tone as the rest of the brand",
    fixySpacesCaption: "Applied to the spaces themselves",
    consistencyEyebrow: "Application → consistency",
    consistencyHeading: "Identity in practice",
    consistencyParagraph:
      "A visual identity doesn't stop at a logo. A brand also needs to stay recognizable and consistent in everyday communication. For various brands I designed email signatures where typography, color, logo and digital contact points come together in one recognizable application.",
    signatureAlt: (brand: string) => `Email signature for ${brand} (names and contact details are placeholders)`,
    coversEyebrow: "What this can cover",
    coversParagraph:
      "This kind of work combines multiple disciplines, from first brand exploration to the smallest application, depending on what a brand needs.",
    disciplines: ["Logo & wordmark", "Visual identity", "Typography & color systems", "Brand guidelines", "Business print applications"],
    ctaHeading: { lead: "Time for a", accent: "strong identity", rest: "?" },
    startProject: "Start Project",
  },

  projectPrintDesign: {
    pageTitle: "Print & Campaign Design",
    introHeading: "Design that works offline too",
    introParagraph1: "Not everything has to live on a screen. Posters, flyers and other print work grab attention precisely because they're tangible.",
    introParagraph2:
      "I design print and promotional material that convinces: from standalone graphic design for a single job to cohesive campaign visuals, from first sketch to print-ready file.",
    introParagraph3: "The same principle applies here: consistent, considered and tailored to where the material is actually used.",
    postersEyebrow: "Posters in practice",
    postersParagraph: "A selection of posters, from first sketch to print-ready design.",
    posterAlt: "Poster design, A2 format",
    canMakeTitle: "What I can make",
    canMakeBlocks: [
      { title: "Print", items: ["Posters & flyers", "Promotional material", "Print-ready files"] },
      { title: "Graphic Design", items: ["Standalone design work", "Campaign visuals", "Visual consistency"] },
      { title: "Application", items: ["Advice on format & material", "Coordination with the printer", "From concept to final result"] },
    ],
    ctaHeading: { lead: "Time for", accent: "standout print", rest: "?" },
    startProject: "Start Project",
  },

  projectContentSocial: {
    pageTitle: "Content & Social Media",
    introHeading: "Content that brings a brand to life",
    introParagraph1:
      "Social media needs more than standalone images. It's about a visual thread that stays recognizable everywhere: in the feed, in a story or in an announcement.",
    introParagraph2:
      "Below is a selection of content I designed for brands in nightlife culture: from recurring campaign systems to content that adapts to a wide range of formats.",
    kopjekEyebrow: "Featured campaign",
    kopjekHeading: "A recurring template for a club tour",
    kopjekParagraph:
      "For the Kopjek Clubtour I designed a single visual template, with typography, 3D shape and layout, that got its own color scheme per city. Four cities, the same template, each with its own color and lineup.",
    kopjekAlt: (city: string) => `Kopjek Clubtour announcement for ${city}, same template in its own color scheme`,
    practiceEyebrow: "In practice",
    practiceHeading: "Different brands, different moods",
    practiceParagraph:
      "Not every brand calls for the same tone: the approach shifts with what the brand needs, from a moody editorial announcement to warm release photography and a playful typographic twist.",
    groningsAlt: "Gronings Finest: moody editorial event announcement",
    leviAlt: "Levi: Moovline release party, photography-driven announcement",
    tonightFlipAlt: "FIXY Bar: 'Tonight we flip', flipped typography as a visual twist",
    formatsEyebrow: "Campaign → formats",
    formatsHeading: "One story, told in three moments",
    formatsParagraph:
      "For FIXY's DJ Talentroom the announcement built up through stories, with \"stay tuned\" and \"big news soon\", before the feed post revealed the lineup. Same visual system, three moments, three formats.",
    feedPostAlt: "FIXY DJ Talentroom: feed post revealing the lineup",
    feedPostCaption: "Feed post: lineup revealed",
    storyTeaserAlt: "FIXY DJ Talentroom: story teaser 'stay tuned'",
    storyTeaserCaption: "Story: teaser",
    storyAnnouncementAlt: "FIXY DJ Talentroom: story announcement 'big news soon'",
    storyAnnouncementCaption: "Story: announcement",
    approachEyebrow: "How I approach this",
    approachParagraph:
      "I don't work with a fixed content package or a fixed number of posts per month. I look at what a brand, event or campaign needs and build the content around that.",
    disciplines: ["Campaign visuals", "Social posts & stories", "Recurring templates", "Announcements", "Event photography"],
    ctaHeading: { lead: "Time to", accent: "show something", rest: "?" },
    startProject: "Start Project",
  },

  projectProduct: {
    pageTitle: "Digital Products",
    heading: "Complex problems, simple solutions",
    paragraph1: "Digital products call for a different approach. It's about user experience, scalability and smart architecture.",
    paragraph2: "I design and build products people actually enjoy using, from SaaS platforms to internal tools and mobile apps.",
    paragraph3: "With an iterative approach, we make sure together that the product fits your users' needs exactly.",
    imageAlt: "Product design example",
    expertiseTitle: "Expertise",
    expertise: [
      { title: "Product Strategy", desc: "Together we decide what needs to be built and why, from idea to roadmap." },
      { title: "UX/UI Design", desc: "User-friendly interfaces based on research and best practices." },
      { title: "Full-Stack Development", desc: "Robust applications with modern frameworks and scalable architecture." },
      { title: "Iteration & Growth", desc: "Data-driven optimization after launch for continuous improvement." },
    ],
    ctaHeading: { lead: "Build a", accent: "product", rest: "?" },
    startProject: "Start Project",
  },

  notFound: {
    title: "404",
    message: "Oops! Page not found",
    returnHome: "Return to Home",
  },
};

export type Language = "nl" | "en";

export const translations: Record<Language, TranslationShape> = { nl, en };
