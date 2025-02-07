const express = require("express");
const multer = require("multer");
const { ObjectId } = require("mongodb");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

module.exports = (db) => {
  const collectionName = "Users";

  router.patch(
    "/:userId",
    upload.single("profilepicture"),
    async (req, res) => {
      console.log("Request Params:", req.params);
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);

      const { userId } = req.params;
      const { name, username, oldPassword, newPassword } = req.body;

      const userObjectId = new ObjectId(userId);

      const profilePicturePath = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const updatedData = {};

      if (name) updatedData.name = name;
      if (username) updatedData.username = username;
      if (newPassword) updatedData.password = newPassword;
      if (profilePicturePath) updatedData.profilepicture = profilePicturePath;

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
    }
  );

  return router;
};
