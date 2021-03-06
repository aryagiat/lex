/**
 * Signup.jsx
 *
 * Signup page for Lex
 */

import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

import Footer from "../misc/Footer";
import CenteredContainer from "../misc/CenteredContainer";
import SignupForm from "../authentication/SignupForm";

function Signup() {
  /**
   * Signup component for the Signup page.
   */

  return (
    <div className="gradient-background">
      <CenteredContainer>
        <Link to="/landing" style={{ textDecoration: "none" }}>
          <h1 className="logo logo-big logo-white text-center">LEX</h1>
        </Link>
        <SignupForm />
        <Footer theme="light" />
      </CenteredContainer>
    </div>
  );
}

export default Signup;
