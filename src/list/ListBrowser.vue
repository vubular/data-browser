<template>
	<div>
		<button class="button" @click="changeView('list')">List</button>
		<button class="button" @click="changeView('table')">Table</button>
		<button class="button" @click="changeView('grid')">Grid</button>
		<component v-bind:is="viewType" :data="data"></component>
	</div>
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
				type: Array
			}
		},
		computed: {
			viewType() {
				var viewType = "table-view";
				if(this.viewMode == 'list') viewType = "list-view";
				if(this.viewMode == 'grid') viewType = "grid-view";
				return viewType;
			}
		},
		methods: {
			changeView(mode){
				this.viewMode = mode;
			}
		},
		data(){
			return {
				viewMode: 'list'
			}
		}
	}
</script>