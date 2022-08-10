class AddIsCustomReleaseOrderToCardSets < ActiveRecord::Migration[7.0]
  def change
    change_table :card_sets do |t|
      t.boolean :is_custom, default: false
      t.integer :release_order
    end
  end
end
