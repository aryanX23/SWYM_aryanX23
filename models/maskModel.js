const mongoose = require("mongoose");

const maskSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        orgurl: {
            type: String,
            required: true 
        },
        maskedurl: {
            type: String,
            required: true
        },
        clickcount: {
            type: Number,
            required: true
        }
    }
);

const Mask = mongoose.model("Mask", maskSchema);

module.exports = Mask;
