class Api::SearchController < ApplicationController
  def create
    search_result = CardSearch.perform(params[:searchString])

    respond_to do |format|
      format.json { render json: search_result }
    end
  end
end
