<template>
	<div>
		<ul>
			<li v-for="(value, key) in data" :key="key">
				<span v-for="(propValue, propName) in value" :key="propName">
					<span class="title">{{propName}}: {{propValue}}</span><br/>
				</span>
			</li>
		</ul>
	</div>
</template>
<style>
li{
	padding-bottom:10px;
}
</style>
<script>
	export default {
		name: "ListView",
		props: {
			data: {
				type: Array
			}
		},
	}
</script>