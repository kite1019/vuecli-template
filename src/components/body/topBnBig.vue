<template>
	<div class="w-100">
		<template v-for="(item, index) in data" :key="index">
			<a v-if="index >= 6" :href="getLinkUrl(item)"  :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)"></a>
			<img v-if="index === 6" :src="item.Img.Src" :alt="item.Link.Text" class="d-lg-block d-none w-100">
			<img v-if="index === 7" :src="item.Img.Src" :alt="item.Link.Text" class="d-lg-none d-block w-100">
		</template>
	</div>
</template>

<script>

import { linkMixin } from '../mixin.js';
export default {
    name: 'topBnBiglTemplate',
	mixins: [linkMixin],
	props: ['data'],
    components: {
	}
};
</script>

<style lang="scss" scoped>
.w-100 {
	position: relative;
}
a {
	display: block;
	position: absolute;
	width: 20%;
	height: 75%;
	background-color: rgba($color: #000000, $alpha: .3);
	bottom: 0;
	left: 50%;
	z-index: 1;
	@media only screen and (max-width: 991px) {
		width: 23%;
		height: 76%;
	}
	@media only screen and (max-width: 767px) {
		width: 26%;
	}
	&:nth-child(1) {
		transform: translate(-29rem, 0);
		@media only screen and (max-width: 991px) {
			transform: translate(-38vw, 0);
		}
		@media only screen and (max-width: 767px) {
			transform: translate(-43vw, 0);
		}
	}
	&:nth-child(2) {
		transform: translate(-9rem, 0);
		@media only screen and (max-width: 991px) {
			transform: translate(-10vw, 0);
		}
		@media only screen and (max-width: 767px) {
			transform: translate(-12vw, 0);
		}
	}
	&:nth-child(3) {
		transform: translate(15.3rem, 0);
		@media only screen and (max-width: 991px) {
			transform: translate(18vw, 0);
		}
		@media only screen and (max-width: 767px) {
			transform: translate(20vw, 0);
		}
	}
}

</style>
