const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      if (!userId) {
        return res.status(400).json({ message: "Ogiltigt användar-ID." });
      }

      const response = await axios.get(`${API_URL}/ideas`);
      if (response.status === 200) {
        if (response.data.length === 0) {
          return res
            .status(404)
            .json({ message: "Inga idéer hittades för denna användare." });
        }

        res.json(response.data);
      }
    } catch (error) {
      console.error("Fel vid hämtning av idéer:", error);
      res.status(500).json({
        message: "Ett fel uppstod vid hämtning av idéer.",
      });
    }
  });

  return router;
};
