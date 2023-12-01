# frozen_string_literal:  true

class User < ApplicationRecord
  require "securerandom"

  has_secure_password

  has_many :decks

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates :username, presence: true, uniqueness: true
end
