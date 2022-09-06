const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const {
  getUsers,
  getSingleUser,
  createUser,
  login,
  saveState
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:userId').get(authMiddleware, getSingleUser).delete();

router.route('/save').post(saveState);

module.exports = router;