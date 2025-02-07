const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const usersCollection = db.collection("Users");

  router.get("/getideas", async (req, res) => {
    try {
      const users = await usersCollection.find({}, { projection: { Ideas: 1, _id: 0 } }).toArray();
      const ideas = users.flatMap(user => user.Ideas || []);

      res.json(ideas);
    } catch (error) {
      console.error("Fel vid hämtning av idéer:", error);
      res.status(500).json({ message: "Kunde inte hämta idéer." });
    }
  });

  return router;
};
