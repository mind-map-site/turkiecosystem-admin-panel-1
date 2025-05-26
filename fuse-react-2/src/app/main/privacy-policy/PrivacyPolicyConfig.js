import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import PrivacyPolicyPage from './PrivacyPolicy';

i18next.addResourceBundle('en', 'privacyPolicyPage', en);
i18next.addResourceBundle('tr', 'privacyPolicyPage', tr);
i18next.addResourceBundle('ar', 'privacyPolicyPage', ar);

const PrivacyPolicyConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/dashboard/privacy-policy',
      element: <PrivacyPolicyPage />,
    },
  ],
};

export default PrivacyPolicyConfig;
