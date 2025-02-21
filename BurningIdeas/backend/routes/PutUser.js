const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, username, oldPassword, newPassword } = req.body;
    console.log("Received data:", { name, username, oldPassword, newPassword });

    try {
      const response = await axios.get(`${API_URL}/editaccount/${id}`);
      const user = response.data;

      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte." });
      }

      if (oldPassword && oldPassword !== user.password) {
        return res.status(400).json({ message: "Felaktigt gammalt lösenord." });
      }

      const updatedData = {};
      if (name) updatedData.name = name;
      if (username) updatedData.username = username;
      if (newPassword) updatedData.password = newPassword;

      const updateResponse = await axios.patch(
        `${API_URL}/editaccount/${id}`,
        updatedData
      );
      console.log("Azure response:", updateResponse.data);
      if (updateResponse.status === 200) {
        return res.status(200).json({
          message: "Kontouppgifter uppdaterade!",
        });
      } else {
        return res.status(500).json({
          message: "Kunde inte uppdatera kontouppgifter via Azure API.",
        });
      }
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
      return res.status(500).json({
        message: "Ett fel inträffade vid uppdatering av användaren.",
        error: error.message,
      });
    }
  });

  return router;
};
