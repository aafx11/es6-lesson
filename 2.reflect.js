// ES6 后续新增的很多方法都放在Reflect 上

let s1 = Symbol('test')

let obj = {
  name: '123',
  age: 18,
  [s1]: 'yes'
}

// Reflect.ownKeys 获取所有key，包括symbol
Reflect.ownKeys(obj).forEach(item => {
  console.log(item);
})

const fn = (a, b) => {
  console.log('fn', a, b);
}

// fn本身的apply方法被覆盖了
fn.apply = function () {
  console.log('apply');
}

/**
 * 调用函数本身的aplly方法，call的功能是让apply方法中的this指向fn，
 * 并让apply方法执行，相当于fn.apply(null,[1,2]) 并将null和[1,2]当作参数传给apply
 * call 的作用
 * 1.让函数执行apply
 * 2.改变apply中this 指向fn
 */
Function.prototype.apply.call(fn, null, [1, 2])

Reflect.apply(fn, null, [1, 2]) // null 相当于this对象

// ownKeys() apply() proxy中使用 set has delete