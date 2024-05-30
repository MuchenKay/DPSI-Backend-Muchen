const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pesananSchema = new Schema({
  id_pesanan: {
    type: Number,
    required: true,
    unique: true,
  },
  tanggal_pemesanan: {
    type: Date,
    required: true,
  },
  status_pesanan: {
    type: String,
    required: true,
  },
  jumlah_barang: {
    type: Number,
    required: true,
  },
  total_harga: {
    type: Number,
    required: true,
  },
  nama_pembeli: {
    type: String,
    required: true,
  },
  produk: [{
    type: Schema.Types.Number,
    ref: "Produk",
  }],
});

const Pesanan = mongoose.model("Pesanan", pesananSchema);

module.exports = Pesanan;
