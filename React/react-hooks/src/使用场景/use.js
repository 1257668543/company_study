// 如何创建自定义 Hooks？

// 自定义 Hooks 在形式上其实非常简单，就是声明一个名字以 use 开头的函数，比如 useCounter。这个函数在形式上和普通的 JavaScript 函数没有任何区别，你可以传递任意参数给这个 Hook，也可以返回任何值。但是要注意，Hooks 和普通函数在语义上是有区别的，就在于函数中有没有用到其它 Hooks。

// 简单计数器的实现，当时把业务逻辑都写在了函数组件内部，但其实是可以把业务逻辑提取出来成为一个 Hook。比如下面的代码：

import { useState, useCallback }from 'react';
 
function useCounter() {
  // 定义 count 这个 state 用于保存当前数值
  const [count, setCount] = useState(0);
  // 实现加 1 的操作
  const increment = useCallback(() => setCount(count + 1), [count]);
  // 实现减 1 的操作
  const decrement = useCallback(() => setCount(count - 1), [count]);
  // 重置计数器
  const reset = useCallback(() => setCount(0), []);
  
  // 将业务逻辑的操作 export 出去供调用者使用
  return { count, increment, decrement, reset };
}

// 有了这个 Hook，我们就可以在组件中使用它，比如下面的代码：

import React from 'react';

function Counter() {
  // 调用自定义 Hook
  const { count, increment, decrement, reset } = useCounter();

  // 渲染 UI
  return (
    <div>
      <button onClick={decrement}> - </button>
      <p>{count}</p>
      <button onClick={increment}> + </button>
      <button onClick={reset}> reset </button>
    </div>
  );
}

// 一方面能让这个逻辑得到重用，另外一方面也能让代码更加语义化，并且易于理解和维护。

// 自定义 Hooks 的两个特点：
// 名字一定是以 use 开头的函数，这样 React 才能够知道这个函数是一个 Hook；
// 函数内部一定调用了其它的 Hooks，可以是内置的 Hooks，也可以是其它自定义 Hooks。这样才能够让组件刷新，或者去产生副作用。