const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post( upload.single("listing[image]"), validateListing, isLoggedIn, wrapAsync(listingController.createNewListing));

//New Route
router.get("/new", isLoggedIn , listingController.renderNew);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, wrapAsync(listingController.deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListing));

module.exports = router;