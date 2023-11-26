class Api::CardsController < ApplicationController
  skip_before_action :authenticate_request

  def show
    card = Card.find(params[:id])

    respond_to do |format|
      format.json { render json: card.attributes.merge({ set: card.card_block.card_set }) }
    end
  end
end
