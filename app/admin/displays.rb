# frozen_string_literal: true

ActiveAdmin.register Display do
  permit_params :name, :view_mode, :location

  form do |f|
    f.inputs do
      f.input :name
      f.input :view_mode, as: :select, collection: Display::VALID_MODES
      f.input :location
    end
    f.actions
  end

  index do
    selectable_column
    column :display_id
    column :name
    column :location
    column :view_mode
    column :connected
    actions
  end
end
