const nodeMailer = require("nodemailer");
module.exports = class Email {
  constructor(user, url) {
    this.to = user && user.email ? user.email : undefined;
    this.userName = (user && (user.user_name || user.name)) || "there";
    this.url = url; // optional deep-link to dashboard
    const fromName = process.env.EMAIL_FROM_NAME || "Support";
    const fromEmail = process.env.EMAIL_FROM || "no-reply@example.com";
    this.from = `${fromName} <${fromEmail}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      //sendgrid
      return nodeMailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    //nodemailer for development
    return nodeMailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, message, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      text: message,
      html: html,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcom() {
    const subject = "Welcome to the family!";
    const text = [
      `Hi ${this.userName},`,
      ``,
      `Welcome to the family! We're so excited to have you on board.`,
      `Explore your dashboard to get started.`,
    ].join("\n");

    const dashboardUrl = this.url || process.env.FRONTEND_URL || "#";
    const html = `
      <div style="background:#f8fafc;padding:24px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
          <tr>
            <td style="padding:24px 24px 0 24px">
              <h1 style="margin:0 0 8px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:22px;line-height:30px;color:#0f172a;">Welcome, ${this.userName}! 🎉</h1>
              <p style="margin:0 0 16px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;line-height:20px;color:#334155;">We're thrilled to have you on board. Jump into your dashboard to explore all the tools.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px">
              <a href="${dashboardUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px">Go to dashboard</a>
              <p style="margin:16px 0 0 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;line-height:18px;color:#64748b">Need help? Just reply to this email.</p>
            </td>
          </tr>
        </table>
      </div>`;

    await this.send(subject, text, html);
  }

  async sendResetPassword() {
    const subject = "Your password reset link (valid for 10 minutes)";
    const resetUrl = this.url || process.env.FRONTEND_URL || "#";
    const text = [
      `Hi ${this.userName},`,
      ``,
      `We received a request to reset your password.`,
      `Use the link below within 10 minutes:`,
      `${resetUrl}`,
      ``,
      `If you didn't request this, you can safely ignore this email.`,
    ].join("\n");

    const html = `
      <div style="background:#f8fafc;padding:24px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
          <tr>
            <td style="padding:24px 24px 0 24px">
              <h1 style="margin:0 0 8px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:20px;line-height:28px;color:#0f172a;">Reset your password</h1>
              <p style="margin:0 0 16px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;line-height:20px;color:#334155;">We received a request to reset your password. This link expires in <strong>10 minutes</strong>.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px">
              <a href="${resetUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px">Reset password</a>
              <p style="margin:16px 0 0 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;line-height:18px;color:#64748b">If you didn’t request this, you can safely ignore this email.</p>
            </td>
          </tr>
        </table>
      </div>`;

    await this.send(subject, text, html);
  }

  async sendSubscriptionConfirmation(details) {
    const { plan, amount, currency = "USD", paymentMethod, periodEnd } = details;
    const subject = `Your ${plan === "yearly" ? "Yearly" : "Monthly"} Premium Subscription`;

    // Plain text fallback
    const textLines = [
      `Hi ${this.userName},`,
      ``,
      `Thanks for upgrading to Premium! Here are your subscription details:`,
      `• Plan: ${plan === "yearly" ? "Yearly" : "Monthly"}`,
      `• Amount: ${amount} ${currency}`,
      paymentMethod ? `• Payment method: ${paymentMethod}` : null,
      `• Renews on: ${periodEnd}`,
      ``,
      `You can manage or cancel your subscription anytime from your account dashboard.`,
    ].filter(Boolean);

    // HTML version (responsive-friendly with inline styles)
    const dashboardUrl = this.url || process.env.FRONTEND_URL || "#";
    const html = `
      <div style="background:#f8fafc;padding:24px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
          <tr>
            <td style="padding:24px 24px 0 24px">
              <h1 style="margin:0 0 8px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:20px;line-height:28px;color:#0f172a;">Thanks for upgrading, ${this.userName}!</h1>
              <p style="margin:0 0 16px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;line-height:20px;color:#334155;">Here are your Premium subscription details.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:10px">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0">
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#0f172a"><strong>Plan</strong></div>
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155">${plan === "yearly" ? "Yearly" : "Monthly"}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0">
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#0f172a"><strong>Amount</strong></div>
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155">${amount} ${currency}</div>
                  </td>
                </tr>
                ${paymentMethod ? `
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0">
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#0f172a"><strong>Payment method</strong></div>
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155">${paymentMethod}</div>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:16px 20px">
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#0f172a"><strong>Renews on</strong></div>
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155">${periodEnd}</div>
                  </td>
                </tr>
              </table>

              <div style="height:16px"></div>
              <a href="${dashboardUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px">Manage subscription</a>

              <p style="margin:16px 0 0 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;line-height:18px;color:#64748b">If you didn’t make this change, please contact support immediately.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;border-top:1px solid #e2e8f0;background:#f8fafc">
              <p style="margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;color:#94a3b8">This is an automated message. Please don’t reply.</p>
            </td>
          </tr>
        </table>
      </div>`;

    await this.send(subject, textLines.join("\n"), html);
  }

  async sendCancellationConfirmation(details = {}) {
    const { currentPeriodEnd } = details; // optional info
    const subject = "Your subscription has been cancelled";

    const text = [
      `Hi ${this.userName},`,
      ``,
      `Your Premium subscription has been cancelled.`,
      currentPeriodEnd ? `Access remains active until: ${currentPeriodEnd}` : `Your access to Premium features has been removed.`,
      ``,
      `You can re-upgrade anytime from your dashboard.`,
    ].join("\n");

    const dashboardUrl = this.url || process.env.FRONTEND_URL || "#";
    const html = `
      <div style="background:#f8fafc;padding:24px">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
          <tr>
            <td style="padding:24px 24px 0 24px">
              <h1 style="margin:0 0 8px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:20px;line-height:28px;color:#0f172a;">Subscription cancelled</h1>
              <p style="margin:0 0 16px 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;line-height:20px;color:#334155;">We're sorry to see you go, ${this.userName}.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px 24px">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:10px">
                ${currentPeriodEnd ? `
                <tr>
                  <td style="padding:16px 20px">
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#0f172a"><strong>Access remains until</strong></div>
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155">${currentPeriodEnd}</div>
                  </td>
                </tr>` : `
                <tr>
                  <td style="padding:16px 20px">
                    <div style="font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px;color:#334155">Your Premium access has been removed.</div>
                  </td>
                </tr>`}
              </table>

              <div style="height:16px"></div>
              <a href="${dashboardUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:14px">Return to dashboard</a>

              <p style="margin:16px 0 0 0;font-family:Inter,Segoe UI,Arial,sans-serif;font-size:12px;line-height:18px;color:#64748b">If this was a mistake, you can upgrade again anytime.</p>
            </td>
          </tr>
        </table>
      </div>`;

    await this.send(subject, text, html);
  }
};
