class MouseEvents {
  constructor(board) {
    this.board = board;
    this.canvas = board.ctx.canvas;
  }
  mousePos(canvas, e) {
    const view = canvas.getBoundingClientRect();
    const posObj = {
      x: e.clientX - view.left,
      y: e.clientY - view.top
    };
    return posObj;
  }

  mouseDown(e) {
    this.canvas.addEventListener("mousedown", (e) => {
      this.board.findxy("down", e);
    });
    this.canvas.addEventListener("touchstart", (e) => {
      this.board.findxy("down", e);
    });
  }

  // touchDown(e) {
  //   this.canvas.addEventListener("touchstart", (e) => {
  //     this.board.findxy("down", e);
  //   });
  // }

  mouseMove(e) {
    this.canvas.addEventListener("mousemove", (e) => {
      this.board.findxy("move", e);
    });
    this.canvas.addEventListener("touchmove", (e) => {
      this.board.findxy("move", e);
    });
  }

  mouseUp(e) {
    this.canvas.addEventListener("mouseup", (e) => {
      this.board.findxy("up", e);
    });
    this.canvas.addEventListener("mouseout", (e) => {
      this.board.findxy("out", e);
    });
    this.canvas.addEventListener("touchend", (e) => {
      this.board.findxy("up", e);
    });
    this.canvas.addEventListener("touchcancel", (e) => {
      this.board.findxy("out", e);
    });
  }

}

module.exports = MouseEvents;
