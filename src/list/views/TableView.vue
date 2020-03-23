<template>
	<table class="table is-fullwidth">
		<tr>
			<th></th>
			<th v-show="columnNames[propertyName]" v-for="(value, propertyName) in data[0]" :key="propertyName" class="is-capitalized">{{propertyName}}</th>
		</tr>
		<tr v-for="(value,key)  in data" :key="key">
			<td>{{key+1}}</td>
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
			}
		},
		method: {
			archiveItem(item) {
				//dialog
				this.$emit("archived", item);
			}
		}
	}
</script>
<style>
table td{
	white-space: initial;
}
</style>