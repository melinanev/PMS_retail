document.addEventListener('DOMContentLoaded', function() {
    // Override default form submission for login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // For now, just redirect to home page
            window.location.href = '../Home/home.html';
        });
    }

    // Handle Clock In/Out button click
    const clockinForm = document.getElementById('clockin-form');
    if (clockinForm) {
        clockinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.querySelector('#clockin-form #username').value.trim();
            const password = document.querySelector('#clockin-form #password').value.trim();

            if (username && password) {
                let clockInStatus = 'clocked in'; // Assume clocking in for demonstration
                let message = `${username}, you have been ${clockInStatus}! Would you like to go to the Home Page?`;
                openModal(message);

                // Send data to the database (example using fetch API)
                fetch('/api/clockin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, clockInStatus })
                })
                .then(response => response.json())
                .then(data => console.log('Success:', data))
                .catch((error) => console.error('Error:', error));
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Get modal elements
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeButton = document.querySelector('.close-button');
    const goHomeButton = document.getElementById('goHomeButton');

    // Function to open modal
    function openModal(message) {
        if (modal && modalMessage) {
            modalMessage.textContent = message;
            modal.style.display = 'block';
        }
    }

    // Function to close modal
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Event listeners
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    if (goHomeButton) {
        goHomeButton.addEventListener('click', function() {
            window.location.href = '../Home/home.html';
        });
    }
});
