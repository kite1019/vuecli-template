<template>
	<ul class="d-lg-grid flex-wrap justify-content-center align-items-end mx-auto">
		<li class="col-lg-auto col-6">
			<template v-for="(item, index) in data" :key="index">
				<linkImg v-if="index === 0" :item="item" class="d-lg-block d-none" />
				<linkImg v-if="index === 1" :item="item" class="d-lg-none d-block "/>
			</template>
		</li>
		<li class="col-lg-auto col-6">
			<template v-for="(item, index) in data" :key="index">
				<linkImg v-if="index === 2" :item="item" class="d-lg-block d-none" />
				<linkImg v-if="index === 3" :item="item" class="d-lg-none d-block "/>
			</template>
		</li>
		<li class="col-lg-auto col-12">
			<template v-for="(item, index) in data" :key="index">
				<linkImg v-if="index === 4" :item="item" class="d-lg-block d-none" />
				<linkImg v-if="index === 5" :item="item" class="d-lg-none d-block "/>
			</template>
		</li>
	</ul>
</template>

<script>

import linkImg from './linkImg.vue';
import { linkMixin } from '../mixin.js';
export default {
    name: 'topBnSmallTemplate',
	mixins: [linkMixin],
	props: ['data'],
    components: {
		linkImg
	}
};
</script>

<style lang="scss" scoped>

ul {
	grid-template-columns: 30.05% 30.05% auto;
	@media only screen and (max-width: 991px) {
		margin-bottom: -1rem;
		display: flex;
	}
}
li {
	padding: 0 .5rem;
	@media only screen and (max-width: 991px) {
		margin-bottom: 1rem;
	}
}
</style>
