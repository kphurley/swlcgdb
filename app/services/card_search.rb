# This service provides a way to search the DB for a card given a search string
# Supported options:
#  c:cost
#  k:traits
#  t:type
#  x:text

# The default option (no option) should search the card name

class CardSearch
  include ActiveRecord::Sanitization::ClassMethods

  def self.perform(search_input)
    parsed_options = parse_input_to_options(search_input)

    relation = nil
    parsed_options.each do |opt|
      conds = map_options_to_conditions(*opt)

      if relation.nil?
        relation = Card.where(*conds)
      else
        relation = relation.where(*conds)
      end
    end

    relation
  end

  private

  def self.parse_input_to_options(search_input)
    search_input.split(",").map { |_i| _i.strip.split(":") }
  end

  def self.map_options_to_conditions(flag, value = nil)
    sanitized_value = Card.sanitize_search_input(value) if value

    case flag
    when 'c'
      ["cost = ?", sanitized_value]
    when 'k'
      ["traits ILIKE ?", "%#{sanitized_value}%"]
    when 't'
      ["card_type ILIKE ?", "%#{sanitized_value}%"]
    when 'x'
      ["text ILIKE ?", "%#{sanitized_value}%"]
    else
      ["name ILIKE ?", "%#{flag}%"]
    end
  end
end
