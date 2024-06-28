const API_URL = 'http://localhost:5000/api';

export const getTherapists = async () => {
  try {
    const response = await fetch(`${API_URL}/therapists`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched therapists:', data); // Log fetched therapist data
    return data;
  } catch (error) {
    console.error('Error fetching therapists:', error);
    throw error;
  }
};


export const getTherapist = async (id) => {
  try {
    const response = await fetch(`${API_URL}/therapists/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched therapist:', data); // Log fetched therapist data
    return data;
  } catch (error) {
    console.error('Error fetching therapist:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Created appointment:', data); // Log created appointment data
    return data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    console.log('Logging in:', loginData); // Log data being sent
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Login response:', data); // Log login response
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (registerData) => {
  try {
    console.log('Registering:', registerData); // Log data being sent
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Register response:', data); // Log register response
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const registerAdmin = async (registerData) => {
  try {
    console.log('Registering admin:', registerData); // Log data being sent
    const response = await fetch(`${API_URL}/admin/register-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Register admin response:', data); // Log register admin response
    return data;
  } catch (error) {
    console.error('Error registering admin:', error);
    throw error;
  }
};

export const getFAQs = async () => {
  try {
    const response = await fetch(`${API_URL}/faqs`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched FAQs:', data); // Log fetched FAQs data
    return data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

export const addFAQ = async (question) => {
  try {
    const response = await fetch(`${API_URL}/faqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Added FAQ:', data); // Log added FAQ data
    return data;
  } catch (error) {
    console.error('Error adding FAQ:', error);
    throw error;
  }
};

export const updateFAQ = async (id, answer) => {
  try {
    const response = await fetch(`${API_URL}/faqs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ answer }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Updated FAQ:', data); // Log updated FAQ data
    return data;
  } catch (error) {
    console.error('Error updating FAQ:', error);
    throw error;
  }
};
