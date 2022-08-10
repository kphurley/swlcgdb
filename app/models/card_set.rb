class CardSet < ApplicationRecord
  has_many :card_blocks
  has_many :cards, through: :card_blocks
end
