import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";

const app = express();

//app middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

const port = process.env.PORT;

//routes
app.get('/',(req,res) => {
    try {
        res.json('Get req');
    } catch (error){
        res.json(error);
    }
});


app.listen(port,() => {
    console.log(`Server connected to http://localhost:${port}`);
})

