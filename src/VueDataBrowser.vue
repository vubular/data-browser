<template>
	<div>
		<h3> Test </h3>
	</div>
</template>
<script>
	import ItemBrowser from "./item/ItemBrowser.vue";
	import ListBrowser from "./list/ListBrowser.vue";
	export default {
		name: "VueDataBrowser",
		components: { ItemBrowser, ListBrowser },
		props: {
			data: {
				type: [Object, Array],
				required: true
			},
			view: {
				type: String,
				default: "table"
			}
		},
		computed: {
			dataBrowsing() {
				return typeof this.data === "object" ? "item-browser" : "list-browser";
			}
		}
	}
</script>