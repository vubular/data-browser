<template>
	<div class="vubular-data-browser">
		<hero v-if="!hero.hide"
			:icon="hero.icon"
			:title="hero.title"
			:subtitle="hero.subtitle"></hero>
		<div class="list-browser" :class="{'compact': view.includes('compact')}">
			<div class="box is-paddingless is-clipped">
				<data-browser-header :controls="controls"
					:compact="view.includes('compact')"
					@search="search"
					v-on="$listeners"></data-browser-header>
				<table v-if="view.includes('table')" class="table is-fullwidth is-striped is-hoverable">
					<slot name="thead">
						<default-table-head :fields="fields"
							:data="data"
							v-on="$listeners"></default-table-head>
					</slot>
					<tbody>

						<slot v-for="(item, i) in items" name="item" :item="{index: i, counter: i+1+counterBump, fields:item}">
							<default-table-item :fields="fields"
								:item="item"
								:key="i"
								:counter="i+1+counterBump"
								v-on="$listeners"></default-table-item>
						</slot>
					</tbody>
					<slot name="tfoot">
						<default-table-foot :controls="controls"
							:fields="fields"
							:data="filteredItems"
							:total="total"
							@active="updatePage"
							v-on="$listeners"></default-table-foot>
					</slot>
				</table>
				<ul v-if="view.includes('list')">
					<slot v-for="(item, i) in items" name="item">
						<default-list-item :fields="fields"
							:item="item"
							v-on="$listeners"></default-list-item>
					</slot>
				</ul>
				<div v-if="view.includes('grid')" class="columns is-multiline">
					<default-grid-item :fields="fields"
						:item="item"
						v-on="$listeners"></default-grid-item>
				</div>
				<b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
			</div>
		</div>
	</div>
</template>
<script>
	import { Hero } from "@vubular/elements";

	import DataBrowserHeader from "./partials/Header.vue";
	import DataBrowserFilters from "./partials/Filters.vue";

	import DefaultTableHead from "./default/TableHead.vue";
	import DefaultTableFoot from "./default/TableFoot.vue";

	import DefaultTableItem from "./default/TableItem.vue";
	import DefaultListItem from "./default/ListItem.vue";
	import DefaultGridItem from "./default/GridItem.vue";

	export default {
		name: "VubularDataBrowser",
		components: {
			DataBrowserHeader, DataBrowserFilters,
			DefaultTableHead, DefaultTableFoot,
			DefaultTableItem,
			DefaultListItem,
			DefaultGridItem
		},
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
			controls: {
				type: String,
				default: "create::,search,archive::,pagination::"
			},
			view: {
				type: String,
				default: "table"
			},
			data: {
				type: [Array, Object],
				required: true,
				default() {
					return []
				}
			},
			fields: {
				type: String,
				default: "+,id,name,created_at,updated_at"
			},
			isLoading: {
				type: Boolean,
				default: true
			},
			total: {
				type: Number
			}
		},
		data() {
			return {
				filteredItems: [],
				page: 1
			}
		},
		computed: {
			viewMode() {
				var view = "table-view";
				if(this.view.includes("list")) view = "list-view";
				if(this.view.includes("grid")) view = "grid-view";
				return view;
			},
			item() {
				return this.filteredItems[0] ?? null;
			},
			items: {
				cache: false,
				get() {
					var start = (this.page-1) * 24;
					var end = start + 24;
					return this.filteredItems.slice(start, end);
				}

			},
			counterBump() {
				return (this.page-1) * 24;
			}
		},
		methods: {
			archive(item) {
				this.$emit("archive", item);
			},
			search(value) {
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
			},
			updatePage(activePage) {
				this.page = activePage;
			}
		},
		watch: {
			data(newData, oldData) {
				if(newData && newData!=oldData) { this.filteredItems = newData; }
			}
		}
	}
</script>
<style>
	.list-browser { margin-top:30px; min-height: 300px; }
	.list-browser.compact { max-height: 500px; overflow-y: auto; }
	.list-browser .box { position: relative; }
</style>