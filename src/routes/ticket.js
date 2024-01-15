import express from "express";
import { INSERT_TICKET } from "../controllers/ticket.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/insert_ticket", auth, INSERT_TICKET);

export default router;
