const express = require('express');
const passport = require('passport');
const router = express.Router();

const googleAuthUser = require('../models/GoogleAuthModel');


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
   (req, res) => {
    const id = req.user._id;
    googleAuthUser.findById(id)
    .then(result=>{
      res.redirect(`/home`);
    })
  }
);



module.exports = router;