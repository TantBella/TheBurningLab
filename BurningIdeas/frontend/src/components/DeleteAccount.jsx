import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({
  showDeleteModal,
  setShowDeleteModal,
  user,
  setUser,
}) => {
  const [passwordForDelete, setPasswordForDelete] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteaccount/${user.userId}`,
        { data: { password: passwordForDelete } }
      );

      if (response.data.message === "Kontot raderades.") {
        setAccountDeleted(true);
      } else {
        setDeleteMessage("Felaktigt lösenord.");
      }
    } catch (error) {
      console.error("Fel vid radering:", error);
      setDeleteMessage("Det gick inte att radera kontot.");
    }
  };

  const handleCloseModal = () => {
    if (accountDeleted) {
      localStorage.clear();
      setUser(null);
      navigate("/");
    }
    setShowDeleteModal(false);
  };

  return (
    <Modal show={showDeleteModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {accountDeleted ? "Kontot raderat" : "Vill du radera ditt konto?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {accountDeleted ? (
          <p>
            Kontot har raderats. Klicka på OK för att komma till startsidan.
          </p>
        ) : (
          <>
            <p id="deletesure">Alla dina idéer kommer försvinna.</p>
            <Form.Group>
              <Form.Label>Fyll i ditt lösenord för att bekräfta:</Form.Label>
              <Form.Control
                type="password"
                value={passwordForDelete}
                onChange={(e) => setPasswordForDelete(e.target.value)}
                required
              />
            </Form.Group>
            {deleteMessage && <p>{deleteMessage}</p>}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleCloseModal}>
          {accountDeleted ? "OK" : "Nej"}
        </Button>
        {!accountDeleted && (
          <Button variant="outline-danger" onClick={handleDeleteConfirm}>
            Ja, radera mitt konto
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccount;
