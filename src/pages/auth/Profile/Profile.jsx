import React from 'react'
import Add from '../../../components/posts/Add'
import PostsList from '../../../components/posts/PostsList'

export default function Profile() {
  return (
    <>
      <Add />
      <PostsList isHome={false} />
    </>
  )
}
