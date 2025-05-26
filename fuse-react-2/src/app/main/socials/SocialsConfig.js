import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import SocialsPage from './Socials';

i18next.addResourceBundle('en', 'socialsPage', en);
i18next.addResourceBundle('tr', 'socialsPage', tr);
i18next.addResourceBundle('ar', 'socialsPage', ar);

const SocialsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard/socials',
      element: <SocialsPage />,
    },
  ],
};

export default SocialsConfig;
