// Import vue component
import Component from ‘./VueDataBrowser.vue’;
export default {
	install(Vue, options) {
		Vue.component(Component.name, Component)
	}
};