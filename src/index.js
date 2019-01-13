const DrawingBoard = require('./drawing_board.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#mandala-canvas");
  canvas.height = 700;
  canvas.width = 700;
  canvas.style.border = "solid black";
  const ctx = canvas.getContext("2d");
  const board = new DrawingBoard(ctx);
  board.init();
});
