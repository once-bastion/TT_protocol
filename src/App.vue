<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		created() {
		},
	}
</script>

<style>
	@import url("assets/index.css");

	* {
		margin: 0;
		padding: 0;
	}

	body {
		width: 100%;
		height: 100%;
		/*background-color: #060606;*/
	}

	#app {	}

</style>
