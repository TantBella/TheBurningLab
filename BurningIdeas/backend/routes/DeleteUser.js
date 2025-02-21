const express = require("express");
const axios = require("axios");

module.exports = (API_URL) => {
  const router = express.Router();

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
      const response = await axios.get(`${API_URL}/deleteaccount/${id}`);
      const user = response.data;

      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte." });
      }

      if (user.password !== password) {
        console.log("Felaktigt lösenord:", password);
        return res.status(400).json({ message: "Felaktigt lösenord." });
      }

      const deleteResponse = await axios.delete(
        `${API_URL}/deleteaccount/${id}`
      );

      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        return res.status(200).json({ message: "Kontot raderades." });
      } else {
        return res.status(500).json({ message: "Kunde inte radera kontot." });
      }
    } catch (error) {
      console.error("Fel vid radering:", error);
      return res
        .status(500)
        .json({ message: "Ett fel inträffade vid radering." });
    }
  });

  return router;
};
