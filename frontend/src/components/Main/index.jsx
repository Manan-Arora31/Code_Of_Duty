import styles from "./styles.module.css";

const Main = () => {

	const user = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	if(user) {

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
	}
};

export default Main;
