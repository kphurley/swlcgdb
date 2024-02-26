class Api::Password::PasswordResetsController < ApplicationController
  skip_before_action :authenticate_request

  def create
    if @user = User.find_by_email(params[:email])
      PasswordMailer.with(user: @user).reset.deliver_later
    end

    render json: { message: "If an account with that email was found, we have sent a link to reset password." }, status: :ok
  end

  def edit
    begin
      @user = User.find_signed!(params[:token], purpose: 'password_reset')
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      render json: { error: "Invalid password reset token" }, status: :unprocessable_entity
    end

    render json: { message: "Token valid" }, status: :ok
  end

  def update
    errors = []

    begin
      @user = User.find_signed!(params[:token], purpose: 'password_reset')
      @user.update(password_params)
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      errors << "Invalid password reset token"
    rescue => error
      errors << error.message
    end

    if errors.any?
      render json: { error: errors.join(",") }, status: :unprocessable_entity
    else
      render json: { message: "Password change succeeded." }, status: :ok
    end
  end

  private
  def password_params
    {
      password: params[:password]
    }
  end
end
