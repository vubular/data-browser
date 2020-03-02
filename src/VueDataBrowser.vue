<template>
	<component v-bind:is="dataBrowser" :data="data" :view="view"></component>
</template>
<script>
	import ListBrowser from "./list/ListBrowser.vue";
	import ItemBrowser from "./item/ItemBrowser.vue";

	export default {
		name: "VueDataBrowser",
		components: { ListBrowser, ItemBrowser },
		props: {
			data: {
				type: [Array, Object],
				required: true,
				default() {
					return [
						{ name: "John", surname: "Doe", age: 45 },
						{ name: "Jane", surname: "Doe", age: 38 },
					]
				}
			},
			view: {
				type: String,
				default: "table"
			}
		},
		computed: {
			dataBrowser() {
				return Array.isArray(this.data) ? "list-browser" : "item-browser";
			}
		}
	}
</script>