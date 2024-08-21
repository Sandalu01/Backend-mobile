const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Cart', CartSchema);
