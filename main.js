const board = document.getElementById("gameCanvas");
const board_ctx = board.getContext("2d");


//make snake
let snake = [ ];
let w = 20;
let vx = 20;
let vy = 0;
let food_x = 0;
let food_y = 0;
let col = board.width / w;
let row = board.height / w;
let foodEaten = true;
let score = 0;



makeSnake();
main();

document.addEventListener("keydown", changeDirection);

function main(){ 
    if (gameOver()) {
        return;
    }
    setTimeout(function onTick() {
        clearCanvas();
        generateFood();
        drawSnake();
        drawFood();
        moveSnake();
        main();
    }, 100);
}


function drawBlock(x, y, fillColor) {
    board_ctx.beginPath();
    board_ctx.rect(x, y, w, w);
    board_ctx.fillStyle = fillColor;
    board_ctx.fill();
    board_ctx.strokeStyle = "black";
    board_ctx.strokeRect(x, y, w, w);
}

function drawFood() {
    board_ctx.beginPath();
    drawBlock(food_x, food_y, "lightgreen");
}

function generateFood() {
    if (foodEaten){
        food_x = Math.floor(Math.random() * col) * w;
        food_y = Math.floor(Math.random() * row) * w;
        for (let i=0; i<snake.length; i++){
            if (snake[i].x == food_x && snake[i].y == food_y){
                generateFood();
            }
            if (food_x == board.width - w && food_y == board.height - w) {
                generateFood();
            }
        }
        foodEaten = false;
    }
}

function hitWall() {
    if (snake[0].x > board.width - w || snake[0].x < 0){
        return true;
    }
    if (snake[0].y > board.height - w || snake[0].y < 0){
        return true;
    }
    return false;
}

function collide () {
    for (let i=4; i< snake.length; i++){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            return true;
        }
    }
}

function gameOver() {
    return collide() || hitWall();
}

function changeDirection(event) {
    const KEY = String.fromCharCode(event.keyCode);
    if (KEY == "W" && vy != w){
        vx = 0;
        vy = -w;
    }
    if (KEY == "A" && vx != w){
        vx = -w;
        vy = 0;
    }
    if (KEY == "S" && vy != -w){
        vx = 0;
        vy = w;
    }
    if (KEY == "D" && vx != -w){
        vx = w;
        vy = 0;
    }

}

function moveSnake() {
    let head = {
        x: snake[0].x + vx,
        y: snake[0].y + vy
    }
    snake.unshift(head);
    if (snake[0].x == food_x && snake[0].y == food_y){
        foodEaten = true;
        score += 10;
        document.getElementById("score").innerHTML = score;
        for (let i=0; i<snake.length; i++){
            drawBlock(snake[i].x, snake[i].y, "lightgreen");
        }
        generateFood();

    }
    else{
        snake.pop();
    }
}

function makeSnake() {
    for (let i=0; i<4; i++){
        snake.push({x: 200 - i * w, 
                    y: 200        });
    }
}

function drawSnakePart(part) {
   drawBlock(part.x, part.y, "white");
}

function drawSnake() {
    for (let i = 0; i< snake.length; i++) {
        drawSnakePart(snake[i]);
    }
}

function clearCanvas() {
    board_ctx.beginPath();
    board_ctx.rect(0, 0, board.width, board.height);
    board_ctx.fillStyle = "black";
    board_ctx.fill();
}
