import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import InfoPortalPage from './InfoPortal';

i18next.addResourceBundle('en', 'infoPortalPage', en);
i18next.addResourceBundle('tr', 'infoPortalPage', tr);
i18next.addResourceBundle('ar', 'infoPortalPage', ar);

const InfoPortalConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard/info-portal',
            element: <InfoPortalPage/>,
        }
    ],
};

export default InfoPortalConfig;