import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Divider from "./Divider";
import { auth } from "../../../utils/firebaseClient";

import styles from "./SignUpFormModal.module.css";

interface SignUpModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const SignUpFormModal: React.FC<SignUpModalProps> = ({
  show,
  onClose,
  onSubmit
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidEmail = email => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = password => {
    return password.length >= 6;
  };

  if (!show) {
    return null;
  }

  const validateForm = (email, password, confirmPassword) => {
    if (!isValidEmail(email)) {
      return "Please enter a valid email address.";
    } else if (!isValidPassword(password)) {
      return "Password must be at least 6 characters long.";
    } else if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm(email, password, confirmPassword);

    if (validationError) {
      alert(validationError);
      return;
    }

    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await onSubmit(e);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Sign-up error: " + errorMessage);
      }
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h1 className={styles.modalTitle}>Sign-up</h1>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="email"
            id="email"
            className={` ${styles.inputField}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {/* Both passwords have to match */}
          <input
            type="password"
            className={`${styles.inputField}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            className={` ${styles.inputField}`}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />

          <Divider />

          <button
            type="submit"
            className={`${styles.submitButton} bg-primary `}
          >
            Create Account
          </button>
          <button
            className={`${styles.submitButton} bg-dark mt-4`}
            onClick={onClose}
          >
            Cancel
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          By signing up, you agree to the{" "}
          <a
            className="no-underline border-b border-grey-dark text-grey-dark"
            href="#"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="no-underline border-b border-grey-dark text-grey-dark"
            href="#"
          >
            Privacy Policy
          </a>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none mt-4"
            onClick={onClose}
          >
            Already have an account? Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormModal;
