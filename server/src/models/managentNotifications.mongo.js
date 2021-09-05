const mongoose = require("mongoose");

const managentNotificationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Connects launchesSchema with the "Mangement notifications" collection in db
module.exports = mongoose.model(
  "managentNotifications",
  managentNotificationsSchema
);
