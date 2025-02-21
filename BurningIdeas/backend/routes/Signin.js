const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const { username, password } = req.body;

      const response = await axios.post(`${API_URL}/signin`, {
        username,
        password,
      });

      if (response.status === 200) {
        const userId = response.data.id;
        const userResponse = await axios.get(`${API_URL}/user/${userId}`);
        res.json({
          message: "Inloggad!",
          user: userResponse.data,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Fel användarnamn eller lösenord" });
      }
    } catch (error) {
      console.error("Fel vid inloggning:", error);

      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res
          .status(500)
          .json({ message: "Kunde inte logga in", error: error.message });
      }
    }
  });

  return router;
};
