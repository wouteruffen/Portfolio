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
      title: "Print & Campagne Design",
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
    tagline: "Design dat werkt.",
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
      "Bij Studio Bit & Beeld combineer ik strategie, design en development tot digitale ervaringen die daadwerkelijk werken. Mijn passie ligt bij het vertalen van complexe ideeën naar strakke, functionele oplossingen.",
    paragraph2:
      "Ik bouw alles, van merkidentiteit tot volledige webplatformen, met precisie, passie en een scherp oog voor detail. Als eenmanszaak werk ik nauw samen met mijn klanten: korte lijnen, snelle beslissingen, persoonlijke aandacht.",
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
    serviceIntro:
      "Een identiteit brengt karakter in beeld. Kleur, typografie en vormgeving bepalen samen hoe een merk eruitziet, aanvoelt en zich presenteert.",
    systemEyebrow: "Identiteit → systeem",
    systemHeading: "Bouwbedrijf Kruize",
    systemParagraph:
      "Dezelfde identiteit als op de website: witruimteregels rond het merkteken en exacte specificaties voor briefpapier, zodat de toepassing consistent blijft.",
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
    pageTitle: "Print & Campagne Design",
    postersParagraph:
      "Een selectie van posters voor verschillende evenementen, ieder met een eigen sfeer en uitstraling. Typografie, beeld en compositie vormen daarbij de basis van ieder ontwerp.",
    posterAlt: "Posterontwerp, A2 formaat",
    // Only this one poster has a verified, source-backed identifier (from
    // the original asset filename, "B31 - Simplon 1e editie") — the other
    // three source files carry no client/event name, so they stay
    // uncaptioned rather than inventing matching metadata for symmetry.
    simplonCaption: "Simplon, 1e editie",
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
    serviceIntro:
      "Goede promotie begint met herkenbaarheid. Een sterke visuele stijl zorgt voor samenhang, maar biedt genoeg ruimte om iedere uiting een eigen karakter te geven.",
    kopjekEyebrow: "Uitgelichte campagne",
    kopjekHeading: "Kopjek Clubtour",
    kopjekParagraph:
      "Eén visueel sjabloon, met typografie, 3D-vorm en indeling, kreeg per stad een eigen kleurstelling en line-up.",
    kopjekAlt: (city: string) => `Kopjek Clubtour aankondiging voor ${city}, zelfde sjabloon in eigen kleurstelling`,
    groningsAlt: "Gronings Finest: moody editorial eventaankondiging",
    groningsCaption: "Gronings Finest, moody editorial",
    leviAlt: "Levi: Moovline releasefeest, fotografie-gedreven aankondiging",
    leviCaption: "Levi: Moovline, releasefotografie",
    tonightFlipAlt: "FIXY Bar: 'Tonight we flip', omgedraaide typografie als visuele wending",
    tonightFlipCaption: "Bar FIXY: Flip, speelse typografie",
    formatsEyebrow: "Campagne → formaten",
    formatsHeading: "FIXY: DJ Talentroom",
    feedPostAlt: "FIXY DJ Talentroom: feed post met line-up onthulling",
    feedPostCaption: "Feed post: line-up onthuld",
    storyTeaserAlt: "FIXY DJ Talentroom: story teaser 'stay tuned'",
    storyTeaserCaption: "Story: 'stay tuned'",
    storyAnnouncementAlt: "FIXY DJ Talentroom: story aankondiging 'big news soon'",
    storyAnnouncementCaption: "Story: 'big news soon'",
    approachEyebrow: "Hoe ik dit aanpak",
    approachParagraph:
      "Ik werk niet met een vast contentpakket of een vaste hoeveelheid posts per maand, maar kijk naar wat een merk, avond of campagne nodig heeft en bouw de content daaromheen op.",
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

  brandbook: {
    cover: {
      tag: "Vol. 1: Het merkboek",
      scrollHint: "Scroll om te verkennen",
      backLink: "Terug naar home",
      facts: [
        { label: "Studio", value: "Studio Bit & Beeld" },
        { label: "Locatie", value: "Amsterdam, NL" },
        { label: "Jaar", value: "2026" },
        { label: "Hoofdstukken", value: "16" },
      ],
    },
    intro: {
      eyebrow: "Introductie",
      heading: "Eén merk, overal hetzelfde verhaal.",
      paragraph:
        "Dit merkboek is geen los naslagwerk. Het laat zien hoe logo, kleur, typografie en toon samen het systeem vormen waarmee deze site zelf is gebouwd.",
      statement:
        "Sterke vormgeving gecombineerd met technische kennis, voor web, merk en alles daartussenin.",
    },
    identity: {
      eyebrow: "Identiteit",
      heading: "Wat Studio Bit & Beeld is",
      paragraph:
        "Geen groot bureau met een team achter glas. Eén persoon die vormgeving en techniek allebei zelf begrijpt en toepast.",
      pillars: [
        { title: "Creativiteit + techniek", desc: "Vorm en functie komen niet na elkaar tot stand, maar tegelijk." },
        { title: "Eenmanszaak, persoonlijk", desc: "Korte lijnen, snelle beslissingen, persoonlijke aandacht." },
        { title: "Maatwerk boven sjabloon", desc: "Elk project vertrekt vanuit wat het merk nodig heeft, niet vanuit een vast pakket." },
      ],
    },
    logo: {
      eyebrow: "Logo",
      heading: "Het woordmerk",
      paragraph:
        "Het beeldmerk bestaat in twee officiële versies: licht voor donkere ondergronden, donker voor lichte ondergronden. Beide bestanden zijn de enige juiste bron.",
      darkCaption: "Op near-black",
      lightCaption: "Op warm papier",
    },
    logoUsage: {
      eyebrow: "Logo gebruik",
      heading: "Hoe het merk wel en niet werkt",
      doLabel: "Wel",
      dontLabel: "Niet",
      dos: [
        "Gebruik het originele bestand, ongeacht de toepassing.",
        "Behoud voldoende witruimte rondom het merk.",
        "Gebruik de lichte versie op een donkere ondergrond en andersom.",
      ],
      donts: [
        "De kleur of verhoudingen aanpassen.",
        "Het merk namaken met los getypte tekst.",
        "Het op een drukke of fotografische achtergrond plaatsen.",
      ],
      note: "Voor zeer kleine toepassingen, zoals een favicon of app-icoon, wordt niet het volledige woordmerk gebruikt maar het compacte beeldmerk uit het volgende hoofdstuk.",
    },
    monogram: {
      eyebrow: "Monogram",
      heading: "Het compacte beeldmerk",
      paragraph:
        "Naast het volledige woordmerk bestaat er een compact merkteken, gebruikt als favicon en app-icoon: overal waar het volledige logo te klein of te gedetailleerd zou worden.",
      caption: "Favicon en app-icoon",
      note: "Dit icoon gebruikt een eigen rode oranje tint die net iets afwijkt van de brand-orange kleur van de website.",
    },
    color: {
      eyebrow: "Kleur",
      heading: "Warm, donker, en één signaalkleur",
      paragraph:
        "De basis is een warm papierwit en een zacht near-black, nooit zuiver wit of zwart. Brand-orange is de vaste signaalkleur: in knoppen, in de balk van navigatie en footer, overal hetzelfde.",
      swatches: {
        paper: "Warm Paper",
        cream: "Cream",
        nearBlack: "Near Black",
        orange: "Brand Orange",
      },
    },
    colorUsage: {
      eyebrow: "Kleur in gebruik",
      heading: "Combinaties die werken",
      paragraph: "De kleuren staan nooit op zichzelf. Dit zijn de combinaties die daadwerkelijk voorkomen op de site.",
      pairs: [
        { label: "Near-black op Warm Paper", sample: "Standaard leestekst in het lichte thema." },
        { label: "Cream op Near-black", sample: "Standaard leestekst in het donkere thema." },
        { label: "Wit op Brand Orange", sample: "Knoppen en call-to-action." },
        { label: "Near-black op Brand Orange", sample: "Footer en mobiele navigatiebalk." },
      ],
      accentNote: "Brand-orange wordt daarnaast gebruikt als accentkleur in tekst, op zowel donkere als lichte ondergrond.",
      themeNote: "De site kent een licht en donker thema: near-black en warm papier wisselen van rol, brand-orange blijft in beide hetzelfde." as string,
    },
    typography: {
      eyebrow: "Typografie",
      heading: "Drie lettertypes, één heldere hiërarchie",
      display: { name: "Anton", role: "Display, paginatitels" },
      editorial: { name: "Antonio", role: "Subkoppen, editorial" },
      body: { name: "Inter", role: "Bodytekst en interface" },
      specimenDisplay: "IDENTITEIT",
    },
    hierarchy: {
      eyebrow: "Hiërarchie",
      heading: "Van groot naar functioneel",
      paragraph: "Dezelfde niveaus keren terug op elke pagina van de site.",
      levels: [
        { label: "Display", sample: "BRANDBOOK" },
        { label: "Koptekst", sample: "Eén merk, overal hetzelfde verhaal." },
        { label: "Subkop", sample: "Kwaliteit boven kwantiteit" },
        { label: "Bodytekst", sample: "Niet alleen om iets goed te laten ogen, maar vooral om iets te maken dat werkt." },
        { label: "Label", sample: "Uitgelicht project" },
      ],
    },
    layout: {
      eyebrow: "Layout en compositie",
      heading: "Ruimte, raster en herhaling",
      paragraph:
        "Elke pagina deelt dezelfde opbouw: een vast raster op de achtergrond, dezelfde maximale breedte voor tekst, dezelfde adempauze tussen secties.",
      stats: [
        { value: "1240px", label: "Maximale inhoudsbreedte" },
        { value: "60px", label: "Achtergrondraster" },
        { value: "16 → 24", label: "Verticale sectieruimte" },
      ],
      asymmetryLabel: "Asymmetrische verdeling",
      gridLabel: "Rasterlijnen op de achtergrond",
    },
    imagery: {
      eyebrow: "Beeldgebruik",
      heading: "Hoe beeld wordt ingezet",
      paragraph: "Beeld krijgt een lichte dieptelaag: een verschoven schaduwvlak achter het kader in plaats van een platte rand.",
      portraitCaption: "Portretten: zachte, afgeronde hoeken",
      workCaption: "Werk en documenten: scherpe hoeken",
    },
    digital: {
      eyebrow: "Digitale toepassing",
      heading: "Hetzelfde merk, in interface",
      paragraph:
        "Knoppen, labels en kaarten volgen dezelfde regels als de rest van het merk: rustige vlakken, één signaalkleur, duidelijke randen.",
      ctaLabel: "Plan Gesprek",
      tagsLabel: "Labels en tags",
      navLabel: "Navigatiebalk",
      motionNote:
        "Overgangen zijn terughoudend: secties verschijnen met een korte fade en beweging omhoog, nooit met verspringende of afleidende effecten. Dit merkboek gebruikt zijn eigen hoofdstuk-voor-hoofdstuk scrollmechaniek als voorbeeld daarvan." as string,
    },
    voice: {
      eyebrow: "Toon van stem",
      heading: "Persoonlijk, geen bureau",
      paragraph:
        "Studio Bit & Beeld schrijft zoals er gewerkt wordt: persoonlijk, direct en concreet. Zelfverzekerd zonder overdrijving, creatief zonder vaag te worden." as string,
      principles: [
        { title: "Tekst heeft een reden nodig", desc: "Copy staat er niet omdat de layout ruimte heeft, maar omdat er iets te zeggen is." },
        { title: "Laat het werk spreken", desc: "Toon het werk snel, zonder lagen algemene uitleg ervoor." },
        { title: "Vertel niet wat al zichtbaar is", desc: "Laat het beeld het al zien, dan voegt de tekst iets anders toe of verdwijnt." },
        { title: "Ik, niet een bureau", desc: "Studio Bit & Beeld is Wouter. Ik voor eigen werk, we alleen bij echte samenwerking." },
        { title: "Onderbouw een claim", desc: "Een woord als 'uniek' mag, zolang de tekst eromheen laat zien waarom het klopt." },
        { title: "Geen gedachtestreepjes", desc: "Nooit een em dash of en dash als stijlmiddel, in het Nederlands en het Engels." },
      ] as { title: string; desc: string }[],
      doLabel: "Wel",
      dontLabel: "Niet",
      doExample:
        "Als eenmanszaak werk ik nauw samen met mijn klanten: korte lijnen, snelle beslissingen, persoonlijke aandacht.",
      dontExample:
        "Wij zijn een full-service creative agency die met een gepassioneerd team cutting-edge digitale ervaringen tot leven brengt.",
    },
    roles: {
      eyebrow: "Contentrollen" as string,
      paragraph:
        "Tekst op de site doet niet overal hetzelfde werk. Deze vier rollen bepalen de functie van een tekst, niet de stem erachter." as string,
      items: [
        {
          code: "A",
          title: "Visie / Introductie",
          question: "Hoe kijk ik naar dit vakgebied of onderwerp?",
          purpose: "Zet een perspectief neer op een dienst of thema. Geen agencyslogan, geen projectbeschrijving.",
          exampleSource: "Content & Social Media",
          exampleQuote: "Goede promotie begint met herkenbaarheid.",
        },
        {
          code: "B",
          title: "Persoonlijk",
          question: "Wie zit erachter en hoe denk of werk ik?",
          purpose: "Wouters eigen stem: hoe hij denkt of werkt. Geen bureauprofiel, geen founder-verhaal in de derde persoon.",
          exampleSource: "Over mij",
          exampleQuote: "Mijn kracht zit in de combinatie van creativiteit en techniek.",
        },
        {
          code: "C",
          title: "Projectcontext",
          question: "Wat is relevant om over dit project te weten?",
          purpose: "Optioneel, en alleen als het beeld het nog niet vertelt. Vaak is de juiste hoeveelheid tekst: geen.",
          exampleSource: null,
          exampleQuote: null,
        },
        {
          code: "D",
          title: "Functioneel",
          question: "Waar ben ik, wat volgt er, wat kan ik doen?",
          purpose: "Labels, knoppen en navigatie. Helderheid boven creativiteit.",
          exampleSource: null,
          exampleQuote: null,
          exampleLabels: ["Projecten", "Bekijk website", "Plan Gesprek"],
        },
      ] as {
        code: string;
        title: string;
        question: string;
        purpose: string;
        exampleSource: string | null;
        exampleQuote: string | null;
        exampleLabels?: string[];
      }[],
      note: "Niet elke pagina heeft alle vier de rollen nodig. Gebruik een rol alleen als de tekst een echte functie heeft." as string,
    },
    usage: {
      eyebrow: "Toepassing",
      heading: "Toegepast op echt werk",
      paragraph: "Deze identiteit is geen theorie. Ze is terug te zien in het werk zelf.",
      viewLabel: "Bekijk",
    },
    closing: {
      eyebrow: "Colofon",
      heading: "Design dat werkt.",
      studio: "Studio Bit & Beeld",
      location: "Amsterdam, NL",
      copyright: "© 2026 Studio Bit & Beeld",
      backHome: "Terug naar home",
      cta: { lead: "Klaar om iets", accent: "moois", rest: "te bouwen?" },
    },
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
    tagline: "Design that works.",
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
      "At Studio Bit & Beeld I combine strategy, design and development into digital experiences that actually work. My passion lies in translating complex ideas into clean, functional solutions.",
    paragraph2:
      "I build everything, from brand identity to full web platforms, with precision, passion and a sharp eye for detail. As a one-person studio I work closely with my clients: short lines of communication, fast decisions, personal attention.",
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
    serviceIntro:
      "An identity brings character to life. Color, typography and design together determine how a brand looks, feels and presents itself.",
    systemEyebrow: "Identity → system",
    systemHeading: "Bouwbedrijf Kruize",
    systemParagraph:
      "The same identity as the website: whitespace rules around the mark and exact specifications for letterhead, so the application stays consistent.",
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
    postersParagraph:
      "A selection of posters for different events, each with its own atmosphere and character. Typography, imagery and composition form the foundation of every design.",
    posterAlt: "Poster design, A2 format",
    // Only this poster has a verified, source-backed identifier (from the
    // original asset filename, "B31 - Simplon 1e editie") — see the NL note.
    simplonCaption: "Simplon, 1st edition",
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
    serviceIntro:
      "Good promotion starts with recognizability. A strong visual style creates consistency, while still leaving enough room for every piece to have its own character.",
    kopjekEyebrow: "Featured campaign",
    kopjekHeading: "Kopjek Clubtour",
    kopjekParagraph:
      "One visual template, with typography, 3D shape and layout, got its own color scheme and lineup per city.",
    kopjekAlt: (city: string) => `Kopjek Clubtour announcement for ${city}, same template in its own color scheme`,
    groningsAlt: "Gronings Finest: moody editorial event announcement",
    groningsCaption: "Gronings Finest, moody editorial",
    leviAlt: "Levi: Moovline release party, photography-driven announcement",
    leviCaption: "Levi: Moovline, warm release photography",
    tonightFlipAlt: "FIXY Bar: 'Tonight we flip', flipped typography as a visual twist",
    tonightFlipCaption: "Bar FIXY: Flip, playful typography",
    formatsEyebrow: "Campaign → formats",
    formatsHeading: "FIXY: DJ Talentroom",
    feedPostAlt: "FIXY DJ Talentroom: feed post revealing the lineup",
    feedPostCaption: "Feed post: lineup revealed",
    storyTeaserAlt: "FIXY DJ Talentroom: story teaser 'stay tuned'",
    storyTeaserCaption: "Story: 'stay tuned'",
    storyAnnouncementAlt: "FIXY DJ Talentroom: story announcement 'big news soon'",
    storyAnnouncementCaption: "Story: 'big news soon'",
    approachEyebrow: "How I approach this",
    approachParagraph:
      "I don't work with a fixed content package or a fixed number of posts per month, but look at what a brand, event or campaign needs and build the content around that.",
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

  brandbook: {
    cover: {
      tag: "Vol. 1: The Brand Manual",
      scrollHint: "Scroll to explore",
      backLink: "Back to home",
      facts: [
        { label: "Studio", value: "Studio Bit & Beeld" },
        { label: "Location", value: "Amsterdam, Netherlands" },
        { label: "Year", value: "2026" },
        { label: "Chapters", value: "16" },
      ],
    },
    intro: {
      eyebrow: "Introduction",
      heading: "One brand, the same story everywhere.",
      paragraph:
        "This brand manual isn't a separate reference document. It shows how logo, color, typography and tone come together as the system this site itself is built with.",
      statement:
        "Strong design combined with technical knowledge, for web, brand and everything in between.",
    },
    identity: {
      eyebrow: "Identity",
      heading: "What Studio Bit & Beeld is",
      paragraph:
        "Not a large agency with a team behind glass. One person who understands and applies both design and technology.",
      pillars: [
        { title: "Creativity + technology", desc: "Form and function don't happen one after the other. They happen together." },
        { title: "One person, personal", desc: "Short lines of communication, fast decisions, personal attention." },
        { title: "Custom work over templates", desc: "Every project starts from what the brand needs, not from a fixed package." },
      ],
    },
    logo: {
      eyebrow: "Logo",
      heading: "The wordmark",
      paragraph:
        "The mark exists in two official versions: light for dark backgrounds, dark for light backgrounds. Both files are the only correct source.",
      darkCaption: "On near-black",
      lightCaption: "On warm paper",
    },
    logoUsage: {
      eyebrow: "Logo usage",
      heading: "How the mark works, and doesn't",
      doLabel: "Do",
      dontLabel: "Don't",
      dos: [
        "Use the original file, whatever the application.",
        "Keep enough clear space around the mark.",
        "Use the light version on a dark background and the other way round.",
      ],
      donts: [
        "Change its color or proportions.",
        "Recreate the mark with typed text.",
        "Place it on a busy or photographic background.",
      ],
      note: "For very small applications, like a favicon or app icon, the full wordmark is replaced by the compact mark in the next chapter.",
    },
    monogram: {
      eyebrow: "Monogram",
      heading: "The compact mark",
      paragraph:
        "Alongside the full wordmark there's a compact mark, used as the favicon and app icon: anywhere the full logo would turn too small or too detailed.",
      caption: "Favicon and app icon",
      note: "This icon uses its own red orange shade, slightly different from the website's brand orange.",
    },
    color: {
      eyebrow: "Color",
      heading: "Warm, dark, and one signal color",
      paragraph:
        "The foundation is a warm paper white and a soft near-black, never pure white or black. Brand orange is the fixed signal color: in buttons, in the navigation and footer bar, the same everywhere.",
      swatches: {
        paper: "Warm Paper",
        cream: "Cream",
        nearBlack: "Near Black",
        orange: "Brand Orange",
      },
    },
    colorUsage: {
      eyebrow: "Color in use",
      heading: "Combinations that work",
      paragraph: "The colors never stand alone. These are the combinations that actually occur on the site.",
      pairs: [
        { label: "Near-black on Warm Paper", sample: "Default body copy in light mode." },
        { label: "Cream on Near-black", sample: "Default body copy in dark mode." },
        { label: "White on Brand Orange", sample: "Buttons and calls to action." },
        { label: "Near-black on Brand Orange", sample: "Footer and mobile navigation bar." },
      ],
      accentNote: "Brand orange is also used as an accent color within text, on both dark and light backgrounds.",
      themeNote: "The site has a light and a dark theme: near-black and warm paper swap roles, brand orange stays the same in both.",
    },
    typography: {
      eyebrow: "Typography",
      heading: "Three typefaces, one clear hierarchy",
      display: { name: "Anton", role: "Display, page titles" },
      editorial: { name: "Antonio", role: "Subheadings, editorial" },
      body: { name: "Inter", role: "Body copy and interface" },
      specimenDisplay: "IDENTITY",
    },
    hierarchy: {
      eyebrow: "Hierarchy",
      heading: "From large to functional",
      paragraph: "The same levels return on every page of the site.",
      levels: [
        { label: "Display", sample: "BRANDBOOK" },
        { label: "Heading", sample: "One brand, the same story everywhere." },
        { label: "Subheading", sample: "Quality over quantity" },
        { label: "Body copy", sample: "Not just to make something look good, but above all to make something that works." },
        { label: "Label", sample: "Featured project" },
      ],
    },
    layout: {
      eyebrow: "Layout & composition",
      heading: "Space, grid and repetition",
      paragraph:
        "Every page shares the same structure: a fixed background grid, the same maximum width for text, the same breathing room between sections.",
      stats: [
        { value: "1240px", label: "Maximum content width" },
        { value: "60px", label: "Background grid" },
        { value: "16 → 24", label: "Vertical section spacing" },
      ],
      asymmetryLabel: "Asymmetric division",
      gridLabel: "Grid lines in the background",
    },
    imagery: {
      eyebrow: "Imagery",
      heading: "How images are used",
      paragraph: "Images get a light depth layer: an offset shadow plane behind the frame instead of a flat edge.",
      portraitCaption: "Portraits: soft, rounded corners",
      workCaption: "Work and documents: sharp corners",
    },
    digital: {
      eyebrow: "Digital application",
      heading: "The same brand, in interface",
      paragraph:
        "Buttons, labels and cards follow the same rules as the rest of the brand: calm surfaces, one signal color, clear borders.",
      ctaLabel: "Book a Call",
      tagsLabel: "Labels and tags",
      navLabel: "Navigation bar",
      motionNote:
        "Transitions stay restrained: sections fade and rise in gently, never with jarring or distracting effects. This brand book's own chapter-by-chapter scroll mechanic is itself an example of that restraint.",
    },
    voice: {
      eyebrow: "Tone of voice",
      heading: "Personal, not an agency",
      paragraph:
        "Studio Bit & Beeld writes the way it works: personal, direct and concrete. Confident without exaggeration, creative without turning vague.",
      principles: [
        { title: "Text needs a reason to exist", desc: "Copy isn't there because the layout has room. It's there because there's something to say." },
        { title: "Let the work speak", desc: "Show the work quickly, without layers of generic explanation first." },
        { title: "Don't narrate what's already visible", desc: "If the image already shows it, the text adds something else or disappears." },
        { title: "Personal, not an agency", desc: "Studio Bit & Beeld is Wouter. I for my own work, we only for genuine collaboration." },
        { title: "Support a claim", desc: "A word like 'unique' is fine, as long as the surrounding text shows why it's true." },
        { title: "No em dash or en dash", desc: "Never a stylistic em dash or en dash, in Dutch or English." },
      ] as { title: string; desc: string }[],
      doLabel: "Do",
      dontLabel: "Don't",
      doExample:
        "As a one-person studio I work closely with my clients: short lines of communication, fast decisions, personal attention.",
      dontExample:
        "We are a full-service creative agency bringing cutting-edge digital experiences to life with a passionate team.",
    },
    roles: {
      eyebrow: "Content roles",
      paragraph:
        "Text on the site doesn't do the same job everywhere. These four roles define a text's function, not the voice behind it.",
      items: [
        {
          code: "A",
          title: "Vision / Introduction",
          question: "How do I see this discipline or subject?",
          purpose: "Sets out a perspective on a service or theme. Not an agency slogan, not a project description.",
          exampleSource: "Content & Social Media",
          exampleQuote: "Good promotion starts with recognizability.",
        },
        {
          code: "B",
          title: "Personal",
          question: "Who's behind this, and how do I think or work?",
          purpose: "Wouter's own voice: how he thinks or works. Not a company profile, not a founder story in the third person.",
          exampleSource: "About",
          exampleQuote: "My strength lies in combining creativity with technical thinking.",
        },
        {
          code: "C",
          title: "Project context",
          question: "What's relevant to know about this project?",
          purpose: "Optional, and only when the image doesn't already say it. Often the right amount of text is none.",
          exampleSource: null,
          exampleQuote: null,
        },
        {
          code: "D",
          title: "Functional",
          question: "Where am I, what comes next, what can I do?",
          purpose: "Labels, buttons and navigation. Clarity over cleverness.",
          exampleSource: null,
          exampleQuote: null,
          exampleLabels: ["Projects", "View website", "Book a Call"],
        },
      ] as {
        code: string;
        title: string;
        question: string;
        purpose: string;
        exampleSource: string | null;
        exampleQuote: string | null;
        exampleLabels?: string[];
      }[],
      note: "Not every page needs all four roles. Use a role only when the text has a real function.",
    },
    usage: {
      eyebrow: "Application",
      heading: "Applied to real work",
      paragraph: "This identity isn't theory. It shows up in the work itself.",
      viewLabel: "View",
    },
    closing: {
      eyebrow: "Colophon",
      heading: "Design that works.",
      studio: "Studio Bit & Beeld",
      location: "Amsterdam, Netherlands",
      copyright: "© 2026 Studio Bit & Beeld",
      backHome: "Back to home",
      cta: { lead: "Ready to build something", accent: "great", rest: "together?" },
    },
  },
  notFound: {
    title: "404",
    message: "Oops! Page not found",
    returnHome: "Return to Home",
  },
};

export type Language = "nl" | "en";

export const translations: Record<Language, TranslationShape> = { nl, en };
