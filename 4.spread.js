/**
 * 浅拷贝
 * (1) ... 展开运算符
 *（2）Object.assign 如果对象只有一层就是深拷贝 
 *
 */

/**
 * 深拷贝
 * (1)JSON.stringify
 */

// 正则，undefined，函数，时间对象会丢失
console.log(JSON.stringify({ a: /\d+/, nu: null, un: undefined, fn: () => { } }));


// 递归对象实现深拷贝,hash 记录拷贝前和拷贝后的对应关系
function deepClone (obj, hash = new WeakMap) {
  if (obj == null) return obj // 包括undefined
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)

  if (typeof obj != 'object') return obj // 包括基本数据类型和函数

  if (hash.has(obj)) return hash.get(obj) // 防止重复拷贝，返回上次拷贝的结果，不再递归

  // 对象类型 obj 对象 arr 数组
  const copy = new obj.constructor // obj的构造函数，不需要判断数组还是对象，直接用构造函数new出来 
  hash.set(obj, copy)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { // 过滤掉原型链上的方法，不需要拷贝
      copy[key] = deepClone(obj[key], hash)
    }
  }
  return copy
}

// 对象的循环引用
let obj1 = { a: '1' }
obj1.b = {}
obj1.b.a = obj1.b

console.log(deepClone(obj1)); //循环引用，会导致无限循环，爆栈