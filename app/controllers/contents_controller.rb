# frozen_string_literal: true

class ContentsController < ApplicationController
  def index
    @content = Content.all
  end

  def next
    @content = Content.order("RANDOM()")
    @content = @content.where("id != ?", params[:previous]) if params[:previous]

    render json: @content.first
  end

  def new
    @content = Content.new
  end

  def show
    @content = Content.find(params[:id])
  end

  def create
    @content = Content.new(content_params)
    @content.save!

    redirect_to contents_path
  rescue ActiveRecord::RecordInvalid
    render :new
  end

  private

  def content_params
    params.require(:content).permit(:url, :content_type, :contributed_by, :tags)
  end
end
