<template>
    <h1 className="p-no text-transparent">
        2024美力最強檔 約會女神節：PChome24h 14 大分會場感恩回饋！天天搶早鳥券！滿額優惠回饋活動促銷好禮大放送！
    </h1>
    <HeaderTop />
    <LeftMenu />
    <div class="wrap">
        <!-- <div class="kvBg absolute pe-none">
            <img src="@/assets/new/kv_bg.png" alt="kv bg" class="d-lg-block d-none w-100">
            <img src="@/assets/new/kv_bg-app.png" alt="kv bg" class="d-lg-none d-block">
        </div> -->
        <div class="eventGuide absolute" data-bs-toggle="modal" data-bs-target="#calendar">
            <img src="@/assets/new/event_guide.png" alt="攻略" class="d-block">
        </div>
        <div class="kvTitle">
            <div class="kvMask"><div class="k_mask"></div></div>
            <template v-for="(item, index) in otherData" :key="item.uniqueIdentifier">
                <img v-if="index === 2" :src="item.Img.Src" alt="約會女神節" class="d-lg-block d-none w-100">
                <img v-if="index === 3" :src="item.Img.Src" alt="約會女神節" class="d-lg-none d-block w-100">
            </template>
        </div>

        <!-- 2大塊bn -->
        <div class="container" id="topbn" v-if="topbnData !=''">
            <topBnSmall :data="topbnData"/>
            <topBnBig :data="topbnData"/>
        </div>
        <!-- END // 2大塊bn -->

        <!-- 攻略區 -->
        <guideBox 
            :onSaleNowFirst="onSaleNowFirst" 
            :bn5Data_1="bn5Data_1" 
            :bn5Data_2="bn5Data_2" 
            :bnHeroData="bnHeroData" 
            :bnCouponData="bnCouponData"
        /> 
        <!-- END // 攻略區 -->

        <div id="appTopNav">
            <RightMenu :otherData="otherData"/>
        </div>

        <!-- 銀行 -->
        <section id="bank" v-if="bankWebData !='' && bankAppData !=''">
            <div class="bankBox d-lg-block d-none" v-if="bankWebData">
                <bankSlide :data="bankWebData" :item="bankWebData"/>
            </div>
            <div class="bankBox d-lg-none d-block" v-if="bankAppData">
                <bankSlide :data="bankAppData" :item="bankAppData"/>
            </div>
        </section>
        <!-- END // 銀行 -->

        <!-- 加碼必看 -->
        <section id="discount" v-if="preData !=''">
            <div class="h6">
                <img src="@/assets/new/sect_title_2.png" alt="加碼必看" class="d-block">
            </div>
            <div class="container">
                <ul class="row">
                    <template v-for="(item, index) in preData" :key="index">
                        <discountAD :item="item" />
                    </template>
                </ul>

                <cardSlide :data="demoPDData"/>
            </div>
        </section>
        <!-- END // 加碼必看 -->

        <!-- 限時瘋搶 -->
        <section id="dailysale" v-if="onSale != ''">
            <div class="container large">
                <div class="h6">
                    <a href="https://24h.pchome.com.tw/onsale/" target="_blank" class="title">
                        <img src="@/assets/new/sect_title_12.png" class="d-block" alt="限時瘋搶看更多">
                        <img src="@/assets/new/sale_watch_btn.png" class="watch-more-btn">
                    </a>
                </div>
                <onSaleAll v-if="onSale" 
                    :onSale="onSale" :onSaleNowAll="onSaleNowAll" :onSale_0="onSale_0"
                    :onSale_1="onSale_1" :onSale_2="onSale_2" :onSale_3="onSale_3" 
                    :onSale_4="onSale_4" 
                />
            </div>
        </section>
        <!-- 限時瘋搶 -->

        <!-- 超取館 -->
        <section id="prods">
            <storePickUp/>
        </section>
        <!-- END // 超取館 -->

        <!-- 人氣必搶 -->
        <section id="sbdpreview" v-if="onCardSlideData !=''">
            <div class="h6">
                <img src="@/assets/new/sect_title_1.png" alt="人氣必搶預告" class="d-block">
            </div>
            <div class="container">
                <div class="row" >
                    <div class="col-lg-6 col-12 mb-lg-0 mb-4" v-if="onCardSlideData">
                        <swiper :modules="modules" :loop="true" :slides-per-view="1" :speed="900" :pagination="{ clickable: true }" 
                        :space-between="2"
                        :autoplay="{
                            delay: 3000,
                            disableOnInteraction: false,
                        }"
                        >
                            <template v-for="(item, index) in onCardSlideData" :key="index">
                                <swiper-slide v-if="indexRenderEven(index)" :key="index">
                                    <slideBn :item="item"/>
                                </swiper-slide>
                            </template>
                        </swiper>
                    </div>
                    <div class="col-lg-6 col-12" v-if="onCardSlideData">
                        <swiper :modules="modules" :loop="true" :slides-per-view="1" :speed="900" :pagination="{ clickable: true }" 
                        :space-between="2"
                        :autoplay="{
                            delay: 3000,
                            disableOnInteraction: false,
                        }"
                        >
                            <template v-for="(item, index) in onCardSlideData" :key="index">
                                <swiper-slide v-if="indexRenderOdd(index)" :key="index">
                                    <slideBn :item="item"/>
                                </swiper-slide>
                            </template>
                        </swiper>
                    </div>
                </div>
            </div>
        </section>
        <!-- END // 人氣必搶 -->

        <!-- 深粉主題 -->
        <div class="deepPink">
            <!-- 每日爆品 -->
            <section id="brands" v-if="demoPDData != ''">
                <div class="h6">
                    <img src="@/assets/new/sect_title_3.png" alt="每日爆品" class="d-block">
                </div>
                <div class="container large">
                    <ul class="row">
                        <oneDay v-for="(item, index) in demoPDData" :item="item" :key="index" :index="index"/>
                    </ul>
                </div>
            </section>
            <!-- END // 每日爆品 -->
            
            <!-- 精選特搜 -->
            <section id="sbdbody" v-if="bnPDData != ''">
                <div class="h6">
                    <img src="@/assets/new/sect_title_4.png" alt="精選特搜" class="d-block">
                </div>
                <div class="container">
                    <ul class="row sbdbody">
                        <template v-for="(item, index) in bnPDData">
                            <sbdbodyPD v-if="index <=5" :item="item" :index="index" :key="item.uniqueIdentifier" />
                        </template>
                    </ul>
                </div>
            </section>
            <!-- END // 精選特搜 -->

            <section id="spTemplate-1" v-if="demoPDData != ''" style="padding-top: 7rem;">
                <div class="h6 text-center mb-2">
                    <span style="font-size: 3rem;">特殊版型-1</span>
                </div>
                <div class="container">
                    <ul class="row">
                        <superPD v-for="(item, index) in demoPDData" :item="item" :key="index" :index="index"/>
                    </ul>
                </div>
            </section>

            <section id="spTemplate-2" v-if="demoPDData != ''" style="padding-top: 2rem;">
                <div class="container" style="margin-top: 5rem;">
                    <div class="h6 text-center mb-2">
                        <span style="font-size: 3rem;">特殊版型-2</span>
                    </div>
                    <ul class="row">
                        <superPDnHero v-for="(item, index) in demoPDData3" :item="item" :key="index" :index="index"/>
                    </ul>
                </div>
            </section>

            <!-- 頁籤品 -->
            <section id="strategy" v-if="demoPDData != '' && demoPDData2 != ''">
                <div class="container">
                    <tabsPD :data_1="demoPDData" :data_2="demoPDData2"/>
                </div>
            </section>
            <!-- END // 頁籤品 -->

            <!-- 3D輪播 -->
            <section id="list" v-if="demoPDData !=''">
                <div class="h6"><img src="@/assets/new/sect_title_5.png" alt="3D輪播" class="d-block"></div>
                <div class="container">
                    <pdSlide :data="demoPDData" :item="demoPDData"/>
                </div>
            </section>
            <!-- END // 3D輪播 -->

            <!-- 強檔品牌 -->
            <section id="project" v-if="pjData != '' && pjData !=''">
                <div class="h6"><img src="@/assets/new/sect_title_6.png" alt="強檔品牌" class="d-block"></div>
                <div class="container large radius">
                    <div class="main radius">
                        <ul class="row brandPD mb-4 mb-lg-0">
                            <template v-for="(item, index) in pjData">
                                <brandPD v-if="index <5" :item="item" :index="index" :key="item.uniqueIdentifier" />
                            </template>
                        </ul>
                        <ul class="row brandPD mb-4 mb-lg-0">
                            <template v-for="(item, index) in pjData">
                                <brandPD v-if="index >4 && index <10" :item="item" :index="index" :key="item.uniqueIdentifier" />
                            </template>
                        </ul>
                    </div>
                    <ul class="row brandPDPower" id="powerbrand_02" v-if="demoPDData2">
                        <brandPDPower v-for="(item, index) in demoPDData2" :item="item" :key="index"/>
                    </ul>
                </div>
            </section>
            <!-- END // 強檔品牌 -->
        </div>
        <!-- END // 深粉主題 -->

        <!-- 折價券 -->
        <section id="coupon" v-if="couponData !=''">
            <div class="h6"><img src="@/assets/new/sect_title_7.png" alt="折價券" class="d-block"></div>
            <div class="container large" v-if="couponData">
                <couponNew />
            </div>
        </section>
        <!-- END // 折價券 -->

        <!-- 分會場 -->
        <section id="cate" v-if="cateData !=''">
            <div class="h6"><img src="@/assets/new/sect_title_8.png" alt="分會場" class="d-block"></div>
            <div class="container cate mb-md-5">
                <cate :data="cateData"/>
            </div>
        </section>
        <!-- END // 分會場 -->

        <div class="moreProPD">
            <!-- 甜蜜小窩 -->
            <section id="honey" class="modal-box" v-if="demoPDData !=''">
                <div class="h6"><img src="@/assets/new/sect_title_9.png" alt="甜蜜小窩" class="d-block"></div>
                <div class="container">
                    <ul class="row promo">
                        <template v-for="(item, index) in demoPDData" :key="index">
                            <bodyPD :item="item" />
                        </template>
                    </ul>
                </div>
            </section>
            <!-- END // 甜蜜小窩 -->

        </div>

        <!-- 跑馬燈 -->
        <section class="marquee d-flex">
            <img src="@/assets/new/marquee_pic.png" alt="marquee">
            <img src="@/assets/new/marquee_pic.png" alt="marquee">
        </section>
        <!-- END // 跑馬燈 -->
    </div>

    <seoTxt />
    <Footer style="background-color: #ffdccf;" />

    <!-- Modal -->
    <div class="modal fade" id="calendar" tabindex="-1" aria-labelledby="calendarLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">購物攻略</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <img src="@/assets/ui/cancel.svg" alt="" class="d-block">
                    </button>
                </div>
                <div class="modal-body">
                    <template v-for="(item, index) in otherData" :key="item.uniqueIdentifier">
                        <img v-if="index === 1" :src="item.Img.Src" alt="攻略" class="d-block">
                    </template>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
