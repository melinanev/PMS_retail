document.getElementById('home-button').addEventListener('click', function() {
    window.location.href = '../Home/home.html';
});

document.querySelectorAll('main button').forEach(function(button) {
    button.addEventListener('click', function() {
        window.location.href = button.getAttribute('onclick').match(/'(.*?)'/)[1];
    });
});