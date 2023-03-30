import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SignInWithGoogle from "./SignInWithGoogle";

import styles from "./LoginFormModal.module.css";
import Divider from "./Divider";

interface LoginFormModalProps {
	onClose: () => void;
}

const LoginFormModal: React.FC<LoginFormModalProps> = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const auth = getAuth();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			console.log("User logged in ----->", user);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		}

		onClose();
	};

	return (
		<div className={`${styles.modalContainer} `}>
			<div className={styles.modalContent}>
				<h2 className={styles.modalTitle}>Login</h2>
				<form onSubmit={handleSubmit} className={styles.formContainer}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={`${styles.inputField} bg-trueGray `}
						required
					/>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
			</div>
		</div>
	);
};

export default LoginFormModal;
