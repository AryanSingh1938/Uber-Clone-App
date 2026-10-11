const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller')

// hame user se jo data mil rha hai, usko validate karne ke liye we use express validator.

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be 3 ccharacters long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
],
    userController.registerUser
)
module.exports = router;