# frozen_string_literal: true

class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, only: [:login, :logout]

  def me
    rendered_user = @current_user.safe_json

    render json: { user: rendered_user }, status: :ok
  end

  def login
    @user = User.find_by_email(login_params[:email])

    if @user&.authenticate(login_params[:password])
      token = jwt_encode(user_id: @user.id)
      cookies.signed[:jwt] = { value: token, httponly: true, expires: 1.hour.from_now }
      rendered_user = @user.safe_json

      render json: { user: rendered_user }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def logout
    cookies.delete(:jwt)

    render json: { message: 'success' }, status: :ok
  end

  private

  def login_params
    @request_body ||= JSON.parse(request.body.read)
    @request_body.slice!("email", "password")

    @request_body.symbolize_keys
  end
end
