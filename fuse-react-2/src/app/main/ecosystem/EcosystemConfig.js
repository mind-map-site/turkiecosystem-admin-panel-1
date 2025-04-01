import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import EcosystemPage from './Ecosystem';

i18next.addResourceBundle('en', 'ecosystemPage', en);
i18next.addResourceBundle('tr', 'ecosystemPage', tr);
i18next.addResourceBundle('ar', 'ecosystemPage', ar);

const EcosystemConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard/ecosystem',
      element: <EcosystemPage />,
    },
  ],
};

export default EcosystemConfig;
