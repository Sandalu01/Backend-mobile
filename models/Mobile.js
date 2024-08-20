const mongoose = require('mongoose');

const MobileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ram: {
        type: Number,
        required: true
    },
    storage: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Mobile', MobileSchema);
