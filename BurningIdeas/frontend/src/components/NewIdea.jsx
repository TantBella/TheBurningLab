import React, { useState } from "react";
import { Button, Form, Card, Modal } from "react-bootstrap";
import axios from "axios";
import arrowDown from "../assets/arrow-down.gif";
import { useUser } from "../hooks/useUser";

const NewIdea = () => {
  const [IdeaTitle, setIdeaTitle] = useState("");
  const [IdeaText, setIdeaText] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const API_BASE_URL = import.meta.env.VITE_DOTNET_API_URL;

  const handleIdea = async (e) => {
    if (!user) {
      setMessage("Du måste vara inloggad för att skicka in en idé.");
      return;
    }

    if (!IdeaTitle || !IdeaText) {
      setMessage("Både titel och text är obligatoriska.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/newidea`, {
        IdeaTitle,
        IdeaText,
        UserId: user.userId,
      });
      setMessage(response.data.message);
      setAnswer(response.data.answerText);
      setShowModal(true);
      setIdeaTitle("");
      setIdeaText("");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setMessage("Något gick fel, försök igen.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
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
              value={IdeaText}
              onChange={(e) => setIdeaText(e.target.value)}
              required
            />
            <Form.Control
              className="mt-2"
              type="text"
              placeholder="Döp din idé"
              value={IdeaTitle}
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

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>The BurnLab tycker: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{answer}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Okej!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewIdea;
