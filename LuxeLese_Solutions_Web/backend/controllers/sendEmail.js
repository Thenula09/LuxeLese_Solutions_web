import nodemailer from 'nodemailer';
import process from 'process';

const sendEmail = async (options) => {
  // Use Gmail if credentials are provided, otherwise use Ethereal for testing
  let transporter;
  
  console.log('EMAIL_USERNAME:', process.env.EMAIL_USERNAME);
  console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
  
  if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
    console.log('Using Gmail transporter');
    // Production or Dev with credentials: Gmail
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else {
    console.log('Using Ethereal transporter');
    // Development without credentials: Ethereal (free test emails)
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
    
    // Only log test URL for Ethereal
    if (transporter.options.host === 'smtp.ethereal.email') {
      console.log(`📧 Test email preview: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return info;
  } catch (error) {
    console.error(`❌ Email sending failed:`, error.message);
    throw error;
  }
};

export default sendEmail;
