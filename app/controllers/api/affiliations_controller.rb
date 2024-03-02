class Api::AffiliationsController < ApplicationController
  skip_before_action :authenticate_request

  def index
    affiliations = Affiliation.all

    respond_to do |format|
      format.json { render json: affiliations }
    end
  end
end
