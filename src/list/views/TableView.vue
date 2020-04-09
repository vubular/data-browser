<template>
	<div class="is-fullwidth" style="overflow:auto">
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th v-if="fields.includes('+')" class="has-text-grey-light has-text-weight-light is-narrow">+</th>
					<th v-if="fields.includes(propName)" v-for="(value, propName) in data[0]" :key="propName" class="is-capitalized">{{propName}}</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, i) in data" :key="i">
					<th v-if="fields.includes('+')" class="has-text-grey-light has-text-weight-light">{{i+1}}</th>
					<td v-if="fields.includes(propName)" v-for="(propValue, propName) in item" :key="propName">
						{{propValue}}
					</td>
					<td class="is-narrow">
						<slot name="actions" v-bind:item="item">
							<button class="button is-danger is-outlined"><i class="fa fa-trash"></i></button>
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		name: "TableView",
		props: {
			data: { type: Array },
			fields: { type: String }
		},
		method: {
			archiveItem(item) {
				//dialog
				this.$emit("archived", item);
			}
		},
		computed: {
			anySelected(){
				return Object.values(this.columnNames).includes(true);
			}
		}
	}
</script>
<style scoped>
table td{
	white-space: initial;
}
</style>