/* News-Berichte.
   Die Liste auf news.html sortiert veröffentlichte Einträge nach Datum, neueste zuerst.
   draft: true erscheint nicht in der Liste.
   Zur Seite: news/_vorlage.html kopieren nach news/YYYY-MM-DD-slug.html
   und Titel, Beschreibung sowie die Open-Graph-Angaben im Kopf setzen.
   Bei jedem neuen Bericht die Version im Script-Tag von news.html erhöhen
   (?v=… bei /js/news-data.js), sonst zeigen Browser bis zu 10 Minuten die alte Liste. */
window.CZ_NEWS = [
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
