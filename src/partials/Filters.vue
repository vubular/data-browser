<template>
	<div class="filters" style="margin-bottom: 20px">
		<div class="container is-fluid">
			<div class="columns">
				<div class="column is-narrow" v-if="showFieldToggle">
					<button type="button" class="button" @click="toggleKeys = !toggleKeys">
						<span class="icon is-medium">
							<i class="fal fa-ellipsis-h-alt"></i>
						</span>
						<span>{{'Fields' | translate}}</span>
					</button>
				</div>
				<div class="column is-narrow">
					<button type="button" class="button" :class="{'is-active': viewMode==='list'}" @click="changeView('list')">List</button>
					<button type="button" class="button" :class="{'is-active': viewMode==='table'}" @click="changeView('table')">Table</button>
					<button type="button" class="button" :class="{'is-active': viewMode==='grid'}" @click="changeView('grid')">Grid</button>
				</div>
				<div class="column">
					<input v-model="search" class="input" placeholder="Search...">
				</div>
				<!-- <div class="column is-narrow">
					<div class="select">
						<select v-model="searchField">
							<option value="">All fields</option>
							<option v-for="(value, propName) in data[0]" :key="propName" :value="propName" class="is-capitalized" v-if="fields.length===0 || fields.includes(propName)">{{propName}}</option>
						</select>
					</div>
				</div> -->
			</div>
			<div class="columns is-multiline" v-if="toggleKeys">
				<div class="column is-narrow" v-for="(value, key) in columnNames" :key="key">
					<label>
						<b-checkbox v-model="columnNames[key]" class="is-capitalized" v-if="fields.length===0 || fields.includes(key)">{{ key }}</b-checkbox>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "DataBrowserFilters",
		props: {
			search: {
				type: String
			}
		},
		data() {
			return {
				toggleKeys: false,
			}
		}
	}
</script>