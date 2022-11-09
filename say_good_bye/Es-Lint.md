# Es-Lint-Rules

![Es-lint](https://cn.eslint.org/img/logo.svg)

[TOC]

## 1. 禁止使用异步函数作为Promise executor（no-async-promise-executor ）



### 规则：

***此规则旨在禁止使用异步的 Promise executor 函数。***

- 如果异步 executor 函数抛出一个错误，这个错误将会丢失，并且不会导致新构造的 `Promise` 被拒绝。这可能使会使调试和处理一些错误变得困难。
- 如果一个 Promise executor 函数使用了 `await`，这通常表示实际上没有必要使用 `new Promise` 构造函数，或者可以减少 `new Promise` 构造函数的范围。

### 示例：

**==错误==** 代码示例：

```js
const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = new Promise(async (resolve, reject) => {
  resolve(await foo);
});
```

**==正确==** 代码示例：

```js
const foo = new Promise((resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = Promise.resolve(foo);
```



*小记：==await对于等待值的类型不同会进行不同的表达式运算：==*

+ *promise对象：*
  - 阻塞线程。直至promise对象resolve一个值，并将该值作为它的返回值。==若promise对象进行reject，则不处理该值，释放线程。==
+ 其他类型：
  + 不阻塞线程，运算结果即为该值。

---

## 2. 禁止在循环中 出现 `await` (no-await-in-loop)



在迭代器的每个元素上执行运算是个常见的任务。然而，每次运算都执行 `await`，意味着该程序并没有充分利用 `async`/`await` 并行的好处。

通常，代码应该重构为立即创建所有 promise，然后通过 `Promise.all()` 访问结果。否则，每个后续的操作将不会执行，直到前一个操作执行完毕。

### 规则：

***该规则禁止在循环体中使用 `await`。***



### 示例：

**正确** 代码示例：

```js
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    results.push(bar(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  return baz(await Promise.all(results));
}
```

**错误** 代码示例：

```js
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await bar(thing));
  }
  return baz(results);
}
```



### 何时禁用：

​	在许多情况下，一个循环的迭代实际上并不是相互独立的。例如，一次迭代的输出可能是另一次迭代的输入。或者，循环可以重试不成功的异步操作。或者，循环可用来防止代码发送并行处理过多的请求。在这种情况下，在循环中使用 `await` 是有意义的，并建议使用标准的 ESLint 禁用注释来禁用规则。

---

## 3. 禁止与 -0 进行比较 (no-compare-neg-zero)

### 规则：

​	*该规则对试图与 -0 进行比较的代码发出警告，因为并不会达到预期。也就是说像 x === -0 的代码对于 +0 和 -0 都有效。*

**==错误==** 代码示例：

```js
if (x === -0) {
    // doSomething()...
}
```

==**正确的**== 代码示例：

```js
if (x === 0) {
    // doSomething()...
}
if (Object.is(x, -0)) {
    // doSomething()...
}
```

*小记：==`Object.is()`实现原理==*

```js
 Object.is = function(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } 
      return x !== x && y !== y;
  };
```

---

## 4. 禁止在 case 或 default 子句中出现词法声明 (no-case-declarations)

### 规则：

​	*该规则禁止词法声明 (`let`、`const`、`function` 和 `class`) 出现在 `case`或`default` 子句中。原因是，词法声明在整个 `switch` 语句块中是可见的，但是它只有在运行到它定义的 case 语句时，才会进行初始化操作。*

​	*为了保证词法声明语句只在当前 case 语句中有效，将你子句包裹在块中。*

### 示例：

**==错误==** 代码示例：

```js
/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

switch (foo) {
    case 1:
        let x = 1;
        break;
    case 2:
        const y = 2;
        break;
    case 3:
        function f() {}
        break;
    default:
        class C {}
}
```

**==正确==** 代码示例：

```js
/*eslint no-case-declarations: "error"*/
/*eslint-env es6*/

// Declarations outside switch-statements are valid
const a = 0;

switch (foo) {
    // The following case clauses are wrapped into blocks using brackets
    case 1: {
        let x = 1;
        break;
    }
    case 2: {
        const y = 2;
        break;
    }
    case 3: {
        function f() {}
        break;
    }
    case 4:
        // Declarations using var without brackets are valid due to function-scope hoisting
        var z = 4;
        break;
    default: {
        class C {}
    }
}
```

### 何时禁用

​	如果你依赖 case 落空行为，并想访问 case 块中引入的绑定，可以关闭此规则。

---

## 5. 禁止使用空解构模式 (no-empty-pattern)

### 解释：

*当使用解构赋值时，可能创建了一个不起作用的模式。把空的花括号放在嵌入的对象的解构模式右边时，就会产生这种情况，例如：*

```
// doesn't create any variables
var {a: {}} = foo;
```

*在以上代码中，没有创建新的变量，因为 `a` 只是一个辅助位置，而 `{}` 将包含创建的变量，例如：*

```
// creates variable b
var {a: { b }} = foo;
```

*在许多情况下，作者本来打算使用一个默认值，却错写成空对象，例如：*

```
// creates variable a
var {a = {}} = foo;
```

*这两种模式直接的区别是微妙的，因为空模式看起来像是一个对象字面量。*



### 规则：

*此规则目的在于标记出在解构对象和数组中的任何的空模式，每当遇到一个这样的空模式，该规则就会报告一个问题。*



### 示例：

**==错误==** 代码示例：

```js
/*eslint no-empty-pattern: "error"*/

var {} = foo;
var [] = foo;
var {a: {}} = foo;
var {a: []} = foo;
function foo({}) {}
function foo([]) {}
function foo({a: {}}) {}
function foo({a: []}) {}
```

**==正确==** 代码示例：

```js
/*eslint no-empty-pattern: "error"*/

var {a = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
```

---

## 6. 建议使用剩余参数代替 `arguments` (prefer-rest-params)

### 解释：

​	*ES2015 里有剩余参数。我们可以利用这个特性代替变参函数的 `arguments` 变量。*

*`arguments` 没有 `Array.prototype` 方法，所以有点不方便。*

### 规则：

​	*该规则旨在减少 `arguments` 变量的使用。*

### 示例：

​	**==错误==** 的代码示例：

```
function foo() {
    console.log(arguments);
}

function foo(action) {
    var args = Array.prototype.slice.call(arguments, 1);
    action.apply(null, args);
}

function foo(action) {
    var args = [].slice.call(arguments, 1);
    action.apply(null, args);
}
```

**==正确==** 的代码示例：

```
function foo(...args) {
    console.log(args);
}

function foo(action, ...args) {
    action.apply(null, args); // or `action(...args)`, related to the `prefer-spread` rule.
}

// Note: the implicit arguments can be overwritten.
function foo(arguments) {
    console.log(arguments); // This is the first argument.
}
function foo() {
    var arguments = 0;
    console.log(arguments); // This is a local variable.
}
```

### 何时禁用：

*该规则不应该在 ES3/5 环境中使用。*

*在 ES2015 (ES6) 或更高的版本中，如果你不想收到关于 `arguments` 变量的通知，那么禁用此规则。*
