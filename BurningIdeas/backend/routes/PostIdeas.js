const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (db) => {
  router.post("/", async (req, res) => {
    const { userId, ideaTitle, ideaText } = req.body;

    if (!userId || !ideaTitle || !ideaText) {
      return res.status(400).json({ message: "Alla fält måste fyllas i." });
    }

    try {
      // const userObjectId = new ObjectId(userId);
      const userObjectId = ObjectId.createFromHexString(userId);

      const answer = await db
        .collection("Answers")
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      const answerText =
        answer.length > 0 ? answer[0].AnswerText : "Inget svar hittades.";

      const newIdea = {
        IdeaId: new ObjectId(),
        IdeaTitle: ideaTitle,
        IdeaText: ideaText,
        AnswerText: answerText,
        CreatedAt: new Date(),
        UserId: userObjectId,
      };

      const result = await db.collection("Ideas").insertOne(newIdea);

      if (result.insertedCount === 0) {
        return res
          .status(500)
          .json({ message: "Det gick inte att spara idén." });
      }

      res.status(201).json({
        message: "Idén sparades!",
        idea: newIdea,
        answerText: answerText,
      });
    } catch (error) {
      console.error("Fel vid sparande av idé:", error);
      res.status(500).json({ message: "Ett fel uppstod vid sparande." });
    }
  });

  return router;
};
