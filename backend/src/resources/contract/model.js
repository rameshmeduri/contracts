const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema(
  {
    user: { type: Schema.Types.Mixed, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    date: { type: Date, required: true }
  },
  { versionKey: false }
);
const Contract = mongoose.model('contract', ContractSchema);

module.exports = Contract;
