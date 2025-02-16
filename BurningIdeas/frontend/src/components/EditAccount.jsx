import React, { useState, useEffect } from "react";
import { Button, Form, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../hooks/useUser";
import UpdateSuccess from "./UpdateSuccess";
import DeleteAccount from "./DeleteAccount";

const EditAccount = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setName(user.name || "");
      setUsername(user.username || "");
      setLoading(false);
      console.log("Användardata:", user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage("Användaren är inte inloggad.");
      return;
    }
    if (newPassword && newPassword !== confirmNewPassword) {
      setMessage("Det nya lösenordet matchar inte.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    if (oldPassword) formData.append("oldPassword", oldPassword);
    if (newPassword) formData.append("newPassword", newPassword);

    try {
      const response = await axios.patch(
        `http://localhost:3000/editaccount/${user.userId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "Kontouppgifter uppdaterade!") {
        setUser((prevUser) => ({
          ...prevUser,
          name,
          username,
        }));
        localStorage.setItem("name", name);
        localStorage.setItem("username", username);

        setShowUpdateSuccess(true);
      }
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
      setMessage("Det gick inte att uppdatera kontouppgifter.");
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <Button
        id="goback"
        variant="outline-dark"
        onClick={() => navigate("/home")}
        className="m-3"
      >
        Tillbaka
      </Button>
      <Container id="editaccountcontainer" className="mt-4">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Laddar...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <h2>Redigera dina kontouppgifter, {user.username}</h2>
            {message && <p>{message}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Namn</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Användarnamn</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Gammalt lösenord (krävs för att byta lösenord)
                </Form.Label>
                <Form.Control
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nytt lösenord</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bekräfta nytt lösenord</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </Form.Group>

              <div id="editaccountutons">
                <Button variant="outline-success" type="submit">
                  Uppdatera
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                  Radera kontot
                </Button>
              </div>
            </Form>
          </>
        )}
      </Container>

      <UpdateSuccess
        show={showUpdateSuccess}
        onHide={() => setShowUpdateSuccess(false)}
      />
      <DeleteAccount
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        user={user}
        setUser={setUser}
      />
    </>
  );
};

export default EditAccount;
