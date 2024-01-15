import TicketModel from "../models/ticket.js";

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
    return res.status(500).json({ resource: "something went wrong" });
  }
};

export { INSERT_TICKET };
