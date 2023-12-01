class Deck < ApplicationRecord
  belongs_to :user

  has_many :deck_card_blocks
  has_many :card_blocks, through: :deck_card_blocks
  has_many :cards, through: :card_blocks

  def card_blocks_as_hash_with_quantity
    card_block_attributes = CardBlock.attribute_names - ["created_at", "updated_at"]

    self.card_blocks.pluck_to_hash(*card_block_attributes, "deck_card_blocks.quantity as quantity")
  end

  def destroy_all_card_blocks
    self.deck_card_blocks.destroy_all
  end
end
