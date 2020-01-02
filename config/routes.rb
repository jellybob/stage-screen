Rails.application.routes.draw do
  mount RailsAdmin::Engine => "/admin", :as => "rails_admin"

  root controller: "display", action: "index"
end
