class CardBlock < ApplicationRecord
  belongs_to :card_set
  has_many :cards

  has_many :deck_card_blocks
  has_many :decks, through: :deck_card_blocks

  def json_with_cards
    self.attributes.merge({ "cards" => self.cards.as_json })
  end
end
