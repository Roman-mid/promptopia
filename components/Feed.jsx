'use client';

import { useState } from 'react';
import PromptCard from './PromptCard';

const Feed = ({ posts }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (post) => {
    setSearchText(post);
  };

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
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;

const PromtCardList = ({ data, handleTagClick, searchText }) => {
  const filteredPosts = data.filter(
    (post) =>
      post.tag.replace('#', '').includes(searchText.replace('#', '')) ||
      post.prompt.includes(searchText) ||
      post?.creator.username.includes(searchText)
  );

  return (
    <div className='mt-16  prompt_leyout '>
      {filteredPosts.map((post) => (
        <PromptCard
          className='mt-4'
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
