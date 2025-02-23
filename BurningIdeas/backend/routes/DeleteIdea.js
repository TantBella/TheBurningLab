const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.delete("/", async (req, res) => {
    try {
      const response = await axios.delete(`${API_URL}/idea/${ideaId}/delete`);
      if (response.status === 200) {
        console.log(response.data);
      }
      // res.json({ message: "Idén har raderats" });
    } catch (error) {
      console.error("Fel vid radering:", error);
      res.status(500).json({ error: "Internt serverfel" });
    }
  });

  return router;
};
