'use strict';

module.exports = {
  async find(ctx) {
    try {
      const populate = ctx.query.populate || { image: '*' };
      const entities = await strapi.entityService.findMany('api::about.about', {
        populate,
      });
      return entities;
    } catch (err) {
      ctx.body = err;
    }
  },
  async create(ctx) {
    try {
      const entity = await strapi.entityService.create('api::about.about', {
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
      const entity = await strapi.entityService.update('api::about.about', 1, {
        data: ctx.request.body.data,
        populate: '*',
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  }
};