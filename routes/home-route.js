const express = require('express');
const router = express.Router();
const { homeController } = require('./../controllers');

router.get('/', homeController.showAllRoutes);

module.exports = router;