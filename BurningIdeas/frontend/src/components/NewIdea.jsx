import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import arrowDown from "../assets/arrow-down.gif";

const NewIdea = ({}) => {
  const [idea, setIdea] = useState("");

  const handleIdea = async () => {
    if (idea.trim() === "") return;

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Du måste vara inloggad för att skicka en idé.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/ideas", {
        userId,
        ideaText: idea,
      });

      if (response.status === 201) {
        setIdea("");
        alert("Idé tillagd!");
      } else {
        alert(response.data.message || "Något gick fel.");
      }
    } catch (error) {
      console.error("Fel vid registrering av idé:", error);
    }
  };

  return (
    <>
      <Card className="w-100 h-100 p-3 shadow-sm d-flex flex-column">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Skriv in din idé <img id="arrowgif" src={arrowDown} />{" "}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Din briljanta (eller galna) idé..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </Form.Group>
          <Button id="newidea" onClick={handleIdea} className="w-100 mb-3">
            Skicka idén till labbet
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default NewIdea;
