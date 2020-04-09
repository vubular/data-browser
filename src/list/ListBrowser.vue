<template>
	<div class="list-browser" style="margin-top:30px">
		<div class="box is-paddingless">
			<actions @search="searching" v-on="$listeners"></actions>
			<!-- <filters></filters> -->
			<div class="listing-items">
				<component v-bind:is="viewMode"
					:data="filteredList"
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
			data: { type: Array },
			fields: { type: String },
			view: { type: String }
		},
		computed: {
			viewMode() {
				var view = "table-view";
				if(this.view == 'list') view = "list-view";
				if(this.view == 'grid') view = "grid-view";
				return view;
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
			searching(val) {
				console.log(val);
				this.search = val;
			}
		},
		data() {
			return {
				search: '',
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