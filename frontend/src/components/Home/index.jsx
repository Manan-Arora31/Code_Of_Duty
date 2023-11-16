import styles from "./styles.module.css";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Home() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = 'http://localhost:8000/auth/login/success';
			const { data } = await axios.get(url, { withCredentials: true });
			console.log(data)

			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
		if (!user) {
			navigate('/login');
		  }
	}, []);

	const logout = () => {
		window.open(`http://localhost:8000/auth/logout`, "_self");
	};

	if(user){
		user = user.user
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Home</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/profile.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Profile</h2>
					<img
						src=""
						alt="profile"
						className={styles.profile_img}
					/>
					<input
						type="text"
						//
						defaultValue="manan"
						className={styles.input}
						placeholder="UserName"
					/>
					<input
						type="text"
						//
						defaultValue="manan31@gmail.com"
						className={styles.input}
						placeholder="Email"
					/>
					<button className={styles.btn} onClick={logout}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	)}
	// else{
	// 	return null;
	// }
}

export default Home;
