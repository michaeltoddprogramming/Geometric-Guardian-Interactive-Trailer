//  Michael Todd u23540223

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = 'img/Character.png';

const playerBullets = [];
const enemyBullets = [];

const enemy = {
	x: Math.random() * canvas.width,
	y: 150,
	width: 50,
	height: 50,
	health: 100,
	color: "red",
	speed: 2,
	directionX: Math.random() < 0.5 ? -1 : 1,
	draw: function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},
	update: function() {
		this.x += this.speed * this.directionX;
		if (this.x < 0 || this.x + this.width > canvas.width) this.directionX *= -1;
	},
	attack: function() {
		if (Math.random() < 0.01) {
			const bullet = {
				x: this.x + this.width / 2,
				y: this.y + this.height,
				width: 10,
				height: 10,
				color: "green",
				draw: function() {
					ctx.fillStyle = this.color;
					ctx.beginPath();
					ctx.moveTo(this.x, this.y);
					ctx.lineTo(this.x + this.width / 2, this.y + this.height);
					ctx.lineTo(this.x + this.width, this.y);
					ctx.closePath();
					ctx.fill();
				},
				update: function() {
					this.y += 3;
				}
			};

			enemyBullets.push(bullet);
		}
	}
};


const player = {
	x: canvas.width / 2,
	y: canvas.height - 50,
	width: 50,
	height: 100,
	color: "blue",
	speed: 3,
	isMovingLeft: false,
	isMovingRight: false,
	health: 100,
	score: 0,
	draw: function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},
	shoot: function() {
		const bullet = {
			x: this.x + this.width / 2,
			y: this.y,
			width: 10,
			height: 10,
			color: "red",
			draw: function() {
				ctx.fillStyle = this.color;
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.x + this.width / 2, this.y - this.height);
				ctx.lineTo(this.x + this.width, this.y);
				ctx.closePath();
				ctx.fill();
			},
			update: function() {
				this.y -= 5;
			}
		};

		playerBullets.push(bullet);
	},
	update: function() {
		if (this.isMovingLeft) {
			this.x -= this.speed;
		}
		if (this.isMovingRight) {
			this.x += this.speed;
		}
	}
};

function isColliding(player, bullet) {
	return player.x < bullet.x + bullet.width &&
		player.x + player.width > bullet.x &&
		player.y < bullet.y + bullet.height &&
		player.y + player.height > bullet.y;
}

const bullets = [];

document.addEventListener("keydown", function(event) {
	if (event.key === "ArrowLeft") {
		player.isMovingLeft = true;
	} else if (event.key === "ArrowRight") {
		player.isMovingRight = true;
	} else if (event.code === "Space") {
		player.shoot();
	}
});

document.addEventListener("keyup", function(event) {
	if (event.key === "ArrowLeft") {
		player.isMovingLeft = false;
	} else if (event.key === "ArrowRight") {
		player.isMovingRight = false;
	}
});

let gameRunning = true;

function gameLoop() {
	if (!gameRunning) return;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.update();

	enemyBullets.forEach(function(bullet) {
		bullet.update();
		bullet.draw();
		if (isColliding(player, bullet)) {
			console.log("Player hit by bullet!");
			const bulletIndex = enemyBullets.indexOf(bullet);
			enemyBullets.splice(bulletIndex, 1);
			player.health -= 10;
			console.log("Player's current health: " + player.health);
			document.getElementById('playerHealth').textContent = "Player Health: " + player.health;

			if (player.health <= 0) {
				gameRunning = false;
				console.log("Game Over! Enemy wins!");
				document.getElementById('gameOver').textContent = "Game Over! Enemy wins!";
			}
		}
	});

	enemy.update();
	enemy.attack();

	playerBullets.forEach(function(bullet) {
		bullet.update();
		bullet.draw();
		if (isColliding(enemy, bullet)) {
			console.log("Enemy hit by bullet!");
			const bulletIndex = playerBullets.indexOf(bullet);
			playerBullets.splice(bulletIndex, 1);
			enemy.health -= 10;
			player.score += 10;
			console.log("Enemy's current health: " + enemy.health);
			console.log("Player's current score: " + player.score);
			document.getElementById('enemyHealth').textContent = "Enemy Health: " + enemy.health;
			document.getElementById('playerScore').textContent = "Player Score: " + player.score;

			if (enemy.health <= 0) {
				gameRunning = false;
				console.log("Game Over! Player wins!");
				document.getElementById('gameOver').textContent = "Game Over! Player wins!";
			}
		}
	});

	player.draw();
	enemy.draw();

	if (gameRunning) requestAnimationFrame(gameLoop);
}
gameLoop();