# This service provides a way to search the DB for a card given a search string
# Supported options:
#  c:cost
#  k:traits
#  t:type
#  x:text

# The default option (no option) should search the card name 

# This class DOES NOT assume the input is sanitized, and should sanitize each input

class CardSearch
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

    puts relation.to_sql

    relation
  end

  private

  def self.parse_input_to_options(search_input)
    search_input.split(",").map { |_i| _i.strip.split(":") }
  end

  def self.map_options_to_conditions(flag, value = nil)
    case flag
    when 'c'
      ["cost = ?", value]
    when 'k'
      ["traits ILIKE ?", "%#{value}%"]
    when 't'
      ["card_type ILIKE ?", "%#{value}%"]
    when 'x'
      ["text ILIKE ?", "%#{value}%"]
    else
      ["name ILIKE ?", "%#{flag}%"]
    end
  end
end
