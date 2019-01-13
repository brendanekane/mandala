const DrawingBoard = require('./drawing_board.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#mandala-canvas");
  canvas.height = 700;
  canvas.width = 700;
  canvas.style.border = "solid black";
  const ctx = canvas.getContext("2d");
  const board = new DrawingBoard(ctx);
  board.init();



  const clearBtn = document.querySelector("#clear-button");
  const saveBtn = document.querySelector("#save-button");
  const restoreBtn = document.querySelector("#restore-button");
  clearBtn.addEventListener("click", (e) => {
    board.init();
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
