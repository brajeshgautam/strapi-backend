module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      providers: {
        google: {
          enabled: true,
          icon: 'google',
          key: env('GOOGLE_CLIENT_ID', ''),
          secret: env('GOOGLE_CLIENT_SECRET', ''),
          callback: env('GOOGLE_CALLBACK_URL', 'http://localhost:1337/api/connect/google/callback'),
          scope: ['email', 'profile']
        },
      },
    },
  },
});
