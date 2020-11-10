const nodeMailer = require('nodemailer');

exports.form = (obj) => {
    //--------------------Email Structure--------------------\\
        let email = {
        // from: 'me@adriandeniz.com',
        to: 'ajdeniz@gmail.com',
        replyTo: `${obj.email}`,
        subject: 'Node.js Contact Form',
        text: `You just got a form submission! Form: Contact Form Site: www.nodeproject.com Submitted Content: Name: ${obj.name} Email: ${obj.email} Message: ${obj.message}`,
        html: `You just got a form submission! <br/><br/>
                <strong>Form</strong> <br/>
                Contact Form <br/><br/>
                <strong>Site</strong> <br/>
                NodeProject <br/><br/>
                <strong>Submitted Content</strong> <br/>
                Name: ${obj.name} <br/>
                Email: ${obj.email} <br/> 
                Message: ${obj.message}` 
        };
    //--------------------End Of Code--------------------\\





    //--------------------nodemailer-code--------------------\\
        let client = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
            // user: 'me@adriandeniz.com',
            // pass: 'Timcwe89!'
            type: 'OAuth2', //Authentication type
            user: 'ajdeniz@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
            }
        });

        client.sendMail(email, function(err, info){
            if (err){
                console.log(err);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        });
    //--------------------End Of Code--------------------\\
    // });
};