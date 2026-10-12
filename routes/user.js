const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userContrller = require("../controllers/users.js");

router
  .route("/signup")
  .get( userContrller.renderSignupForm)
  .post(wrapAsync(userContrller.signup));

router
  .route("/login")
  .get(userContrller.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userContrller.login,
  );

router.get("/logout", userContrller.logout);

module.exports = router;
