// Dati Aziendali (DEVONO CORRISPONDERE AL TUO GBP)
export const COMPANY_NAME = "Milano Impermeabilizzazioni"; // Il tuo nome commerciale
export const MAIN_CATEGORY = "Impermeabilizzazione Terrazzi";
export const PRIMARY_CITY = "Milano";

// Usa il numero di telefono REALE che hai sul GBP
export const PHONE_NUMBER = "+39 334 222 1212"; 
export const EMAIL_ADDRESS = "info@impermeabilizzazionimilano.it"; 
export const WEBSITE_URL = "https://www.ecosolutionsas.com/impermeabilizzazioni";
// Questo è l'indirizzo di REGISTRAZIONE (es. casa tua)
// Serve per lo Schema Markup, anche se è NASCOSTO sul GBP
export const SCHEMA_ADDRESS = {
  streetAddress: "Via Finanzieri d'Italia",
  addressLocality: "Milano",
  addressRegion: "MI",
  postalCode: "20162",
  addressCountry: "IT"
};

// Coordinate GPS di milano (per lo Schema)
export const SCHEMA_GEO = {
  latitude: 45.4642,
  longitude: 9.1900
};

// Queste DEVONO corrispondere alle Categorie Secondarie del tuo GBP
export const GBP_CATEGORIES = [
  "Ditta specializzata in impermeabilizzazioni",
  "Impermeabilizzazione terrazzi e balconi",
  "Rifacimento guaina terrazzo",
];

// Queste sono le AREE DI SERVIZIO che hai inserito nel GBP
export const SERVICE_AREAS = [
  { name: "Milano", slug: "Milano" },
  // Aggiungi le altre (fino a 20)
];
