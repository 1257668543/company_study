// 类接口约束类成员属性与类型
interface Human {
  // new (name: string): void,
  name: string,
  eat(): void
}

// 类实现接口：
//  必须实现所有接口中的属性
//  接口只能约束类的公有成员
class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }
  name: string
  eat() {}
  sleep() {}
}

// 接口的继承
interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}

// 接口继承类，抽离类的公共、私有、受保护成员
class Auto {
  state = 1
  // private state2 = 0
}
interface AutoInterface extends Auto {

}
class C implements AutoInterface {
  state = 1
}

class Bus extends Auto implements AutoInterface {

}
