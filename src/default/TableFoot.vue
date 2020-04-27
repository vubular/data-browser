<template>
	<tfoot>
		<tr>
			<td colspan="999999" style="padding:20px">
				<pagination v-if="paginate" :key="theTotal" :total="theTotal" v-on="$listeners"></pagination>
			</td>
		</tr>
	</tfoot>
</template>
<script>
	import { Pagination } from "@vubular/elements";
	export default {
		name: "DefaultTableFoot",
		components: { Pagination },
		props: {
			controls: { type: String },
			fields: { type: String },
			data: { type: [Array, Object] },
			total: { type: Number }
		},
		computed: {
			item() { return this.data[0] ?? null },
			paginate() { return this.controls.includes("pagination") },
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
		}
	}
</script>