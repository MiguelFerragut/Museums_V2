const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true                           //User name not unique because its not a nickname
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    avatar: {
      type: String,
      set: string => string === '' ? 'https://img1.freepng.es/20180613/ku/kisspng-vitruvian-man-vinci-computer-icons-clip-art-vitruvian-man-5b215c79311a22.8760125415289130172011.jpg' : string
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'GUIDE', 'MANAGER', 'ADMIN'],
      default: 'USER'
    }
    //Should the favorites be in the user model?
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
