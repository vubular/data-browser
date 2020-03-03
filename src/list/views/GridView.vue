<template>
	<div>
		<div class="column is-3" v-for="(value, key) in data" :key="key">
			<span v-for="(propValue, propName) in value" :key="propName">
				<span class="title">{{propName}}</span><br/>
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