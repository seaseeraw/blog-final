import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUser } from "../models/userSchema.js";
import { config } from "../config/config.js";
import { authenticateJWT } from "../middleware/authenticate.js";
import { consoleMiddleWare } from "../middleware/consoleMiddleWare.js";

const router = express.Router();

// Signup Api User
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const userData = await createUser({
      username,
      email,
      password: hashedpassword,
    });

    const respObj = {
      status: "success",
      message: "User created successfully!",
    };

    res.status(200).send(respObj);
  } catch (err) {
    let errObj = {
      status: "error",
      message: "Error Creating",
      error: {
        code: 500,
        details: err.message || "Error creating user",
      },
    };

    res.status(500).send(errObj);
  }
});

// login
router.post("/login", consoleMiddleWare, async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser({ email }, true);

  if (!user) {
    const errObj = {
      status: "error",
      message: "Unauthenticated",
      error: {
        code: 401,
        details: "Invalide email or password",
      },
    };
    return res.status(401).send(errObj);
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    const errObj = {
      status: "error",
      message: "Unauthenticated",
      error: {
        code: 401,
        details: "Invalide email or password",
      },
    };

    return res.status(400).json(errObj);
  } else {
    // login successful
    const token = jwt.sign(
      { _id: user._id, email: user.email, username: user.username },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpire,
      }
    );

    const respObj = {
      status: "success",
      message: "Login Successful",
      data: {
        token,
        username: user.username,
      },
    };

    res.status(200).send(respObj);
  }
});

router.get("/verify", consoleMiddleWare, authenticateJWT, async (req, res) => {
  const respObj = {
    status: "success",
    message: "Verified",
    data: { username: req.user.username },
  };

  return res.status(200).send(respObj);
});

export default router;
