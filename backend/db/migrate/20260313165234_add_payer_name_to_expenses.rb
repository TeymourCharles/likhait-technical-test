class AddPayerNameToExpenses < ActiveRecord::Migration[7.2]
  def up
    add_column :expenses, :payer_name, :string, limit: 100 unless column_exists?(:expenses, :payer_name)

    execute <<~SQL
      UPDATE expenses
      SET payer_name = 'Unknown'
      WHERE payer_name IS NULL
    SQL

    change_column_null :expenses, :payer_name, false
  end

  def down
    remove_column :expenses, :payer_name if column_exists?(:expenses, :payer_name)
  end
end