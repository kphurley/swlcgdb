class AddAffiliations < ActiveRecord::Migration[7.0]
  def change
    create_table :affiliations do |t|
      t.string :name
      t.integer :resources
      t.string :text
      t.string :side
      t.string :affiliation_name

      t.timestamps
    end

    change_table :decks do |t|
      t.integer :affiliation_id
    end

    add_foreign_key :decks, :affiliations
  end
end
