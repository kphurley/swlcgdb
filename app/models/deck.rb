class Deck < ApplicationRecord
  belongs_to :user
  belongs_to :affiliation

  has_many :deck_card_blocks
  has_many :card_blocks, through: :deck_card_blocks
  has_many :cards, through: :card_blocks

  # Note that the associations above do not account for quantities in the deck
  # For instance - my_deck.cards will just join card_blocks to cards and return that list
  # which isn't really useful for displays

  # Use the helpers below to assist in performing CRUD operations on decks
  def as_json
    {
      id: id,
      user_id: user_id,
      name: name,
      description: description,
      card_blocks: card_blocks_as_hashes_with_quantity,
      cards: cards_as_hashes_with_quantity,
      affiliation: affiliation.as_json&.except("created_at", "updated_at"),
      created_at: created_at,
      updated_at: updated_at,
    }
  end

  def minimal_json
    {
      id: id,
      name: name,
      description: description,
      affiliation: affiliation.as_json&.except("created_at", "updated_at"),
      created_at: created_at,
      updated_at: updated_at,
    }
  end

  def update_from_json!(deck_json)
    if deck_json[:card_blocks]
      Deck.transaction do
        destroy_all_card_blocks

        # need to alias id as card_block_id, add deck_id, and keep quantity
        formatted_card_blocks = deck_json[:card_blocks].map do |blk|
          blk[:card_block_id] = blk[:id]
          blk[:deck_id] = self.id
          blk.slice(:card_block_id, :deck_id, :quantity)
        end

        puts formatted_card_blocks
        DeckCardBlock.create!(formatted_card_blocks)
      end
    end

    self.update!(deck_json.slice(:name, :description))
  end
  
  def card_blocks_as_hashes_with_quantity
    card_block_attributes = CardBlock.attribute_names - ["created_at", "updated_at"]

    self.card_blocks.pluck_to_hash(*card_block_attributes, "deck_card_blocks.quantity as quantity")
  end

  # This appears to work, but needs two queries, and then a manual merge over the two returned data sets
  # It would be really good to find a way to do this in the DB with a single query
  def cards_as_hashes_with_quantity
    # First, query for all of the cards in the deck, using distinct to cut out the extras, and return a list of hashes
    
    distinct_cards = cards.select(
      "distinct on(cards.name)
      cards.id,
      cards.name,
      cards.affiliation,
      cards.block,
      cards.cost,
      cards.card_type,
      cards.combat_icons,
      cards.cost,
      cards.damage_capacity,
      cards.edge_priority,
      cards.flavor,
      cards.force,
      cards.resources,
      cards.side,
      cards.text,
      cards.traits"
    ).order(:name)

    # Then, count how many we have of each name
    # This gets us a mapping of card name to its count
    card_name_to_quantity = cards.group(:name).count

    # Iterate over the distinct_cards and apply the needed quantity
    # This is probably performant *enough* given decks are relatively small, but still not ideal
    card_hashes = []
    distinct_cards.each do |_card|
      card_hash = _card.as_json
      card_hash["quantity"] = card_name_to_quantity[_card.name]
      card_hashes << card_hash
    end

    card_hashes
  end

  def destroy_all_card_blocks
    self.deck_card_blocks.destroy_all if self.deck_card_blocks.any?
  end
end
