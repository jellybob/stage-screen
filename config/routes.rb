Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", :as => "rails_admin"

  get :news, controller: "news", action: "index"
end
