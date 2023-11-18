import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
	const navigate = useNavigate();
	const user = localStorage.getItem("token");

	useEffect(() => {
		// Redirect to login page if the user is not logged in
		if (!user) {
			alert("Please login first")
			navigate('/login');
		}
	}, [user, navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login');
	};

	if (user) {

		return (
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1>quizmania</h1>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</nav>
			</div>
		);
	}
	else {
		return null
	}
};

export default Main;
