'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/footer',
      handler: 'footer.find',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/footer',
      handler: 'footer.update',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/footer',
      handler: 'footer.create',
      config: {
        policies: [],
      },
    },
  ],
}; 