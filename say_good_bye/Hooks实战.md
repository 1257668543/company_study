[TOC]

# 一、状态一致性

## 1. 状态最小化原则



​	以一个简单的电影搜索列表为例

![img](https://static001.geekbang.org/resource/image/80/10/80eb70a42a50b47a131f5af57130d210.png?wh=678*532)



​	按照 React 的状态驱动 UI 的思想，第一步就是**要考虑整个功能有哪几个状态**。直观上来说，页面可能包含三个状态：

1. 电影列表的数据：可能来自某个 API 请求
2. 用户输入的关键字：来自用户的输入
3. 搜索的结果数据：来自原始数据结合关键字的过滤结果。



​	一般实现：

```react
	
function FilterList({ data }) {
  // 设置关键字的 State
  const [searchKey, setSearchKey] = useState('');
  // 设置最终要展示的数据状态，并用原始数据作为初始值
  const [filtered, setFiltered] = useState(data);

  // 处理用户的搜索关键字
  const handleSearch = useCallback(evt => {
    setSearchKey(evt.target.value);
    setFiltered(data.filter(item => {
      return item.title.includes(evt.target.value)));
    }));
  }, [filtered])
  return (
    <div>
      <input value={searchKey} onChange={handleSearch} />
      {/* 根据 filtered 数据渲染 UI */}
    </div>
  );
}
```

​	其中隐藏的一致性的问题：展示的结果数据完全由原始数据和关键字决定，而现在却作为一个独立的状态去维护了。这意味着你始终要在原始数据、关键字和结果数据之间保证一致性。

​	问题：如果原始数据 data 属性变化了，最终的结果却没有使用新的数据。

​	在处理关键字变化的同时，再处理一下 data 属性变化的场景，这样不就可以保证三个状态的一致性了吗？比如再加上下面这段代码。



```react

function FilterList({ data }) {
  // ...
  // 在 data 变化的时候，也重新生成最终数据
  useEffect(() => {
    setFiltered(data => {...})
  }, [data, searchKey])
  // ...
}
```

​	最终实现的代码略微复杂，根源在于没有遵循状态最小化的原则，而是设计了一个多余的状态：**过滤后的结果数据**，这个结果实际上完全由原始数据和过滤关键字决定，我们只用在需要的时候每次重新计算得出就可以了，再考虑到性能问题，使用useMemo实现：

```react

import React, { useState, useMemo } from "react";

function FilterList({ data }) {
  const [searchKey, setSearchKey] = useState("");
  
  // 每当 searchKey 或者 data 变化的时候，重新计算最终结果
  const filtered = useMemo(() => {
    return data.filter((item) =>
			item.title.toLowerCase().includes(
      	searchKey.toLowerCase()
	    )
    );
  }, [searchKey, data]);

  return (
    <div className="08-filter-list">
      <h2>Movies</h2>
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

​	在实际开发的过程中，很多复杂场景之所以变得复杂，如果抽丝剥茧来看，你会发现它们都有**定义多余状态**现象的影子，而问题的根源就在于**它们没有遵循状态最小化的原则。**

### 总结：==在保证State完整性的同时，也要保证它的最小化==



## 2. 避免中间状态，确保唯一数据源原则



​	以1中例子为背景，需要实现一个分享的功能，即搜索后需要将关键字添加至url查询参数中：



```react
// getQuery 函数用户获取 URL 的查询字符串
import getQuery from './getQuery';
// history 工具可以用于改变浏览器地址
import history from './history';

function SearchBox({ data }) {
  // 定义关键字这个状态，用 URL 上的查询参数作为初始值
  const [searchKey, setSearchKey] = useState(getQuery('key'));
  // 处理用户输入的关键字
  const handleSearchChange = useCallback(evt => {
    const key = evt.target.value;
    // 设置当前的查询关键状态
    setSearchKey(key);
    // 改变 URL 的查询参数
    history.push(`/movie-list?key=${key}`);
  })
  // ....
  return (
    <div className="08-search-box">
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={handleSearchChange}
      />
      {/* 其它渲染逻辑*/}
    </div>
  );
}
```

​	看上去似乎没有什么问题：保证了关键字状态，还有 URL 参数的一致性

​	问题：从 URL 参数到内部 State 的同步只有组件第一次渲染才会发生，而后面的同步则是由输入框的 onChange 事件保证的，一致性很容易被破坏

​	也就是说，如果 URL 不是由用户在组件内搜索栏去改变的，而是其它地方，比如说组件外的某个按钮去触发改变的，那么组件由于已经渲染过了，其实内部的 searchKey 这个 State 是不会被更新的，一致性就会被破坏。

​	要解决这个问题，一个比较容易想到的思路就是我们要有更加完善的机制，让在 URL 不管因为什么原因而发生变化的时候，都能同步查询参数到 searchKey 这个 State。

​	如果遵循唯一数据源这个原则，把URL上的查询关键字作为唯一数据源，逻辑就简单了。

![img](https://static001.geekbang.org/resource/image/9f/de/9f534fa5235d0a45cafec91cbfa9e4de.png?wh=1462*572)

​	通过对比可以看到，左边引入了一个多余的 State 作为关键字这个状态，而为了保证一致性，就需要很多复杂的同步逻辑，比如说以下几点：

- URL 变化时，同步查询关键字到 State
- State 变化时，同步查询关键字到输入框
- 用户在输入框输入的时候，同步关键字到 URL 和 State。

​	在去掉多余的 State 后，我们就只需要在输入框和 URL 的查询参数之间做一个同步。那么实现的代码可以简化如下：

```react

import React, { useCallback, useMemo } from "react";
import { useSearchParam } from "react-use";

function SearchBox({ data }) {
  // 使用 useSearchParam 这个 Hook 用于监听查询参数变化
  const searchKey = useSearchParam("key") || "";
  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey, data]);

  const handleSearch = useCallback((evt) => {
    // 当用户输入时，直接改变 URL
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?key=${evt.target.value}`
    );
  }, []);
  return (
    <div className="08-filter-list">
      <h2>Movies (Search key from URL)</h2>
      <input
        value={searchKey}
        placeholder="Search..."
        onChange={handleSearch}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

​	当用户输入参数的时候，我们是直接改变当前的 URL，而不是去改变一个内部的状态。所以当 URL 变化的时候，我们使用了 useSearchParam 这样一个第三方的 Hook 去绑定查询参数，并将其显示在输入框内，从而实现了输入框内容和查询关键字这个状态的同步。

### 总结：==找到正确的数据来源并直接使用，避免中间状态==



# 二、异步处理

## 1. 实现自己的API Client



​	基于 fetch / axios，创建项目级的 API Client，之后所有的请求都会通过这个Client发出去。实现这样一个Client之后，就可以对项目中所有需要连接服务端的请求做一些通用的配置和处理，比如 Token、URL、错误处理等等。

​	通常来说，会包括以下几个方面：

1. 一些通用的 Header。比如 Authorization Token。
2. 服务器地址的配置。前端在开发和运行时可能会连接不同的服务器，比如本地服务器或者测试服务器，此时这个 API Client 内部可以根据当前环境判断该连接哪个 URL。
3. 请求未认证的处理。比如如果 Token 过期了，需要有一个统一的地方进行处理，这时就会弹出对话框提示用户重新登录。

​	以axios 为例，提供一个示例实现：

```react
import axios from "axios";

// 定义相关的 endpoint
const endPoints = {
  test: "https://60b2643d62ab150017ae21de.mockapi.io/",
  prod: "https://prod.myapi.io/",
  staging: "https://staging.myapi.io/"
};

// 创建 axios 的实例
const instance = axios.create({
  // 实际项目中根据当前环境设置 baseURL
  baseURL: endPoints.test,
  timeout: 30000,
  // 为所有请求设置通用的 header
  headers: { Authorization: "Bear mytoken" }
});

// 通过 axios 定义拦截器预处理所有请求
instance.interceptors.response.use(
  (res) => {
    // 可以假如请求成功的逻辑，比如 log
    return res;
  },
  (err) => {
    if (err.response.status === 403) {
      // 统一处理未授权请求，跳转到登录界面
      document.location = '/login';
    }
    return Promise.reject(err);
  }
);

export default instance;
```



## 2. 使用Hooks思考异步请求：封装远程资源



​	从 Hooks 角度来说，我们可以认为一个 Get 请求就是一个远程数据源。那么把这个数据源封装成 Hooks 后，使用远程 API 将会非常方便。

​	对于一个 Get 类型的 API，我们完全可以将它看成一个远程的资源。只是和本地数据不同的地方在于，它有三个状态，分别是：

1. Data: 指的是请求成功后服务器返回的数据
2. Error: 请求失败的话，错误信息将放到 Error 状态里
3. Pending: 请求发出去，在返回之前会处于 Pending 状态。

![img](https://static001.geekbang.org/resource/image/22/28/225476cd373efff40fe11d796a1da228.png?wh=800x450)

​	有了这三个状态，我们就能够在 UI 上去显示 loading，error 或者获取成功的数据了。使用起来会非常方便。

​	比起在组件内部直接发请求，我们只是把代码换了个地方，也就是写到了 Hook 里面。下面是代码的实现：

```react

import { useState, useEffect } from "react";
import apiClient from "./apiClient";

// 将获取文章的 API 封装成一个远程资源 Hook
const useArticle = (id) => {
  // 设置三个状态分别存储 data, error, loading
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // 重新获取数据时重置三个状态
    setLoading(true);
    setData(null);
    setError(null);
    apiClient
      .get(`/posts/${id}`)
      .then((res) => {
        // 请求成功时设置返回数据到状态
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        // 请求失败时设置错误状态
        setLoading(false);
        setError(err);
      });
  }, [id]); // 当 id 变化时重新获取数据

  // 将三个状态作为 Hook 的返回值
  return {
    loading,
    error,
    data
  };
};
```

​	使用的时候，我们就可以把组件的表现层逻辑写得非常简洁：

```react

