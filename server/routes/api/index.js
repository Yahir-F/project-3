const router = require('express').Router();
const playerRoutes = require('./playerRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/players', playerRoutes)

module.exports = router;