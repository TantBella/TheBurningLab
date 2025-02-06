const express = require("express");

module.exports = (db) => {
  const router = express.Router();
  const collectionName = "Users";

  router.post("/", async (req, res) => {
    const { username, PassWord } = req.body;

    try {
      if (!db) {
        return res.status(500).json({ message: "Databasanslutning saknas" });
      }

      const user = await db.collection(collectionName).findOne({ username });
      console.log(user.username);

      if (!user) {
        return res.status(401).json({ message: "Användare hittades inte" });
      }

      if (user.PassWord === PassWord) {
        return res.json({ message: "Inloggad!", user });
      } else {
        return res.status(401).json({ message: "Fel lösenord" });
      }
    } catch (error) {
      console.error("Fel vid inloggning:", error);
      res
        .status(500)
        .json({ message: "Kunde inte logga in", error: error.message });
    }
  });

  return router;
};
