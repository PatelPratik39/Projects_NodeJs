const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact Name"]
    },
    email: {
      type: String,
      required: [true, "Please add the Email address"]
    },
    phone: {
      type: String,
      required: [true, "Please add the Phone Number"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Conatct", contactSchema);
