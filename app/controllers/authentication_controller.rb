# frozen_string_literal: true

class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def login
    @user = User.find_by_email(login_params[:email])

    if @user&.authenticate(login_params[:password])
      token = jwt_encode(user_id: @user.id)
      rendered_user = @user.attributes.slice("id", "name", "username", "email")

      render json: { token: token, user: rendered_user }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private

  def login_params
    @request_body ||= JSON.parse(request.body.read)
    @request_body.slice!("email", "password")

    @request_body.symbolize_keys
  end
end
