<template>
	<div class="columns is-multiline">
		<div class="column is-3 section" v-for="(value, key) in data" :key="key" v-show="anySelected">
			<span v-for="(propValue, propName) in value" :key="propName" class="item" v-show="columnNames[propName]"  v-if="fields.includes(propName)">
				<span class="has-text-weight-bold">{{propName}}:</span><br/>
				<span class="value">{{propValue}}</span><br/>
			</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: "GridView",
		props: {
			data: {
				type: Array
			},
			columnNames: {
				type: Object
			},
			fields: {
				type: Array
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
	.item{
		padding-bottom:10px;
	}
</style>