import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './route.js';
import store from './store/index.js';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseCard from './components/UI/BaseCard.vue';
// import BaseDialog from './components/UI/BaseDialog.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';

const BaseDialog = defineAsyncComponent(() =>
  import('./components/UI/BaseDialog.vue')
);

const app = createApp(App);

app.use(router);
app.use(store);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);
app.mount('#app');
