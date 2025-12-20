import React, { useEffect } from 'react'

export default function Friends() {
  useEffect(() => {
      document.title = "Kudo | Friends"
    }, [])
  return (
    <div>Friends</div>
  )
}
