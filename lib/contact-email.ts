type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  topic: string;
  subject: string;
  phone: string;
  emailSubject: string;
  text: string;
  fallbackHtml: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildBrandedContactEmail(input: ContactEmailInput) {
  const { name, email, message, topic, subject, phone, emailSubject, text } = input;
  const reference = `LH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const receivedAt = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Toronto",
  }).format(new Date());

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif;color:#0d1117">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f5f8">
    <tr><td align="center" style="padding:32px 12px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e2e8f0">
        <tr><td background="https://loanhero.ca/assets/email/contact-header-bg.jpg" style="padding:76px 32px;background-color:#0d1117;background-image:url('https://loanhero.ca/assets/email/contact-header-bg.jpg');background-position:center;background-size:cover;color:#ffffff;text-align:center">
          <h1 style="margin:0;font-size:34px;line-height:1.15;font-weight:700;letter-spacing:-0.8px;color:#ffffff">New message from ${escapeHtml(name)}</h1>
          <div style="margin-top:14px;font-size:16px;line-height:1.4;font-weight:400;color:#e0e7ff">${escapeHtml(subject || topic)}</div>
        </td></tr>
        <tr><td style="padding:30px 32px 12px">
          <div style="font-size:11px;line-height:1.5;font-weight:700;color:#f97316">${escapeHtml(receivedAt)} &nbsp;&middot;&nbsp; ${reference}</div>
          <h2 style="margin:16px 0 0;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.4px;color:#0d1117">${escapeHtml(subject || topic)}</h2>
          <div style="margin-top:20px;font-size:16px;line-height:1.65;white-space:pre-wrap;color:#374151">${escapeHtml(message)}</div>
          <div style="margin-top:22px;font-size:11px;line-height:1.5;color:#6b7280">
            <a href="mailto:${escapeHtml(email)}" style="color:#4f46e5;text-decoration:none">${escapeHtml(email)}</a>
            ${phone ? `<span style="padding:0 7px;color:#cbd5e1">&middot;</span><span>${escapeHtml(phone)}</span>` : ""}
          </div>
        </td></tr>
        <tr><td align="center" style="padding:24px 32px 28px">
          <img src="https://loanhero.ca/favicon.svg" width="56" alt="LoanHero" style="display:block;width:56px;max-width:100%;height:auto;margin:0 auto;border:0">
          <div style="margin-top:14px;font-size:11px;line-height:1.6;color:#6b7280">
            <a href="https://loanhero.ca/privacy-policy" style="color:#4f46e5;text-decoration:underline">Privacy Policy</a>
            <span style="padding:0 7px;color:#cbd5e1">|</span>
            <a href="https://loanhero.ca/terms-of-use" style="color:#4f46e5;text-decoration:underline">Terms of Use</a>
          </div>
          <div style="margin-top:14px;font-size:10px;line-height:1.65;color:#9ca3af">
            Sent securely from the LoanHero contact form.<br>
            Never request passwords, banking credentials, or security codes by email.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject: emailSubject, html, text: `${text}\n\nReference: ${reference}` };
}
