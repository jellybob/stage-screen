# frozen_string_literal: true

ActiveAdmin.register Message do
  permit_params :headline, :body, :active
end
