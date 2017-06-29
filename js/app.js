// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    // Processes movement of enemies
    this.x += this.speed * dt;

    // Checks for collision
    Collide(this);

    // Loops Enemy movement when it reaches the end of the screen
    if (this.x >= 505) {
        this.x = -110;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Handles keypress for player movement
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed * 2;
    }
    if (keyPress == 'up') {
        player.y -= player.speed + 30;
    }
    if (keyPress == 'right') {
        player.x += player.speed * 2;
    }
    if (keyPress == 'down') {
        player.y += player.speed + 30;
    }
};

// Increases the level
var nextLevel = function(level) {

    // Resets current enemies
    allEnemies.length = 0;

    // Determines row for enemy to be placed in
    var row = function() {
        var row = Math.floor(Math.random() * 3 + 1);
        if (row == 1) {
            row = 60;
        } else if (row == 2) {
            row = 145;
        } else if (row == 3) {
            row = 230;
        }
        return row;
    };

    // Adds enemies
    for (var i = 0; i < level; i++) {
        var enemy = new Enemy(-110, row(), Math.floor(Math.random() * 200 + 100));
        allEnemies.push(enemy);
    }
};

var Collide = function(Bug) {
    // Collision with enemy and player
    if (player.y + 130 >= Bug.y + 90 &&
        player.y + 70 <= Bug.y + 130 &&
        player.x + 25 <= Bug.x + 90 &&
        player.x + 75 >= Bug.x + 10) {

        player.x = 202;
        player.y = 380;
    }

    // Collision with top to the next level
    if (player.y + 60 <= 100) {
        player.x = 202;
        player.y = 380;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        level += 1;
        score += 1;
        document.getElementById('score').innerHTML = score;
        nextLevel(level);
    }

    // Collision with walls
    if (player.y > 380) {
        player.y = 380;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202, 380, 50);
var level = 1;
var enemy = new Enemy(0, 230, Math.floor(Math.random() * 200 + 100));
var score = document.getElementById('score');
score = 1;


allEnemies.push(enemy);

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
