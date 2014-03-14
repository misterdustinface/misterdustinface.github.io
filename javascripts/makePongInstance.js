<button id="pong">Pong Demo</button><br>

var reply_click = function(){ // for testing
    alert("Button clicked, id "+this.id+", text"+this.innerHTML);
}
var displayPongDemo = function(){
	window.open("pong.html", "PONG", "menubar=no,innerWidth=680,innerHeight=400,toolbar=no,location=no,screenX=400,screenY=40");
}

document.getElementById('pong').onclick = displayPongDemo;
