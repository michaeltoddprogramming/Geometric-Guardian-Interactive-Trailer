// Michael Todd u23540223

function hoverOnPortal() {
	document.querySelector('.portal').classList.add('hover');
}

function promptOnClick() {
	var confirmation = confirm("Are you sure you want to make a bad decision?");
	if (confirmation) {
		alert("Prepare yourself!");
		document.querySelector('.portal').classList.add('zoom-in');
		setTimeout(function() {
			splitScreen();
			animateLine();
			flashScreen();
		}, 4000);
	} else {
		alert("Too late to think about it!");
	}
}

function splitScreen() {
	var leftScreen = document.createElement("div");
	leftScreen.classList.add("screen");
	leftScreen.classList.add("left-screen");
	document.body.appendChild(leftScreen);

	var rightScreen = document.createElement("div");
	rightScreen.classList.add("screen");
	rightScreen.classList.add("right-screen");
	document.body.appendChild(rightScreen);
}

function animateLine() {
	var line = document.createElement("div");
	line.classList.add("line");
	document.body.appendChild(line);

	setTimeout(function() {
		line.style.opacity = "1";
	}, 1000);
}

function flashScreen() {
	var flash = document.createElement("div");
	flash.classList.add("flash");
	document.body.appendChild(flash);

	setTimeout(function() {
		flash.style.opacity = "0";
		setTimeout(function() {
			window.location.href = "minigame.html";
		}, 5000);
	}, 5000);
}

for (var i = 0; i < 10; i++) {
	var shape = document.createElement("div");
	shape.classList.add("shape");
	var randomShape = Math.floor(Math.random() * 3);
	if (randomShape === 0) {
		shape.classList.add("circle");
	} else if (randomShape === 1) {
		shape.classList.add("square");
	} else {
		shape.classList.add("triangle");
	}
	shape.style.top = Math.random() * window.innerHeight + "px";
	shape.style.left = Math.random() * window.innerWidth + "px";
	document.body.appendChild(shape);
}