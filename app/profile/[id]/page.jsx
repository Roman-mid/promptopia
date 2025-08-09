'use client';

import Profile from '@components/Profile';
import { useEffect, useState } from 'react';

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);

  const userName = posts[0]?.creator.username;

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default UserProfile;
