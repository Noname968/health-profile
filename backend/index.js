const express = require('express');
require('dotenv').config
const cors = require('cors')
const mongoconn = require('./db');
const cookieparser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin: ['http://localhost:3000', 'https://health-profile.netlify.app'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieparser());
mongoconn();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/profile", require('./routes/profileroute'));

// listen
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
