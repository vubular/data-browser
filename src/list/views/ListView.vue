<template>
	<ul>
		<li v-for="(value, key) in data" :key="key" v-show="anySelected">
			<div class="section" style="padding:12px">
				<div class="columns">
					<div class="column is-narrow has-text-really-centered">
						<span style="padding:15px">{{key+1}}</span>
					</div>
					<div class="column">
						<span v-for="(propValue, propName) in value" :key="propName" v-show="columnNames[propName]" v-if="fields.length===0 || fields.includes(propName)">
							<span><span class="has-text-weight-bold">{{propName}}:</span> {{propValue}}</span><br/>
						</span>
					</div>
					<div class="column is-narrow has-text-really-centered">Delete</div>
				</div>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: "ListView",
		props: {
			data: {
				type: Array
			},
			columnNames: {
				type: Object
			},
			fields: {
				type: Array
			}
		},
		computed: {
			anySelected(){
				return Object.values(this.columnNames).includes(true);
			}
		}
	}
</script>
<style scoped>
	ul li { border-bottom: 1px solid #d6d6d6; }
	ul li .container { width:100%;padding:0; }
	.item-wrapper { width: 100%; clear: both; }
	.item-counter { float:left; width: 10%; padding: 20px; border-right: 1px solid #f2f2f2; }
	.item-content { float:left; width: 70%; padding: 20px; border-right: 1px solid #f2f2f2; }
	.item-actions { float:left; width: 20%; padding: 20px; text-align: right; }
</style>