function changeTheme() {
    let element = document.body;
    element.classList.toggle("dark");
}

const BACKEND_URL = 'http://localhost:3000/api/login'; // Backend URL

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                console.log('Response status:', response.status);
                if (!response.ok) {
                    const errorResult = await response.json();
                    alert(errorResult.message || 'Login failed.');
                    return;
                }

                const result = await response.json();
                alert(result.message);
                window.location.href = 'menu.html';
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    } else {
        console.error('Login form not found.');
    }
});

