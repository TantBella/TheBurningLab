import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PreviousIdeas from "../components/PreviuosIdeas";
import NewIdea from "../components/NewIdea";
import Account from "../components/Account";
import { useUser } from "../hooks/useUser";


const HomePage = () => {
  const { user, isAuthenticated } = useUser();

  return (
    <>
      <div id="accountbuttons">{user && <Account user={user} />}</div>
      <h1 className="text-center mt-5 mb-2">The Burn Lab 🔥</h1>
      {user && <h2 className="text-center">Välkommen, {user.username}!</h2>}
      <Container className="mt-5">
        <Row className="g-4">
          <Col xs={12} md={6} className="d-flex">
            <PreviousIdeas />
          </Col>
          <Col xs={12} md={6} className="d-flex">
            <NewIdea />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
