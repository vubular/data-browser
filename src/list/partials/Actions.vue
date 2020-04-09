<template>
	<div class="actions is-relative" style="z-index: 1">
		<div class="container is-fluid">
			<div class="columns">
				<div class="column is-2">
					<button type="button" class="button is-success is-fullwidth is-medium">
						<span class="icon"><i class="fal fa-plus"></i></span>
						<span>Create Item</span>
					</button>
				</div>
				<div class="column">
					<!-- <input class="input "  /> -->
					<b-input @input="val => $emit('search', val)" placeholder="Search..." size="is-medium"></b-input>
				</div>
				<div class="column is-narrow">
					<button type="button" class="button is-danger is-outlined is-medium">
						<i class="fal fa-archive"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "DataBrowserActions",
	}
</script>
<style scoped>
	.actions {
		padding: 30px 0;
		border-bottom: 1px solid #e2e2e2;
		box-shadow: 0 1px 5px rgba(0,0,0,0.1);
	}
</style>