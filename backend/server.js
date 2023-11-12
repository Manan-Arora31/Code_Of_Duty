require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();

const connectDB=require('./db/dbConnection');
connectDB();

app.use(cors());
app.use(express.json());

const quizRoutes=require('./routes/quiz');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use('/quiz',quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/",(req,res)=>{
    res.send("Hello");
})
app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });