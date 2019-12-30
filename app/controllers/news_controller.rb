class NewsController < ApplicationController
  def index
    news = NewsItem.visible.all

    render json: news
  end
end
