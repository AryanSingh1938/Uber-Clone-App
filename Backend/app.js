const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb  = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// In Node.js and Express, cookie-parser is middleware that reads cookies sent by the client and makes them accessible through req.cookies.

app.get("/", (req,res) => {
    res.send("Hello World");
});
app.use('/users', userRoutes);

module.exports = app;