// 函数定义

// 指定参数类型，返回值由ts类型推断指定
function add1(x: number, y: number) {
  return x + y
}

// 通过变量定义函数类型
let add2: (x: number, y: number) => number

// 类型别名
type add3 = (x: number, y: number) => number

// 接口
interface add4 {
  (x: number, y: number): number
}

// ts对函数的 参数个数 & 类型 都有要求
// add1(1, 2, 3)

// 可选参数：可选参数必须位于可选参数之后
function add5(x: number, y?: number) {
  return y ? x + y : x;
}
add5(1)

// 必选参数前默认参数需要传入undefined
function add6(x: number, y = 0, z: number, q = 1){
  return x + y + z + q;
}
console.log(add6(1, undefined, 3))

// 剩余参数
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}

console.log(add7(1, 2, 3, 4, 5));

// 函数重载 函数定义列表
// 在更宽泛的版本中实现
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}
console.log(add8(1, 2, 3));
console.log(add8('a', 'b', 'c'));

