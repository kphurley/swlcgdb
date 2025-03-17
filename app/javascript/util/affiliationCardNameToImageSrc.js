const NAMES_TO_SRC = {
  Jedi: "/affiliation-cards/jedi-base.jpg",
  'Rebel Alliance': "/affiliation-cards/rebel-alliance-base.jpg",
  'Smugglers and Spies': "/affiliation-cards/smugglers-base.jpg",
  'Imperial Navy': "/affiliation-cards/imperial-navy-base.jpg",
  Sith: "/affiliation-cards/sith-base.jpg",
  'Scum and Villainy': "/affiliation-cards/scum-base.jpg",
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
