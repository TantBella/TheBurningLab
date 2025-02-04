import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const SignUp = ({ show, setShow }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleSignUp = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch("http://localhost:3000/createaccount", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        alert("Konto skapat!");
        setShow(false);
      } else {
        alert("Misslyckades med att skapa konto.");
      }
    } catch (error) {
      console.error("Fel vid registrering:", error);
    }
  };

  return (
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
  );
};

export default SignUp;
