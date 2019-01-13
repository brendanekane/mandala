/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/drawing_board.js":
/*!******************************!*\
  !*** ./src/drawing_board.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MouseEvents = __webpack_require__(/*! ./mouse_events.js */ "./src/mouse_events.js");

var Toolbox = __webpack_require__(/*! ./toolbox.js */ "./src/toolbox.js");

var DrawingBoard =
/*#__PURE__*/
function () {
  function DrawingBoard(ctx) {
    _classCallCheck(this, DrawingBoard);

    this.ctx = ctx;
    this.isDrawing = false;
    this.prevX = 0;
    this.prevY = 0;
    this.currX = 0;
    this.currY = 0;
    this.slices = 24;
    this.angles = 360 / this.slices;
    this.start = 0;
    this.radius = ctx.canvas.width / 2;
    this.center = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2
    };
    this.color = "white";
    this.weight = 1;
    this.stack = [];
  }

  _createClass(DrawingBoard, [{
    key: "radConverter",
    value: function radConverter(degree) {
      return degree * Math.PI / 180;
    }
  }, {
    key: "findCoords",
    value: function findCoords(degree, center, radius) {
      var rad = this.radConverter(degree);
      var x = center.x + radius * Math.cos(rad);
      var y = center.y + radius * Math.sin(rad);
      var coords = {
        x: x,
        y: y
      };
      return coords;
    }
  }, {
    key: "rotate",
    value: function rotate(pos1, pos2, angle) {
      angle = this.radConverter(angle);
      var xr = (pos1.x - pos2.x) * Math.cos(angle) - (pos1.y - pos2.y) * Math.sin(angle) + pos2.x;
      var yr = (pos1.x - pos2.x) * Math.sin(angle) + (pos1.y - pos2.y) * Math.cos(angle) + pos2.y;
      return {
        x: xr,
        y: yr
      };
    }
  }, {
    key: "drawLine",
    value: function drawLine(start, end, mouse, color, weight) {
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
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.weight;
      this.ctx.moveTo(this.prevX, this.prevY);
      this.ctx.lineTo(this.currX, this.currY);
      this.ctx.stroke();
      this.ctx.closePath();
      this.start = 0;

      for (var i = 0; i < this.slices - 1; i++) {
        this.start += this.angles;
        var rP = this.rotate({
          x: this.prevX,
          y: this.prevY
        }, this.center, this.start);
        var rC = this.rotate({
          x: this.currX,
          y: this.currY
        }, this.center, this.start);
        this.drawLine(rP, rC, this.isDrawing, this.color, this.weight);
      }
    }
  }, {
    key: "findxy",
    value: function findxy(res, e) {
      var view = this.ctx.canvas.getBoundingClientRect();

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
  }, {
    key: "init",
    value: function init() {
      var mouse = new MouseEvents(this);
      var toolbox = new Toolbox(this);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.beginPath();
      this.ctx.strokeStyle = "red";
      this.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
      this.ctx.stroke();
      this.ctx.closePath();
      mouse.mouseTrigger();
      toolbox.toolboxEvents();
    }
  }]);

  return DrawingBoard;
}();

module.exports = DrawingBoard;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DrawingBoard = __webpack_require__(/*! ./drawing_board.js */ "./src/drawing_board.js");

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.querySelector("#mandala-canvas");
  canvas.height = 700;
  canvas.width = 700;
  canvas.style.border = "solid black";
  var ctx = canvas.getContext("2d");
  var board = new DrawingBoard(ctx);
  board.init();
});

/***/ }),

