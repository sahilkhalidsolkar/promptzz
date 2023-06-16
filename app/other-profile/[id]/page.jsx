"use server"
import React from 'react'
import Profile from '@components/Profile'


async function getData(otherId) {
  "use server";
  const res = await fetch(`${process.env.BASE_FETCH_URL}/api/users/${otherId}/posts`,{ next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function  OthersProfile ({params}) {
    const otherId=params.id
    const posts = await getData(otherId);
   
  return (
    <Profile
    name={`${posts[0].creator.username}'s`}
    desc='Welcome to profile page'
    data={posts}
    />
  )
}

export default OthersProfile

