const router = require('express').Router();
const apiRoutes = require('./api');
const HomepageRoutes = require('./homepageRoutes');

router.use('/api', apiRoutes);
router.use('/', HomepageRoutes);

module.exports = router;
