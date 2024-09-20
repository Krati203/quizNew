document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('AcessFrom');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const staffId = document.getElementById('staff-id').value;
        const password = document.getElementById('password').value;

        fetch('/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ staffId, password })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data); // Log server response
            alert('Staff ID and Password have been stored in the Admin table!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
