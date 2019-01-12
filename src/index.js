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

  const init = () => {


    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(board.center.x, board.center.y, board.radius, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    mouse.mouseTrigger();
  };

  init();



  const clearBtn = document.querySelector("#clear-button");
  const saveBtn = document.querySelector("#save-button");
  const restoreBtn = document.querySelector("#restore-button");
  clearBtn.addEventListener("click", (e) => {
    init();
  });
  saveBtn.addEventListener("click", (e) => {
    const canvasState = canvas.toDataURL(),
          data = {mandala: canvasState},
          string = JSON.stringify(data),
          file = new Blob([string], {
            type: 'application/json'
          });
    board.stack.push(file);
    // debugger;
  });
  restoreBtn.addEventListener("click", (e) => {
    const reader = new FileReader();
    const oldState = board.stack[board.stack.length - 2];
    if (oldState === undefined) return;
    if (board.stack[0]) {
      board.stack.pop();
      reader.readAsText(oldState);
      reader.onload = () => {
        const data = JSON.parse(reader.result),
              mandala = new Image();
              mandala.src = data.mandala;
              mandala.onload = () => {
                ctx.clearRect(0,0, canvas.width, canvas.height);
                ctx.drawImage(mandala, 0, 0);
              };
      };
    }
    if (board.stack.length === 0) board.stack.push(oldState);

  });

  const colorMenu = document.querySelector(".line-color-dropdown");
  colorMenu.addEventListener("change", (e) =>{
    board.color = e.target.value;
  });

  const weightMenu = document.querySelector(".line-weight-dropdown");
  weightMenu.addEventListener("change", (e) => {
    board.weight = e.target.value;
  });


});
