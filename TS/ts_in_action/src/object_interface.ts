// 满足接口必要条件 且 值为 变量 而非 字面量 时允许传入额外字段
// 使用字面量又想绕过检查的方法
//  类型断言： 1. as Interface 2. 字面量前 + <Interface>
interface List {
  readonly id: number, // 只读属性
  name: string;
  // [x: string]: any; //  字符串索引签名 [x: string]: any;
  age?: number // 可选属性，可有可无
}
interface Result {
  data: List[]
}
function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name);
    if (value.age) {
      console.log(value.age);
    }
    // value.id ++;
  })
}
let result = {
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B'}
  ]
}
render(result)

// 数字索引接口（下例等同与字符串数组）
interface StringArray {
  [index: number]: string
}
let chars: StringArray = ['A', 'B']

// 字符串索引接口: 数字索引类型的值 必须是 字符串索引类型值的 子类型
interface Names {
  [x: string]: string,
  // y: number
  [z: number]: string
}
