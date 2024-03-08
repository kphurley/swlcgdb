const NAMES_TO_SRC = {
  Jedi: "https://www.cardgamedb.com/forums/uploads/sw/ffg_jedi-core.png",
  'Rebel Alliance': "https://www.cardgamedb.com/forums/uploads/sw/ffg_rebel-alliance-core.png",
  'Smugglers and Spies': "https://www.cardgamedb.com/forums/uploads/sw/ffg_smugglers-and-spies-core.png",
  'Imperial Navy': "https://www.cardgamedb.com/forums/uploads/sw/ffg_imperial-navy-core.png",
  Sith: "https://www.cardgamedb.com/forums/uploads/sw/ffg_sith-core.png",
  'Scum and Villainy': "https://www.cardgamedb.com/forums/uploads/sw/ffg_scum-and-villainy-core.png",
  'Any Methods Necessary': "/affiliation-cards/any-methods-necessary.png",
  'Dark Masters': "/affiliation-cards/dark-masters.png",
  'Desperate Allies': "/affiliation-cards/desperate-allies.png",
  'Expendable Allies': "/affiliation-cards/expendable-allies.png",
  'Fighters for Freedom': "/affiliation-cards/fighters-for-freedom.png",
  'Galactic Enforcers': "/affiliation-cards/galactic-enforcers.png",
  'Guardians of Justice': "/affiliation-cards/guardians-of-justice.png",
  'Imperial Contractors': "/affiliation-cards/imperial-contractors.png",
  'Information Network': "/affiliation-cards/information-network.png",
  'Mercenary Contacts': "/affiliation-cards/mercenary-contacts.png",
  'No Questions Asked': "/affiliation-cards/no-questions-asked.png",
  'Promise of Power': "/affiliation-cards/promise-of-power.png",
}

export default function affiliationCardNameToImageSrc (cardName) {
  return NAMES_TO_SRC[cardName];
}
