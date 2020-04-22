<template>
	<thead>
		<tr>
			<th v-if="fields.includes('+')" class="has-text-grey-light has-text-weight-light is-narrow">+</th>
			<th v-if="fields.includes(propName)" v-for="(value, propName) in item" :key="propName" class="is-capitalized">{{propName}}</th>
			<th>Actions</th>
		</tr>
	</thead>
</template>
<script>
	export default {
		name: "DefaultTableHead",
		props: {
			fields: { type: String },
			data: { type: [Array, Object] }
		},
		computed: {
			item() { return this.data[0] ?? null }
		}
	}
</script>