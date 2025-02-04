import React, { useState } from "react";
import { Container, Button, Form, ListGroup, Card } from "react-bootstrap";

const HomePage = ({ previousIdeas, onSubmitIdea, onLogout, onEditAccount }) => {
  const [idea, setIdea] = useState("");

  const handleSubmit = () => {
    if (idea.trim() !== "") {
      onSubmitIdea(idea);
      setIdea("");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-4">The Burn Lab 🔥</h2>

        <h4>Tidigare idéer</h4>
        {previousIdeas && previousIdeas.length > 0 ? (

          <ListGroup className="mb-3">
            {previousIdeas.map((idea, index) => (
              <ListGroup.Item key={index}>{idea}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Inga idéer ännu. Dags att skicka in din första!</p>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Skriv in din idé</Form.Label>
            <Form.Control
              type="text"
              placeholder="Din briljanta (eller galna) idé..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-100 mb-3"
          >
            Skicka idén till labbet
          </Button>
        </Form>

        <Button
          variant="outline-danger"
          onClick={onLogout}
          className="w-100 mb-2"
        >
          Logga ut
        </Button>
        <Button
          variant="outline-secondary"
          onClick={onEditAccount}
          className="w-100"
        >
          Hantera konto
        </Button>
      </Card>
    </Container>
  );
};

export default HomePage;
