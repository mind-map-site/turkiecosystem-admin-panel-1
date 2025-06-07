import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import LatestNewsPage from './LatestNews';

i18next.addResourceBundle('en', 'latestNewsPage', en);
i18next.addResourceBundle('tr', 'latestNewsPage', tr);
i18next.addResourceBundle('ar', 'latestNewsPage', ar);

const LatestNewsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard/latest-news',
            element: <LatestNewsPage/>,
        }
    ],
};

export default LatestNewsConfig;