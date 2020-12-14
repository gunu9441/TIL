var f = function(){         //variable=function
	console.log(1+1);
	console.log(1+2);
}

var a = [f];                //array
a[0]();                     //function f is operated.

var o={                     //object
	manager : 'yejin',      //value 값으로 다양한 자료형 대입 가능
  //'manager' : 'yejin',
  func : f
}
console.log(o.manager)
console.log(o['manager']);
o.func();