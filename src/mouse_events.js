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
  }

  touchDown(e) {
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.board.findxy("touchdown", e);
    });
  }

  mouseMove(e) {
    this.canvas.addEventListener("mousemove", (e) => {
      this.board.findxy("move", e);
    });
  }

  touchMove(e) {
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      this.board.findxy("touchmove", e);
    });
  }

  mouseUp(e) {
    this.canvas.addEventListener("mouseup", (e) => {
      this.board.findxy("up", e);
    });
    this.canvas.addEventListener("mouseout", (e) => {
      this.board.findxy("out", e);
    });
  }
  touchUp(e){
    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.board.findxy("touchend", e);
    });
    this.canvas.addEventListener("touchcancel", (e) => {
      e.preventDefault();
      this.board.findxy("touchcan", e);
    });
  }

  mouseTrigger(e){
    this.mouseDown(e);
    this.mouseMove(e);
    this.mouseUp(e);
    this.touchDown(e);
    this.touchMove(e);
    this.touchUp(e);
  }

}

module.exports = MouseEvents;
