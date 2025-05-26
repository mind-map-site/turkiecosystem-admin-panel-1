import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import AboutConfig from '../main/about/AboutConfig';
import NewsConfig from '../main/news/NewsConfig';
import IncentivesConfig from '../main/incentives/IncentivesConfig';
import EventsConfig from '../main/events/EventsConfig';
import SocialsConfig from '../main/socials/SocialsConfig';
import InitiativesConfig from '../main/initiatives/InitiativesConfig';
import EcosystemConfig from '../main/ecosystem/EcosystemConfig';
import PrivacyPolicyConfig from '../main/privacy-policy/PrivacyPolicyConfig';
import LogoConfig from '../main/logo/LogoConfig';


const routeConfigs = [LogoConfig, PrivacyPolicyConfig,SocialsConfig,EcosystemConfig, InitiativesConfig, EventsConfig, IncentivesConfig, NewsConfig, AboutConfig, ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/example" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  }
];

export default routes;