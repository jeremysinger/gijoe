var i = 0;
setInterval(function() {
  var helloWorld = document.getElementById("hello-world");
  helloWorld.innerHTML = "<h1>" + i + "</h1>";
  i++;
}, 1000);



