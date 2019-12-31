Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", :as => "rails_admin"

  get :news, controller: "news", action: "index"
  get "/events/upcoming", controller: "events", action: "upcoming"
  root controller: "display", action: "index"
end
