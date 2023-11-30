const Review = require("../models/review.js");
const listing = require('../models/listing');

module.exports.createReview = async (req, res) => {
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    Listing.reviews.push(newReview);
    newReview.author = req.user._id;
    await newReview.save();
    await Listing.save();
    res.redirect(`/listings/${Listing._id}`);
}

module.exports.deleteReview = async (req,res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}