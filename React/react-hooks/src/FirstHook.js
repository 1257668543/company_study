import React, { useState } from 'react';

function CountLabel({ count }) {
  const color = count > 10 ? "red" : "blue";
  return <span style={{color}}>{count}</span>
}

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        <CountLabel count={count} />
      </button>
    </div>
  )
  // JSX原理：非模版语言，实质是js
  // React.createElement(
  //   "div",
  //   null,
  //   React.createElement(
  //     "button",
  //     { onClick: function onClick() {
  //         return setCount(count + 1);
  //       } },
  //     React.createElement(CountLabel, { count: count })
  //   )
  // );
}