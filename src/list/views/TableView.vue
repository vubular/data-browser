<template>
	<div class="is-fullwidth" style="overflow:auto">
		<table class="table is-fullwidth is-striped is-hoverable">
			<thead>
				<tr>
					<th v-if="fields.includes('+')" class="has-text-grey-light has-text-weight-light is-narrow">+</th>
					<th v-if="fields.includes(propName)" v-for="(value, propName) in data[0]" :key="propName" class="is-capitalized">{{propName}}</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, i) in data" :key="i">
					<th v-if="fields.includes('+')" class="has-text-grey-light has-text-weight-light">{{i+1}}</th>
					<td v-if="fields.includes(propName)" v-for="(propValue, propName) in item" :key="propName">
						<template v-if="propName=='name'">
							<router-link :to="$route.fullPath+'/'+item.id">{{propValue}}</router-link>
						</template>
						<template v-else>{{propValue}}</template>
					</td>
					<td class="is-narrow">
						<slot name="actions" v-bind:item="item">
							<router-link :to="$route.fullPath+'/'+item.id+'/edit'" class="button is-info is-outlined is-small">
								<span class="icon"><i class="fa fa-edit"></i></span>
								<span>Edit</span>
							</router-link>
							<button class="button is-danger is-outlined is-small" style="margin-left:10px">
								<span class="icon"><i class="fa fa-trash"></i></span>
							</button>
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		name: "TableView",
		props: {
			data: { type: Array },
			fields: { type: String }
		},
		method: {
			archiveItem(item) {
				//dialog
				this.$emit("archived", item);
			}
		}
	}
</script>
<style scoped>
table td{
	white-space: initial;
}
</style>