// ------------------------------类的基础定义
// ts中类的属性必须存在初始值（字面量 或 构造函数赋值）
class Dog {
  constructor(name: string) {
    this.name = name
  }
  public name: string
  run() {}
  private pri() {}
  protected pro() {}
  readonly legs: number = 4
  static food: string = 'bones'
}
console.log(Dog.prototype);
let dog = new Dog('baobao')
console.log(dog);
// dog.pri();
// dog.pro();
console.log(Dog.food);


// 类的继承：通过super调用父类实例构造方法之后再使用this
class Husky extends Dog {
  constructor(name: string, public color: string) {
    super(name);
    this.color = color
    // this.pri()
    this.pro();
  }
  // color: string
}
console.log(Husky.food);


// 成员修饰符
// 默认 public
// private: 不能在实例和子类中调用, 如果将构造函数置为private，则该类不能被继承
// protected: 不能在实例中调用，如果将构造函数置为protected，则代表该类不能被实例化，只能被继承 称为 基类
// readonly: 只读属性，必须被初始化
// static: 只能通过类名访问，可以被继承


// -------------------------- 抽象类与多态

// 抽象类: 只能被继承，无法实例化
abstract class Animal {
  eat() {
    console.log('eat');
  }
  // 抽象方法：只定义，由子类实现
  abstract sleep(): void
}
// let animal = new Animal()

class Cat extends Animal{
  constructor(name: string) {
    super()
    this.name = name
  }
  name: string
  run() {}
  sleep() {
    console.log('sleep');
  }
}
let cat = new Cat('miaomiao')
cat.eat()

// 多态
class Bird extends Animal {
  sleep() {
    console.log('Bird sleep');
  }
}
let bird = new Bird();

let animals: Animal[] = [cat, bird]
animals.forEach(i => {
  i.sleep()
})

// this的链式调用
class WorkFlow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}
new WorkFlow().step1().step2()

class MyFlow extends WorkFlow {
  next() {
    return this;
  }
}
new MyFlow().next().step1().next().step2()
