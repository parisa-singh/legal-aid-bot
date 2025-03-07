// Update the toggle button text based on current mode
function updateToggleButtonText() {
    const toggleButton = document.getElementById('toggleMode');
    if (document.body.classList.contains('dark-mode')) {
      toggleButton.innerText = 'Light Mode';
    } else {
      toggleButton.innerText = 'Dark Mode';
    }
  }
  
  // Toggle Dark/Light Mode and update button text
  document.getElementById('toggleMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    updateToggleButtonText();
  });
  
  // Initialize the toggle button text on page load
  updateToggleButtonText();
  
  // Transition from Step 1 to Step 2 with smooth animation
  document.getElementById('toStep2').addEventListener('click', function () {
    document.getElementById('step1').classList.remove('active');
    setTimeout(() => {
      document.getElementById('step2').classList.add('active');
    }, 300); // slight delay for smooth transition
  });
  
  // Transition from Step 2 to Step 3
  document.getElementById('toStep3').addEventListener('click', function () {
    document.getElementById('step2').classList.remove('active');
    setTimeout(() => {
      document.getElementById('step3').classList.add('active');
    }, 300);
  });
  
  // Handle final submission with a loading animation
  document.getElementById('submitProfile').addEventListener('click', function () {
    const harassmentType = document.getElementById('harassmentType').value;
    const location = document.getElementById('location').value;
    const financial = document.getElementById('financial').value;
    const description = document.getElementById('description').value;
  
    const data = {
      category: harassmentType,
      location: location,
      financial: financial,
      description: description,
    };
  
    const outputContainer = document.getElementById('outputContainer');
    
    // Display loading spinner
    outputContainer.innerHTML = `<div class="loading-spinner"></div>`;
    outputContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Call the Flask backend
    fetch('https://legal-aid-bot.onrender.com/submit_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(apiData => {
        // Wait 2 seconds before showing the result
        setTimeout(() => {
          outputContainer.innerHTML = `
            <h2>${apiData.message}</h2>
            <p>${apiData.advice}</p>
          `;
          outputContainer.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        outputContainer.innerHTML = `<p>Sorry, an error occurred. Please try again.</p>`;
      });
  });
  