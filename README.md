# CryptoZürich

Statische Website für die Community [CryptoZürich](https://xn--cryptozrich-zhb.ch/) — Mini-Events für Krypto-Fans in Zürich. Kurse und Schulungen laufen über [0xnode.ch](https://www.0xnode.ch).

Kein Build-Schritt. HTML, CSS und ein wenig Vanilla-JS. Kein Tracking.

## Lokal ansehen

Im Repo-Root:

```bash
python3 -m http.server 8080
```

Dann [http://127.0.0.1:8080/](http://127.0.0.1:8080/). Die Pfade sind absolut (`/css/...`), deshalb brauchst du einen lokalen Server und nicht `file://`.

## Seiten

| Datei | Inhalt |
| --- | --- |
| `index.html` | Start: Hero, Formate, Termin-Teaser, 0xnode, Newsletter |
| `events.html` | Programm 2027, Regeln, Anmeldung |
| `community.html` | Werte, für wen, mitmachen |
| `newsletter.html` | Anmeldung |
| `news.html` | News-Liste, neueste Berichte zuerst |
| `news/*.html` | Einzelne Berichte. Vorlage: `news/_vorlage.html` |
| `kontakt.html` | Kontaktformular |
| `impressum.html` | Impressum, Vorlage mit Platzhaltern |
| `datenschutz.html` | Datenschutzerklärung (nDSG), Vorlage mit Platzhaltern |
| `404.html` | Seite nicht gefunden |

Header, Navigation und Footer stehen in jeder HTML-Datei. Der Link «Zurück zu 0xnode.ch» steht im Header und im Footer jeder Seite, inklusive Impressum, Datenschutz und 404. Wenn du dort etwas änderst, pass alle Seiten an.

## News

Die Liste steht in `js/news-data.js`. `draft: true` bleibt von `news.html` fern. Für einen neuen Bericht `news/_vorlage.html` nach `news/YYYY-MM-DD-slug.html` kopieren und Titel, Beschreibung und Open-Graph-Felder im Kopf setzen. Die Newsletter-Box unter dem Text nutzt dasselbe Brevo-Formular wie `newsletter.html`. Kommentare (`#remark42`) laden das Remark42-Embed von `REMARK42_HOST` mit `site_id` `cryptozuerich`. Wenn das Skript nicht lädt, bleibt die Seite nutzbar.

## Programm 2027

Die vier Anlässe stehen in `events.html` (`#programm`) und als Teaser auf der Startseite (Hero-Ticket und `#als-naechstes`). Preise, Daten und «Limitiert: max X Plätze» nur an beiden Orten gleichzeitig ändern. Kalenderdateien liegen unter `events/*.ics`.

Die genaue Adresse der Location wird 1 Monat vor dem Anlass bekannt gegeben. Bis dahin steht «Zürich, Adresse folgt», dazu das Datum «Adresse ab …». Anmeldeschluss ist 2 Wochen vor Beginn. Der letzte Tag steht als Datum am Abend (`data-deadline`, Europe/Zurich, der Tag selbst zählt noch). Ab dem Folgetag setzt `js/events.js` den Button auf «Anmeldung geschlossen» und deaktiviert den Eintrag im Formular.

## Teilnehmerstand

Die Balken auf der Programmseite lesen eine Datei: `js/events-data.js`. Pro Abend gibt es `id`, `registered` und `max`.

`registered` ist die Zahl der Personen, die schon dabei sind. Startwert ist 3: Gastgeber und zwei Partner-Helfer. Wenn jemand dazukommt, änderst du nur diese Zahl, speicherst die Datei und lädst die Seite neu. Beispiel: aus `registered: 3` wird `registered: 4`. Keine gerundeten oder erfundenen Zwischenwerte.

`max` ist die Platzzahl und muss zur Zeile «Limitiert: max X Plätze» in `events.html` passen. Ist `registered` gleich `max` oder grösser, schaltet der Balken auf «Ausgebucht». Die Anmeldung bleibt als Warteliste offen, der Betreff bekommt den Zusatz «Warteliste». Nach dem Anmeldeschluss ist der Abend zu.

Die Anmeldung ist das Formular auf `events.html`. Keine E-Mail-Adresse im Quelltext. Zahlungsinfos gehen nach der Anmeldung per Mail über Web3Forms. Optional ist eine Zahlung in USDC oder ETH auf Ethereum Mainnet. Die Wallet steht nur in `js/config.js` (`EVENT_WALLET`). Die Seite setzt Adresse, Kopier-Button und Etherscan-Link von dort. Der QR-Code liegt als lokale Datei unter `assets/event-wallet-qr.svg`.

## Formulare

Kontakt und Event-Anmeldung senden per `fetch` an `https://api.web3forms.com/submit`.

Der Access Key steht **nur** in `js/config.js` (`web3formsAccessKey`). Beide Formulare lesen ihn von dort und setzen ihn beim Senden als `access_key`. Im HTML ist das Feld leer, damit der Key nicht doppelt gepflegt wird.

Betreff, fest in der jeweiligen Seite:

- Kontakt: `CryptoZürich Kontakt`
- Event-Anmeldung: `CryptoZürich Event-Anmeldung`

Der Newsletter auf `newsletter.html` geht an Brevo (Double-Opt-in). Die Formular-URL steht nur in `js/config.js` (`BREVO_FORM_URL`). Es werden keine Brevo-Skripte geladen. Felder: `EMAIL`, Honeypot `email_address_check`, `locale=de`, `html_type=simple`. Nach der Bestätigung kann Brevo auf eine Seite mit `?newsletter=bestaetigt` leiten. Dann erscheint ein Hinweisbanner.

So wechselst du den Key:

1. Auf [web3forms.com](https://web3forms.com) einen Access Key erzeugen.
2. In `js/config.js` den Wert von `web3formsAccessKey` ersetzen.
3. Im Web3Forms-Dashboard die erlaubte Domain auf `cryptozürich.ch` / `xn--cryptozrich-zhb.ch` beschränken.

Der Key ist ein öffentlicher Client-Key und darf im Repository stehen. Eine E-Mail-Adresse des Betreibers steht absichtlich nirgends im Code. Antworten laufen über das Web3Forms-Konto. Kontakt und Event-Anmeldung haben ein Honeypot-Feld (`botcheck`). Der Newsletter hat ein leeres Feld `email_address_check`.

## GitHub Pages

Der Workflow `.github/workflows/pages.yml` veröffentlicht den Repository-Root bei jedem Push auf `main` (und manuell über «Run workflow»).

Einmalig einrichten:

1. GitHub → Repository → **Settings → Pages**.
2. **Build and deployment → Source: GitHub Actions** (nicht «Deploy from a branch»).
3. Den Workflow auf `main` laufen lassen. Der erste Lauf klappt erst, nachdem Pages auf GitHub Actions steht.
4. Custom Domain: die Datei `CNAME` enthält `xn--cryptozrich-zhb.ch`. In den Pages-Einstellungen dieselbe Domain eintragen. HTTPS einschalten, sobald das Zertifikat da ist.
5. DNS ist bereits gesetzt (A-Records der Apex-Domain auf die GitHub-Pages-IPs, `www` als CNAME auf `migggii.github.io`). Daran muss hier nichts geändert werden. Die kanonische Domain ist die Apex-Domain ohne `www`.

`.nojekyll` liegt im Root, damit GitHub die Dateien nicht durch Jekyll filtert. Der Action-Deploy braucht es streng genommen nicht, schadet aber nicht.

## Rechtliches

Impressum und Datenschutz nennen M. Gaggia als Privatperson, Industriestr. 13, 8155 Niederhasli. Kontakt nur über `kontakt.html`. Keine E-Mail-Adresse im Seitenquelltext. Die Texte sind keine Rechtsberatung.

## Struktur

```
index.html, events.html, community.html, newsletter.html, kontakt.html
impressum.html, datenschutz.html, 404.html
css/styles.css
js/config.js      Web3Forms-Key
js/main.js        Navigation, Jahr
js/forms.js       Versand, Erfolg und Fehler
assets/mark.svg   Logo
assets/fonts/     Syne und Outfit (SIL OFL)
CNAME
.nojekyll
.github/workflows/pages.yml
```

Schriften: [Syne](https://gitlab.com/bonjour-monde/fonderie/syne-typeface) und [Outfit](https://github.com/Outfitio/Outfit-Fonts), je SIL Open Font License 1.1. Lizenztexte liegen neben den Dateien.
