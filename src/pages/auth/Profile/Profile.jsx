import React from 'react'
import Add from '../../../components/posts/Add'
import PostsList from '../../../components/posts/PostsList'
import ProfileCard from '../../../components/profile/ProfileCard'
import { Helmet } from "react-helmet";

export default function Profile() {

  return (
    <>
      <Helmet>
        <title>Kudo | Profile</title>
      </Helmet>
      <ProfileCard />
      <Add />
      <PostsList isHome={false} />
    </>
  )
}
