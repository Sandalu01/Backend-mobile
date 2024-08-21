const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Route to add a product to the cart
router.post('/add', async (req, res) => {
    const { productId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        let cart = await Cart.findOne({});
        if (!cart) {
            cart = new Cart({ products: [], total: 0 });
        }

        cart.products.push(product);
        cart.total += product.price;
        await cart.save();

        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to get the cart
router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne({}).populate('products');
        if (!cart) {
            return res.status(404).send('Cart is empty');
        }
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to process payment and clear the cart
router.post('/checkout', async (req, res) => {
    try {
        let cart = await Cart.findOne({});
        if (!cart || cart.products.length === 0) {
            return res.status(400).send('No items in cart');
        }

        // Here you would integrate with a payment gateway
        // Simulating a successful payment

        cart.products = [];
        cart.total = 0;
        await cart.save();

        res.status(200).send('Payment successful, cart cleared');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
