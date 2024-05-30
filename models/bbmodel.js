const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bahanBakuSchema = new Schema({
  id_bahanbaku: {
    type: Number,
    required: true,
    unique: true
  },
  nama_bb: {
    type: String,
    required: true
  },
  stok: {
    type: Number,
    required: true,
    default: 0
  },
  isStokReady: {
    type: Boolean,
    default: false
  }
});

// Add a pre-save hook to automatically set isStockReady based on stok value
bahanBakuSchema.pre('save', function(next) {
  this.isStokReady = this.stok > 0;
  next();
});

const BahanBaku = mongoose.model("BahanBaku", bahanBakuSchema);

module.exports = BahanBaku;
