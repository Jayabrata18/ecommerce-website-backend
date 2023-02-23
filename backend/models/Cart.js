const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    products: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    fulfilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
