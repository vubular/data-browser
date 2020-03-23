<template>
	<div>
		<component v-bind:is="dataBrowser" :data="data" :columnNames="columnNames" :showRowNumber="showRowNumber"></component>
	</div>	
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
						{ name: "Bill", surname: "Mayer", age: 32 },
						{ name: "Steve", surname: "Gates", age: 48 },
						{ name: "Elon", surname: "Jobs", age: 55 },
						{ name: "Melissa", surname: "Musk", age: 68 }
					]
				}
			},
			columnNames: {
				type: Object
			},
			showRowNumber: {
				type: Boolean,
				default(){
					return false
				}
			}
		},
		computed: {
			dataBrowser() {
				return Array.isArray(this.data) ? "list-browser" : "item-browser";
			}
		}
	}
</script>