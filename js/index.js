// Michael Todd u23540223

var elementToMove = document.querySelector('body');

var portal = document.querySelector('.index-portal');

portal.addEventListener('click', function() {
    alert('Your about to get closer to the portal be careful!');
});

setTimeout(function() {
    var arrows = document.querySelectorAll('.arrow');
    arrows.forEach(function(arrow) {
        arrow.style.display = 'block';
    });
    document.querySelector('h1').textContent = 'Oh! Look theres arrows, maybe we can move around using the arrow keys?';
}, 1000);

document.addEventListener('keydown', function(event) {
    var scrollDistance = 25; 
    switch (event.key) {
        case "ArrowUp":
            window.scrollTo({ top: window.scrollY - scrollDistance, behavior: 'smooth' });
            break;
        case "ArrowDown":
            window.scrollTo({ top: window.scrollY + scrollDistance, behavior: 'smooth' });
            break;
        case "ArrowLeft":
            window.scrollTo({ left: window.scrollX - scrollDistance, behavior: 'smooth' });
            break;
        case "ArrowRight":
            window.scrollTo({ left: window.scrollX + scrollDistance, behavior: 'smooth' });
            break;
        default:
            console.log("Other key pressed");
    }
});