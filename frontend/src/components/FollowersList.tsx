// src/components/FollowersList.tsx
// import { useGithubStore } from "../stores/githubStore";
import { useGithubStore } from "../store/githubstore";

function FollowersList() {
  const { userInfo, followers, setFollowers, cache, setCache } = useGithubStore();

  const fetchFollowers = async () => {
    if (cache[userInfo!.login]?.followers) {
      setFollowers(cache[userInfo!.login]!.followers!);
      return;
    }

    try {
      const followersData = await fetch(userInfo!.followers_url).then((res) => res.json());
      setCache(userInfo!.login, { ...cache[userInfo!.login]!, followers: followersData });
      setFollowers(followersData);
    } catch (error) {
      console.error("Failed to fetch followers", error);
    }
  };

  if (!followers.length) fetchFollowers();

  return (
    <div>
      <h2>Followers of {userInfo!.login}</h2>
      {followers.map((follower) => (
        <div key={follower.login}>
          <img src={follower.avatar_url} alt="Avatar" width={50} />
          <p>{follower.login}</p>
        </div>
      ))}
    </div>
  );
}

export default FollowersList;
