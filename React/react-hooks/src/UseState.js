import React, {useState} from 'react';

function Example() {
  // 创建一个保存 count 的state，并给初始值0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  )
}