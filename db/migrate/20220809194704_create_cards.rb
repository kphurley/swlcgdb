class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.belongs_to :card_block, index: true, foreign_key: true

      t.string :name, index: true
      t.integer :cost
      t.string :card_type
      t.integer :force
      t.string :combat_icons
      t.string :traits
      t.integer :damage_capacity
      t.integer :resources
      t.integer :edge_priority
      t.text :text
      t.text :flavor
      t.string :side
      t.string :affiliation
      t.integer :block
      t.integer :block_number
      t.integer :number

      t.timestamps
    end
  end
end
