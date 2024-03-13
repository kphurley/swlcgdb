# This service provides a way to search the DB for a card given a search string

# E.g - A string of c:2,f:1,x:jedi,Luke should translate to:
# "select * from cards where cost = 2 and force = 1 and text ILIKE %jedi% and name ILIKE %Luke%"

# Supported options:
#  a:affiliation
#  b:blast_damage
#  c:cost
#  f:force
#  h:damage_capacity (health)
#  k:traits
#  o:tactics
#  r:resources
#  s:side
#  t:type
#  u:unit_damage
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
    search_input.split(",").reject(&:empty?).map { |_i| _i.strip.split(":") }
  end

  def self.map_options_to_conditions(flag, value = nil)
    sanitized_value = Card.sanitize_search_input(value) if value
    case_insensitive_flag = flag.downcase

    case case_insensitive_flag
    when 'a'
      ["affiliation ILIKE ?", "%#{sanitized_value}%"]
    when 'b'
      ["combat_icons ILIKE ?", "%BD:#{sanitized_value}%"]
    when 'c'
      ["cost = ?", sanitized_value]
    when 'f'
      ["force = ?", sanitized_value]
    when 'h'
      ["damage_capacity = ?", sanitized_value]
    when 'k'
      ["traits ILIKE ?", "%#{sanitized_value}%"]
    when 'o'
      ["combat_icons ILIKE ?", "%T:#{sanitized_value}%"]
    when 'r'
      ["resources = ?", sanitized_value]
    when 's'
      ["side ILIKE ?", "%#{sanitized_value}%"]
    when 't'
      ["card_type ILIKE ?", "%#{sanitized_value}%"]
    when 'u'
      ["combat_icons ILIKE ?", "%UD:#{sanitized_value}%"]
    when 'x'
      ["text ILIKE ?", "%#{sanitized_value}%"]
    else
      ["name ILIKE ?", "%#{flag}%"]
    end
  end
end
