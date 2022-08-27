const { Player, User } = require('../models');


const playerCount = async () => 
Player.aggregate()
.then((numberOfPlayers) => numberOfPlayers)

module.exports = {
    getPlayers(req, res) {
        Player.find()
        .then(async (players) => {
            const playerObj = {
                players,
                playerCount: await playerCount(),
            };
            return res.json('user:' + playerObj);
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
            !course
              ? res.status(404).json({ message: 'No player witht that ID' })
              : res.json(player)
          )
          .catch((err) => res.status(500).json(err));
      },
}