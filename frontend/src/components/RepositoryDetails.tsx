// src/components/RepositoryDetails.tsx
// import { Repo } from "../stores/githubStore";
import { Repo } from "../store/githubstore";

interface RepositoryDetailsProps {
  repo: Repo;
}

function RepositoryDetails({ repo }: RepositoryDetailsProps) {
  return (
    <div>
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
}

export default RepositoryDetails;
