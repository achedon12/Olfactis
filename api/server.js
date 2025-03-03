const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// api for bouquet
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});