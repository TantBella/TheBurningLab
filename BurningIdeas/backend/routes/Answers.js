const express = require("express");

module.exports = (db) => {
  const router = express.Router();
  const collectionName = "Answers";

  router.get("/", async (req, res) => {
    try {
      if (!db) {
        return res.status(500).json({ message: "Databasanslutning saknas" });
      }
      const answers = await db.collection(collectionName).find().toArray();
      res.json(answers);
    } catch (error) {
      console.error("Fel vid hämtning av användare:", error);
      res
        .status(500)
        .json({ message: "Kunde inte hämta användare", error: error.message });
    }
  });

  return router;
};
