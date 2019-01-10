const DrawingBoard = require('./drawing_board.js');
const MouseEvents = require('./mouse_events.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#mandala-canvas");
  canvas.height = 700;
  canvas.width = 700;
  canvas.style.border = "solid black";
  const ctx = canvas.getContext("2d");
  const board = new DrawingBoard(ctx);
  const mouse = new MouseEvents(board);


  // canvas.addEventListener("touchstart", (e) => {
  //   e.preventDefault();
  //   alert("touch event");
  //   board.findxy("touchdown", e);
  // });
  //
  // canvas.addEventListener("touchmove", (e) => {
  //   e.preventDefault();
  //   alert("touch event");
  //   board.findxy("touchmove", e);
  // });
  //
  // canvas.addEventListener("touchend", (e) => {
  //   e.preventDefault();
  //   alert("touch event");
  //   board.findxy("touchend", e);
  // });
  //
  // canvas.addEventListener("touchcancel", (e) => {
  //   e.preventDefault();
  //   alert("touch event");
  //   board.findxy("touchcan", e);
  // });





  const init = () => {

    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(board.center.x, board.center.y, board.radius, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    mouse.mouseDown();
    mouse.mouseMove();
    mouse.mouseUp();
  };

  init();



  const clearBtn = document.querySelector("#clear-button");
  clearBtn.addEventListener("click", (e) => {
    init();
    console.log("cleared");
  });

  const colorMenu = document.querySelector(".line-color");
  colorMenu.addEventListener("change", (e) =>{
    board.color = e.target.value;
  });

  const weightMenu = document.querySelector(".line-weight");
  weightMenu.addEventListener("change", (e) => {
    board.weight = e.target.value;
  });


});
