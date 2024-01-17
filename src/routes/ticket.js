import express from "express";
import { INSERT_TICKET, BUY_TICKET } from "../controllers/ticket.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/insertTicket", auth, INSERT_TICKET);

router.post("/buyTicket", auth, BUY_TICKET);

export default router;
