const Pesanan = require('../models/pesananmodel');
const LaporanPenjualan = require('../models/laporanmodel');

const laporanPenjualanController = {
  // Function to get total pendapatan (sum from total_harga on pesanan model)
  getTotalPendapatan: async (req, res) => {
    try {
      const allPesanan = await Pesanan.find();
      let totalPendapatan = 0;
      allPesanan.forEach((pesanan) => {
        totalPendapatan += pesanan.total_harga;
      });
      res.status(200).json({ totalPendapatan });
    } catch (error) {
      console.error("Error fetching total pendapatan:", error);
      res.status(500).json({ error: "Failed to fetch total pendapatan." });
    }
  },

  // Function to get total pendapatan (sum from total_harga on pesanan by date)
  getTotalPendapatanByDate: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const pesananByDate = await Pesanan.find({ tanggal_pemesanan: { $gte: start, $lte: end } });
      let totalPendapatan = 0;
      pesananByDate.forEach((pesanan) => {
        totalPendapatan += pesanan.total_harga;
      });
      res.status(200).json({ totalPendapatan });
    } catch (error) {
      console.error("Error fetching total pendapatan by date:", error);
      res.status(500).json({ error: "Failed to fetch total pendapatan by date." });
    }
  },

  // Function to get total pendapatan on a specific date
  getPendapatanOnDate: async (req, res) => {
    try {
      const { date } = req.query;
      const targetDate = new Date(date);
      const pesananOnDate = await Pesanan.find({ tanggal_pemesanan: targetDate });
      let totalPendapatan = 0;
      pesananOnDate.forEach((pesanan) => {
        totalPendapatan += pesanan.total_harga;
      });
      res.status(200).json({ totalPendapatan });
    } catch (error) {
      console.error("Error fetching pendapatan on date:", error);
      res.status(500).json({ error: "Failed to fetch pendapatan on date." });
    }
  }
};

module.exports = laporanPenjualanController;
