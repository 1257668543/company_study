const foo = { a: 1, b: 2 };

const { a: { b } } = foo;
console.log(b);