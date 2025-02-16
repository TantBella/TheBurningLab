const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = express.Router();
  const collectionName = "Ideas";

  router.get("/", async (req, res) => {
    try {
      if (!db) {
        return res.status(500).json({ message: "Databasanslutning saknas" });
      }

      const ideas = await db.collection(collectionName).find().toArray();
      res.json(ideas);
    } catch (error) {
      console.error("Fel vid hämtning av idéer:", error);
      res
        .status(500)
        .json({ message: "Kunde inte hämta idéer", error: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Ogiltigt användar-ID." });
      }

      const userIdObjectId = new ObjectId(id);

      const ideas = await db
        .collection("Ideas")
        .find({ UserId: userIdObjectId })
        .toArray();

      if (ideas.length === 0) {
        return res
          .status(404)
          .json({ message: "Inga idéer hittades för denn användare" });
      }

      res.status(200).json(ideas);
    } catch (error) {
      console.error("Fel vid hämtning:", error);
      res
        .status(500)
        .json({ message: "Ett fel uppstod vid hämtning av idéer." });
    }
  });

  return router;
};
