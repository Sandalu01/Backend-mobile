const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mobileRoutes = require('./routes/mobileRoutes'); //import path from routers
const bcrypt = require('bcryptjs'); // Import bcryptjs
const userRoutes = require('./routes/userRoutes'); // import path from routers
const cors = require('cors'); // Import cors
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');




dotenv.config();

const app = express();
const PORT =  4434;

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB sandalu 🥰');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Routes
app.use('/api/mobiles', mobileRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Mobile Sell API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
