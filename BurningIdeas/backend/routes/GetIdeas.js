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

  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    console.log("Söker efter idéer för userId:", userId);

    try {
      const ideas = await db
        // .collection("Ideas")
        // .find({ UserId: userId }, { projection: { IdeaTitle: 1, IdeaText: 1 } })
        // .toArray();
        .collection("Ideas")
        .find({ UserId: userId })
        .toArray();

      console.log("Hittade idéer:", ideas);

      if (ideas.length === 0) {
        return res
          .status(404)
          .json({ message: "Inga idéer hittades för detta användar-ID." });
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
