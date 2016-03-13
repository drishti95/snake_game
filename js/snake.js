 $(document).ready(function(){
 	var canvas = $("#canvas")[0];
    canvas.width =1350;
    canvas.height = 800;
    var cw=44;
	var ctx = canvas.getContext("2d");
 	var w = $("#canvas").width();
	var h = $("#canvas").height();
	high_score = 0;
	var direction;
	var food;
	var score;
	var snake_body;

function init()
{
	direction="right";
	create_snake();
	create_food();
	score =0;
	if(score>high_score)
		high_score=score;

	
}
  init();
function paint()
{
	game();
	setTimeout(paint,100);
}
function create_snake()
{
	var length = 5;
	snake_body=[];
	for(var i=length-1;i>=0;i--)
	{
		snake_body.push({x:i, y:2});
		paint_cell(i,2);
	}
	console.log("snake array");
	console.log(snake_body);
}

function paint_cell(x, y)
	{
		ctx.fillStyle = "black";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
	}
paint_cell(food.x,food.y);


})
