import React from 'react'
import RepositoryDetails from './RepositoryDetails'

const RepositoryList = ({repos}) => {
  console.log("Repos coming=",repos)
  return (
    <div>
      {
        repos.map((repo)=><RepositoryDetails repo={repo} />)
      }
      
    </div>
  )
}

export default RepositoryList
