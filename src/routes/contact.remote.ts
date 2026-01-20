import { form } from '$app/server';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import * as z from 'zod/mini';

const resend = new Resend(RESEND_API_KEY);

export const sendMessage = form(
	z.object({
		message: z.string().check(z.minLength(1, 'Message required')),
		website: z.optional(z.string())
	}),
	async ({ message, website }) => {
		// honeypot filled = bot, silently "succeed"
		if (website) {
			return { success: true };
		}

		await resend.emails.send({
			from: 'contact@stoicdev.org',
			to: 'stoicdev@brandonpittman.com',
			subject: 'stoicdev.org message',
			html: message
		});

		return { success: true };
	}
);
