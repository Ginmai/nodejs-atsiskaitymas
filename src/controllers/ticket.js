import TicketModel from "../models/ticket.js";
import UserModel from "../models/user.js";

const INSERT_TICKET = async (req, res) => {
  try {
    const ticket = new TicketModel({
      title: req.body.title,
      ticket_price: req.body.ticket_price,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      to_location_photo_url: req.body.to_location_photo_url,
    });

    const response = await ticket.save();

    return res
      .status(201)
      .json({ message: "Ticket was added", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const BUY_TICKET = async (req, res) => {
  try {
    let user = await UserModel.findById(req.body.user_id);
    const ticket = await TicketModel.findById(req.body.ticket_id);

    if (!user || !ticket) {
      return res.status(404).json({ message: "user or ticket not found" });
    }

    if (user.money_balance < ticket.ticket_price) {
      return res.status(404).json({ message: "user do not have enough money" });
    }

    user.bought_tickets.push(ticket._id);
    user.money_balance -= ticket.ticket_price;

    const response = await user.save();
    console.log(response);

    return res.status(200).json({ message: "Purchase successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export { INSERT_TICKET, BUY_TICKET };
