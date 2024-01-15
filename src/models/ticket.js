import mongoose from "mongoose";

const TicketSchema = mongoose.Schema({
  title: { type: String, required: true, min: 3 },
  ticket_price: { type: String, required: true, min: 3 },
  from_location: { type: String, required: true, min: 3 },
  to_location: { type: String, required: true, min: 3 },
  to_location_photo_url: { type: String, required: true, min: 3 },
});

export default mongoose.model("ticket", TicketSchema);
