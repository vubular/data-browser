<template>
	<div class="list-browser" style="margin-top:30px">
		<div class="box is-paddingless">
			<actions :actions="actions" @search="searching" v-on="$listeners"></actions>
			<!-- <filters></filters> -->
			<div class="listing-items is-relative">
				<component v-bind:is="viewMode"
					:data.sync="filteredItems"
					:fields="fields"
					:key="filteredItems.length"></component>
				<b-loading :is-full-page="false" :active.sync="UIPending"></b-loading>
			</div>
		</div>
	</div>
</template>
<script>
	import Actions from "./partials/Actions.vue";
	import Filters from "./partials/Filters.vue";

	import ListView from "./views/ListView.vue";
	import TableView from "./views/TableView.vue";
	import GridView from "./views/GridView.vue";

	export default {
		name: "ListBrowser",
		components: { Actions, Filters, ListView, TableView, GridView },
		props: {
			actions: { type: String },
			view: { type: String },
			data: { type: Array },
			fields: { type: String }
		},
		data() {
			return {
				filteredItems: []
			}
		},
		computed: {
			viewMode() {
				var view = "table-view";
				if(this.view == 'list') view = "list-view";
				if(this.view == 'grid') view = "grid-view";
				return view;
			}
		},
		methods: {
			searching(value) {
				console.log("Test");
				clearTimeout(filterItems);
				var filterItems = setTimeout(() => {
					if(value===''){
						this.filteredItems = this.data;
					} else {
						this.filteredItems = [];
						this.data.filter(item => {
							Object.values(item).forEach(i => {
								if(i && typeof i === 'string' && i.toLowerCase().includes(value.toLowerCase())) {
									if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
								}
								if(i && typeof i === 'number' && i===+value){
									if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
								}
							});
						});
					}
				}, 250);
			}
		},
		watch: {
			data(newData, oldData) {
				if(newData && newData!=oldData) {
					this.filteredItems = newData;
				}
			}
		}
	}
</script>
<style scoped>
	.button { margin-right:10px; }
	.vubular-list-browser { margin-top:40px; }
	.box { overflow: hidden; }
	.listing-items { max-height: 500px; overflow-y: auto; }
</style>