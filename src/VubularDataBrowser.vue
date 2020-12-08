<template>
	<div class="vubular-data-browser">
		<hero v-if="hero!='hide'"
			:icon="hero.icon"
			:title="hero.title"
			:subtitle="hero.subtitle"></hero>
		<div class="list-browser" :class="{'compact': view.includes('compact'), 'docked': view.includes('dock')}">
			<div class="is-paddingless" :class="{'box': !view.includes('dock')}">
				<data-browser-header :controls="controls"
					:compact="view.includes('compact')"
					:docked="view.includes('dock')"
					@search="search"
					:label="label"
					v-on="$listeners">
					<template #create-button><slot name="create-button"></slot></template>
					<template #archive-button><slot name="archive-button"></slot></template>
					<template #filters><slot name="filters"></slot></template>
				</data-browser-header>
				<div class="list-wrap" :class="{'loading-list': loadingStatus}">
					<table v-if="viewMode=='table'"
						class="table is-fullwidth is-striped is-hoverable"
						:class="{'is-narrow': view.includes('compact'), 'is-bordered': view.includes('bordered')}">
						<slot name="thead">
							<default-table-head :fields="fields"
								:data="data"
								v-on="$listeners"/>
						</slot>
						<tbody>
							<slot name="item" v-for="(item, i) in items" :item="{index: i, counter: i+1+counterBump, fields:item}">
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
							<default-table-foot v-if="paginate">
								<div class="columns">
									<div class="column">
										<pagination :key="theTotal" :total="theTotal" @active="updatePage"></pagination>
									</div>
									<div class="column is-narrow has-text-really-centered">
										Total: {{this.filteredItems.length}}
									</div>
								</div>
							</default-table-foot>
						</slot>
					</table>
					<ul v-if="viewMode=='list'">
						<slot name="item" v-for="(item, i) in items" :item="{index: i, counter: i+1+counterBump, fields:item}">
							<default-list-item :fields="fields"
								:item="item"
								v-on="$listeners"></default-list-item>
						</slot>
					</ul>
					<div v-if="viewMode=='grid'" class="columns is-multiline" style="margin-top:20px">
						<slot name="item" v-for="(item, i) in items" :item="{index: i, counter: i+1+counterBump, fields:item}">
							<default-grid-item :fields="fields"
								:item="item"
								v-on="$listeners"></default-grid-item>
						</slot>
						<div v-if="paginate" class="column is-12">
							<pagination :key="theTotal" :total="theTotal" @active="updatePage"></pagination>
						</div>
					</div>
					<b-loading :is-full-page="false" :active.sync="loadingStatus"></b-loading>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Hero, NotYet, Pagination } from "@vubular/elements";

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
			Hero, NotYet, Pagination,
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
			},
			label: {
				type: String,
				default: "Item"
			}
		},
		data() {
			return {
				loading: false,
				filteredItems: [],
				page: 1
			}
		},
		computed: {
			loadingStatus() { return this.isLoading || this.loading },
			paginate() { return this.controls.includes('pagination') && this.theTotal>1 },
			viewMode() {
				var view = "table";
				if(this.view.includes("list")) view = "list";
				if(this.view.includes("grid")) view = "grid";
				return view;
			},
			item() {
				return this.filteredItems[0] ?? null;
			},
			itemsPerPage() {
				if(!this.controls.includes("pagination")) return this.filteredItems.length;

				var itemsPerPage = 24;
				if(!this.controls.includes("pagination::")) {
					itemsPerPage = this.controls.split("pagination:");
					itemsPerPage = itemsPerPage.pop();
					if(itemsPerPage.includes(",")) {
						itemsPerPage = itemsPerPage.split(",");
						itemsPerPage = itemsPerPage.shift();
					}
				}
				return +itemsPerPage;
			},
			items: {
				cache: false,
				get() {
					var start = (this.page-1) * this.itemsPerPage;
					var end = start + this.itemsPerPage;
					if(this.page>1 && this.itemsPerPage>=this.data.length) return this.filteredItems;
					return this.filteredItems.slice(start, end);
				}
			},
			counterBump() {
				return (this.page-1) * this.itemsPerPage;
			},
			theTotal: {
				cache: false,
				get() {
					if(this.total) return this.total;
					return Math.ceil(this.filteredItems.length/this.itemsPerPage);
				}
			}
		},
		methods: {
			archive(item) {
				this.$emit("archive", item);
			},
			search(value) {
				this.loading = true;
				if(!value || value=='') {
					this.filteredItems = this.data;
					this.loading = false;
				} else {
					clearTimeout(filterItems);
					var filterItems = setTimeout(() => {
						this.filteredItems = [];
						this.data.filter((item, i) => {
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
							if(i==this.data.length-1) {
								this.loading = false;
								this.$emit("search-results", this.filteredItems.length);
							}
						});
					}, 250);
				}
			},
			updatePage(activePage) {
				this.page = activePage;
				this.$emit("page", this.page);
			}
		},
		mounted() { this.search(''); },
		watch: {
			data(newData, oldData) {
				if(newData && newData!=oldData) { this.search(''); }
			}
		}
	}
</script>
<style scoped>
	.list-browser .list-wrap { position: relative; }
	.list-browser:not(.docked) .list-wrap.loading-list { min-height: 500px; }
	.list-browser .list-wrap table { border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; }
	.list-browser.compact > .box { box-shadow:none; border: 1px solid #dbdbdb; }
	.list-browser.compact .list-wrap { max-height: 500px; overflow-y: auto; overflow-x: hidden; }
</style>