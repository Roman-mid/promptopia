'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const Feed = () => {
  const [searchUser, setSearchUser] = useState({ name: '', id: '' });
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    setSearchUser({ name: '', id: '' });
  };

  const handleTagClick = (post) => {
    setSearchText(post);
  };

  const handleUserClick = (creator) => {
    setSearchUser({ name: creator.username, id: creator._id });
    setSearchText(creator.username);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data.reverse());
    };

    fetchPosts();
  }, [searchText]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center '>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchText}
          required
          className='search_input peer'
        />
      </form>
      <PromtCardList
        data={posts}
        searchText={searchText}
        searchUser={searchUser}
        handleTagClick={handleTagClick}
        handleUserClick={handleUserClick}
      />
    </section>
  );
};

export default Feed;

const PromtCardList = ({
  data,
  handleTagClick,
  searchText,
  searchUser,
  handleUserClick,
}) => {
  const filteredPosts = data.filter(
    (post) =>
      post.tag.replace('#', '').includes(searchText.replace('#', '')) ||
      post.prompt.includes(searchText) ||
      post.creator._id === searchUser.id
  );

  return (
    <div className='mt-16  prompt_leyout '>
      {filteredPosts.map((post) => (
        <PromptCard
          className='mt-4'
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleUserClick={handleUserClick}
        />
      ))}
    </div>
  );
};
