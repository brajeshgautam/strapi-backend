'use strict';

module.exports = {
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::navigation.navigation', 1, {
        populate: {
          logo: '*',
          contactInfo: '*',
          socialLinks: '*',
          menuItems: { populate: { dropdownItems: '*' } },
          languages: '*'
        }
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },

  async create(ctx) {
    try {
      const entity = await strapi.entityService.create('api::navigation.navigation', {
        data: ctx.request.body.data,
        populate: '*',
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },

  async update(ctx) {
    try {
      const entity = await strapi.entityService.update('api::navigation.navigation', 1, {
        data: ctx.request.body.data,
        populate: '*',
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
}; 