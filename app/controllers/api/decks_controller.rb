require 'pagy/extras/metadata'

class Api::DecksController < ApplicationController
  include Pagy::Backend

  skip_before_action :authenticate_request, only: [:show, :index, :most_recent_decks_by_faction]

  # GET api/decks/:id
  def show
    deck = Deck.find(params[:id])

    respond_to do |format|
      format.json { render json: deck.detailed_json }
    end
  end

  # GET api/decks
  # List ALL decks
  # TODO - Should be paginated
  def index
    @pagy, @records = pagy(Deck.all.order(updated_at: :desc), items: 20)

    render json: { data: @records.map(&:minimal_json), pagy: pagy_metadata(@pagy) }
  end

  # GET api/decks/mine
  # Must be authenticated, which means @current_user should be set prior to this
  # Show a list of a user's decks
  def my_decks
    decks = Deck.where(user: @current_user)

    respond_to do |format|
      format.json { render json: decks.map(&:minimal_json) }
    end
  end

  # POST api/decks
  # Must be authenticated, which means @current_user should be set prior to this
  # Shape of body should be:
  # {
  #   "name": "Some Deck Name",  (required)
  #   "affiliation_id": 12,  (the id of the affiliation used for this deck - required)
  #   "description": "Some Deck Description, should support some basic markup",  (optional)
  # }
  # We are not going to allow assigning card blocks as part of initialization
  # So our flows must account for this

  def create
    permitted_params = params.permit(:name, :description, :affiliation_id)

    deck = Deck.create!(
      name: permitted_params[:name],
      description: permitted_params[:description],
      affiliation_id: permitted_params[:affiliation_id],
      user: @current_user
    )

    respond_to do |format|
      format.json { render json: deck.detailed_json }
    end
  end

  # PUT api/decks/:id
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
    # Note that this will raise if the deck isn't found, which will return a 404
    found_deck = Deck.find(params[:id])

    raise 'unauthorized' if found_deck.user_id != @current_user.id

    permitted_params = params.permit(:name, :description, { card_blocks: [:id, :quantity]})
    found_deck.update_from_json!(permitted_params)

    respond_to do |format|
      format.json { render json: found_deck.detailed_json }
    end
  end

  # GET api/decks/byFaction/mostRecent
  # Get the last deck created from each faction
  def most_recent_decks_by_faction
    decks = Affiliation::AFFILIATION_NAMES.map do |name|
      Deck.joins(:affiliation).where("affiliations.affiliation_name = ?", name).order(:updated_at).limit(1)
    end

    respond_to do |format|
      format.json { render json: decks.flatten.map(&:minimal_json) }
    end
  end
end
