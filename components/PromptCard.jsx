'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
  className = '',
}) => {
  const [copied, setCopied] = useState('');

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };
  return (
    <div className={`${className} prompt_card `}>
      <div className='flex justify-between items-start gap-5 cursor-pointer'>
        <Link
          href={
            session?.user.id === post.creator._id
              ? '/profile'
              : `/profile/${post.creator._id}`
          }
        >
          <div className='flex-1 flex justify-start items-center gap-3 '>
            <Image
              src={post.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
            <div className='fle flex-col w-[90%]'>
              <h3 className='font-satoshi font-bold text-gray-900 smallText'>
                {post.creator.username}
              </h3>
            </div>
          </div>
        </Link>

        <div className='copy_bnt' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt='copy'
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer flex gap-2 flex-wrap'>
        {post.tag.split(' ').map((tag, ind) => (
          <span key={ind} onClick={() => handleTagClick?.(tag)}>
            {tag[0] === '#' ? tag : `#${tag}`}
          </span>
        ))}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='flex-center gap-5 mt-5'>
          <button
            className='font-inter text-sm green_gradient '
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className='font-inter text-sm orange_gradient '
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
