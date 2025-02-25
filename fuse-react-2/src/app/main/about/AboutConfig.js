import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import AboutPage from './About';

i18next.addResourceBundle('en', 'aboutPage', en);
i18next.addResourceBundle('tr', 'aboutPage', tr);
i18next.addResourceBundle('ar', 'aboutPage', ar);

const AboutConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard/about',
      element: <AboutPage />,
    },
  ],
};

export default AboutConfig;
