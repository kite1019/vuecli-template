<template>
    <section id="guideBox">
        <div class="outBox radius">
            <div class="container">
                <div class="gridBox">
                    <div class="gridBox--left">
                        <onSaleNowFirst v-if="onSaleNowFirst" :item="onSaleNowFirst" id="dailysale_ad"/>
                        <ul class="bnEventBig" v-if="bn5Data_1">
                            <template v-for="(item, index) in bn5Data_1">
                                <li class="col-12" v-if="index <3" :key="index" :id="'event_ad_'+(index+1)">
                                    <linkImg :item="item"/>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="gridBox--right">
                        <div class="d-flex heroBn" id="sbd_ad" v-if="bnHeroData !=''">
                            <swiper :modules="modules" :loop="true" :slides-per-view="1" :space-between="15" :speed="1000" :pagination="{ clickable: true }"
                            :autoplay="{
                                delay: 3000,
                                disableOnInteraction: false,
                            }"
                            style="overflow: hidden;">
                                <swiper-slide v-for="item in bnHeroData" :key="item.uniqueIdentifier">
                                    <slideBn :item="item"/>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <ul class="row m-0 bnEvent_2" v-if="bn5Data_2">
                            <template v-for="(item, index) in bn5Data_2" :key="index">
                                <li class="col-6"  :id="'event_ad_'+(index+4)">
                                    <linkImg :item="item"/>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
                <ul class="row" id="rebate">
                    <template v-for="(item, index) in bnCouponData" :key="index">
                        <li class="col-lg-6 col-12"><linkImg :item="item" /></li>
                    </template>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue';
import linkImg from './linkImg.vue'
import onSaleNowFirst from './onSaleNowFirst.vue'
import slideBn from './slideBn.vue'

export default {
    name: 'guideBoxTemplate',
    components: {
        Swiper,
        SwiperSlide,
        linkImg,
        onSaleNowFirst,
        slideBn,
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay],
        };
    },
	props: [
        'onSaleNowFirst', 
        'bn5Data_1', 
        'bn5Data_2',
        'bnHeroData',
        'bnCouponData',
    ],

};
</script>
<style lang="scss" scoped>

</style>