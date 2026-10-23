/* CryptoZürich — einzige Stelle für den Web3Forms Access Key
   und die Event-Wallet.
   Kontakt, Newsletter und Event-Anmeldung lesen den Key von hier.
   Die Event-Seite liest EVENT_WALLET von hier. Die Adresse nicht
   ins HTML kopieren.
   Web3Forms-Keys sind öffentlich und fürs Frontend gedacht:
   https://web3forms.com
   Im Dashboard die erlaubte Domain auf cryptozürich.ch beschränken.
   Ersetzen: den Wert von web3formsAccessKey austauschen. */
window.CZ_CONFIG = {
  web3formsAccessKey: "91275222-1df8-4b1e-8c9a-dc0377d57065",
  endpoint: "https://api.web3forms.com/submit",
  EVENT_WALLET: "0x17F1Abe12EC49d0A5dF618266B2b7A73DD7642c1"
};
