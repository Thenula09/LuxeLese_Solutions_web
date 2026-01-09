import axios from 'axios';

const testContactAPI = async () => {
  try {
    console.log('Testing Contact API...');

    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+94785152303',
      subject: 'Test Subject',
      message: 'This is a test message from the contact form API'
    };

    const response = await axios.post('http://localhost:5002/api/contact', testData);

    console.log('✅ Contact API Response:', response.data);

  } catch (error) {
    console.error('❌ Contact API Error:', error.response?.data || error.message);
  }
};

testContactAPI();