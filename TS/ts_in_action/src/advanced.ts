// ------------------------------类型推断
let a = 1
// 最佳类型推断
let b = [1, null]

let c = (x = 1) => x + 1

// 上下文推断
window.onkeydown = (event) => {
  // console.log(event.button)
}

// 类型断言
interface Foo {
  bar: number
}
// let foo = {} as Foo
// foo.bar = 1
let foo: Foo = {
  bar: 1
}


// ------------------------------类型兼容
// X 兼容 Y：X（目标类型） = Y （源类型）
let s: string = 'a'
s = null

// 接口兼容性: 成员少的兼容成员多的
interface X {
  a: any;
  b: any;
}
interface Y {
  a: any;
  b: any;
  c: any;
}
let x1: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}
x1 = y
// y = x1

// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}

// 1) 参数个数: 目标函数的参数个数一定要小于等于源函数的参数个数
let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2)

// 固定参数 可选参数 剩余参数: 固定参数与剩余参数兼容其余二者，可选参数不兼容固定与剩余参数
let a1 = (p1: number, p2: number) => {}
let b1 =  (p1?: number, p2?: number) => {}
let c1 = (...args: number[]) => {}
a1 = b1
a1 = c1
// b1 = a1
// b1 = c1
c1 = a1
c1 = b1

// 2）参数类型: 参数多兼容参数少的
let handler3 = (a: string) => {}
// hof(handler3);

interface Point3D {
  x: number,
  y: number,
  z: number
}

interface Point2D {
  x: number,
  y: number
}

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
p3d = p2d
// p2d = p3d

// 3) 返回值类型: 成员少的兼容成员多的
let f1 = () => ({name: 'Alice'});
let g3 = () => ({name: 'Alice', location: 'BeiJing'});
f1 = g3
// g3 = f1

// 函数重载兼容，重载列表为目标函数，实现为源函数
function overload(a: number, b: number): number;
function overload(a: string, b: string): string;
function overload(a: any, b: any): any{};

// 枚举兼容性
enum Fruit { Apple, Banana }
enum Color { Red, Yellow }
let fruit: Fruit.Apple = 3
let no: number = Fruit.Apple
// let color: Color.Red = Fruit.Apple

// 类兼容性 构造函数与静态属性不参与比较，含有静态成员时只有父子类之间兼容
class A {
  constructor(p: number, q: number) {}
  id: number = 1
  private name: string = ''
}
class B {
  static s = 1
  constructor(p: number) {}
  id: number = 2
  private name: string = ''
}
let aa = new A(1, 2);
let bb = new B(1)
// aa = bb
// bb = aa
class C1 extends A {}
let cc = new C1(1, 2)
aa = cc;
cc = aa;

// 泛型兼容性 
// 只有类型参数T被成员使用才会影响泛型接口兼容性
interface Empty<T> {
  value: T
}
// let obj1: Empty<number> = {};
// let obj2: Empty<string> = {};
// obj1 = obj2

let log3 = <T>(x: T): T => {
  console.log('x')
  return x
}
let log4 = <T>(y: T): T => {
  console.log('y')
  return y;
}
log3 = log4

// ------总结：
//  结构之间兼容：成员少的兼容成员多的
//  函数之间兼容：参数多的兼容参数少的