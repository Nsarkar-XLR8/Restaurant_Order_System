const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Restaurant_DB',
    port: 3306, // Ensure the port matches your MySQL server setup
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1); // Exit process if DB connection fails
    } else {
        console.log('MySQL Connected...');
    }
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database Error!' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        console.log('Login successful for user:', email);
        res.status(200).json({ message: 'Login successful!' });
    });
});

// Signup Endpoint
app.post('/api/signup',(req,res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: 'Username, email and password are required'});
    }

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, password], (err, results) => {
        if(err){
            console.error('Database error:', err);
            return res.status(500).json({message: 'Database Error!'});
        }

        console.log('Signup successful for user:', email);
        res.status(200).json({message: 'Signup successful!'});
    });
})

// Payment Endpoint


app.post('/api/payment', async (req, res) => {
    const { cardName, cardNumber, expiry, cvv } = req.body;

    try {
        // Use Stripe's test card or tokenization to simulate a payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // Amount in cents (e.g., $50.00)
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.status(200).json({
            message: 'Payment successful',
            transactionId: paymentIntent.id,
        });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(400).json({ message: 'Payment failed', error: error.message });
    }
});

// Start Server
export default app;
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
