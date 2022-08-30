const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    playerID: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid Email!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    }
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
