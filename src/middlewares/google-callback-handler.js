'use strict';

const utils = require('@strapi/utils');
const { sanitize } = utils;
const { ApplicationError, NotFoundError } = utils.errors;
const axios = require('axios');
const crypto = require('crypto'); // Import Node.js crypto

// Helper function to get the redirect URL for the frontend
const getFrontendRedirectURL = () => {
  return process.env.FRONTEND_CALLBACK_URL || 'http://localhost:4200/about';
};

/**
 * `google-callback-handler` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.method === 'GET' && ctx.path === '/api/connect/google/callback') {
      console.log('--- MIDDLEWARE: Intercepting GET /api/connect/google/callback ---');
      console.log('--- MIDDLEWARE: Received query:', JSON.stringify(ctx.query, null, 2));

      const jwtService = strapi.service('plugin::users-permissions.jwt');
      const userService = strapi.service('plugin::users-permissions.user');
      const redirectUrl = getFrontendRedirectURL();
      const googleTokenURL = 'https://oauth2.googleapis.com/token';
      const googleUserInfoURL = 'https://www.googleapis.com/oauth2/v3/userinfo'; // Or use id_token
      const callbackPath = '/api/connect/google/callback'; // Must match Google Console
      const strapiBaseUrl = strapi.config.get('server.url', 'http://localhost:1337');
      const redirectUri = `${strapiBaseUrl}${callbackPath}`;

      const code = ctx.query.code;
      if (!code) {
        console.error('--- MIDDLEWARE: No code received from Google ---');
        return ctx.redirect(`${redirectUrl}?error=true&message=Authentication%20failed%20(no%20code)`);
      }

      try {
        // --- Step 1: Exchange code for tokens ---
        console.log(`--- MIDDLEWARE: Exchanging code for token at ${googleTokenURL} ---`);
        const tokenResponse = await axios.post(googleTokenURL, null, {
          params: {
            code: code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: redirectUri, // Use the constructed absolute URL
            grant_type: 'authorization_code',
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });

        const { access_token, id_token } = tokenResponse.data;
        if (!access_token) {
           throw new Error('Failed to retrieve access token from Google.');
        }
        console.log('--- MIDDLEWARE: Received access_token from Google ---');
        // We could decode id_token here too for user info, skipping for now & using userinfo endpoint

        // --- Step 2: Get user info from Google ---
        console.log(`--- MIDDLEWARE: Fetching user info from ${googleUserInfoURL} ---`);
        const userInfoResponse = await axios.get(googleUserInfoURL, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const googleUser = userInfoResponse.data;
        const { email, name, picture, sub: googleId } = googleUser;
        if (!email) {
            throw new Error('Failed to retrieve email from Google user info.');
        }
        console.log(`--- MIDDLEWARE: Received Google user info for email: ${email} ---`);

        // --- Step 3: Find or create Strapi user ---
        const userQuery = strapi.db.query('plugin::users-permissions.user');
        let user = await userQuery.findOne({ where: { email: email } });

        if (!user) {
          console.log(`--- MIDDLEWARE: User not found for ${email}, creating new user ---`);
          // Find the default 'authenticated' role
          const defaultRole = await strapi.db.query('plugin::users-permissions.role')
                                      .findOne({ where: { type: 'authenticated' } });

          if (!defaultRole) {
            throw new Error('Could not find the default authenticated role.');
          }

          const newUserPayload = {
            username: name || email, // Use name or fallback to email for username
            email: email,
            provider: 'google', // Mark provider as google
            confirmed: true, // Auto-confirm Google users
            role: defaultRole.id,
            // We need a password, but it won't be used for Google login.
            // Generate a random one or leave it to a default mechanism if your setup allows.
            // For safety, let's generate a complex, unusable password string.
            password: crypto.randomBytes(20).toString('hex'), // Use Node.js crypto
            // Consider storing googleId and picture URL if needed in your user schema
            // googleId: googleId, // Requires adding this field to the User content type
            // pictureUrl: picture, // Requires adding this field
          };

          user = await userService.add(newUserPayload);
          console.log(`--- MIDDLEWARE: Created new user with ID: ${user.id} ---`);
        } else {
           console.log(`--- MIDDLEWARE: Found existing user with ID: ${user.id} ---`);
        }

        // --- Step 4: Issue Strapi JWT ---
        const jwt = jwtService.issue({ id: user.id });
        console.log(`--- MIDDLEWARE: Issued Strapi JWT for user: ${user.id} ---`);

        // --- Step 5: Redirect to Frontend ---
        console.log(`--- MIDDLEWARE: Redirecting to ${redirectUrl} with Strapi JWT ---`);
        return ctx.redirect(`${redirectUrl}?jwt=${jwt}`);

      } catch (error) {
        console.error('--- MIDDLEWARE: Error during manual Google connection ---');
        if (axios.isAxiosError(error)) {
            console.error('Axios Error Details:', error.response?.data || error.message);
        } else {
            console.error(error);
        }
        const message = error.message || 'Google authentication failed';
        return ctx.redirect(`${redirectUrl}?error=true&message=${encodeURIComponent(message)}`);
      }
    } else {
      await next();
    }
  };
};
