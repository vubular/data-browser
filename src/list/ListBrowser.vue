<template>
	<div class="box">
		<div class="columns">
			<div class="column is-narrow" v-if="showFieldToggle">
				<button type="button" class="button" @click="toggleKeys = !toggleKeys">
					<span class="icon is-medium">
						<i class="fal fa-ellipsis-h-alt"></i>
					</span>
					<span>{{'Fields' | translate}}</span>
				</button>
			</div>

			<div class="column is-narrow">
				<button type="button" class="button" :class="{'is-active': viewMode==='list'}" @click="changeView('list')">List</button>
				<button type="button" class="button" :class="{'is-active': viewMode==='table'}" @click="changeView('table')">Table</button>
				<button type="button" class="button" :class="{'is-active': viewMode==='grid'}" @click="changeView('grid')">Grid</button>
			</div>
			<div class="column">
				<input v-model="searchValue" :keyup="search()" class="input" placeholder="Search...">
			</div>
			<div class="column is-narrow">
				<div class="select">
					<select v-model="searchField">
						<option value="">All fields</option>
						<option v-for="(value, propName) in data[0]" :key="propName" :value="propName" class="is-capitalized" v-if="fields.length===0 || fields.includes(propName)">{{propName}}</option>
					</select>
				</div>
			</div>
		</div>
		<div class="columns is-multiline" v-if="toggleKeys">
			<div class="column is-narrow" v-for="(value, key) in columnNames" :key="key">
				<label>
					<b-checkbox v-model="columnNames[key]" class="is-capitalized" v-if="fields.length===0 || fields.includes(key)">{{ key }}</b-checkbox>
				</label>
			</div>
		</div>
		<component v-bind:is="viewType" :data="filteredList" :columnNames="columnNames" :showRowNumber="showRowNumber" :fields="fields"></component>
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
				if(this.searchValue===''){
					return this.data;
				} else {
					if(this.searchField===''){
						return this.data.filter(item => {
							let show = false
							Object.values(item).forEach(value => {
								if(value && typeof value === 'string' && value.toLowerCase().includes(this.searchValue.toLowerCase())){
									show = true;
								}
								if(value && typeof value === 'number' && value===+this.searchValue){
									show = true;
								}
							})
							return show;
						});
					} else {
						return this.data.filter(item => {
							if(item[this.searchField]) {
								return item[this.searchField].toLowerCase().includes(this.searchValue.toLowerCase());
							}
						})
					}
				
				}
			}
		},
		methods: {
			changeView(mode){
				this.viewMode = mode;
			},
			search(){
			}
		},
		data(){
			return {
				viewMode: 'list',
				searchValue: '',
				searchField: '',
				toggleKeys: false,
			}
		}
	}
</script>