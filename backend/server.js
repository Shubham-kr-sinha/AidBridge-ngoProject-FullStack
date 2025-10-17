require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { sequelize } = require('./models');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

// --- CORS Configuration ---
const allowedOrigins = [
    'http://localhost:3000',      // For local development
    process.env.CLIENT_URL        // For your deployed Vercel frontend
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests if the origin is in our list or if there's no origin (e.g., Postman)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('This origin is not allowed by CORS.'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// --- Middleware ---
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '/public')));

// --- API Routes ---
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/donors', require('./routes/donorRoutes'));
app.use('/donations', require('./routes/donationRoutes'));
app.use('/items', require('./routes/itemRoutes'));
app.use('/branches', require('./routes/branchRoutes'));
app.use('/distributions', require('./routes/distriRoutes'));
app.use('/beneficiaries', require('./routes/beneRoutes'));

// --- 404 Not Found Handler ---
app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// --- Global Error Handler ---
app.use(errorHandler);

// --- Vercel Export ---
// This line allows Vercel to use your Express app as a serverless function.
// The traditional app.listen() is removed for this reason.
module.exports = app;
