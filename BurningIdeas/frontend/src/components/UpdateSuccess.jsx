import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateSuccess = ({ show, onHide }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onHide();
    navigate("/home");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Uppdatering lyckades!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Dina förändinrgar är sparade.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateSuccess;
