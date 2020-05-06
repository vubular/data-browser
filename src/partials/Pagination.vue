<template>
	<pagination v-if="paginate" :key="theTotal" :total="theTotal" v-on="$listeners"></pagination>
</template>
<script>
	import { Pagination } from "@vubular/elements";
	export default {
		name: "DataBrowserPagination",
		components: { Pagination },
		props: {
			controls: { type: String },
			data: { type: [Array, Object] },
			total: { type: Number }
		},
		computed: {
			paginate() { return this.theTotal>1 },
			itemsPerPage() {
				var itemsPerPage = 24;
				if(!this.controls.includes("pagination::")) {
					itemsPerPage = this.controls.split("pagination:");
					itemsPerPage = itemsPerPage.pop();
					itemsPerPage = itemsPerPage.split(",");
					itemsPerPage = itemsPerPage.shift();
				}

				return +itemsPerPage;
			},
			theTotal: {
				cache: false,
				get() {
					if(this.total) return this.total;
					return Math.ceil(this.data.length/this.itemsPerPage);
				}
			},
			renderFooter() {
				return this.paginate
			}
		}
	}
</script>