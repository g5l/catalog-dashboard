import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from './store'

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

import { me } from '@/api/user'

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const hasToken = await me()

  if (authRequired && !hasToken.data.auth) {
    return next({ path: '/login' })
  }

  next()
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  data: function() {
return {
    Chartist: Chartist
  };
},
  render: h => h(App),
  router
});
