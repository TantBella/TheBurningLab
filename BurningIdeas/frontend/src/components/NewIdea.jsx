import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import arrowDown from "../assets/arrow-down.gif";

const NewIdea = ({ onSubmitIdea }) => {
  const [idea, setIdea] = useState("");

  const handleSubmit = () => {
    if (idea.trim() !== "") {
      onSubmitIdea(idea);
      setIdea("");
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
          <Button id="newidea" onClick={handleSubmit} className="w-100 mb-3">
            Skicka idén till labbet
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default NewIdea;
