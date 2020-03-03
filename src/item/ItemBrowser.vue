<template>
	<div>{{data}}</div>
</template>
<script>
	export default {
		name: "ItemBrowser",
		props: {
			data: {
				type: Object
			}
		},
	}
</script>