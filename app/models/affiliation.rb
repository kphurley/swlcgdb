class Affiliation < ApplicationRecord
  has_many :decks

  AFFILIATION_NAMES = [
    "Jedi",
    "Rebel Alliance",
    "Smugglers and Spies",
    "Imperial Navy",
    "Sith",
    "Scum and Villainy",
  ]
end
