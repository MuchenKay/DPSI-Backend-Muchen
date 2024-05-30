const Produk = require('../models/produkmodel');

const produkController = {
  // Add a new Produk
  addProduk: async (req, res) => {
    try {
      const { id_produk, nama_produk, deskripsi, harga } = req.body;
      
      // Check if Produk with the given id_produk already exists
      const existingProduk = await Produk.findOne({ id_produk });
      if (existingProduk) {
        return res.status(400).json({ error: "Produk with this id_produk already exists." });
      }

      // Create a new Produk instance
      const newProduk = new Produk({ id_produk, nama_produk, deskripsi, harga });

      // Save the new Produk to the database
      await newProduk.save();

      res.status(201).json({ message: "Produk added successfully.", data: newProduk });
    } catch (error) {
      console.error("Error adding Produk:", error);
      res.status(500).json({ error: "Failed to add Produk." });
    }
  },

  // Delete a Produk by id_produk
  deleteProduk: async (req, res) => {
    try {
      const id_produk = req.params.id;

      // Find the Produk to be deleted
      const produkToDelete = await Produk.findOne({ id_produk });

      if (!produkToDelete) {
        return res.status(404).json({ error: "Produk not found." });
      }

      // Delete the Produk
      await Produk.deleteOne({ id_produk });

      res.status(200).json({ message: "Produk deleted successfully.", data: produkToDelete });
    } catch (error) {
      console.error("Error deleting Produk:", error);
      res.status(500).json({ error: "Failed to delete Produk." });
    }
  },

  // Get all Produk
  getAllProduk: async (req, res) => {
    try {
      const allProduk = await Produk.find();

      res.status(200).json(allProduk);
    } catch (error) {
      console.error("Error fetching all Produk:", error);
      res.status(500).json({ error: "Failed to fetch Produk." });
    }
  },

  // Get a Produk by id_produk
  getProdukById: async (req, res) => {
    try {
      const id_produk = req.params.id;

      // Find the Produk by id_produk
      const produk = await Produk.findOne({ id_produk });

      if (!produk) {
        return res.status(404).json({ error: "Produk not found." });
      }

      res.status(200).json(produk);
    } catch (error) {
      console.error("Error fetching Produk by id_produk:", error);
      res.status(500).json({ error: "Failed to fetch Produk." });
    }
  }
};

module.exports = produkController;
