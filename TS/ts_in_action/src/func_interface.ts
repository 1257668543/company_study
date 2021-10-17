// let minus: (x: number, y: number) => number
// 等价于
// interface Minus {
//   (x: number, y: number): number
// }

// 类型别名
type Minus = (x: number, y: number) => number

let minus: Minus = (a, b) => a + b

// 混合类型接口 默认单例，可以通过函数创建多个实例
interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

// 创建多个实例
function getLib() {
  let lib: Lib = (() => {}) as Lib; // 增加属性无法绕过编译器类型检查，使用类型断言
  lib.version = '1.0'
  lib.doSomething = () => {}
  return lib;
}

let lib1 = getLib();
lib1();
lib1.doSomething();
let lib2 = getLib();
