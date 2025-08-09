import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <>
      <div className='overlay'>
        <div className='loaderWrapper'>
          <span className='loader' />
        </div>
      </div>
    </>
  );
};

export default Loader;
