const { ObjectId } = require("mongodb");

module.exports = (db) => {
  const router = require("express").Router();

  router.delete("/:userId", async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    const userObjectId = new ObjectId(userId);

    try {
      const user = await db.collection("Users").findOne({ _id: userObjectId });

      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte." });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: "Felaktigt lösenord." });
      }

      const result = await db
        .collection("Users")
        .deleteOne({ _id: userObjectId });

      if (result.deletedCount === 0) {
        return res
          .status(500)
          .json({ message: "Fel vid borttagning av användaren." });
      }

      return res.status(200).json({ message: "Kontot raderades." });
    } catch (error) {
      console.error("Fel vid radering:", error);
      return res
        .status(500)
        .json({ message: "Ett fel inträffade vid radering." });
    }
  });

  return router;
};
