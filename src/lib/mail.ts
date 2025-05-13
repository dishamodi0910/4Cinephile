import { Resend } from "resend"

const resend  = new Resend("re_CNTjFHf8_F6kMYF8QqcyCLjKj3iCJx7gy");

export const sendVerificationEmail = async(email : string, token : string) =>  {
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject: "🍿 Confirm Your Email for 4Cinephile!",
        html: `
            <style>
                /* CSS styling */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                }
                .logo {
                    margin-bottom: 20px;
                    text-align: center;
                }
                .logo img {
                    width: 150px;
                }
                .message {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
            </style>
            <div class="container">
                <div class="message">
                    <p>Hello there movie buff! 🎬</p>
                    <p>Welcome to <strong>4Cinephile</strong>, your ultimate destination for all things cinema! 🌟</p>
                    <p>At 4Cinephile, we're passionate about movies and want to enhance your cinematic experience. Here are some things we do:</p>
                    <ul>
                        <li>🎁 Personalized recommendations tailored to your taste</li>
                        <li>📰 Access to the latest posts, news, and behind-the-scenes stories</li>
                        <li>🎥 Stay updated with the newest releases and upcoming films</li>
                        <li>🔍 Analysis and reviews of both classic masterpieces and contemporary works</li>
                        <li>🎟️ Convenient ticket booking for movies</li>
                    </ul>
                    <p>To start your cinematic journey, we just need to confirm your email address. Click the button below to confirm:</p>
                    <p><a class="btn" href="${confirmationLink}">Click here to confirm</a></p>
                    <p>Happy watching! 🍿</p>
                    <p>Team 4Cinephile 🎞️</p>
                </div>
            </div>
        `
    })
}


export const sendResetPasswordMail = async(email : string, token : string) =>  {
    const confirmationLink = `http://localhost:3000/auth/reset_password?reset_token=${token}`;

    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Reset Password @4Cinephile",
        html : `
        <style>
                /* CSS styling */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                }
                .logo {
                    margin-bottom: 20px;
                    text-align: center;
                }
                .logo img {
                    width: 150px;
                }
                .message {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
            </style>
            <div class="container">
                <div class="message">
                    <p>Hello there movie buff! 🎬</p>
                    <p>Welcome to <strong>4Cinephile</strong>, your ultimate destination for all things cinema! 🌟</p>
                    <p>At 4Cinephile, we're passionate about movies and want to enhance your cinematic experience. Here are some things we do:</p>
                    <ul>
                        <li>🎁 Personalized recommendations tailored to your taste</li>
                        <li>📰 Access to the latest posts, news, and behind-the-scenes stories</li>
                        <li>🎥 Stay updated with the newest releases and upcoming films</li>
                        <li>🔍 Analysis and reviews of both classic masterpieces and contemporary works</li>
                        <li>🎟️ Convenient ticket booking for movies</li>
                    </ul>
                    <p>To start your cinematic journey, on your request to reset password. Click the button below to rest password :</p>
                    <p><a class="btn" href="${confirmationLink}">Click here to reset password</a></p>
                    <p>Happy watching! 🍿</p>
                    <p>Team 4Cinephile 🎞️</p>
                </div>
            </div>
        `
    })
}

