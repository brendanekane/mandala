const DrawingBoard = require('./drawing_board.js');
// trying to have canvas resize properly but cant do it with viewport units
//
// const resize = () => {
//   const canvas = document.querySelector("#mandala-canvas"),
//   height = window.innerHeight,
//   ratio = canvas.width/canvas.height,
//   width = height * ratio;
//
//   canvas.style.width = '50vw';
//   canvas.style.height = '100vh';
// };

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#mandala-canvas");
  canvas.height = 700;
  canvas.width = 700;
  canvas.style.border = "solid black";


  const ctx = canvas.getContext("2d");
  const board = new DrawingBoard(ctx);
  board.init();
});

// window.addEventListener('load', resize, false);
// window.addEventListener('resize', resize, false);
