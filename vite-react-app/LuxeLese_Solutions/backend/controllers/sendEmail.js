import nodemailer from 'nodemailer';
import process from 'process';

const sendEmail = async (options) => {
  // Testing: Use Ethereal (works perfectly for development/testing)
  let transporter;
  
  if (process.env.NODE_ENV === 'production' && process.env.EMAIL_USERNAME) {
    // Production: Gmail
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else {
    // Development: Ethereal (free test emails)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USERNAME || 'noreply@luxelese.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${options.email}`);
    
    if (info.response && info.response.includes('250')) {
      console.log(`📧 Test email preview: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return info;
  } catch (error) {
    console.error(`❌ Email sending failed:`, error.message);
    throw error;
  }
};

export default sendEmail;
