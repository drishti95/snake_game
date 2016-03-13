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
	if(typeof game_reload != "undefined")
		clearInterval(game_reload);
	game_reload=setInterval(game,100);
	
}
  init();

function create_snake()
{
	var length = 5;
	snake_body=[];
	for(var i=length-1;i>=0;i--)
	{
		snake_body.push({x:i, y:2});
		paint_cell(i,2);
	}
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
function game()
{


		
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		var nx = snake_body[0].x;
		var ny = snake_body[0].y;

		if(direction == "right") nx++;
		else if(direction == "left") nx--;
		else if(direction == "up") ny--;
		else if(direction == "down") ny++;
		
		
		if(nx == -1 || nx >= w/cw-1 || ny == -1 || ny >= h/(cw)-1 || check_collision(nx, ny, snake_body))
		{
			//restart game
			init();
			return;
		}
		
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			//Create new food
			while(food.x === nx && food.y === ny)
			create_food();
		}
		else
		{
			var tail = snake_body.pop(); //pops out the last cell
			tail.x = nx; tail.y = ny;
		}
		
		snake_body.unshift(tail); //puts back the tail as the first cell as unshift adds from the bottom of the array
		
		for(var i = 0; i < snake_body.length; i++)
		{
			var c = snake_body[i];
			paint_cell(c.x, c.y);
		}
		
		paint_cell(food.x, food.y);
		ctx.font = "20px Georgia";
		if(score > high_score)high_score = score;
		var score_text = "score : " + score;
		ctx.fillText(score_text, 150, h-5);

		var high_score_text = "High score : " + high_score;
		ctx.fillText(high_score_text, 5, h-5);
}
		
function check_collision(x, y, array)
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
$(document).keydown
	(
		function(e)
		{
		var key = e.which;
		if(key == "37" && direction != "right") direction = "left";
		else if(key == "38" && direction != "down") direction = "up";
		else if(key == "39" && direction != "left") direction = "right";
		else if(key == "40" && direction != "up") direction = "down";
		}
	)


})
