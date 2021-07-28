// sample JavaScript code
function fib(a) {
  console.log(a);
  if (a == 0) {
    return 1;
  } else if (a == 1) {
    return 1;
  } else {
    return fib(a-1) + fib(a-2);
  }
}

console.log(fib(2));





