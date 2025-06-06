import React, { useEffect, useState } from "react";
import { ListGroup, Card, Container, Row, Col } from "react-bootstrap";
import ideaLamp from "../assets/icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PreviousIdeas = () => {
  const [previousIdeas, setPreviousIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_DOTNET_API_URL;

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/ideas/${user.userId}`
        );

        setPreviousIdeas(response.data);
        setLoading(false);
      } catch (error) {
        setError("Kunde inte hämta idéer. Försök igen.");
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [user]);

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
            {previousIdeas.map((ideas) => (
              <ListGroup.Item
                key={ideas.id}
                onClick={() => navigate(`/idea/${ideas.id}`)}
                style={{ cursor: "pointer" }}
              >
                <strong>{ideas.ideaTitle}</strong>:{" "}
                <span id="ideatext">{ideas.ideaText}</span>
              </ListGroup.Item>
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
