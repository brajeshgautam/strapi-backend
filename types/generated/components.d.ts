import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsGemstone extends Struct.ComponentSchema {
  collectionName: 'components_elements_gemstones';
  info: {
    description: 'Individual gemstone item';
    displayName: 'Gemstone';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsPodcastEpisode extends Struct.ComponentSchema {
  collectionName: 'components_elements_podcast_episodes';
  info: {
    description: 'Individual podcast episode';
    displayName: 'Podcast Episode';
  };
  attributes: {
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    duration: Schema.Attribute.String;
    episodeUrl: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialPost extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_posts';
  info: {
    description: 'Individual social media post';
    displayName: 'Social Post';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'twitter', 'linkedin']
    > &
      Schema.Attribute.Required;
    postUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsVideo extends Struct.ComponentSchema {
  collectionName: 'components_elements_videos';
  info: {
    description: 'Individual video item';
    displayName: 'Video';
  };
  attributes: {
    duration: Schema.Attribute.String;
    thumbnail: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
    views: Schema.Attribute.String;
  };
}

export interface SectionsGemstones extends Struct.ComponentSchema {
  collectionName: 'components_sections_gemstones';
  info: {
    description: 'Gemstones carousel section';
    displayName: 'Gemstones';
  };
  attributes: {
    stones: Schema.Attribute.Component<'elements.gemstone', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: 'Hero section with introduction';
    displayName: 'Hero';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsLatestClass extends Struct.ComponentSchema {
  collectionName: 'components_sections_latest_classes';
  info: {
    description: 'Latest class section with thumbnail and details';
    displayName: 'Latest Class';
  };
  attributes: {
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    thumbnail: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsQuote extends Struct.ComponentSchema {
  collectionName: 'components_sections_quotes';
  info: {
    description: 'Inspirational quote section';
    displayName: 'Quote';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    authorImage: Schema.Attribute.Media<'images'>;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsShow extends Struct.ComponentSchema {
  collectionName: 'components_sections_shows';
  info: {
    description: 'Show section with image and description';
    displayName: 'Show';
  };
  attributes: {
    buttonLink: Schema.Attribute.String & Schema.Attribute.Required;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Read More'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSocialMediaFeed extends Struct.ComponentSchema {
  collectionName: 'components_sections_social_media_feeds';
  info: {
    description: 'Social media feed section';
    displayName: 'Social Media Feed';
  };
  attributes: {
    posts: Schema.Attribute.Component<'elements.social-post', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsWisdomPodcast extends Struct.ComponentSchema {
  collectionName: 'components_sections_wisdom_podcasts';
  info: {
    description: 'Wisdom podcast section';
    displayName: 'Wisdom Podcast';
  };
  attributes: {
    description: Schema.Attribute.Text;
    episodes: Schema.Attribute.Component<'elements.podcast-episode', true>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    podcastUrl: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsYoutubeChannel extends Struct.ComponentSchema {
  collectionName: 'components_sections_youtube_channels';
  info: {
    description: 'YouTube video gallery section';
    displayName: 'YouTube Channel';
  };
  attributes: {
    channelUrl: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videos: Schema.Attribute.Component<'elements.video', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.gemstone': ElementsGemstone;
      'elements.podcast-episode': ElementsPodcastEpisode;
      'elements.social-post': ElementsSocialPost;
      'elements.video': ElementsVideo;
      'sections.gemstones': SectionsGemstones;
      'sections.hero': SectionsHero;
      'sections.latest-class': SectionsLatestClass;
      'sections.quote': SectionsQuote;
      'sections.show': SectionsShow;
      'sections.social-media-feed': SectionsSocialMediaFeed;
      'sections.wisdom-podcast': SectionsWisdomPodcast;
      'sections.youtube-channel': SectionsYoutubeChannel;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
