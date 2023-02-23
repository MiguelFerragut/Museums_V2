const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true
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
      set: string => string === undefined ? 'https://i.pinimg.com/474x/5d/cf/02/5dcf02265a260bb0902c1ec504d1743b.jpg' : string
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'GUIDE', 'MANAGER', 'ADMIN'],
      default: 'USER'
    },
    fav: [String]
    //Should the favorites be in the user model?
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User 
