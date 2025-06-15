import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import AdvertsPage from './Adverts';

i18next.addResourceBundle('en', 'advertsPage', en);
i18next.addResourceBundle('tr', 'advertsPage', tr);
i18next.addResourceBundle('ar', 'advertsPage', ar);

const AdvertsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard/adverts',
      element: <AdvertsPage />,
    },
  ],
};

export default AdvertsConfig;
