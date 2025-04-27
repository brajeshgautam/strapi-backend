'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/navigation',
      handler: 'navigation.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/navigation',
      handler: 'navigation.update',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/navigation',
      handler: 'navigation.create',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
}; 