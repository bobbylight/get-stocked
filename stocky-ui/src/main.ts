import Vue, { CreateElement } from 'vue';
import App from './app.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

(new Vue({
  vuetify,
  render: (h: CreateElement) => h(App),
}) as any).$mount('#app');
