const LaporanPenjualan = require('../models/laporanmodel');
const {Pesanan, StatusPesanan } = require('../models/pesananmodel');

const laporanPenjualanController = {
  // Function to get laporan penjualan by date
  getLaporanByDate: async (req, res) => {
    try {
      const { date } = req.query;
      const targetDate = new Date(date);

      if (isNaN(targetDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }

      // Normalize the date to ignore the time part
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      // Fetch laporan for the specified date
      const laporan = await LaporanPenjualan.findOne({ 
        tanggal: { $gte: startOfDay, $lte: endOfDay }
      });

      if (laporan) {
        // Fetch pesanan within the date range of the specified day
        const pesananOnDate = await Pesanan.find({ 
          tanggal_pemesanan: { $gte: startOfDay, $lte: endOfDay }
        });

        // Validate the status_pesanan values
        pesananOnDate.forEach(pesanan => {
          if (!Object.values(StatusPesanan).includes(pesanan.status_pesanan)) {
            return res.status(500).json({ error: `Invalid status_pesanan found: ${pesanan.status_pesanan}` });
          }
        });

        return res.status(200).json({ laporan, pesananOnDate });
      } else {
        return res.status(404).json({ message: "Laporan not found for the specified date." });
      }
    } catch (error) {
      console.error("Error fetching laporan penjualan by date:", error);
      return res.status(500).json({ error: "Failed to fetch laporan penjualan by date." });
    }
  },

  // Function to get laporan penjualan within a date range
  getLaporanByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Validate start and end dates
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD." });
      }

      // Find laporan penjualan within the date range
      const laporanInRange = await LaporanPenjualan.find({ tanggal: { $gte: start, $lte: end } });

      // Find pesanan within the date range
      const pesananInRange = await Pesanan.find({ tanggal_pemesanan: { $gte: start, $lte: end } });

      // Validate the status_pesanan values
      pesananInRange.forEach(pesanan => {
        if (!Object.values(StatusPesanan).includes(pesanan.status_pesanan)) {
          return res.status(500).json({ error: `Invalid status_pesanan found: ${pesanan.status_pesanan}` });
        }
      });

      return res.status(200).json({ laporanInRange, pesananInRange });
    } catch (error) {
      console.error("Error fetching laporan penjualan by date range:", error);
      return res.status(500).json({ error: "Failed to fetch laporan penjualan by date range." });
    }
  },

  // Function to get total pendapatan from all laporan penjualan
  getTotalPendapatan: async (req, res) => {
    try {
      const allLaporan = await LaporanPenjualan.find();
      let totalPendapatan = 0;
      allLaporan.forEach((laporan) => {
        totalPendapatan += laporan.totalPendapatan;
      });
      res.status(200).json({ totalPendapatan });
    } catch (error) {
      console.error("Error fetching total pendapatan:", error);
      res.status(500).json({ error: "Failed to fetch total pendapatan." });
    }
  }
};

module.exports = laporanPenjualanController;