import useArticle from "./useArticle";

const ArticleView = ({ id }) => {
  // 将 article 看成一个远程资源，有 data, loading, error 三个状态
  const { data, loading, error } = useArticle(id);
  if (error) return "Failed.";
  if (!data || loading) return "Loading...";
  return (
    <div className="exp-09-article-view">
      <h1>
        {id}. {data.title}
      </h1>
      <p>{data.content}</p>
    </div>
  );
};
```

​	通过这个hook的封装，将业务逻辑从React组件中抽离出来，组件只需要**把数据映射到JSX并显示出来**就可以了。

​	把每一个get请求做成一个hook，实现model和view的隔离

​	Q：为什么要给每个请求都定义一个 Hook 呢？我们直接提供一个通用的 Hook，比如 useRemoteData，然后把 API 地址传进去，难道不可以吗？

​	A：不是完全不可以，但这其实是为了**保证每个 Hook 自身足够简单**。一般来说，为了让服务器的返回数据满足 UI 上的展现要求，通常需要进一步处理。而这个对于每个请求的处理逻辑可能都不一样，通过一定的代码重复，能够避免产生太复杂的逻辑。同时呢，某个远程资源有可能是由多个请求组成的，那么 Hooks 中的逻辑就会不一样，因为要同时发出去多个请求，组成 UI 展现所需要的数据。所以，将每个 Get 请求都封装成一个 Hook ，也是为了让逻辑更清楚。



## 3. 多个 API 调用：如何处理并发或串行请求？

​	在实际的业务场景中，请求的控制往往更加复杂，以上述请求文章内容为例，如果还需要显示作者、作者头像，以及文章的评论列表，就需要发送**三个请求**：

1. 获取文章内容
2. 获取作者信息，包括名字和头像的地址
3. 获取文章的评论列表

​	这三个请求**同时包含了并发和串行的场景**：文章内容和评论列表是两个可以并发的请求，它们都通过 Article ID 来获取；用户的信息需要等文章内容返回，这样才能知道作者的 ID，从而根据用户的 ID 获取用户信息，这是一个串行的场景。

​	传统思路实现：

```react
// 并发获取文章和评论列表
const [article, comments] = await Promise.all([
  fetchArticle(articleId),
  fetchComments(articleId)
]);
// 得到文章信息后，通过 userId 获取用户信息
const user = await fetchUser(article.userId);
```

​	但是 **React 函数组件是一个同步的函数**，没有办法直接使用 await 这样的同步方法，而是要**把请求通过副作用去触发**。

​	因此，我们需要考虑用状态去驱动UI（React的本质），这意味着我们可以**从状态变化的角度去组织异步调用**。函数组件的每一次 render，都提供给我们根据状态执行不同操作的机会。**利用这个机制，通过不同的状态组合，来实现异步请求的逻辑**。

​	那么刚才这个显示作者和评论列表的业务需求，主要的实现思路就包括下面这么四点：

1. 组件首次渲染，只有文章 ID 这个信息，产生两个副作用去获取文章内容和评论列表
2. 组件首次渲染，作者 ID 还不存在，因此不发送任何请求
3. 文章内容请求返回后，获得了作者 ID，然后发送请求获取用户信息
4. 展示用户信息。

​	可以看到，这里的任何一个副作用，也就是**异步请求，都是基于数据的状态去进行的**。

​	所以，在代码层面，我们首先需要对 useUser 这个 Hook 做一个改造，使得它在没有传入 ID 的情况下，就不发送请求。对比上面的 useArticle 这个 Hook，唯一的变化就是**在 useEffect 里加入了ID 是否存在的判断**：

```react

