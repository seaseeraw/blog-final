import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("user", userSchema);

export const getUsers = async () => {
  return await User.find();
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

export const updateUser = async (id, user) => {
  const data = await User.findByIdAndUpdate(
    id,
    {
      $set: user,
    },
    { new: true }
  );

  return data;
};

export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

export const findUser = async (query, showPassword = false) => {
  const data = showPassword
    ? await User.findOne(query).select("+password")
    : await User.findOne(query);

  return data;
};
