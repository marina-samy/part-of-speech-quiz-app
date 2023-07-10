import React from 'react';

export default function Bg({ background, children , height }) {
  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height,
  };

  return (
    <div className='w-100 mx-0 mt-0 d-flex flex-column justify-content-center align-items-center' style={styles}>
      {children}
    </div>
  );
}