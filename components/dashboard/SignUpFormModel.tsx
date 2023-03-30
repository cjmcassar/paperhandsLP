import React, { useState } from "react";

interface SignUpModalProps {
	show: boolean;
	onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ show, onClose }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Perform sign-up logic here
	};

	if (!show) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="absolute inset-0 bg-black opacity-50"
				// onClick={onClose}
			></div>
			<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full max-w-sm z-0">
				<h1 className="mb-8 text-3xl text-center">Sign up</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						required
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						required
					/>
					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						placeholder="Confirm Password"
						required
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
					>
						Create Account
					</button>
				</form>

				<div className="text-center text-sm text-grey-dark mt-4">
					By signing up, you agree to the
					<a
						className="no-underline border-b border-grey-dark text-grey-dark"
						href="#"
					>
						Terms of Service
					</a>{" "}
					and
					<a
						className="no-underline border-b border-grey-dark text-grey-dark"
						href="#"
					>
						Privacy Policy
					</a>
				</div>

				<div className="text-grey-dark mt-6">
					Already have an account?
					<a
						className="no-underline border-b border-blue text-blue"
						href="../login/"
					>
						Log in
					</a>
					.
				</div>
				<button
					type="submit"
					className="absolute m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
					onClick={onClose}
				>
					Sign Up
				</button>
			</div>
		</div>
	);
};

export default SignUpModal;
