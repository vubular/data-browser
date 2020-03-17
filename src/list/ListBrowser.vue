<template>
	<div>
		<div class="columns">
			<div class="column">
				<button type="button" class="button" @click="changeView('list')">List</button>
				<button type="button" class="button" @click="changeView('table')">Table</button>
				<button type="button" class="button" @click="changeView('grid')">Grid</button>
			</div>
			<div class="column">
				<input v-model="searchValue" :keyup="search()" class="input" placeholder="Search...">
			</div>
			<div class="column">
				<div class="select">
					<select>
						<option>All fields</option>
						<option v-for="(value, propertyName) in data[0]" :key="propertyName">{{propertyName}}</option>
					</select>
				</div>
			</div>
		</div>
		<component v-bind:is="viewType" :data="filteredList"></component>
	</div>
</template>
<style>
.button{
	margin-right:10px;
}
</style>
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
			},
			filteredList(){
				if(this.searchValue===''){
					return this.data;
				}
				else{
					return this.data.filter(item => {
						let show = false
						Object.values(item).forEach(value => {
							console.log(typeof value)
							if(value && typeof value === 'string' && value.toLowerCase().includes(this.searchValue.toLowerCase())){
								show = true;
							}
						})
						return show;
					});
				}
			}
		},
		methods: {
			changeView(mode){
				this.viewMode = mode;
			},
			search(){
				console.log(this.searchValue)
			}
		},
		data(){
			return {
				viewMode: 'list',
				searchValue: ''
			}
		}
	}
</script>