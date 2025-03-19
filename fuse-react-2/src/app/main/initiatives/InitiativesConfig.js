import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import InitiativesPage from './Initiatives';

i18next.addResourceBundle('en', 'initiativesPage', en);
i18next.addResourceBundle('tr', 'initiativesPage', tr);
i18next.addResourceBundle('ar', 'initiativesPage', ar);

const InitiativesConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard/initiatives',
            element: <InitiativesPage/>,
        }
    ],
};

export default InitiativesConfig;
