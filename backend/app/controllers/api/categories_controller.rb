class Api::CategoriesController < ApplicationController
  def index
    render json: Category.order(:name)
  end

  def create
    category = Category.new(category_params)

    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    permitted_params = params.require(:category).permit(:name, :emoji)

    permitted_params[:name] = permitted_params[:name]&.strip
    permitted_params[:emoji] = permitted_params[:emoji]&.strip
    permitted_params[:emoji] = "📁" if permitted_params[:emoji].blank?

    permitted_params
  end
end
