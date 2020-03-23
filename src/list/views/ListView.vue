<template>
	<div>
		<ul class="list">
			<li v-for="(value, key) in data" :key="key" class="section">
				<span v-for="(propValue, propName) in value" :key="propName" v-show="columnNames[propName]" >
					<span><span class="has-text-weight-bold">{{propName}}:</span> {{propValue}}</span><br/>
				</span>
			</li>
		</ul>
	</div>
</template>
<style>
ul.list li{
	padding-bottom:20px;
}
</style>
<script>
	export default {
		name: "ListView",
		props: {
			data: {
				type: Array
			},
			columnNames: {
				type: Object
			}
		},
	}
</script>