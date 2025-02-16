import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import arrowDown from "../assets/arrow-down.gif";

const NewIdea = () => {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaText, setIdeaText] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const userId = localStorage.getItem("userId");

  const handleIdea = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Du måste vara inloggad för att skicka in en idé.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/ideas", {
        userId,
        ideaTitle,
        ideaText,
      });

      setMessage(response.data.message);
      setAnswer(response.data.answerText);
      setIdeaTitle("");
      setIdeaText("");
    } catch (error) {
      console.error("Fel vid inlämning:", error);
      setMessage("Något gick fel, försök igen.");
    }
  };

  return (
    <>
      <Card className="w-100 h-100 p-3 shadow-sm d-flex flex-column">
        <Form onSubmit={handleIdea}>
          <Form.Group className="mb-3">
            <Form.Label>
              Skriv in din idé <img id="arrowgif" src={arrowDown} />
            </Form.Label>
            <Form.Control
              className="mt-2"
              type="text"
              placeholder="Din briljanta (eller galna) idé..."
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              required
            />
            <Form.Control
              className="mt-2"
              type="text"
              placeholder="Döp din idé"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Button id="newidea" type="submit" className="w-100 mb-3">
            Skicka idén till labbet
          </Button>
        </Form>
        {answer && (
          <Card.Body>
            <Card.Text> {answer}</Card.Text>
          </Card.Body>
        )}
      </Card>
    </>
  );
};

export default NewIdea;
