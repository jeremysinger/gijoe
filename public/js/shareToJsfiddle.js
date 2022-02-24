const form = document.getElementById('sharedcode');
const test = document.getElementById('test')

const js = form.elements['js'];
const html = form.elements['html'];

form.addEventListener("submit", function (event) {
  // add minimal HTML for turtle export to JSFiddle
  html.value = `
<!-- turtle HTML layout -->
<div id="canvases">
<!-- This is for drawing the little green turtle, and it sits above... -->
<canvas style="background-color: white; border: 2px dotted black;" id="turtlecanvas" width="300" height="300"></canvas>
<!-- ... this one, which is the image that the turtle is drawing. -->
<canvas id="imagecanvas" width="300" height="300" style="display: none;"></canvas>
</div>

<!-- import turtle.js library -->
<script src="https://cdn.jsdelivr.net/gh/jeremysinger/gijoe@main/gijoe_app/turtle.js"></script>
`;
});
