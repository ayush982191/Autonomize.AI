import mongoose from "mongoose"
import axios from "axios"

export const connectDb = () =>{
   mongoose.connect("mongodb://localhost:27017",{
       dbName : "AutnomizeAI"
   }).then((c)=>console.log(`Db connected`))
     .catch((error)=>console.log(error))
} 

export const fetchData =async (username) =>{
  // console.log("username=",username)
  const data = await axios.get(`https://api.github.com/users/${username}`);
  const response = data.data;
  // console.log("respones comign is ",response)
  return response;
}