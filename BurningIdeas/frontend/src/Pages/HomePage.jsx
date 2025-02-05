import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import PreviousIdeas from "../components/PreviuosIdeas";
import NewIdea from "../components/NewIdea";
import Account from "../components/Account";

const HomePage = () => {
  return (
    <>
      <div id="accountbuttons">
        <Account />
      </div>

      <h1 className="text-center mt-5 mb-2">The Burn Lab 🔥</h1>
      <Container className="mt-5">
        <Row className="g-4">
          <Col Col xs={12} md={6} className="d-flex">
            <PreviousIdeas />
          </Col>
          <Col Col xs={12} md={6} className="d-flex">
            <NewIdea />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
