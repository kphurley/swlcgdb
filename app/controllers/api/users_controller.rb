class Api::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]
  before_action :set_user, only: [:show, :destroy]

  def show
    render json: @user, status: :ok
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  def user_params
    request_body = JSON.parse(request.body.read)
    request_body.slice!("name", "username", "email", "password")

    request_body.symbolize_keys
  end

  def set_user
    @user = User.find(params[:id])
  end
end
