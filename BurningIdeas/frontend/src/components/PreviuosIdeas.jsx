import React from "react";
import { ListGroup, Card, Container, Row, Col } from "react-bootstrap";
import ideaLamp from "../assets/icon.png";

const PreviousIdeas = ({ previousIdeas }) => {
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
              <ListGroup.Item key={index}>{idea}</ListGroup.Item>
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
