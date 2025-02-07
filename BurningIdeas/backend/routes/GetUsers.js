const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = express.Router();
  const collectionName = "Users";

  router.get("/", async (req, res) => {
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

  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await db.collection(collectionName).findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte." });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Fel vid hämtning av användare.",
        error: error.message,
      });
    }
  });

  return router;
};
