const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

module.exports = (db) => {
  const collectionName = "Users";

  router.get("/signup", async (req, res) => {
    try {
      if (!db) {
        return res.status(500).json({ message: "Databasanslutning saknas" });
      }
      const users = await db.collection(collectionName).find().toArray();
      res.json(users);
    } catch (error) {
      console.error("Fel vid hämtning av användare:", error);
      res
        .status(500)
        .json({ message: "Kunde inte hämta användare", error: error.message });
    }
  });

  router.post("/signup", upload.single("profilepicture"), async (req, res) => {
    const { name, username, password } = req.body;
    const profilepicture = req.file ? req.file.filename : null;

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
        profilepicture,
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
