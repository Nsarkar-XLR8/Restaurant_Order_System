
function changeTheme(){
    let element = document.body;
    element.classList.toggle("dark");
}
const BACKEND_URL = 'http://localhost:3000/api/signup';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    if(signupForm){
        // console.log('Signup form detected');
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try{
                const response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                })

                console.log('Response status:', response.status);
                if(!response.ok){
                    const errorResult = await response.json();
                    alert(errorResult.message || 'Signup failed.');
                    return;
                }
                const result = await response.json();
                alert(result.message);
                window.location.href = 'login.html';

            }catch(error){
                console.error('Error during signup:', error);
                alert('An error occurred. Please try again later.');
            }
        })
    }
})