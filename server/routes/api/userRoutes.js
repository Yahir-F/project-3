const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth')

const {
  getUsers,
  getSingleUser,
  createUser,
  login,
  } = require('../../controllers/userController');
  

  router.route('/').get(getUsers).post(createUser);

  router.route('/login').post(login);

  router.route('/:userId').get(getSingleUser).delete();

  module.exports = router;