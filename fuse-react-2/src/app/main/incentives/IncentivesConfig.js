import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import IncentivesPage from './Incentives';

i18next.addResourceBundle('en', 'incentivesPage', en);
i18next.addResourceBundle('tr', 'incentivesPage', tr);
i18next.addResourceBundle('ar', 'incentivesPage', ar);

const IncentivesConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard/incentives',
            element: <IncentivesPage/>,
        }
    ],
};

export default IncentivesConfig;
