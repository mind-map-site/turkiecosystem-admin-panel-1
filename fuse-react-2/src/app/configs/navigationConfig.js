import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'example-component',
    title: 'Example',
    translate: 'EXAMPLE',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'example',
  },
  {
    id: 'about-component', // New item for about page
    title: 'About',
    translate: 'ABOUT', // Make sure to add this in the translation files
    type: 'item',
    icon: 'heroicons-outline:information-circle', // Appropriate icon for the About section
    url: '/dashboard/about', // New URL pointing to about page
  },
  {
    id: 'news-component',
    title: 'News',
    translate: 'NEWS',
    type: 'item',
    icon: 'heroicons-outline:document-text',
    url: '/dashboard/news'
  },
  {
    id: 'incentives-component',
    title: 'Incentives',
    translate: 'INCENTIVES',
    type: 'item',
    icon: 'heroicons-outline:globe-alt',
    url: '/dashboard/incentives'
  },
  {
    id: 'events-component',
    title: 'Events',
    translate: 'EVENTS',
    type: 'item',
    icon: 'heroicons-outline:calendar',
    url: '/dashboard/events'
  },
  {
    id: 'initiatives-component',
    title: 'Initiatives',
    translate: 'INITIATIVES',
    type: 'item',
    icon: 'heroicons-outline:hashtag',
    url: '/dashboard/initiatives'
  },
  {
    id: 'ecosystem-component',
    title: 'Ecosystem',
    translate: 'ECOSYSTEM',
    type: 'item',
    icon: 'heroicons-outline:cloud',
    url: '/dashboard/ecosystem'
  },
  {
    id: 'privacy-policy-component',
    title: 'Privacy Policy',
    translate: 'PRIVACYPOLICY',
    type: 'item',
    icon: 'heroicons-outline:eye-off',
    url: '/dashboard/privacy-policy'
  },
  {
    id: 'socials-component',
    title: 'socials',
    translate: 'SOCIALS',
    type: 'item',
    icon: 'heroicons-outline:chat',
    url: '/dashboard/socials'
  },
  {
    id: 'logo-component',
    title: 'Logo',
    translate: 'LOGO',
    type: 'item',
    icon: 'heroicons-outline:document',
    url: '/dashboard/logo'
  },
];

export default navigationConfig;
