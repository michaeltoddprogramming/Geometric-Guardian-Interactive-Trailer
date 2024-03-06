// Michael Todd u23540223

setTimeout(function() {
	var arrows = document.querySelectorAll('.arrow');
	arrows.forEach(function(arrow) {
		arrow.style.display = 'block';
	});
	document.querySelector('h1').textContent = 'Oh! Look theres arrows, maybe we can move around using the arrow keys?';
}, 5000);

document.addEventListener('keydown', function(event) {
	if (event.key !== "ArrowUp" && event.key !== "ArrowDown" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
		alert('Use the arrow keys to move around the black abyss!');
	}
});