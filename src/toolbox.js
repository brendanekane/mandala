class Toolbox {
  constructor(board) {
    this.board = board;
  }

  clearBoard(){
    const clearBtn = document.querySelector("#clear-button");
    clearBtn.addEventListener("click", (e) => {
      this.board.init();
    });
  }

  saveBoard(){
    const saveBtn = document.querySelector("#save-button");
    saveBtn.addEventListener("click", (e) => {
      const canvasState = this.board.ctx.canvas.toDataURL(),
            data = {mandala: canvasState},
            string = JSON.stringify(data),
            file = new Blob([string], {
              type: 'application/json'
            });
      this.board.stack.push(file);
    });
  }

  restoreBoard() {
    const restoreBtn = document.querySelector("#restore-button");
    restoreBtn.addEventListener("click", (e) => {
      const reader = new FileReader();
      const oldState = this.board.stack[this.board.stack.length - 2];
      if (oldState === undefined) return;
      if (this.board.stack[0]) {
        this.board.stack.pop();
        reader.readAsText(oldState);
        reader.onload = () => {
          const data = JSON.parse(reader.result),
                mandala = new Image();
                mandala.src = data.mandala;
                mandala.onload = () => {
                  this.board.ctx.clearRect(0,0, this.board.ctx.canvas.width, this.board.ctx.canvas.height);
                  this.board.ctx.drawImage(mandala, 0, 0);
                };
        };
      }
      if (this.board.stack.length === 0) this.board.stack.push(oldState);

    });
  }

  changeColor(){
    const colorMenu = document.querySelector(".line-color-dropdown");
    colorMenu.addEventListener("change", (e) =>{
      this.board.color = e.target.value;
    });
  }

  changeLineWeight() {
    const weightMenu = document.querySelector(".line-weight-dropdown");
    weightMenu.addEventListener("change", (e) => {
      this.board.weight = e.target.value;
    });
  }

  toolboxEvents() {
    this.clearBoard();
    this.saveBoard();
    this.restoreBoard();
    this.changeColor();
    this.changeLineWeight();
  }

}

module.exports = Toolbox;
