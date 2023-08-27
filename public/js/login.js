const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                // Handle specific error cases here
                if (response.status === 401) {
                    alert('Incorrect email or password.');
                } else {
                    alert('An error occurred. Please try again later.');
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again later.');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
});
