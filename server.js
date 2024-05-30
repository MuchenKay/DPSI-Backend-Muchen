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

router.post('/register',registerUser.registerUser);
router.post('/login',login.login);
router.post('/pesanan', pesananController.createPesanan);
router.delete('/pesanan/:id', pesananController.deletePesanan);
router.get('/pesanan', pesananController.getAllPesanan);
router.get('/pesanan/filter', pesananController.getPesananByDate);
router.get('/pesanan/:id', pesananController.getPesananById)
router.post('/produk', produkController.addProduk);
router.delete('/produk/:id', produkController.deleteProduk);
router.get('/produk', produkController.getAllProduk);
router.get('/produk/:id',produkController.getProdukById);
router.get('/bahan',bahanBakuController.getBahanBaku);
router.get('/bahan/:id',bahanBakuController.getBahanBakuById);
router.get('/bahanhabis',bahanBakuController.getBahanBakuWithFalseStokReady);
router.post('/bahan',bahanBakuController.createBahanBaku);
router.put('/bahan/update/:id',bahanBakuController.updateStokBahanBaku);
router.get('/laporan',isAuthenticated,isOwner,laporanPenjualanController.getTotalPendapatan);
router.get('/laporan/range',isAuthenticated,isOwner,laporanPenjualanController.getTotalPendapatanByDate);
router.get('/laporan/hari',isAuthenticated,isOwner,laporanPenjualanController.getPendapatanOnDate);
router.get('/biayaoperasional', biayaOperasionalController.getAllBiayaOperasional);
router.get('/biayaoperasional/hari/:date', biayaOperasionalController.getBiayaOperasionalOnDate);
router.get('/biayaoperasional/range', biayaOperasionalController.getBiayaOperasionalByDateRange);
router.get('/biayaoperasional/sum/hari/:date', biayaOperasionalController.getSumBiayaOperasionalOnDate);
router.get('/biayaoperasional/sum/range', biayaOperasionalController.getSumBiayaOperasionalByDateRange);
router.post('/biayaoperasional', biayaOperasionalController.createBiayaOperasional);
router.delete('/biayaoperasional/:id', biayaOperasionalController.deleteBiayaOperasionalById);



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
