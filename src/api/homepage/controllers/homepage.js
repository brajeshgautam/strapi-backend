'use strict';

/**
 * homepage controller
 */

module.exports = {
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findOne('api::homepage.homepage', 1, {
        populate: {
          hero: '*',
          show: '*',
          latestClass: '*',
          gemstones: { populate: { stones: '*' } },
          quote: '*',
          youtubeChannel: { populate: { videos: '*' } },
          socialMediaFeed: { populate: { posts: '*' } },
          wisdomPodcast: { populate: { episodes: '*' } }
        }
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },

  async create(ctx) {
    try {
      const entity = await strapi.entityService.create('api::homepage.homepage', {
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
      const entity = await strapi.entityService.update('api::homepage.homepage', 1, {
        data: ctx.request.body.data,
        populate: '*',
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
};
