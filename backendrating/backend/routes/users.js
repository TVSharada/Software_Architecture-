const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email_id = req.body.email_id;
  const password = req.body.password;
  const re_enterpassword = req.body.re_enterpassword;
 

  const { errors, isValid } = validateRegisterInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email_id: req.body.email_id }).then(user => {
    if (user) {
      return res.status(400).json({ email_id: "Email already exists" });
    } else {
      const newUser = new User({
        username,
        firstname,
        lastname,
        email_id,
        password,
        re_enterpassword
      });
      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(() => res.json('User added into the Database!'))
            .catch(err => res.status(400).json('Error: ' + err));
        });
      });
    }
  });

  router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;   
  
    const { errors, isValid } = validateLoginInput(req.body);
    
    if (!isValid) {
      return res.status(401).json(errors);
    }
  
    User.findOne({ username: req.body.username }).then(user => {
      if (!user) {
          return res.status(402).json({ usenname: "Username doesnot exist" });
        }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.username
          };
 
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
    
});

  router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
}); 

router.route('/update').post((req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email_id = req.body.email_id;
  const password = req.body.password;
  const re_enterpassword = req.body.re_enterpassword;

  const { errors, isValid } = validateRegisterInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
        const newUser = new User({
          username,
          firstname,
          lastname,
          email_id,
          password,
          re_enterpassword
        });    
              
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(() => res.json('User updated into the Database!'))
            .catch(err => res.status(400).json('Error: ' + err));
      });
    });
  }
  });
});


module.exports = router;