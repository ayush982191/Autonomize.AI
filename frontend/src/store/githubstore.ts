// src/stores/githubStore.ts
import { create } from "zustand";

export interface User {
  login: string;
  avatar_url: string;
  bio?: string;
  followers_url: string;
}

export interface Repo {
  id: number;
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  forks: number;
}

export interface GithubState {
 username : string 
}

export const useGithubStore = create<GithubState>((set) => ({
  username: "ayush982191",
  
}));
