<template>
    <p v-if="demoData === 0" class="h3 demoData">demo用資料</p>
    <!-- 選單 -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" v-if="onSale_0">
            <button class="nav-link now active" data-bs-toggle="tab" data-bs-target="#data_0" role="tab"
                aria-selected="true">
                <!-- <div class="icon"><img src="@/assets/new/deco_onsale.png" alt="現正瘋搶" class="d-block"></div> -->
                <div class="icon"></div>
                {{ onSale_0.time }} <span v-if="onSale_0.status === 'now'">現正瘋搶</span>
            </button>
        </li>
        <li class="nav-item" v-if="onSale_1">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#data_1" role="tab" aria-selected="false">
                <div class="icon"></div>
                {{ onSale_1.time }}
                <span v-if="onSale_1.status === 'ready'">準時開搶</span>
                <span v-if="onSale_1.status === 'tomorrow'">明天開搶</span>
            </button>
        </li>
        <li class="nav-item" v-if="onSale_2">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#data_2" role="tab" aria-selected="false">
                <div class="icon"></div>
                {{ onSale_2.time }}
                <span v-if="onSale_2.status === 'ready'">準時開搶</span>
                <span v-if="onSale_2.status === 'tomorrow'">明天開搶</span>
            </button>
        </li>
        <li class="nav-item" v-if="onSale_3">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#data_3" role="tab" aria-selected="false">
                <div class="icon"></div>
                {{ onSale_3.time }}
                <span v-if="onSale_3.status === 'ready'">準時開搶</span>
                <span v-if="onSale_3.status === 'tomorrow'">明天開搶</span>
            </button>
        </li>
        <li class="nav-item" v-if="onSale_4">
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#data_4" role="tab" aria-selected="false">
                <div class="icon"></div>
                {{ onSale_4.time }}
                <span v-if="onSale_4.status === 'ready'">準時開搶</span>
                <span v-if="onSale_4.status === 'tomorrow'">明天開搶</span>
            </button>
        </li>
    </ul>

    <!-- 內容 -->
    <div class="tab-content">
        <div class="tab-pane fade show active" id="data_0" role="tabpanel" v-if="onSale_0">
            <ul class="row onsale__box" v-if="onSale">
                <ProductItem v-for="(item, index) in onSaleNowAll" :key="index" :item="item" />
            </ul>
        </div>
        <div class="tab-pane fade" id="data_1" role="tabpanel" v-if="onSale_1">
            <ul class="row onsale__box">
                <ProductItem v-for="(item, index) in getRandomProducts(onSale_1.products, 9)" :key="index" :item="item" />
            </ul>
        </div>
        <div class="tab-pane fade" id="data_2" role="tabpanel" v-if="onSale_2">
            <ul class="row onsale__box">
                <ProductItem v-for="(item, index) in getRandomProducts(onSale_2.products, 9)" :key="index" :item="item" />
            </ul>
        </div>
        <div class="tab-pane fade" id="data_3" role="tabpanel" v-if="onSale_3">
            <ul class="row onsale__box">
                <ProductItem v-for="(item, index) in getRandomProducts(onSale_3.products, 9)" :key="index" :item="item" />
            </ul>
        </div>
        <div class="tab-pane fade" id="data_4" role="tabpanel" v-if="onSale_4">
            <ul class="row onsale__box">
                <ProductItem v-for="(item, index) in getRandomProducts(onSale_4.products, 9)" :key="index" :item="item" />
            </ul>
        </div>
    </div>
</template>

<script>
import ProductItem from './_onSale_item.vue'

export default {
    name: 'onSaleAllTemplate',
    props: ['onSale', 'onSaleNowAll', 'onSale_0', 'onSale_1', 'onSale_2', 'onSale_3', 'onSale_4'],
    components: {
        ProductItem
    },
	data() {
		return {
            demoData: null,
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
    },
    mounted() {
        const nowUrl = window.location.href;
        const serchWord = nowUrl.indexOf('24h.pchome');
        (serchWord < 0) && (this.demoData = 0);
    }
}
</script>

<style lang="scss" scoped>
.nav-tabs {
    justify-content: center;
    border: 0;
    padding: 0.5rem;
    margin-bottom: 2rem;
	@media only screen and (max-width: 991px) {
        margin: 0;
        padding: 2rem 0 2rem;
    }

    li {
        margin: 0 .5rem;

        @media only screen and (max-width: 991px) {
            margin: 0 .5rem 1rem;
        }
    }
    .nav-link {
        width: 12.5rem;
        font-family: Montserrat, "Noto Sans TC";
        font-size: 2rem;
        font-weight: 600;
        color: #ff6565;
        line-height: 1;
        background-color: #fff;
        border: 0;
        border-radius: 100px;
        padding: 0.5rem 0;

        @media only screen and (max-width: 991px) {
            width: 26vw;
            font-size: 5vw;
        }
        span {
            display: block;
            font-size: 65%;
            margin-top: 3px;
        }
        &.active {
            position: relative;
            background: #fad27a;
            color: #440015;
            background: linear-gradient(to bottom, #ff730c 0%, #fe1d2d 100%);
            /* box-shadow: inset 0 1px 0 #ffe7b8; */
            color: #fff;
            /* text-shadow: 1px 1px 0 rgba($color: #fff, $alpha: .5); */
            padding-left: 2.5rem;
            margin-left: 1rem;

            @media only screen and (max-width: 991px) {
                padding-left: 1.5rem;
                margin-left: 1rem;
            }

            .icon {
                width: 6rem;
                height: 6rem;
                position: absolute;
                top: -15%;
                left: -14%;
                background: url('@/assets/new/onsale_act.png') top center no-repeat;
                background-size: cover;

                @media only screen and (max-width: 991px) {
                    width: 13vw;
                    height: 14vw;
                    background-size: cover;
                    /* top: -22%; */
                    left: -22%;
                }

                @media only screen and (max-width: 767px) {
                    top: -10%;

                }
            }
        }
    }
}
.tab-content {
    padding: 0 2.5rem 0.5rem;
}
.demoData {
    background: rgba($color: #fff, $alpha: .8);
    padding: 1rem;
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    border: 1px solid #6b6b6b;
}
</style>
