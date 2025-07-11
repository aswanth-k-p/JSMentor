 // server/routes/auth.js
 const express = require('express');
 const router = express.Router();
 const { check, validationResult } = require('express-validator');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 const auth = require('../middleware/auth');
 const User = require('../models/User');
 require('dotenv').config();
 
 // @route   GET api/auth
 // @desc    Get logged in user
 // @access  Private
 router.get('/', auth, async (req, res) => {
   try {
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
   }
 });
 
 // @route   POST api/auth
 // @desc    Authenticate user & get token (Login)
 // @access  Public
 router.post(
   '/',
   [
     check('email', 'Please include a valid email').isEmail(),
     check('password', 'Password is required').exists()
   ],
   async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
 
     const { email, password } = req.body;
 
     try {
       // Check if user exists
       let user = await User.findOne({ email });
       if (!user) {
         return res.status(400).json({ msg: 'Invalid Credentials' });
       }
 
       // Compare passwords
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return res.status(400).json({ msg: 'Invalid Credentials' });
       }
 
       // Create JWT payload
       const payload = {
         user: {
           id: user.id
         }
       };
 
       // Sign token
       jwt.sign(
         payload,
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRE },
         (err, token) => {
           if (err) throw err;
           res.json({ token });
         }
       );
     } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
     }
   }
 );
 
 module.exports = router;