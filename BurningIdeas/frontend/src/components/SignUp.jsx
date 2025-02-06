import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const SignUp = ({ show, setShow }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilepicture, setProfileImage] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSignUp = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    if (profilepicture) {
      formData.append("profilepicture", profilepicture);
    }

    try {
      const response = await axios.post("/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server response:", response.data);

      if (response.status === 201) {
        setShow(false);
        setShowLoginPrompt(true);
      } else {
        alert(response.data.message || "Misslyckades med att skapa konto.");
      }
    } catch (error) {
      console.error("Fel vid registrering:", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Skapa konto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Namn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ange ditt namn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
            <Form.Group className="mb-3">
              <Form.Label>Profilbild (valfritt)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" className="w-100" onClick={handleSignUp}>
              Skapa konto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showLoginPrompt}
        onHide={() => setShowLoginPrompt(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Konto skapat!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ditt konto har skapats. Vill du logga in nu?</p>
          <Button
            variant="success"
            className="w-100"
            onClick={() => {
              setShowLoginPrompt(false);
              setShowSignIn(true);
            }}
          >
            Ja, logga in
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;
