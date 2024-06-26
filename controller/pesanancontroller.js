const Produk = require('../models/produkmodel');
const {Pesanan, StatusPesanan } = require('../models/pesananmodel');

const pesananController = {
  // Create a new Pesanan
  createPesanan: async (req, res) => {
    try {
      const { id_pesanan, tanggal_pemesanan, status_pesanan, jumlah_barang, total_harga, nama_pembeli, produk } = req.body;

      // Check if status_pesanan is valid
      if (!Object.values(StatusPesanan).includes(status_pesanan)) {
        return res.status(400).json({ error: 'Invalid status_pesanan' });
      }
  
      // Check if the referenced produk exists
      const existingProduks = await Produk.find({ id_produk: { $in: produk } });
      if (existingProduks.length !== produk.length) {
        return res.status(400).json({ error: 'One or more Produk not found' });
      }
  
      const newPesanan = new Pesanan({
        id_pesanan,
        tanggal_pemesanan,
        status_pesanan,
        jumlah_barang,
        total_harga,
        nama_pembeli,
        produk: existingProduks.map(prod => prod.id_produk), // Reference to the id_produk of Produk
      });
  
      await newPesanan.save();
      res.json({ message: 'Pesanan created successfully', pesanan: newPesanan });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  // Delete a Pesanan by id_pesanan
  deletePesanan: async (req, res) => {
    try {
      const id_pesanan = req.params.id;

      // Find the Pesanan to be deleted
      const pesananToDelete = await Pesanan.findOne({ id_pesanan });

      if (!pesananToDelete) {
        return res.status(404).json({ error: "Pesanan not found." });
      }

      // Delete the Pesanan
      await Pesanan.deleteOne({ id_pesanan });

      res.status(200).json({ message: "Pesanan deleted successfully.", data: pesananToDelete });
    } catch (error) {
      console.error("Error deleting Pesanan:", error);
      res.status(500).json({ error: "Failed to delete Pesanan." });
    }
  },

  // Get all Pesanan
  getAllPesanan: async (req, res) => {
    try {
      const allPesanan = await Pesanan.find();

      res.status(200).json(allPesanan);
    } catch (error) {
      console.error("Error fetching all Pesanan:", error);
      res.status(500).json({ error: "Failed to fetch Pesanan." });
    }
  },

  // Get all Pesanan filtered by date
  getPesananByDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Parse startDate and endDate to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Get Pesanan within the date range
      const pesananByDate = await Pesanan.find({ tanggal_pemesanan: { $gte: start, $lte: end } });

      res.status(200).json(pesananByDate);
    } catch (error) {
      console.error("Error fetching Pesanan by date:", error);
      res.status(500).json({ error: "Failed to fetch Pesanan by date." });
    }
  },

  // Get a Pesanan by id_pesanan
  getPesananById: async (req, res) => {
    try {
      const id_pesanan = req.params.id;

      // Find the Pesanan by id_pesanan
      const pesanan = await Pesanan.findOne({ id_pesanan });

      if (!pesanan) {
        return res.status(404).json({ error: "Pesanan not found." });
      }

      res.status(200).json(pesanan);
    } catch (error) {
      console.error("Error fetching Pesanan by id_pesanan:", error);
      res.status(500).json({ error: "Failed to fetch Pesanan." });
    }
  },

  getPesananByStatus: async (req, res) => {
    try {
      const { status } = req.query;

      // Check if the status is valid
      if (!Object.values(StatusPesanan).includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      // Find Pesanan by status
      const pesananByStatus = await Pesanan.find({ status_pesanan: status });

      res.status(200).json(pesananByStatus);
    } catch (error) {
      console.error("Error fetching Pesanan by status:", error);
      res.status(500).json({ error: "Failed to fetch Pesanan by status." });
    }
  }
};

module.exports = pesananController;
