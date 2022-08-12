class Api::CardsController < ApplicationController
  def show
    card = Card.find(params[:id])

    respond_to do |format|
      format.json { render json: card.attributes.merge({ set: card.card_block.card_set }) }
    end
  end
end
