import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import connect from "./db/dbConnection.js";

import quizRoutes from './routes/quiz.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();

//app middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

app.use('/quiz',quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

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
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})

