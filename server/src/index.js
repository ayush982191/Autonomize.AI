import express from "express"; 
import { connectDb } from "../utils/features.js"; 
import userRoute from "../route/user.route.js"
import { errorMiddleware } from "../middleware/error.js";
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());;
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get("/",(req,res)=>res.send("Welcome to Home page"));
app.use("/api/v1/user",userRoute);

app.use(errorMiddleware);
connectDb();
app.listen(3001,()=>console.log("Listening to port 3000"));