import { createApp } from 'vue'
import './assets/base.css'
import './style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import App from "./App.vue";
const app = createApp(App)
app.use(PrimeVue, {
    theme:{
        preset:Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.mount('#app')
