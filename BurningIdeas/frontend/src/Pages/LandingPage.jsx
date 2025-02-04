import React, { useState } from "react";
import { Button } from "react-bootstrap";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const LandingPage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">

      <h1 className="text-center mb-4">The Burn Lab 🔥</h1>
      <p>Let's burn some ideas!</p>
      <div className="mt-3">
        <Button
          id="signup"
          className="me-2"
          onClick={() => setShowSignUp(true)}
        >
          Skapa konto
        </Button>
        <Button id="signin" onClick={() => setShowSignIn(true)}>
          Logga in
        </Button>
      </div>

      <SignIn show={showSignIn} setShow={setShowSignIn} />
      <SignUp show={showSignUp} setShow={setShowSignUp} />
    </div>
  );
};

export default LandingPage;
