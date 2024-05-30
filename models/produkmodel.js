const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const produkSchema = new Schema({
  id_produk: {
    type: Number,
    required: true,
    unique: true,
  },
  nama_produk: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
});

const Produk = mongoose.model("Produk", produkSchema);

module.exports = Produk;
