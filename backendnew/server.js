import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import router from "./router/route.js";
import connect from "./db/dbConnection.js";

import quizRoutes from './routes/quiz.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import oauthRoute from "./routes/oauth.js"

import adminRoutes from "./routes/admin.js";
//import authMiddleware from "./middleware/authMiddleware.js";
import passport from "passport";
import cookieSession from "cookie-session";
// import passportStrategy from "./passport.js"
import session from "express-session";
config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});


const app = express();

//app middleware

app.use(
    session({
        secret: 'daiidjaisjdiajsdijasidkmkmjsaida', // Replace with a strong, random string
        resave: false,
        saveUninitialized: false,
    })
);

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "/http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(morgan('tiny'));
app.use(express.json());


app.use('/quiz',quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//app.use('/api/admin',authMiddleware);
app.use('/api/admin',adminRoutes);
app.use("/auth", oauthRoute);

// app.use(
//     session({
//         secret: 'daiidjaisjdiajsdijasidjsaida', // Replace with a strong, random string
//         resave: true,
//         saveUninitialized: true,
//     })
// );

const port = process.env.PORT;



//routes
app.use('/api',router);


app.get('/',(req,res) => {
    try {
        res.json('Get req');
    } catch (error){
        res.json(error);
    }
});

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to /http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})

