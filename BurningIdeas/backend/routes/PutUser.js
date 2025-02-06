const express = require("express");
const multer = require("multer");
const { ObjectId } = require("mongodb");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

module.exports = (db) => {
  const collectionName = "Users";

  // router.get("/editaccount", async (req, res) => {
  //   try {
  //     if (!db) {
  //       return res.status(500).json({ message: "Databasanslutning saknas" });
  //     }
  //     const users = await db.collection(collectionName).find().toArray();
  //     res.json(users);
  //   } catch (error) {
  //     console.error("Fel vid hämtning av användare:", error);
  //     res
  //       .status(500)
  //       .json({ message: "Kunde inte hämta användare", error: error.message });
  //   }
  // });

  router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, username, password, profilePicture } = req.body;

  try {
    const result = await db
      .collection(collectionName)
      .updateOne(
        { _id: ObjectId(userId) }, 
        {
          $set: { name, username, password, profilePicture },
        }
      );

    if (result.matchedCount === 0) {
      return res.status(400).json({ message: "Användaren existerar inte" });
    }

    res.status(200).json({ message: "Kontouppgifter uppdaterade!" });
  } catch (error) {
    console.error("Fel vid uppdatering av användare:", error);
    res.status(500).json({ message: "Ett fel inträffade" });
  }
});


  return router;
};
