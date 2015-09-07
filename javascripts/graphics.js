var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
ctx.font = "bold 16px Monospace";

function getWidth() {
    return canvas.width;
}
function getHeight() {
    return canvas.height;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(c) {
    ctx.fillStyle = c;
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fill();
}

function drawRect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
}

function drawText(text, xPos, yPos) {
    ctx.fillText(xText, xPos, yPos);
}

function drawTextCentered(text, xPos, yPos) {
    var length = ctx.measureText(text).width;
    drawText(text, xPos - (length/2), yPos);
}
