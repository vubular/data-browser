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
							:item="item"
							v-on="$listeners"></default-table-head>
					</slot>
					<tbody>
						<slot v-for="(item, i) in filteredItems" name="item">
							<default-table-row :fields="fields"
								:item="item"
								:counter="i+1"
								v-on="$listeners"></default-table-row>
						</slot>
					</tbody>
					<slot name="tfoot">
						<default-table-foot :fields="fields"
							:item="item"
							v-on="$listeners"></default-table-foot>
					</slot>
				</table>
				<ul v-if="view.includes('list')">
					<slot v-for="(item, i) in filteredItems" name="item">
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
	import DefaultTableRow from "./default/TableRow.vue";
	import DefaultTableFoot from "./default/TableFoot.vue";

	import DefaultListItem from "./default/ListItem.vue";

	import DefaultGridItem from "./default/GridItem.vue";

	export default {
		name: "VubularDataBrowser",
		components: {
			DataBrowserHeader, DataBrowserFilters,
			DefaultTableHead, DefaultTableRow, DefaultTableFoot,
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
					return []
				}
			},
			fields: {
				type: String,
				default: "+,id,name,created_at,updated_at"
			},
			isLoading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				filteredItems: []
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
			}
		},
		methods: {
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
	.list-browser { margin-top:30px; }
	.listing-items { position: relative; min-height: 300px; }
	.listing-items.compact { max-height: 500px; overflow-y: auto; }
</style>