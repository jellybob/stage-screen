# frozen_string_literal: true

Rails.application.routes.draw do
  ActiveAdmin.routes(self)

  get "/content", to: "contents#next"
  get "/message", to: "messages#next"
  root "screen#show"
end
