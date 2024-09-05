import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Required"],
  },
  userName: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
    validate: {
      validator: (v) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid Email Id`,
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  displayPicture: {
    type: String,
  },
  statusMessage: {
    type: String,
  },
});

export const User = mongoose.model("User", UserSchema);
