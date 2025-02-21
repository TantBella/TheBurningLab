const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/Ideas`);
      if (response.status === 200) {
        res.json(response.data);
      } else {
        res.status(500).json({ message: "Kunde inte hämta idéer." });
      }
    } catch (error) {
      console.error("Fel vid hämtning av idéer:", error);
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(400).json({ message: "Ogiltigt ID." });
      }

      const response = await axios.get(`${API_URL}/Ideas/${id}`);

      if (response.status === 200) {
        const ideas = response.data;
        if (ideas.length === 0) {
          return res
            .status(404)
            .json({ message: "Inga idéer hittades för denna användare." });
        }
        res.json(ideas);
      }
    } catch (error) {
      console.error("Fel vid hämtning av idéer:", error);
      res.status(500).json({
        message: "Ett fel uppstod vid hämtning av idéer.",
        error: error.message,
      });
    }
  });

  return router;
};
