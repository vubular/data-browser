<template>
	<tr>
		<th v-if="fields.includes('+')" class="has-text-grey-light has-text-weight-light">{{counter}}</th>
		<td v-if="fields.includes(propName)" v-for="(propValue, propName) in item" :key="propName">
			<template v-if="propName=='name'">
				<router-link :to="$route.fullPath+'/'+item.id">{{propValue}}</router-link>
			</template>
			<template v-else>{{propValue}}</template>
		</td>
		<td class="is-narrow">
			<router-link :to="$route.fullPath+'/'+item.id+'/edit'" class="button is-info is-outlined is-small">
				<span class="icon"><i class="fa fa-edit"></i></span>
				<span>Edit</span>
			</router-link>
			<button class="button is-danger is-outlined is-small" style="margin-left:10px" @click="archive(item)">
				<span class="icon"><i class="fa fa-archive"></i></span>
			</button>
		</td>
	</tr>
</template>
<script>
	export default {
		name: "DefaultTableItem",
		props: {
			fields: { type: String },
			item: { type: Object },
			counter: { type: Number }
		},
		methods: {
			archive(item) {
				this.$buefy.dialog.confirm({
					title: "Archive item #"+ item.id ?? "",
					message: "Are you sure you want to <b>archive</b> this item?<br/>This item will be archived and wont be listed.",
					confirmText: "Archive",
					type: "is-danger",
					hasIcon: true,
					icon: "archive fa-2x",
					iconPack: "fal",
					width: 600,
					onConfirm: () => { this.$emit("archive", item); }
				});
			}
		}
	}
</script>