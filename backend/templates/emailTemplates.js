const getResetPasswordTemplate = (name, resetLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset</title>
  </head>

  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:40px 0; border-radius:10px; overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td style="background: linear-gradient(90deg, #4CAF50, #2e7d32); padding:20px; text-align:center;">
                <h1 style="color:#fff; margin:0;">VaultPass 🔐</h1>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;">
                
                <h2 style="color:#333;">Hello ${name || 'User'},</h2>
                
                <p style="color:#555; line-height:1.6;">
                  We received a request to reset your password. Click the button below to continue.
                </p>

                <!-- BUTTON -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="${resetLink}" 
                     style="
                      background: linear-gradient(90deg, #4CAF50, #2e7d32);
                      color:#ffffff;
                      padding:14px 25px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                      display:inline-block;
                     ">
                    Reset Password
                  </a>
                </div>

                <p style="color:#999; font-size:14px;">
                  This link will expire in <b>10 minutes</b>.
                </p>

                <!-- FALLBACK -->
                <p style="font-size:12px; color:#aaa;">
                  If the button doesn't work, copy & paste this link:
                  <br/>
                  <a href="${resetLink}" style="color:#4CAF50;">${resetLink}</a>
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f4f4f4; padding:20px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} VaultPass. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};


const getOTPTemplate = (name, otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>OTP Verification</title>
  </head>

  <body style="margin:0; padding:0; background:#f4f6f8; font-family: Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          
          <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; margin:40px 0; border-radius:10px; overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td style="background: linear-gradient(90deg, #2196F3, #0d47a1); padding:20px; text-align:center;">
                <h1 style="color:#fff; margin:0;">VaultPass 🔐</h1>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;">
                
                <h2 style="color:#333;">Hello ${name || 'User'},</h2>
                
                <p style="color:#555; line-height:1.6;">
                  Welcome to VaultPass! Use the OTP below to verify your account.
                </p>

                <!-- OTP BOX -->
                <div style="text-align:center; margin:30px 0;">
                  <span style="
                    font-size:32px;
                    letter-spacing:8px;
                    font-weight:bold;
                    color:#2196F3;
                    background:#e3f2fd;
                    padding:15px 25px;
                    border-radius:8px;
                    display:inline-block;
                  ">
                    ${otp}
                  </span>
                </div>

                <p style="color:#999; font-size:14px;">
                  This OTP will expire in <b>5 minutes</b>.
                </p>

                <p style="color:#999; font-size:12px;">
                  Do not share this code with anyone.
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f4f4f4; padding:20px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} VaultPass. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};


module.exports = {
  getResetPasswordTemplate,
  getOTPTemplate,
};
