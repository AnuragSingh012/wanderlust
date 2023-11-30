const listing = require('./models/listing.js');
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    // result return a object with a key error if error occured
    let { error } = listingSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    // result return a object with a key error if error occured
    let { error } = reviewSchema.validate(req.body);
    if(error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

module.exports.isOwner = async(req, res, next) => {
    const Listing = await listing.findById(id);
    if(!Listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You dont have permission to Edit/Delete this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You dont have permission to Delete this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}