import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 3 },
  bought_tickets: { type: Array, required: true },
  money_balance: { type: Number, required: true },
});

export default mongoose.model("user", userSchema);
