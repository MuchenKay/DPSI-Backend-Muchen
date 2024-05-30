const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;

// Replace <password> with your actual password
const uri = "mongodb+srv://Muchenkay:muchenbe@cluster0.i05feyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const { isAuthenticated, isOwner } = require("./middleware/authmiddleware");

const pesananController = require('./controller/pesanancontroller');
const produkController = require('./controller/produkcontroller');
const bahanBakuController = require('./controller/bbcontroller');
const laporanPenjualanController = require("./controller/laporancontroller");
const biayaOperasionalController = require('./controller/biayaoperasionalcontroller');
const login = require("./controller/usercontroller");
const registerUser = require('./controller/usercontroller');

const router = express.Router();

router.post('/register',registerUser.registerUser); //register
router.post('/login',login.login); //login
router.post('/pesanan', pesananController.createPesanan); //buat pesanan 
router.delete('/pesanan/:id', pesananController.deletePesanan); //hapus pesanan
router.get('/pesanan', pesananController.getAllPesanan); //get pesanan
router.get('/pesanan/filter', pesananController.getPesananByDate); //get pesanan filter tanggal
router.get('/pesanan/:id', pesananController.getPesananById); //get pesanan by id
router.get('/pesanan-status',pesananController.getPesananByStatus); //get status produksi/pesanan
router.post('/produk', produkController.addProduk); //buat produk
router.delete('/produk/:id', produkController.deleteProduk); //hapus produk
router.get('/produk', produkController.getAllProduk); //get produk
router.get('/produk/:id',produkController.getProdukById); //get produk by id
router.get('/bahan',bahanBakuController.getBahanBaku); //get bahanbaku
router.get('/bahan/:id',bahanBakuController.getBahanBakuById); //get bahanbaku by id
router.get('/bahanhabis',bahanBakuController.getBahanBakuWithFalseStokReady); //get bahan baku yang habis
router.post('/bahan',bahanBakuController.createBahanBaku); //buat bahanbaku
router.put('/bahan/update/:id',bahanBakuController.updateStokBahanBaku); //update stok bahan baku
router.get('/laporan',isAuthenticated,isOwner,laporanPenjualanController.getTotalPendapatan); //menampilkan total pendapatan
router.get('/laporan/date-range',isAuthenticated,isOwner,laporanPenjualanController.getLaporanByDateRange); //membuat laporan dengan range tanggal a - b
router.get('/laporan/date',isAuthenticated,isOwner,laporanPenjualanController.getLaporanByDate); // membuat laporan di tanggal a
router.get('/biayaoperasional', biayaOperasionalController.getAllBiayaOperasional); //get biaya operasional
router.get('/biayaoperasional/hari/:date', biayaOperasionalController.getBiayaOperasionalOnDate); //get biaya operasional pada tanggal a
router.get('/biayaoperasional/range', biayaOperasionalController.getBiayaOperasionalByDateRange); //get biaya operasional pada range tanggal a - b
router.get('/biayaoperasional/sum/hari/:date', biayaOperasionalController.getSumBiayaOperasionalOnDate); //get total biaya operasional pada tanggal a
router.get('/biayaoperasional/sum/range', biayaOperasionalController.getSumBiayaOperasionalByDateRange); //get total biaya operasional pada range tanggal a - b
router.post('/biayaoperasional', biayaOperasionalController.createBiayaOperasional); //buat biaya operasional
router.delete('/biayaoperasional/:id', biayaOperasionalController.deleteBiayaOperasionalById); // hapus biaya operasional

// Mount the router under the /v1 prefix
app.use('/v1', router);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
