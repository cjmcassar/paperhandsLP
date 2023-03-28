import React, { useState } from "react";
import styles from "./LoginFormModal.module.css";

interface LoginFormModalProps {
	onClose: () => void;
}

const LoginFormModal: React.FC<LoginFormModalProps> = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Handle login logic here
		onClose();
	};

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalContent}>
				<button className={styles.closeButton} onClick={onClose}>
					X
				</button>
				<h2 className={styles.modalTitle}>Login</h2>
				<form onSubmit={handleSubmit} className={styles.formContainer}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={styles.inputField}
						required
					/>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={styles.inputField}
						required
					/>
					<button type="submit" className={styles.submitButton}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginFormModal;
