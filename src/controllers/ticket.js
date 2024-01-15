import TicketModel from "../models/ticket.js";

const GET_ALL_TICKETS = async (rec, res) => {
  try {
    const tickets = await TicketModel.find();
    return res.status(200).json({ tickets: tickets });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ticket: "something went wrong" });
  }
};

const GET_TICKET_BY_ID = async (req, res) => {
  try {
    const ticket = await TicketModel.findById(req.params.id);
    return res.status(200).json({ ticket: ticket });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ resource: "something went wrong" });
  }
};

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

const UPDATE_TICKET = async (req, res) => {
  try {
    const ticket = await TicketModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({ ticket: ticket });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ticket: "something went wrong" });
  }
};

const DELETE_TICKET_BY_ID = async (req, res) => {
  try {
    const ticket = await TicketModel.findOneAndDelete(req.params.id);
    return res.status(200).json({ ticket: ticket });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ ticket: "something went wrong" });
  }
};

export {
  GET_ALL_TICKETS,
  GET_TICKET_BY_ID,
  INSERT_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET_BY_ID,
};
