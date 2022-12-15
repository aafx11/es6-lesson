// vue2 用defineProperty ,特点是给本来的属性用此方法来定义，并且把值转换成get和set

let obj = {}


Object.defineProperty(obj, 'a', {
  value: '123', // 属性a的值，相当于 obj['a'] ='xxx'
  enumerable: true,// 该属性可以被遍历时拿到，默认为false
  configurable: true, // 可以被删除，默认false
  writable: true,//可以被修改，默认false
})

let _value; // 使用defineProperty ，需要定义第三方参数
Object.defineProperty(obj, 'b', {
  // value:'123', // 有get 不能有value
  enumerable: true,// 该属性可以被遍历时拿到，默认为false
  configurable: true, // 可以被删除，默认false
  // writable: true,//可以被修改，默认false,有set 不能写writable为true
  get () {
    return _value
  },
  set (newValue) {
    _value = newValue
  }
})
obj.b = 100
console.log(obj.b);

//  vue2 用defineProperty做响应式，defineProperty是对对象属性的重写，将对象的属性全部转换成getter 和 setter，需要遍历整个对象,并且需要递归
// proxy不用改写原对象，返回新proxy对象，但是兼容性差
// proxy做响应式也不需要递归，用到那层再用proxy代理
let proxy = new proxy(obj, {
  get () { //proxy.xx

  },
  set () { // proxy.xx=123

  },
  has () { // 'xx' in proxy

  },
  deleteProperty(){ // 删除属性后执行

  },
  ownKeys(){ // Object.getOwnPropertyNames 和 Object.getOwnPropertySymbols

  }
})



