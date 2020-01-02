class NewsChannel < ApplicationCable::Channel
  periodically :broadcast_news, every: 1.minute

  def self.broadcast_news_update
    ActionCable.server.broadcast "news", NewsItem.approved.within_date_range.to_json
  end

  def subscribed
    stream_from "news"
    NewsChannel.broadcast_news_update
  end

  def broadcast_news
    ActionCable.server.broadcast "news", NewsItem.approved.within_date_range.to_json
  end
end
