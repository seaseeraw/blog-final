import express from "express";
import { createUser, getUserById } from "../models/userSchema.js";
import { authenticateJWT } from "../middleware/authenticate.js";
import { searchPost } from "../models/postSchema.js";

const router = express.Router();

// Get uer data
router.get("/profile", authenticateJWT, async (req, res) => {
  try {
    const { user } = req;
    const userData = await getUserById(user._id);

    const respObj = {
      status: "success",
      message: "User Data Fetched!",
      data: userData,
    };

    res.status(200).send(respObj);
  } catch (err) {
    let errObj = {
      status: "error",
      message: "Error",
      error: {
        code: 500,
        details: err.message || "Error Fetcing User",
      },
    };

    res.status(500).send(errObj);
  }
});

router.get("/post", authenticateJWT, async (req, res) => {
  try {
    const { user } = req;
    const data = await searchPost({ author: user._id }, {});

    const respObj = {
      status: "success",
      message: "Post Found!",
      data,
    };

    res.status(200).send(respObj);
  } catch (err) {
    let errObj = {
      status: "error",
      message: "Error",
      error: {
        code: 500,
        details: err.message || "Error Fetcing Post",
      },
    };

    res.status(500).send(errObj);
  }
});

export default router;
