<template>
	<tr :style="rowStyle">
		<th v-if="fields.includes('+')" class="has-text-grey-light has-text-weight-light">{{counter}}</th>
		<td v-if="fields.includes(propName)" v-for="(propValue, propName) in item" :key="propName">
			<template v-if="propName=='name'">
				<router-link :to="$route.fullPath+'/'+item.id">{{propValue}}</router-link>
			</template>
			<template v-else>{{propValue}}</template>
		</td>
		<td class="is-narrow">
			<edit :id="item.id" style="margin-right:10px"></edit>
			<archive :dialog="true"
				class="is-small"
				@click="highlight"
				@archived="archive"
				@canceled="unHighlight"></archive>
		</td>
	</tr>
</template>
<script>
	import { Edit, Archive } from "@vubular/elements";

	export default {
		name: "DefaultTableItem",
		components: { Edit, Archive },
		props: {
			fields: { type: String },
			item: { type: Object },
			counter: { type: Number }
		},
		data() {
			return {
				highlighted: false
			}
		},
		methods: {
			archive() { this.$emit("archive", this.item) },
			highlight() {
				this.highlighted = true;
			},
			unHighlight() {
				this.highlighted = false;
			}
		},
		computed: {
			rowStyle: {
				cache: false,
				get() { return this.highlighted ? { backgroundColor: "#fbb" } : null; }
			}
		}
	}
</script>