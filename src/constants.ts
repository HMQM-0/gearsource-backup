export const apiUrl = process.env.API_URI;
export const appVersion = process.env.APP_VERSION;

export const sentryDsn = process.env.SENTRY_DSN;
export const sentryEnvironment = process.env.SENTRY_ENV;

export const sentryRelease = `storefront@${process.env.npm_package_version}`;

const sampleRate = parseFloat(process.env.SENTRY_APM);
export const sentrySampleRate = isNaN(sampleRate) ? 1 : sampleRate;

export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
export const demoMode = process.env.DEMO_MODE === "true";

export const socialLinks: {
  FACEBOOK?: string;
  INSTAGRAM?: string;
  YOUTUBE?: string;
  TIKTOK?: string;
  TWITTER?: string;
} = process.env.SOCIAL_LINKS as any;
