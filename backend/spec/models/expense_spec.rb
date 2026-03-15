require 'rails_helper'

RSpec.describe Expense, type: :model do
  let!(:category) { Category.find_or_create_by!(name: "Food") }

  it "is invalid when the date is in the future" do
    expense = Expense.new(
      description: "Future expense",
      amount: 100,
      payer_name: "Teymour",
      category: category,
      date: Date.current + 1.day
    )

    expect(expense).not_to be_valid
    expect(expense.errors[:date].join).to include("cannot be in the future")
  end
end
