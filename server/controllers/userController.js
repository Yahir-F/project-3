const { User, Player } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(400).json({ message: 'Cannot find users' });
      }
      return res.json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.user ? req.user._id : req.body._id });
      if (!user) {
        return res.status(400).json({ message: 'Cannot find user with given id' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      if (!user) {
        return res.status(400).json({ message: 'Unable to create user' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json({ message: 'Unable to find user with that username' });
      }

      const isCorrectPassword = await user.isCorrectPassword(req.body.password);
      if (!isCorrectPassword) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
      const token = signToken(user);
      res.json({ token, user });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async saveState(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user ? req.user._id : req.body._id },
        {$set: {saveState: req.body.saveState}},
        {new: true}
      );
      if(!user) {
        return res.status(400).json({ message: 'Unable to save data' });
      }
      res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
