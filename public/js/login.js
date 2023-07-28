document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');

    const loginFormHandler = async (event) => {
        event.preventDefault();

        const emailInput = document.getElementById('email-input');
        const passwordInput = document.getElementById('password-login');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    document.getElementById('login-form').addEventListener('submit', loginFormHandler);
});
