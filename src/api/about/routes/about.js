'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/about',
      handler: 'about.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/about',
      handler: 'about.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/about',
      handler: 'about.create',
      config: {
        policies: [],
      },
    },
  ],
};