/***/ "./src/mouse_events.js":
/*!*****************************!*\
  !*** ./src/mouse_events.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MouseEvents =
/*#__PURE__*/
function () {
  function MouseEvents(board) {
    _classCallCheck(this, MouseEvents);

    this.board = board;
    this.canvas = board.ctx.canvas;
  }

  _createClass(MouseEvents, [{
    key: "mousePos",
    value: function mousePos(canvas, e) {
      var view = canvas.getBoundingClientRect();
      var posObj = {
        x: e.clientX - view.left,
        y: e.clientY - view.top
      };
      return posObj;
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this = this;

      this.canvas.addEventListener("mousedown", function (e) {
        _this.board.findxy("down", e);
      });
    }
  }, {
    key: "touchDown",
    value: function touchDown(e) {
      var _this2 = this;

      this.canvas.addEventListener("touchstart", function (e) {
        if (e.touches.length === 1) {
          e.preventDefault();
        }

        _this2.board.findxy("touchdown", e);
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this3 = this;

      this.canvas.addEventListener("mousemove", function (e) {
        _this3.board.findxy("move", e);
      });
    }
  }, {
    key: "touchMove",
    value: function touchMove(e) {
      var _this4 = this;

      this.canvas.addEventListener("touchmove", function (e) {
        if (e.touches.length === 1) {
          e.preventDefault();
        }

        _this4.board.findxy("touchmove", e);
      });
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      var _this5 = this;

      this.canvas.addEventListener("mouseup", function (e) {
        _this5.board.findxy("up", e);
      });
      this.canvas.addEventListener("mouseout", function (e) {
        _this5.board.findxy("out", e);
      });
    }
  }, {
    key: "touchUp",
    value: function touchUp(e) {
      var _this6 = this;

      this.canvas.addEventListener("touchend", function (e) {
        if (e.touches.length === 1) {
          e.preventDefault();
        }

        _this6.board.findxy("touchend", e);
      });
      this.canvas.addEventListener("touchcancel", function (e) {
        if (e.touches.length === 1) {
          e.preventDefault();
        }

        _this6.board.findxy("touchcan", e);
      });
    }
  }, {
    key: "mouseTrigger",
    value: function mouseTrigger(e) {
      this.mouseDown(e);
      this.mouseMove(e);
      this.mouseUp(e);
      this.touchDown(e);
      this.touchMove(e);
      this.touchUp(e);
    }
  }]);

  return MouseEvents;
}();

module.exports = MouseEvents;

/***/ }),

/***/ "./src/toolbox.js":
/*!************************!*\
  !*** ./src/toolbox.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Toolbox =
/*#__PURE__*/
function () {
  function Toolbox(board) {
    _classCallCheck(this, Toolbox);

    this.board = board;
  }

  _createClass(Toolbox, [{
    key: "clearBoard",
    value: function clearBoard() {
      var _this = this;

      var clearBtn = document.querySelector("#clear-button");
      clearBtn.addEventListener("click", function (e) {
        _this.board.init();
      });
    }
  }, {
    key: "saveBoard",
    value: function saveBoard() {
      var _this2 = this;

      var saveBtn = document.querySelector("#save-button");
      saveBtn.addEventListener("click", function (e) {
        var canvasState = _this2.board.ctx.canvas.toDataURL(),
            data = {
          mandala: canvasState
        },
            string = JSON.stringify(data),
            file = new Blob([string], {
          type: 'application/json'
        });

        _this2.board.stack.push(file);
      });
    }
  }, {
    key: "restoreBoard",
    value: function restoreBoard() {
      var _this3 = this;

      var restoreBtn = document.querySelector("#restore-button");
      restoreBtn.addEventListener("click", function (e) {
        var reader = new FileReader();
        var oldState = _this3.board.stack[_this3.board.stack.length - 2];
        if (oldState === undefined) return;

        if (_this3.board.stack[0]) {
          _this3.board.stack.pop();

          reader.readAsText(oldState);

          reader.onload = function () {
            var data = JSON.parse(reader.result),
                mandala = new Image();
            mandala.src = data.mandala;

            mandala.onload = function () {
              _this3.board.ctx.clearRect(0, 0, _this3.board.ctx.canvas.width, _this3.board.ctx.canvas.height);

              _this3.board.ctx.drawImage(mandala, 0, 0);
            };
          };
        }

        if (_this3.board.stack.length === 0) _this3.board.stack.push(oldState);
      });
    }
  }, {
    key: "changeColor",
    value: function changeColor() {
      var _this4 = this;

      var colorMenu = document.querySelector(".line-color-dropdown");
      colorMenu.addEventListener("change", function (e) {
        _this4.board.color = e.target.value;
      });
    }
  }, {
    key: "changeLineWeight",
    value: function changeLineWeight() {
      var _this5 = this;

      var weightMenu = document.querySelector(".line-weight-dropdown");
      weightMenu.addEventListener("change", function (e) {
        _this5.board.weight = e.target.value;
      });
    }
  }, {
    key: "changeSlices",
    value: function changeSlices() {
      var _this6 = this;

      var sliceMenu = document.querySelector(".slices-dropdown");
      sliceMenu.addEventListener("change", function (e) {
        _this6.board.slices = parseInt(e.target.value);
        _this6.board.angles = 360 / _this6.board.slices;
      });
    }
  }, {
    key: "toolboxEvents",
    value: function toolboxEvents() {
      this.clearBoard();
      this.saveBoard();
      this.restoreBoard();
      this.changeColor();
      this.changeLineWeight();
      this.changeSlices();
    }
  }]);

  return Toolbox;
}();

module.exports = Toolbox;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map