module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      providers: {
        google: {
          enabled: true,
          icon: 'google',
          key: env('GOOGLE_CLIENT_ID', ''),
          secret: env('GOOGLE_CLIENT_SECRET', ''),
          callback: env('GOOGLE_CALLBACK_URL', '/api/connect/google/callback'), // Reverted to default
          scope: ['email', 'profile']
        },
      },
    },
  },
  // email: {
  //   config: {
  //     provider: 'nodemailer',
  //     providerOptions: {
  //       host: env('SMTP_HOST', 'smtp.example.com'), // Default SMTP host
  //       port: env.int('SMTP_PORT', 587),          // Default SMTP port
  //       auth: {
  //         user: env('SMTP_USERNAME'),
  //         pass: env('SMTP_PASSWORD'),
  //       },
  //       secure: env.bool('SMTP_SECURE', false), // Use TLS by default
  //     },
  //     settings: {
  //       defaultFrom: env('EMAIL_DEFAULT_FROM', 'hello@example.com'),
  //       defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'hello@example.com'),
  //     },
  //   },
  // },
});
