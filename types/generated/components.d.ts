import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_elements_contact_infos';
  info: {
    description: 'Contact information for header';
    displayName: 'Contact Info';
  };
  attributes: {
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'info@brajeshgautam.com'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'+91 9717194880'>;
    phoneHours: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'12:00 - 5:00'>;
  };
}

export interface ElementsDropdownItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_dropdown_items';
  info: {
    description: 'Dropdown menu item';
    displayName: 'Dropdown Item';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_links';
  info: {
    description: 'Individual footer link item';
    displayName: 'Footer Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface ElementsLanguage extends Struct.ComponentSchema {
  collectionName: 'components_elements_languages';
  info: {
    description: 'Language selection option';
    displayName: 'Language';
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Required;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_menu_items';
  info: {
    description: 'Navigation menu item';
    displayName: 'Menu Item';
  };
  attributes: {
    dropdownItems: Schema.Attribute.Component<'elements.dropdown-item', true>;
    hasDropdown: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    url: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_social_links';
  info: {
    description: 'Individual social media link for footer';
    displayName: 'Footer Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'youtube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    description: 'Social media links for header';
    displayName: 'Social Links';
  };
  attributes: {
    facebook: Schema.Attribute.String & Schema.Attribute.Required;
    instagram: Schema.Attribute.String & Schema.Attribute.Required;
    youtube: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SectionsFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_sections_footer_columns';
  info: {
    description: 'A column of links in the footer';
    displayName: 'Footer Column';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.footer-link', true> &
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

export interface SectionsFooterContact extends Struct.ComponentSchema {
  collectionName: 'components_sections_footer_contacts';
  info: {
    description: 'Contact information in footer';
    displayName: 'Footer Contact';
  };
  attributes: {
    address: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Vikaspuri, Delhi - 110018'>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    phoneHours: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'CONTACT US'>;
  };
}

export interface SectionsFooterCopyright extends Struct.ComponentSchema {
  collectionName: 'components_sections_footer_copyrights';
  info: {
    description: 'Copyright and credits section';
    displayName: 'Footer Copyright';
  };
  attributes: {
    copyrightText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Copyright \u00A9 2023-2025 Brajesh Gautam. All Rights Reserved'>;
    developerCredit: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Designed & Developed By SLN Softwares'>;
    developerUrl: Schema.Attribute.String;
  };
}

export interface SectionsFooterSocial extends Struct.ComponentSchema {
  collectionName: 'components_sections_footer_socials';
  info: {
    description: 'Social media section in footer';
    displayName: 'Footer Social';
  };
  attributes: {
    socialLinks: Schema.Attribute.Component<'elements.social-link', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'FOLLOW US ON'>;
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
      'elements.contact-info': ElementsContactInfo;
      'elements.dropdown-item': ElementsDropdownItem;
      'elements.footer-link': ElementsFooterLink;
      'elements.gemstone': ElementsGemstone;
      'elements.language': ElementsLanguage;
      'elements.menu-item': ElementsMenuItem;
      'elements.podcast-episode': ElementsPodcastEpisode;
      'elements.social-link': ElementsSocialLink;
      'elements.social-links': ElementsSocialLinks;
      'elements.social-post': ElementsSocialPost;
      'elements.video': ElementsVideo;
      'sections.footer-column': SectionsFooterColumn;
      'sections.footer-contact': SectionsFooterContact;
      'sections.footer-copyright': SectionsFooterCopyright;
      'sections.footer-social': SectionsFooterSocial;
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
