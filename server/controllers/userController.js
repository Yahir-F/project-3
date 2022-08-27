const { User, Player } = require('../models');


const userCount = async () => 
User.aggregate()
.then((numberOfUsers) => numberOfUsers)


module.exports = {
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                userCount: await userCount(),
            };
            return res.json('user:' + userObj);
        })
        .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
        });
    },

getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No User with given id' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
}
