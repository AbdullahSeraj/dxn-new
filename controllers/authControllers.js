const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, avatar, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "field are required" });
  }

  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(401).json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    avatar,
  });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: user._id,
        role: user.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // openssl rand -base64 32
    { expiresIn: "7d" }
  );

  res.json({
    accessToken,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "fields are required" });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(401).json({ message: "email is not exists" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(402).json({ message: "Wrong Password" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        role: foundUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    accessToken,
    username: foundUser.username,
    email: foundUser.email,
    avatar: foundUser.avatar,
  });
};

const signout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

const signinWithGoogle = async (req, res) => {
  const { username, email, avatar } = req.body;

  if (!username || !email || !avatar) {
    return res.status(400).json({ message: "All feild are required" });
  }

  const password = username.toLowerCase() + Math.floor(Math.random() * 100);

  let foundUser = await User.findOne({ email });

  if (foundUser) {
    // const match = await bcrypt.compare(password, foundUser.password);
    // if (!match) {
    //   return res.status(402).json({ message: "Wrong Password" });
    // }
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    foundUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    accessToken,
    username: foundUser.username,
    email: foundUser.email,
    avatar: foundUser.avatar,
  });
};

module.exports = { signup, signin, signout, signinWithGoogle };
