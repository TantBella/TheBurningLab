const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = express.Router();

  router.get("/:ideaId", async (req, res) => {
    try {
      const ideaId = new ObjectId(req.params.ideaId);
      const idea = await db.collection("Ideas").findOne({ _id: ideaId });

      if (!idea) {
        return res.status(404).send("Ingen idé hittades");
      }
      res.json(idea);
    } catch (err) {
      console.error("Fel vid hämtning av idé:");
      res.status(500).send("Fel vid hämtning av idé");
    }
  });

  return router;
};
