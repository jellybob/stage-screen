# frozen_string_literal: true

class ContentsController < ApplicationController
  def next
    @content = Content.order("RANDOM()")
    @content = @content.where("id != ?", params[:previous]) if params[:previous]

    render json: @content.first
  end
end
