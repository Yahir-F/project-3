const router = require('express').Router();

const {
    getPlayers,
    getSinglePlayer,
    } = require('../../controllers/playerController');
    
  
    router.route('/').get(getPlayers).post();
  
    router.route('/:userId').get(getSinglePlayer).delete();

    module.exports = router;
