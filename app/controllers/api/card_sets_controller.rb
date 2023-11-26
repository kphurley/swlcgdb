class Api::CardSetsController < ApplicationController
  skip_before_action :authenticate_request

  def index
    card_sets = CardSet.where.not(release_order: nil).pluck(:name, :id, :release_order)

    sets_json = card_sets.map do |name, id, number|
      {
        id: id,
        name: name,
        number: number
      }
    end

    respond_to do |format|
      format.json { render json: sets_json }
    end
  end

  def show
    card_set = CardSet.find(params[:id])

    set_json = {
      id: card_set.id,
      name: card_set.name,
      number: card_set.release_order,
      card_blocks: card_set.card_blocks,
      cards: card_set.cards
    }

    respond_to do |format|
      format.json { render json: set_json }
    end
  end
end