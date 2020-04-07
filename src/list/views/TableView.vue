<template>
	<div class="is-fullwidth" style="overflow:auto">
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th v-if="showRowNumber">#</th>
					<th v-show="columnNames[propName]" v-for="(value, propName) in data[0]" :key="propName" class="is-capitalized" v-if="fields.length===0 || fields.includes(propName)">{{propName}}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(value,key)  in data" :key="key" v-show="anySelected">
					<td v-if="showRowNumber">{{key+1}}</td>
					<td v-show="columnNames[propName]"  v-for="(propValue, propName) in value" :key="propName" v-if="fields.length===0 || fields.includes(propName)">
						{{propValue}}
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
			data: {
				type: Array
			},
			columnNames: {
				type: Object
			},
			showRowNumber: {
				type: Boolean
			},
			fields: {
				type: Array
			}
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