class Card < ApplicationRecord
  belongs_to :card_block

  def self.sanitize_search_input(value)
    sanitize_sql_like(value)
  end
end
