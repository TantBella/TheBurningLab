import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import accountSettings from "../assets/accountsettingsicon.png";
import logOut from "../assets/logouticon.png";

const Account = ({ user }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleEditAccount = () => {
    const userData = {
      username: localStorage.getItem("username"),
      name: localStorage.getItem("name"),
      profilePicture: localStorage.getItem("profilePicture"),
    };

    navigate("/editaccount", { state: { user: userData } });
  };

  return (
    <div className="d-flex gap-2">
      <Button
        variant="link"
        size="sm"
        className="hover-dark"
        onClick={handleEditAccount}
      >
        <img src={accountSettings} />
      </Button>
      <Button
        variant="link"
        size="sm"
        className="hover-dark"
        onClick={() => setShowLogoutModal(true)}
      >
        <img src={logOut} />
      </Button>

      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta utloggning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && <p> {user.username}, </p>}vill du logga ut från ditt konto?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => setShowLogoutModal(false)}
          >
            Nej, gå tillbaka
          </Button>
          <Button variant="outline-danger" onClick={handleLogout}>
            Ja, logga ut
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Account;
