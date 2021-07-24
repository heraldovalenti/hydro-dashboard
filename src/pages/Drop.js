import React, { useState } from 'react';

export const Drop = ({}) => {
  const [size, setSize] = useState(500);
  return (
    <div>
      <div>
        <button onClick={() => setSize((prev) => prev + 100)}>increase</button>
        <button
          onClick={() => setSize((prev) => (prev <= 100 ? prev : prev - 100))}
        >
          decrease
        </button>
      </div>
      <div>
        <Icon q={size} h={size} />
      </div>
    </div>
  );
};

const Icon = ({ q, h }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={q}
      height={h}
    >
      <text x="0" y="15" fill="red">
        H: 0.12 {'\n'}Q: 123
      </text>
      <text x="0" y="45" fill="red"></text>
      <path
        opacity="0.5"
        fill="#010101"
        stroke="red"
        d="M32,8c0,0-19,17-19,31c0,10.493,8.507,19,19,19s19-8.507,19-19C51,25,32,8,32,8z M46,39c0,11-13,14-13,14l-3-5	c0,0,11-2,14-11L46,39z"
      ></path>
    </svg>
  );
};
