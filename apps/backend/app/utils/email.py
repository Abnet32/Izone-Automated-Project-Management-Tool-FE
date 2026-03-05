import os
from dotenv import load_dotenv
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM", os.getenv("MAIL_USERNAME")),
    MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
    MAIL_SERVER=os.getenv("MAIL_HOST"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

fast_mail = FastMail(conf)

async def send_invitation_email(
    email: str,
    workspace_name: str,
    invite_link: str
):
    html_body = f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Izone Invitation</title>
</head>

<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:60px 20px;background:#f3f4f6;">
<tr>
<td align="center">

<!-- Card -->
<table width="520" cellpadding="0" cellspacing="0" style="
background:#ffffff;
border-radius:6px;
border:1px solid #e5e7eb;
padding:40px 30px;
">

<!-- Logo -->
<tr>
<td align="center" style="padding-bottom:25px;">
<span style="
font-size:28px;
font-weight:700;
color:#2563eb;
">
Izone
</span>
</td>
</tr>

<!-- Message -->
<tr>
<td align="center" style="
font-size:16px;
color:#374151;
line-height:1.6;
padding-bottom:30px;
">

You've been invited to join the <b>{workspace_name}</b><br>
workspace on Izone.

</td>
</tr>

<!-- Button -->
<tr>
<td align="center" style="padding-bottom:25px;">

<a href="{invite_link}" style="
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 28px;
font-size:15px;
font-weight:600;
border-radius:4px;
display:inline-block;
">
Join Workspace
</a>

</td>
</tr>

<!-- Expire text -->
<tr>
<td align="center" style="
font-size:13px;
color:#6b7280;
">
This link will expire in 7 days.
</td>
</tr>

</table>
<!-- End Card -->

</td>
</tr>
</table>

</body>
</html>
"""

    message = MessageSchema(
        subject=f"🎉 You're invited to join {workspace_name} on Izone",
        recipients=[email],
        body=html_body,
        subtype=MessageType.html
    )

    await fast_mail.send_message(message)
