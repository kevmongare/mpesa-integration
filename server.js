// server.js
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // Used for API calls

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// POST endpoint to handle M-Pesa payment request
app.post('/api/mpesa', async (req, res) => {
  const { phoneNumber, amount } = req.body;

  // Log the incoming data for debugging
  console.log(`Received payment request for phone: ${phoneNumber} with amount: ${amount}`);

  // TODO: Insert your M-Pesa API credentials and endpoints here
  // Example: Construct a request object for M-Pesa API
  const mpesaRequest = {
    phoneNumber,
    amount,
    // Add additional required parameters as per the M-Pesa API documentation
  };

  try {
    // Example API call to M-Pesa endpoint
    // Replace 'YOUR_MPESA_ENDPOINT' and pass required authentication headers/data
    const response = await axios.post('YOUR_MPESA_ENDPOINT', mpesaRequest, {
      headers: {
        // Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
      }
    });
    
    // Log and send the response from M-Pesa API back to client
    console.log('M-Pesa API response:', response.data);
    res.json({ success: true, data: response.data });
  } catch (error) {
    // Log any errors and send error message back to client
    console.error('Error with M-Pesa API:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
