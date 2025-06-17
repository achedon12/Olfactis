const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/Auth'));
app.use('/api/user', require('./routes/User'));
app.use('/api/category', require('./routes/Category'));
app.use('/api/state', require('./routes/State'));
app.use('/api/item', require('./routes/Item'));
app.use('/api/booking', require('./routes/Booking'));
app.use('/api/loan', require('./routes/Loan'));
app.use('/api/loanHistory', require('./routes/LoanHistory'));
app.use('/api/subscription', require('./routes/Subscription'));

app.listen(process.env.PORT, () => {});

require('./tasks');
