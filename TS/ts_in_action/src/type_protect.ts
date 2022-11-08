enum Type { Strong, Weak }

class Java {
  helloJava() {
    console.log('Hello Java');
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript');
  }
  javascript: any
}

function isJava(lang: Java | JavaScript): lang is Java { // 类型谓词：params is Type 形式
  return (lang as Java).helloJava !== undefined;
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();
  // if ((lang as Java).helloJava) {
  //   (lang as Java).helloJava();
  // } else {
  //   (lang as JavaScript).helloJavaScript();
  // }
  
  // 类型保护：TS能够在特定的区块中保证变量属于某种确定的类型
  // 可以在此区块中放心地引用此类型的属性，或者调用此类型的方法

  // 1. instanceof
  if (lang instanceof Java) {
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }

  // 2. in 
  if ('java' in lang) {
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }

  // 3. typeof
  if (typeof x === 'string') {
    x.length
  } else {
    x.toFixed(2)
  }

  // 4. 自定义类型保护
  if (isJava(lang)) {
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }

  return lang
}