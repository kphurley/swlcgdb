class Deck < ApplicationRecord
  belongs_to :user
  belongs_to :affiliation

  has_many :deck_card_blocks, dependent: :destroy
  has_many :card_blocks, through: :deck_card_blocks
  has_many :cards, through: :card_blocks

  validates :name, presence: true

  # Note that the associations above do not account for quantities in the deck
  # For instance - my_deck.cards will just join card_blocks to cards and return that list
  # which isn't really useful for displays

  # Use the helpers below to assist in performing CRUD operations on decks
  def detailed_json
    {
      id: id,
      user: user.safe_json,
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
      user: user.safe_json,
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
          next if blk[:quantity] == 0

          blk[:card_block_id] = blk[:id]
          blk[:deck_id] = self.id
          blk.slice(:card_block_id, :deck_id, :quantity)
        end

        formatted_card_blocks = formatted_card_blocks.reject(&:blank?)

        DeckCardBlock.create!(formatted_card_blocks) if formatted_card_blocks.any?
      end
    end

    self.update!(deck_json.slice(:name, :description, :affiliation_id))
  end
  
  def card_blocks_as_hashes_with_quantity
    # We gotta cache this, because we're gonna need it later
    return @blocks_with_quantity if @blocks_with_quantity

    card_block_attributes = CardBlock.attribute_names - ["created_at", "updated_at"]

    @blocks_with_quantity = self.card_blocks.pluck_to_hash(*card_block_attributes, "deck_card_blocks.quantity as quantity")
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
      cards.card_block_id,
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

    # Compute a mapping of card names to quantites
    cards_with_quantities = Card.joins(card_block: :deck_card_blocks)
                                .select('cards.name', 'SUM(deck_card_blocks.quantity) as quantity')
                                .where({ 'deck_card_blocks.deck_id' => self.id }).group('cards.name')

    card_name_to_quantity = {}.tap { |h| cards_with_quantities.map { |c| h[c.name] = c.quantity }}

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
