class AddDateToExpenses < ActiveRecord::Migration[7.2]
  def up
    add_column :expenses, :date, :date unless column_exists?(:expenses, :date)

    execute <<~SQL
      UPDATE expenses
      SET date = DATE(created_at)
      WHERE date IS NULL
    SQL

    change_column_null :expenses, :date, false
    add_index :expenses, :date unless index_exists?(:expenses, :date)
  end

  def down
    remove_index :expenses, :date if index_exists?(:expenses, :date)
    remove_column :expenses, :date if column_exists?(:expenses, :date)
  end
end
