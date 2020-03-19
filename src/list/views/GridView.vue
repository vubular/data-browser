<template>
	<div class="columns is-multiline">
		<div class="column is-3 section" v-for="(value, key) in data" :key="key">
			<span v-for="(propValue, propName) in value" :key="propName" class="item">
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
			}
		},
	}
</script>
<style>
	.item{
		padding-bottom:10px;
	}
</style>