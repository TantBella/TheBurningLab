const express = require("express");
// const { ObjectId } = require("mongodb");

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

  return router;
};
