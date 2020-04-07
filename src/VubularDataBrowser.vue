<template>
	<div class="vubular-data-browser">
		<hero v-if="!hero.hide" :icon="hero.icon" :title="hero.title" :subtitle="hero.subtitle"></hero>
		<component v-bind:is="dataBrowser" :data="data" :columnNames="columnNames" :showRowNumber="showRowNumber" :showFieldToggle="showFieldToggle" :fields="selectedFields"></component>
	</div>
</template>
<script>
	import { Hero } from "@vubular/elements";
	import ListBrowser from "./list/ListBrowser.vue";
	import ItemBrowser from "./item/ItemBrowser.vue";

	export default {
		name: "VubularDataBrowser",
		components: { ListBrowser, ItemBrowser },
		props: {
			hero: {
				type: Object,
				default() {
					return {
						icon: "fal fa-list",
						title: "Browse Data",
						subtitle: "Analyze sort and observe in multiple views",
						hide: false
					}
				}
			},
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
			},
			showFieldToggle: {
				type: Boolean,
				default() {
					return false
				}
			},
			fields: {
				type: String,
				default: ""
			}
		},
		computed: {
			dataBrowser() {
				return Array.isArray(this.data) && this.data.length>1 ? "list-browser" : "item-browser";
			}
		},
		mounted() {
			if(this.fields!==""){
				this.selectedFields = this.fields.split(',');
				console.log(1, this.selectedFields);
			}
		},
		data(){
			return {
				selectedFields: []
			}
		}
	}
</script>