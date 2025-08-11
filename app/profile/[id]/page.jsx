'use client';

import Loading from '@app/loading';
import Profile from '@components/Profile';
import { useEffect, useState } from 'react';

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data.reverse());
    };

    getPosts();
  }, [params.id]);

  if (!posts) {
    return <Loading />;
  }

  const userName = posts[0]?.creator.username || 'user';

  return (
    <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
};

export default UserProfile;
