import React from 'react';
import './Button.css';

const Button = (props) => {
  return (
    <button
      className={props.className}
      id={props.id}
      value={props.value}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};

export default Button;