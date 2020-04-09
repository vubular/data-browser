<template>
	<div class="vubular-data-browser">
		<hero v-if="!hero.hide" :icon="hero.icon" :title="hero.title" :subtitle="hero.subtitle"></hero>
		<component v-bind:is="dataBrowser"
			:actions="actions"
			:view="view"
			:data="data"
			:fields="fields"
			@goCreate="goCreate"
			@goArchive="goArchive"></component>
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
			actions: {
				type: String,
				default: "create::,search,archive::"
			},
			view: {
				type: String,
				default: "table"
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
			fields: {
				type: String,
				default: "+,id,name,created_at,updated_at"
			}
		},
		computed: {
			dataBrowser() {
				return Array.isArray(this.data) ? "list-browser" : "item-browser";
			}
		},
		methods: {
			goCreate() {
				this.$emit("goCreate");
			},
			goArchive() {
				this.$emit("goArchive");
			}
		}
	}
</script>