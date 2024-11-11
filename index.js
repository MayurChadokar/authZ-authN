const express = require("express");

const app = express();

require('dotenv').config();
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
require("./config/database").connect();

// routes

const user = require("./routes/user");

app.use("/api/v1", user);


app.listen(port, () => {
    console.log(`the server is running in ${port}`);

})