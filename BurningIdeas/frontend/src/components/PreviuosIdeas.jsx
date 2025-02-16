import React, { useEffect, useState } from "react";
import { ListGroup, Card, Container, Row, Col } from "react-bootstrap";
import ideaLamp from "../assets/icon.png";
import axios from "axios";

import { useUser } from "../hooks/useUser";

const PreviousIdeas = () => {
  const [userId, setUserId] = useState(null);
  const [previousIdeas, setPreviousIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      setError("Ingen användare är inloggad. ID saknas.");
      setLoading(false);
      return;
    }

    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/ideas/${userId}`);
        setPreviousIdeas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Fel vid hämtning av idéer:", error);
        setError("Kunde inte hämta idéer. Försök igen.");
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [userId]);


  return (
    <>
      <Card className="w-100 h-100 p-3 shadow-sm d-flex flex-column">
        <Container>
          <Row>
            <Col xs={8}>
              <Card.Title className="mb-4">Tidigare idéer </Card.Title>
            </Col>
            <Col xs={4} id="idealampcontainer">
              <img id="idealamp" src={ideaLamp} />
            </Col>
          </Row>
        </Container>
        {previousIdeas && previousIdeas.length > 0 ? (
          <ListGroup className="mb-3">
            {previousIdeas.map((idea, index) => (
              <ListGroup.Item key={index}>{idea.ideaText}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Card.Subtitle className="m-2 text-muted">
            Inga idéer ännu. Dags att skicka in din första!
          </Card.Subtitle>
        )}
      </Card>
    </>
  );
};

export default PreviousIdeas;
