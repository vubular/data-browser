<template>
	<tfoot>
		<tr>
			<td v-if="fields.includes('+')"></td>
			<td v-if="fields.includes(propName)" v-for="(value, propName) in item" :key="propName" class="is-capitalized">{{propName}}</td>
			<td>Actions</td>
		</tr>
	</tfoot>
</template>
<script>
	export default {
		name: "DefaultTableFoot",
		props: {
			fields: { type: String },
			item: { type: Object }
		}
	}
</script>