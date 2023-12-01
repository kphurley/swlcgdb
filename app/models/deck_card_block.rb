class DeckCardBlock < ApplicationRecord
  belongs_to :card_block
  belongs_to :deck
end
