import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PreviousIdeas from "../components/PreviuosIdeas";
import NewIdea from "../components/NewIdea";
import Account from "../components/Account";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    navigate("/");
  } else {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("name");
    const profilePicture = localStorage.getItem("profilePicture");

    setUser({ username, userId, name, profilePicture }); 
  }
}, [navigate]);

  return (
    <>
      <div id="accountbuttons">{user && <Account user={user} />}</div>

      <h1 className="text-center mt-5 mb-2">The Burn Lab 🔥</h1>
      {user && <h2 className="text-center">Välkommen, {user.username}!</h2>}
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
