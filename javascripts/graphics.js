function Graphics() {
    this.canvas = document.getElementById("gamecanvas");
    this.ctx = canvas.getContext("2d");
    this.ctx.font = "bold 16px Monospace";
}

Graphics.prototype.update = function() {
    this.ctx = canvas.getContext("2d");
    this.ctx.font = "bold 16px Monospace";
}

Graphics.prototype.getWidth = function() {
    return this.canvas.width;
}

Graphics.prototype.getHeight = function() {
    return this.canvas.height;
}

Graphics.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Graphics.prototype.setColor = function(c) {
    this.ctx.fillStyle = c;
}

Graphics.prototype.drawCircle = function(x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2*Math.PI, false);
    this.ctx.fill();
}

Graphics.prototype.drawRect = function(x, y, w, h) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.fill();
}

Graphics.prototype.drawText = function(text, xPos, yPos) {
    this.ctx.fillText(xText, xPos, yPos);
}

Graphics.prototype.drawTextCentered = function(text, xPos, yPos) {
    var length = this.ctx.measureText(text).width;
    this.drawText(text, xPos - (length/2), yPos);
}
