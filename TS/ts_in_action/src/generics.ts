// -------------------------泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定

// // 泛型函数：保证输入参数和输出一致
// function log<T>(value: T): T{
//   console.log(value);
//   return value;
// }
// // 类型别名定义泛型函数类型并实现
// type Log = <T>(value: T) => T
// let myLog: Log = log

// // 泛型函数调用方式

// // 指定类型
// log<string[]>(['a', 'b'])
// // 类型推断
// log(['a', 'b'])

// // 泛型接口
// interface Log<T = string> {
//   (value: T): T,
// }
// let myLog: Log = log
// myLog('1')


// -------------------------泛型类与泛型约束
class Log<T> {
  run(value: T) {
    console.log(value);
    return value
  }
}
let log1 = new Log<number>();
log1.run(1)
let log2 = new Log();
log2.run('1')

// 类型约束
interface Length {
  length: number
}
function log<T extends Length>(value: T): T {
  console.log(value, value.length);
  return value;
}
log([1])
log('123')
log({length: 1})

// --------------------------泛型的好处
// 1. 函数和类可以轻松地支持多种类型，增强程序的扩展性
// 2. 不必写多条函数重载，冗长的联合类型声明，增强代码的可读性
// 3. 灵活控制类型之间的约束