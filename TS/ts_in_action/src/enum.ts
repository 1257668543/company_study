// 数字枚举: 反向映射，递增
enum Role {
  Reporter = 1,
  Developer,
  Maintainer,
  Owner,
  Guest
}
console.log(Role.Reporter);
console.log(Role);

// 字符串枚举: 不支持反向映射
enum Message {
  Success = '恭喜你，成功了',
  Fail = '抱歉，失败了'
}

// 异构枚举
enum Answer {
  N,
  Y = 'Yes'
}

// 枚举成员: 只读类型，定义后不能修改
// Role.Reporter = 2
enum Char {
  // const
  a, // 没有初始值
  b = Char.a, // 已有枚举成员的引用
  c = 1 + 3, // 常量表达式
  // computed 非常量表达式，值被保留到运行环境计算
  d = Math.random(),
  e = '123'.length,
  f = 4 // computed member 后的成员需要初始值
}

// 常量枚举: const 关键字声明，编译后没有内容
const enum Month {
  Jan,
  Feb,
  Mar
}
// 运行时枚举被替换为常量
let month = [Month.Jan, Month.Feb, Month.Mar]

// 枚举类型: 不同枚举类型不能比较
enum E {a, b} // 无初始值枚举
enum F { a = 0, b = 1 } // 数字枚举
enum G { a = 'apple', b = 'banana' } // 字符串枚举的值只能是枚举成员

let e: E = 3
let f: F = 3
// e === f

let e1: E.a = 1
let e2: E.b
// e1 === e2
let e3: E.a = 1
e1 === e3

let g1: G = G.b
let g2: G.a = G.a