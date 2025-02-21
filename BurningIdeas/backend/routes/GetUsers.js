const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      res.json(response.data);
    } catch (error) {
      console.error("Fel vid hämtning av användare:", error);
      res.status(500).json({
        message: "Kunde inte hämta användare",
        error: error.message,
      });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({
        message: "Fel vid hämtning av användare.",
        error: error.message,
      });
    }
  });

  return router;
};
