const mongoose = require('mongoose');

// ttl means time to live, so we are setting the time to live for the token to be 24 hours, so that after 24 hours the token will be automatically deleted from the database.

const blacklistTokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 86400, // 24 hours in seconds
	},
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);