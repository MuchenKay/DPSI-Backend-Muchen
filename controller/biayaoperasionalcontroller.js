// controller/biayaoperasionalcontroller.js

const BiayaOperasional = require('../models/biayaoperasionalmodel');

// Get all BiayaOperasional
const getAllBiayaOperasional = async (req, res) => {
  try {
    const biayaOperasional = await BiayaOperasional.find();
    res.json(biayaOperasional);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get BiayaOperasional on a specific date
const getBiayaOperasionalOnDate = async (req, res) => {
  try {
    const { date } = req.params;
    const biayaOperasional = await BiayaOperasional.find({ tanggal: new Date(date) });
    res.json(biayaOperasional);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get BiayaOperasional within a date range
const getBiayaOperasionalByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    const biayaOperasional = await BiayaOperasional.find({
      tanggal: { $gte: new Date(start), $lte: new Date(end) }
    });
    res.json(biayaOperasional);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get sum of total_harga_pengeluaran on a specific date
const getSumBiayaOperasionalOnDate = async (req, res) => {
  try {
    const { date } = req.params;
    const result = await BiayaOperasional.aggregate([
      { $match: { tanggal: new Date(date) } },
      { $group: { _id: null, total: { $sum: "$total_harga_pengeluaran" } } }
    ]);
    res.json(result[0] ? result[0].total : 0);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get sum of total_harga_pengeluaran within a date range
const getSumBiayaOperasionalByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    const result = await BiayaOperasional.aggregate([
      { $match: { tanggal: { $gte: new Date(start), $lte: new Date(end) } } },
      { $group: { _id: null, total: { $sum: "$total_harga_pengeluaran" } } }
    ]);
    res.json(result[0] ? result[0].total : 0);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new BiayaOperasional
const createBiayaOperasional = async (req, res) => {
  try {
    const { tanggal, nama_pengeluaran, deskripsi, total_harga_pengeluaran } = req.body;
    const newBiayaOperasional = new BiayaOperasional({
      tanggal,
      nama_pengeluaran,
      deskripsi,
      total_harga_pengeluaran
    });

    await newBiayaOperasional.save();
    res.json({ message: 'Biaya operasional created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete BiayaOperasional by id
const deleteBiayaOperasionalById = async (req, res) => {
  try {
    const { id } = req.params;
    await BiayaOperasional.findByIdAndDelete(id);
    res.json({ message: 'Biaya operasional deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllBiayaOperasional,
  getBiayaOperasionalOnDate,
  getBiayaOperasionalByDateRange,
  getSumBiayaOperasionalOnDate,
  getSumBiayaOperasionalByDateRange,
  createBiayaOperasional,
  deleteBiayaOperasionalById
};
