import { defineEnvVars } from '@sveltejs/kit/env';
import { building } from '$app/env';
import * as z from 'zod/mini';

export const variables = defineEnvVars({
	RESEND_API_KEY: { schema: building ? z.optional(z.string()) : z.string() }
});
