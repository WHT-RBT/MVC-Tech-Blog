const signupForm = document.getElementById('signup-form');
const signupStatusEl = document.getElementById('signup-status');

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    if (username.length <= 4 || email.length <= 4 || password.length <= 4) {
        signupStatusEl.textContent =
            'Complete all fields. Character count must be a minimum of 5 characters';
        signupStatusEl.style.color = 'red';

        setTimeout(() => {
            signupStatusEl.textContent =
                'Complete all fields. Character count must be a minimum of 5 characters';
            signupStatusEl.style.color = 'black';
        }, 4000);
    } else {
        try {
            const response = await fetch(`/api/users/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Handle the JSON data as needed (e.g., redirect to dashboard)
                document.location.replace('/dashboard');
            } else {
                // Handle non-JSON responses (e.g., HTML error pages)
                console.log('Error:', response.status, response.statusText);
                signupStatusEl.textContent = 'An error occurred during signup. Please try again.';
                signupStatusEl.style.color = 'red';
            }
        } catch (error) {
            // Handle network errors or other issues
            console.log('Error:', error);
            signupStatusEl.textContent = 'An error occurred during signup. Please try again.';
            signupStatusEl.style.color = 'red';
        }
    }
}

signupForm.addEventListener('submit', signupFormHandler);
