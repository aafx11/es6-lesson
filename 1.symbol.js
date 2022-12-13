// symbol 基本数据类型 string number boolean undefined null symbol bigint

// symbol 独一无二的类型，两个symbol永远不会相等
let s1 = Symbol('test')
let s2 = Symbol('test')

// console.log(s1 === s2);

// symbol 作为对象的key 
let obj = {
  name: '123',
  age: 18,
  [s1]: 'yes'
}

// console.log('obj', obj);

for (const key in obj) {
  console.log(obj[key]); // symbol属性默认是不能枚举的(遍历)
}

console.log(Object.getOwnPropertySymbols(obj)); // 获取所有symbol
console.log(Object.keys(obj)); // 获取所有普通类型的key


let s3 = Symbol.for('jw') // 第一次Symbol.for 是声明全新的symobl
let s4 = Symbol.for('jw') // 第二次Symbol.for 是引用第一个Symbol.for
console.log(s3 === s4) // true 他们是相等的

// symbol 有元编程能力，可以改写语法本身
/**
 * 判断数据类型的方法
 * 1.typeof 判断基本类型
 * 2.Object.prototype.toString.call()
 * 3.instanceof
 * 4.constructor
 */

let objSymbol = {
  [Symbol.toStringTag]: 'test'
}
console.log(Object.prototype.toString.call(objSymbol)); // [object test] 修改了返回的类型，改为取 [Symbol.toStringTag]:'test' 中定义的类型

// 隐式类型转换
let objTest01 = {}
console.log(objTest01 + 1); // [object Object]1 ,objtest 会被toString

let objTest02 = {
  [Symbol.toPrimitive] (type) { // toString(隐式类型转换时)的时候会调用
    return '123'
  }
}

console.log(objTest02 + 1); // 1231

let instance = {
  [Symbol.hasInstance] (value) {
    console.log(value); // value 就是调用insanceof 的对象 { name: '123' }
    return 'name' in value // 有name属性返回true
  }
}

// 判断{ name: '123' } 对象 是否是instance的实例，通过向上查找 __proto_
console.log({ name: '123' } instanceof instance);

// Symbol.iterator