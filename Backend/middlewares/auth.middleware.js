const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // when cookies, are not found and we prove a toke, we also write Bearer which means, the authetication scheme is being used.
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // ye check ham isliye laga rhe hain ike, when the user logs out, then the token is blacklisted and hence we will not allow the user to access the profile page.
    const isBlacklisted = await userModel.findOne({ token: token });

    if(isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        // here jwt token sirf id ko encode kr rha hain, so after decoding it, we will get the id, hence we are finding by id.

        req.user = user;

        return next();

    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}