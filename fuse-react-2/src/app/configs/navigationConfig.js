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
];

export default navigationConfig;