// 資料
import blockID from './components/blockID.js';
import { toDataArr, dataNode } from './components/filterData.js';
import { fetchOnSaleData } from './components/onsale.js'; //瘋殺

// 插件
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue';
import ScrollActive from 'scroll-active';
import { linkMixin } from './components/mixin.js';

// UI
import HeaderTop from './components/ui/Header.vue'
import Footer from './components/ui/Footer.vue'
import RightMenu from './components/ui/RightMenu.vue'
import LeftMenu from './components/ui/LeftMenu.vue'

// Layout components
import guideBox from './components/body/guideBox.vue'
import topBnSmall from './components/body/topBnSmall.vue'
import topBnBig from './components/body/topBnBig.vue'
import seoTxt from './components/body/seoTxt.vue'
import onSaleAll from './components/body/onSaleAll.vue'
import bankSlide from './components/body/bankSlide.vue'
import cate from './components/body/cate.vue'
import brandPD from './components/body/brandPD.vue'
import brandPDPower from './components/body/brandPDPower.vue'
import tabsPD from './components/body/tabsPD.vue'
import slideBn from './components/body/slideBn.vue'
import discountAD from './components/body/discountAD.vue'
import bodyPD from './components/body/bodyPD.vue'
import oneDay from './components/body/oneDay.vue'
import sbdbodyPD from './components/body/sbdbodyPD.vue'
import pdSlide from './components/body/pdSlide.vue'
import cardSlide from './components/body/cardSlide.vue'
import couponNew from './components/body/couponNew.vue'
import superPD from './components/body/superPD.vue'
import superPDnHero from './components/body/superPD-hero.vue'
import storePickUp from './components/body/storePickUp.vue'

