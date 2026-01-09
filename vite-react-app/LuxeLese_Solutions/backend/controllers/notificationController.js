import twilio from 'twilio';
import process from 'process';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = accountSid && authToken ? new twilio(accountSid, authToken) : null;

export const sendWhatsAppMessage = async (to, message) => {
  if (!client) {
    console.log('Twilio not configured - skipping WhatsApp message');
    return;
  }

  try {
    const response = await client.messages.create({
      from: whatsappNumber,
      to: `whatsapp:${to}`,
      body: message,
    });
    console.log(`✅ WhatsApp message sent: ${response.sid}`);
    return response;
  } catch (error) {
    console.error('❌ WhatsApp message failed:', error.message);
    throw error;
  }
};

export const sendPaymentSuccessNotification = async (phoneNumber, bookingDetails) => {
  // Ensure phone number is in international format for WhatsApp
  let formattedNumber = phoneNumber;
  if (formattedNumber && !formattedNumber.startsWith('+')) {
    // Assume Sri Lankan number if it starts with 0
    if (formattedNumber.startsWith('0')) {
      formattedNumber = '+94' + formattedNumber.substring(1);
    } else {
      formattedNumber = '+' + formattedNumber;
    }
  }

  const message = `🎉 *Payment Successful!*

Thank you for choosing LuxeLese Solutions!

📋 *Booking Details:*
🚗 Car: ${bookingDetails.carName}
📅 Date: ${bookingDetails.date}
💰 Amount: Rs.${bookingDetails.amount}

Your booking has been confirmed. Safe travels!

For any queries, contact us at support@luxelese.com`;

  return await sendWhatsAppMessage(formattedNumber, message);
};