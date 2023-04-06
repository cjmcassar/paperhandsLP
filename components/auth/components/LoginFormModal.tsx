import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import SignInWithGoogle from "./SignInWithGoogle";
import SignUpFormModal from "./SignUpFormModal";
import styles from "./LoginFormModal.module.css";
import Divider from "./Divider";

interface LoginFormModalProps {
  onClose: () => void;
}

const LoginFormModal: React.FC<LoginFormModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const auth = getAuth();

  const isValidEmail = email => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("User logged in ----->", user);
      onClose();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert("Login error: " + errorMessage);
    }
  };

  const handleSignUpModalSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setShowSignUpModal(false);
    onClose();
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleSignUpModalClose = () => {
    setShowSignUpModal(false);
  };

  return (
    <div className={`${styles.modalContainer} `}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Login</h2>
        <form onSubmit={handleLoginSubmit} className={styles.formContainer}>
          <label className="text-white" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`${styles.inputField} bg-trueGray `}
            required
          />
          <label className="text-white" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`${styles.inputField} bg-trueGray`}
            required
          />

          <Divider />

          <button
            type="submit"
            className={`${styles.submitButton} bg-phPurple `}
          >
            Login with email
          </button>

          <div className="mt-4">
            <SignInWithGoogle providerName="Google" />
          </div>

          <button
            className={`${styles.submitButton} bg-phBlack mt-4`}
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none mt-4"
          onClick={handleSignUpClick}
        >
          Don't have an account? Sign-up
        </button>
        <SignUpFormModal
          show={showSignUpModal}
          onClose={handleSignUpModalClose}
          onSubmit={handleSignUpModalSubmit}
        />
      </div>
    </div>
  );
};

export default LoginFormModal;
