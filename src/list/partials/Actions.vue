<template>
	<div class="actions" :class="{standout: 'standout'}">
		<div class="container is-fluid">
			<div class="columns">
				<div v-if="actions.includes('create')" class="column is-2">
					<slot name="create-button">
						<button v-if="!createRouter" type="button" class="button is-success is-fullwidth is-medium">
							<span class="icon"><i class="fal fa-plus"></i></span>
							<span>Create Item</span>
						</button>
						<template v-else>
							<router-link v-if="$route" :to="createRouter" class="button is-success is-fullwidth is-medium">
								<span class="icon"><i class="fal fa-plus"></i></span>
								<span>Create Item</span>
							</router-link>
							<a v-else :href="createRouter" class="button is-success is-fullwidth is-medium">
								<span class="icon"><i class="fal fa-plus"></i></span>
								<span>Create Item</span>
							</a>
						</template>
					</slot>
				</div>
				<div v-if="actions.includes('search')" class="column">
					<b-input @input="val => $emit('search', val)" placeholder="Search..." size="is-medium"></b-input>
				</div>
				<div v-if="actions.includes('archive')" class="column is-narrow">
					<slot name="create-button">
						<button v-if="!createRouter" type="button" class="button is-danger is-outlined is-medium">
							<i class="fal fa-archive"></i>
						</button>
						<template v-else>
							<router-link v-if="$route" :to="archiveRouter" class="button is-danger is-outlined is-medium">
								<i class="fal fa-archive"></i>
							</router-link>
							<a v-else :href="archiveRouter" class="button is-danger is-outlined is-medium">
								<i class="fal fa-archive"></i>
							</a>
						</template>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "DataBrowserActions",
		props: ['actions'],
		computed: {
			standout() {
				return true
			},
			createRouter() {
				if(this.actions.includes("create:")) {
					if(this.actions.includes("create::")) {
						if(this.$route) {
							return this.$route.fullPath + "/create";
						} else {
							return "#/create";
						}
					} else {
						var actions = this.actions.split(",");
						for(var a in actions) {
							if(actions[a].includes("create")) {
								var createAction = actions[a].split(":");
								if(this.$route) {
									return this.$route.fullPath + "/" + createAction.pop();
								} else {
									return "#/" + createAction.pop();
								}
							}
						}
					}
				}

				return false;
			},
			archiveRouter() {
				if(this.actions.includes("archive:")) {
					if(this.actions.includes("archive::")) {
						if(this.$route) {
							return this.$route.fullPath + "/archive";
						} else {
							return "#/archive";
						}
					} else {
						var actions = this.actions.split(",");
						for(var a in actions) {
							if(actions[a].includes("archive")) {
								var archiveAction = actions[a].split(":");
								if(this.$route) {
									return this.$route.fullPath + "/" + archiveAction.pop();
								} else {
									return "#/" + archiveAction.pop();
								}
							}
						}
					}
				}

				return false;
			}
		},

	}
</script>
<style scoped>
	.actions { padding: 30px 0; border-bottom: 1px solid #e2e2e2; }
	.actions.standout { position: relative; z-index: 1; box-shadow: 0 1px 5px rgba(0,0,0,0.1); }
</style>