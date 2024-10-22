const express = require('express');
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      auth: {
        user: 'kunalbisht909@gmail.com',
        pass: '2B46ABA942C727423D741DCA3E952FD38C42'
      }
    });
  }

  sendEmail(from, to, subject, message) {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: message
    };

    return this.transporter.sendMail(mailOptions);
  }
}

// Instantiate the email service
const emailService = new EmailService();

const app = express();
app.use(express.json());

app.post('/send-email', (req, res) => {
  const { name, email, message, subject } = req.body;

  emailService.sendEmail('kunalbisht909@gmail.com', 'recipient-email@example.com', message, `Message from ${name} (${email}):\n\n${subject}`)
    .then(info => {
      res.status(200).json({ subject: 'Email sent successfully', info });
    })
    .catch(error => {
      res.status(500).json({ subject: 'Error sending email', error });
    });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
