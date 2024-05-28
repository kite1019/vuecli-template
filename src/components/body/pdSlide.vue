<template>
	<swiper
		:modules="modules"
		:loop="true"
		:effect="'coverflow'"
		:grabCursor="true"
		:pagination="{ clickable: true }"
		:coverflowEffect="{
			rotate: 35,
			stretch: 0,
			depth: 110,
			modifier: 1,
			slideShadows: false,
		}"
		:breakpoints="{
			'320': { slidesPerView: 1.5, spaceBetween: 10, loopedSlides: 2, centeredSlides: true, },
			'415': { slidesPerView: 1.7, spaceBetween: 10, loopedSlides: 2, centeredSlides: true, },
			'768': { slidesPerView: 2.4, spaceBetween: 20, loopedSlides: 3, centeredSlides: true,},
			'1024': { slidesPerView: 2.8, spaceBetween: 20, loopedSlides: 3, centeredSlides: true, },
			'1025': { slidesPerView: 4.2, spaceBetween: 10, loopedSlides: 4, centeredSlides: true, },
		}"
		:freeMode="false"
	>
		<swiper-slide v-for="item in data" :key="item.uniqueIdentifier">
            <a :href="getLinkUrl(item)" :class="item.Link.Url === '#nolink' ? 'pe-none' : ''" :target="target(item)" @click="goTo($event, item)">
                <main>
                    <div class="pic"><img :src="item.Img.Src" class="d-block" :alt="item.Link.Text"></div>
                    <div class="hotline">{{ item.Link.Text2 }}</div>
                    <div class="pd_title">{{ item.Link.Text }}</div>
                    <div class="price">
                        <small>{{ item.Link.Text3 === '' ? '' : '$' + item.Link.Text3 }}</small>
                        <strong><i>$</i>{{ item.Link.Text1 }}</strong>
                    </div>
                </main>
                <img src="@/assets/new/list_card_bg.png" alt="bg" class="d-block">
			</a>
		</swiper-slide>
	</swiper>
</template>

<script>

import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css/bundle'
import 'swiper/css/effect-coverflow';
import { linkMixin } from '../mixin.js';

export default {
    name: 'pdSlideTemplate',
	mixins: [linkMixin],
    components: {
        Swiper,
        SwiperSlide,
	},
	props: ['item', 'index', 'data'],
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
        }
    },
}
</script>

<style lang="scss" scoped>
$priceColor: #ea0651;
$txtColor: #440015;
.swiper {
    padding-bottom: 3.5rem !important;
    a {
		position: relative;
        display: block;
        // overflow: hidden;
        width: 100%;
        height: 100%;
		text-align: center;
        // padding: 5px 5px 2.3rem;
        // border-radius: .7rem;
        // background-color: #fff;
        text-decoration: none;
        transition: .3s all;
        strong, small, b, em {
            font-family: Montserrat, Arial, Helvetica, sans-serif;
        }
    }
    main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 3rem 1.6rem 0 1.2rem;
    }
    .pic {
        width: 80%;
        margin: 0 auto;
        img {
            mix-blend-mode: multiply;
        }
    }
    .hotline {
        font-size: 1.15rem;
        font-weight: 400;
        color: #fff;
        background-color: #a680cc;
		margin-bottom: 5px;
        padding: 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        transition: all .3s ease;
        @media only screen and (max-width: 767px) {
            font-size: 15px;
        }
    }
    .pd_title {
		height: 3.1rem;
		font-size: 1.1rem;
        color: #454545;
        font-weight: 500;
		line-height: 1.4;
        margin-bottom: 5px;
        padding: 0 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        @media only screen and (max-width: 767px) {
            height: 44px;
			font-size: 15px;
            margin-bottom: 2vw;
        }
    }
    .price {
        width: 100%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        strong {
            font-size: 2rem;
            font-weight: bold;
            color: $priceColor;
            display: block;
            line-height: 1;
            i {
                font-weight: 500;
                font-size: 60%;
            }
        }
        small {
            display: block;
            font-size: .9rem;
            text-decoration: line-through;
            color: #aaaaaa;
            margin-right: 5px;
        }
    }
    .swiper-slide {
        filter: brightness(0.6);
        &.swiper-slide-active {
            filter: brightness(1);
        }
        &.swiper-slide-next {
            transform: translate3d(0px, 0px, -130px) rotateY(-40deg) scale(1) !important;
        }
        &.swiper-slide-prev {
            transform: translate3d(0px, 0px, -130px) rotateX(0deg) rotateY(40deg) scale(1) !important;
        }
    }
}

</style>
