class AddEmojiToCategories < ActiveRecord::Migration[7.2]
  def change
    add_column :categories, :emoji, :string, null: false, default: "📁" unless column_exists?(:categories, :emoji)
  end
end