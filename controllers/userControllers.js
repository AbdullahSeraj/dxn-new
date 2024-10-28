const User = require("../models/User");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const users = await User.find();
  if (users.length == 0 || !users) {
    return res.status(400).json({ message: "Not found any user" });
  }

  res.json(users);
};

const getProfile = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Not found this user profile" });
    }

    res.json(user);
  } catch (error) {
    return res.status(402).json({ message: "server error" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user;
  const { username, avatar, password, gender, language, country, address } =
    req.body;

  if (!username && !avatar && !password && !gender && !language && !country) {
    return res.status(400).json({ message: "No changes provided" });
  }

  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, {
      username: username,
      avatar: avatar,
      password: hashedPassword,
      gender: gender,
      language: language,
      country: country,
      address: address,
    });

    if (!user) {
      return res.status(400).json({ message: "Not found this user" });
    }

    res.json(user);
  } catch (error) {
    return res.status(401).json({ message: "Server Error " + error });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "user id is required" });
  }

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(401).json({ message: "Not found this user" });
    }

    res.json(foundUser);
  } catch (error) {
    return res.status(401).json({ message: "Server error" });
  }
};

const updateRoleUser = async (req, res) => {
  const { role } = req.body;
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "Not found user id" });
  }

  try {
    const foundUser = await User.findById(userId);

    if (foundUser.email === "admin@gmail.com") {
      return res
        .status(401)
        .json({ message: "you can't update role admin@gmail.com email" });
    }

    const user = await User.findByIdAndUpdate(userId, { role: role });

    if (!user) {
      return res.status(402).json({ message: "Not found user" });
    }

    res.json(user);
  } catch (error) {
    return res.status(403).json({ message: "server error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(400).json({ message: "not found this user" });
    }

    res.json(user);
  } catch (error) {
    return res.status(401).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  getProfile,
  updateProfile,
  getUser,
  updateRoleUser,
  deleteUser,
};
