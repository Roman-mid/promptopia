import Feed from './Feed';

const FeedWrap = async () => {
  const response = await fetch(
    'https://promptopia-xi-henna.vercel.app/api/prompt',
    {
      cache: 'no-store',
    }
  );
  const posts = await response.json();

  return <Feed posts={posts.reverse()} />;
};

export default FeedWrap;
