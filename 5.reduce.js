// reduce 收敛函数 把数组转换成其他格式
// reduceRight 从右到左

// 手写reduce
Array.prototype.reduce = function (callback, prev) {
  for (let i = 0; i < this.length; i++) {
    if (!prev) {
      prev = callback(this[i], this[i + 1], i + 1, this)
      i++ // 有prev后， 下次从i=2开始，因为没有prev时，用的是i=0和i=1的值
    } else {
      prev = callback(prev, this[i], i, this)
    }
  }
  return prev
}


// reduce使用的前提，数组不能为空(可以为初始化的值)，如果只有一个值，则返回当前值
let r1 = ([1, 2, 3, 4]).reduce((pre, cur, index, array) => {
  return pre + cur
}, 10)

console.log('r1', r1);


// reduce实现数组扁平化flatten


// reduce实现compose 组合函数
function sum (a, b) {
  return a + b
}

function len (str) {
  return str.length
}

function addPrefix (str) {
  return '$' + str
}

let r2 = addPrefix(len(sum('a', 'b')))

//reduceRight
const compose = (...fns) => {
  return function (...args) {
    let lastFn = fns.pop()
    let r = lastFn(...args)
    // 此时fns=[addPrefix, len] , cur =len,prev =r
    return fns.reduceRight((prev, cur) => {
      return cur(prev)
    }, r)
  }
}

let r3 = compose(addPrefix, len, sum)
console.log(r3('a', 'b'));

// reduce
/**
 * 第一次执行 a:addPrefix  b:len  ...args就是'a','b'
 *
 * 第二次执行 a: addPrefix(len('a','b'))
 * 
 * a: function (...args) {                  b:sum
      return addPrefix(len(...args))
    }
 * 

    结果 
    function (...args) { 
      return function (...args) {                  b:sum
        return addPrefix(len(...args))
    }(sum(...args))
    }

    包装成
    function (...args) {
      return addPrefix(len(sum(...args)))
    }
 */
const compose2 = (...fns) => {
  return fns.reduce(function (a, b) { 

    // 返回一个函数，当作reduce下次循环的a（prev）
    return function (...args) { // 这个函数相当于r4函数
      return a(b(...args))
    }
  })
}

let r4 = compose2(addPrefix, len, sum)
console.log('r4', r4('a', 'b'));

// reduce 可以做收敛函数，最终返回一个结果