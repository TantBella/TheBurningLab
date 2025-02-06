import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditAccount = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const nameFromStorage = localStorage.getItem("name");
  const profilePictureFromStorage = localStorage.getItem("profilePicture");

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

  const [name, setName] = useState(nameFromStorage || "");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    profilePictureFromStorage || null
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture); // Lägg till profilbilden
    }

    try {
      const response = await axios.put(
        `/editaccount/${localStorage.getItem("userId")}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Kontouppgifter uppdaterade!") {
        localStorage.setItem("name", name);
        localStorage.setItem("username", username);
        localStorage.setItem("profilePicture", profilePicture);
        setMessage("Kontouppgifter uppdaterade!");
      }
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
      setMessage("Det gick inte att uppdatera kontouppgifter.");
    }
  };

  return (
    <div>
      <Button onClick={() => navigate("/")} className="m-3">
        Tillbaka
      </Button>
      <Container className="mt-5">
        <h2>Redigera kontouppgifter</h2>
        {message && <p>{message}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Namn</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={name || "Skriv ditt namn här"}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Användarnamn</Form.Label>
            <Form.Control type="text" value={username} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Lösenord</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Skriv ditt lösenord här"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Profilbild (valfritt)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </Form.Group>

          <Button className="mt-4" type="submit">
            Uppdatera
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditAccount;
