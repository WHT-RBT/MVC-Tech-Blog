const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const loginRoutes = require('./loginRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/dashboard', dashboardRoutes);

router.use('/api', apiRoutes);

module.exports = router;