<template>
	<div></div>
</template>
<script>
	import ListView from "./views/ListView.vue";
	import TableView from "./views/TableView.vue";
	import GridView from "./views/GridView.vue";
	export default {
		name: "ListBrowser",
		components: { ListView, TableView, GridView },
	}
</script>