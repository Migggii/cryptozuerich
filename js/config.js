/* CryptoZürich — einzige Stelle für den Web3Forms Access Key,
   die Brevo-Formular-URL und die Event-Wallet.
   Kontakt und Event-Anmeldung lesen den Key von hier.
   Das Newsletter-Formular liest BREVO_FORM_URL von hier.
   Die Event-Seite liest EVENT_WALLET von hier.
   Remark42 bleibt aus, solange REMARK42_HOST leer ist.
   Adresse und Formular-URL nicht ins HTML kopieren.
   Web3Forms-Keys sind öffentlich und fürs Frontend gedacht:
   https://web3forms.com
   Im Dashboard die erlaubte Domain auf cryptozürich.ch beschränken.
   Ersetzen: den Wert von web3formsAccessKey austauschen. */
window.CZ_CONFIG = {
  web3formsAccessKey: "91275222-1df8-4b1e-8c9a-dc0377d57065",
  endpoint: "https://api.web3forms.com/submit",
  BREVO_FORM_URL: "https://4bf2ff4a.sibforms.com/serve/MUIFANwUJ-aDSAJhAfNAi5u4DgvV7BdPsFvbCI0Ej1_CrO3IU6rtleTAElzxQW7xXem6Lh3oaA5-LQmXegZCW-WSCWDGMdSWy58R5RSj5-iFI1uzAsTHhdLHGctqphBlym4IJ3L17xq9p9ANSLf-Ccm46wolWWYAFFY4DaYZGrWbcpyuAwC4YKZJWiVzospx2iYHtij6evpDLhwMiQ==",
  EVENT_WALLET: "0x17F1Abe12EC49d0A5dF618266B2b7A73DD7642c1",
  REMARK42_HOST: ""
};
