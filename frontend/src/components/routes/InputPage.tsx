// src/components/InputPage.tsx
import { useEffect, useState } from "react";
// import { use } from "../stores/githubStore";
import RepositoryList from "../RepositoryList";
import { useGithubStore } from "../../store/githubstore";
import { backendUrl } from "../../utils/Links";
import axios from "axios";

function InputPage() {
  // const [username, setUsername] = useState<string>("");
  const [repos, setRepos] = useState([]);
  const [input,setInput] = useState("");

  const { username } = useGithubStore();
  const [fetchComplete, setFetchComplete] = useState(false);

const fetchData = async () => {
  try {
    const response = await axios.post(`${backendUrl}/save`, {
      username: input, // Pass the "username" in the body
    });
    console.log("Response Data:", response.data);
    setFetchComplete(true); // Set the state to trigger fetchRepos
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchRepos = async () => {
  try {
    const userInfo = await axios.get(`${backendUrl}/all`);
    const userData = await userInfo.data.message;
    console.log("user data ", userData);
    setRepos(userData);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

useEffect(() => {
  if (fetchComplete) {
    fetchRepos(); // Only run fetchRepos after fetchData is complete
  }
}, [fetchComplete]); //

 
  

  return (
    <div>
      <h1>GitHub Explorer</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={fetchData}>Search</button>
       <RepositoryList repos={repos} /> 
    </div>
  );
}

export default InputPage;
