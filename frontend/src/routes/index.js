import Home from "../pages/home"
import About from "../pages/about";
import Agenda from "../pages/agenda";
import Partners from "../pages/partners";
import Detail from "../pages/detail";

export const HOME_PATH = "/";
export const AGENDA_PATH = "/agenda";
export const ABOUT_PATH = "/over-ons";
export const PARTNER_PATH = "/partners";
export const DETAIL_PATH = "/detail";

const routes = [
  {
    path: HOME_PATH,
    component: Home,
    exact: true,
  },
  {
    path: AGENDA_PATH,
    component: Agenda,
  },
  {
    path: ABOUT_PATH,
    component: About,
  },
  {
    path: PARTNER_PATH,
    component: Partners,
  },
  {
    path: DETAIL_PATH,
    component: Detail,
  }
];

export default routes;