// CSS

import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css/bundle'
import '@/assets/css/layout.css';

export default {
    name: 'App',
	mixins: [linkMixin],
	data: () => {
        return {
            // 瘋殺 from api 
            onSale: [],
            onSaleNowAll: null,
            onSaleNowFirst: null,
            onSale_0: null,
            onSale_1: null,
            onSale_2: null,
            onSale_3: null,
            onSale_4: null,
            // ---------------
            ...Object.keys(blockID).reduce((acc, dataName) => {
                acc[dataName] = [];
                return acc;
            }, {})
        };
    },
    components: {
        Swiper,
        SwiperSlide,
        
        // UI元件 ----
        HeaderTop,
        Footer,
        RightMenu,
        LeftMenu,

        // 版身內容元件 ----
        guideBox,
        topBnSmall,
        topBnBig,
        bankSlide,
        bodyPD,
        brandPD,
        brandPDPower,
        cardSlide,
        couponNew,
        discountAD,
        cate,
        oneDay,
        onSaleAll,
        pdSlide,
        sbdbodyPD,
        seoTxt,
        slideBn,
        tabsPD,
        superPD,
        superPDnHero,
        storePickUp,
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay],
        };
    },
    async created() {
		toDataArr(IndexBlock);
        setTimeout(() => {
            // console.log('OK');
            Object.keys(blockID).forEach(dataName => {
                dataNode(this[dataName], blockID[dataName].Id);
            });
        }, 110);
        try {
            const onSaleData = await fetchOnSaleData();
            this.onSale = onSaleData;
            this.onSaleNowAll = this.getRandomProducts(this.onSale[0].products, 10);
            this.onSaleNowFirst = this.onSaleNowAll[0];
            this.onSale_0 = this.onSale[0];
            this.onSale_1 = this.onSale[1];
            this.onSale_2 = this.onSale[2];
            this.onSale_3 = this.onSale[3];
            this.onSale_4 = this.onSale[4];

            // console.log('onSaleNowAll: ', this.onSaleNowAll);
            // console.log('onSaleNowFirst: ', this.onSaleNowFirst);
        } catch (error) {
            console.error('初始化資料時發生錯誤:', error);
        }
    },
    methods: {
        getRandomProducts(products, count) {
            const productsRandom = JSON.parse(JSON.stringify(products));
            for (let i = productsRandom.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [productsRandom[i], productsRandom[j]] = [productsRandom[j], productsRandom[i]];
            }
            // 從洗牌後的數組中取出指定數量的元素
            return productsRandom.slice(0, count);
        },
        indexRenderEven(index) {
            // even偶數，index % 2 === 0
            return index % 2 === 0; // Change to index % 2 === 1 for odd numbers
        },
        indexRenderOdd(index) {
            // odd奇数，index % 2 === 1
            return index % 2 === 1; // Change to index % 2 === 1 for odd numbers
        },
        initScrollActive() {
            const windowWidth = window.innerWidth;
            let scrollOffset = 0;
            (windowWidth <= 991) && ( scrollOffset = 40);
            this.sa.dispose();
            this.sa = new ScrollActive({ 
                activeClass: 'active',
                offset: scrollOffset,
                inViewport: true,
                hash: false, //網址列不顯示hash
                update() {
                    this.navbar = document.getElementById('navbar');
                    setTimeout(() => {
                        const activeLi = this.navbar.querySelector('li.active');
                        if (activeLi) {
                            const menuMove = document.querySelector(".right__menu");
                            menuMove.scrollLeft = activeLi.offsetLeft - windowWidth / 2;
                        }
                    }, 100);
                }
            });
        }
    },
    mounted() {
		// 在元素渲染完成後執行
        this.$nextTick(() => {
            initSetting();

            // const kvAni = document.querySelector('.kvTitle');
            // const guide = document.querySelector('.eventGuide');
            // setTimeout(() => {
            //     kvAni.classList.add('ani');
            // }, 600);
            // setTimeout(() => {
            //     guide.classList.add('ani');
            // }, 1200);
            this.sa = new ScrollActive();
        });
        
        
        // app選單 下滑置頂後固定
        const appTopNav = document.getElementById('appTopNav');
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY || window.pageYOffset;
            if (scrollY >= appTopNav.offsetTop) {
                appTopNav.classList.add('active');
            } else {
                appTopNav.classList.remove('active');
            }
        });
    },
    updated() {
        this.initScrollActive();
    },
    beforeUnmount() {
        this.initScrollActive();
    }

}
function initSetting() {
	// 網址有hashtag錨點，網頁載入後下滑
    let hashTag = location.hash;
    if (hashTag != '') {
        console.log(hashTag);
        setTimeout(() => {
            const myElement = document.querySelector(hashTag);
            myElement.scrollIntoView({ behavior: 'instant', });
        }, 1000);
    } 
}
</script>

<style>

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

</style>
