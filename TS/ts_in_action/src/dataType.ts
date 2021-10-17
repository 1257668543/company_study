// 原始类型 联合类型 a | b | ...
let bool: boolean = true
let num: number | undefined | null = 123
let str: string = 'abc'
// str = 123

// 数组: 两种声明方式，Array：ts内置泛型，支持联合类型< | >
let arr1: number[] = [1, 2, 3]
let arrr2: Array<number | string> = [1, 2, 3, '4']

// 元组: 同时限制长度与类型，可用数组api越界存储，但不允许读取越界部分
let tuple: [number, string] = [0, '1']
// tuple.push(2)
// console.log(tuple)
// tuple[2]

// 函数 两种定义方式：1.类型推断 2.定义输入输出后实现
let add = (x: number, y: number) => x + y
let compute: (x: number, y: number) => number
compute = (a, b) => a + b

// 对象
let o: object = {}
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 3

// symbol
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2);

// undefined, null，规定 undefined 与 null 是其他类型子类型，但默认不可直接赋给其他类型变量，需要在配置中设置 "strictNullChecks": false
let un: undefined = undefined
let nu: null = null
num = undefined
num = null

// void 没有返回值
let noReturn = () => {}

// any 任何类型，等于js
let x
x = 1
x = []
x = () => {}

// never 不存在返回条件
let error = () => {
  throw new Error('error')
}
let endless = () => {
  while(true) {}
}
