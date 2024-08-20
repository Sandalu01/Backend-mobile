const express = require('express');
const Mobile = require('../models/Mobile');

const router = express.Router();

// Get all mobiles
router.get('/', async (req, res) => {
    try {
        const mobiles = await Mobile.find();
        res.json(mobiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single mobile
router.get('/:id', async (req, res) => {
    try {
        const mobile = await Mobile.findById(req.params.id);
        if (!mobile) return res.status(404).json({ message: 'Mobile not found' });
        res.json(mobile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a mobile
router.post('/', async (req, res) => {
    const mobile = new Mobile({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        ram: req.body.ram,
        storage: req.body.storage,
        description: req.body.description
    });

    try {
        const newMobile = await mobile.save();
        res.status(201).json(newMobile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a mobile
router.put('/:id', async (req, res) => {
    try {
        const mobile = await Mobile.findById(req.params.id);
        if (!mobile) return res.status(404).json({ message: 'Mobile not found' });

        mobile.name = req.body.name;
        mobile.brand = req.body.brand;
        mobile.price = req.body.price;
        mobile.ram = req.body.ram;
        mobile.storage = req.body.storage;
        mobile.description = req.body.description;

        const updatedMobile = await mobile.save();
        res.json(updatedMobile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a mobile
router.delete('/:id', async (req, res) => {
    try {
        const mobile = await Mobile.findById(req.params.id);
        if (!mobile) return res.status(404).json({ message: 'Mobile not found' });

        await mobile.remove();
        res.json({ message: 'Mobile deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
