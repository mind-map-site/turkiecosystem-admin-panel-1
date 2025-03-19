import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import EventsPage from './Events';

i18next.addResourceBundle('en', 'eventsPage', en);
i18next.addResourceBundle('tr', 'eventsPage', tr);
i18next.addResourceBundle('ar', 'eventsPage', ar);

const EventsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/dashboard/events',
            element: <EventsPage/>,
        }
    ],
};

export default EventsConfig;