// Import vue component
import component from './VueDataBrowser.vue';

// Declare install function executed by Vue.use()
export default {
	install(Vue) {
		Vue.component('VueDataBrowser', component);
	}
}