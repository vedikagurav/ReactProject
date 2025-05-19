const mongoose = require('mongoose');

const POSchema = new mongoose.Schema({
  poDate: String,
  supplierName: String,
  itemNo: String,
  itemName: String,
  poQty: Number,
  pendingQty: Number,
  refPoNo: String,
  etaDate: String,
  partReceivingDate: String,
  remark: String
});

const POModel = mongoose.model("PurchaseOrders", POSchema);

module.exports = POModel;
