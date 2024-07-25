// Handle signup form submission
document.getElementById('signupForm')?.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Show success message
            window.location.href = '/login'; // Redirect to login page
        } else {
            const error = await response.json();
            alert(error.message); // Show error message
        }
    } catch (error) {
        alert('Error signing up: ' + error.message);
    }
});

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Show success message
            window.location.href = '/dashboard'; // Redirect to dashboard page
        } else {
            const error = await response.json();
            alert(error.message); // Show error message
        }
    } catch (error) {
        alert('Error logging in: ' + error.message);
        console.error('Error details:', error);
    }
});
