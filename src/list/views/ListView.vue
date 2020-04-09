<template>
	<ul>
		<li v-for="(item, i) in data" :key="i">
			<div class="section" style="padding:12px">
				<div class="columns">
					<div class="column is-narrow has-text-really-centered">
						<span style="padding:15px">{{i+1}}</span>
					</div>
					<div class="column">
						<span v-if="fields.includes(propName)" v-for="(propValue, propName) in item" :key="propName">
							<span><span class="has-text-weight-bold">{{propName}}:</span> {{propValue}}</span><br/>
						</span>
					</div>
					<div class="column is-narrow has-text-really-centered">
						<slot name="actions" v-bind:item="item">
							Delete
						</slot>
					</div>
				</div>
			</div>
		</li>
	</ul>
</template>
<script>
	export default {
		name: "ListView",
		props: {
			data: { type: Array },
			fields: { type: String }
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