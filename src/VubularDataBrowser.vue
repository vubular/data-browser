<template>
	<div class="vubular-data-browser">
		<hero v-if="hero!='hide'"
			:icon="hero.icon"
			:title="hero.title"
			:subtitle="hero.subtitle"></hero>
		<div class="list-browser" :class="{'compact': view.includes('compact')}">
			<div class="box is-paddingless is-clipped">
				<data-browser-header :controls="controls"
					:compact="view.includes('compact')"
					@search="search"
					v-on="$listeners"></data-browser-header>
				<div class="list-wrap">
					<table v-if="viewMode=='table'"
						class="table is-fullwidth is-striped is-hoverable"
						:class="{'is-narrow': view.includes('compact')}">
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
							<slot v-if="items.length==0" name="empty-item">
								<not-yet></not-yet>
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
					<ul v-if="viewMode=='list'">
						<slot v-for="(item, i) in items" name="item">
							<default-list-item :fields="fields"
								:item="item"
								v-on="$listeners"></default-list-item>
						</slot>
					</ul>
					<div v-if="viewMode=='grid'" class="columns is-multiline">
						<default-grid-item :fields="fields"
							:item="item"
							v-on="$listeners"></default-grid-item>
					</div>
					<b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Hero, NotYet } from "@vubular/elements";

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
			Hero, NotYet,
			DataBrowserHeader, DataBrowserFilters,
			DefaultTableHead, DefaultTableFoot,
			DefaultTableItem,
			DefaultListItem,
			DefaultGridItem
		},
		props: {
			hero: {
				type: [Object, String],
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
				var view = "table";
				if(this.view.includes("list")) view = "list";
				if(this.view.includes("grid")) view = "grid";
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
							var matchItems = Object.values(item);
							for(var m=0;m<matchItems.length;m++) {
								if(!matchItems[m]) continue;
								if(matchItems[m].toString().includes(value)) {
									if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
								} else if(matchItems[m].toString().toLowerCase().includes(value.toLowerCase())) {
									if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
								} else if(matchItems[m]==value){
									if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
								}

								if(typeof matchItems[m] === 'object') {
									var matchNestedItems = Object.values(matchItems[m]);
									for(var n=0;n<matchNestedItems.length;n++) {
										if(!matchNestedItems[n]) continue;
										if(matchNestedItems[n].toString().includes(value)) {
											if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
										} else if(matchNestedItems[n].toString().toLowerCase().includes(value.toLowerCase())) {
											if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
										} else if(matchNestedItems[n]==value){
											if(this.filteredItems.indexOf(item)===-1) this.filteredItems.push(item);
										}
									}
								}
							}
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
	.list-browser { margin-top:30px; }
	.list-wrap { position: relative; min-height: 300px; }
	.list-browser.compact > .box { box-shadow:none; border: 1px solid #dbdbdb; }
	.list-browser.compact .list-wrap { max-height: 500px; overflow-y: auto; overflow-x: hidden; }
</style>