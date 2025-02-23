import React, { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import trashCan from "../assets/trashicon.png";

const SelectedIdea = () => {
  const { ideaId } = useParams();
  const [idea, setIdea] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_DOTNET_API_URL;

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/idea/${ideaId}`);
        if (response.data) {
          setIdea(response.data);
        } else {
          setError("Ingen idé hittades");
        }
        setLoading(false);
      } catch (error) {
        setError("Kunde inte hämta idén. Försök igen.");
        setLoading(false);
      }
    };
    fetchIdeaDetails();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/idea/${ideaId}/delete`);
      setShowModal(false);
      setShowConfirmModal(true);
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      setError("Kunde inte radera idén. Försök igen.");
      setShowModal(false);
    }
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
      <Container className="d-flex justify-content-center align-items-center mt-5">
        {idea ? (
          <Card className="shadow-lg p-4 w-85">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white border-0">
              <Card.Title className="mb-0">
                <strong>Din idé: </strong>
                {idea.ideaTitle}
              </Card.Title>
              <small className="text-muted">
                {new Date(idea.createdAt).toLocaleString()}
              </small>
            </Card.Header>
            <Card.Body>
              <Card.Text>{idea.ideaText}</Card.Text>
              <Card.Text>
                <strong>The Burnlab tycker:</strong> {idea.answerText}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-white border-0 d-flex justify-content-end">
              <Button
                variant="link"
                size="sm"
                className="hover-dark"
                onClick={() => setShowModal(true)}
              >
                <img src={trashCan} id="trashButton" alt="Radera idén" />
              </Button>
            </Card.Footer>
          </Card>
        ) : (
          <div>Ingen idé hittades</div>
        )}
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta radering</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Är du säker på att du vill radera denna idén? Den går inte att få
          tillbaka!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Avbryt
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Ja, radera
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmModal} centered>
        <Modal.Header>
          <Modal.Title>Idén raderad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Idén har raderats! Du skickas strax tillbaka till startsidan.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelectedIdea;
