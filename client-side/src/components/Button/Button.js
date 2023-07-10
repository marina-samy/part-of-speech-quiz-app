import React from 'react';

function Button({ style, onClick, text }) {


   
    
      
  return (
    <button
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;




