const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: [{
      _id: { type: String, required: true },
      cin: { type: String, required: true, immutable: true },
      nom: { type: String, required: true },
      email: { type: String, required: true },
      role: { type: String },
      image: { type: String, default: 'https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg' }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", ConversationSchema);
