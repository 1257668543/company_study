let obj1 = {
  a: 1,
  b: 2,
  c: 3
}

// 使用索引类型 + 泛型 约束函数的参数及返回值类型
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}
console.log(getValues(obj1, ['a', 'b']));
// console.log(getValues(obj1, ['e', 'f']));

// 索引类型
// keyof T
interface Obj {
  a: number,
  b: string
}
let key: keyof Obj

// T[K]
let values: Obj['a']

// T extendsv U
