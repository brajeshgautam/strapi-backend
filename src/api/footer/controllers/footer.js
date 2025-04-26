'use strict';

module.exports = {
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::footer.footer', {
        populate: {
          usefulLinks: { populate: { links: '*' } },
          otherLinks: { populate: { links: '*' } },
          contactUs: '*',
          followUs: '*',
          copyright: '*'
        }
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },

  async create(ctx) {
    try {
      const entity = await strapi.entityService.create('api::footer.footer', {
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
      const entity = await strapi.entityService.update('api::footer.footer', 1, {
        data: ctx.request.body.data,
        populate: '*',
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
}; 