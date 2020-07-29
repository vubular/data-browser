<template>
	<div v-if="!hide" class="filters" style="margin-top: 25px;margin-bottom:-30px;border-top:1px solid #ddd;padding:30px 0;background: #f6f8fa">
		<div class="container is-fluid">
			<slot name="filters"></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: "DataBrowserFilters",
		props: {
			hide: {
				type: Boolean,
				default: false
			}
		}
	}
</script>
<style scoped>
	>>> .dropdown.native-filter { margin-left: 25px; }
	>>> .dropdown.native-filter .dropdown-content { padding: 0; }
	>>> .dropdown.native-filter span.dropdown-item { font-weight: bold; border-bottom: 1px solid #ddd; }
	>>> .dropdown.native-filter .dropdown-item:not(:last-of-type) { border-bottom: 1px solid #ddd; }
</style>