require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { sequelize } = require('./models');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

// --- CORS Configuration ---
const allowedOrigins = [
    'http://localhost:3000',
    process.env.CLIENT_URL
];

const corsOptions = {
    origin: (origin, callback) => {
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

// --- Server Startup with Error Handling ---
const startServer = async () => {
    try {
        // First, try to connect to the database.
        await sequelize.authenticate();
        console.log('Database connection has been established successfully. 🐘');

        // If the connection is successful, start the server.
        app.listen(PORT, () => {
            console.log(`Server is live and listening on port ${PORT}`);
        });
    } catch (error) {
        // If the database connection fails, log the detailed error and exit.
        console.error('--- DATABASE CONNECTION FAILED ---');
        console.error('Unable to connect to the database:', error);
        process.exit(1); // This ensures Render knows the startup failed.
    }
};

// Start the server
startServer();
