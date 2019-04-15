const express = require('express');
const contractRouter = require('../resources/contract/router');
const restRouter = express.Router();

restRouter.use('/contract', contractRouter);

module.exports = restRouter;
