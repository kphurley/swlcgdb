class CreateCardBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :card_blocks do |t|
      t.belongs_to :card_set, index: true, foreign_key: true

      t.integer :block
      t.string :name
      t.string :affiliation
      t.string :side

      t.timestamps
    end
  end
end
