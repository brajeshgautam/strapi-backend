'use strict';

/**
 * consultation-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

// Use createCoreService to extend the default service functionality
module.exports = createCoreService('api::consultation-request.consultation-request', ({ strapi }) => ({
  // You can add custom service methods here if needed in the future
  // For example:
  // async myCustomLogic(args) {
  //   console.log('Running custom service logic...');
  //   const result = await super.find(args); // Call default methods using 'super'
  //   return result;
  // }
}));
