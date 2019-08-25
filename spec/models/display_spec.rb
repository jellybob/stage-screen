# frozen_string_literal: true

require "rails_helper"

RSpec.describe "display ID generation" do
  subject(:display) { Display.new }

  it "generates an ID before validating if one is not present" do
    display.validate

    expect(display.display_id).not_to be_nil
  end

  it "does not generate an ID if one is already present" do
    display.display_id = "abc123"
    display.validate

    expect(display.display_id).to eq("abc123")
  end

  it "sets the display ID in time to save" do
    expect { display.save! }.not_to raise_error(ActiveRecord::RecordInvalid)
  end
end
