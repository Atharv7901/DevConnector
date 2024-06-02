const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// @route POST /api/users
// @desc  Test route
// @access Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter password of 6 characters").isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      // see if the user exists
      let user = await User.findOne({email});
      if (user) {
        return res
          .status(400)
          .json({errors: [{msg: "Account already exists!"}]});
      }

      // get the users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        {expiresIn: 36000},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
