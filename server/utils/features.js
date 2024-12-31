import mongoose from "mongoose"
export const connectDb = () =>{
   mongoose.connect("mongodb://localhost:27017",{
       dbName : "AutnomizeAI"
   }).then((c)=>console.log(`Db connected`))
     .catch((error)=>console.log(error))
} 

export const fetchData =async (username) =>{
  await axios.get(`https://api.github.com/users/${username}`);
  const followers = followersResponse.data;
}