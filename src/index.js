// Import vue component
import Component from './VubularDataBrowser.vue';
export default {
	install(Vue, options) {
		Vue.component(Component.name, Component)
	}
};