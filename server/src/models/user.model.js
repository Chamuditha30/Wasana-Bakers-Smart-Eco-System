import { Schema, model } from "mongoose";
import { hashPassword } from "../util/auth.util.js";

//create model
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    mustChangePassword: {
      type: Boolean,
      default: true,
    },

    //branch reference
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  { timestamps: true },
);

//hashing password before save
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
});

export const User = model("User", userSchema);
