<template>
	<li>
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
</template>
<script>
	export default {
		name: "DefaultListItem",
		props: {
			fields: { type: String },
			item: { type: Object }
		}
	}
</script>