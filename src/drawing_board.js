class DrawingBoard {
  constructor(ctx){
    this.ctx = ctx;
    this.isDrawing = false;
    this.prevX = 0;
    this.prevY = 0;
    this.currX = 0;
    this.currY = 0;
    this.slices = 24;
    this.angles = 360 / this.slices;
    this.start = 0;
    this.radius = (ctx.canvas.width/2);
    this.center = {x:ctx.canvas.width/2, y:ctx.canvas.height/2};
    this.color = "white";
    this.weight = 1;
  }

  radConverter(degree) {
    return degree * Math.PI/180;
  }

  findCoords(degree, center, radius) {
    const rad = this.radConverter(degree);
    const x = center.x + radius * Math.cos(rad);
    const y = center.y + radius * Math.sin(rad);
    const coords = { x: x, y: y};
    return coords;
  }

  rotate(pos1, pos2, angle) {
    angle = this.radConverter(angle);
    const xr = (pos1.x - pos2.x) * Math.cos(angle) - (pos1.y - pos2.y) * Math.sin(angle) + pos2.x;
    const yr = (pos1.x - pos2.x) * Math.sin(angle) + (pos1.y - pos2.y) * Math.cos(angle) + pos2.y;
    return {x:xr, y:yr};
  }

  drawLine(start, end, mouse, color, weight){
    if (mouse) {
      this.ctx.lineWidth = this.weight;
      this.ctx.lineJoin = "round";
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.weight;
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(this.currX, this.currY);
    this.ctx.stroke();
    this.ctx.closePath();

    this.start = 0;
    for (let i = 0; i < this.slices - 1; i++) {
      this.start += this.angles;
      const rP = this.rotate({x: this.prevX, y: this.prevY}, this.center, this.start);
      const rC = this.rotate({x: this.currX, y: this.currY}, this.center, this.start);
      this.drawLine(rP, rC, this.isDrawing, this.color, this.weight);
    }
  }

  findxy(res, e) {
    const view = this.ctx.canvas.getBoundingClientRect();
    if (res == 'down') {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - view.left;
        this.currY = e.clientY - view.top;

        this.isDrawing = true;
    }
    if (res == 'up' || res == "out") {
        this.isDrawing = false;
    }
    if (res == 'move') {
        if (this.isDrawing) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - view.left;
            this.currY = e.clientY - view.top;
            this.draw();
        }
    }
    if (res == 'touchdown') {
      this.prevX = this.currX;
      this.prevY = this.currY;
      this.currX = e.touches[0].clientX - view.left;
      this.currY = e.touches[0].clientY - view.top;

      this.isDrawing = true;
    }
    if (res == 'touchend' || res == "touchcan") {
        this.isDrawing = false;
    }
    if (res == 'touchmove') {
        if (this.isDrawing) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.touches[0].clientX - view.left;
            this.currY = e.touches[0].clientY - view.top;
            this.draw();
        }
    }
  }

}

module.exports = DrawingBoard;
