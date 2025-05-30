'use strict';

/**
 * homepage router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/homepage',
      handler: 'homepage.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/homepage',
      handler: 'homepage.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/homepage',
      handler: 'homepage.create',
      config: {
        policies: [],
      },
    },
  ],
};
