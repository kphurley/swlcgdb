class CardBlock < ApplicationRecord
  belongs_to :card_set
  has_many :cards
end
