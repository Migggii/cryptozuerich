/* CryptoZürich — einzige Stelle für den Web3Forms Access Key.
   Beide Formulare (Kontakt und Newsletter) lesen den Key von hier.
   Web3Forms-Keys sind öffentlich und fürs Frontend gedacht:
   https://web3forms.com
   Im Dashboard die erlaubte Domain auf cryptozürich.ch beschränken.
   Ersetzen: den Wert von web3formsAccessKey austauschen. */
window.CZ_CONFIG = {
  web3formsAccessKey: "91275222-1df8-4b1e-8c9a-dc0377d57065",
  endpoint: "https://api.web3forms.com/submit"
};
