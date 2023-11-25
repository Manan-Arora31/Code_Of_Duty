import  express  from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./router/route.js";
import connect from "./db/dbConnection.js";

import quizRoutes from './routes/quiz.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import Photo from './models/photo.js';

import adminRoutes from "./routes/admin.js";
import passwordResetRoutes from "./routes/passwordReset.js";
import resultRoute from './routes/quizResult.js';
//import authMiddleware from "./middleware/authMiddleware.js";
import bodyParser from "body-parser";
import http from "http"
import { WebSocketServer } from "ws";
// import fileUpload from "express-fileupload";
import multer from "multer";
import { spawn } from "child_process"
import Image from "./models/photo.js"

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocketServer({ 
    server
 });

 wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
  
    ws.on('message', (message) => {
    });
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null,uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

//app middleware
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(fileUpload());
app.use(morgan('tiny'));
app.use(express.json());
config();

app.use('/api/quiz',quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//app.use('/api/admin',authMiddleware);
app.use('/api/admin',adminRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use('/api/quizResult',resultRoute);
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

  app.post("/upload",upload.single("image"),async (req,res) => {
    console.log(req.file);
    const file = req.file;
    const newImage = new Image({
      image: file.path,
    })
    try {
      const savedImage = await newImage.save();
      console.log("image saved");
      res.status(200).json(savedImage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save image to MongoDB' });
    }
  })


  app.get('/photos', async (req, res) => {
    try {
      const photos = await Photo.find(); // Assuming you want to populate the session information
      console.log("got photos from database part 2")
      res.json(photos);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
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

