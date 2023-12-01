class CreateDecks < ActiveRecord::Migration[7.0]
  def change
    create_table :decks do |t|
      t.string :name
      t.string :description

      t.belongs_to :user

      t.timestamps
    end

    create_table :deck_card_blocks do |t|
      t.belongs_to :card_block
      t.belongs_to :deck

      t.integer :quantity
    end
  end
end
