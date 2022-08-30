const { Schema, model } = require('mongoose');

const weaponSchema = new Schema({
    damage: {
        type: Number,
        min: 1,
    },
    name: {
        type: String,
    },
});

const playerSchema = new Schema({
    health: {
        type: Number,
        min: 1,
    },
    experience: {
        type: Number,
        min: 0,
    },
    level: {
        type: Number,
        min: 0,
    },
    coins: {
        type: Number,
        min: 0,
    },
    weapons: [weaponSchema],
});

const Player = model('Player', playerSchema);

module.exports = Player;
