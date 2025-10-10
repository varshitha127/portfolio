const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Your email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic;">"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"</p>
          </div>
          <p>Best regards,<br>Your Name</p>
        </div>
      `
    };

    await transporter.sendMail(confirmationMail);

    logger.info(`Contact form submitted by ${email}: ${subject}`);

    res.json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get contact submissions (admin only)
const getSubmissions = async (req, res) => {
  try {
    // In a real application, you'd fetch from database
    // For now, return mock data
    const submissions = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Job Opportunity',
        message: 'I would like to discuss a potential collaboration...',
        timestamp: new Date().toISOString(),
        status: 'unread'
      }
    ];

    res.json({
      success: true,
      submissions: submissions,
      count: submissions.length
    });

  } catch (error) {
    logger.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submissions'
    });
  }
};

module.exports = {
  submitContact,
  getSubmissions
}; 