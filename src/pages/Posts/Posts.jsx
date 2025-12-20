import React from 'react'
import PostsList from '../../components/posts/PostsList'
import Add from '../../components/posts/Add'
import { Helmet } from "react-helmet";

export default function Posts() {

  return (
    <>
      <Helmet>
        <title>Kudo | Home</title>
      </Helmet>
      <Add />
      <PostsList />
    </>
  )
}
