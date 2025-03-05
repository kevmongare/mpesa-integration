// public/js/main.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const messageDiv = document.getElementById('message');
  
    // Listen for form submission
    paymentForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
  
      // Get values from form inputs
      const phoneNumber = document.getElementById('phoneNumber').value;
      const amount = document.getElementById('amount').value;
  
      // Build the request payload
      const payload = { phoneNumber, amount };
  
      try {
        // Make a POST request to the server API endpoint
        const response = await fetch('/api/mpesa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        const result = await response.json();
  
        // Check if the request was successful
        if (result.success) {
          messageDiv.innerText = 'Payment initiated successfully!';
        } else {
          messageDiv.innerText = `Payment failed: ${result.error}`;
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        messageDiv.innerText = 'An error occurred while processing your payment.';
      }
    });
  });
  