const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

// hame user se jo data mil rha hai, usko validate karne ke liye we use express validator.

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be 3 ccharacters long'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long')
],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser ,userController.getUserProfile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;