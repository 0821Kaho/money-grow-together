
import { prisma } from '../lib/db';
import { Resend } from 'resend';
import * as cron from 'node-cron';

const resend = new Resend(process.env.RESEND_API_KEY);

// API to register for the waitlist
export async function registerWaitlist(email: string) {
  try {
    const existingUser = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { status: 409, message: 'Email already registered' };
    }

    await prisma.waitlist.create({
      data: { email },
    });

    return { status: 200, message: 'Successfully registered' };
  } catch (error) {
    console.error('Error registering to waitlist:', error);
    return { status: 500, message: 'Internal server error' };
  }
}

// API to get the count of waitlist registrations
export async function getWaitlistCount() {
  try {
    const count = await prisma.waitlist.count();
    return { status: 200, count };
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return { status: 500, message: 'Internal server error' };
  }
}

// Schedule the launch notification email
export function scheduleLaunchNotification() {
  // Schedule for May 23, 2025 at 10:00 AM
  cron.schedule('0 10 23 5 *', async () => {
    try {
      // Get all waitlist subscribers
      const subscribers = await prisma.waitlist.findMany();
      
      // Send email to each subscriber
      for (const subscriber of subscribers) {
        await resend.emails.send({
          from: 'Pigipe <noreply@pigipe.app>',
          to: subscriber.email,
          subject: 'Pigipe 本日公開！学習を始めましょう',
          html: `
            <div>
              <h1>Pigipe が公開されました！</h1>
              <p>お待たせしました。Pigipeが本日公開されました。</p>
              <p>ピギペと一緒にお金の知識を楽しく学びましょう。</p>
              <a href="https://pigipe.app/signup" style="background-color: #FF6B6B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px;">
                今すぐ始める
              </a>
            </div>
          `,
        });
      }
      
      console.log('Launch notification emails sent successfully');
    } catch (error) {
      console.error('Error sending launch notification emails:', error);
    }
  });
}
