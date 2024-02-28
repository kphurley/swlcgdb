# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include JsonWebToken

  around_action :rescue_errors
  before_action :authenticate_request

  private

  def authenticate_request
    header = request.headers["Authorization"]
    header = header.split(" ").last if header
    decoded = jwt_decode(header)
    @current_user = User.find(decoded[:user_id])
  end

  def rescue_errors
    yield
  rescue ActiveRecord::RecordNotFound => exception
    render json: { error: 'Not found' }, status: 404
  rescue StandardError => exception
    puts exception.inspect
    render json: { error: 'Internal Server Error' }, status: 500
  end
end
