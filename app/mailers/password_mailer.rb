class PasswordMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.password_mailer.reset.subject
  #
  def reset
    @user = params[:user]
    @token = @user.signed_id(purpose: 'password_reset', expires_in: 10.minutes)

    @password_reset_url = Rails.env == 'production' ? "https://swlcgdb.com/resetPassword/#{@token}" : "http://localhost:3000/resetPassword/#{@token}"

    mail to: @user.email
  end
end
