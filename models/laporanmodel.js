const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laporanPenjualanSchema = new Schema({
  tanggal: {
    type: Date,
    required: true
  },
  totalPendapatan: {
    type: Number,
    required: true
  }
});

const LaporanPenjualan = mongoose.model("LaporanPenjualan", laporanPenjualanSchema);

module.exports = LaporanPenjualan;