import { useState, useEffect } from "react";
import apiClient from "./apiClient";

export default (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // 当 id 不存在，直接返回，不发送请求
    if (!id) return;
    setLoading(true);
    setData(null);
    setError(null);
    apiClient
      .get(`/users/${id}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [id]);
  return {
    loading,
    error,
    data
  };
};
```

​	那么，在文章的展示页面，我们就可以使用下面的代码来实现：

```react

import { useState } from "react";
import CommentList from "./CommentList";
import useArticle from "./useArticle";
import useUser from "./useUser";
import useComments from "./useComments";

const ArticleView = ({ id }) => {
  const { data: article, loading, error } = useArticle(id);
  const { data: comments } = useComments(id);
  const { data: user } = useUser(article?.userId);
  if (error) return "Failed.";
  if (!article || loading) return "Loading...";
  return (
    <div className="exp-09-article-view">
      <h1>
        {id}. {article.title}
      </h1>
      {user && (
        <div className="user-info">
          <img src={user.avatar} height="40px" alt="user" />
          <div>{user.name}</div>
          <div>{article.createdAt}</div>
        </div>
      )}
      <p>{article.content}</p>
      <CommentList data={comments || []} />
    </div>
  );
};
```

​	这里，结合代码我们**再理一下其中并发和串行请求的思路**。

​	因为文章的 ID 已经传进来了，因此 useArticle 和 useComments 这两个 Hooks 会发出两个并发的请求，来分别获取信息。而 userUser 这个 Hook 则需要等 article 内容返回后，才能获得 userId 信息，所以这是一个串行的请求：需要等文章内容的请求完成之后才能发起。



# 三、函数组件设计模式：如何应对复杂条件渲染场景



> 所谓设计模式，就是**针对特定场景，提供一种公认的最佳实践**。

## 1. 容器模式：实现按条件执行Hooks

​	==Hooks 必须在顶层作用域调用==，而不能放在条件判断、循环等语句中，同时也不能在可能的 return 语句之后执行。换句话说，Hooks 必须按顺序被执行到。

​	这是因为 React需要在函数组件内部维护所用到的 Hooks 的状态



```react
import { Modal } from "antd";
import useUser from "../09/useUser";

function UserInfoModal({ visible, userId, ...rest }) {
  // 当 visible 为 false 时，不渲染任何内容
  if (!visible) return null;
  // 这一行 Hook 在可能的 return 之后，会报错！
  const { data, loading, error } = useUser(userId);

  return (
    <Modal visible={visible} {...rest}>
      {/* 对话框的内容 */}
    </Modal>
  );
};
```

​                       

​	为了解决该规则带来的限制，需要用到一个间接的模式，即**容器模式**

​	具体做法是：**把条件判断的结果放到两个组件之中，确保真正 render UI 的组件收到的所有属性都是有值的。**

```react
// 定义一个容器组件用于封装真正的 UserInfoModal
export default function UserInfoModalWrapper({
  visible,
  ...rest, // 使用 rest 获取除了 visible 之外的属性
}) {
  // 如果对话框不显示，则不 render 任何内容
  if (!visible) return null; 
  // 否则真正执行对话框的组件逻辑
  return <UserInfoModal visible {...rest} />;
}
```

​	在容器模式中我们其实也可以看到，条件的隔离对象是多个子组件，这就意味着它通常用于一些比较大块逻辑的隔离。所以对于一些比较细节的控制，其实还有一种做法，就是把判断条件放到 Hooks 中去。

​	Hook不能放在条件语句中，但可以把条件语句自包含在Hook之中。

​	总体来说，通过这样一个容器模式，我们把原来需要条件运行的 Hooks 拆分成子组件，然后通过一个容器组件来进行实际的条件判断，从而渲染不同的组件，实现按条件渲染的目的。这在一些复杂的场景之下，也能达到拆分复杂度，让每个组件更加精简的目的。

## 2. render props 模式：重用 UI 逻辑

​	render props：==把一个 render 函数作为属性传递给某个组件，由这个组件去执行这个函数从而 render 实际的内容。==

​	Hooks的局限性：**只能用作数据逻辑的重用**

​	比如，我们需要显示一个列表，如果超过一定数量，则把多余的部分折叠起来，通过一个弹出框去显示。

​	对于这一类场景，**功能相同的部分**是：数据超过一定数量时，显示一个 “更多...”的文字；鼠标移上去则弹出一个框，用于显示其它的数据。

​	**功能不同的部分是**：每一个列表项如何渲染，是在使用的时候决定的。

```react
import { Popover } from "antd";

function ListWithMore({ renderItem, data = [], max }) {
  const elements = data.map((item, index) => renderItem(item, index, data));
  const show = elements.slice(0, max);
  const hide = elements.slice(max);
  return (
    <span className="exp-10-list-with-more">
      {show}
      {hide.length > 0 && (
        <Popover content={<div style={{ maxWidth: 500 }}>{hide}</div>}>
          <span className="more-items-wrapper">
            and{" "}
            <span className="more-items-trigger"> {hide.length} more...</span>
          </span>
        </Popover>
      )}
    </span>
  );
```

​	可以看到，这个组件接收了三个参数，分别是：

1. renderItem：用于接收一个函数，由父组件决定如何渲染一个列表项
2. data：需要渲染的数据
3. max：最多显示几条数据。

```react
// 这里用一个示例数据
import data from './data';

function ListWithMoreExample () => {
  return (
    <div className="exp-10-list-with-more">
      <h1>User Names</h1>
      <div className="user-names">
        Liked by:{" "}
        <ListWithMore
          renderItem={(user) => {
            return <span className="user-name">{user.name}</span>;
          }}
          data={data}
          max={3}
        />
      </div>
      <br />
      <br />
      <h1>User List</h1>
      <div className="user-list">
        <div className="user-list-row user-list-row-head">
          <span className="user-name-cell">Name</span>
          <span>City</span>
          <span>Job Title</span>
        </div>
        <ListWithMore
          renderItem={(user) => {
            return (
              <div className="user-list-row">
                <span className="user-name-cell">{user.name}</span>
                <span>{user.city}</span>
                <span>{user.job}</span>
              </div>
            );
          }}
          data={data}
          max={5}
        />
      </div>
    </div>
  );
};
```

​	可以看到，代码里使用了两个 ListWithMore 组件，通过 renderItem 这个属性，我们可以自主决定该如何渲染每一个列表项，从而把一部分 UI 逻辑抽象出来，形成一个可复用的逻辑，以简化不同场景的使用。



# 四、事件处理：创建自定义事件

## 1. React原生事件

​	回调函数是否需要 useCallback **和函数的复杂度没有必然关系**，而是和回调函数**绑定的目标组件**有关。

​	而对于原生的 DOM 节点，比如 button、input 等，我们是不用担心重新渲染的。所以呢，如果你的事件处理函数是传递给原生节点，那么不写 callback，也几乎不会有任何性能的影响。

​	但是**如果你使用的是自定义组件，或者一些 UI 框架的组件，那么回调函数还都应该用 useCallback 进行封装。**

### React合成事件（Synthetic Events）

​	由于虚拟DOM的存在，导致在React中绑定一个事件到原生的 DOM 节点，事件也并不是绑定在对应的节点上，而是所有的事件都绑定在根节点上

- before React 17: 绑定在document
- after：绑定在App的根节点

原因如下：

1. 虚拟 DOM render 的时候， DOM 很可能还没有真实地 render 到页面上，所以无法绑定事件。
2. React 可以屏蔽底层事件的细节，避免浏览器的兼容性问题。同时呢，对于 React Native 这种不是通过浏览器 render 的运行时，也能提供一致的 API。

​	在浏览器的原生机制中，事件会从被触发的节点往父节点冒泡，然后沿着整个路径一直到根节点，所以根节点其实是可以收到所有的事件的。这也称之为==浏览器事件的冒泡模型==。

​	因此，无论事件在哪个节点被触发， React 都可以通过事件的 srcElement 这个属性，知道它是从哪个节点开始发出的，这样 React 就可以收集管理所有的事件，然后再以一致的 API 暴露出来。



## 2. 创建自定义事件

​	所谓的自定义事件，其实就是利用了属性传递回调函数给子组件，实现事件的触发。本质上，它和原生事件的机制是完全不一样的，原生事件是浏览器层面的事件，而自定义事件则是纯组件实现的一种机制。

​	看一个用 Hooks 封装键盘事件的例子：

```react
import { useEffect, useState } from "react";

// 使用 document.body 作为默认的监听节点
const useKeyPress = (domNode = document.body) => {
  const [key, setKey] = useState(null);
  useEffect(() => {
    const handleKeyPress = (evt) => {
      setKey(evt.keyCode);
    };
    // 监听按键事件
    domNode.addEventListener("keypress", handleKeyPress);
    return () => {
      // 接触监听按键事件
      domNode.removeEventListener("keypress", handleKeyPress);
    };
  }, [domNode]);
  return key;
};
```

​	有了这个 Hook，我们在使用的时候就非常方便，无需做任何事件的绑定，而是只要把键盘按键看做是一个不断变化的数据源，这样，就可以去实时监听某个 DOM 节点上触发的键盘事件了。

​	例：

```react
import useKeyPress from './useKeyPress';

function UseKeyPressExample() => {
  const key = useKeyPress();
  return (
    <div>
      <h1>UseKeyPress</h1>
      <label>Key pressed: {key || "N/A"}</label>
    </div>
  );
};
```

# 五、Hooks 与 Form 处理



​	React：状态驱动

​	表单：事件驱动

​	需要做的：同步元素状态与表单状态，维护表单状态

## 1. 在表单中使用 React 组件：受控组件和非受控组件

​	**受控组件**：表单元素的值，表单元素值变化的处理都由外部管控

```react
function MyForm() {
  const [value, setValue] = useState('');
  const handleChange = useCallback(evt => {
    setValue(evt.target.value);
  }, []);
  return <input value={value} onChange={handleChange} />;
}
```

​	**非受控组件**：表单元素的值完全属于内部状态，而不是由父组件决定

```react
import { useRef } from "react";

export default function MyForm() {
  // 定义一个 ref 用于保存 input 节点的引用
  const inputRef = useRef();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // 使用的时候直接从 input 节点获取值
    alert("Name: " + inputRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" ref={inputRef} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

​	受控组件与非受控组件相比：优点是可以可以更灵活的控制表单组件，实现一些特殊的需求，缺点是频繁触发onChange，导致组件重新渲染，若表单复杂，会导致卡顿

## 2. 使用 Hooks 简化表单处理

​	总结所有受控组件的处理，都会遵循下面两个步骤：

1. 设置一个 State 用于绑定到表单元素的 Value
2. 监听表单元素的 onChange 事件，将表单值同步到 value 这个 state

​	类似如下代码实现受控组件处理：

```react
function MyForm() {
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  // 更多表单元素状态...
  
  return (
    <form>
      <Field1 value={value1} onChange={setValue1} />
      <Field1 value={value2} onChange={setValue2} />
      {/*更多表单元素*/}
    </form>
  )
}
```

​	表单状态的管理，其实就是对表单内所有元素实现如上处理的过程，可以总结为三个部分：

1. 字段的名字
2. 绑定 value 值
3. 处理 onChange 事件

​	因为对每个表单元素的处理逻辑都是一致的，所以可以用 Hooks 实现逻辑的重用：

```react
import { useState, useCallback } from "react";

const useForm = (initialValues = {}) => {
  // 设置整个 form 的状态：values
  const [values, setValues] = useState(initialValues);
  
  // 提供一个方法用于设置 form 上的某个字段的值
  const setFieldValue = useCallback((name, value) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  }, []);

  // 返回整个 form 的值以及设置值的方法
  return { values, setFieldValue };
};
```

有了这样一个 Hook，就可以对表单内所有元素的状态进行统一的管理了：

```react
import { useCallback } from "react";
import useForm from './useForm';

export default () => {
  // 使用 useForm 得到表单的状态管理逻辑
  const { values, setFieldValue } = useForm();
  // 处理表单的提交事件
  const handleSubmit = useCallback(
    (evt) => {
      // 使用 preventDefault() 防止页面被刷新
      evt.preventDefault();
      console.log(values);
    },
    [values],
  );
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          value={values.name || null}
          onChange={(evt) => setFieldValue("name", evt.target.value)}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          value={values.email || null}
          onChange={(evt) => setFieldValue("email", evt.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
```

​	这正是大部分开源的表单方案遵循的核心原理：**把表单的状态管理单独提取出来，成为一个可重用的 Hook**

## 3. 处理表单验证

​	实现验证逻辑，同样遵循**状态驱动**的原则：

- 首先：如何定义这样的错误状态
- 其次：如何去设置这个错误状态

​	下面代码演示如何给 useForm 这个 Hook 增加验证的 API 接口：

```react
// 除了初始值之外，还提供了一个 validators 对象，
// 用于提供针对某个字段的验证函数
const useForm = (initialValues = {}, validators) => {
  const [values, setValues] = useState(initialValues);
  // 定义了 errors 状态
  const [errors, setErrors] = useState({});

  const setFieldValue = useCallback(
    (name, value) => {
      setValues((values) => ({
        ...values,
        [name]: value,
      }));

      // 如果存在验证函数，则调用验证用户输入
      if (validators[name]) {
        const errMsg = validators[name](value);
        setErrors((errors) => ({
          ...errors,
          // 如果返回错误信息，则将其设置到 errors 状态，否则清空错误状态
          [name]: errMsg || null,
        }));
      }
    },
    [validators],
  );
  // 将 errors 状态也返回给调用者
  return { values, errors, setFieldValue };
};
```

  使用 validator：

```react
function MyForm() {
  // 用 useMemo 缓存 validators 对象
  const validators = useMemo(() => {
    return {
      name: (value) => {
        // 要求 name 的长度不得小于 2
        if (value.length < 2) return "Name length should be no less than 2.";
        return null;
      },
      email: (value) => {
        // 简单的实现一个 email 验证逻辑：必须包含 @ 符号。
        if (!value.includes("@")) return "Invalid email address";
        return null;
      },
    };
  }, []);
  // 从 useForm 的返回值获取 errors 状态
  const { values, errors, setFieldValue } = useForm({}, validators);
  // UI 渲染逻辑...
}
```

# 六、浮动层：如何展示对话框及传参

​	在实际开发中，对话框常常会有如下使用场景：

​	需要同时在布局的不同位置触发对话框，参考如下场景：

![img](https://static001.geekbang.org/resource/image/f8/2d/f8be7ed1yyac44c70caa9bfc74ce4c2d.png?wh=1470x726)

​	有一个左右布局的页面。左边栏有一个新建用户的按钮，右边是一个用户列表。点击新建用户的按钮，或者点击表格中的编辑按钮，都会显示同一个对话框。这个对话框根据是否传入用户数据作为参数，来决定是新建还是编辑用户。

​	在 React 中，所有的 UI 都是状态驱动，这意味着我们必须将对话框相关的状态，以及状态管理逻辑提升到父组件中去实现，因此一般会用类似下面的代码逻辑去实现：

```react
function MainLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const showUserModal = (user) => {
    setModalVisible(true);
    setUser(user);
  }
  return (
    <div className="main-layout">
      <Sider onNewUser={showUserModal}/>
      <UserList onEditUser={user => showUserModal(user)}/>
      <UserInfoModal visible={modalVisible} user={user} />
    </div>
  );
}
```

​	这种写法存在如下两个问题：

1. **语义隔离不明确**。MainLayout 这个组件应该只做布局的事情，而不应该有其他的业务逻辑。但是在这里，由于我们加入了用户信息处理的逻辑，就让本不相关的两块功能产生了依赖。而且，如果要增加另外一个对话框，那意味着又要在 Layout 上增加新的业务逻辑了。这样的话，代码很快就会变得臃肿，且难以理解和维护。
2. **难以扩展**。现在我们只是在 MainLayout 下面的两个组件共享了对话框，但是如果和 MainLayout 同级的组件也要访问这个对话框呢？又或者， MainLayout 下面的某个深层级的孙子组件也要能显示同一个对话框呢？这样处理的话就会非常麻烦。前者意味着代码需要重构，继续提升状态到父组件；后者意味着业务逻辑处理更复杂，需要通过层层的自定义事件回调来完成。

​	这些问题的本质就是，**一个实现业务逻辑的 Modal 究竟应该在哪个组件中去声明？又该怎么和它进行交互呢？**

​	接下来，**用一个统一的方式去管理对话框，从而让对话框相关的业务逻辑能够更加模块化，以及和其他业务逻辑进行解耦**。

## 思路：使用全局状态管理所有对话框

​	对话框在本质上，其实是独立于其他界面的一个窗口，用于完成一个独立的功能。

​	对话框的这样一个本质，就决定了在组件层级上，它其实是应该独立于各个组件之外的。所以，在定义一个对话框的时候，其定位基本会等价于**定义一个具有唯一 URL 路径的页面**。只是前者由弹出层实现，后者是页面的切换。

​	这个过程和页面 URL 的切换非常类似，那么我们就可以给每一个对话框定义一个全局唯一的 ID，然后通过这个 ID 去显示或者隐藏一个对话框，并且给它传递参数。基于这样一个设想，我们就来尝试去设计一个 API 去做对话框的全局管理。假设我们将这个对话框的实现命名为 NiceModal，那么我们的目标就是能够用以下的方式去操作对话框：

```react
// 通过 create API 创建一个对话框，主要为了能够全局的控制对话框的展现
const UserInfoModal = NiceModal.create(
  'user-info-modal',
  RealUserInfoModal
);

// 创建一个 useNiceModal 这样的 Hook，用于获取某个 id 的对话框的操作对象
const modal = useNiceModal('user-info-modal');
// 通过 modal.show 显示一个对话框，并能够给它传递参数
modal.show(args);
// 通过 modal.hide 关闭对话框
modal.hide();
```

​	如果有这样的 API，那么无论在哪个层级的组件，只要知道某个 Modal 的 ID，那就都可以统一使用这些对话框，而不再需要考虑该在哪个层级的组件去定义了，使用起来会更加直观。

## 实现：创建 NiceModal 组件和相关 API

​	首先要考虑的便是如何管理全局状态，在这里我们以 Redux 为例，来创建一个可以处理所有对话框状态的 reducer：

```react
const modalReducer = (state = { hiding: {} }, action) => {
  switch (action.type) {
    case "nice-modal/show":
      const { modalId, args } = action.payload;
      return {
        ...state,
        // 如果存在 modalId 对应的状态，就显示这个对话框
        [modalId]: args || true,
        // 定义一个 hiding 状态用于处理对话框关闭动画
        hiding: {
          ...state.hiding,
          [modalId]: false,
        },
      };
    case "nice-modal/hide":
     const { modalId, force } = action.payload;
      // 只有 force 时才真正移除对话框
      return action.payload.force
        ? {
            ...state,
            [modalId]: false,
            hiding: { [modalId]: false },
          }
        : { ...state, hiding: { [.modalId]: true } };
    default:
      return state;
  }
};
```

​	这段代码的**主要思路**就是通过 Redux 的 store 去存储每个对话框状态和参数。在这里，我们设计了两个 action ，分别用来显示和隐藏对话框。\

​	特别要注意的是，这里我们加入了 hiding 这样一个状态，用来处理对话框关闭过程的动画，确保用户体验。

​	为了让 Redux 的 action 使用起来更方便，我们可以定义一个 useNiceModal 这样的 Hook，在其内部封装对 Store 的操作，从而实现对话框状态管理的逻辑重用，并以更友好的方式暴露给用户：

```react
// 使用 action creator 来创建显示和隐藏对话框的 action
function showModal(modalId, args) {
  return {
    type: "nice-modal/show",
    payload: {
      modalId,
      args,
    },
  };
}

function hideModal(modalId, force) {
  return {
    type: "nice-modal/hide",
    payload: {
      modalId,
      force,
    },
  };
}

// 创建自定义 Hook 用于处理对话框逻辑
export const useNiceModal = (modalId) => {
  const dispatch = useDispatch();
  // 封装 Redux action 用于显示对话框
  const show = useCallback((args) => {
    dispatch(showModal(modalId, args));
  }, [
    dispatch,
    modalId,
  ]);
  // 封装 Redux action 用于隐藏对话框
  const hide = useCallback((force) => {
    dispatch(hideModal(modalId, force));
  }, [
    dispatch,
    modalId,
  ]);

  const args = useSelector((s) => s[modalId]);
  const hiding = useSelector((s) => s.hiding[modalId]);

  // 只要有参数就认为对话框应该显示，如果没有传递 args，在reducer 中会使用
  // 默认值 true
  return { args, hiding, visible: !!args, show, hide };
};
```

​	同时，我们可以实现 NiceModal 这样一个组件，去封装通用的对话框操作逻辑。比如关闭按钮，确定按钮的事件处理，等等。

```react
function NiceModal({ id, children, ...rest }) {
  const modal = useNiceModal(id);
  return (
    <Modal
      onCancel={() => modal.hide()} // 默认点击 cancel 时关闭对话框
      onOk={() => modal.hide()} // 默认点击确定关闭对话框
      afterClose={() => modal.hide(true)} // 动画完成后真正关闭
      visible={!modal.hiding}
      {...rest} // 允许在使用 NiceModal 时透传参数给实际的 Modal
    >
      {children}
    </Modal>
  );
}
```

​	最后用容器模式封装一下，它会在对话框不可见时直接返回null，从而不渲染任何内容；

```react
export const createNiceModal = (modalId, Comp) => {
  return (props) => {
    const { visible, args } = useNiceModal(modalId);
    if (!visible) return null;
    return <Comp {...args} {...props} />;
  };
};
```

​	这样，我们就实现了一个 NiceModal 这样的全局对话框管理框架。基于这样一个框架，使用对话框的时候就会非常方便。比如下面的代码：

```react
import { Button } from "antd";
import NiceModal, {
  createNiceModal,
  useNiceModal,
} from "./NiceModal";

const MyModal = createNiceModal("my-modal", () => {
  return (
    <NiceModal id="my-modal" title="Nice Modal">
      Hello NiceModal!
    </NiceModal>
  );
});

function MyModalExample() {
  const modal = useNiceModal("my-modal");
  return (
    <>
      <Button type="primary" onClick={() => modal.show()}>
        Show Modal
      </Button>
      <MyModal />
    </>
  );
}
```

​	在这个例子中，我们首先定义了一个简单的 MyModal 组件，这样我们就可以把多画框逻辑写在单独的组件中，而不是嵌入到父组件。在这个 MyModal 组件内部使用了 NiceModal 作为基础，从而可以绑定对话框 ID，并重用通用的对话框逻辑。

​	通过这个 Modal ID，我们就能够在应用的任何组件中去管理这个对话框了。

​	可以看到，在这部分我们基本完整实现了一个 NiceModal 的机制，它可以帮助你很好地去全局管理对话框。不过你再仔细点的话，会发现这里其实还缺少了一个直观的机制，那就是如何处理对话框的返回值。

## 处理对话框返回值

如果说对话框和页面这两种 UI 模式基本上是一致的，都是独立窗口完成独立逻辑。但是在用户交互上，却是有一定的差别

- 对话框可能需要返回值给调用者；
- 而页面切换一般不会关心页面执行的结果是什么。

​	那么基于上面的 NiceModal 实现逻辑，现在的问题就是，**我们应该如何让调用者获得返回值呢？**

​	考虑到我们可以把用户在对话框中的操作看成一个异步操作逻辑，那么用户在完成了对话框中内容的操作之后，就认为异步逻辑完成了。因此我们可以**利用Promise** 来完成这样的逻辑。

​	那么，我们要实现的 API 如下所示：

```react
const modal = useNiceModal('my-modal');
// 实现一个 promise API 来处理返回值
modal.show(args).then(result => {});
```

​	事实上，要实现这样一个机制并不困难，就是在 useNiceModal 这个 Hook 的实现中提供一个 modal.resolve 这样的方法，能够去 resolve modal.show 返回的 Promise。

实现的代码思路如下所示：

```react
const modal = useNiceModal('my-modal');
// 实现一个 promise API 来处理返回值
modal.show(args).then(result => {});
```

​	代码的核心思路就是**将 show 和 resolve 两个函数通过 Promise 联系起**来。因为两个函数的调用位置不一样，所以我们使用了一个局部的临时变量，来存放 resolve 回调函数。通过这样的机制，就可以在对话框中去调用 modal.resolve 来返回值了。

​	具体使用：

```react
// 使用一个 object 缓存 promise 的 resolve 回调函数
const modalCallbacks = {};
export const useNiceModal = (modalId) => {
  const dispatch = useDispatch();
  const show = useCallback(
    (args) => {
      return new Promise((resolve) => {
        // 显示对话框时，返回 promise 并且将 resolve 方法临时存起来
        modalCallbacks[modalId] = resolve;
        dispatch(showModal(modalId, args));
      });
    },
    [dispatch, modalId],
  );
  const resolve = useCallback(
    (args) => {
      if (modalCallbacks[modalId]) {
        // 如果存在 resolve 回调函数，那么就调用
        modalCallbacks[modalId](args);
        // 确保只能 resolve 一次
        delete modalCallbacks[modalId];
      }
    },
    [modalId],
  );
  
  // 其它逻辑...

  // 将 resolve 也作为返回值的一部分
  return { show, hide, resolve, visible, hiding };
};
```

​	这段示意代码包括两个部分。

​	首先是在 UserList 的表格组件中，由编辑按钮触发对话框的显示，并在对话框返回后，将用户输入更新到表格。

​	第二部分则是在对话框中，用户点击了确定按钮后调用 modal.resolve 方法，将用户输入返回给 UserList 组件，从而完成整个编辑流程。
