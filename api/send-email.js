const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        const content = {
            to: 'contact@wearewework.com',
            from: 'no-reply@wearewework.com', // ou votre adresse email
            subject: `New Contact from ${name}`,
            text: message,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
        };

        try {
            await sendgrid.send(content);
            res.status(200).send('Email sent successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
