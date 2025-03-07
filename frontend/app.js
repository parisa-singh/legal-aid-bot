document.getElementById('start').addEventListener('click', function() {
    alert('Starting the process...');
});

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const details = document.getElementById('details').value;

    fetch('/submit_profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, details }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        const adviceContainer = document.createElement('div');
        adviceContainer.innerText = data.advice;
        document.body.appendChild(adviceContainer);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
