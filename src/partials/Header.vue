<template>
	<div v-if="!controls.includes('hide')" class="controls" :class="{'compact': compact, 'docked': docked}">
		<div class="container is-fluid">
			<div class="columns">
				<div v-if="controls.includes('create')" class="column is-narrow">
					<slot name="create-button">
						<button v-if="!createRouter"
							type="button"
							class="button create-button is-success is-medium"
							@click="$emit('create')">
							<span class="icon"><i class="fal fa-plus"></i></span>
							<span>{{createLabel}}</span>
						</button>
						<template v-else>
							<router-link v-if="$route" :to="createRouter" class="button create-button is-success is-medium">
								<span class="icon"><i class="fal fa-plus"></i></span>
								<span>{{createLabel}}</span>
							</router-link>
							<a v-else :href="createRouter" class="button create-button is-success is-medium">
								<span class="icon"><i class="fal fa-plus"></i></span>
								<span>{{createLabel}}</span>
							</a>
						</template>
					</slot>
				</div>
				<div class="column">
					<b-input @input="val => $emit('search', val)" placeholder="Search..." size="is-medium"></b-input>
				</div>
				<div v-if="controls.includes('archive')" class="column is-narrow">
					<slot name="archive-button">
						<button v-if="!archiveRouter"
							type="button"
							class="button is-danger is-medium"
							@click="$emit('archive')">
							<i class="fa fa-archive"></i>
						</button>
						<template v-else>
							<router-link v-if="$route" :to="archiveRouter" class="button is-danger is-medium">
								<i class="fa fa-archive"></i>
							</router-link>
							<a v-else :href="archiveRouter" class="button is-danger is-medium">
								<i class="fa fa-archive"></i>
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
		name: "DataBrowserHeader",
		props: ['controls', 'compact', 'docked', 'label'],
		computed: {
			createLabel() {
				var createLabel = this.$i18n ? this.$t("Create") : "Create";
				var itemLabel = this.$i18n ? this.$t(this.label) : this.label;
				return createLabel + " " + itemLabel;
			},
			activeRoute() {
				if(this.$route) {
					return this.$route.fullPath;
				} else {
					return "#"; //get current url js trailed hash
				}
			},
			createRouter() {
				if(this.controls.includes("create:")) {
					if(this.controls.includes("create::")) {
						return this.activeRoute + "/create";
					} else {
						var controls = this.controls.split(",");
						for(var c in controls) {
							if(controls[c].includes("create")) {
								var createControl = controls[c].split(":");
								if(this.$route) {
									return createControl.pop();
								} else {
									return "#/" + createControl.pop();
								}
							}
						}
					}
				}
				return false;
			},
			archiveRouter() {
				if(this.controls.includes("archive:")) {
					if(this.controls.includes("archive::")) {
						return this.activeRoute + "/archive";
					} else {
						var controls = this.controls.split(",");
						for(var c in controls) {
							if(controls[c].includes("archive")) {
								var archiveControl = controls[c].split(":");
								if(this.$route) {
									return archiveControl.pop();
								} else {
									return "#/" + archiveControl.pop();
								}
							}
						}
					}
				}
				return false;
			}
		}
	}
</script>
<style scoped>
	.controls { padding: 30px 0; border-bottom: 1px solid #e2e2e2; }
	.controls.compact { position: relative; z-index: 1; box-shadow: 0 1px 5px rgba(0,0,0,0.1); }
	.controls.docked .container.is-fluid { margin:0; }
	.button.create-button { width: 100%; min-width: 250px; }
</style>