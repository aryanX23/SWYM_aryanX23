const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require('./middleware/mongoose');
const app = express();
const maskRoutes = require('./routes/maskRoutes');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);

app.use('/api/masker', maskRoutes);

connectMongoDB(process.env.MONGO_URI || "")
    .then((result) => {
        const server = app.listen(port, () => {
            console.log(
                "Server is successfully running on port " + port + " !!"
            );
        });
}).catch(console.log);