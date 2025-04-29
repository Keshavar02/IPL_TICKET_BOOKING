// script.js

// Function to send form data to the server
async function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get data from input fields
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Data submitted successfully!');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit data');
    }
}

// Attach the submitForm function to the form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('dataForm');
    form.addEventListener('submit', submitForm);
});
