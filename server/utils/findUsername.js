import axios from "axios";
import userModel from "../model/user.model";

export default findUsername =async (username) =>{

    const reponse = await axios.get(`https://api.github.com/users/${username}`);
    const data = Response.data;
    return data;

    
}