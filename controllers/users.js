const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res) => {
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    req.flash("success", `Hi, ${newUser.username} Welcome to WanderLust`);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        res.redirect("/listings");
    });
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async(req, res) => {
    let redirectUrl = res.locals.redirectUrl || "/listings";
    req.flash("success", `Hi, ${req.user.username}  Welcome to WanderLust`);
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Logged out Successfully");
        res.redirect("/listings");
    })
}