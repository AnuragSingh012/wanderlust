const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
            set: (v) => v === "" ? "https://a0.muscache.com/im/pictures/b7daad29-eaba-47fe-b7cc-04976dffa1cd.jpg?im_w=1200" : v,
            default: "https://a0.muscache.com/im/pictures/b7daad29-eaba-47fe-b7cc-04976dffa1cd.jpg?im_w=1200",
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;