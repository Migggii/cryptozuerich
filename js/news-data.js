/* News-Berichte.
   Die Liste auf news.html sortiert veröffentlichte Einträge nach Datum, neueste zuerst.
   draft: true erscheint nicht in der Liste.
   Zur Seite: news/_vorlage.html kopieren nach news/YYYY-MM-DD-slug.html
   und Titel, Beschreibung sowie die Open-Graph-Angaben im Kopf setzen.
   Bei jedem neuen Bericht die Version im Script-Tag von news.html erhöhen
   (?v=… bei /js/news-data.js), sonst zeigen Browser bis zu 10 Minuten die alte Liste. */
window.CZ_NEWS = [
  {
    date: "2026-11-19",
    slug: "bitcoin-viermonatstief-optimizely-hack",
    title: "Bitcoin auf Viermonatstief – und Krypto-Diebescode auf 178 Websites",
    teaser: "Bitcoin fällt auf rund 63'000 Dollar, die US-Notenbank denkt laut über eine grosse Zinserhöhung nach. Dazu: Schadcode auf Websites von HSBC bis Ledger, die Binance-Beute wird gewaschen, und die Schweiz debattiert über den Franken-Stablecoin."
  },
  {
    date: "2026-11-14",
    slug: "sonderbericht-cyberangriffe-stoerungen",
    title: "Sonderbericht: Grosse Störungen und Cyberangriffe – was wirklich dahintersteckt",
    teaser: "Microsoft-Ausfall, Flugstopp in den USA und Warnungen auf X: Nicht alles ist ein Hackerangriff. Was bestätigt ist, wo echte Gefahren lauern und wie du dich jetzt schützt."
  },
  {
    date: "2026-11-13",
    slug: "wochenueberblick-nvidia-bitcoin",
    title: "Wochenüberblick: Nvidia-Chef tritt zurück, Bitcoin fällt unter 70'000",
    teaser: "Jensen Huang gibt nach der Spionage-Affäre seinen Posten ab, Bitcoin rutscht unter 70'000 Dollar. Dazu: manipulierte Trezor-Wallets, 1,2 Milliarden aus dem Binance-Hack beschlagnahmt und ein Update für LNbits. Was du diese Woche wissen musst."
  },
  {
    date: "2026-11-09",
    slug: "nvidia-spionage-keplr-lnbits",
    title: "Nvidia-Affäre: Spionageverdacht um Jensen Huang – und Keplr-Wallets geleert",
    teaser: "Nvidia untersucht, ob Chef Jensen Huang Ziel eines chinesischen Geheimdienstes war. Dazu: Lücke beim Keplr-Login, LNbits-Server müssen offline und Binance dementiert ein Datenleck. Was du jetzt wissen musst."
  },
  {
    date: "2026-11-04",
    slug: "nubank-schweiz-digitalbanken",
    title: "Nach Revolut kommt Nubank: Digitalbanken drängen in die Schweiz",
    teaser: "Nubank baut in Zug still sein Europa-Geschäft auf, eine französische Bank verliert über 133 Millionen an Hacker und BTCPay-Server werden geleert. Was du jetzt wissen musst."
  },
  {
    date: "2026-11-01",
    slug: "dns-hijacking-chainalysis-oktober",
    title: "Gefälschte DeFi-Seiten, Leck bei Chainalysis und ein roter Oktober",
    teaser: "Angreifer leiten Besucher echter DeFi-Seiten auf Wallet-Drainer um, sogar Chainalysis wurde gehackt, und Bitcoin schliesst den Oktober mit einem Minus. Was du jetzt wissen musst."
  },
  {
    date: "2026-10-30",
    slug: "binance-hack-6-milliarden",
    title: "Binance-Hack: 6,3 Milliarden Dollar, vermutlich über einen Mitarbeiter-Laptop",
    teaser: "Rund 6,3 Milliarden Dollar flossen aus Binance-Hot-Wallets ab, der bisher grösste Krypto-Diebstahl. Was passiert ist und wie du dich schützt."
  },
  {
    date: "2026-10-29",
    slug: "black-october-hacks-phishing",
    title: "Black October: Bridge-Hack, Wallet-Bug und Phishing – was diese Woche zählt",
    teaser: "Ein Bridge-Exploit, eine gefährliche Lücke in Electrum und täuschend echte Phishing-Seiten: Die letzten Tage zeigen, dass Sicherheit im Krypto-Alltag wichtiger ist denn je. Gleichzeitig rückt die traditionelle Finanzwelt weiter an Krypto heran."
  }
];
