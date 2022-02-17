<template>
	
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onShow() {
		
	},
	methods: {
		openPopup(e) {
			this.$refs[e].$refs[e].open();
		},
		hidePopup(e) {
			this.$refs[e].close();
		}
	}
};
</script>

<style lang="scss" scoped>
@import '/scss/exchangeBox';
</style>