const express = require("express");
const router = express.Router();
const axios = require("axios");

module.exports = (API_URL, usersCollection) => {
  router.post("/", async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "Alla fält måste fyllas i." });
    }

    try {
      const userExistsResponse = await axios.get(
        `${API_URL}/users/${username}`
      );
      if (userExistsResponse.data) {
        return res.status(400).json({ message: "Användarnamnet är upptaget." });
      }

      const newUser = { name, username, password };
      await usersCollection.insertOne(newUser);

      res
        .status(200)
        .json({ message: "Konto skapat!", user: { name, username } });
    } catch (error) {
      console.error(
        "Fel vid kontoskapande:",
        error.response?.data || error.message
      );
      const statusCode = error.response?.status || 500;
      res.status(statusCode).json({
        message: "Serverfel vid registrering.",
        error: error.response?.data || error.message,
      });
    }
  });

  return router;
};
