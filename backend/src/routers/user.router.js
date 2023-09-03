import { Router } from "express";
import JWT from "jsonwebtoken";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const router = Router();
const PASSWORD_HASH_SALT_ROUNDS = 10;

router.get(
  "/",
  handler(async (req, res) => {
    const users = await UserModel.find();
    res.send(users);
  })
);

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }

    res.status(BAD_REQUEST).send("Username or password is invalid.");
  })
); //login

router.post(
  "/register",
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(BAD_REQUEST).send("User already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    };

    const result = await UserModel.create(newUser);

    res.send(generateTokenResponse(result));
  })
); //register

router.get(
  "/user/:id",
  handler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid user ID");
    }
    const user = await UserModel.findById(id);
    res.send(user);
  })
); //getUserById

router.post(
  "/user/:id",
  handler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid user ID");
    }
    const user = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });
  })
);

const generateTokenResponse = (user) => {
  const token = JWT.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;
