<template>
	<table class="table">
		<tr>
			<th v-for="(value, propertyName) in data[0]" :key="propertyName">{{propertyName}}</th>
		</tr>
		<tr v-for="(value,key)  in data" :key="key">
			<td v-for="(propValue, propName) in value" :key="propName">
				{{propValue}}
			</td>
		</tr>
	</table>

<!-- 	<table>
		{{data}}
		<slot name="thead">
			<thead>
				
			</thead>
		</slot>

		<tbody>
			<tr v-for="item in data">
				<template v-slot:tr="item,archiveItem">

				</template>
			</tr>
		</tbody>
		<slot></slot>
	</table> -->
</template>
<script>
	export default {
		name: "TableView",
		props: {
			data: {
				type: Array
			}
		},
		method: {
			archiveItem(item) {
				//dialog
				this.$emit("archived", item);
			}
		}
	}
</script>