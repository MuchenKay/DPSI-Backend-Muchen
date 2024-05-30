// models/biayaoperasional.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const biayaOperasionalSchema = new Schema({
  idtransaksi: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generate an ObjectId
  },
  tanggal: {
    type: Date,
    required: true,
  },
  nama_pengeluaran: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  total_harga_pengeluaran: {
    type: Number,
    required: true,
  }
});

const BiayaOperasional = mongoose.model('BiayaOperasional', biayaOperasionalSchema);

module.exports = BiayaOperasional;
