const { Player, User } = require('../models');



module.exports = {
    getPlayers(req, res) {
        Player.find()
        .then(async (players) => {
            const playerObj = {
                players,
            };
            return res.json(playerObj);
        })
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
        });
    },
    getSinglePlayer(req, res) {
        Player.findOne({ _id: req.params.playerId })
          .select('-__v')
          .then((player) =>
            !player
              ? res.status(404).json({ message: 'No player with that ID' })
              : res.json(player)
          )
          .catch((err) => res.status(500).json(err));
      },
}