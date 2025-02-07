const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const ideasCollection = db.collection("Ideas");

  router.get("/ideas", async (req, res) => {
    try {
      if (!db) {
        return res.status(500).json({ message: "Databasanslutning saknas" });
      }
      const ideas = await db.collection(collectionName).find().toArray();
      res.json(ideas);
    } catch (error) {
      console.error("Fel vid hämtning av användare:", error);
      res.status(500).json({ message: "Kunde inte", error: error.message });
    }
  });

  router.post("/ideas", async (req, res) => {
    const { userId, ideaText } = req.body;

    if (!userId || !ideaText) {
      return res.status(400).json({ message: "Alla fält måste fyllas i." });
    }

    try {
      const result = await ideasCollection.updateOne(
        { _id: userId },
        { $push: { Ideas: { ideaText, createdAt: new Date() } } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Användare hittades inte." });
      }

      res.status(201).json({ message: "Idé tillagd!" });
    } catch (error) {
      console.error("Fel vid skapande av idé:", error);
      res.status(500).json({ message: "Serverfel vid registrering av idé." });
    }
  });

  return router;
};
