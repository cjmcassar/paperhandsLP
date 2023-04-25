import React from "react";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../utils/firebaseClient";

import styles from "./SignInWithGoogle.module.css";

interface LoginButtonProps {
  providerName: string;
}

const SignInWithGoogle: React.FC<LoginButtonProps> = ({ providerName }) => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      router.push("/risk-review");
    } catch (error) {
      // Handle login error here (e.g., display an error message)
      console.error("Login error: ", error);
    }
  };

  return (
    <button className={styles.signInWithGoogle} onClick={handleLogin}>
      <FontAwesomeIcon icon={faGoogle} /> {""}
      Sign in with {providerName}
    </button>
  );
};

export default SignInWithGoogle;
