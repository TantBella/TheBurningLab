import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../hooks/useUser";
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
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUsername(user.username || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmNewPassword) {
      setMessage("Det nya lösenordet matchar inte.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    if (oldPassword) formData.append("oldPassword", oldPassword);
    if (newPassword) formData.append("newPassword", newPassword);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/editaccount/${user.userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.message === "Kontouppgifter uppdaterade!") {
        setUser((prevUser) => ({
          ...prevUser,
          name,
          username,
          profilePicture: response.data.profilePictureUrl,
        }));
        localStorage.setItem("name", name);
        localStorage.setItem("username", username);
        localStorage.setItem("profilepicture", response.data.profilePictureUrl);

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
      <Button id="goback"
        variant="outline-dark"
        onClick={() => navigate("/home")}
        className="m-3"
      >
        Tillbaka
      </Button>
      <Container id="editaccountcontainer" className="mt-4">
        {user && <h2>Redigera dina kontouppgifter, {user.username}</h2>}
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
          <Form.Group>
            <Form.Label>Profilbild (valfritt)</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
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
