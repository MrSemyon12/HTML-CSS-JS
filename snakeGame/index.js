const GRID_SIZE = 20;
const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';
const FRAME_RATE = 10;

let canvas, ctx;
let gameActive = '';

let gameState = {
    player: {
        pos: {
            x: 3,
            y: 10,
        },
        vel: {
            x: 1,
            y: 0,
        },
        snake: [
            {x: 1, y: 10},
            {x: 2, y: 10},
            {x: 3, y: 10},
        ],
    },
    food: {}
};

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 600;

    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    randomFood();

    document.addEventListener('keydown', keydown);
}

function keydown(e) {
    let keyCode = e.keyCode;
    switch (keyCode) {
        case 37: { // left
            if (gameState.player.vel.x !== 1)
                gameState.player.vel = { x: -1, y: 0 };
            break;
        }
        case 65: { // left
            if (gameState.player.vel.x !== 1)
                gameState.player.vel = { x: -1, y: 0 };
            break;
        }
        case 38: { // up
            if (gameState.player.vel.y !== 1)
                gameState.player.vel = { x: 0, y: -1 };
            break;
        }
        case 87: { // up
            if (gameState.player.vel.y !== 1)
                gameState.player.vel = { x: 0, y: -1 };
            break;
        }
        case 39: { // right
            if (gameState.player.vel.x !== -1)
                gameState.player.vel =  { x: 1, y: 0 };
            break;
        }
        case 68: { // right
            if (gameState.player.vel.x !== -1)
                gameState.player.vel =  { x: 1, y: 0 };
            break;
        }
        case 40: { // down
            if (gameState.player.vel.y !== -1)
                gameState.player.vel =  { x: 0, y: 1 };
            break;
        }
        case 83: { // down
            if (gameState.player.vel.y !== -1)
                gameState.player.vel =  { x: 0, y: 1 };
            break;
        }
    }
}

function paintGame() {
    ctx.fillStyle = BG_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = gameState.food;
    const size = canvas.width / GRID_SIZE;

    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(size);
}

function paintPlayer(size) {
    let snake = gameState.player.snake;

    ctx.fillStyle = SNAKE_COLOUR;
    for (let cell of snake) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
}

function randomFood() {
    gameState.food = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
    }

    for (let cell of gameState.player.snake) {
        if (cell.x === gameState.food.x && cell.y === gameState.food.y) {
            return randomFood();
        }
    }
}

function checkWall(player) {
    if (player.pos.x < 0) {
        player.pos.x = GRID_SIZE - 1;
        return;
    }
    if (player.pos.x === GRID_SIZE) {
        player.pos.x = 0;
        return;
    }
    if (player.pos.y < 0) {
        player.pos.y = GRID_SIZE - 1;
        return;
    }
    if (player.pos.y === GRID_SIZE) {
        player.pos.y = 0;
    }
}

function gameLoop() {
    let player = gameState.player;

    player.pos.x += player.vel.x;
    player.pos.y += player.vel.y;

    checkWall(player);

    player.snake.push({...player.pos});

    if (gameState.food.x === player.pos.x && gameState.food.y === player.pos.y) {
        if (player.snake.length === 400){
            gameActive = 'win';
            return;
        }
        randomFood();
    }
    else {
        player.snake.shift();
    }

    let cnt = 0;
    for (let cell of player.snake) {
        if (cell.x === player.pos.x && cell.y === player.pos.y) {
            cnt++;
            if (cnt > 1) {
                gameActive = 'lose';
                return;
            }
        }
    }
}

function endGame(msg){
    alert('You ' + msg + '!' + ' Score: ' + gameState.player.snake.length + '\/400');
}

function startGameInterval() {
    const interval = setInterval(() => {
        gameLoop();

        if (gameActive) {
            clearInterval(interval);
            endGame(gameActive);
        } else {
            paintGame();
        }

    }, 1000 / FRAME_RATE);
}

init();
startGameInterval();



