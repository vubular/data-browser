<template>
	<component v-bind:is="viewType" :data="data"></component>
</template>
<script>
	import ListView from "./views/ListView.vue";
	import TableView from "./views/TableView.vue";
	import GridView from "./views/GridView.vue";

	export default {
		name: "ListBrowser",
		components: { ListView, TableView, GridView },
		props: {
			data: {
				type: [Array, Object]
			},
			view: {
				type: String,
				default: "table"
			}
		},
		computed: {
			viewType() {
				var viewType = "table-view";
				if(this.view == 'list') viewType = "list-view";
				if(this.view == 'grid') viewType = "grid-view";

				return viewType;
			}
		}
	}
</script>