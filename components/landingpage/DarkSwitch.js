import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import LightMode from "../../public/img/dashboard/icons/lightMode.svg";
import DarkMode from "../../public/img/dashboard/icons/darkMode.svg";

const ThemeChanger = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className="flex items-center">
			{theme === "dark" ? (
				<button
					onClick={() => setTheme("light")}
					className="text-gray-300 rounded-full outline-none focus:outline-none"
				>
					<span className="sr-only">Light Mode</span>
					<LightMode width="20" height="20" />
				</button>
			) : (
				<button
					onClick={() => setTheme("dark")}
					className="text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20"
				>
					<span className="sr-only">Dark Mode</span>
					<DarkMode width="20" height="20" />
				</button>
			)}
		</div>
	);
};

export default ThemeChanger;
