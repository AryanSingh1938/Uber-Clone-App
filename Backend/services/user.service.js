const userModel = require('../models/user.model');

// we are creating this files to interact with th database
module.exports.createUser = async({
    firstname, lastname, email, password
}) => {
    if(!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}