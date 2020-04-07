<template>
	<div class="list-browser" style="margin-top:30px">
		<div class="box is-paddingless">
			<actions :search="search"></actions>
			<!-- <filters></filters> -->
			<div class="listing-items">
				<component v-bind:is="viewType"
					:data="filteredList"
					:columnNames="columnNames"
					:showRowNumber="showRowNumber"
					:fields="fields"></component>
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
			data: {
				type: Array
			},
			columnNames: {
				type: Object
			},
			showRowNumber: {
				type: Boolean
			},
			showFieldToggle: {
				type: Boolean
			},
			fields: {
				type: Array
			}
		},
		computed: {
			viewType() {
				var viewType = "table-view";
				if(this.viewMode == 'list') viewType = "list-view";
				if(this.viewMode == 'grid') viewType = "grid-view";
				return viewType;
			},
			filteredList(){
				if(this.search===''){
					return this.data;
				} else {
					if(this.searchField===''){
						return this.data.filter(item => {
							let show = false
							Object.values(item).forEach(value => {
								if(value && typeof value === 'string' && value.toLowerCase().includes(this.search.toLowerCase())){
									show = true;
								}
								if(value && typeof value === 'number' && value===+this.search){
									show = true;
								}
							})
							return show;
						});
					} else {
						return this.data.filter(item => {
							if(item[this.searchField]) {
								return item[this.searchField].toLowerCase().includes(this.search.toLowerCase());
							}
						})
					}

				}
			}
		},
		methods: {
			changeView(mode){
				this.viewMode = mode;
			}
		},
		data() {
			return {
				search: '',
				viewMode: 'table',
				searchField: ''
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