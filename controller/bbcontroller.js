const BahanBaku = require('../models/bbmodel');

const bahanBakuController = {
  // Get all BahanBaku
  getBahanBaku: async (req, res) => {
    try {
      const allBahanBaku = await BahanBaku.find();
      res.status(200).json(allBahanBaku);
    } catch (error) {
      console.error("Error fetching all BahanBaku:", error);
      res.status(500).json({ error: "Failed to fetch BahanBaku." });
    }
  },

  // Get a BahanBaku by id_bahanbaku
  getBahanBakuById: async (req, res) => {
    try {
      const id_bahanbaku = req.params.id;
      const bahanBaku = await BahanBaku.findOne({ id_bahanbaku });
      if (!bahanBaku) {
        return res.status(404).json({ error: "BahanBaku not found." });
      }
      res.status(200).json(bahanBaku);
    } catch (error) {
      console.error("Error fetching BahanBaku by id_bahanbaku:", error);
      res.status(500).json({ error: "Failed to fetch BahanBaku." });
    }
  },

  // Get BahanBaku with isStokReady false
  getBahanBakuWithFalseStokReady: async (req, res) => {
    try {
      const bahanBakuWithFalseStokReady = await BahanBaku.find({ isStokReady: false });
      res.status(200).json(bahanBakuWithFalseStokReady);
    } catch (error) {
      console.error("Error fetching BahanBaku with isStokReady false:", error);
      res.status(500).json({ error: "Failed to fetch BahanBaku." });
    }
  },

  // Create a new BahanBaku
  createBahanBaku: async (req, res) => {
    try {
      const { id_bahanbaku, nama_bb, stok } = req.body;
      const newBahanBaku = new BahanBaku({ id_bahanbaku, nama_bb, stok });
      await newBahanBaku.save();
      res.status(201).json({ message: "BahanBaku created successfully.", data: newBahanBaku });
    } catch (error) {
      console.error("Error creating BahanBaku:", error);
      res.status(500).json({ error: "Failed to create BahanBaku." });
    }
  },

  // Update stok BahanBaku and set isStokReady based on stok value
  updateStokBahanBaku: async (req, res) => {
    try {
      const id_bahanbaku = req.params.id;
      const { stok } = req.body;

      // Find the BahanBaku to be updated
      const bahanBakuToUpdate = await BahanBaku.findOne({ id_bahanbaku });

      if (!bahanBakuToUpdate) {
        return res.status(404).json({ error: "BahanBaku not found." });
      }

      // Update stok BahanBaku
      bahanBakuToUpdate.stok = stok;
      // Set isStokReady based on stok value
      bahanBakuToUpdate.isStokReady = stok > 0;

      // Save the updated BahanBaku
      await bahanBakuToUpdate.save();

      res.status(200).json({ message: "Stok updated successfully.", data: bahanBakuToUpdate });
    } catch (error) {
      console.error("Error updating stok BahanBaku:", error);
      res.status(500).json({ error: "Failed to update stok BahanBaku." });
    }
  }
};

module.exports = bahanBakuController;
