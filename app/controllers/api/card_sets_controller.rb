class Api::CardSetsController < ApplicationController
  def index
    card_sets = CardSet.where.not(release_order: nil).pluck(:name, :release_order)

    sets_json = card_sets.map do |name, number|
      {
        name: name,
        number: number
      }
    end

    respond_to do |format|
      format.json { render json: sets_json }
    end
  end
end