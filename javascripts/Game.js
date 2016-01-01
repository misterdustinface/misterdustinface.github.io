function Game() {
  this.UPDATE = function() {
    this.update();
  };
  this.DRAW = function() {
    this.draw();
  };
  this.KEY_UP_FUNC = function(e) {
    this.keyUpEventHandler(e.keyCode);
  };
  this.KEY_DOWN_FUNC = function(e) {
    this.keyDownEventHandler(e.keyCode);
  };
}

Graphics.prototype.load = function() {
  window.addEventListener("keydown", this.KEY_DOWN_FUNC);
  window.addEventListener("keyup", this.KEY_UP_FUNC);
  window.setInterval(this.UPDATE, 1000/60);
  window.setInterval(this.DRAW, 1000/60);
}

Graphics.prototype.unload = function() {
  window.removeEventListener("keydown", this.KEY_DOWN_FUNC);
  window.removeEventListener("keyup", this.KEY_UP_FUNC);
  window.clearInterval(this.UPDATE);
  window.clearInterval(this.DRAW);
}

Graphics.prototype.update = function() {
  
}

Graphics.prototype.draw = function() {
  
}

Graphics.prototype.keyDownEventHandler = function() {
  
}

Graphics.prototype.keyUpEventHandler = function() {
  
}
