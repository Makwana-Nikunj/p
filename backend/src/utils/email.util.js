import { BrevoClient } from '@getbrevo/brevo';

let brevo;

const getBrevo = () => {
    if (!brevo) {
        brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
    }
    return brevo;
};

export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    const sender = {
        email: process.env.BREVO_SENDER_EMAIL,
        name: process.env.BREVO_SENDER_NAME,
    };

    try {
        await getBrevo().transactionalEmails.sendTransacEmail({
            sender,
            to: [{ email }],
            subject: "Verify your email address",
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Verify your email</h2>
                    <p style="color: #555;">
                        Thanks for signing up! Please verify your email address by clicking the button below.
                        This link will expire in <strong>24 hours</strong>.
                    </p>
                    <a href="${verificationLink}"
                       style="display: inline-block; padding: 12px 24px; background-color: #4F46E5;
                              color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                        Verify Email
                    </a>
                    <p style="color: #999; font-size: 12px;">
                        If you did not create an account, you can safely ignore this email.
                    </p>
                    <p style="color: #999; font-size: 12px;">
                        Or copy this link: ${verificationLink}
                    </p>
                </div>
            `
        });
        console.log(`[Email] Verification sent to ${email}`);
    } catch (error) {
        console.error("[Email] Brevo email error:", error?.body || error.message);
        // Don't throw — registration should succeed even if email fails
    }
};
