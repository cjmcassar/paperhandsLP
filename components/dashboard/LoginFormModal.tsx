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
					<button
						type="submit"
						className={`${styles.submitButton} bg-phPurple`}
					>
						Login
					</button>

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
