const listing = require('../models/listing.js');

module.exports.index = async (req, res) => {
    const allListings = await listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.renderNew = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const Listing = await listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    })
    .populate("owner");
    if(!Listing) {
        req.flash("error", "Listing you are trying to access does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { Listing });
}

module.exports.createNewListing = async (req,res) => {
    let newListings = new listing(req.body.listing);
    newListings.owner = req.user._id;
    await newListings.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}

module.exports.editListing = async (req, res) => {
    let {id} = req.params;
    const Listing = await listing.findById(id);
    if(!Listing) {
        req.flash("error", "Listing you are trying to access does not exist!");
        res.redirect("/listings");
    } else {
        req.flash("success", "Listing edited Successfully");
        res.render("listings/edit.ejs", {Listing});
    }
}

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.Listing});
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}