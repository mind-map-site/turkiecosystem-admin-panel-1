import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import NewsPage from './News';

i18next.addResourceBundle('en', 'newsPage', en);
i18next.addResourceBundle('tr', 'newsPage', tr);
i18next.addResourceBundle('ar', 'newsPage', ar);

const NewsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard/news',
            element: <NewsPage/>,
        }
    ],
};

export default NewsConfig;
