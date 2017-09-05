var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;

var ballY = 50;
var ballSpeedY = 5;

var paddle1Y = 200;
var paddle2Y = 200;
const	HEIGHT_PADDLE = 90;
const BIEN = 10;
const R_BALL = 9;
var player1Score = 0;
var player2Score = 0;

function caculateMouseEV(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left;//-root.scrollLeft;
	var mouseY = evt.clientY - rect.top ;//- root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(function() {
			moveEverything();
			drawEverything();	
		}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove',function(event) {
		var mousePos = caculateMouseEV(event);
		paddle1Y = mousePos.y-HEIGHT_PADDLE/2;
	});
}

function AIforPlayer(paddle)
{
	paddle = ballY-HEIGHT_PADDLE/2;
	return paddle;
}
function AI1forPlayer(paddle)
{
	if(ballY>=paddle-R_BALL+3 && ballY<=paddle+HEIGHT_PADDLE+R_BALL-3)
		return paddle;
	if(ballY<paddle-R_BALL+3)
		return paddle-15;
	return paddle+15;
}
function resetBall()
{
	var x = Math.floor((Math.random() * 10) + 1);
	if(x%2==1)
		ballSpeedY = 5;
	else
		ballSpeedY = -5;
//	ballSpeedX 
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}
function moveEverything() {
	//ballSpeedX +=  1;

	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;
	if(ballY<= BIEN+R_BALL) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballY >= canvas.height-BIEN-R_BALL) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballX == BIEN && ballY>=paddle1Y-R_BALL && ballY<=paddle1Y+HEIGHT_PADDLE+R_BALL){
		ballSpeedX = -ballSpeedX;
		var deltaY = ballY
					-(paddle1Y+HEIGHT_PADDLE/2);
			ballSpeedY = deltaY * 0.35;
		return;
	}
	if(ballX < BIEN) {
		player2Score+=1;
		resetBall();
		ballSpeedX = -ballSpeedX;
		return;
	}
	if(ballX == canvas.width-BIEN &&  ballY>=paddle2Y-R_BALL && ballY<=paddle2Y+HEIGHT_PADDLE+R_BALL){
		ballSpeedX = -ballSpeedX;
		var deltaY = ballY
					-(paddle2Y+HEIGHT_PADDLE/2);
			ballSpeedY = deltaY * 0.35;
		return;
	}
	if(ballX > canvas.width-BIEN) {
		player1Score +=1;
		resetBall();
		ballSpeedX = -ballSpeedX;
		return;
	}
}

function drawEverything() {
	// next line blanks out the screen with black

	colorRect(0,0,canvas.width,canvas.height,'black');

	// this is left player paddle
	//paddle1Y = AIforPlayer(paddle1Y);
	colorRect(3,paddle1Y,7,HEIGHT_PADDLE,'green');
	// this is right player paddle
	paddle2Y = AI1forPlayer(paddle2Y);
	colorRect(canvas.width-10,paddle2Y,7,HEIGHT_PADDLE,'yellow');
	// next line draws the ball
	colorCircle(ballX,ballY,R_BALL,'white');
	drawNet();
	canvasContext.font = "30px Aria";
	canvasContext.fillText(player1Score, 390, 100);
	canvasContext.fillText(player2Score, canvas.width-400, 100);
}
function drawNet() {
	for(var i=0;i<canvas.height;i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function colorCircle(centerX,centerY,R,drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,R,0,Math.PI*2,false);
	canvasContext.fill();
}	

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}
