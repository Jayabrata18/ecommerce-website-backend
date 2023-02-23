const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  socialMedia: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
