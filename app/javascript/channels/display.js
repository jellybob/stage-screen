import consumer from "./consumer";

consumer.subscriptions.create({ channel: "DisplayChannel" }, {
  connected() {
    console.log("Connected to display channel");
  },

  received(data) {
    this.display = JSON.parse(data);
    console.log("New display details!", this.display);
  }
});
