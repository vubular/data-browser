<template>
	<div v-if="!hide" class="filters" style="margin-top: 25px;margin-bottom:-30px;border-top:1px solid #ddd;padding:30px 0;background: #f6f8fa">
		<div class="container is-fluid">
			<slot></slot>
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