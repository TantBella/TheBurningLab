const express = require("express");
const axios = require("axios");
const router = express.Router();

module.exports = (API_URL) => {
  router.post("/", async (req, res) => {
    const { IdeaTitle, IdeaText, UserId } = req.body;

    if (!IdeaTitle || !IdeaText || !UserId) {
      return res.status(400).json({ message: "Alla fält måste fyllas i." });
    }

    try {
      const newIdea = {
        IdeaTitle,
        IdeaText,
        UserId,
      };

      const response = await axios.post(`${API_URL}/newidea`, newIdea);
      res.status(201).json({
        message: "Idén sparades!",
        answerText: response.data.AnswerText,
      });
    } catch (error) {
      console.error("Fel vid sparande av idé:", error);
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
