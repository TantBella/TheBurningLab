import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const SignIn = ({ show, setShow }) => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_DOTNET_API_URL;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        username,
        password,
      });

      if (response.status === 200) {
        const userData = {
          userId: response.data.userId,
          name: response.data.name,
          username: response.data.username,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");

        setUser(userData);

        setIsAuthenticated(true);
        setShow(false);
      }
    } catch (error) {
      setErrorMessage("Fel användarnamn eller lösenord");
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logga in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-3">
            <Form.Label>Användarnamn</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ange användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lösenord</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ange lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" className="w-100" type="submit">
            Logga in
          </Button>
        </Form>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
