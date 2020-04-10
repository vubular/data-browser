<template>
	<div class="column is-3 section">
		<span v-if="fields.length===0 || fields.includes(propName)" v-for="(propValue, propName) in item" :key="propName" class="item">
			<span class="has-text-weight-bold">{{propName}}:</span><br/>
			<span class="value">{{propValue}}</span><br/>
		</span>
	</div>
</template>
<script>
	export default {
		name: "DefaultGridItem",
		props: {
			fields: { type: String },
			item: { type: Object }
		}
	}
</script>