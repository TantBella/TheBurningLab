const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = require("express").Router();

  router.delete("/:ideaId", async (req, res) => {
    try {
      const ideaId = req.params.ideaId;

      if (!ObjectId.isValid(ideaId)) {
        return res.status(400).json({ error: "Ogiltigt ID-format" });
      }

      const objectId = new ObjectId(ideaId);

      const idea = await db.collection("Ideas").findOne({ _id: objectId });
      if (!idea) {
        return res.status(404).json({ error: "Idén hittades inte" });
      }

      await db.collection("Ideas").deleteOne({ _id: objectId });

      res.json({ message: "Idén har raderats" });
    } catch (error) {
      console.error("Fel vid radering:", error);
      res.status(500).json({ error: "Internt serverfel" });
    }
  });

  return router;
};
