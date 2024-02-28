class Api::DecksController < ApplicationController
  skip_before_action :authenticate_request, only: [:show]

  def show
    deck = Deck.find(params[:id])

    respond_to do |format|
      format.json { render json: deck.as_json }
    end
  end

  # Must be authenticated, which means @current_user should be set prior to this
  # Shape of body should be:
  # {
  #   "name": "Some Deck Name",  (required)
  #   "description": "Some Deck Description, should support some basic markup",  (optional)
  # }
  # We are not going to allow assigning card blocks as part of initialization
  # So our flows must account for this

  def create
    permitted_params = params.permit(:name, :description)

    deck = Deck.create!(name: permitted_params[:name], description: permitted_params[:description], user: @current_user)

    respond_to do |format|
      format.json { render json: deck.as_json }
    end
  end

  # Must be authenticated, which means @current_user should be set prior to this
  # Shape of body should be:
  # {
  #   "name": "Some Deck Name",  (optional)
  #   "description": "Some Deck Description, should support some basic markup",  (optional)
  #   "card_blocks": [{ "id":2, "quantity":1 }, { "id":3, "quantity":2 }]
  # }
  # We are not going to allow assigning card blocks as part of initialization
  # So our flows must account for this

  def update
    found_deck = Deck.find(params[:id])

    render json: { error: 'Deck not found' }, status: :not_found if found_deck.nil?
    render json: { error: 'unauthorized' }, status: :unauthorized if found_deck.user_id != @current_user.id

    permitted_params = params.permit(:name, :description, { card_blocks: [:id, :quantity]})
    found_deck.update_from_json!(permitted_params)

    respond_to do |format|
      format.json { render json: found_deck.as_json }
    end
  end
end
