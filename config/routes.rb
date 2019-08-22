# frozen_string_literal: true

Rails.application.routes.draw do
  resources :displays
  resources :contents, path: "content" do
    collection do
      get :next
    end
  end

  root "screen#show"
end
