// sample JavaScript code


let step = 50;
for(let i = 0; i < 10; i++){ 

  goto(0, 0)

  for(let i = 0; i < 40; i++){
    forward(step);
    right(30);
    forward(step);
    left(100);
    forward(step);
  }
}