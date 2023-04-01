import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../utils/firebaseClient";

import styles from "./SignInWithGoogle.module.css";

interface LoginButtonProps {
  providerName: string;
}

const SignInWithGoogle: React.FC<LoginButtonProps> = ({ providerName }) => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Handle successful login here (e.g., redirect to a protected page)
    } catch (error) {
      // Handle login error here (e.g., display an error message)
      console.error("Login error: ", error);
    }
  };

  return (
    <button className={styles.signInWithGoogle} onClick={handleLogin}>
      Login with {providerName}
    </button>
  );
};

export default SignInWithGoogle;
