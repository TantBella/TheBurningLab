const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const collectionName = "Users";

  router.post("/", async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "Alla fält måste fyllas i." });
    }

    try {
      const usersCollection = db.collection(collectionName);

      const existingUser = await usersCollection.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Användarnamnet är upptaget." });
      }

      const newUser = {
        name,
        username,
        password,
      };

      await usersCollection.insertOne(newUser);
      res
        .status(201)
        .json({ message: "Konto skapat!", user: { name, username } });
    } catch (error) {
      console.error("Fel vid kontoskapande:", error);
      res.status(500).json({ message: "Serverfel vid registrering." });
    }
  });

  return router;
};
