import express from "express";
import {
  GET_ALL_TICKETS,
  GET_TICKET_BY_ID,
  INSERT_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET_BY_ID,
} from "../controllers/ticket.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/tickets", GET_ALL_TICKETS);

router.get("/tickets/:id", GET_TICKET_BY_ID);

router.post("/tickets", INSERT_TICKET);

router.put("/tickets/:id", UPDATE_TICKET);

router.delete("/tickets/:id", DELETE_TICKET_BY_ID);

export default router;
