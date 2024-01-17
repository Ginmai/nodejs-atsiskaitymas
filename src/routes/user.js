import express from "express";
import {
  SIGN_UP,
  LOGIN,
  REFRESH_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
} from "../controllers/user.js";

const router = express.Router();

router.post("/users/signUp", SIGN_UP);

router.post("/users/login", LOGIN);

router.post("/getNewJwtToken", REFRESH_TOKEN);

router.get("/users/getAll", GET_ALL_USERS);

router.get("/users/:id", GET_USER_BY_ID);

export default router;
