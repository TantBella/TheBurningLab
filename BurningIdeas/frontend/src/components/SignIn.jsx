import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const SignIn = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logga in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Användarnamn</Form.Label>
            <Form.Control type="text" placeholder="Ange användarnamn" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lösenord</Form.Label>
            <Form.Control type="password" placeholder="Ange lösenord" />
          </Form.Group>
          <Button variant="success" className="w-100">
            Logga in
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
