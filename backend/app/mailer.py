import os
import smtplib
import logging
from email.message import EmailMessage

logger = logging.getLogger("mailer")

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


def send_email(to: str, subject: str, body: str) -> bool:
    """Send a plain-text email via Gmail SMTP. Never raises — a notification
    failure must not break the request that triggered it (an enquiry or
    newsletter signup is already saved to the database by that point)."""
    address = os.environ.get("EMAIL_ADDRESS")
    password = os.environ.get("EMAIL_APP_PASSWORD")
    if not address or not password:
        logger.warning("Email not sent (EMAIL_ADDRESS/EMAIL_APP_PASSWORD not set): %s", subject)
        return False

    msg = EmailMessage()
    msg["From"] = f"Kcopi Global <{address}>"
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
            server.starttls()
            server.login(address, password)
            server.send_message(msg)
        return True
    except Exception:
        logger.exception("Failed to send email: %s", subject)
        return False
