require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { sequelize } = require('./models');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;
const cors = require('cors');

// UPDATED CORS Middleware for production
app.use(cors({ 
    credentials: true, 
    origin: [
        'http://localhost:3000',
        'https://aidbridge-frontend.vercel.app', // Replace with your actual Vercel URL
        /\.vercel\.app$/  // Allows any vercel.app subdomain
    ]
}));

// Logger Middleware
app.use(logger);

// JSON Middleware - receive and parse JSON data
app.use(express.json());

// URL Encoded Middleware - receive and parse URL encoded data
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// ADD: Health check endpoint (for deployment monitoring)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'AidBridge Backend is running!',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Routes
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/donors', require('./routes/donorRoutes'));
app.use('/donations', require('./routes/donationRoutes'));
app.use('/items', require('./routes/itemRoutes'));
app.use('/branches', require('./routes/branchRoutes'));
app.use('/distributions', require('./routes/distriRoutes'));
app.use('/beneficiaries', require('./routes/beneRoutes'));

// Handle 404
app.all('/*', (req, res) => {
    if (req.accepts('html'))
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    else if (req.accepts('json'))
        res.json({ message: '404 Not Found' });
    else
        res.type('txt').send('404 Not Found');
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
});
