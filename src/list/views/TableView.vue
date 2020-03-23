<template>
	<table class="table is-fullwidth">
		<tr>
			<th v-if="showRowNumber"></th>
			<th v-show="columnNames[propertyName]" v-for="(value, propertyName) in data[0]" :key="propertyName" class="is-capitalized">{{propertyName}}</th>
		</tr>
		<tr v-for="(value,key)  in data" :key="key" v-show="anySelected">
			<td v-if="showRowNumber">{{key+1}}</td>
			<td v-show="columnNames[propName]"  v-for="(propValue, propName) in value" :key="propName">
				{{propValue}}
			</td>
		</tr>
	</table>
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
<style>
table td{
	white-space: initial;
}
</style>