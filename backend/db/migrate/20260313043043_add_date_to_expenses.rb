class AddDateToExpenses < ActiveRecord::Migration[7.2]
  def up
    add_column :expenses, :date, :date

    execute <<~SQL
      UPDATE expenses
      SET date = DATE(created_at)
    SQL

    change_column_null :expenses, :date, false
    add_index :expenses, :date
  end

  def down
    remove_index :expenses, :date
    remove_column :expenses, :date
  end
end
