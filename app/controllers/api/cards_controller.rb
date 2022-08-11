class Api::CardsController < ApplicationController
  def show
    respond_to do |format|
      format.json { render json: Card.find(params[:id]) }
    end
  end
end
