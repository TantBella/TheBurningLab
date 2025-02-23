const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.get("/:ideaId", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/idea/${id}`);
      if (response.status === 200) {
        console.log(response.data);
        if (response.data.length === 0) {
          return res
            .status(404)
            .json({ message: "Inga idéer hittades för denna användare." });
        }
      }

      res.json(response.data);
    } catch (err) {
      console.error("Fel vid hämtning av idé:");
      res.status(500).send("Fel vid hämtning av idé");
    }
  });

  return router;
};
