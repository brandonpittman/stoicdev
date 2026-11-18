import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({ RESEND_API_KEY: { static: true } });
