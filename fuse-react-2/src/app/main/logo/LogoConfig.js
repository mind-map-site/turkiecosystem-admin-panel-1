import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import LogoPage from './Logo';

i18next.addResourceBundle('en', 'logoPage', en);
i18next.addResourceBundle('tr', 'logoPage', tr);
i18next.addResourceBundle('ar', 'logoPage', ar);

const LogoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard/logo',
      element: <LogoPage />,
    },
  ],
};

export default LogoConfig;
