# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include JsonWebToken
  include ::ActionController::Cookies

  around_action :rescue_errors
  before_action :authenticate_request

  private

  def authenticate_request
    jwt = cookies.signed[:jwt]
    decoded = jwt_decode(jwt)
    @current_user = User.find(decoded[:user_id])
  end

  def rescue_errors
    yield
  rescue JWT::DecodeError => exception
    render json: { error: 'Not authorized' }, status: 401
  rescue ActiveRecord::RecordInvalid => exception
    render json: { error: exception.message }, status: 400
  rescue ActiveRecord::RecordNotFound => exception
    render json: { error: 'Not found' }, status: 404
  rescue StandardError => exception
    puts exception.class
    puts exception.message
    puts exception.backtrace
    render json: { error: 'Internal Server Error' }, status: 500
  end
end
