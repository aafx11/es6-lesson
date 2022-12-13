// set map ->weakMap weakSet

// 使用和区别
/**
 * Set 值不重复
 */
let set = new Set([1, 2, 3, 1, 1, 2, 'a'])
set.add(5)
// set.forEach
// Object.entries Object.keys Object.values
console.log(set.entries(set));
console.log(set.has(5));

/**
 * Map ,key 不重复
 */

let map = new Map([
  ['a', 1],
  ['b', 1],
  ['b', 2],
])

console.log(map);
map.set('c', 3)
// map.forEach
// map的key可以使用对象类型
map.set({ a: 1 }, 2)
console.log(map);

console.log(Object.prototype.toString.call(new Map()));
console.log(Object.prototype.toString.call(new Set()));
//求数组的交集 并集 差集

// 并集
function union (arr1, arr2) {
  let set = new Set([...arr1, ...arr2])
  return [...set]
}

// 交集
function intersection (arr1, arr2) {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  return [...s1].filter(item => {
    return s2.has(item)
  })
}

// 差集 arr1 - arr2
function difference (arr1, arr2) {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  return [...s1].filter(item => {
    return !s2.has(item)
  })
}



/**
 * weakMap 弱引用，垃圾回收，标记引用,每引用一次就标记一次
 */

class Test {

}

let test = new Test() // 对象

let myMap = new weakMap() // weakMap的key只能是对象

map.set(test, 1)
test =null // 当给一个变量设置为null时，不会马上被回收，浏览器会在合适的时候回收
// map 引用的对象即使被设置为null，也不会被回收，
// weakMap引用的对象设置为null时，后续会被回收