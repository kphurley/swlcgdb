class Api::DecksController < ApplicationController
  skip_before_action :authenticate_request

  def show
    deck = Deck.find(params[:id])

    respond_to do |format|
      format.json { render json: deck.as_json }
    end
  end
end
