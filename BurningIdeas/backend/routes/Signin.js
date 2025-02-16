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

      if (!user) {
        return res.status(401).json({ message: "Användare hittades inte" });
      }

      if (user.PassWord === PassWord) {
        res.json({
          message: "Inloggad!",
          userId: user._id,
          name: user.name,
          username: user.username,
          password: user.password,
        });
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
