// Define the base URL for the API
const API_URL = 'http://localhost:5000/api';

// Function to register a new user
export const registerUser = async (values) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    
    // Check if the response status is OK (200-299)
    if (!response.ok) {
      // Handle different response statuses
      if (response.status === 400) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Bad request'); // Customize the error message
      }
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    
    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

// Function to log in an existing user
export const loginUser = async (values) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    
    // Check if the response status is OK (200-299)
    if (!response.ok) {
      // Handle different response statuses
      if (response.status === 401) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unauthorized'); // Customize the error message
      }
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    
    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
