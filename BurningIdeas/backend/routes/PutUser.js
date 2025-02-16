const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (db) => {
  const collectionName = "Users";

  router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, username, oldPassword, newPassword } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Ogiltigt ID-format." });
    }

    const userObjectId = new ObjectId(id);

    const updatedData = {};

    if (name) updatedData.name = name;
    if (username) updatedData.username = username;
    if (newPassword) updatedData.password = newPassword;

    try {
      const result = await db
        .collection(collectionName)
        .updateOne({ _id: userObjectId }, { $set: updatedData });

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Användaren hittades inte." });
      }

      const updatedUser = await db
        .collection(collectionName)
        .findOne({ _id: userObjectId });

      return res.status(200).json({
        message: "Kontouppgifter uppdaterade!",
        updatedUser: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Ett fel inträffade vid uppdatering av användaren.",
        error: error.message,
      });
    }
  });

  return router;
};
