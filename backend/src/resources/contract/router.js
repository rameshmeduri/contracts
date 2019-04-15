const express = require('express');
const generateControllers = require('../../util/query');
const Contract = require('./model');

const contractCtrl = generateControllers(Contract);
const contractRouter = express.Router();

contractRouter
  .route('/')
  .get(contractCtrl.getAll)
  .post(contractCtrl.createOne);

contractRouter
  .route('/:id')
  .get(contractCtrl.getOne)
  .put(contractCtrl.updateOne)
  .delete(contractCtrl.deleteOne);

module.exports = contractRouter;
