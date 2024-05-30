const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definisikan enum untuk status pesanan
const StatusPesanan = Object.freeze({
  DIBUAT: "dibuat",
  DIPROSES: "diproses",
  DIKIRIM: "dikirim",
  GAGAL: "gagal",
  SELESAI: "selesai"
});

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
    enum: Object.values(StatusPesanan),
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
    type: Number, // Reference to id_produk in Produk model
    ref: "Produk",
    required: true,
  }],
});

// Membekukan StatusPesanan untuk mencegah modifikasi
Object.freeze(StatusPesanan);

const Pesanan = mongoose.model("Pesanan", pesananSchema);

module.exports = { Pesanan, StatusPesanan };
