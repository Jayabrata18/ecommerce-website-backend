const express = require("express");
const router = express.Router();
const { isEmpty } = require("lodash");
const auth = require("../middleware/authorization");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const carts = await Cart.find({ userId });
    if (isEmpty(carts)) {
      return res.send({ products: [] });
    }
    let retrievedCart;
    carts.forEach((cart) => {
      if (!cart.fulfilled) {
        retrievedCart = cart;
      }
    });
    let products = [];
    let result;
    if (!isEmpty(retrievedCart)) {
      products = retrievedCart.products.map(
        async (product) => await Product.findById({ _id: product })
      );
      products = await Promise.all(products);
      result = { ...retrievedCart.toJSON(), products };
    }
    res.send({ result });
  } catch (err) {
    res.send(500);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const cartId = req.params.id;
    const product = req.body.product;
    const cart = await Cart.update(
      { _id: cartId },
      { $pullAll: { products: [product] } }
    );
    res.send({ cart });
  } catch (err) {
    res.send(500);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    let cart, unfulfiledCart;
    const carts = await Cart.find({ userId });
    const hasValidCarts = carts.reduce((acc, value) => {
      if (!value.fulfilled) {
        unfulfiledCart = value;
      }
      return acc && value.fulfilled;
    }, true);
    if (hasValidCarts) {
      cart = new Cart({ userId, products });
      cart = await cart.save();
    } else {
      const stringProduct = [...unfulfiledCart.products, ...products].map(
        (product) => product.toString()
      );
      const newProducts = Array.from(new Set(stringProduct));
      cart = await Cart.findByIdAndUpdate(
        { _id: unfulfiledCart._id },
        { products: newProducts }
      );
    }
    let value = cart.products.map(async (id) => await Product.findById(id));
    value = await Promise.all(value);
    res.send({ ...cart.toJSON(), products: value });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
